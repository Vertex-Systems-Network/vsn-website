// Offline regression checks for the one-shot, pre-paint VSN motion system.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const source = fs.readFileSync('assets/motion.js','utf8');
const init = fs.readFileSync('assets/motion-init.js','utf8');
const motionCss = fs.readFileSync('assets/motion.css','utf8');
const styles = fs.readFileSync('assets/styles.css','utf8');
const home = fs.readFileSync('index.html','utf8');

assert.match(init,/motion-prep/);
assert.match(init,/motion-fallback/);
assert.match(init,/prefers-reduced-motion/);
assert.match(motionCss,/motion-prep:not\(\.motion-fallback\)/);
assert.match(motionCss,/rv-visible/);
assert.match(source,/IntersectionObserver/);
assert.match(source,/observer\.unobserve\(entry\.target\)/);
assert.match(source,/motion-live/);
assert.match(source,/data-service-accordion/);
assert.doesNotMatch(source,/pointermove/);
assert.doesNotMatch(source,/\.animate\(/);
assert.doesNotMatch(styles,/vsn-intro|is-scrolled \.nav\{height:/);
assert.match(home,/data-service-accordion/);
assert.match(home,/home-services-stage/);
assert.match(home,/home-process-layout/);

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
assert.equal(htmlFiles.length,27);
for (const file of htmlFiles) {
  const body = fs.readFileSync(file,'utf8');
  const legal = file.startsWith('legal'+path.sep);
  const initRef = legal ? '../assets/motion-init.js' : 'assets/motion-init.js';
  const cssRef = legal ? '../assets/motion.css' : 'assets/motion.css';
  assert.ok(body.includes(initRef), file+' missing pre-paint motion init');
  assert.ok(body.includes(cssRef), file+' missing motion stylesheet');
}

console.log('Motion behavior passed: pre-paint setup, one-shot observer, unobserve-after-reveal, no pointermove/WAAPI loops, all 27 pages wired.');
