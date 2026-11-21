#!/usr/bin/env bash
set -euo pipefail

APP_NAME="smb-webui"
INSTALL_DIR="/opt/$APP_NAME"
BIN_LINK="/usr/local/bin/$APP_NAME"
DOC_DIR="/usr/share/doc/$APP_NAME"
SYSTEMD_UNIT="/etc/systemd/system/$APP_NAME.service"

if [[ "$(id -u)" -ne 0 ]]; then
    echo "This uninstaller needs root privileges. Re-running with sudo..." >&2
    exec sudo "$0" "$@"
fi

echo "Removing $APP_NAME..."
if command -v systemctl >/dev/null 2>&1; then
    systemctl stop "$APP_NAME" 2>/dev/null || true
    systemctl disable "$APP_NAME" 2>/dev/null || true
fi
rm -f "$SYSTEMD_UNIT"
command -v systemctl >/dev/null 2>&1 && systemctl daemon-reload 2>/dev/null || true

rm -f "$BIN_LINK"
rm -rf "$INSTALL_DIR" "$DOC_DIR"

echo "Uninstalled. Your Samba configuration files were not touched."
echo "Note: /etc/smb-webui.env (if you created one) was kept."
