import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('Fehlerseite benötigt keine relativ aufgelösten Ressourcen',async()=>{const html=await readFile(new URL('../404.html',import.meta.url),'utf8');assert.doesNotMatch(html,/<link[^>]+rel="stylesheet"/);assert.match(html,/<style>/);assert.match(html,/href="\/lernraum-ki\/"/);});
test('Quiz ohne JavaScript kann keine Antworten absenden',async()=>{const html=await readFile(new URL('../kurse/ki/bueroalltag.html',import.meta.url),'utf8');assert.equal((html.match(/<fieldset disabled>/g)||[]).length,3);assert.equal((html.match(/type="submit" disabled/g)||[]).length,3);});
