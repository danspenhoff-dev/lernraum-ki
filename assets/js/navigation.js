document.documentElement.classList.add('js');
const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
if(button&&nav){
 button.hidden=false;
 const close=()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');};
 button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();button.focus();}});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
}
