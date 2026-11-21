#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Privileged helper for smb-webui.

Invoked through ``sudo`` by the unprivileged web server. It only accepts a
validated configuration file as --source and writes it to a Samba config under
/etc/samba/. It never reads the root password; sudo handles authentication.
"""

from __future__ import annotations

import argparse
import os
import shutil
import stat
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path


ALLOWED_DIR = Path("/etc/samba")


def fail(message: str) -> None:
    print(message, file=sys.stderr)
    sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True)
    parser.add_argument("--target", required=True)
    args = parser.parse_args()

    source = Path(args.source)
    target = Path(args.target)

    if not source.is_file():
        fail("helper.source_missing")

    # Defense in depth: this helper must never be usable to overwrite
    # arbitrary files, even if the web server is compromised.
    if target.parent != ALLOWED_DIR or not target.name.endswith(".conf"):
        fail("helper.bad_target")
    if target.is_symlink():
        fail("helper.symlink_target")

    # Re-validate as root as well, so nothing unvalidated reaches smb.conf.
    try:
        result = subprocess.run(
            ["testparm", "-s", str(source)],
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        fail("helper.testparm_missing")
    if result.returncode != 0:
        fail((result.stderr or result.stdout or "testparm failed").strip())

    if not target.parent.is_dir():
        fail("helper.target_dir_missing")

    if target.exists():
        mode = stat.S_IMODE(target.stat().st_mode)
        uid = target.stat().st_uid
        gid = target.stat().st_gid
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup = target.with_name(target.name + "." + timestamp + ".bak")
        shutil.copy2(target, backup)
    else:
        mode, uid, gid = 0o600, 0, 0

    fd, temp_name = tempfile.mkstemp(
        prefix=".smb.conf.apply.", dir=str(target.parent)
    )
    try:
        with os.fdopen(fd, "wb") as destination, open(source, "rb") as origin:
            shutil.copyfileobj(origin, destination)
        os.chmod(temp_name, mode)
        os.chown(temp_name, uid, gid)
        os.replace(temp_name, target)
    finally:
        if os.path.exists(temp_name):
            os.unlink(temp_name)

    print("OK")


if __name__ == "__main__":
    main()
