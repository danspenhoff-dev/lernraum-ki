# Lernraum KI

Lokaler Prototyp eines Selbstlernkurses für Berufsschüler (18–25 Jahre), mit kaufmännischen Beispielen. Sechs Kapitel werden vorgestellt; verfügbar sind **KI im Büroalltag** und **Vom Chat zum Agenten**.

## Vorschau

Node.js 22.13 oder neuer verwenden; die Entwicklung wurde mit 24.19 geprüft. Keine Pakete installieren.

```text
node scripts/serve.mjs --base=/lernraum-ki/
```

Danach http://127.0.0.1:4173/lernraum-ki/ öffnen. Der Server lauscht nur auf dem eigenen Computer. Mit Strg+C beenden. Eine andere Portnummer lässt sich über die Umgebungsvariable `PORT` wählen. Für interaktive Übungen einen HTTP-Server verwenden, nicht nur eine HTML-Datei doppelklicken.

## Bearbeiten und prüfen

```text
node scripts/build-pages.mjs
node --test --test-isolation=none
```

`--test-isolation=none` vermeidet zusätzliche Prozesse in eingeschränkten Windows-Umgebungen. Die Tests prüfen Antwortauswertung, Budget, Befugnisse, Freigaben und ungültige Eingaben.

## Aufbau und weitere Kurse

1. Neue Inhalte als HTML-Fragmente in `content/<kurs>/` verfassen. Vorhandene Lernziel-, Aufgaben- und Zusammenfassungsbausteine übernehmen.
2. Metadaten und Pfade in `assets/js/course.js` pflegen. Für einen weiteren Kurs ein eigenes Datenmodul nach demselben Schema verwenden.
3. Die Seitenerzeugung in `scripts/build-pages.mjs` um die neue Einheit ergänzen. Überschrift, Inhaltsverzeichnis und zugehöriges Interaktionsmodul festlegen.
4. Seiten neu erzeugen; gemeinsame Gestaltung bleibt in `assets/css/`.
5. Verlinkung und Interaktionen unter dem Projekt-Unterpfad prüfen. Die README beschreibt bewusst einen Arbeitsablauf mit Codex, keinen fertigen grafischen Kurseditor.

## GitHub Pages vorbereiten

Die veröffentlichbaren Dateien sind `index.html`, `404.html`, `kurse/` und `assets/`. Für eine spätere Bereitstellung wird nur diese Auswahl in ein Veröffentlichungsverzeichnis oder einen Pages-Branch übernommen; `docs/qa/`, Tests und interne Quellen werden nicht als Lerninhalt ausgeliefert. Das öffentliche Repository ist danspenhoff-dev/lernraum-ki. Die Pages-Konfiguration steht noch aus.

Die Seite verwendet relative Ressourcenpfade. Die lokale Vorschau testet den Unterpfad `/lernraum-ki/`. Die eigenständige 404-Seite benötigt keine externen Ressourcen und erhält ihren Rückweg beim Erzeugen. Für ein Repository namens `mein-kurs` die Seiten mit `node scripts/build-pages.mjs --base=/mein-kurs/` erzeugen; für eine eigene Domain `--base=/` verwenden. Ohne Angabe gilt `/lernraum-ki/`. Den tatsächlichen Pages-Pfad vor Veröffentlichung prüfen. Der lokale Server setzt den Rückweg entsprechend seinem eigenen `--base`-Parameter.

## Datenschutz und Grenzen

Keine Anmeldung, Cookies, Analysewerkzeuge, externen Schriftdateien oder KI-Dienste. Antworten werden im Speicher der aktuellen Seite verarbeitet und nicht übertragen. Neuladen setzt sie zurück. Der Browser kann bei Zurücknavigation Seiten aus seinem Verlauf wiederherstellen; eine verlässliche dauerhafte Speicherung ist nicht vorgesehen.

Das ersetzt keine rechtliche Prüfung: Hosting-Verbindungsdaten, schulische Freigabe, verantwortliche Stelle und erforderliche Datenschutz-/Anbieterinformationen müssen vor Veröffentlichung geklärt werden. Es gibt keine zentrale Leistungsbewertung und keinen überprüfbaren Abschlussnachweis. Die Agentenübung ist regelbasiert und führt keine echten Buchungen aus.

Fachliche Quellen stehen am Ende der Einheiten. Aufbau und Layout sind von Elements of AI angeregt; Texte und SVG-Illustrationen wurden für diesen Prototyp erstellt.
