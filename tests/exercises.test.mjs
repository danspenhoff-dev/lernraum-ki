import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateChoice} from '../assets/js/exercises.js';
const q={correctId:'b',feedbackById:{a:'Eine feste Regel.',b:'Aus Beispielen gelernt.'}};
test('unbeantwortet und ungültig bleiben ohne Bewertung',()=>{for(const value of [null,undefined,'','x','toString']) assert.equal(evaluateChoice(q,value).status,'unanswered');});
test('richtige und falsche Antworten erhalten spezifische Erklärungen',()=>{assert.deepEqual(evaluateChoice(q,'a'),{status:'incorrect',message:'Eine feste Regel.'});assert.deepEqual(evaluateChoice(q,'b'),{status:'correct',message:'Aus Beispielen gelernt.'});});
test('wiederholte Antworten sind stabil',()=>assert.deepEqual(evaluateChoice(q,'b'),evaluateChoice(q,'b')));
