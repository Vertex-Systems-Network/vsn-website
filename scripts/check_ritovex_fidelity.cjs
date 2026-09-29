// Fidelity regression checks for the VSN Ritovex-reference rebuild.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const read=p=>fs.readFileSync(p,'utf8');
const fidelity=read('assets/ritovex-fidelity.css');
const fidelityJs=read('assets/ritovex-fidelity.js');
const motion=read('assets/motion.js');
const app=read('assets/app.js');
const globalPolish=read('assets/vsn-global-polish.css');
const homeBatch1=read('assets/home-batch1.css');
const homeBatch1Js=read('assets/home-batch1.js');
const homeMockup=read('assets/home-mockup-parity.css');
const servicesBatch2=read('assets/services-batch2.css');
const servicesMockup=read('assets/services-mockup-parity.css');
const aboutMockup=read('assets/about-mockup-parity.css');
const projectsMockup=read('assets/projects-mockup-parity.css');
const batch3Polish=read('assets/batch3-page-polish.css');

const servicePages=[
 'software.html','web-development-ecommerce.html','websites.html','ecommerce.html',
 'mobile-app-development.html','ai-automation.html','profile.html','social-media.html',
 'bpo.html','business-solutions.html','tax-consulting.html','resource-augmentation.html'
];

const propagatedServiceReferencePages=[
 'software.html','websites.html','ecommerce.html','mobile-app-development.html','ai-automation.html',
 'profile.html','social-media.html','bpo.html','business-solutions.html','tax-consulting.html','resource-augmentation.html'
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

// The old atlas remains forbidden. Formerly corrupted semantic filenames are now
// backed by new high-resolution standalone WebP binaries and are validated by
// validate_static_site.py for dimensions, size, uniqueness and semantic wiring.
const legacyCorruptedHumanAssets=['vsn-human-atlas.webp'];

for(const file of htmlFiles){
 const body=read(file);
 legacyCorruptedHumanAssets.forEach(asset=>assert.ok(!body.includes(asset),file+' references legacy corrupted human asset '+asset));
 const legal=file.startsWith('legal'+path.sep);
 const fidelityCss=legal?'../assets/ritovex-fidelity.css':'assets/ritovex-fidelity.css';
 const fidelityScript=legal?'../assets/ritovex-fidelity.js':'assets/ritovex-fidelity.js';
 assert.ok(body.includes(fidelityCss),file+' missing fidelity stylesheet');
 const globalPolishCss=legal?'../assets/vsn-global-polish.css':'assets/vsn-global-polish.css';
 assert.ok(body.includes(globalPolishCss),file+' missing shared global polish stylesheet');
 assert.doesNotMatch(body,/rv-footer-word/,file+' still renders the removed giant VSN footer wordmark');
 assert.ok(body.includes(fidelityScript),file+' missing fidelity interaction script');
 assert.ok(body.includes('rv-header'),file+' missing reference header shell');
 if(file==='index.html'){
  assert.ok(body.includes('mockup-footer'),file+' missing approved mockup footer shell');
  assert.match(body,/class="[^"]*footer-public-links[^"]*mockup-footer-meta[^"]*"/,file+' missing compact mockup public-profile footer');
 }else{
  assert.ok(body.includes('rv-footer'),file+' missing reference footer shell');
  assert.match(body,/class="rv-footer-contact"[\s\S]*?href="tel:\+923168433104"/,file+' missing clickable footer phone');
  assert.match(body,/class="rv-footer-contact"[\s\S]*?href="mailto:info@vertexsystemsnetwork\.com"/,file+' missing clickable footer email');
 }
 assert.match(body,/class="rv-topline-contact"[\s\S]*?href="mailto:info@vertexsystemsnetwork\.com"/,file+' missing clickable top-line email');
 assert.match(body,/class="rv-topline-contact"[\s\S]*?href="tel:\+923168433104"/,file+' missing clickable top-line phone');
 assert.doesNotMatch(body,/<span>info@vertexsystemsnetwork\.com · \+92 316 8433104<\/span>/,file+' contains legacy plain-text top contact');
 assert.doesNotMatch(body,/assets\/vsn-human-(software|ai|growth|operations|business|team|industries|editorial)\.svg/,file+' still uses semantic SVG image wrapper');
}

for(const file of servicePages){
 const body=read(file);
 assert.match(body,/assets\/batch3-page-polish\.css/,file+' missing Batch 3 detail stylesheet');
 assert.match(body,/class="service-hero-copy"/,file+' missing Batch 3 hero copy wrapper');
 assert.match(body,/class="service-hero-visual"/,file+' missing Batch 3 semantic hero visual');
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
assert.match(contact,/assets\/batch3-page-polish\.css/,'contact page missing Batch 3 stylesheet');
assert.match(contact,/contact-hero-grid/,'contact page missing Batch 3 image-led hero grid');
assert.match(contact,/contact-hero-visual[\s\S]*vsn-human-team\.webp/,'contact Batch 3 hero must use committed VSN imagery');
assert.match(contact,/contact-reference-form-grid/,'contact page missing image-plus-form split');
assert.equal((contact.match(/class="container contact-info-grid"[\s\S]*?<\/div><\/section>/)||[''])[0].match(/<article>/g)?.length,3,'contact page must contain address, phone and email cards');
assert.doesNotMatch(contact,/<iframe[^>]*sandbox=/i,'contact page must not sandbox the Google Maps iframe because it can break the rendered embed');
assert.match(contact,/contact-route-section/,'contact page missing clear route selector');
assert.equal((contact.match(/class="contact-route-grid"[\s\S]*?<\/div><\/div><\/section>/)||[''])[0].match(/<a /g)?.length,3,'contact route selector must contain three routes');
assert.match(contact,/https:\/\/wa\.me\/923168433104/,'contact page missing direct WhatsApp route');
assert.match(contact,/contact-next-steps/,'contact page missing next-step process');
assert.equal((contact.match(/class="contact-step-grid"[\s\S]*?<\/div><\/div><\/section>/)||[''])[0].match(/<article>/g)?.length,3,'contact next-step process must contain three stages');

const home=read('index.html');
assert.match(home,/<body class="home-page mockup-parity">/,'Home must use the approved mockup parity body contract');
assert.match(home,/assets\/home-mockup-parity\.css/,'Home missing approved mockup parity stylesheet');
assert.match(home,/class="mockup-hero"/,'Home missing approved split hero composition');
assert.equal((home.match(/data-hero-slide/g)||[]).length,3,'Home mockup hero must keep three visual slides');
assert.equal((home.match(/data-hero-dot/g)||[]).length,3,'Home mockup hero must keep three accessible slide controls');
assert.match(home,/class="mockup-process-panel"/,'Home mockup must keep the right-side process panel');
assert.equal((home.match(/class="mockup-process-item"/g)||[]).length,4,'Home mockup process must contain four stages');
assert.match(home,/class="mockup-platform-strip"/,'Home mockup missing platform/technology strip');
assert.equal((home.match(/class="mockup-service-card"/g)||[]).length,4,'Home mockup services band must contain four image-led cards');
assert.equal((home.match(/class="mockup-industry-card"/g)||[]).length,6,'Home mockup industries row must contain six visual tiles');
assert.match(home,/class="mockup-featured-card"/,'Home mockup missing featured public project card');
assert.equal((home.match(/class="mockup-insight-card"/g)||[]).length,2,'Home mockup must contain two compact insight cards');
assert.equal((home.match(/class="mockup-proof-item"/g)||[]).length,4,'Home proof row must use four factual public-proof cards');
assert.match(home,/class="mockup-cta-band"/,'Home mockup missing compact dark CTA band');
assert.match(home,/class="mockup-footer"/,'Home mockup missing compact footer');
assert.doesNotMatch(home,/home-about-section|home-capabilities|home-showcase-section|home-team-section|home-proof-section|vsn-capability-marquee|home-process-section|home-blog-section|review-section/,'Legacy Home composition must not coexist with approved mockup layout');
assert.doesNotMatch(home,/Happy Clients|Projects Completed|Sarah Mitchell|James Carter|Emily Roberts|Daniel Kim/,'Home must not copy unverified mockup claims or testimonials');
assert.match(home,/SECP 0313834/,'Home mockup must keep verifiable company proof');
assert.match(home,/PSEB Z-25-17539\/25/,'Home mockup must keep verifiable PSEB proof');
assert.match(home,/apps\.shopify\.com\/vsn-metafields/,'Home mockup must retain public Shopify product proof');
assert.match(home,/github\.com\/Vertex-Systems-Network/,'Home mockup must retain public GitHub proof');
assert.match(home,/profiles\.wordpress\.org\/wpessential/,'Home mockup must retain public WordPress proof');
assert.match(globalPolish,/\.rv-footer-word\{display:none!important\}/,'Global polish must suppress the removed legacy wordmark if stale markup appears');
assert.match(globalPolish,/border-radius:var\(--vsn-radius\)!important/,'Global controls must share one rounded border treatment');
assert.match(batch3Polish,/\.service-single-reference-shell,[\s\S]*grid-template-columns:minmax\(0,.86fr\) minmax\(470px,1.14fr\)!important/,'Batch 3 service hero split missing');
assert.match(batch3Polish,/\.contact-hero-grid\{[\s\S]*grid-template-columns:minmax\(0,.82fr\) minmax\(480px,1.18fr\)/,'Batch 3 Contact hero split missing');
assert.match(batch3Polish,/\.blog-reference-grid \.editorial-card-media\{[\s\S]*height:250px/,'Batch 3 Blog image height contract missing');
assert.match(batch3Polish,/\.blog-reference-hero\{[\s\S]*#000000!important/,'Batch 3 Blog hero must retain dark contrast');
assert.match(batch3Polish,/\.blog-list-page \.blog-hero-visual\.editorial-hero-visual\{[\s\S]*display:block!important/,'Blog hero visual must override legacy hide rule');
assert.match(motion,/querySelectorAll\('[^']*\.editorial-hero-visual[^']*'\)/,'Above-the-fold editorial hero visual must be revealed immediately');
assert.match(homeMockup,/\.mockup-hero\{[\s\S]*grid-template-columns:minmax\(0,1.55fr\) minmax\(420px,.72fr\)/,'Home mockup hero geometry contract missing');
assert.match(homeMockup,/\.mockup-service-cards\{[\s\S]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/,'Home mockup four-card services geometry missing');
assert.match(homeMockup,/\.mockup-industry-cards\{[\s\S]*grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/,'Home mockup six-tile industries geometry missing');
assert.match(homeMockup,/\.mockup-work-grid\{[\s\S]*grid-template-columns:minmax\(220px,.62fr\) minmax\(420px,1.15fr\) minmax\(410px,1fr\)/,'Home mockup project/insights geometry missing');
assert.match(homeMockup,/\.mockup-proof-grid\{[\s\S]*grid-template-columns:minmax\(200px,.8fr\) repeat\(4,minmax\(0,1fr\)\)/,'Home mockup public-proof row geometry missing');
assert.match(homeBatch1Js,/setInterval\(\(\)=>show\(active\+1\),6000\)/,'Home slider must rotate at a restrained cadence');
assert.match(homeBatch1Js,/requestAnimationFrame\(updateParallax\)/,'Home hero parallax must be requestAnimationFrame-driven');
assert.doesNotMatch(homeBatch1Js,/pointermove/,'Home hero parallax must not use pointermove loops');
const blog=read('blog.html');
const projects=read('projects.html');
const blogDetail=read('blog-detail.html');
const projectDetail=read('project-detail.html');
const webCommerce=read('web-development-ecommerce.html');
const serviceDetailCss=read('assets/ritovex-service-detail.css');
assert.match(home,/href="blog-detail\.html"/,'Home mockup insights missing published article link');
assert.match(home,/href="blog\.html">View All Articles/,'Home mockup insights missing all-articles route');
assert.match(blog,/<body class="editorial-page blog-list-page">/);
assert.match(blog,/assets\/batch3-page-polish\.css/,'Blog missing Batch 3 stylesheet');
assert.match(blog,/blog-hero-grid[\s\S]*blog-hero-visual/,'Blog missing Batch 3 image-led hero');
assert.match(blog,/blog-hero-visual[\s\S]*vsn-human-editorial\.webp/,'Blog hero must use committed editorial imagery');
assert.equal((blog.match(/class="editorial-card"/g)||[]).length,9,'blog reference grid must contain nine cards');
assert.equal((blog.match(/Coming soon/g)||[]).length>=8,true,'blog must keep eight planned topics clearly marked as coming soon');
assert.equal((blog.match(/Coming soon/g)||[]).length>=8,true,'blog upcoming topics must remain clearly labeled');
assert.match(projects,/<body class="editorial-page projects-list-page projects-mockup-parity">/,'Projects must use approved cinematic parity body contract');
assert.match(projects,/assets\/projects-mockup-parity\.css/,'Projects missing approved cinematic parity stylesheet');
assert.match(projects,/projects-proof-note/,'projects page missing portfolio truthfulness note');
assert.equal((projects.match(/project-image-meta/g)||[]).length,4,'Projects must show four image metadata overlays in the reference portfolio grid');
assert.equal(projects.indexOf('project-proof-grid') < projects.indexOf('projects-proof-note'),true,'portfolio truthfulness note must follow the featured project grid');
assert.equal((projects.match(/project-proof-card/g)||[]).length,4,'Projects page must contain exactly four verified visual portfolio cards');
assert.equal((projects.match(/project-card-index/g)||[]).length,4,'Projects portfolio cards must retain numbered reference rhythm');
assert.doesNotMatch(projects,/project-repo-row/,'Projects must not duplicate the four public surfaces as legacy compact rows');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/vsn-marketing/,'projects page missing VSN Marketing repository proof');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/vsn-builder/,'projects page missing VSN Builder repository proof');
assert.match(projects,/github\.com\/Vertex-Systems-Network\/ai-native-project-operating-system/,'projects page missing ANPOS repository proof');
assert.doesNotMatch(projects,/<span>Capability<\/span>/,'projects page must not present generic capabilities as completed projects');
assert.match(projectsMockup,/\.projects-list-page\.projects-mockup-parity \.project-proof-grid\{[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/,'Projects parity must retain two-column desktop portfolio rhythm');
assert.match(projectsMockup,/\.projects-list-page\.projects-mockup-parity \.projects-reference-hero\{[\s\S]*#000!important/,'Projects parity hero must retain cinematic black stage');
assert.match(blogDetail,/<body class="editorial-page blog-detail-page">/);
assert.match(projectDetail,/<body class="editorial-page project-detail-page projects-mockup-parity">/,'Project Detail must use approved cinematic parity body contract');
assert.match(projectDetail,/assets\/projects-mockup-parity\.css/,'Project Detail missing approved cinematic parity stylesheet');
assert.match(projectDetail,/project-detail-story/,'Project Detail missing About the Project stage');
assert.match(projectDetail,/project-detail-challenge/,'Project Detail missing Project Challenge stage');
assert.match(projectDetail,/project-detail-secondary-media/,'Project Detail missing second full-width media stage');
assert.match(projectDetail,/project-detail-features/,'Project Detail missing Key Features stage');
assert.equal((projectDetail.match(/project-feature-list[\s\S]*?<\/div><div class="project-detail-actions"/)||[''])[0].match(/<article>/g)?.length,4,'Project Detail key project signals must contain four evidence-led items');
assert.match(projectsMockup,/\.project-detail-story-grid\{[\s\S]*grid-template-columns:220px minmax\(0,1fr\)!important/,'Project Detail parity must retain reference label/content split');
assert.match(projectsMockup,/\.project-feature-list\{[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/,'Project Detail parity must retain two-column feature grid');
assert.notEqual((blog.match(/<body[^>]*>/)||[''])[0],(projects.match(/<body[^>]*>/)||[''])[0],'Blog and Projects must not share the same page template class');
assert.notEqual((blogDetail.match(/<body[^>]*>/)||[''])[0],(projectDetail.match(/<body[^>]*>/)||[''])[0],'Blog Detail and Project Detail must remain distinct');

assert.match(webCommerce,/web-service-reference-hero/,'Web Development detail must use the reference single-service hero');
assert.match(webCommerce,/web-service-reference-media-section/,'Web Development detail must place a full-width media stage after the hero');
assert.match(webCommerce,/web-service-reference-overview/,'Web Development detail missing service overview stage');
assert.match(webCommerce,/web-service-reference-included/,'Web Development detail missing included-work stage');
assert.match(webCommerce,/web-service-reference-vision/,'Web Development detail missing pre-brief vision CTA');
assert.equal(webCommerce.indexOf('web-service-reference-overview') < webCommerce.indexOf('One web engineering service'),true,'Reference overview must lead the extended VSN service content');
assert.equal(webCommerce.indexOf('id="web-project-brief"') < webCommerce.indexOf('class="faq"'),true,'Web Development project form must remain before FAQ');
assert.doesNotMatch(webCommerce,/live Ritovex|reference template|template rhythm/i,'Internal reference notes must not appear in public Web Development copy');
assert.match(serviceDetailCss,/\.web-service-reference-overview-grid\{[\s\S]*grid-template-columns:repeat\(2/,'Web Development overview must retain a two-column desktop reading rhythm');
assert.match(serviceDetailCss,/\.web-service-reference-vision\{[\s\S]*background:#000000/,'Web Development vision CTA must retain the dark reference stage');



for(const file of propagatedServiceReferencePages){
 const body=read(file);
 assert.match(body,/service-single-reference-hero/,file+' missing text-first single-service hero');
 assert.match(body,/service-single-reference-media-section/,file+' missing full-width single-service media stage');
 assert.match(body,/service-single-reference-overview/,file+' missing service overview stage');
 assert.match(body,/service-single-included-stage/,file+' missing included-work stage');
 assert.doesNotMatch(body,/live Ritovex|reference template|template rhythm/i,file+' exposes internal reference notes in public copy');
}
assert.match(read('websites.html'),/service-single-reference-hero[\s\S]*?<h1 class="h1">Business Websites<\/h1>/,'Websites H1 must use the concise service-name title inside the reference hero');
assert.match(serviceDetailCss,/\.service-single-reference-overview-grid\{[\s\S]*grid-template-columns:repeat\(2/,'Shared service overview must keep two-column desktop rhythm');
assert.match(serviceDetailCss,/\.service-single-included-stage>\.container\{[\s\S]*border-top:1px solid #3F4245/,'Shared included-work stage must retain reference separator');

for(const file of ['index.html','blog.html','projects.html','blog-detail.html','project-detail.html']){
 const body=read(file);
 assert.match(body,/assets\/vsn-human-[^"' ]+\.webp/,file+' missing direct human WebP imagery');
}

const about=read('about.html');
assert.match(about,/<body class="secondary-page about-page about-reference-page about-mockup-parity">/,'About must use approved cinematic parity body contract');
assert.match(about,/assets\/about-mockup-parity\.css/,'About missing approved cinematic parity stylesheet');
assert.match(aboutMockup,/\.about-reference-page\.about-mockup-parity \.about-reference-hero>[.]container\{[\s\S]*grid-template-columns:minmax\(350px,.78fr\) minmax\(0,1.22fr\)!important/,'About parity hero split missing');
assert.match(aboutMockup,/\.about-reference-page\.about-mockup-parity \.about-proof-metrics-grid\{[\s\S]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)!important/,'About parity proof row missing');
assert.match(aboutMockup,/\.about-reference-page\.about-mockup-parity \.about-reference-team\{[\s\S]*background:#000000!important/,'About parity team stage must retain cinematic contrast');
assert.match(aboutMockup,/\.about-reference-page\.about-mockup-parity \.about-team-grid\{[\s\S]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)!important/,'About parity team grid missing');
assert.match(aboutMockup,/\.about-reference-page\.about-mockup-parity \.about-reference-credentials\{[\s\S]*background:#000000!important/,'About parity credentials stage must retain dark reference role');
assert.match(aboutMockup,/@media\(max-width:980px\)/,'About parity mobile breakpoint missing');

const services=read('services.html');
assert.match(about,/about-reference-hero/);
assert.match(about,/reference-service-accordion/);
assert.match(about,/about-team-grid/);
assert.match(about,/about-proof-metrics-grid/,'about page missing factual proof-card stage');
assert.match(about,/about-priority-grid/,'about page missing image-led priority stage');
assert.match(about,/about-reference-principles/,'about page missing operating-principles stage');
assert.match(about,/about-reference-hero-media/,'about page missing reference hero media');
assert.match(about,/about-reference-hero-media[\s\S]*vsn-human-business\.webp/,'about hero media must use committed VSN human imagery');
assert.equal((about.match(/about-priority-points[\s\S]*?<\/div><a class="btn btn-dark"/)||[''])[0].match(/<article>/g)?.length,4,'about priority section must contain four operating principles');
assert.match(about,/about-reference-verification/,'about page missing public verification strip');
assert.match(about,/about-reference-credentials/,'about page missing credentials/milestones stage');
assert.match(about,/SECP · 0313834/,'about credentials missing SECP evidence');
assert.match(about,/PSEB · Z-25-17539\/25/,'about credentials missing PSEB evidence');
assert.match(about,/https:\/\/github\.com\/Vertex-Systems-Network/,'about credentials missing GitHub proof');
assert.match(about,/https:\/\/apps\.shopify\.com\/vsn-metafields/,'about credentials missing Shopify proof');
assert.doesNotMatch(about,/Award-Winning|Awards Winner|Industry Award Recipient/,'about page must not fabricate reference-template awards');
assert.match(services,/assets\/services-batch2\.css/,'Services page missing Batch 2 stylesheet');
assert.match(services,/assets\/services-mockup-parity\.css/,'Services page missing approved mockup parity stylesheet');
assert.match(services,/<body class="secondary-page services-reference-page services-mockup-parity">/,'Services page missing mockup parity body contract');
assert.equal((services.match(/class="services-pillar"/g)||[]).length,4,'Services hero must contain four Build/Automate/Grow/Operate visual pillars');
assert.match(services,/services-tech-layout[\s\S]*services-tech-visual/,'Services technology section must use image-plus-platform layout');
assert.equal((services.match(/class="services-proof-media"/g)||[]).length,3,'Services proof section must contain three image-backed public proof cards');
assert.match(services,/services-scope-section[\s\S]*services-scope-intro/,'Services scope section must use visual scope split');
assert.match(servicesBatch2,/\.services-rendered-hero>[.]container\{/,'Services Batch 2 hero layout missing');
assert.match(servicesBatch2,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/,'Services hero pillars must use a visual two-column grid');
assert.match(servicesBatch2,/\.services-tech-grid\{[\s\S]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)!important/,'Services platform grid must use visual tiles rather than circles');
assert.match(servicesBatch2,/\.services-reference-proof\{[\s\S]*#000000!important/,'Services proof section must retain dark contrast');
assert.match(servicesBatch2,/\.services-reference-scope\{[\s\S]*grid-template-columns:minmax\(360px,.82fr\) minmax\(0,1.18fr\)!important/,'Services scope split missing');
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
assert.match(services,/class="services-mockup-footer"/,'Services page missing compact mockup footer');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-reference-hero>[.]container\{[\s\S]*grid-template-columns:minmax\(350px,.82fr\) minmax\(0,1.48fr\)!important/,'Services mockup hero split missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-rendered-hero-stage\{[\s\S]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)!important/,'Services mockup Build Automate Grow Operate visual grid missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-reference-tech\{[\s\S]*#000000!important/,'Services mockup technology stage must use dark cinematic contrast');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-tech-grid\{[\s\S]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)!important/,'Services mockup technology tile grid missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-proof-cards\{[\s\S]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)!important/,'Services mockup proof visual grid missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-reference-scope\{[\s\S]*grid-template-columns:1.1fr .9fr!important/,'Services mockup scope split missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-scope-intro\{[\s\S]*min-height:600px!important/,'Services scope visual stage missing');
assert.match(servicesMockup,/\.services-reference-page\.services-mockup-parity \.services-reference-faq\{[\s\S]*#3F4245!important/,'Services FAQ contrast band missing');
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
assert.match(fidelity,/\.rv-footer-cta\{[\s\S]*background:#FFFFFF!important/,'footer CTA must use white outer breathing space');
assert.match(fidelity,/\.rv-footer-cta \.container\{[\s\S]*max-width:1240px!important[\s\S]*border-radius:10px[\s\S]*background-color:#000000/,'footer CTA must use centered boxed dark panel');
assert.match(fidelity,/position:fixed!important;[\s\S]*inset:68px 0 0 0!important/,'mobile navigation must use the full-height reference shell');
assert.match(fidelity,/\.rv-footer-grid\{grid-template-columns:1fr!important/,'small-screen footer must collapse to one clear column');
assert.match(fidelity,/\.rv-footer-word\{[^}]*color:#3F4245/,'footer wordmark must remain visible on the black footer');
assert.match(fidelity,/font-size:clamp\(190px,35vw,500px\)!important/,'footer wordmark must fill the desktop footer width');
assert.match(fidelity,/font-size:42vw!important/,'footer wordmark must retain oversized mobile scale');
assert.match(fidelity,/\.rv-footer-bottom\{[\s\S]*border-top:1px solid #3F4245/,'footer bottom metadata row needs the reference separator');
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
assert.match(editorialCss,/\.blog-reference-grid \.editorial-meta>span:first-child\{[\s\S]*border-radius:5px[\s\S]*background:#FFFFFF/,'Blog category metadata must use a pill treatment');
assert.match(editorialCss,/\.project-proof-grid\{grid-template-columns:repeat\(2/,'Projects listing must use the reference two-column desktop grid');
assert.match(editorialCss,/\.blog-featured-article/,'blog feature styling missing');
assert.match(editorialCss,/\.project-proof-grid\{grid-template-columns:repeat\(2/,'projects portfolio must use a distinct two-column desktop grid');
assert.match(editorialCss,/\.project-image-meta\{[\s\S]*position:absolute[\s\S]*bottom:0/,'project metadata must overlay the project image bottom edge');
assert.match(editorialCss,/\.projects-proof-note/,'projects truthfulness note styling missing');
assert.match(editorialCss,/\.project-detail-page \.editorial-hero-grid\{[\s\S]*grid-template-columns:minmax\(0,1fr\)!important/,'project detail mobile hero must stay inside viewport');
assert.match(editorialCss,/\.project-detail-page \.editorial-hero-visual,[\s\S]*max-width:100%!important/,'project detail mobile visual must be width-bounded');
assert.match(editorialCss,/\.project-detail-page \.editorial-hero-grid\{[\s\S]*display:block!important/,'project detail mobile hero must use block flow');

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


const expectedServiceHeroTitles={
 'software.html':'Custom Software &amp; SaaS',
 'web-development-ecommerce.html':'Web Development',
 'websites.html':'Business Websites',
 'ecommerce.html':'E-commerce Development',
 'mobile-app-development.html':'Mobile App Development',
 'ai-automation.html':'AI Solutions',
 'profile.html':'Authority Profile',
 'social-media.html':'Digital Marketing &amp; Growth',
 'bpo.html':'BPO Services',
 'business-solutions.html':'Business Solutions',
 'tax-consulting.html':'Tax Consultancy',
 'resource-augmentation.html':'Resource Augmentation'
};
for(const [file,title] of Object.entries(expectedServiceHeroTitles)){
 const body=read(file);
 assert.ok(body.includes('<h1 class="h1">'+title+'</h1>'),file+' must use the concise service-name H1');
}
assert.match(serviceDetailCss,/rendered-reference service-name hero scale/,'Service-detail CSS missing rendered-reference hero-title scale');
assert.match(serviceDetailCss,/font-size:30px;[\s\S]*line-height:1\.3/,'Service-detail mobile hero title must match the compact reference scale');
assert.match(editorialCss,/rendered-reference exact single-detail heading metrics/,'Editorial CSS missing exact single-detail heading metrics');
assert.match(editorialCss,/\.blog-detail-reference-hero \.h1\{[\s\S]*font-size:48px[\s\S]*line-height:1\.5/,'Blog detail desktop heading metric must stay reference-aligned');
assert.match(editorialCss,/\.project-detail-reference-hero \.h1\{[\s\S]*font-size:80px[\s\S]*line-height:1\.5/,'Project detail desktop heading metric must stay reference-aligned');


assert.match(blogDetail,/<h1 class="h1">AI Helps. Human Review Still Matters.<\/h1>/,'Blog detail must keep the concise reference-scale article title');
assert.match(read('blog.html'),/AI Helps. Human Review Still Matters./,'Blog listing must use the same published article title');
assert.match(home,/AI Helps. Human Review Still Matters./,'Homepage article preview must use the same published title');
assert.match(read('web-development-ecommerce.html'),/<h1 class="h1">Web Development<\/h1>/,'Representative service detail must keep the one-line Web Development H1');
assert.match(fidelity,/@media\(max-width:700px\)\{[\s\S]*\.not-found-page \.utility-inner \.h1\{[\s\S]*font-size:26px!important[\s\S]*white-space:nowrap/,'Mobile 404 must keep its title on one reference-style line');


assert.match(serviceDetailCss,/@media\(min-width:701px\)\{[\s\S]*\.web-commerce-detail-page \.web-service-reference-hero \.h1\{[\s\S]*font-size:120px[\s\S]*line-height:180px[\s\S]*letter-spacing:-2\.4px/,'Representative service desktop heading metrics must exactly match the measured reference');

console.log('Ritovex fidelity passed: shell, 980px mobile navigation, palette lock, direct imagery, service FAQs/forms, Google Map, distinct editorial/project templates, 404 and single reveal owner are intact.');


assert.match(blogDetail,/blog-detail-reference-hero/,'Blog detail must use the reference text-first hero');
assert.match(blogDetail,/blog-detail-publish-strip/,'Blog detail must show publisher/date/read-time information');
assert.equal(blogDetail.indexOf('blog-detail-hero-media') < blogDetail.indexOf('blog-detail-publish-strip'),true,'Blog detail metadata strip must follow the hero image like the rendered reference');
assert.match(blogDetail,/blog-detail-hero-media/,'Blog detail must use a full-width media stage');
assert.match(projectDetail,/project-detail-reference-hero/,'Project detail must use the reference text-first hero');
assert.match(projectDetail,/project-detail-reference-facts/,'Project detail must keep factual project metadata under the hero copy');
assert.match(projectDetail,/project-detail-reference-media/,'Project detail must use a full-width case-study media stage');

assert.match(read('404.html'),/<body class="editorial-page not-found-page">/,'404 must use its final reference utility class');
assert.doesNotMatch(read('404.html'),/rv-footer-cta/,'404 must move directly from the utility state into the reference footer');
assert.doesNotMatch(read('404.html'),/Contact VSN/,'404 must keep a single reference-style return action');
assert.match(fidelity,/\.not-found-page \.utility-inner \.h1\{[\s\S]*font-size:48px!important/,'404 desktop title must match the rendered reference scale');
assert.match(fidelity,/@media\(max-width:700px\)\{[\s\S]*\.not-found-page \.utility-inner \.h1\{[\s\S]*font-size:30px!important/,'404 mobile title must match the rendered reference scale');
assert.match(editorialCss,/\.blog-detail-reference-hero \.h1\{[\s\S]*font-size:clamp\(42px,3\.6vw,56px\)/,'Blog detail title must use article-scale typography rather than listing-hero scale');
assert.match(editorialCss,/\.project-detail-reference-hero \.h1\{[\s\S]*font-size:clamp\(64px,5\.6vw,84px\)/,'Project detail title must use the rendered project-single scale');
assert.match(editorialCss,/\.project-detail-reference-facts\{[\s\S]*background:rgba\(126,128,131,\.08\)/,'Project facts must keep the light reference metadata panel');

assert.match(editorialCss,/\.blog-detail-publish-strip\{[\s\S]*grid-template-columns:repeat\(3/,'Blog detail publish strip must use a three-column desktop rhythm');
assert.match(editorialCss,/\.project-detail-reference-facts\{[\s\S]*border-top-color:#3F4245/,'Project detail factual strip must remain visually legible');

assert.match(blogDetail,/blog-detail-share-row/,'Blog detail missing pre-media topic/share rhythm');
assert.match(blogDetail,/editorial-single-body/,'Blog detail must use the single-column editorial body');
assert.doesNotMatch(blogDetail,/class="container article-shell"/,'Blog detail must not fall back to the old sidebar article shell');
assert.match(blogDetail,/editorial-inline-media[\s\S]*vsn-human-team\.webp/,'Blog detail missing inline editorial media');
assert.match(projectDetail,/project-single-proof-note/,'Project detail must retain truthfulness proof as an inline note');
assert.match(projectDetail,/editorial-single-body project-single-body/,'Project detail must use the single-column case-study body');
assert.doesNotMatch(projectDetail,/class="container article-shell"/,'Project detail must not fall back to the old sidebar article shell');
assert.match(projectDetail,/editorial-inline-media[\s\S]*vsn-human-team\.webp/,'Project detail missing second case-study media stage');
assert.match(editorialCss,/\.article-intro-note\{[\s\S]*grid-template-columns:170px minmax\(0,1fr\)/,'Blog article intro note must retain the reference editorial separator rhythm');
assert.match(editorialCss,/\.editorial-single-article\.article-body\{[\s\S]*font-size:16px/,'Single detail body typography must retain the reference reading scale');
assert.match(editorialCss,/\.editorial-single-article\.article-body blockquote\{[\s\S]*background:#000000[\s\S]*color:#FFFFFF/,'Blog quote must retain the dark reference callout');

