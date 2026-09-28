(()=>{'use strict';
const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const desktopNav=window.matchMedia?.('(min-width: 981px)');

document.querySelectorAll('.reference-service-accordion').forEach(group=>{
 const items=[...group.querySelectorAll(':scope > details')];
 items.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open) items.forEach(other=>{if(other!==item) other.open=false});
 }));
});

document.querySelectorAll('.rv-header .nav-dropdown').forEach(d=>{
 let t=0;
 d.addEventListener('mouseenter',()=>{if(desktopNav?.matches){clearTimeout(t);d.open=true}});
 d.addEventListener('mouseleave',()=>{if(desktopNav?.matches)t=setTimeout(()=>{d.open=false},120)});
});

const revealTargets=document.querySelectorAll('main section > .container, .editorial-card, .home-showcase-card, .home-process-grid article, .service-card');
if(reduce||!('IntersectionObserver'in window)){
 revealTargets.forEach(el=>el.classList.add('rv-fidelity-in'));
}else{
 revealTargets.forEach(el=>el.classList.add('rv-fidelity-reveal'));
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-fidelity-in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 revealTargets.forEach(el=>io.observe(el));
}

document.querySelectorAll('.rv-newsletter-form').forEach(form=>{
 const input=form.querySelector('input[type="email"]');
 const btn=form.querySelector('button[type="submit"]');
 if(!input||!btn)return;
 input.setAttribute('autocomplete','email');
 btn.textContent='Request updates →';
 let note=form.querySelector('.rv-newsletter-note');
 if(!note){
  note=document.createElement('small');
  note.className='rv-newsletter-note';
  note.setAttribute('aria-live','polite');
  note.textContent='Your address is not stored on this static page. Submitting opens your email app.';
  form.append(note);
 }
 form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!input.reportValidity())return;
  const requested=input.value.trim();
  const subject=encodeURIComponent('VSN updates request');
  const body=encodeURIComponent('Please add '+requested+' to future VSN software, AI and digital growth updates.');
  note.textContent='Opening your email app so you can send the request.';
  window.location.href='mailto:info@vertexsystemsnetwork.com?subject='+subject+'&body='+body;
 });
});
})();