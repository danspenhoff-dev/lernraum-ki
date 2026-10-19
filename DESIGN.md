# Gestaltung des Lernraums

Die gemeinsame Vorlage richtet sich an Berufsschüler zwischen 18 und 25 Jahren. Große Überschriften, farbige Kapitelillustrationen und ruhige Leseseiten unterstützen die Orientierung. Elements of AI war die Gestaltungsreferenz; Texte und SVGs sind eigenständig.

## Zentrale Regeln

Alle Farben, Schrift- und Abstandsgrundlagen liegen in `assets/css/tokens.css`: Text #292344, Leitfarbe #5143A6, Seitenfläche #FAFAFC, Weiß, Mint #BCEDE5, Apricot #FFE0B5 und Flieder #DDD6F5. Systemschrift ohne externen Abruf. Lauftext 17 Pixel, Zeilenhöhe 1,65, maximal 70ch in Lerneinheiten. Farbe nie als einziges Rückmeldesignal.

Kapitelübersicht: drei Spalten, unter 1000 Pixeln zwei, unter 700 Pixeln eine. Lerneinheiten: Inhalt mit seitlichem Inhaltsverzeichnis; unter 700 Pixeln steht das Verzeichnis oberhalb des Textes. Sichtbarer Tastaturfokus, native Radiofelder und Selects, zusammenhängende Label-Klickflächen, beschriftetes Mobilmenü.

## Bausteine

- `.chapter`: Illustration, Kapitelnummer, Verfügbarkeit, Titel, Zusammenfassung, Link oder Vorschauhinweis.
- `.goals`: Lernziele als Liste.
- `.case`: praxisbezogener Fall mit Überschrift und Erklärung.
- `.exercise`: HTML-Formular mit `data-exercise`, `data-correct`, Antwortkennungen und Erklärung in `data-feedback`. Kein Backend.
- `details/summary`: native aufklappbare Hilfen.
- `.feedback`: Erklärung mit zusätzlichem Statuswort; `aria-live=polite`.
- `.summary`: Abschluss und Transferfrage.
- `.sim`: gekennzeichnete Simulation mit vier Schritten und vollständigem Neustart.

Eigene Illustrationen liegen in `assets/img/`. Kein Hotlinking. Keine automatische Animation; sanftes Scrollen wird bei reduzierter Bewegung deaktiviert.

Änderungen an gemeinsamen Seitenteilen erfolgen in `scripts/build-pages.mjs`, an Lerntexten in `content/ki/`. Danach `node scripts/build-pages.mjs` ausführen. Die erzeugten HTML-Dateien gehören zur Veröffentlichung und bleiben ohne Buildserver nutzbar.
