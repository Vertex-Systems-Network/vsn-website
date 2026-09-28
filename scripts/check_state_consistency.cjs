// Guard the compact repository resume index against contradictory or stale duplicate anchors.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const statePath='.ai/state/CURRENT-STATE.yaml';
const state=fs.readFileSync(statePath,'utf8');

const criticalKeys=[
  'verified_main_sha','current_branch','current_milestone','implementation_complete',
  'repository_implementation_percent','static_integrity_run','static_integrity_passed_sha',
  'html_pages','latest_pr','latest_static_integrity_run','latest_verified_main_run',
  'latest_verified_main_status','latest_verified_main_sha'
];

const occurrences=key=>(state.match(new RegExp('^'+key+':','gm'))||[]).length;
const value=key=>{
  const m=state.match(new RegExp('^'+key+':\\s*(.+)$','m'));
  assert.ok(m,'missing state key: '+key);
  return m[1].trim().replace(/^['"]|['"]$/g,'');
};

for(const key of criticalKeys){
  assert.equal(occurrences(key),1,'state key must appear exactly once: '+key);
}

let htmlCount=0;
function walk(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(entry.name==='.git'||entry.name==='node_modules') continue;
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(full);
    else if(entry.isFile()&&entry.name.endsWith('.html')) htmlCount++;
  }
}
walk('.');

assert.equal(Number(value('html_pages')),htmlCount,'html_pages must match repository HTML count');
assert.equal(value('current_branch'),'main','resume index must describe merged main, not a temporary work branch');
assert.equal(value('repository_implementation_percent'),'100','repository implementation percentage must remain explicit');
assert.equal(value('verified_main_sha'),value('latest_verified_main_sha'),'verified main SHA anchors disagree');
assert.equal(value('static_integrity_passed_sha'),value('latest_verified_main_sha'),'static integrity SHA and verified main SHA disagree');
assert.equal(value('static_integrity_run'),value('latest_static_integrity_run'),'static integrity run anchors disagree');
assert.equal(value('latest_static_integrity_run'),value('latest_verified_main_run'),'latest run anchors disagree');
assert.equal(value('latest_verified_main_status'),'passed','latest verified main must be recorded as passed');

console.log('Repository state consistency passed: '+htmlCount+' HTML pages, unique resume anchors, aligned main SHA/run.');
