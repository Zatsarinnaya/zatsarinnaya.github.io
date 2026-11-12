/* Cloud · Petabox dashboard: on the dashboard the sidebar opens Buckets (actions menu, a bucket, Create folder → Create), Shared, Access keys, Settings, Billing. */
(function(){
  const root=document.querySelector('[data-petabox]');if(!root)return;
  const $=s=>root.querySelector(s),dev=$('.dm-dev'),scr=$('.dm-scr'),vp=$('.pbd-vp'),desk=$('.pbd-desk'),tab=$('.pbd-tab'),mobw=$('.pbd-mobw'),mob=$('.pbd-mob');
  const P={};root.querySelectorAll('.pbd-p').forEach(i=>P[i.dataset.p]=i);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  let visible=false,cur='dash',k=.6;
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>{const dw=root.clientWidth-20-(innerWidth>=900?100:0); /* 100 px narrower on desktop */dev.style.setProperty('--dw',dw+'px');k=dw/1440;vp.style.setProperty('--k',k.toFixed(4));}; // device = block width, screen fills it exactly
  const A=(el,kf,ms,e=EASE)=>el.animate(kf,{duration:ms,easing:e,fill:'forwards'}).finished;
  const op=(el,a,b,ms=400)=>A(el,[{opacity:a},{opacity:b}],ms,'ease');
  async function tap(x,y){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x*k)+'px';t.style.top=(y*k)+'px';scr.appendChild(t);await wait(520);t.remove();}
  async function go(n,x,y){if(x!=null)await tap(x,y);const a=P[cur],b=P[n];b.style.zIndex=2;b.classList.add('on');
    await A(b,[{opacity:0},{opacity:1}],380,'ease');a.classList.remove('on');b.style.zIndex='';b.getAnimations().forEach(x=>x.cancel());cur=n;}
  async function loop(){
    for(;;){
      await gate();await wait(2000);
      // sidebar tabs and a couple of bucket actions
      await go('bklist',110,276);await wait(1000);
      await go('bkmenu',1362,630);await wait(1200);
      await go('bk',400,270);await wait(1000);
      await go('folder',1144,148);await wait(1200);
      await go('bk',824,594);await wait(800);
      await go('shared',94,332);await wait(1300);
      await go('keys',110,388);await wait(1300);
      await go('settings',100,504);await wait(1300);
      await go('billing',94,560);await wait(2600);
      await go('dash'); // straight back to the dashboard, same cross-fade as the tabs — no dark gap
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
