#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Browser-based manager for /etc/samba/smb.conf.

Runs as a small local web server. Edits are staged in memory until
"Speichern" is pressed; saving validates the result with testparm, creates a
timestamped backup and replaces the file atomically.
"""

from __future__ import annotations

import argparse
import configparser
import hmac
import ipaddress
import os
import shutil
import subprocess
import sys
import tempfile
import threading
from datetime import datetime
from functools import wraps
from pathlib import Path

from flask import Flask, Response, jsonify, render_template, request


CONFIG_FILE = os.environ.get("SMB_CONFIG_FILE", "/etc/samba/smb.conf")

# Parameters owned by the guided share dialog. Everything else in a share is
# kept untouched when the dialog is used to edit an existing share.
GUIDED_SHARE_OPTIONS = (
    "comment",
    "path",
    "read only",
    "valid users",
    "force user",
    "force group",
    "guest ok",
    "browseable",
    "create mask",
    "directory mask",
)

INVALID_NAME_CHARS = "[]=#;\\/\r\n\t"

app = Flask(__name__, static_folder="static", template_folder="templates")
lock = threading.Lock()
samba: SambaConfig | None = None
dirty = False

AUTH_USER = os.environ.get("SMB_WEBUI_USER")
AUTH_PASSWORD = os.environ.get("SMB_WEBUI_PASSWORD")


class AppError(Exception):
    """An error whose message is a translation key for the browser UI."""

    def __init__(self, key: str, **params: object):
        super().__init__(key)
        self.key = key
        self.params = params


class PasswordRequired(AppError):
    """Raised when a privileged operation needs a root password."""

    def __init__(self) -> None:
        super().__init__("error.password.required")


# ---------------------------------------------------------------------------
# Configuration model
# ---------------------------------------------------------------------------

def _validate_share_name(name: str) -> str:
    name = str(name or "").strip()
    if not name:
        raise AppError("error.name.empty")
    if name.lower() == "global":
        raise AppError("error.name.global")
    if any(char in name for char in INVALID_NAME_CHARS):
        raise AppError("error.name.invalid")
    return name


class SambaConfig:
    def __init__(self, filename: str):
        self.filename = filename
        self.config = configparser.ConfigParser(
            interpolation=None,
            strict=False,
            allow_no_value=True,
        )
        self.config.optionxform = str
        self.load()

    def load(self) -> None:
        self.config.clear()
        self.config.optionxform = str
        if os.path.exists(self.filename):
            self.config.read(self.filename, encoding="utf-8")

    def sections(self) -> list[str]:
        return ["global"] + [
            section for section in self.config.sections()
            if section.lower() != "global"
        ]

    def has_section(self, name: str) -> bool:
        return self.config.has_section(name)

    def get_options(self, section: str) -> dict[str, str | None]:
        if not self.config.has_section(section):
            return {}
        return dict(self.config.items(section))

    def add_section(self, name: str) -> None:
        name = _validate_share_name(name)
        if self.config.has_section(name):
            raise AppError("error.share.exists")
        self.config.add_section(name)

    def delete_section(self, name: str) -> None:
        if name.lower() == "global":
            raise AppError("error.global.delete")
        self.config.remove_section(name)

    def set_option(self, section: str, key: str, value: str) -> None:
        key = str(key or "").strip()
        if not key:
            raise AppError("error.option.empty")
        if "\n" in key or "=" in key or "[" in key:
            raise AppError("error.option.invalid")
        if not self.config.has_section(section):
            raise AppError("error.section.missing")
        self.config.set(section, key, str(value) if value else None)

    def delete_option(self, section: str, key: str) -> None:
        self.config.remove_option(section, key)

    def stage(self, directory: str | None = None) -> str:
        """Write and validate the staged config in a temp file."""
        fd, temp_name = tempfile.mkstemp(
            prefix=".smb.conf.", dir=directory
        )
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                self.config.write(f)

            try:
                result = subprocess.run(
                    ["testparm", "-s", temp_name],
                    capture_output=True,
                    text=True,
                )
            except FileNotFoundError as exc:
                raise AppError("error.testparm.missing") from exc

            if result.returncode != 0:
                raise RuntimeError(result.stderr or result.stdout)

            return temp_name
        except Exception:
            if os.path.exists(temp_name):
                os.unlink(temp_name)
            raise

    def save(self) -> None:
        """Apply directly (only used when the server itself runs as root)."""
        filename = Path(self.filename)
        filename.parent.mkdir(parents=True, exist_ok=True)

        temp_name = self.stage(str(filename.parent))
        try:
            if filename.exists():
                shutil.copystat(filename, temp_name)
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                backup = str(filename) + "." + timestamp + ".bak"
                shutil.copy2(filename, backup)

            os.replace(temp_name, filename)
        finally:
            if os.path.exists(temp_name):
                os.unlink(temp_name)


def save_with_sudo(config: SambaConfig, password: str) -> None:
    """Apply via a short-lived sudo process; only the helper runs as root."""
    helper = Path(__file__).with_name("smb-webui-apply.py")
    if not helper.is_file():
        raise AppError("error.helper.missing", path=str(helper))

    staging_dir = tempfile.mkdtemp(prefix="smb-webui-")
    try:
        source = config.stage(staging_dir)
        command = [
            "sudo", "-S", "-p", "", "--",
            sys.executable, str(helper),
            "--source", source,
            "--target", config.filename,
        ]
        try:
            result = subprocess.run(
                command,
                input=password + "\n",
                capture_output=True,
                text=True,
                timeout=60,
            )
        except FileNotFoundError as exc:
            raise AppError("error.sudo.missing") from exc
        except subprocess.TimeoutExpired as exc:
            raise AppError("error.sudo.timeout") from exc

        if result.returncode != 0:
            details = (result.stderr or result.stdout or "").strip()
            lowered = details.lower()
            if (
                "incorrect password" in lowered
                or "sorry, try again" in lowered
            ):
                raise AppError("error.password.wrong")
            helper_keys = (
                "helper.source_missing",
                "helper.bad_target",
                "helper.symlink_target",
                "helper.testparm_missing",
                "helper.target_dir_missing",
            )
            if details in helper_keys:
                raise AppError(details)
            raise RuntimeError(details or "sudo failed")
    finally:
        shutil.rmtree(staging_dir, ignore_errors=True)


# ---------------------------------------------------------------------------
# API helpers
# ---------------------------------------------------------------------------

def state_payload() -> dict:
    assert samba is not None
    return {
        "configFile": samba.filename,
        "sections": [
            {
                "name": section,
                "options": [
                    {"key": key, "value": "" if value is None else str(value)}
                    for key, value in samba.get_options(section).items()
                ],
            }
            for section in samba.sections()
        ],
        "dirty": dirty,
        "root": os.geteuid() == 0,
        "testparm": shutil.which("testparm") is not None,
    }


def with_message(payload: dict, message_key: str, **params: object) -> dict:
    payload["messageKey"] = message_key
    payload["params"] = params
    return payload


def api_endpoint(fn):
    """Serialize access to the shared config and turn errors into JSON."""

    @wraps(fn)
    def wrapper():
        try:
            with lock:
                return jsonify(fn())
        except AppError as exc:
            payload = {
                "error": exc.key,
                "errorKey": exc.key,
                "params": exc.params,
            }
            if isinstance(exc, PasswordRequired):
                payload["code"] = "ROOT_PASSWORD_REQUIRED"
                return jsonify(payload), 403
            return jsonify(payload), 400
        except (ValueError, RuntimeError, OSError, configparser.Error) as exc:
            return jsonify({"error": str(exc)}), 400

    return wrapper


@app.before_request
def check_auth():
    if not AUTH_USER or not AUTH_PASSWORD:
        return None
    auth = request.authorization
    if (
        auth
        and hmac.compare_digest(auth.username or "", AUTH_USER)
        and hmac.compare_digest(auth.password or "", AUTH_PASSWORD)
    ):
        return None
    return Response(
        "Authentifizierung erforderlich",
        status=401,
        headers={"WWW-Authenticate": 'Basic realm="Samba Web UI"'},
    )


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/api/state")
@api_endpoint
def api_state():
    return state_payload()


@app.post("/api/share/add")
@api_endpoint
def api_share_add():
    global dirty
    data = request.get_json(force=True) or {}
    name = _validate_share_name(data.get("name"))
    options = data.get("options") or {}

    samba.add_section(name)
    for key, value in options.items():
        samba.set_option(name, str(key), str(value))

    dirty = True
    result = state_payload()
    result["selected"] = name
    return with_message(result, "share.added", name=name)


@app.post("/api/share/update")
@api_endpoint
def api_share_update():
    global dirty
    data = request.get_json(force=True) or {}
    section = str(data.get("name") or "")
    new_name = _validate_share_name(data.get("newName") or section)
    new_options = {
        str(key): str(value)
        for key, value in (data.get("options") or {}).items()
    }

    if not samba.has_section(section):
        raise AppError("error.share.missing")

    if new_name != section:
        # Preserve parameters not managed by the guided dialog.
        options = dict(samba.get_options(section))
        options.update(new_options)
        for key in GUIDED_SHARE_OPTIONS:
            if key not in new_options:
                options.pop(key, None)

        samba.delete_section(section)
        samba.add_section(new_name)
        for key, value in options.items():
            samba.set_option(new_name, key, value)
    else:
        for key in GUIDED_SHARE_OPTIONS:
            if key not in new_options:
                samba.delete_option(section, key)
        for key, value in new_options.items():
            samba.set_option(section, key, value)

    dirty = True
    result = state_payload()
    result["selected"] = new_name
    return with_message(result, "share.updated", name=new_name)


@app.post("/api/share/delete")
@api_endpoint
def api_share_delete():
    global dirty
    data = request.get_json(force=True) or {}
    section = str(data.get("name") or "")
    if not section or section.lower() == "global":
        raise AppError("error.global.delete")

    samba.delete_section(section)
    dirty = True
    result = state_payload()
    return with_message(result, "share.deleted", name=section)


@app.post("/api/option/add")
@api_endpoint
def api_option_add():
    global dirty
    data = request.get_json(force=True) or {}
    section = str(data.get("section") or "")
    key = str(data.get("key") or "")
    value = str(data.get("value") or "")

    if not samba.has_section(section):
        raise AppError("error.section.missing")
    if key in samba.get_options(section):
        raise AppError("error.option.exists")

    samba.set_option(section, key, value)
    dirty = True
    result = state_payload()
    result["selected"] = section
    return with_message(result, "option.added", key=key)


@app.post("/api/option/update")
@api_endpoint
def api_option_update():
    global dirty
    data = request.get_json(force=True) or {}
    section = str(data.get("section") or "")
    key = str(data.get("key") or "")
    value = str(data.get("value") or "")

    if key not in samba.get_options(section):
        raise AppError("error.option.missing")

    samba.set_option(section, key, value)
    dirty = True
    result = state_payload()
    result["selected"] = section
    return with_message(result, "option.updated", key=key)


@app.post("/api/option/delete")
@api_endpoint
def api_option_delete():
    global dirty
    data = request.get_json(force=True) or {}
    section = str(data.get("section") or "")
    key = str(data.get("key") or "")

    samba.delete_option(section, key)
    dirty = True
    result = state_payload()
    result["selected"] = section
    return with_message(result, "option.removed", key=key)


@app.post("/api/browse")
@api_endpoint
def api_browse():
    data = request.get_json(force=True) or {}
    path = Path(str(data.get("path") or "/")).expanduser()
    if not path.is_absolute():
        path = Path("/") / path

    while not path.is_dir():
        parent = path.parent
        if parent == path:
            break
        path = parent

    try:
        dirs = sorted(child.name for child in path.iterdir() if child.is_dir())
    except OSError as exc:
        raise AppError("error.browse.failed", detail=str(exc)) from exc

    return {
        "path": str(path),
        "parent": str(path.parent) if path.parent != path else None,
        "dirs": dirs,
    }


@app.post("/api/reload")
@api_endpoint
def api_reload():
    global dirty
    samba.load()
    dirty = False
    result = state_payload()
    return with_message(result, "config.reloaded")


@app.post("/api/save")
@api_endpoint
def api_save():
    global dirty
    data = request.get_json(silent=True) or {}
    password = data.get("password")

    if os.geteuid() == 0:
        samba.save()
    else:
        if not password:
            raise PasswordRequired()
        # A root password must never travel over a non-local connection.
        try:
            remote = ipaddress.ip_address(request.remote_addr or "")
            local = remote.is_loopback
        except ValueError:
            local = False
        if not local:
            raise AppError("error.password.remote")
        save_with_sudo(samba, str(password))
        del password

    dirty = False
    result = state_payload()
    return with_message(result, "config.saved")


def main() -> None:
    global samba

    parser = argparse.ArgumentParser(
        description="Weboberfläche für die Samba-Konfiguration"
    )
    parser.add_argument(
        "--host",
        default=os.environ.get("SMB_WEBUI_HOST", "127.0.0.1"),
        help="Adresse, auf der der Server lauscht (Standard: 127.0.0.1)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("SMB_WEBUI_PORT", "8080")),
        help="Port, auf dem der Server lauscht (Standard: 8080)",
    )
    parser.add_argument(
        "--config",
        default=CONFIG_FILE,
        help=f"Pfad zur smb.conf (Standard: {CONFIG_FILE})",
    )
    parser.add_argument(
        "--debug", action="store_true", help="Flask-Debugmodus aktivieren"
    )
    args = parser.parse_args()

    samba = SambaConfig(args.config)

    if os.geteuid() != 0:
        print(
            "Hinweis: nicht als root gestartet. Beim Speichern wird das "
            "Root-Passwort im Browser abgefragt und nur für diesen Vorgang "
            "über sudo verwendet.",
            file=sys.stderr,
        )
    if args.host not in ("127.0.0.1", "localhost", "::1") and not (
        AUTH_USER and AUTH_PASSWORD
    ):
        print(
            "Warnung: der Server ist ohne Authentifizierung auf einer "
            "Netzwerkadresse erreichbar. SMB_WEBUI_USER und "
            "SMB_WEBUI_PASSWORD setzen.",
            file=sys.stderr,
        )

    print(
        f"Samba Web UI läuft auf http://{args.host}:{args.port} "
        f"(Konfiguration: {args.config})"
    )
    app.run(host=args.host, port=args.port, debug=args.debug, threaded=True)


if __name__ == "__main__":
    main()
