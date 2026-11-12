/* Other Products · RubyScore: a device frame plays the site — the landing scrolls down and back, then Profile, Dashboard
   and Leaderboard open from the top menu (each page scrolls a little under its pinned header), Home brings the landing back. */
(function(){
  const root=document.querySelector('[data-rubyscore]');if(!root)return;
  const scr=root.querySelector('.dm-scr'),vp=root.querySelector('.rs-vp');
  const pg={};root.querySelectorAll('.rs-pg').forEach(p=>pg[p.dataset.p]=p);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  let visible=false,cur='land';
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>vp.style.setProperty('--k',(scr.clientWidth/1512).toFixed(4));
  const MENU={land:841,dash:934,lead:1046,prof:1145}; // menu item centres in the 1512 frame, y 34
  async function tap(x,y){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x/1512*100)+'%';t.style.top=(y/982*100)+'%';scr.appendChild(t);await wait(520);t.remove();}
  let pos={};
  async function scroll(k,to,ms){await gate();const img=pg[k].querySelector('.rs-img'),from=pos[k]||0;
    await img.animate([{transform:`translateY(${-from}px)`},{transform:`translateY(${-to}px)`}],{duration:ms,easing:EASE,fill:'forwards'}).finished;pos[k]=to;}
  async function go(k){await tap(MENU[k],34);const a=pg[cur],b=pg[k];
    b.querySelector('.rs-img').getAnimations().forEach(x=>x.cancel());pos[k]=0;
    b.style.zIndex=2;a.style.zIndex=1;b.classList.add('on');
    await b.animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease'}).finished;
    a.classList.remove('on');a.style.zIndex='';b.style.zIndex='';a.querySelector('.rs-img').getAnimations().forEach(x=>x.cancel());pos[cur]=0;cur=k;}
  async function loop(){
    for(;;){
      await gate();await wait(1500);
      await scroll('land',2800,3600);await wait(600);await scroll('land',0,1800);await wait(400);
      await go('prof');await wait(1000);await scroll('prof',900,1800);await wait(600);
      await go('dash');await wait(800);await scroll('dash',1100,2000);await wait(600);
      await go('lead');await wait(600);await scroll('lead',700,1500);await wait(800);
      await go('land');
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
