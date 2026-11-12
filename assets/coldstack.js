/* Cloud · ColdStack website: Main scrolls to the bottom (20 s) and back, then calmly through the menu —
   Solutions, Ecosystem, Company, Cross-Chain Bridge (each scrolls a little and back) — and the logo returns to Main. */
(function(){
  const root=document.querySelector('[data-coldstack]');if(!root)return;
  const scr=root.querySelector('.dm-scr'),dev=root.querySelector('.dm-dev'),vp=root.querySelector('.pbd-vp');
  const P={};root.querySelectorAll('.pbd-p').forEach(i=>P[i.dataset.p]=i);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)',SOFT='cubic-bezier(.35,0,.35,1)';
  let visible=false,cur='main',k=.6;
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>{const dw=root.clientWidth-20-(innerWidth>=900?100:0); /* 100 px narrower on desktop */dev.style.setProperty('--dw',dw+'px');k=dw/1440;vp.style.setProperty('--k',k.toFixed(4));};
  const A=(el,kf,ms,e=EASE)=>el.animate(kf,{duration:ms,easing:e,fill:'forwards'}).finished;
  const H=n=>+P[n].getAttribute('height');
  async function scroll(n,from,to,ms,e=EASE){await gate();await A(P[n],[{transform:`translateY(${-from}px)`},{transform:`translateY(${-to}px)`}],ms,e);}
  async function tap(x,y){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x*k)+'px';t.style.top=(y*k)+'px';scr.appendChild(t);await wait(520);t.remove();}
  async function go(n,x,y){if(x!=null)await tap(x,y);const a=P[cur],b=P[n];b.getAnimations().forEach(x=>x.cancel());b.style.zIndex=2;b.classList.add('on');
    await A(b,[{opacity:0},{opacity:1}],420,'ease');a.classList.remove('on');b.style.zIndex='';b.getAnimations().filter(x=>x.effect.getKeyframes().some(f=>'opacity' in f)).forEach(x=>x.cancel());a.getAnimations().forEach(x=>x.cancel());cur=n;}
  const MENU={sol:402,eco:540,about:681,bridge:855};
  async function loop(){
    for(;;){
      await gate();await wait(1800);
      const end=H('main')-900;await scroll('main',0,end,20000,SOFT);await wait(900);await scroll('main',end,0,2600);await wait(600);
      for(const n of ['sol','eco','about','bridge']){
        await go(n,MENU[n],81);await wait(1100);
        const d=Math.min(1100,H(n)-900);await scroll(n,0,d,3000);await wait(700);await scroll(n,d,0,1600);await wait(500);
      }
      await go('main',207,77);   // logo → Main
    }
  }
  (async()=>{
    await Promise.all([...root.querySelectorAll('img')].map(i=>i.decode?i.decode().catch(()=>{}):0));
    fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(root); /* pages start hidden: re-measure once the block gets a size */ root.classList.add('ready');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    new IntersectionObserver(es=>{visible=es[0].isIntersecting&&!document.hidden;},{threshold:.3}).observe(root);
    loop();
  })();
})();
