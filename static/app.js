"use strict";

const I18N = {
  de: {
    "app.title": "Samba Configuration Manager",
    "dirty": "• ungespeicherte Änderungen",
    "rootNeeded": "Root-Passwort nötig",
    "reload": "Neu laden",
    "saveConfig": "Konfiguration speichern",
    "save": "Speichern",
    "cancel": "Abbrechen",
    "edit": "Bearbeiten",
    "remove": "Entfernen",
    "sections": "Konfigurationsbereiche",
    "section.count": "{n} Bereiche",
    "section.select": "Bitte Bereich auswählen",
    "section.title": "Bereich: [{name}]",
    "section.params": "{n} Parameter",
    "share.new": "+ Neue Freigabe",
    "share.newTitle": "Neue Freigabe",
    "share.edit": "Freigabe bearbeiten",
    "share.delete": "Freigabe löschen",
    "option.new": "+ Parameter",
    "option.newTitle": "Parameter hinzufügen",
    "option.edit": "Parameter bearbeiten",
    "table.parameter": "Parameter",
    "table.value": "Wert",
    "table.actions": "Aktionen",
    "table.empty": "Für diesen Bereich sind keine Parameter definiert.",
    "config.file": "Konfigurationsdatei: {path}",
    "testparm.missing": "testparm fehlt – Speichern nicht möglich",
    "field.name": "Name",
    "field.comment": "Kommentar",
    "field.path": "Pfad",
    "field.access": "Zugriff",
    "field.users": "Berechtigte Benutzer",
    "field.guest": "Gastzugriff erlauben",
    "field.browseable": "Im Netzwerk sichtbar",
    "field.createMask": "Rechte-Maske Dateien",
    "field.dirMask": "Rechte-Maske Ordner",
    "field.optionName": "Parametername",
    "access.rw": "Lesen und Schreiben",
    "access.ro": "Nur Lesen",
    "ph.shareName": "z. B. freigabe",
    "ph.optionName": "z. B. read only",
    "option.hint": "Leer lassen, um einen Parameter ohne Wert zu setzen.",
    "browse": "Durchsuchen…",
    "browse.title": "Verzeichnis wählen",
    "browse.go": "Los",
    "browse.select": "Auswählen",
    "password.title": "Root-Passwort erforderlich",
    "password.description": "Nur der Schreibvorgang läuft mit Root-Rechten. Das Passwort wird ausschließlich an <code>sudo</code> übergeben, nicht gespeichert und nicht protokolliert.",
    "password.field": "Root-Passwort",
    "confirm.title": "Bestätigen",
    "confirm.ok": "Bestätigen",
    "confirm.deleteShare": "Freigabe [{name}] wirklich löschen?",
    "confirm.deleteOption": "Parameter '{key}' entfernen?",
    "confirm.reload": "Alle ungespeicherten Änderungen verwerfen?",
    "error.share.form": "Bitte Name und Pfad der Freigabe prüfen.",
    "share.added": "Freigabe [{name}] hinzugefügt.",
    "share.updated": "Freigabe [{name}] aktualisiert.",
    "share.deleted": "Freigabe [{name}] gelöscht.",
    "option.added": "Parameter '{key}' hinzugefügt.",
    "option.updated": "Parameter '{key}' aktualisiert.",
    "option.removed": "Parameter '{key}' entfernt.",
    "config.reloaded": "Konfiguration neu geladen.",
    "config.saved": "Die Samba-Konfiguration wurde validiert und gespeichert.",
    "error.unknown": "Ein Fehler ist aufgetreten.",
    "error.name.empty": "Der Name darf nicht leer sein.",
    "error.name.global": "'global' ist kein gültiger Freigabename.",
    "error.name.invalid": "Der Freigabename enthält ungültige Zeichen.",
    "error.share.exists": "Diese Freigabe existiert bereits.",
    "error.share.missing": "Freigabe nicht gefunden.",
    "error.global.delete": "Global kann nicht gelöscht werden.",
    "error.section.missing": "Abschnitt nicht gefunden.",
    "error.option.empty": "Der Parametername darf nicht leer sein.",
    "error.option.invalid": "Ungültiger Parametername.",
    "error.option.exists": "Dieser Parameter existiert bereits.",
    "error.option.missing": "Parameter nicht gefunden.",
    "error.browse.failed": "Verzeichnis kann nicht gelesen werden: {detail}",
    "error.testparm.missing": "testparm wurde nicht gefunden. Bitte Samba installieren: Debian/Ubuntu: sudo apt install samba-common-bin, Fedora/RHEL: sudo dnf install samba-common-tools, openSUSE: sudo zypper install samba, Arch: sudo pacman -S samba",
    "error.helper.missing": "Privilegierter Helfer fehlt: {path}",
    "error.sudo.missing": "sudo wurde nicht gefunden.",
    "error.sudo.timeout": "Zeitüberschreitung beim privilegierten Speichern.",
    "error.password.required": "Zum Speichern wird das Root-Passwort benötigt.",
    "error.password.wrong": "Das Root-Passwort ist falsch.",
    "error.password.remote": "Das Root-Passwort darf nur über eine lokale Verbindung übertragen werden.",
    "helper.source_missing": "Die vorbereitete Konfiguration wurde nicht gefunden.",
    "helper.bad_target": "Zielpfad ist keine Samba-Konfiguration unter /etc/samba/*.conf.",
    "helper.symlink_target": "Zielpfad ist ein symbolischer Link.",
    "helper.testparm_missing": "testparm wurde nicht gefunden.",
    "helper.target_dir_missing": "Das Zielverzeichnis existiert nicht."
  },

  en: {
    "app.title": "Samba Configuration Manager",
    "dirty": "• unsaved changes",
    "rootNeeded": "root password required",
    "reload": "Reload",
    "saveConfig": "Save configuration",
    "save": "Save",
    "cancel": "Cancel",
    "edit": "Edit",
    "remove": "Remove",
    "sections": "Configuration sections",
    "section.count": "{n} sections",
    "section.select": "Select a section",
    "section.title": "Section: [{name}]",
    "section.params": "{n} parameters",
    "share.new": "+ New share",
    "share.newTitle": "New share",
    "share.edit": "Edit share",
    "share.delete": "Delete share",
    "option.new": "+ Parameter",
    "option.newTitle": "Add parameter",
    "option.edit": "Edit parameter",
    "table.parameter": "Parameter",
    "table.value": "Value",
    "table.actions": "Actions",
    "table.empty": "No parameters are defined for this section.",
    "config.file": "Configuration file: {path}",
    "testparm.missing": "testparm missing – saving unavailable",
    "field.name": "Name",
    "field.comment": "Comment",
    "field.path": "Path",
    "field.access": "Access",
    "field.users": "Valid users",
    "field.guest": "Allow guest access",
    "field.browseable": "Visible on the network",
    "field.createMask": "File permission mask",
    "field.dirMask": "Directory permission mask",
    "field.optionName": "Parameter name",
    "access.rw": "Read and write",
    "access.ro": "Read only",
    "ph.shareName": "e.g. share",
    "ph.optionName": "e.g. read only",
    "option.hint": "Leave empty to set a parameter without a value.",
    "browse": "Browse…",
    "browse.title": "Choose directory",
    "browse.go": "Go",
    "browse.select": "Select",
    "password.title": "Root password required",
    "password.description": "Only the write operation runs with root privileges. The password is passed only to <code>sudo</code>, never stored or logged.",
    "password.field": "Root password",
    "confirm.title": "Confirm",
    "confirm.ok": "Confirm",
    "confirm.deleteShare": "Really delete share [{name}]?",
    "confirm.deleteOption": "Remove parameter '{key}'?",
    "confirm.reload": "Discard all unsaved changes?",
    "error.share.form": "Please check the share name and path.",
    "share.added": "Share [{name}] added.",
    "share.updated": "Share [{name}] updated.",
    "share.deleted": "Share [{name}] deleted.",
    "option.added": "Parameter '{key}' added.",
    "option.updated": "Parameter '{key}' updated.",
    "option.removed": "Parameter '{key}' removed.",
    "config.reloaded": "Configuration reloaded.",
    "config.saved": "The Samba configuration was validated and saved.",
    "error.unknown": "An error occurred.",
    "error.name.empty": "The name must not be empty.",
    "error.name.global": "'global' is not a valid share name.",
    "error.name.invalid": "The share name contains invalid characters.",
    "error.share.exists": "This share already exists.",
    "error.share.missing": "Share not found.",
    "error.global.delete": "'global' cannot be deleted.",
    "error.section.missing": "Section not found.",
    "error.option.empty": "The parameter name must not be empty.",
    "error.option.invalid": "Invalid parameter name.",
    "error.option.exists": "This parameter already exists.",
    "error.option.missing": "Parameter not found.",
    "error.browse.failed": "Cannot read directory: {detail}",
    "error.testparm.missing": "testparm was not found. Please install Samba: Debian/Ubuntu: sudo apt install samba-common-bin, Fedora/RHEL: sudo dnf install samba-common-tools, openSUSE: sudo zypper install samba, Arch: sudo pacman -S samba",
    "error.helper.missing": "Privileged helper missing: {path}",
    "error.sudo.missing": "sudo was not found.",
    "error.sudo.timeout": "Timed out while saving with elevated privileges.",
    "error.password.required": "Root password required to save.",
    "error.password.wrong": "The root password is incorrect.",
    "error.password.remote": "The root password may only be submitted over a local connection.",
    "helper.source_missing": "The prepared configuration was not found.",
    "helper.bad_target": "Target is not a Samba configuration under /etc/samba/*.conf.",
    "helper.symlink_target": "Target path is a symbolic link.",
    "helper.testparm_missing": "testparm was not found.",
    "helper.target_dir_missing": "The target directory does not exist."
  },

  nl: {
    "app.title": "Samba Configuration Manager",
    "dirty": "• niet-opgeslagen wijzigingen",
    "rootNeeded": "root-wachtwoord vereist",
    "reload": "Herladen",
    "saveConfig": "Configuratie opslaan",
    "save": "Opslaan",
    "cancel": "Annuleren",
    "edit": "Bewerken",
    "remove": "Verwijderen",
    "sections": "Configuratiesecties",
    "section.count": "{n} secties",
    "section.select": "Selecteer een sectie",
    "section.title": "Sectie: [{name}]",
    "section.params": "{n} parameters",
    "share.new": "+ Nieuwe share",
    "share.newTitle": "Nieuwe share",
    "share.edit": "Share bewerken",
    "share.delete": "Share verwijderen",
    "option.new": "+ Parameter",
    "option.newTitle": "Parameter toevoegen",
    "option.edit": "Parameter bewerken",
    "table.parameter": "Parameter",
    "table.value": "Waarde",
    "table.actions": "Acties",
    "table.empty": "Er zijn geen parameters gedefinieerd voor deze sectie.",
    "config.file": "Configuratiebestand: {path}",
    "testparm.missing": "testparm ontbreekt – opslaan niet mogelijk",
    "field.name": "Naam",
    "field.comment": "Opmerking",
    "field.path": "Pad",
    "field.access": "Toegang",
    "field.users": "Geldige gebruikers",
    "field.guest": "Gasttoegang toestaan",
    "field.browseable": "Zichtbaar in het netwerk",
    "field.createMask": "Bestandsmasker",
    "field.dirMask": "Mapmasker",
    "field.optionName": "Parameternaam",
    "access.rw": "Lezen en schrijven",
    "access.ro": "Alleen lezen",
    "ph.shareName": "bijv. share",
    "ph.optionName": "bijv. read only",
    "option.hint": "Laat leeg om een parameter zonder waarde in te stellen.",
    "browse": "Bladeren…",
    "browse.title": "Map kiezen",
    "browse.go": "Ga",
    "browse.select": "Selecteren",
    "password.title": "Root-wachtwoord vereist",
    "password.description": "Alleen de schrijfactie wordt met root-rechten uitgevoerd. Het wachtwoord wordt alleen aan <code>sudo</code> doorgegeven, niet opgeslagen of gelogd.",
    "password.field": "Root-wachtwoord",
    "confirm.title": "Bevestigen",
    "confirm.ok": "Bevestigen",
    "confirm.deleteShare": "Share [{name}] echt verwijderen?",
    "confirm.deleteOption": "Parameter '{key}' verwijderen?",
    "confirm.reload": "Alle niet-opgeslagen wijzigingen verwerpen?",
    "error.share.form": "Controleer de naam en het pad van de share.",
    "share.added": "Share [{name}] toegevoegd.",
    "share.updated": "Share [{name}] bijgewerkt.",
    "share.deleted": "Share [{name}] verwijderd.",
    "option.added": "Parameter '{key}' toegevoegd.",
    "option.updated": "Parameter '{key}' bijgewerkt.",
    "option.removed": "Parameter '{key}' verwijderd.",
    "config.reloaded": "Configuratie herladen.",
    "config.saved": "De Samba-configuratie is gevalideerd en opgeslagen.",
    "error.unknown": "Er is een fout opgetreden.",
    "error.name.empty": "De naam mag niet leeg zijn.",
    "error.name.global": "'global' is geen geldige sharenaam.",
    "error.name.invalid": "De sharenaam bevat ongeldige tekens.",
    "error.share.exists": "Deze share bestaat al.",
    "error.share.missing": "Share niet gevonden.",
    "error.global.delete": "'global' kan niet worden verwijderd.",
    "error.section.missing": "Sectie niet gevonden.",
    "error.option.empty": "De parameternaam mag niet leeg zijn.",
    "error.option.invalid": "Ongeldige parameternaam.",
    "error.option.exists": "Deze parameter bestaat al.",
    "error.option.missing": "Parameter niet gevonden.",
    "error.browse.failed": "Map kan niet worden gelezen: {detail}",
    "error.testparm.missing": "testparm niet gevonden. Installeer Samba: Debian/Ubuntu: sudo apt install samba-common-bin, Fedora/RHEL: sudo dnf install samba-common-tools, openSUSE: sudo zypper install samba, Arch: sudo pacman -S samba",
    "error.helper.missing": "Bevoorrechte helper ontbreekt: {path}",
    "error.sudo.missing": "sudo niet gevonden.",
    "error.sudo.timeout": "Time-out bij het opslaan met verhoogde rechten.",
    "error.password.required": "Root-wachtwoord vereist om op te slaan.",
    "error.password.wrong": "Het root-wachtwoord is onjuist.",
    "error.password.remote": "Het root-wachtwoord mag alleen via een lokale verbinding worden verzonden.",
    "helper.source_missing": "De voorbereide configuratie niet gevonden.",
    "helper.bad_target": "Doelpad is geen Samba-configuratie onder /etc/samba/*.conf.",
    "helper.symlink_target": "Doelpad is een symbolische link.",
    "helper.testparm_missing": "testparm niet gevonden.",
    "helper.target_dir_missing": "De doelmap bestaat niet."
  }
};

const $ = (id) => document.getElementById(id);

let lang = "de";
let state = null;
let selected = null;
let shareEditName = null;
let optionEditKey = null;
let browseTarget = "sharePath";
let currentBrowse = "/";

const isYes = (value) => ["yes", "true", "1"].includes(String(value || "").trim().toLowerCase());

/* ------------------------------------------------------------- translation */

function t(key, params) {
  const table = I18N[lang] || I18N.de;
  let text = table[key];
  if (text === undefined) text = I18N.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([name, value]) => {
      text = text.split(`{${name}}`).join(String(value));
    });
  }
  return text;
}

function translateStatic() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
}

function detectLanguage() {
  const saved = localStorage.getItem("smb-webui-lang");
  if (saved && I18N[saved]) return saved;
  const browser = (navigator.language || "de").toLowerCase();
  if (browser.startsWith("nl")) return "nl";
  if (browser.startsWith("en")) return "en";
  return "de";
}

function setLanguage(next) {
  lang = I18N[next] ? next : "de";
  localStorage.setItem("smb-webui-lang", lang);
  document.documentElement.lang = lang;
  document.title = t("app.title");
  $("languageSelect").value = lang;
  translateStatic();
  render();
}

function messageOf(error) {
  return error.errorKey ? t(error.errorKey, error.params) : (error.message || t("error.unknown"));
}

function responseMessage(data) {
  return data.messageKey ? t(data.messageKey, data.params) : (data.message || "");
}

/* ---------------------------------------------------------------- helpers */

function toast(message, type = "success") {
  const element = document.createElement("div");
  element.className = `toast toast-${type}`;
  element.textContent = message;
  $("toasts").appendChild(element);
  setTimeout(() => element.remove(), 4500);
}

async function run(task) {
  try {
    await task();
  } catch (error) {
    toast(messageOf(error), "error");
  }
}

async function api(path, body) {
  const options = body === undefined
    ? { method: "GET" }
    : {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

  const response = await fetch(path, options);
  let data = {};
  try {
    data = await response.json();
  } catch (_) {
    /* empty response */
  }
  if (!response.ok) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    error.errorKey = data.errorKey;
    error.params = data.params;
    error.code = data.code;
    throw error;
  }
  return data;
}

function applyState(data, preferred) {
  state = data;
  const names = data.sections.map((section) => section.name);
  if (preferred && names.includes(preferred)) {
    selected = preferred;
  } else if (!selected || !names.includes(selected)) {
    selected = names[0] || null;
  }
  render();
}

async function load() {
  applyState(await api("/api/state"));
}

function markInvalid(element) {
  element.classList.add("invalid");
}

function clearInvalid() {
  document.querySelectorAll("input.invalid").forEach((element) => element.classList.remove("invalid"));
}

function openModal(id) {
  clearInvalid();
  $(id).hidden = false;
}

function closeModal(id) {
  $(id).hidden = true;
}

document.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", () => closeModal(element.dataset.close));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal:not([hidden])").forEach((modal) => {
      closeModal(modal.id);
    });
  }
});

document.querySelectorAll("input").forEach((element) => {
  element.addEventListener("input", () => element.classList.remove("invalid"));
});

function confirmDialog(messageKey, params) {
  $("confirmTitle").textContent = t("confirm.title");
  $("confirmMessage").textContent = t(messageKey, params);
  openModal("confirmModal");

  return new Promise((resolve) => {
    const finish = (answer) => {
      window.removeEventListener("keydown", onKey);
      $("confirmOk").removeEventListener("click", onOk);
      $("confirmCancel").removeEventListener("click", onCancel);
      document.querySelectorAll("#confirmModal [data-close]").forEach((element) => {
        element.removeEventListener("click", onCancel);
      });
      closeModal("confirmModal");
      resolve(answer);
    };
    const onOk = () => finish(true);
    const onCancel = () => finish(false);
    const onKey = (event) => {
      if (event.key === "Escape") finish(false);
    };

    $("confirmOk").addEventListener("click", onOk);
    $("confirmCancel").addEventListener("click", onCancel);
    document.querySelectorAll("#confirmModal [data-close]").forEach((element) => {
      element.addEventListener("click", onCancel);
    });
    window.addEventListener("keydown", onKey);
  });
}

/* ----------------------------------------------------------------- render */

function render() {
  if (!state) return;

  const configLabel = t("config.file", { path: state.configFile });
  $("configPath").textContent = configLabel;
  $("footerInfo").textContent = configLabel;
  $("dirtyBadge").hidden = !state.dirty;
  $("rootBadge").hidden = state.root;

  const testparmInfo = $("testparmInfo");
  testparmInfo.textContent = state.testparm ? "" : t("testparm.missing");
  testparmInfo.classList.toggle("warn", !state.testparm);

  const list = $("sectionList");
  list.innerHTML = "";
  state.sections.forEach((section) => {
    const item = document.createElement("li");
    item.className = section.name === selected ? "active" : "";

    const dot = document.createElement("span");
    dot.className = "dot";
    const label = document.createElement("span");
    label.textContent = section.name;
    const count = document.createElement("span");
    count.className = "count";
    count.textContent = String(section.options.length);

    item.append(dot, label, count);
    item.addEventListener("click", () => {
      selected = section.name;
      render();
    });
    list.appendChild(item);
  });
  $("sectionCount").textContent = t("section.count", { n: state.sections.length });

  const current = state.sections.find((section) => section.name === selected);
  const isGlobal = !!selected && selected.toLowerCase() === "global";
  $("btnEditShare").disabled = !current || isGlobal;
  $("btnDeleteShare").disabled = !current || isGlobal;
  $("btnAddOption").disabled = !current;

  $("sectionTitle").textContent = current
    ? t("section.title", { name: current.name })
    : t("section.select");
  $("sectionMeta").textContent = current
    ? t("section.params", { n: current.options.length })
    : "";

  const body = $("optionsBody");
  body.innerHTML = "";
  (current ? current.options : []).forEach((option) => {
    const row = document.createElement("tr");

    const keyCell = document.createElement("td");
    keyCell.textContent = option.key;
    const valueCell = document.createElement("td");
    valueCell.textContent = option.value;

    const actionCell = document.createElement("td");
    actionCell.innerHTML = `
      <div class="row-actions">
        <button type="button" class="btn-icon" data-action="edit"></button>
        <button type="button" class="btn-icon danger" data-action="delete"></button>
      </div>`;
    actionCell.querySelector('[data-action="edit"]').textContent = t("edit");
    actionCell.querySelector('[data-action="delete"]').textContent = t("remove");

    actionCell.querySelector('[data-action="edit"]').addEventListener("click", () => {
      openOptionModal(option.key, option.value);
    });
    actionCell.querySelector('[data-action="delete"]').addEventListener("click", () => run(async () => {
      const answer = await confirmDialog("confirm.deleteOption", { key: option.key });
      if (!answer) return;
      const data = await api("/api/option/delete", { section: selected, key: option.key });
      applyState(data, data.selected);
      toast(responseMessage(data));
    }));

    row.append(keyCell, valueCell, actionCell);
    body.appendChild(row);
  });

  $("emptyHint").hidden = !current || current.options.length > 0;
}

/* ------------------------------------------------------------ share modal */

function openShareModal(name) {
  shareEditName = name || null;
  const section = state.sections.find((item) => item.name === name);
  const options = {};
  (section ? section.options : []).forEach((option) => {
    options[option.key] = option.value;
  });

  $("shareModalTitle").textContent = name ? t("share.edit") : t("share.newTitle");
  $("shareName").value = name || "";
  $("shareComment").value = options["comment"] || "";
  $("sharePath").value = options["path"] || "";
  $("shareAccess").value = isYes(options["read only"]) ? "yes" : "no";
  $("shareUsers").value = options["valid users"] || "";
  $("shareForceUser").value = options["force user"] || "";
  $("shareForceGroup").value = options["force group"] || "";
  $("shareGuest").checked = isYes(options["guest ok"]);
  $("shareBrowseable").checked = options["browseable"] === undefined
    ? true
    : isYes(options["browseable"]);
  $("shareCreateMask").value = options["create mask"] || "0775";
  $("shareDirMask").value = options["directory mask"] || "0775";

  openModal("shareModal");
  $("shareName").focus();
}

$("shareForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("shareName").value.trim();
  const path = $("sharePath").value.trim();

  let valid = true;
  if (!name || name.toLowerCase() === "global" || /[\[\]=#;\\/\r\n\t]/.test(name)) {
    markInvalid($("shareName"));
    valid = false;
  }
  if (!path) {
    markInvalid($("sharePath"));
    valid = false;
  }
  if (!valid) {
    toast(t("error.share.form"), "error");
    return;
  }

  const options = {
    "path": path,
    "read only": $("shareAccess").value,
    "guest ok": $("shareGuest").checked ? "yes" : "no",
    "browseable": $("shareBrowseable").checked ? "yes" : "no",
    "create mask": $("shareCreateMask").value.trim() || "0775",
    "directory mask": $("shareDirMask").value.trim() || "0775",
  };
  const optional = {
    "comment": $("shareComment").value,
    "valid users": $("shareUsers").value,
    "force user": $("shareForceUser").value,
    "force group": $("shareForceGroup").value,
  };
  Object.entries(optional).forEach(([key, value]) => {
    if (value.trim()) options[key] = value.trim();
  });

  run(async () => {
    const data = shareEditName
      ? await api("/api/share/update", { name: shareEditName, newName: name, options })
      : await api("/api/share/add", { name, options });
    closeModal("shareModal");
    applyState(data, data.selected);
    toast(responseMessage(data));
  });
});

/* ----------------------------------------------------------- option modal */

function openOptionModal(key, value) {
  optionEditKey = key || null;
  $("optionModalTitle").textContent = key ? t("option.edit") : t("option.newTitle");
  $("optionKey").value = key || "";
  $("optionKey").disabled = !!key;
  $("optionValue").value = value || "";

  openModal("optionModal");
  (key ? $("optionValue") : $("optionKey")).focus();
}

$("optionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const key = optionEditKey || $("optionKey").value.trim();
  if (!key || !selected) {
    markInvalid($("optionKey"));
    return;
  }

  run(async () => {
    const data = await api(
      optionEditKey ? "/api/option/update" : "/api/option/add",
      { section: selected, key, value: $("optionValue").value }
    );
    closeModal("optionModal");
    applyState(data, data.selected);
    toast(responseMessage(data));
  });
});

/* ------------------------------------------------------------ browse modal */

async function openBrowse(targetId) {
  browseTarget = targetId;
  $("browsePath").value = $(targetId).value.trim() || "/";
  openModal("browseModal");
  await browseTo($("browsePath").value);
}

async function browseTo(path) {
  const data = await api("/api/browse", { path });
  currentBrowse = data.path;
  $("browsePath").value = data.path;

  const list = $("browseList");
  list.innerHTML = "";

  if (data.parent !== null) {
    const up = document.createElement("li");
    up.textContent = "↑ ..";
    up.addEventListener("click", () => run(() => browseTo(data.parent)));
    list.appendChild(up);
  }
  data.dirs.forEach((dir) => {
    const item = document.createElement("li");
    item.textContent = `📁 ${dir}`;
    item.addEventListener("click", () => {
      const separator = data.path === "/" ? "" : "/";
      run(() => browseTo(`${data.path}${separator}${dir}`));
    });
    list.appendChild(item);
  });
}

$("btnBrowse").addEventListener("click", () => run(() => openBrowse("sharePath")));
$("browseGo").addEventListener("click", () => run(() => browseTo($("browsePath").value)));
$("browseSelect").addEventListener("click", () => {
  $(browseTarget).value = currentBrowse;
  closeModal("browseModal");
});

/* ---------------------------------------------------------------- toolbar */

$("btnAddShare").addEventListener("click", () => openShareModal(null));
$("btnEditShare").addEventListener("click", () => {
  if (selected) openShareModal(selected);
});
$("btnDeleteShare").addEventListener("click", () => run(async () => {
  if (!selected || selected.toLowerCase() === "global") return;
  const answer = await confirmDialog("confirm.deleteShare", { name: selected });
  if (!answer) return;
  const data = await api("/api/share/delete", { name: selected });
  applyState(data);
  toast(responseMessage(data));
}));
$("btnAddOption").addEventListener("click", () => {
  if (selected) openOptionModal(null, "");
});

async function reload() {
  if (state && state.dirty) {
    const answer = await confirmDialog("confirm.reload");
    if (!answer) return;
  }
  const data = await api("/api/reload", {});
  applyState(data);
  toast(responseMessage(data));
}

async function save(password) {
  const data = await api("/api/save", password ? { password } : {});
  applyState(data);
  toast(responseMessage(data));
}

function askForPassword() {
  $("rootPassword").value = "";
  openModal("passwordModal");
  $("rootPassword").focus();
}

function requestSave() {
  if (state && state.root) {
    run(async () => {
      try {
        await save();
      } catch (error) {
        if (error.code === "ROOT_PASSWORD_REQUIRED") {
          askForPassword();
          return;
        }
        throw error;
      }
    });
  } else {
    askForPassword();
  }
}

$("passwordForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const password = $("rootPassword").value;
  if (!password) {
    markInvalid($("rootPassword"));
    return;
  }
  run(async () => {
    try {
      await save(password);
      closeModal("passwordModal");
    } finally {
      $("rootPassword").value = "";
    }
  });
});

document.querySelectorAll("#passwordModal [data-close]").forEach((element) => {
  element.addEventListener("click", () => {
    $("rootPassword").value = "";
  });
});

$("btnReloadTop").addEventListener("click", () => run(reload));
$("btnSaveTop").addEventListener("click", requestSave);
$("languageSelect").addEventListener("change", (event) => setLanguage(event.target.value));

/* ------------------------------------------------------------------- init */

setLanguage(detectLanguage());
run(load);
