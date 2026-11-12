/* Other Products · PepsiCo AOP Kick-off Meeting 2021: a device frame plays the event site.
   Clean home screen → tap «Кімнати», the dropdown opens → scroll to the speakers, they page through 1 → 5
   → calm stops at Трансляція, Галерея, Банк ідей, the rooms schedule, room 1 and room 2 «СОКИ: Що? Де? Коли?» → back to the top. Everything is cut from the Figma exports. */
(function(){
  const root=document.querySelector('[data-pepsico]');if(!root)return;
  const $=s=>root.querySelector(s),scr=$('.dm-scr'),vp=$('.pp-vp'),page=$('.pp-page'),strip=$('.pp-strip'),drop=$('.pp-drop'),dots=[...root.querySelectorAll('.pp-dot')];
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  let visible=false,y=0,pgN=0;
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>vp.style.setProperty('--k',(scr.clientWidth/1440).toFixed(4));
  const A=(el,kf,ms,e=EASE)=>el.animate(kf,{duration:ms,easing:e,fill:'forwards'}).finished;
  async function tap(x,yy){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x/1440*100)+'%';t.style.top=(yy/900*100)+'%';scr.appendChild(t);await wait(520);t.remove();}
  async function scroll(to,ms){await gate();await A(page,[{transform:`translateY(${-y}px)`},{transform:`translateY(${-to}px)`}],ms);y=to;}
  async function next(){await gate();const n=pgN+1;
    A(dots[pgN],[{opacity:1},{opacity:0}],500,'ease');A(dots[n],[{opacity:0},{opacity:1}],500,'ease');
    await A(strip,[{transform:`translateX(${-pgN*1400}px)`},{transform:`translateX(${-n*1400}px)`}],800);pgN=n;}
  function reset(){[page,strip,drop,...dots].forEach(el=>el.getAnimations().forEach(a=>a.cancel()));y=0;pgN=0;}
  async function loop(){
    for(;;){
      await gate();await wait(1500);
      await tap(1340,35);await A(drop,[{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],320,'ease');await wait(1800);   // Кімнати
      A(drop,[{opacity:1},{opacity:0}],250,'ease');await scroll(910,1500);await wait(1500);await scroll(1638,1300);await wait(700); // «Про конференцію» + schedule, then the speakers                                                 // to the speakers
      for(let i=0;i<4;i++){await next();await wait(900);}
      // calmly through the next blocks: Трансляція, Галерея, Банк ідей, Кімнати (schedule), then room 1 and room 2 «СОКИ»
      for(const [to,ms,hold] of [[2368,1500,1300],[3264,1400,1300],[3930,1200,1200],[4368,1200,1400],[5274,1500,1600],[6306,1500,2600]]){await scroll(to,ms);await wait(hold);}
      await A(vp,[{opacity:1},{opacity:0}],350,'ease');reset();await A(vp,[{opacity:0},{opacity:1}],450,'ease');vp.getAnimations().forEach(a=>a.cancel());
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
