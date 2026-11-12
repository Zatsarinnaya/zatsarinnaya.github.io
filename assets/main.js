(function(){const t=['Fintech','Product Design','UX Research','Design Systems','White-label','Banking Onboarding','KYC','Competitive Research','Money Transfers','Dashboards','Back-office Tools','Anti-Fraud System','Internal Tools','Usability Testing','Contextual Guidance','Emerging Markets','Desktop & Mobile'];document.querySelectorAll('.ticker .run').forEach(r=>{const d=r.parentElement.dataset.items;const h=(d?d.split('|'):t).map(x=>'<span>'+x.replace('&','&amp;')+'</span>').join('');r.innerHTML=h+h;});})();

(function(){const lb=document.getElementById('lb'),im=document.getElementById('lbimg');let last;
function close(){lb.hidden=true;document.body.style.overflow='';last&&last.focus();}
document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{last=b;im.style.width=b.dataset.w?`min(${b.dataset.w}px,100%)`:'';im.style.visibility='hidden';im.onload=()=>{im.style.visibility='';};im.src=b.dataset.src;if(im.complete&&im.naturalWidth)im.style.visibility='';im.alt=b.querySelector('img').alt;lb.hidden=false;lb.scrollTo(0,0);document.body.style.overflow='hidden';document.getElementById('lbx').focus();}));
document.getElementById('lbx').addEventListener('click',close);
lb.addEventListener('click',e=>{if(e.target===lb)close();});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close();});})();

// Framnex white-label sandbox: live theme switching on the coded home screen
(function(){const f=document.querySelector(".wl");if(!f)return;
const fx=f.querySelector(".fx"),fit=f.querySelector(".fx-fit");
const brands=[...f.querySelectorAll("[data-b]")],modes=[...f.querySelectorAll("[data-m]")];
// scale the 1440x864 screen to the stage width
new ResizeObserver(()=>fx.style.setProperty("--k",fit.clientWidth/1440)).observe(fit);
let brand="blue",mode="light";
function apply(){fx.dataset.theme=brand;fx.classList.toggle("dark",mode==="dark");
  brands.forEach(b=>{const on=b.dataset.b===brand;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});
  modes.forEach(b=>{const on=b.dataset.m===mode;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on)});}
// autoplay walks through the themes that exist in the project file
const seq=[["blue","light"],["green","light"],["violet","light"],["blue","dark"],["green","dark"]];let i=0,t,auto=!matchMedia("(prefers-reduced-motion: reduce)").matches;
function tick(){clearTimeout(t);if(auto)t=setTimeout(()=>{if(!document.hidden&&!f.closest("[hidden]")){i=(i+1)%seq.length;[brand,mode]=seq[i];apply();}tick();},2600);}
function stop(){auto=false;clearTimeout(t);}
brands.forEach(b=>b.addEventListener("click",()=>{stop();brand=b.dataset.b;apply();}));
modes.forEach(b=>b.addEventListener("click",()=>{stop();mode=b.dataset.m;apply();}));
f.querySelector(".wl-stage").addEventListener("mouseenter",()=>clearTimeout(t));
f.querySelector(".wl-stage").addEventListener("mouseleave",tick);
apply();tick();})();

// screen strips: arrows scroll by ~one screen, mouse drag scrolls; a drag never opens the lightbox
document.querySelectorAll(".strip").forEach(s=>{const row=s.querySelector(".strip-row"),[prev,next]=s.querySelectorAll(".fbtn");
const upd=()=>{prev.disabled=row.scrollLeft<4;next.disabled=row.scrollLeft+row.clientWidth>row.scrollWidth-4;};
const step=()=>{const i=row.querySelector(".strip-i");return i?i.offsetWidth+parseFloat(getComputedStyle(row).columnGap||0):row.clientWidth*.8;};
prev.addEventListener("click",()=>row.scrollBy({left:-step(),behavior:"smooth"}));next.addEventListener("click",()=>row.scrollBy({left:step(),behavior:"smooth"}));
row.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);upd();
let x0=0,l0=0,down=false,moved=false;
row.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button)return;down=true;moved=false;x0=e.clientX;l0=row.scrollLeft;});
addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-x0;if(!moved&&Math.abs(dx)>5){moved=true;row.classList.add("drag");}if(moved)row.scrollLeft=l0-dx;});
addEventListener("pointerup",()=>{if(!down)return;down=false;row.classList.remove("drag");});
row.addEventListener("click",e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false;}},true);});

// tabs: each tablist switches its own panels (the block title/subtitle above stays the same)
// on phones the segmented control scrolls sideways: keep the active tab in view (never scrolls the page)
function segShow(b){const sc=b.parentElement;if(sc.scrollWidth<=sc.clientWidth)return;const r=b.getBoundingClientRect(),p=sc.getBoundingClientRect();sc.scrollBy({left:r.left-p.left-(p.width-r.width)/2,behavior:'smooth'});}
document.querySelectorAll('.tabs[role=tablist]').forEach(list=>{const tabs=[...list.querySelectorAll('[role=tab]')];
// no flash: the new panel is shown only when its pictures are loaded and decoded (max 0.8 s wait)
const pan=b=>document.getElementById(b.getAttribute('aria-controls'));
const own=p=>[...p.querySelectorAll('img')].filter(i=>i.closest('[hidden]')===p||!i.closest('[hidden]'));
const warm=p=>own(p).forEach(i=>{if(i.loading==='lazy')i.loading='eager';});
let tok=0;
async function sel(t){const my=++tok;
  tabs.forEach(b=>{const on=b===t;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;});segShow(t);
  const np=pan(t);
  if(np.hidden){warm(np);const ims=own(np).slice(0,12);
    await Promise.race([Promise.all(ims.map(i=>i.decode?i.decode().catch(()=>{}):0)),new Promise(r=>setTimeout(r,800))]);
    if(my!==tok)return;}
  tabs.forEach(b=>{pan(b).hidden=b!==t;});dispatchEvent(new Event('resize'));}
tabs.forEach(b=>{const w=()=>warm(pan(b));b.addEventListener('pointerenter',w,{once:true});b.addEventListener('focus',w,{once:true});});
tabs.forEach((t,i)=>{t.tabIndex=i?-1:0;t.addEventListener('click',()=>sel(t));t.addEventListener('keydown',e=>{const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){const n=tabs[(i+d+tabs.length)%tabs.length];n.focus();sel(n);}});});});

// falling, draggable hero tags (Matter.js physics)
(function(){
  const box=document.querySelector('.chips');
  if(!box||!window.Matter) return;
  const {Engine,Runner,Bodies,Composite,Mouse,MouseConstraint,Body,Events,Query}=Matter;
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=matchMedia('(pointer: coarse)').matches;
  let engine,runner,items=[],lastW=0;
  function sync(){
    for(const it of items){
      const p=it.b.position;
      it.el.style.transform=`translate(${p.x-it.w/2}px,${p.y-it.h/2}px) rotate(${it.b.angle}rad)`;
    }
  }
  function build(){
    const W=box.clientWidth,H=box.clientHeight;
    if(!W) return;
    lastW=W;
    if(runner){Runner.stop(runner);Engine.clear(engine);}
    box.classList.add('phys');
    engine=Engine.create();
    engine.gravity.y=1.1;
    const t=200;
    Composite.add(engine.world,[
      Bodies.rectangle(W/2,H+t/2,W*3,t,{isStatic:true}),
      Bodies.rectangle(-t/2,0,t,H*6,{isStatic:true}),
      Bodies.rectangle(W+t/2,0,t,H*6,{isStatic:true})
    ]);
    const els=[...box.querySelectorAll('.chip')];
    items=els.map((el,i)=>{
      el.style.transform='none';
      const w=el.offsetWidth,h=el.offsetHeight;
      const x=w/2+Math.random()*Math.max(1,W-w);
      const y=-h-i*h*1.4-Math.random()*40;
      const b=Bodies.rectangle(x,y,w,h,{chamfer:{radius:h/2-1},restitution:.35,friction:.4,density:.002,angle:(Math.random()-.5)*.9});
      Body.setAngularVelocity(b,(Math.random()-.5)*.08);
      return {el,b,w,h};
    });
    Composite.add(engine.world,items.map(i=>i.b));
    if(still){for(let k=0;k<400;k++)Engine.update(engine,1000/60);sync();return;}
    if(!coarse){
      const mouse=Mouse.create(box);
      ['mousewheel','DOMMouseScroll','wheel'].forEach(ev=>mouse.element.removeEventListener(ev,mouse.mousewheel));
      ['touchstart','touchmove','touchend'].forEach(ev=>{
        mouse.element.removeEventListener(ev,mouse.mousedown);mouse.element.removeEventListener(ev,mouse.mousemove);mouse.element.removeEventListener(ev,mouse.mouseup);
      });
      const mc=MouseConstraint.create(engine,{mouse,constraint:{stiffness:.2,render:{visible:false}}});
      Events.on(mc,'startdrag',()=>box.classList.add('drag'));
      Events.on(mc,'enddrag',()=>box.classList.remove('drag'));
      Composite.add(engine.world,mc);
    }
    Events.on(engine,'afterUpdate',sync);
    runner=Runner.create();
    Runner.run(runner,engine);
    sync();
  }
  // on touch screens a tap tosses the tag up instead of dragging (keeps page scrolling)
  box.addEventListener('pointerdown',e=>{
    if(!coarse||!engine) return;
    const r=box.getBoundingClientRect();
    const hit=Query.point(items.map(i=>i.b),{x:e.clientX-r.left,y:e.clientY-r.top})[0];
    if(hit){Body.setVelocity(hit,{x:(Math.random()-.5)*8,y:-14});Body.setAngularVelocity(hit,(Math.random()-.5)*.3);}
  });
  let to;
  addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(()=>{if(box.clientWidth&&box.clientWidth!==lastW)build();},200);});
  window.__chipsBuild=build;
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(build);
})();

// hash routing between home and the case pages
const home=document.getElementById('home'), pages=[...document.querySelectorAll('main.case-page')];
function route(){
  const h=location.hash.slice(1);
  const el0=h&&document.getElementById(h);
  const page=el0&&(el0.matches('main.case-page')?el0:el0.closest('main.case-page'));
  const proj=!!page&&page!==el0;
  const isCase=!!page;
  pages.forEach(m=>m.hidden=m!==page); home.hidden=isCase;
  if(!isCase&&window.__chipsBuild&&!document.querySelector('.chips.phys')) window.__chipsBuild();
  if(proj){const el=document.getElementById(h); requestAnimationFrame(()=>el.scrollIntoView());}
  else if(isCase) window.scrollTo(0,0);
  else if(h){const el=document.getElementById(h); el&&el.scrollIntoView();}
  else window.scrollTo(0,0);
  drawAll();
}
document.querySelectorAll('[data-home]').forEach(a=>a.addEventListener('click',e=>{
  if(!home.hidden) return; e.preventDefault(); location.hash=''; setTimeout(()=>{document.querySelector(a.getAttribute('href'))?.scrollIntoView()},30);
}));
document.querySelectorAll('[data-todo]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));

// topographic texture like the Figma hero
function noise(x,y,s){return Math.sin(x*.9+s)*Math.cos(y*1.1-s)+Math.sin((x+y)*.55+s*2)*.6+Math.cos(x*1.7-y*.4)*.3}
function draw(c){
  const r=c.getBoundingClientRect(); if(!r.width) return;
  const d=Math.min(2,devicePixelRatio||1); c.width=r.width*d; c.height=r.height*d;
  const g=c.getContext('2d'); g.scale(d,d); g.strokeStyle='rgba(120,30,8,.55)'; g.lineWidth=3;
  const step=6, W=r.width, H=r.height, sc=.012;
  for(let lv=-1.6;lv<=1.6;lv+=.2){
    g.beginPath();
    for(let x=0;x<W;x+=step)for(let y=0;y<H;y+=step){
      const a=noise(x*sc,y*sc,1.3)-lv,b=noise((x+step)*sc,y*sc,1.3)-lv,cc=noise(x*sc,(y+step)*sc,1.3)-lv;
      if(a*b<0){const t=a/(a-b);g.moveTo(x+t*step,y);g.lineTo(x+t*step,y+1.5)}
      if(a*cc<0){const t=a/(a-cc);g.moveTo(x,y+t*step);g.lineTo(x+1.5,y+t*step)}
    }
    g.stroke();
  }
}
function drawAll(){document.querySelectorAll('canvas.topo').forEach(draw)}
addEventListener('hashchange',route); addEventListener('resize',drawAll);
route();
/* home · expanding cards: hover or keyboard focus opens a card, the last opened one stays open */
(()=>{const cards=[...document.querySelectorAll('.xc')];if(!cards.length)return;
  const open=c=>cards.forEach(x=>x.classList.toggle('on',x===c));
  cards.forEach(c=>{c.addEventListener('mouseenter',()=>open(c));c.addEventListener('focus',()=>open(c));});})();

// menu 00: dropdown with the four case pages (hover on desktop, click/tap everywhere)
(()=>{const dd=document.querySelector('.dd');if(!dd)return;const b=dd.querySelector('.dd-b');
  const set=o=>{dd.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
  b.addEventListener('click',e=>{e.stopPropagation();set(!dd.classList.contains('open'))});
  if(matchMedia('(hover:hover)').matches){let t;dd.addEventListener('mouseenter',()=>{clearTimeout(t);set(true)});dd.addEventListener('mouseleave',()=>{t=setTimeout(()=>set(false),180)});}
  dd.querySelectorAll('.dd-m a').forEach(a=>a.addEventListener('click',()=>set(false)));
  document.addEventListener('click',e=>{if(!dd.contains(e.target))set(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){set(false);b.focus()}});
})();

// Mobile card cover: endless ring of app icons (3 copies, we run on the middle one); on hover the row slides left one icon at a time and the icon that reaches the phone switches its screen
(()=>{const box=document.querySelector('.bv-apps');if(!box)return;const card=box.closest('.bc'),row=box.querySelector('.ap-row'),ph=box.querySelector('.ap-phone'),scr=[...box.querySelectorAll('.ap-scr img')];
  const n=scr.length;let i=n,timer=null,busy=false;
  const geo=()=>{const ic=row.querySelector('img');const step=ic.offsetWidth+parseFloat(getComputedStyle(row).columnGap||0);const b=box.getBoundingClientRect(),p=ph.getBoundingClientRect();return {step,slot:p.left-b.left+p.width/2,w:ic.offsetWidth}};
  const place=(k,anim)=>{const g=geo();row.classList.toggle('ap-anim',!!anim);row.style.setProperty('--ap-x',(g.slot-g.w/2-k*g.step)+'px')};
  const show=k=>{const im=scr[k%n];const swap=()=>scr.forEach(s=>s.classList.toggle('on',s===im));(im.decode?im.decode().catch(()=>{}):Promise.resolve()).then(swap)};
  const done=()=>{if(!busy)return;show(i);if(i>=2*n){i=n;place(i,false)}busy=false};
  row.addEventListener('transitionend',e=>{if(e.target===row&&e.propertyName==='transform')done()});
  const tick=()=>{if(busy)return;busy=true;i++;place(i,true);setTimeout(done,1600)};
  place(i,false);new ResizeObserver(()=>place(i,false)).observe(box);
  const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  card.addEventListener('mouseenter',()=>{if(timer||still)return;tick();timer=setInterval(tick,2200)});
  card.addEventListener('mouseleave',()=>{clearInterval(timer);timer=null});
})();

// Mobile cover v2: one app card to the left of the phone; the phone shows that app's Home.
// The card lies in the same plane as the phone screen (same perspective as the Figma mockup): its corners are projected through the screen homography.
// One step: the card leaves to the back and fades, the next app's card slides out from behind the phone to the left, and its Home appears on the screen.
(()=>{const box=document.querySelector('.bv-orbit');if(!box)return;const card=box.closest('.bc'),ics=[...box.querySelectorAll('.ob-ic')],scr=[...box.querySelectorAll('.ap-scr img')],n=ics.length;
  let cur=0,timer=null,busy=false;
  const target=k=>{const d=((k-cur)%n+n)%n;return d===0?-60:d===n-1?-180:0};
  const A=ics.map((_,k)=>target(k));
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  // homography rect(w,h) -> quad
  const proj=(w,h,q)=>{const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=q;const dx1=x1-x2,dx2=x3-x2,dy1=y1-y2,dy2=y3-y2,sx=x0-x1+x2-x3,sy=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
    const g=(sx*dy2-dx2*sy)/den,hh=(dx1*sy-sx*dy1)/den;return {A:(x1-x0+g*x1)/w,B:(x3-x0+hh*x3)/h,C:x0,D:(y1-y0+g*y1)/w,E:(y3-y0+hh*y3)/h,F:y0,G:g/w,H:hh/h}};
  const apply=(m,u,v)=>{const z=m.G*u+m.H*v+1;return [(m.A*u+m.B*v+m.C)/z,(m.D*u+m.E*v+m.F)/z]};
  const m3d=m=>`matrix3d(${m.A},${m.D},0,${m.G},${m.B},${m.E},0,${m.H},0,0,1,0,${m.C},${m.F},0,1)`;
  // card plane = screen plane of the owner's mirrored mockup (Figma 107:130091, vector 107:130099)
  const SCR=proj(750,1624,[[515.5,298.5],[1211.5,278.5],[1740,1856],[1021.5,1972]]);
  let qb=null,qbW=0;
  const base=(s,hh)=>{const vh=750*hh/s,v0=500;const q=[[0,v0],[750,v0],[750,v0+vh],[0,v0+vh]].map(([u,v])=>apply(SCR,u,v));
    const top=Math.hypot(q[1][0]-q[0][0],q[1][1]-q[0][1]),f=s/top;const cx=(q[0][0]+q[1][0]+q[2][0]+q[3][0])/4,cy=(q[0][1]+q[1][1]+q[2][1]+q[3][1])/4;
    qb=q.map(([x,y])=>[(x-cx)*f,(y-cy)*f]);const xs=qb.map(p=>p[0]);qbW=Math.max(...xs)-Math.min(...xs)};
  const draw=()=>{const W=box.clientWidth,H=box.clientHeight,cy=H/2,ph=box.querySelector('.ph3'),pw=ph.offsetWidth,rx=pw*.5,ry=H*.15,s=ics[0].offsetWidth,hh=ics[0].offsetHeight;
    base(s,hh);
    const exL=pw*.14,scL=(.82+.18*1.5/2)*1.25,gl=W/2-rx*.866-exL*.866/.866-qbW*scL/2,gr=W/2+pw/2,ox=W/2-(gl+gr)/2,cx=W/2+ox;
    ph.style.setProperty('--ox',ox+'px');
    ics.forEach((im,k)=>{const t=A[k]*Math.PI/180,c=Math.cos(t),sn=Math.sin(t);
      const px=cx+rx*sn+Math.min(0,sn)/.866*exL,py=cy+ry*c+sn*H*.13,sc=(.82+.18*(c+1)/2)*1.25;
      const op=Math.max(0,Math.min(1,-sn/.6))*Math.max(0,Math.min(1,(c+.6)/.4));
      const q=qb.map(([x,y])=>[px+x*sc,py+y*sc]);
      im.style.transform=m3d(proj(s,hh,q));im.style.opacity=op;im.style.zIndex=1;})};
  const show=k=>{const im=scr[k];(im.decode?im.decode().catch(()=>{}):Promise.resolve()).then(()=>scr.forEach(s=>s.classList.toggle('on',s===im)))};
  const step=()=>{if(busy)return;busy=true;const from=A.slice();cur=(cur+1)%n;const to=ics.map((_,k)=>target(k));from.forEach((v,k)=>{if(v<-170&&to[k]===0)from[k]=0});
    const t0=performance.now(),D=1100;let swapped=false;
    const f=now=>{const p=Math.min(1,(now-t0)/D),e=ease(p);ics.forEach((_,k)=>A[k]=from[k]+(to[k]-from[k])*e);draw();
      if(!swapped&&p>.5){swapped=true;show(cur)}
      if(p<1)requestAnimationFrame(f);else{busy=false}};requestAnimationFrame(f)};
  draw();new ResizeObserver(draw).observe(box);
  const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  card.addEventListener('mouseenter',()=>{if(timer||still)return;step();timer=setInterval(step,2400)});
  card.addEventListener('mouseleave',()=>{clearInterval(timer);timer=null});
})();

// phone mockup (Figma 103:130080): map the app screen onto the angled screen of the render (homography -> matrix3d)
(()=>{const ph=document.querySelector('.bv-orbit .ph3');if(!ph)return;const s=ph.querySelector('.ph3-s');
  const Q=[[240.5,16.0],[551.3,25.7],[325.6,772.8],[4.5,720.8]],IH=800,w=750,h=1624;
  const fit=()=>{const k=ph.clientHeight/IH;const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=Q.map(([x,y])=>[x*k,y*k]);
    const dx1=x1-x2,dx2=x3-x2,dy1=y1-y2,dy2=y3-y2,sx=x0-x1+x2-x3,sy=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
    const g=(sx*dy2-dx2*sy)/den,hh=(dx1*sy-sx*dy1)/den;
    const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
    const A=a/w,B=b/h,D=d/w,E=e/h,G=g/w,H=hh/h;
    s.style.transform=`matrix3d(${A},${D},0,${G},${B},${E},0,${H},0,0,1,0,${c},${f},0,1)`;};
  fit();new ResizeObserver(fit).observe(ph);})();
