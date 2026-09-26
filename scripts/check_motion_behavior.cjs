// Offline behavior checks, not a browser rendering or visual quality test.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('assets/motion.js','utf8');
const styles = fs.readFileSync('assets/styles.css','utf8');
assert.doesNotMatch(styles,/vsn-intro|is-scrolled \.nav\{height:/);
function setup(reduced = false, supportsAnimation = true) {
  const callbacks = [];
  const frames = new Map();
  let nextFrame = 0;
  class El {
    constructor(name='DIV') { this.tagName=name; this.children=[];this.parentElement=null;this.handlers={};this.attrs={};this.effects=[];this.classes=new Set();this.classList={contains:n=>this.classes.has(n),add:n=>this.classes.add(n),remove:n=>this.classes.delete(n),toggle:(n,v)=>v?this.classes.add(n):this.classes.delete(n)}; }
    append(x){this.children.push(x);x.parentElement=this;}
    matches(s){return s==='script,style' ? false : false;}
    contains(el){return this.children.includes(el);}
    setAttribute(n,v){this.attrs[n]=v;}
    addEventListener(n,fn){(this.handlers[n] ||= []).push(fn);}
    fire(n,e={}){for(const fn of this.handlers[n]||[])fn(e);}
    getBoundingClientRect(){return {left:0,top:0,width:200,height:100};}
    getAnimations(){return this.effects.filter(a=>!a.cancelled);}
    animate(keys,opts){const listeners={};const a={keys,opts,cancelled:false,addEventListener:(n,f)=>listeners[n]=f,cancel(){this.cancelled=true;listeners.cancel?.();}};this.effects.push(a);return a;}
  }
  if(!supportsAnimation)delete El.prototype.animate;
  const root=new El(),body=new El(),container=new El(),card=new El(),header=new El();container.append(card);root.scrollHeight=2000;
  const media={matches:reduced,addEventListener:(n,f)=>media.change=f};
  const fine={matches:true,addEventListener:(n,f)=>fine.change=f};
  const document={documentElement:root,body,createElement:n=>new El(n.toUpperCase()),querySelector:s=>s==='.site-header'?header:null,querySelectorAll:s=>s.startsWith('main section')?[container]:s.startsWith('.home-service-card')?[card]:[]};
  class IO {constructor(fn){callbacks.push(fn);}observe(){}unobserve(){}disconnect(){}}
  const window={matchMedia:s=>s.includes('reduced-motion')?media:fine,innerHeight:1000,scrollY:500,addEventListener(){},IntersectionObserver:IO};
  vm.runInNewContext(source,{Element:El,document,window,IntersectionObserver:IO,requestAnimationFrame:f=>{frames.set(++nextFrame,f);return nextFrame;},cancelAnimationFrame:id=>frames.delete(id),getComputedStyle:()=>({transform:'none'})});
  return {body,card,root,media,callbacks,frames};
}
const normal=setup();assert.equal(normal.body.children.length,2);assert.equal(normal.body.children[1].value,50);
normal.callbacks[0]([{isIntersecting:true,target:normal.card}]);assert.equal(normal.card.effects.length,1);
const afterEntrance=normal.card.effects.length;
normal.card.fire('pointermove',{clientX:200,clientY:100,pointerType:'mouse'});normal.frames.forEach(f=>f());assert.equal(normal.card.effects.length,afterEntrance);
normal.card.fire('pointerleave');assert.equal(normal.card.effects.length,afterEntrance);
normal.body.children[0].fire('click');assert.ok(normal.root.classes.has('motion-reduced'));assert.ok(normal.card.effects.every(a=>a.cancelled));
const before=normal.card.effects.length;normal.card.fire('pointermove',{clientX:10,clientY:10});assert.equal(normal.card.effects.length,before);
const reduced=setup(true);assert.equal(reduced.callbacks.length,0);assert.ok(reduced.body.children[0].disabled);assert.equal(reduced.card.effects.length,0);
assert.equal(setup(false,false).body.children.length,0);
console.log('Motion behavior passed: progressive fallback, entrance, stable pointer handling, progress and reduced-motion cancellation.');
