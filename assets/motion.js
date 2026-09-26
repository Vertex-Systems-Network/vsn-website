/* VSN motion system. Progressive enhancement; content never depends on animation. */
(() => {
  'use strict';
  if (!Element.prototype.animate || !window.matchMedia) return;
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let manualReduce = false;
  let observer;
  let frame = 0;
  let running = false;
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
  const gridNames = '.service-grid,.pricing,.decision-grid,.ownership-grid,.cards-4,.process,.home-service-grid,.home-team-grid,.about-profile-grid,.about-role-grid,.industries,.product-project-grid,.contact-public-links,.footer-grid,.two-col,.proof-grid';
  const targets = new Set();
  document.querySelectorAll('main section > .container, .page-hero > .container, .site-footer > .container').forEach(container => {
    [...container.children].forEach(child => {
      if (child.matches(gridNames)) [...child.children].forEach(el => targets.add(el));
      else if (!child.matches('script,style')) targets.add(child);
    });
  });
  document.querySelectorAll(gridNames).forEach(grid => [...grid.children].forEach(child => targets.add(child)));
  // Animate either a group or its children, never overlapping ancestor animations.
  const leaves = [...targets].filter(el => ![...targets].some(other => other !== el && el.contains(other)));
  const watched = new WeakSet();
  function observe() {
    if (!allowed() || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || watched.has(entry.target)) return;
        watched.add(entry.target);
        const siblings = [...(entry.target.parentElement?.children || [])];
        const delay = Math.min(siblings.indexOf(entry.target) % 4, 3) * 65;
        play(entry.target, [{opacity:0, transform:'translateY(26px)'}, {opacity:1, transform:'translateY(0)'}], {duration:750, delay});
        observer.unobserve(entry.target);
      });
    }, {threshold:0.06, rootMargin:'0px 0px -22px 0px'});
    leaves.forEach(el => { if (!watched.has(el)) observer.observe(el); });
  }
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
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
      running = false;
    } else if (!running) {
      running = true;
      observe();
    }
  }
  control.addEventListener('click', () => {manualReduce = !manualReduce; sync();});
  reduce.addEventListener?.('change', sync);
  sync();
  updateScroll();
})();
