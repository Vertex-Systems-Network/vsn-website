/* VSN motion system. Progressive enhancement; content never depends on animation. */
(() => {
  'use strict';
  if (!Element.prototype.animate || !window.matchMedia) return;
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let manualReduce = false;
  let frame = 0;
  const allowed = () => !reduce.matches && !manualReduce;
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'motion-control';
  control.setAttribute('aria-label', 'Reduce website animations');
  document.body.append(control);
  const progress = document.createElement('progress');
  progress.className = 'reading-progress';
  progress.max = 100;
  progress.value = 0;
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const play = (element, keys, options = {}) => {
    if (!allowed() || !element) return null;
    const animation = element.animate(keys, {duration: 600, easing: 'cubic-bezier(.22,1,.36,1)', ...options});
    active.add(animation);
    animation.addEventListener('finish', () => { active.delete(animation); }, {once:true});
    animation.addEventListener('cancel', () => { active.delete(animation); }, {once:true});
    return animation;
  };
  function updateScroll() {
    frame = 0;
    const distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    progress.value = distance ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0;
    document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, {passive:true});
  window.addEventListener('resize', () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, {passive:true});
  // Keep pointer feedback in CSS. Replacing WAAPI transform animations on every
  // pointermove makes the computed matrix jump between frames on slower GPUs.
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => {
    if (!allowed()) return;
    if (details.open) [...details.children].filter(child => child.tagName !== 'SUMMARY').forEach(child => play(child, [{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}], {duration:340}));
    else play(details.querySelector('summary'), [{opacity:.7},{opacity:1}], {duration:200});
  }));
  document.querySelectorAll('.field input,.field textarea,.field select').forEach(input => {
    input.addEventListener('focus', () => input.closest('.field')?.classList.add('field-active'));
    input.addEventListener('blur', () => input.closest('.field')?.classList.remove('field-active'));
  });
  function sync() {
    const enabled = allowed();
    root.classList.toggle('motion-enabled', enabled);
    root.classList.toggle('motion-reduced', !enabled);
    control.textContent = enabled ? 'Motion: on' : 'Motion: reduced';
    control.setAttribute('aria-pressed', String(!enabled));
    control.disabled = reduce.matches;
    if (!enabled) {
      active.forEach(animation => animation.cancel());
      active.clear();
    }
  }
  control.addEventListener('click', () => {manualReduce = !manualReduce; sync();});
  reduce.addEventListener?.('change', sync);
  sync();
  updateScroll();
})();
