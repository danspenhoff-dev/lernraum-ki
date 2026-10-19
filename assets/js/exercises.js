export function evaluateChoice({correctId,feedbackById},selectedId){
 if(!Object.hasOwn(feedbackById,selectedId))return {status:'unanswered',message:'Wähle zuerst eine Antwort aus.'};
 return {status:selectedId===correctId?'correct':'incorrect',message:feedbackById[selectedId]};
}
if(typeof document!=='undefined')for(const form of document.querySelectorAll('[data-exercise]')){
 form.querySelector('fieldset').disabled=false;
 form.querySelector('button').disabled=false;
 const feedback=form.querySelector('.feedback');
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const choices=[...form.querySelectorAll('input[type=radio]')];
  const result=evaluateChoice({correctId:form.dataset.correct,feedbackById:Object.fromEntries(choices.map(c=>[c.value,c.dataset.feedback]))},new FormData(form).get('answer'));
  feedback.dataset.status=result.status;
  feedback.textContent=(result.status==='correct'?'Richtig. ':result.status==='incorrect'?'Noch nicht ganz. ':'')+result.message;
  if(result.status==='unanswered') choices[0].focus();
 });
 form.addEventListener('change',()=>{feedback.textContent='';delete feedback.dataset.status;});
}
