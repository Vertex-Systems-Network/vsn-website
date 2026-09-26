(()=>{'use strict';
const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.reference-service-accordion').forEach(group=>{
 const items=[...group.querySelectorAll(':scope > details')];
 items.forEach(item=>item.addEventListener('toggle',()=>{
  if(item.open) items.forEach(other=>{if(other!==item) other.open=false});
 }));
});
document.querySelectorAll('.rv-header .nav-dropdown').forEach(d=>{
  let t=0;
  d.addEventListener('mouseenter',()=>{if(innerWidth>900){clearTimeout(t);d.open=true}});
  d.addEventListener('mouseleave',()=>{if(innerWidth>900)t=setTimeout(()=>{d.open=false},120)});
});
const revealTargets=document.querySelectorAll('main section > .container, .editorial-card, .home-showcase-card, .home-process-grid article, .service-card');
if(reduce||!('IntersectionObserver'in window)){revealTargets.forEach(el=>el.classList.add('rv-fidelity-in'));return}
revealTargets.forEach(el=>el.classList.add('rv-fidelity-reveal'));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-fidelity-in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
revealTargets.forEach(el=>io.observe(el));
document.querySelectorAll('.rv-newsletter-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const btn=form.querySelector('button');if(btn){const old=btn.textContent;btn.textContent='Thank you';setTimeout(()=>btn.textContent=old,1800)}}));
})();