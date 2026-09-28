(()=>{'use strict';
const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const desktopNav=window.matchMedia?.('(min-width: 981px)');

document.querySelectorAll('.reference-service-accordion').forEach(group=>{
 const items=[...group.querySelectorAll(':scope > details')];
 items.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open) items.forEach(other=>{if(other!==item) other.open=false});
 }));
});

const desktopDropdowns=[...document.querySelectorAll('.rv-header .nav-dropdown')];
desktopDropdowns.forEach(d=>{
 let openTimer=0,closeTimer=0;
 const openMenu=()=>{
  if(!desktopNav?.matches)return;
  clearTimeout(closeTimer);
  desktopDropdowns.forEach(other=>{if(other!==d)other.open=false});
  d.open=true;
 };
 const closeMenu=()=>{
  if(!desktopNav?.matches)return;
  clearTimeout(openTimer);
  closeTimer=setTimeout(()=>{d.open=false},160);
 };
 d.addEventListener('mouseenter',()=>{
  if(!desktopNav?.matches)return;
  clearTimeout(closeTimer);
  openTimer=setTimeout(openMenu,55);
 });
 d.addEventListener('mouseleave',closeMenu);
 d.addEventListener('focusin',()=>{
  clearTimeout(openTimer);clearTimeout(closeTimer);openMenu();
 });
 d.addEventListener('focusout',e=>{
  if(!desktopNav?.matches)return;
  if(e.relatedTarget instanceof Node&&d.contains(e.relatedTarget))return;
  closeMenu();
 });
});

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