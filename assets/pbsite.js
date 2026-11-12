/* Cloud · first Petabox website: the landing scrolls to the very bottom and back, «Start a free 30 day Trial»,
   then the onboarding is clicked through (Continue ×3, Verify) to «Confirm your e-mail», and round again. */
(function(){
  const root=document.querySelector('[data-pbsite]');if(!root)return;
  const scr=root.querySelector('.dm-scr'),dev=root.querySelector('.dm-dev'),vp=root.querySelector('.pbd-vp'),land=root.querySelector('.pbs-land');
  const P={};root.querySelectorAll('.pbd-p').forEach(i=>P[i.dataset.p]=i);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  let visible=false,cur='land',k=.6;
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>{const dw=root.clientWidth-20-(innerWidth>=900?100:0); /* 100 px narrower on desktop */dev.style.setProperty('--dw',dw+'px');k=dw/1440;vp.style.setProperty('--k',k.toFixed(4));};
  const A=(el,kf,ms,e=EASE)=>el.animate(kf,{duration:ms,easing:e,fill:'forwards'}).finished;
  async function tap(x,y){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x*k)+'px';t.style.top=(y*k)+'px';scr.appendChild(t);await wait(520);t.remove();}
  async function go(n,x,y){if(x!=null)await tap(x,y);const a=P[cur],b=P[n];b.style.zIndex=2;b.classList.add('on');
    await A(b,[{opacity:0},{opacity:1}],380,'ease');a.classList.remove('on');b.style.zIndex='';b.getAnimations().forEach(x=>x.cancel());cur=n;}
  async function loop(){
    for(;;){
      await gate();await wait(1800);
      await gate();await A(land,[{transform:'none'},{transform:'translateY(-7440px)'}],20000,'cubic-bezier(.35,0,.35,1)');await wait(900);   // to the very bottom
      await gate();await A(land,[{transform:'translateY(-7440px)'},{transform:'none'}],2400);await wait(500);
      await go('ob1',268,764);await wait(1400);                       // Start a free 30 day Trial
      await go('ob2',1110,782);await wait(1300);                      // Continue
      await go('ob3',1110,782);await wait(1300);
      await go('ob4',1110,782);await wait(1500);
      await go('ob5',1110,780);await wait(2400);                      // Verify → Confirm your e-mail
      land.getAnimations().forEach(a=>a.cancel());await go('land');
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
