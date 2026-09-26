/* Ritovex parity motion: pre-paint, one-shot, short travel, no injected UI. */
(()=>{'use strict';
const root=document.documentElement;
const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)');
const allowed=()=>!(reduce&&reduce.matches);
const groups=[
 ['.home-hero-copy>*',55],['.hero-art',0],
 ['.home-about-visual,.home-about-copy',70],['.home-section-intro',0],
 ['.home-service-card',45],['.home-service-preview',0],
 ['.home-showcase-card',55],['.home-product-layout>*',55],
 ['.home-team-grid>article,.home-proof-layout>*',50],
 ['.home-process-intro',0],['.home-process-grid>article',55],
 ['.home-contact-band,.review-section .container',0],
 ['.rv-hero-copy>*,.rv-service-hero-copy>*,.rv-company-hero-copy>*',45],
 ['.rv-hero-visual,.rv-service-visual,.rv-company-visual,.rv-about-visual',0],
 ['.split-heading',0],['.service-card,.product-card,.repo-card,.proof-card,.price-card,.decision-card,.scope-panel',45],
 ['.ritovex-page-intro>*',45],['.ritovex-blog-card,.ritovex-project-card',50],
 ['.ritovex-single-hero>*',45],['.ritovex-article>*',35],
 ['.project-single-image,.project-single-meta,.project-single-content>*',45],
 ['.ritovex-404-photo,.ritovex-404-copy>*',55],
 ['.footer-news .container>*',40],['.ritovex-footer-grid>*',35]
];
const targets=[];
groups.forEach(([selector,step])=>document.querySelectorAll(selector).forEach((el,i)=>{
 el.style.setProperty('--rv-delay',step?Math.min(i*step,180)+'ms':'0ms');
 if(!targets.includes(el))targets.push(el);
}));
const revealAll=()=>targets.forEach(el=>el.classList.add('rv-visible'));
let observer=null;
function startReveal(){
 if(!allowed()){root.classList.remove('motion-prep','motion-live','motion-enabled');root.classList.add('motion-reduced');revealAll();return}
 root.classList.add('motion-live','motion-enabled');root.classList.remove('motion-fallback','motion-reduced');
 if(!('IntersectionObserver' in window)){revealAll();return}
 observer?.disconnect();
 observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('rv-visible');observer.unobserve(entry.target)}
 }),{threshold:.1,rootMargin:'0px 0px -6% 0px'});
 targets.forEach(el=>observer.observe(el));
 requestAnimationFrame(()=>document.querySelectorAll('.home-hero-copy>*,.hero-art,.rv-hero-copy>*,.rv-service-hero-copy>*,.rv-company-hero-copy>*,.rv-hero-visual,.rv-service-visual,.rv-company-visual,.ritovex-page-intro>*').forEach(el=>el.classList.add('rv-visible')));
}
const accordion=document.querySelector('[data-service-accordion]');
if(accordion){
 const cards=[...accordion.querySelectorAll('.home-service-card')];
 const preview=document.querySelector('.home-service-preview');
 const img=preview?.querySelector('img');
 let previewTimer=0;
 const activate=card=>{
  cards.forEach(c=>{const active=c===card;c.classList.toggle('is-active',active);c.setAttribute('aria-expanded',String(active))});
  if(img&&card.dataset.preview&&img.getAttribute('src')!==card.dataset.preview){
   clearTimeout(previewTimer);
   preview?.classList.add('is-switching');
   previewTimer=setTimeout(()=>{img.src=card.dataset.preview;requestAnimationFrame(()=>preview?.classList.remove('is-switching'))},120);
  }
 };
 cards.forEach(card=>{
  card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-expanded',String(card.classList.contains('is-active')));
  card.addEventListener('mouseenter',()=>activate(card));card.addEventListener('focus',()=>activate(card));card.addEventListener('click',()=>activate(card));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(card)}})
 });
}
document.querySelectorAll('.field input,.field textarea,.field select').forEach(input=>{
 input.addEventListener('focus',()=>input.closest('.field')?.classList.add('field-active'));
 input.addEventListener('blur',()=>input.closest('.field')?.classList.remove('field-active'));
});
document.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{if(details.open&&allowed())details.classList.add('details-opened')}));
reduce?.addEventListener?.('change',()=>{if(reduce.matches){observer?.disconnect();root.classList.remove('motion-prep','motion-live','motion-enabled');root.classList.add('motion-reduced');revealAll()}});
startReveal();
})();