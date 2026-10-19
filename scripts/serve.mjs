import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const baseArg=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'/';
const base='/'+baseArg.split('/').filter(Boolean).join('/')+(baseArg==='/'?'':'/');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
http.createServer(async(req,res)=>{
 try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!path.startsWith(base)){res.writeHead(302,{Location:base});res.end();return;}
  const relative=path.slice(base.length)||'index.html';
  const file=resolve(root,relative);
  if(!file.startsWith(root+sep)||relative.split(/[\\/]/).some(p=>p.startsWith('.'))||!['.html','.css','.js','.svg','.png'].includes(extname(file))){res.writeHead(403);res.end('Nicht verfügbar');return;}
  if(!(await stat(file)).isFile())throw new Error('not a file');
  res.writeHead(200,{'Content-Type':types[extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(await readFile(file));
 }catch{
  res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
  const html=await readFile(resolve(root,'404.html'),'utf8').catch(()=>'<h1>Seite nicht gefunden</h1>');
  res.end(html.replace(/data-home href="[^"]*"/,`data-home href="${base}"`));
 }
}).listen(port,'127.0.0.1',()=>console.log(`Lernraum: http://127.0.0.1:${port}${base}`));
