const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const outDir = path.resolve('qa-artifacts/home');
fs.mkdirSync(outDir,{recursive:true});

const targets = [
  {name:'vsn-desktop', url:pathToFileURL(path.resolve('index.html')).href, width:1440, height:900, local:true},
  {name:'ritovex-desktop', url:'https://ritovex.webflow.io/', width:1440, height:900, local:false},
  {name:'vsn-mobile', url:pathToFileURL(path.resolve('index.html')).href, width:390, height:844, local:true},
  {name:'ritovex-mobile', url:'https://ritovex.webflow.io/', width:390, height:844, local:false}
];

async function settle(page){
  await page.waitForTimeout(1200);
  await page.evaluate(()=>{
    document.documentElement.style.scrollBehavior='auto';
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager');
  });
  const total = await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
  for(let y=0;y<total;y+=480){
    await page.evaluate(v=>window.scrollTo(0,v),y);
    await page.waitForTimeout(110);
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(700);
}

(async()=>{
  const browser=await chromium.launch({headless:true});
  const report={generatedAt:new Date().toISOString(),targets:[]};
  for(const t of targets){
    const context=await browser.newContext({viewport:{width:t.width,height:t.height},deviceScaleFactor:1});
    const page=await context.newPage();
    const consoleErrors=[];
    const pageErrors=[];
    page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
    page.on('pageerror',e=>pageErrors.push(String(e)));
    const response=await page.goto(t.url,{waitUntil:'domcontentloaded',timeout:60000});
    await settle(page);
    const metrics=await page.evaluate(()=>({
      title:document.title,
      viewport:{w:innerWidth,h:innerHeight},
      scroll:{w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight},
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,
      missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),
      sectionCount:document.querySelectorAll('main section').length,
      h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
      headerHeight:document.querySelector('header')?.getBoundingClientRect().height||0,
      firstSectionTop:document.querySelector('main section')?.getBoundingClientRect().top||0,
      hiddenVisibleArea:[...document.querySelectorAll('main section > .container, .editorial-card, .home-showcase-card, .home-process-grid article, .service-card')]
        .filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&Number(s.opacity)<0.1})
        .map(el=>({className:el.className,opacity:getComputedStyle(el).opacity,height:Math.round(el.getBoundingClientRect().height)}))
    }));
    await page.screenshot({path:path.join(outDir,t.name+'.png'),fullPage:true});
    report.targets.push({...t,status:response?.status?.()||null,metrics,consoleErrors,pageErrors});
    await context.close();
  }
  fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});