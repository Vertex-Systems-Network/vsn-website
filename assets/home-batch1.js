(()=>{'use strict';

const root=document.querySelector('[data-home-hero]');
if(!root)return;

const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const stage=root.querySelector('.home-hero-stage');
const slides=[...root.querySelectorAll('[data-hero-slide]')];
const dots=[...root.querySelectorAll('[data-hero-dot]')];
let active=0;
let timer=0;

const show=index=>{
  if(!slides.length)return;
  active=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{
    const current=i===active;
    slide.classList.toggle('is-active',current);
    slide.setAttribute('aria-hidden',current?'false':'true');
  });
  dots.forEach((dot,i)=>{
    const current=i===active;
    dot.classList.toggle('is-active',current);
    dot.setAttribute('aria-selected',current?'true':'false');
    dot.tabIndex=current?0:-1;
  });
};

const stop=()=>{
  if(timer){window.clearInterval(timer);timer=0}
};
const start=()=>{
  stop();
  if(reduce||slides.length<2||document.hidden)return;
  timer=window.setInterval(()=>show(active+1),6000);
};

dots.forEach((dot,i)=>{
  dot.addEventListener('click',()=>{show(i);start()});
  dot.addEventListener('keydown',event=>{
    if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
    event.preventDefault();
    const next=event.key==='ArrowRight'?i+1:i-1;
    show(next);
    dots[active]?.focus();
    start();
  });
});

root.addEventListener('mouseenter',stop);
root.addEventListener('mouseleave',start);
root.addEventListener('focusin',stop);
root.addEventListener('focusout',event=>{
  if(event.relatedTarget instanceof Node&&root.contains(event.relatedTarget))return;
  start();
});
document.addEventListener('visibilitychange',()=>document.hidden?stop():start());

if(stage&&!reduce){
  let scheduled=false;
  const updateParallax=()=>{
    scheduled=false;
    const rect=stage.getBoundingClientRect();
    const viewport=window.innerHeight||1;
    const progress=Math.max(-1,Math.min(1,(viewport/2-(rect.top+rect.height/2))/viewport));
    stage.style.setProperty('--hero-shift',Math.round(progress*24)+'px');
  };
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    window.requestAnimationFrame(updateParallax);
  };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  updateParallax();
}

show(0);
start();
})();