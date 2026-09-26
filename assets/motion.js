/* VSN motion system: one-shot viewport reveals + Ritovex-style interaction grammar. */
(()=>{'use strict';
const root=document.documentElement;
if(!window.matchMedia){root.classList.add('motion-fallback');return}
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
let manualReduce=false,frame=0;
const allowed=()=>!reduce.matches&&!manualReduce;
const fidelityMode=!!document.querySelector('link[href*="ritovex-fidelity.css"]');
const control=document.createElement('button');
control.type='button';control.className='motion-control';control.setAttribute('aria-label','Reduce website animations');document.body.append(control);
const progress=document.createElement('progress');
progress.className='reading-progress';progress.max=100;progress.value=0;progress.setAttribute('aria-hidden','true');document.body.append(progress);
function updateScroll(){frame=0;const d=Math.max(0,document.documentElement.scrollHeight-innerHeight);progress.value=d?Math.min(100,Math.max(0,scrollY/d*100)):0;document.querySelector('.site-header')?.classList.toggle('is-scrolled',scrollY>24)}
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateScroll)},{passive:true});
addEventListener('resize',()=>{if(!frame)frame=requestAnimationFrame(updateScroll)},{passive:true});

const groups=[
 ['.home-hero-copy>*',90],['.hero-art',0],['.home-about-visual,.home-about-copy',100],['.home-section-intro',0],
 ['.home-service-card',70],['.home-service-preview',0],['.home-showcase-card',90],['.home-product-layout>*',90],
 ['.home-team-grid>article',80],['.home-proof-layout>*',90],['.home-process-intro',0],['.home-process-grid>article',90],
 ['.home-contact-band,.review-section .container',0],['.rv-hero-copy>*,.rv-service-hero-copy>*,.rv-company-hero-copy>*',80],
 ['.rv-hero-visual,.rv-service-visual,.rv-company-visual',0],
 ['.secondary-page .split-heading,.service-detail-page .split-heading,.company-proof-page .split-heading',0],
 ['.secondary-page .service-card,.secondary-page .product-card,.secondary-page .repo-card,.secondary-page .card,.secondary-page .contact-section-heading',70],
 ['.service-detail-page .service-card,.service-detail-page .card,.service-detail-page .decision-card,.service-detail-page .scope-panel,.service-detail-page .price-card',70],
 ['.company-proof-page .service-card,.company-proof-page .proof-card,.company-proof-page .card,.company-proof-page .decision-card,.company-proof-page .scope-panel',70],
 ['.editorial-hero-copy>*',80],['.editorial-hero-visual',0],['.editorial-section-head',0],['.editorial-feature',0],['.editorial-card',80],['.article-aside',0],['.article-body>*',55],['.project-detail-image',0],['.utility-inner>*',80]
];
const targets=[];
groups.forEach(([selector,step])=>document.querySelectorAll(selector).forEach((el,i)=>{el.style.setProperty('--rv-delay',step?Math.min(i*step,320)+'ms':'0ms');targets.push(el)}));
let observer=null;
function revealAll(){targets.forEach(el=>el.classList.add('rv-visible'))}
function startReveal(){
 if(fidelityMode){root.classList.add('motion-live','motion-enabled');root.classList.remove('motion-prep','motion-fallback','motion-reduced');revealAll();return}
 if(!allowed()){root.classList.remove('motion-prep');root.classList.add('motion-reduced');revealAll();return}
 root.classList.add('motion-live','motion-enabled');root.classList.remove('motion-fallback','motion-reduced');
 if(!('IntersectionObserver'in window)){revealAll();return}
 observer?.disconnect();
 observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('rv-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
 targets.forEach(el=>observer.observe(el));
 requestAnimationFrame(()=>document.querySelectorAll('.home-hero-copy>*,.hero-art,.rv-hero-copy>*,.rv-service-hero-copy>*,.rv-company-hero-copy>*,.rv-hero-visual,.rv-service-visual,.rv-company-visual').forEach(el=>el.classList.add('rv-visible')));
}

const accordion=document.querySelector('[data-service-accordion]');
if(accordion){
 const cards=[...accordion.querySelectorAll('.home-service-card')],preview=document.querySelector('.home-service-preview'),img=preview?.querySelector('img');
 let previewTimer=0;
 const activate=card=>{cards.forEach(c=>{const active=c===card;c.classList.toggle('is-active',active);c.setAttribute('aria-expanded',String(active))});if(img&&card.dataset.preview&&img.getAttribute('src')!==card.dataset.preview){clearTimeout(previewTimer);preview.classList.add('is-switching');previewTimer=setTimeout(()=>{img.src=card.dataset.preview;requestAnimationFrame(()=>preview.classList.remove('is-switching'))},140)}};
 cards.forEach(card=>{card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-expanded',String(card.classList.contains('is-active')));card.addEventListener('mouseenter',()=>activate(card));card.addEventListener('focus',()=>activate(card));card.addEventListener('click',()=>activate(card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(card)}})});
}

document.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{if(details.open&&allowed())details.classList.add('details-opened')}));
document.querySelectorAll('.field input,.field textarea,.field select').forEach(input=>{input.addEventListener('focus',()=>input.closest('.field')?.classList.add('field-active'));input.addEventListener('blur',()=>input.closest('.field')?.classList.remove('field-active'))});
function sync(){const on=allowed();control.textContent=on?'Motion: on':'Motion: reduced';control.setAttribute('aria-pressed',String(!on));control.disabled=reduce.matches;if(on)startReveal();else{observer?.disconnect();root.classList.remove('motion-prep','motion-live','motion-enabled');root.classList.add('motion-reduced');revealAll()}}
control.addEventListener('click',()=>{manualReduce=!manualReduce;sync()});reduce.addEventListener?.('change',sync);sync();updateScroll();
})();