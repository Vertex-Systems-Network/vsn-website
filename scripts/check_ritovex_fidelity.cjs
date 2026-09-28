// Fidelity regression checks for the VSN Ritovex-reference rebuild.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const read=p=>fs.readFileSync(p,'utf8');
const fidelity=read('assets/ritovex-fidelity.css');
const fidelityJs=read('assets/ritovex-fidelity.js');
const motion=read('assets/motion.js');
const app=read('assets/app.js');

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

const corruptedHumanAssets=[
 'vsn-human-hero.webp','vsn-human-about.webp','vsn-human-ai.webp',
 'vsn-human-editorial.webp','vsn-human-atlas.webp'
];

for(const file of htmlFiles){
 const body=read(file);
 corruptedHumanAssets.forEach(asset=>assert.ok(!body.includes(asset),file+' references corrupted human asset '+asset));
 const legal=file.startsWith('legal'+path.sep);
 const fidelityCss=legal?'../assets/ritovex-fidelity.css':'assets/ritovex-fidelity.css';
 const fidelityScript=legal?'../assets/ritovex-fidelity.js':'assets/ritovex-fidelity.js';
 assert.ok(body.includes(fidelityCss),file+' missing fidelity stylesheet');
 assert.ok(body.includes(fidelityScript),file+' missing fidelity interaction script');
 assert.ok(body.includes('rv-header'),file+' missing reference header shell');
 assert.ok(body.includes('rv-footer'),file+' missing reference footer shell');
 assert.match(body,/class="rv-topline-contact"[\s\S]*?href="mailto:info@vertexsystemsnetwork\.com"/,file+' missing clickable top-line email');
 assert.match(body,/class="rv-topline-contact"[\s\S]*?href="tel:\+923168433104"/,file+' missing clickable top-line phone');
 assert.match(body,/class="rv-footer-contact"[\s\S]*?href="tel:\+923168433104"/,file+' missing clickable footer phone');
 assert.match(body,/class="rv-footer-contact"[\s\S]*?href="mailto:info@vertexsystemsnetwork\.com"/,file+' missing clickable footer email');
 assert.doesNotMatch(body,/<span>info@vertexsystemsnetwork\.com · \+92 316 8433104<\/span>/,file+' contains legacy plain-text top contact');
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
assert.match(contact,/https:\/\/maps\.google\.com\/maps\?/, 'contact page missing Google Maps embed');
assert.match(contact,/frame-src[^;]*google\.com/i,'contact CSP missing Google Maps frame permission');
assert.doesNotMatch(contact,/openstreetmap/i,'contact page still contains OpenStreetMap residue');
assert.match(contact,/contact-reference-hero/,'contact page missing reference-style simple hero');
assert.match(contact,/contact-reference-form-grid/,'contact page missing image-plus-form split');
assert.equal((contact.match(/class="container contact-info-grid"[\s\S]*?<\/div><\/section>/)||[''])[0].match(/<article>/g)?.length,3,'contact page must contain address, phone and email cards');
assert.doesNotMatch(contact,/<iframe[^>]*sandbox=/i,'contact page must not sandbox the Google Maps iframe because it can break the rendered embed');
assert.match(contact,/contact-route-section/,'contact page missing clear route selector');
assert.equal((contact.match(/class="contact-route-grid"[\s\S]*?<\/div><\/div><\/section>/)||[''])[0].match(/<a /g)?.length,3,'contact route selector must contain three routes');
assert.match(contact,/https:\/\/wa\.me\/923168433104/,'contact page missing direct WhatsApp route');
assert.match(contact,/contact-next-steps/,'contact page missing next-step process');
assert.equal((contact.match(/class="contact-step-grid"[\s\S]*?<\/div><\/div><\/section>/)||[''])[0].match(/<article>/g)?.length,3,'contact next-step process must contain three stages');

const home=read('index.html');
const blog=read('blog.html');
const projects=read('projects.html');
const blogDetail=read('blog-detail.html');
const projectDetail=read('project-detail.html');
assert.match(home,/home-about-intro/,'Home About must lead with a centered intro before the image/facts layout');
assert.match(home,/home-blog-section/,'homepage missing Ritovex-style blog preview');
assert.equal((home.match(/home-blog-card/g)||[]).length,3,'homepage blog preview must contain exactly three cards');
assert.match(home,/href="blog-detail\.html"/,'homepage blog preview missing published article link');
assert.match(home,/href="blog\.html">Browse all articles/,'homepage blog preview missing all-articles route');
assert.match(blog,/<body class="editorial-page blog-list-page">/);
assert.equal((blog.match(/class="editorial-card"/g)||[]).length,6,'blog reference grid must contain six cards');
assert.equal((blog.match(/Coming soon/g)||[]).length>=5,true,'blog upcoming topics must remain clearly labeled');
assert.match(projects,/<body class="editorial-page projects-list-page">/);
assert.match(projects,/projects-proof-note/,'projects page missing portfolio truthfulness note');
assert.equal((projects.match(/project-proof-card/g)||[]).length,2,'projects page must contain exactly two featured visual portfolio cards');
assert.equal((projects.match(/project-repo-row/g)||[]).length,2,'projects page must keep two additional compact public repository proof rows');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/vsn-marketing/,'projects page missing VSN Marketing repository proof');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/vsn-builder/,'projects page missing VSN Builder repository proof');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/ai-native-project-operating-system/,'projects page missing ANPOS repository proof');
assert.doesNotMatch(projects,/<span>Capability<\/span>/,'projects page must not present generic capabilities as completed projects');
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
assert.match(about,/about-proof-metrics-grid/,'about page missing factual proof-card stage');
assert.match(about,/about-priority-grid/,'about page missing image-led priority stage');
assert.match(about,/about-reference-principles/,'about page missing operating-principles stage');
assert.equal((about.match(/about-priority-points[\s\S]*?<\/div><a class="btn btn-dark"/)||[''])[0].match(/<article>/g)?.length,4,'about priority section must contain four operating principles');
assert.match(about,/about-reference-verification/,'about page missing public verification strip');
assert.match(about,/about-reference-credentials/,'about page missing credentials/milestones stage');
assert.match(about,/SECP · 0313834/,'about credentials missing SECP evidence');
assert.match(about,/PSEB · Z-25-17539\/25/,'about credentials missing PSEB evidence');
assert.match(about,/https:\/\/github\.com\/Vertex-Systems-Network/,'about credentials missing GitHub proof');
assert.match(about,/https:\/\/apps\.shopify\.com\/vsn-metafields/,'about credentials missing Shopify proof');
assert.doesNotMatch(about,/Award-Winning|Awards Winner|Industry Award Recipient/,'about page must not fabricate reference-template awards');
assert.match(services,/services-reference-hero/);
assert.match(services,/services-rendered-hero-stage/,'services page missing reference-style hero breathing stage');
assert.match(services,/services-benefit-split/,'services page missing image-plus-benefits split');
assert.match(services,/services-proof-cards/,'services page missing public-proof cards');
assert.match(services,/reference-service-accordion/);
assert.match(services,/services-reference-outcomes/);
assert.match(services,/services-reference-tech/,'services page missing technology stage');
assert.match(services,/services-reference-benefits/,'services page missing benefits stage');
assert.match(services,/services-reference-faq/,'services page missing page-level FAQ stage');
assert.equal((services.match(/class="services-faq-list"[\s\S]*?<\/div><\/div><\/section>/)||[''])[0].match(/<details/g)?.length,4,'services page FAQ must contain four buyer questions');
assert.match(services,/https:\/\/github\.com\/Vertex-Systems-Network/,'services page missing public GitHub proof');
assert.match(services,/https:\/\/apps\.shopify\.com\/vsn-metafields/,'services page missing published product proof');
for(const file of htmlFiles){const body=read(file);assert.match(body,/footer-public-links rv-footer-public-links/,file+' missing restored public profile footer row');}

const notFound=read('404.html');
assert.match(notFound,/utility-404-photo/,'404 must keep circular human-photo composition');

assert.match(fidelity,/--vsn-cyan:#5AC8D6/i);
assert.match(fidelity,/--vsn-indigo:#625BA8/i);
assert.match(fidelity,/--vsn-violet:#625BA8/i);
assert.match(fidelity,/--vsn-blue:#6188C6/i);
assert.match(fidelity,/--vsn-charcoal:#3F4245/i);
assert.match(fidelity,/--vsn-gray:#7E8083/i);
assert.match(fidelity,/--green:var\(--vsn-cyan\)/,'legacy green must map to VSN palette');
assert.match(fidelity,/\.rv-header/);
assert.match(fidelity,/\.motion-control\{display:none!important\}/,'floating motion control must stay out of the rendered reference UI');
assert.match(fidelity,/\.rv-topline\{display:none!important\}/,'desktop reference shell must not render the extra top strip');
assert.match(fidelity,/--rv-topline-h:0px!important/,'desktop mega-menu offset must match hidden top strip');
assert.match(fidelity,/grid-template-columns:minmax\(0,1\.08fr\) minmax\(430px,\.92fr\)!important/,'Home hero desktop balance must match rendered reference tuning');
assert.match(fidelity,/@media\(min-width:981px\)/,'desktop fidelity layer missing 981px shell');
assert.match(fidelity,/border-top:2px solid var\(--vsn-cyan\)!important/,'desktop mega-menu missing VSN accent edge');
assert.match(fidelity,/\.rv-header \.nav-dropdown\[open\]>summary:before\{transform:scaleX\(1\)\}/,'desktop open dropdown missing active underline');
assert.match(fidelity,/transform:translateX\(4px\)/,'desktop mega-menu items missing restrained hover travel');
assert.match(fidelity,/\.home-page \.section\{[\s\S]*padding-top:clamp\(104px,7\.7vw,124px\)!important/,'desktop homepage section rhythm not normalized');
assert.match(fidelity,/\.rv-footer/);
assert.match(fidelity,/position:fixed!important;[\s\S]*inset:68px 0 0 0!important/,'mobile navigation must use the full-height reference shell');
assert.match(fidelity,/\.rv-footer-grid\{grid-template-columns:1fr!important/,'small-screen footer must collapse to one clear column');
assert.match(fidelity,/\.rv-footer-word\{[^}]*color:#3F4245/,'footer wordmark must remain visible on the black footer');
assert.doesNotMatch(fidelity,/\.rv-footer-word\{[^}]*color:#000000/,'footer wordmark cannot be black on black');
assert.match(fidelity,/\.rv-footer-public-links\{[^}]*border-top:1px solid #3F4245[^}]*border-bottom:1px solid #3F4245/,'footer public-profile separators must remain visible');
assert.match(fidelity,/\.home-capabilities/);
assert.match(fidelity,/\.service-enquiry-shell/);
assert.match(fidelity,/\.blog-list-page/);
assert.match(fidelity,/\.blog-list-page \.editorial-hero\{[^}]*text-align:left/,'Blog rendered hero must remain left aligned');
assert.match(fidelity,/\.projects-list-page \.editorial-hero\{[^}]*text-align:left/,'Projects rendered hero must remain left aligned');
assert.match(fidelity,/\.projects-list-page/);
assert.match(fidelity,/\.blog-detail-page/);
assert.match(fidelity,/\.project-detail-page/);
assert.match(fidelity,/\.contact-map/);
assert.match(fidelity,/\.contact-reference-form-grid\{display:grid;grid-template-columns:/,'contact rendered form must use image/form split');
assert.match(fidelity,/\.contact-info-grid\{display:grid;grid-template-columns:repeat\(3/,'contact card row missing three-column reference treatment');
assert.match(fidelity,/\.about-reference-verification\{[\s\S]*overflow:hidden/,'About verification strip must not create page-level overflow');
assert.match(fidelity,/\.contact-page \.contact-main \.two-col\{[\s\S]*grid-template-columns:minmax\(0,1fr\)!important/,'Contact mobile form/direct-contact layout must collapse to one column');
assert.match(fidelity,/\.contact-route-grid\{display:grid;grid-template-columns:repeat\(3/,'contact route selector missing three-column desktop layout');
assert.match(fidelity,/\.contact-step-grid\{display:grid;grid-template-columns:repeat\(3/,'contact next-step process missing three-column desktop layout');
assert.match(fidelity,/\.services-tech-grid\{[\s\S]*display:flex!important/,'services technology stage must use circular reference tokens');
assert.match(fidelity,/\.services-benefit-split\{display:grid;grid-template-columns:1fr 1fr/,'services benefits missing rendered split treatment');
assert.match(fidelity,/\.services-benefit-grid\{display:grid;grid-template-columns:repeat\(3/,'services benefits grid missing desktop reference rhythm');
assert.match(fidelity,/\.services-faq-layout\{display:grid;grid-template-columns:/,'services FAQ layout missing split reference treatment');
assert.match(fidelity,/\.about-proof-metrics-grid\{display:grid;grid-template-columns:repeat\(4/,'about proof cards missing four-column reference rhythm');
assert.match(fidelity,/\.about-priority-grid\{display:grid;grid-template-columns:/,'about priority section missing image-led split layout');
assert.match(fidelity,/\.about-reference-verification\{background:#000000/,'about verification strip missing reference contrast');
assert.match(fidelity,/\.about-credential-row\{display:grid;grid-template-columns:/,'about credentials missing structured evidence rows');
assert.match(fidelity,/utility-404-art/);
const editorialCss=read('assets/ritovex-editorial.css');
assert.match(editorialCss,/\.blog-reference-hero/,'Blog missing reference-style left editorial hero');
assert.match(editorialCss,/\.projects-reference-hero/,'Projects missing reference-style left editorial hero');
assert.match(editorialCss,/\.blog-reference-grid\{grid-template-columns:repeat\(3/,'Blog listing must use the reference three-column desktop grid');
assert.match(editorialCss,/\.project-proof-grid\{grid-template-columns:repeat\(2/,'Projects listing must use the reference two-column desktop grid');
assert.match(editorialCss,/\.blog-featured-article/,'blog feature styling missing');
assert.match(editorialCss,/\.project-proof-grid\{grid-template-columns:repeat\(2/,'projects portfolio must use a distinct two-column desktop grid');
assert.match(editorialCss,/\.projects-proof-note/,'projects truthfulness note styling missing');

assert.match(fidelity,/@media\(max-width:980px\)\{\s*\.rv-topline\{display:none\}/,'Ritovex mobile shell must align to the shared 980px nav breakpoint');
assert.match(fidelity,/html\.nav-open,html\.nav-open body\{overflow:hidden\}/,'mobile menu must lock page scroll while open');
assert.match(app,/matchMedia\('\(max-width: 980px\)'\)/,'navigation JS must use the same 980px breakpoint as CSS');
assert.match(app,/closest\('\.mobile-toggle'\)/,'outside-click handling must exclude the mobile toggle');
assert.match(app,/e\.key==='Escape'/,'mobile navigation must close on Escape');
assert.match(app,/menuFocusables/,'mobile navigation missing focus containment');
assert.match(app,/e\.key==='Tab'/,'mobile navigation missing keyboard focus loop');
assert.match(app,/mobileNav\.addEventListener\?\.\('change',syncBreakpoint\)/,'navigation must clean up when crossing to desktop');

assert.match(fidelityJs,/matchMedia\?\.\('\(min-width: 981px\)'\)/,'desktop fidelity hover interactions must start at 981px');
assert.match(fidelityJs,/focusin/,'desktop mega-menu must open from keyboard focus');
assert.match(fidelityJs,/focusout/,'desktop mega-menu must close when keyboard focus leaves');
assert.match(fidelityJs,/setTimeout\(openMenu,55\)/,'desktop mega-menu missing hover-intent opening delay');
assert.match(fidelityJs,/setTimeout\(\(\)=>\{d\.open=false\},160\)/,'desktop mega-menu missing forgiving close delay');
assert.doesNotMatch(fidelityJs,/innerWidth>900/,'legacy 900px desktop hover seam must stay removed');
assert.match(fidelityJs,/Request updates →/,'newsletter must describe a request, not a completed subscription');
assert.match(fidelityJs,/mailto:info@vertexsystemsnetwork\.com/,'static newsletter request must route through an explicit email draft');
assert.match(fidelityJs,/not stored on this static page/,'newsletter must disclose static-site storage behavior');
assert.doesNotMatch(fidelityJs,/btn\.textContent='Thank you'/,'newsletter must not claim false subscription success');
assert.doesNotMatch(fidelityJs,/pointermove/);
assert.doesNotMatch(fidelityJs,/\.animate\(/);
assert.match(motion,/IntersectionObserver/,'motion.js must own viewport reveals');
assert.match(motion,/observer\.unobserve/,'motion.js reveal must remain one-shot');
assert.doesNotMatch(fidelityJs,/IntersectionObserver/,'fidelity JS must not own a second viewport reveal observer');
assert.doesNotMatch(fidelityJs,/rv-fidelity-reveal/,'fidelity JS must not re-hide rendered sections');
assert.doesNotMatch(fidelity,/\.rv-fidelity-reveal/,'fidelity CSS must not contain a second hidden reveal state');

console.log('Ritovex fidelity passed: shell, 980px mobile navigation, palette lock, direct imagery, service FAQs/forms, Google Map, distinct editorial/project templates, 404 and single reveal owner are intact.');
