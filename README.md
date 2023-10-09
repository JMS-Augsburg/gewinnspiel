# JMS Gewinnspiel

Dies ist ein einfaches `node.js`-Tool, um ein Formular zur Teilnahme am Gewinnspiel
zur diesjährigen Bewerbungsphase von [JMS Augsburg e.V.](https://jms-augsburg.de/)
bereitzustellen.

Mehr Infos zum Gewinnspiel finden sich auf der [Teilnahmeseite](https://gewinnspiel.jms-augsburg.de).

Mehr Infos zu JMS und warum man sich bewerben sollte, gibt es auf unserer [Homepage](https://jms-augsburg.de/studierende/)
und natürlich am [**Infoabend** am 25.10.2023](https://jms-augsburg.de/studierende/#:~:text=Infoabend.).


# Entwicklung

Dieses Repository kann einfach mit einer der folgenden Optionen bearbeitet werden.

Der Einstiegspunkt für die Anwendung ist dabei [`app.js`](app.js).

## Direkt im Browser mit [StackBlitz](https://stackblitz.com/)

StackBlitz bietet eine komplette IDE direkt im Browser. Um sie zu starten, musst du nur folgenden Link öffnen.

Allerdings werden aktuell [nur Google Chrome/Chromium-basierte Browser vollständig unterstützt](https://developer.stackblitz.com/platform/webcontainers/browser-support).
Sollte folgender Link bei dir also nicht funktionieren, versuche eine der anderen Methoden:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/JMS-Augsburg/gewinnspiel)

## Mit [`vscode`](https://code.visualstudio.com/)

Voraussetzung: lokal installiertes [`node.js` und `npm`](https://nodejs.org/).

- Repository in VSCode öffnen
- aus Debug-Panel "Start Server"-Config starten (Keyboard-Shortcut: `F5`)

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
