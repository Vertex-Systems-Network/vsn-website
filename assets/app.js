document.documentElement.classList.add('js');
const toggle=document.querySelector('.mobile-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){
  const closeMenu=()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false')};
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
  const dropdowns=[...links.querySelectorAll('.nav-dropdown')];
  dropdowns.forEach(dropdown=>dropdown.addEventListener('toggle',()=>{if(dropdown.open)dropdowns.forEach(other=>{if(other!==dropdown)other.open=false})}));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{if(e.target instanceof Element&&!e.target.closest('.nav-links'))dropdowns.forEach(dropdown=>{dropdown.open=false})});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();dropdowns.forEach(dropdown=>{dropdown.open=false})}});
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
