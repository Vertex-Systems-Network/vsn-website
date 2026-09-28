const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const outDir = path.resolve('qa-artifacts/pages');
fs.mkdirSync(outDir,{recursive:true});

const pages = [
  {key:'services', local:'services.html', reference:'https://ritovex.webflow.io/template-pages/services'},
  {key:'about', local:'about.html', reference:'https://ritovex.webflow.io/template-pages/about-us'},
  {key:'blog', local:'blog.html', reference:'https://ritovex.webflow.io/template-pages/blog'},
  {key:'projects', local:'projects.html', reference:'https://ritovex.webflow.io/template-pages/portfolio'},
  {key:'contact', local:'contact.html', reference:'https://ritovex.webflow.io/template-pages/contact-us'}
];
const viewports = [
  {name:'desktop',width:1440,height:900},
  {name:'mobile',width:390,height:844}
];

async function settle(page){
  await page.waitForTimeout(1200);
  await page.evaluate(()=>{
    document.documentElement.style.scrollBehavior='auto';
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager');
  });
  const total=await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
  for(let y=0;y<total;y+=480){
    await page.evaluate(v=>window.scrollTo(0,v),y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(650);
}

async function collectMetrics(page,local){
  const base=await page.evaluate(()=>({
    title:document.title,
    viewport:{w:innerWidth,h:innerHeight},
    scroll:{w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight},
    horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,
    overflowingElements:[...document.querySelectorAll('body *')].filter(el=>{
      const r=el.getBoundingClientRect();
      const style=getComputedStyle(el);
      if(style.position==='fixed')return false;
      return r.width>0&&r.height>0&&(r.right>innerWidth+1||r.left<-1);
    }).slice(0,30).map(el=>{
      const r=el.getBoundingClientRect();
      return {tag:el.tagName.toLowerCase(),className:typeof el.className==='string'?el.className:'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
    }),
    missingImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),
    sectionCount:document.querySelectorAll('main section').length,
    h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
    headerHeight:Math.round(document.querySelector('header')?.getBoundingClientRect().height||0),
    hero:(()=>{
      const el=document.querySelector('main > section:first-child, body > section.page-hero, .editorial-hero, .about-reference-hero, .services-reference-hero');
      if(!el)return null;
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {className:el.className,height:Math.round(r.height),paddingTop:s.paddingTop,paddingBottom:s.paddingBottom};
    })(),
    h1Geometry:(()=>{
      const el=document.querySelector('h1');
      if(!el)return null;
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {width:Math.round(r.width),height:Math.round(r.height),fontSize:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing};
    })(),
    sections:[...document.querySelectorAll('main section')].slice(0,14).map(el=>{
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {className:el.className,height:Math.round(r.height),paddingTop:s.paddingTop,paddingBottom:s.paddingBottom,background:s.backgroundColor};
    }),
    keyBlockVisibility:{
      blogFeature:(()=>{const el=document.querySelector('.blog-featured-article');return el?{display:getComputedStyle(el).display,width:Math.round(el.getBoundingClientRect().width),height:Math.round(el.getBoundingClientRect().height)}:null})(),
      contactTwoCol:(()=>{const el=document.querySelector('.contact-page .contact-main .two-col');return el?{gridTemplateColumns:getComputedStyle(el).gridTemplateColumns,width:Math.round(el.getBoundingClientRect().width)}:null})()
    },
    hiddenVisibleArea:[...document.querySelectorAll('main section > .container, .editorial-card, .editorial-feature, .project-proof-card, .about-principle-grid article, .services-benefit-grid article, .contact-route-grid > a, .contact-step-grid article')]
      .filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&Number(s.opacity)<0.1})
      .map(el=>({className:el.className,opacity:getComputedStyle(el).opacity,height:Math.round(el.getBoundingClientRect().height)})),
    suspiciousHumanImages:[...document.images].filter(img=>/vsn-human-/i.test(img.getAttribute('src')||'')).map(img=>{
      try{
        const canvas=document.createElement('canvas');canvas.width=20;canvas.height=20;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,20,20);
        const data=ctx.getImageData(0,0,20,20).data;let sum=0,sum2=0,dark=0,n=0;
        for(let i=0;i<data.length;i+=4){const y=.2126*data[i]+.7152*data[i+1]+.0722*data[i+2];sum+=y;sum2+=y*y;if(y<8)dark++;n++}
        const mean=sum/n,variance=sum2/n-mean*mean;
        return {src:img.getAttribute('src'),mean:+mean.toFixed(1),variance:+variance.toFixed(1),darkRatio:+(dark/n).toFixed(3)};
      }catch(e){return {src:img.getAttribute('src'),decodeError:String(e)}}
    }).filter(x=>x.decodeError||x.variance<35||x.darkRatio>.985)
  }));
  if(!local)return base;
  const nav=await page.evaluate(async()=>{
    const button=document.querySelector('.mobile-toggle');
    const nav=document.querySelector('.nav-links');
    if(!button||!nav||innerWidth>980)return {tested:false};
    button.click();
    await new Promise(r=>setTimeout(r,120));
    const open={expanded:button.getAttribute('aria-expanded'),open:nav.classList.contains('open'),rootLocked:document.documentElement.classList.contains('nav-open')};
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    await new Promise(r=>setTimeout(r,80));
    return {tested:true,open,closed:{expanded:button.getAttribute('aria-expanded'),open:nav.classList.contains('open'),rootLocked:document.documentElement.classList.contains('nav-open')}};
  });
  return {...base,mobileNav:nav};
}

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--allow-file-access-from-files']});
  const report={generatedAt:new Date().toISOString(),pages:{}};
  for(const p of pages){
    const pageOut=path.join(outDir,p.key);
    fs.mkdirSync(pageOut,{recursive:true});
    report.pages[p.key]=[];
    for(const vp of viewports){
      const targets=[
        {name:'vsn-'+vp.name,url:pathToFileURL(path.resolve(p.local)).href,local:true},
        {name:'ritovex-'+vp.name,url:p.reference,local:false}
      ];
      for(const t of targets){
        const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
        const page=await context.newPage();
        const consoleErrors=[];const pageErrors=[];
        page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
        page.on('pageerror',e=>pageErrors.push(String(e)));
        let response=null;let navigationError=null;
        try{response=await page.goto(t.url,{waitUntil:'domcontentloaded',timeout:60000})}catch(e){navigationError=String(e)}
        if(!navigationError)await settle(page);
        const metrics=navigationError?null:await collectMetrics(page,t.local);
        if(!navigationError)await page.screenshot({path:path.join(pageOut,t.name+'.png'),fullPage:true});
        report.pages[p.key].push({
          target:t.name,url:t.url,width:vp.width,height:vp.height,local:t.local,
          status:response?.status?.()||null,navigationError,metrics,consoleErrors,pageErrors
        });
        await context.close();
      }
    }
  }
  fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
