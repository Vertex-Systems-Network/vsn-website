const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const outDir=path.resolve('qa-artifacts/secondary-pages');
fs.mkdirSync(outDir,{recursive:true});

const pages=[
  'software.html',
  'mobile-app-development.html',
  'ecommerce.html',
  'ai-automation.html',
  'bpo.html',
  'resource-augmentation.html',
  'profile.html',
  'social-media.html',
  'websites.html',
  'business-solutions.html',
  'tax-consulting.html',
  'products.html',
  'industries.html',
  'work.html',
  'process.html',
  'trust.html',
  'payments.html',
  'legal/terms.html',
  'legal/privacy.html',
  'legal/refunds.html',
  'legal/cookies.html'
];
const viewports=[
  {name:'desktop',width:1440,height:900},
  {name:'mobile',width:390,height:844}
];

function contentType(file){
  const ext=path.extname(file).toLowerCase();
  return ({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'}[ext]||'application/octet-stream');
}

function startServer(){
  const root=path.resolve('.');
  const server=http.createServer((req,res)=>{
    try{
      const raw=decodeURIComponent((req.url||'/').split('?')[0]);
      const rel=raw==='/'?'index.html':raw.replace(/^\/+/, '');
      const file=path.resolve(root,rel);
      if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end('Forbidden');return}
      if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return}
      res.writeHead(200,{'Content-Type':contentType(file),'Cache-Control':'no-store'});
      fs.createReadStream(file).pipe(res);
    }catch(e){res.writeHead(500);res.end(String(e))}
  });
  return new Promise((resolve,reject)=>{
    server.once('error',reject);
    server.listen(4174,'127.0.0.1',()=>resolve(server));
  });
}

async function settle(page){
  await page.waitForTimeout(550);
  await page.evaluate(()=>{
    document.documentElement.style.scrollBehavior='auto';
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager');
  });
  const total=await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
  for(let y=0;y<total;y+=650){
    await page.evaluate(v=>window.scrollTo(0,v),y);
    await page.waitForTimeout(55);
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(280);
}

async function metrics(page){
  return page.evaluate(async()=>({
    title:document.title,
    h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
    scrollWidth:document.documentElement.scrollWidth,
    viewportWidth:innerWidth,
    horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,
    overflowingElements:[...document.querySelectorAll('body *')].filter(el=>{
      const r=el.getBoundingClientRect();
      const s=getComputedStyle(el);
      if(s.position==='fixed'||s.visibility==='hidden'||s.display==='none')return false;
      return r.width>0&&r.height>0&&(r.right>innerWidth+1||r.left<-1);
    }).slice(0,20).map(el=>{
      const r=el.getBoundingClientRect();
      return {tag:el.tagName.toLowerCase(),className:typeof el.className==='string'?el.className:'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
    }),
    missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),
    suspiciousHumanImages:[...document.images].filter(img=>/vsn-human-/i.test(img.getAttribute('src')||'')).map(img=>{
      try{
        const canvas=document.createElement('canvas');canvas.width=20;canvas.height=20;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,20,20);
        const d=ctx.getImageData(0,0,20,20).data;let sum=0,sum2=0,dark=0,n=0;
        for(let i=0;i<d.length;i+=4){const y=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];sum+=y;sum2+=y*y;if(y<8)dark++;n++}
        const mean=sum/n,variance=sum2/n-mean*mean;
        return {src:img.getAttribute('src'),mean:+mean.toFixed(1),variance:+variance.toFixed(1),darkRatio:+(dark/n).toFixed(3)};
      }catch(e){return {src:img.getAttribute('src'),decodeError:String(e)}}
    }).filter(x=>x.decodeError||x.variance<35||x.darkRatio>.985),
    hiddenContent:[...document.querySelectorAll('main section > .container, main .container, main article')].filter(el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return r.width>0&&r.height>0&&Number(s.opacity)<0.1;
    }).slice(0,20).map(el=>({tag:el.tagName.toLowerCase(),className:el.className,opacity:getComputedStyle(el).opacity})),
    mobileNav:(async()=>{
      const button=document.querySelector('.mobile-toggle');
      const nav=document.querySelector('.nav-links');
      if(!button||!nav||innerWidth>980)return {tested:false};
      button.click();
      await new Promise(r=>setTimeout(r,90));
      const open={expanded:button.getAttribute('aria-expanded'),open:nav.classList.contains('open'),rootLocked:document.documentElement.classList.contains('nav-open')};
      document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      await new Promise(r=>setTimeout(r,60));
      return {tested:true,open,closed:{expanded:button.getAttribute('aria-expanded'),open:nav.classList.contains('open'),rootLocked:document.documentElement.classList.contains('nav-open')}};
    })()
  }));
}

(async()=>{
  const server=await startServer();
  const browser=await chromium.launch({headless:true});
  const report={generatedAt:new Date().toISOString(),pages:{},failures:[]};
  try{
    for(const file of pages){
      const key=file.replace(/\.html$/,'').replace(/\//g,'__');
      const pageOut=path.join(outDir,key);fs.mkdirSync(pageOut,{recursive:true});
      report.pages[file]=[];
      for(const vp of viewports){
        const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
        const page=await context.newPage();
        const consoleErrors=[];const pageErrors=[];
        page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
        page.on('pageerror',e=>pageErrors.push(String(e)));
        let response=null,error=null;
        try{response=await page.goto('http://127.0.0.1:4174/'+file,{waitUntil:'domcontentloaded',timeout:30000})}catch(e){error=String(e)}
        if(!error)await settle(page);
        const m=error?null:await metrics(page);
        if(!error)await page.screenshot({path:path.join(pageOut,vp.name+'.png'),fullPage:true});
        const entry={viewport:vp.name,status:response?.status?.()||null,error,metrics:m,consoleErrors,pageErrors};
        report.pages[file].push(entry);
        const label=file+'/'+vp.name;
        if(error)report.failures.push(label+': navigation '+error);
        if(entry.status&&entry.status>=400)report.failures.push(label+': HTTP '+entry.status);
        if(pageErrors.length)report.failures.push(label+': page errors '+pageErrors.join(' | '));
        if(m?.horizontalOverflow)report.failures.push(label+': horizontal overflow');
        if(m?.missingImages?.length)report.failures.push(label+': missing images '+m.missingImages.join(', '));
        if(m?.suspiciousHumanImages?.length)report.failures.push(label+': suspicious human imagery');
        if(m?.hiddenContent?.length)report.failures.push(label+': hidden content after full scroll');
        if(!m?.h1?.length)report.failures.push(label+': missing H1');
        if(m?.mobileNav?.tested){
          const n=m.mobileNav;
          if(n.open.expanded!=='true'||!n.open.open||!n.open.rootLocked||n.closed.expanded!=='false'||n.closed.open||n.closed.rootLocked){
            report.failures.push(label+': mobile nav regression');
          }
        }
        await context.close();
      }
    }
  }finally{
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
  fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(report.failures.length){
    console.error('Secondary rendered QA failures:\n- '+report.failures.join('\n- '));
    process.exit(1);
  }
})().catch(e=>{console.error(e);process.exit(1)});