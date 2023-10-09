# JMS Gewinnspiel

Dies ist ein einfaches `node.js`-Tool, um ein Formular zur Teilnahme am Gewinnspiel
zur diesjährigen Bewerbungsphase von [JMS Augsburg e.V.](https://jms-augsburg.de/)
bereitzustellen.

Mehr Infos zum Gewinnspiel finden sich auf der [Teilnahmeseite](https://gewinnspiel.jms-augsburg.de).

Mehr Infos zu JMS und warum man sich bewerben sollte, gibt es auf unserer [Homepage](https://jms-augsburg.de/studierende/)
und natürlich am [**Infoabend** am 25.10.2023](https://jms-augsburg.de/studierende/#:~:text=Infoabend.).


# Entwicklung

Dieses Repository kann einfach mit einer der folgenden Optionen bearbeitet werden.

Der Einstiegspunkt für die Anwendung ist dabei [`app.js`](app.js)
und alle Konfigurationen finden sich in [`.env`](.env).

## Direkt im Browser mit [StackBlitz](https://stackblitz.com/)

StackBlitz bietet eine komplette IDE direkt im Browser. Um sie zu starten, musst du nur folgenden Link öffnen.

Allerdings werden aktuell [nur Google Chrome/Chromium-basierte Browser vollständig unterstützt](https://developer.stackblitz.com/platform/webcontainers/browser-support).
Sollte folgender Link bei dir also nicht funktionieren, versuche eine der anderen Methoden:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/JMS-Augsburg/gewinnspiel)

## In [GitHub Codespaces](https://docs.github.com/en/codespaces/overview)

Code einfach im Browser mit GitHub Codespaces öffnen:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/JMS-Augsburg/gewinnspiel)

Zum Starten des Server dann aus Debug-Panel "Start Server"-Config starten (Keyboard-Shortcut: `F5`).

Es sollte automatisch eine Notification erscheinen mit Möglichkeit "Im Browser öffnen".

## Mit [`vscode`](https://code.visualstudio.com/)

Voraussetzung, entweder:
- lokal installiertes [`node.js` und `npm`](https://nodejs.org/)
- installierte [`Dev Containers` Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Ausführen:
- Repository in VSCode öffnen
- optional (empfohlen): Ordner als [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) öffnen - sollte automatisch vorgeschlagen werden
- aus Debug-Panel "Start Server"-Config starten (Keyboard-Shortcut: `F5`)

Danach ist die Anwendung unter http://localhost:3000/ erreichbar.

## Mit `docker compose`

Voraussetzung: lokal installiertes [`docker compose`](https://docs.docker.com/compose/install/).

Folgende Befehle im aktuellen Ordner ausführen:
~~~sh
docker compose up
~~~

Danach ist die Anwendung unter http://localhost:3000/ erreichbar.

## Mit lokalem `node.js`

Voraussetzung: lokal installiertes [`node.js` und `npm`](https://nodejs.org/).

Folgende Befehle im aktuellen Ordner ausführen:
~~~sh
# Abhängigkeiten installieren
npm install

# Anwendung starten
npm run dev
~~~

Danach ist die Anwendung unter http://localhost:3000/ erreichbar.
