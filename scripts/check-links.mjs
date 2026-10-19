import {readFile,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
for(const p of ['index.html','kurse/ki/bueroalltag.html','kurse/ki/agenten.html']){
 const s=await readFile(p,'utf8');
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){
  const [u,anchor]=m[1].split('#');
  if(/^https?:/.test(u))continue;
  const target=resolve(dirname(p),u||p.split('/').at(-1));
  await access(target);
  if(anchor&&!((await readFile(target,'utf8')).includes(`id="${anchor}"`)))throw new Error(`Fehlender Anker: ${p} -> ${m[1]}`);
 }
}
console.log('Alle lokalen HTML-Ressourcen, Links und Sprungziele vorhanden.');
