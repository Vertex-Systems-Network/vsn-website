document.documentElement.classList.add('js');
const toggle=document.querySelector('.mobile-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){
  const root=document.documentElement;
  const mobileNav=window.matchMedia('(max-width: 980px)');
  const dropdowns=[...links.querySelectorAll('.nav-dropdown')];
  const closeDropdowns=()=>dropdowns.forEach(dropdown=>{dropdown.open=false});
  const closeMenu=()=>{
    links.classList.remove('open');
    root.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
  };
  const menuFocusables=()=>[toggle,...links.querySelectorAll('a[href],summary')].filter(el=>!el.hasAttribute('disabled'));
  const setMenu=open=>{
    links.classList.toggle('open',open);
    root.classList.toggle('nav-open',open&&mobileNav.matches);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    if(open&&mobileNav.matches)requestAnimationFrame(()=>links.querySelector('a[href],summary')?.focus());
  };
  toggle.addEventListener('click',()=>setMenu(!links.classList.contains('open')));
  dropdowns.forEach(dropdown=>dropdown.addEventListener('toggle',()=>{if(dropdown.open)dropdowns.forEach(other=>{if(other!==dropdown)other.open=false})}));
  links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{closeMenu();closeDropdowns()}));
  document.addEventListener('click',e=>{
    if(!(e.target instanceof Element))return;
    if(!e.target.closest('.nav-links')&&!e.target.closest('.mobile-toggle')){closeMenu();closeDropdowns()}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&links.classList.contains('open')){closeMenu();closeDropdowns();toggle.focus();return}
    if(e.key==='Tab'&&mobileNav.matches&&links.classList.contains('open')){
      const focusables=menuFocusables();
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  const syncBreakpoint=()=>{if(!mobileNav.matches){closeMenu();closeDropdowns()}};
  mobileNav.addEventListener?.('change',syncBreakpoint);
  window.addEventListener('pageshow',syncBreakpoint);
}
const form=document.querySelector('[data-project-form]');
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(form);
  const lines=[`Name: ${d.get('name')||''}`,`Company: ${d.get('company')||''}`,`Email: ${d.get('email')||''}`,`Service: ${d.get('service')||''}`,`Budget: ${d.get('budget')||''}`,`Timeline: ${d.get('timeline')||''}`,`Message: ${d.get('message')||''}`];
  form.querySelectorAll('[data-brief-label]').forEach(field=>{if(field.value)lines.push(`${field.dataset.briefLabel}: ${field.value}`)});
  const msg=encodeURIComponent(`Hello VSN, I would like to discuss a project.

${lines.join('\n')}`);
  window.open(`https://wa.me/923168433104?text=${msg}`,'_blank','noopener,noreferrer');
})}

// Brand resilience: keep the site identifiable if the remote official logo becomes unavailable.
document.querySelectorAll('[data-brand-logo]').forEach(img=>{
  const host=img.closest('.brand, .footer-brand-lockup');
  const markFailed=()=>{
    if(host) host.classList.add('logo-failed');
    img.hidden=true;
  };
  img.addEventListener('error',markFailed,{once:true});
  if(img.complete && img.naturalWidth===0) markFailed();
});

// Package calls to action carry the chosen tier into the profile enquiry.
document.querySelectorAll('[data-profile-package]').forEach(link=>link.addEventListener('click',()=>{
  const select=document.getElementById('profile-package');
  if(select) select.value=link.dataset.profilePackage;
}));
