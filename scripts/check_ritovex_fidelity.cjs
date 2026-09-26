// Fidelity regression checks for the VSN Ritovex-reference rebuild.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const read=p=>fs.readFileSync(p,'utf8');
const fidelity=read('assets/ritovex-fidelity.css');
const fidelityJs=read('assets/ritovex-fidelity.js');
const motion=read('assets/motion.js');

const servicePages=[
 'software.html','web-development-ecommerce.html','websites.html','ecommerce.html',
 'mobile-app-development.html','ai-automation.html','profile.html','social-media.html',
 'bpo.html','business-solutions.html','tax-consulting.html','resource-augmentation.html'
];

const htmlFiles=[];
function walk(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  if(entry.name==='.git'||entry.name==='node_modules') continue;
  const full=path.join(dir,entry.name);
  if(entry.isDirectory()) walk(full);
  else if(entry.isFile()&&entry.name.endsWith('.html')) htmlFiles.push(full);
 }
}
walk('.');
assert.equal(htmlFiles.length,32,'expected 32 HTML pages');

for(const file of htmlFiles){
 const body=read(file);
 const legal=file.startsWith('legal'+path.sep);
 const fidelityCss=legal?'../assets/ritovex-fidelity.css':'assets/ritovex-fidelity.css';
 const fidelityScript=legal?'../assets/ritovex-fidelity.js':'assets/ritovex-fidelity.js';
 assert.ok(body.includes(fidelityCss),file+' missing fidelity stylesheet');
 assert.ok(body.includes(fidelityScript),file+' missing fidelity interaction script');
 assert.ok(body.includes('rv-header'),file+' missing reference header shell');
 assert.ok(body.includes('rv-footer'),file+' missing reference footer shell');
 assert.doesNotMatch(body,/assets\/vsn-human-(software|ai|growth|operations|business|team|industries|editorial)\.svg/,file+' still uses semantic SVG image wrapper');
}

for(const file of servicePages){
 const body=read(file);
 const main=(body.match(/<main id="main-content">[\s\S]*?<\/main>/)||[''])[0];
 assert.ok(main,file+' missing main content');
 assert.match(main,/data-project-form/,file+' missing project enquiry form');
 assert.match(main,/<details\b/i,file+' missing FAQ details');
 assert.match(main,/FAQ|Frequently Asked|Common questions/i,file+' missing visible FAQ heading/label');
}

const contact=read('contact.html');
assert.match(contact,/https:\/\/www\.google\.com\/maps\?/, 'contact page missing Google Maps embed');
assert.match(contact,/frame-src[^;]*google\.com/i,'contact CSP missing Google Maps frame permission');
assert.doesNotMatch(contact,/openstreetmap/i,'contact page still contains OpenStreetMap residue');

const blog=read('blog.html');
const projects=read('projects.html');
const blogDetail=read('blog-detail.html');
const projectDetail=read('project-detail.html');
assert.match(blog,/<body class="editorial-page blog-list-page">/);
assert.match(projects,/<body class="editorial-page projects-list-page">/);
assert.match(blogDetail,/<body class="editorial-page blog-detail-page">/);
assert.match(projectDetail,/<body class="editorial-page project-detail-page">/);
assert.notEqual((blog.match(/<body[^>]*>/)||[''])[0],(projects.match(/<body[^>]*>/)||[''])[0],'Blog and Projects must not share the same page template class');
assert.notEqual((blogDetail.match(/<body[^>]*>/)||[''])[0],(projectDetail.match(/<body[^>]*>/)||[''])[0],'Blog Detail and Project Detail must remain distinct');

for(const file of ['index.html','blog.html','projects.html','blog-detail.html','project-detail.html']){
 const body=read(file);
 assert.match(body,/assets\/vsn-human-[^"' ]+\.webp/,file+' missing direct human WebP imagery');
}

const about=read('about.html');
const services=read('services.html');
assert.match(about,/about-reference-hero/);
assert.match(about,/reference-service-accordion/);
assert.match(about,/about-team-grid/);
assert.match(services,/services-reference-hero/);
assert.match(services,/reference-service-accordion/);
assert.match(services,/services-reference-outcomes/);
for(const file of htmlFiles){const body=read(file);assert.match(body,/footer-public-links rv-footer-public-links/,file+' missing restored public profile footer row');}

const notFound=read('404.html');
assert.match(notFound,/utility-404-photo/,'404 must keep circular human-photo composition');

assert.match(fidelity,/--vsn-cyan:#0ea5e9/);
assert.match(fidelity,/--vsn-indigo:#5b5cf0/);
assert.match(fidelity,/--vsn-violet:#8b5cf6/);
assert.match(fidelity,/--green:var\(--vsn-cyan\)/,'legacy green must map to VSN palette');
assert.match(fidelity,/\.rv-header/);
assert.match(fidelity,/\.rv-footer/);
assert.match(fidelity,/\.home-capabilities/);
assert.match(fidelity,/\.service-enquiry-shell/);
assert.match(fidelity,/\.blog-list-page/);
assert.match(fidelity,/\.projects-list-page/);
assert.match(fidelity,/\.blog-detail-page/);
assert.match(fidelity,/\.project-detail-page/);
assert.match(fidelity,/\.contact-map/);
assert.match(fidelity,/utility-404-art/);

assert.match(fidelityJs,/IntersectionObserver/);
assert.match(fidelityJs,/unobserve/);
assert.match(motion,/const fidelityMode=/);
assert.match(motion,/if\(fidelityMode\)/);
assert.doesNotMatch(fidelityJs,/pointermove/);
assert.doesNotMatch(fidelityJs,/\.animate\(/);

console.log('Ritovex fidelity passed: shell, palette lock, direct imagery, service FAQs/forms, Google Map, distinct editorial/project templates, 404 and single reveal owner are intact.');
