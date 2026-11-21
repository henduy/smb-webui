# Samba Configuration Manager (Web UI)

A small browser-based interface for editing `/etc/samba/smb.conf` safely.

The interface is available in German, English and Dutch. Use the selector in
the top-right corner; the choice is remembered in the browser.

## Features

- **Guided share wizard** for the common Samba settings: share name, comment,
  path (with a server-side directory browser), read/write access, valid users,
  `force user` / `force group`, guest access, network visibility and
  file/directory permission masks.
- **Advanced parameter editor** for any option in `global` or a share.
- **Staged edits**: changes stay in memory until you press
  "Konfiguration speichern"; "Neu laden" discards them.
- **Safe saves**: every configuration is validated with `testparm -s` before
  being written, a timestamped backup is created, file permissions are
  preserved, and the new file is moved into place atomically.
- **Least privilege**: the web server normally runs as your user. Only the
  final write is executed through `sudo` by a small helper; the root password
  is requested in the browser at save time and is never stored.
- **Browser-based**: runs as a local web server; any modern browser can be
  used, including from another machine if explicitly enabled.
- **Optional HTTP Basic authentication** for non-local access.

## Requirements

- Python 3.9 or newer
  - Debian/Ubuntu: also install `python3-venv`
  - openSUSE: `sudo zypper install python3-venv` if `python3 -m venv` is missing
- Flask 2.3 or newer (see `requirements.txt`)
- `testparm` from the Samba suite
  - Debian/Ubuntu: `sudo apt install samba-common-bin`
  - Fedora/RHEL: `sudo dnf install samba-common-tools`
  - openSUSE: `sudo zypper install samba`
  - Arch: `sudo pacman -S samba`
- A modern browser

## Installation (from source)

```bash
git clone https://github.com/henduy/smb-webui.git
cd smb-webui

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run it with Python:

```bash
python3 smb-webui.py
```

Then open <http://127.0.0.1:8080> in your browser.

Start the server as your normal user:

```bash
python3 smb-webui.py
```

Reading and editing in the UI need no special privileges. When you press
"Konfiguration speichern", the browser asks for your root password. The server
validates the staged configuration, then starts a short-lived `sudo` process
that runs `smb-webui-apply.py`. The password is passed to `sudo` via standard
input only — it is never written to disk, an environment variable, the command
line, or the server log, and it is cleared from the browser immediately after
the request. `sudo` must be installed and your user must be allowed to use it.

### Command-line options

| Option | Default | Description |
| --- | --- | --- |
| `--host` | `127.0.0.1` | Address to listen on |
| `--port` | `8080` | Port to listen on |
| `--config` | `/etc/samba/smb.conf` | Path to the configuration file |
| `--debug` | off | Enable Flask debug mode |

The same settings can be provided via environment variables:
`SMB_WEBUI_HOST`, `SMB_WEBUI_PORT`, `SMB_CONFIG_FILE`.

Example for a different config file (useful for testing):

```bash
python3 smb-webui.py --config ./smb.conf --port 8081
```

The password-based save helper only accepts targets under
`/etc/samba/*.conf`. For a custom path, run the server as root instead.

## System-wide installation

For a system-wide install (the script asks for root privileges):

```bash
./install.sh
```

This installs the app into `/opt/smb-webui` with a dedicated virtual
environment, adds a launcher at `/usr/local/bin/smb-webui`, and installs an
optional systemd service at `/etc/systemd/system/smb-webui.service`. The
service is **not enabled automatically**. In the default (unprivileged) setup
you can leave it disabled and just run `smb-webui` as your user; saving will
ask for the root password as described above.

Alternatively, enable the service to run the whole server as root in the
background (no password prompt on save):

```bash
sudo systemctl enable --now smb-webui
```

Then open <http://127.0.0.1:8080>.

To remove it later:

```bash
./uninstall.sh
```

Neither script touches your Samba configuration files.

## Security notes

- The server binds to `127.0.0.1` by default, so it is only reachable from the
  local machine. Root rights are acquired only for the final write, through a
  short-lived `sudo` process running `smb-webui-apply.py`.
- The privileged helper rejects any target that is not a regular file under
  `/etc/samba/*.conf`, re-runs `testparm` before writing, preserves ownership
  and permissions, and replaces the file atomically.
- The root password is submitted only with a save request and only from a
  loopback address. It goes to `sudo` via stdin, is never stored on the
  server, never logged, and is cleared from the browser after the request.
  Do not use the password prompt over a remote connection.
- If you change `--host` to a network address, set HTTP Basic credentials and
  prefer the root-run service (which needs no password prompt):

  ```bash
  SMB_WEBUI_USER=admin SMB_WEBUI_PASSWORD='a-long-password' \
    python3 smb-webui.py --host 0.0.0.0
  ```

  For the systemd service, put these variables in `/etc/smb-webui.env` with
  mode `0600`. The startup script warns if you expose the app without
  authentication.
- Use only on machines where you are authorized to administer Samba.

## License

[MIT](LICENSE) — see the `LICENSE` file for details.
