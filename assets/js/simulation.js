export function updateOfferApproval(previousCost,nextCost,approved){return previousCost===nextCost&&approved;}
export function evaluateDecision({cost,budget,action,allowedActions,approved,untrustedInstruction}){
 if(!Number.isFinite(cost)||!Number.isFinite(budget)||cost<0||budget<0)return {status:'blocked',reason:'Kosten und Budget müssen gültige, nicht negative Zahlen sein.'};
 if(cost>budget)return {status:'blocked',reason:'Das Angebot überschreitet dein Budget. Eine Freigabe hebt diese Grenze nicht auf. Wähle ein günstigeres Angebot.'};
 if(!Array.isArray(allowedActions)||!allowedActions.includes(action))return {status:'blocked',reason:'Diese Aktion gehört nicht zum erlaubten Auftrag. Eine einzelne Freigabe erweitert die Befugnisse nicht.'};
 if(untrustedInstruction)return {status:'blocked',reason:'Anweisungen in einem Angebot sind fremder Inhalt. Sie dürfen deinen Auftrag nicht verändern. Ignoriere diese Anweisung.'};
 if(action!=='plan'&&!approved)return {status:'needs-approval',reason:'Das Angebot liegt im Rahmen. Vor einer Buchung muss der Agent trotzdem deine ausdrückliche Freigabe abwarten.'};
 return {status:'allowed',reason:action==='plan'?'Der Plan liegt innerhalb deiner Vorgaben. Er kann zur Prüfung vorgelegt werden.':'Budget, Befugnis und Freigabe passen zusammen. In dieser Simulation wäre die Buchung jetzt erlaubt.'};
}
if(typeof document!=='undefined'){
 const sim=document.querySelector('[data-simulation]');
 if(sim){
  let stage=0;
  const panels=[...sim.querySelectorAll('[data-panel]')];
  const steps=[...sim.querySelectorAll('.steps li')];
  const form=sim.querySelector('form');
  const offer=sim.querySelector('#offer');
  let previousOffer=offer.value;
  offer.addEventListener('change',()=>{const approval=sim.querySelector('#approve');approval.checked=updateOfferApproval(previousOffer,offer.value,approval.checked);previousOffer=offer.value;});
  const result=sim.querySelector('[data-result]');
  const show=(n)=>{stage=n;panels.forEach((p,i)=>p.hidden=i!==n);steps.forEach((s,i)=>{s.classList.toggle('current',i===n);if(i===n)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');});const h=panels[n].querySelector('h3');h.tabIndex=-1;h.focus();};
  sim.querySelector('[data-start]').addEventListener('click',()=>show(1));
  sim.querySelector('[data-decide]').addEventListener('click',()=>show(2));
  sim.querySelector('[data-back]').addEventListener('click',()=>show(0));
  form.addEventListener('submit',e=>{
   e.preventDefault();
   const cost=Number(sim.querySelector('#offer').value);
   const allow=sim.querySelector('#allow-book').checked;
   const approved=sim.querySelector('#approve').checked;
   const untrusted=sim.querySelector('#instruction').value==='follow';
   const outcome=evaluateDecision({cost,budget:500,action:'book',allowedActions:allow?['plan','book']:['plan'],approved,untrustedInstruction:untrusted});
   result.dataset.status=outcome.status;
   result.textContent=outcome.reason;
   sim.querySelector('[data-verdict]').textContent=outcome.status==='allowed'?'Gut gesteuert: Die Grenzen bleiben gewahrt.':outcome.status==='needs-approval'?'Kontrollpunkt: Die Freigabe fehlt.':'Stopp: Dieser Schritt ist nicht erlaubt.';
   sim.querySelector('[data-cost-summary]').textContent=`Gewähltes Angebot: ${cost} € · Budget: 500 € · Buchungsbefugnis: ${allow?'ja':'nein'} · Freigabe: ${approved?'ja':'nein'}`;
   show(3);
  });
  sim.querySelector('[data-retry]').addEventListener('click',()=>show(2));
  sim.querySelector('[data-reset]').addEventListener('click',()=>{form.reset();previousOffer=offer.value;sim.querySelector('#allow-book').checked=false;result.textContent='';delete result.dataset.status;sim.querySelector('[data-cost-summary]').textContent='';sim.querySelector('[data-verdict]').textContent='';show(0);});
  sim.querySelector('[data-run]').hidden=false;
  sim.querySelector('[data-js-note]').hidden=true;
 }
}
