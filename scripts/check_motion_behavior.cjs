// Offline regression checks for the one-shot, pre-paint VSN motion system.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const source = fs.readFileSync('assets/motion.js','utf8');
const init = fs.readFileSync('assets/motion-init.js','utf8');
const motionCss = fs.readFileSync('assets/motion.css','utf8');
const styles = fs.readFileSync('assets/styles.css','utf8');
const home = fs.readFileSync('index.html','utf8');
const runtimeJsFiles = fs.readdirSync('assets').filter(name=>name.endsWith('.js')).sort();
const runtimeJs = runtimeJsFiles.map(name=>({name,body:fs.readFileSync(path.join('assets',name),'utf8')}));
const observerOwners = runtimeJs.filter(file=>file.body.includes('IntersectionObserver')).map(file=>file.name);

assert.match(init,/motion-prep/);
assert.match(init,/motion-fallback/);
assert.match(init,/prefers-reduced-motion/);
assert.match(motionCss,/motion-prep:not\(\.motion-fallback\)/);
assert.match(motionCss,/rv-visible/);
assert.match(source,/IntersectionObserver/);
assert.equal((source.match(/new IntersectionObserver/g)||[]).length,1,'motion.js must create exactly one reveal observer');
assert.deepEqual(observerOwners,['motion.js'],'motion.js must be the only runtime IntersectionObserver owner');
assert.match(source,/observer\.unobserve\(entry\.target\)/);
assert.match(source,/seen=new Set\(\)/);
assert.match(source,/seen\.has\(el\)/);
assert.match(source,/home-hero-data-panel/);
assert.match(source,/p4-service-lane/);
assert.match(source,/about-proof-metrics-grid/);
assert.match(source,/contact-route-grid/);
assert.match(source,/rv-footer-cta/);
assert.match(source,/motion-live/);
assert.match(source,/motion-enabled/);
assert.match(source,/clearTimeout\(previewTimer\)/);
assert.match(source,/aria-expanded/);
assert.match(source,/data-service-accordion/);
assert.doesNotMatch(source,/pointermove/);
assert.doesNotMatch(source,/\.animate\(/);
for (const file of runtimeJs) {
  assert.doesNotMatch(file.body,/pointermove/,file.name+' must not add pointermove animation loops');
  assert.doesNotMatch(file.body,/\.animate\(/,file.name+' must not add WAAPI animation loops');
}
assert.doesNotMatch(styles,/vsn-intro|is-scrolled \.nav\{height:/);
assert.match(home,/data-service-accordion/);
assert.match(home,/home-services-stage/);
assert.match(home,/home-process-layout/);
assert.ok(fs.existsSync('assets/ritovex-editorial.css'));
assert.ok(fs.existsSync('blog.html'));
assert.ok(fs.existsSync('blog-detail.html'));
assert.ok(fs.existsSync('projects.html'));
assert.ok(fs.existsSync('project-detail.html'));
assert.ok(fs.existsSync('coming-soon.html'));

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir,entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk('.');
assert.equal(htmlFiles.length,32);
for (const file of htmlFiles) {
  const body = fs.readFileSync(file,'utf8');
  const legal = file.startsWith('legal'+path.sep);
  const initRef = legal ? '../assets/motion-init.js' : 'assets/motion-init.js';
  const cssRef = legal ? '../assets/motion.css' : 'assets/motion.css';
  const motionRef = legal ? '../assets/motion.js' : 'assets/motion.js';
  assert.ok(body.includes(initRef), file+' missing pre-paint motion init');
  assert.ok(body.includes(cssRef), file+' missing motion stylesheet');
  assert.ok(body.includes(motionRef), file+' missing motion runtime');
  const initIndex = body.indexOf(initRef);
  const firstStylesheet = body.search(/<link[^>]+rel=["']stylesheet["']/i);
  const motionIndex = body.indexOf(motionRef);
  const bodyClose = body.toLowerCase().lastIndexOf('</body>');
  assert.ok(firstStylesheet === -1 || initIndex < firstStylesheet,file+' motion-init must load before first stylesheet');
  assert.ok(motionIndex > 0 && (bodyClose === -1 || motionIndex < bodyClose),file+' motion runtime must load before closing body');
}

console.log('Motion behavior passed: pre-paint ordering, one-shot single observer owner, target dedupe, reduced-motion wiring, no pointermove/WAAPI loops, all 32 pages wired.');
