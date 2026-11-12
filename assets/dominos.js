/* Other Products · Domino's Pizza Belarus: a device frame plays the new product card.
   Catalog (1440 × 900 screen, scaled) → scroll to the cards → + Mozzarella-mini twice → the card opens in Fast view → + twice → close
   → Pizza Tracker (order number → accepted → cooking → packing → on the way → courier map) → Dominos Money loyalty page
   → the frame narrows into the mobile version → + twice → back. All states are cut from the Figma exports. */
(function(){
  const root=document.querySelector('[data-dominos]');if(!root)return;
  const $=s=>root.querySelector(s),dev=$('.dm-dev'),scr=$('.dm-scr'),desk=$('.dm-desk'),page=$('.dm-page'),mob=$('.dm-mob');
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  const A=(el,kf,ms,ease=EASE)=>el.animate(kf,{duration:ms,easing:ease,fill:'forwards'}).finished;
  const on=(el,ms=220)=>A(el,[{opacity:getComputedStyle(el).opacity},{opacity:1}],ms,'ease');
  const off=(el,ms=220)=>A(el,[{opacity:getComputedStyle(el).opacity},{opacity:0}],ms,'ease');
  let visible=false;
  const gate=async()=>{while(!visible||document.hidden)await wait(300);};
  const fit=()=>{if(!dev.classList.contains('mob'))desk.style.setProperty('--k',(scr.clientWidth/1440).toFixed(4));};
  async function tap(box,x,y,W,H){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x/W*100)+'%';t.style.top=(y/H*100)+'%';box.appendChild(t);await wait(520);t.remove();}
  const tapD=(x,y)=>tap(scr,x,y,1440,900), tapM=(x,y)=>tap(mob,x,y,360,640);
  // full-page extra screens (tracker, loyalty)
  const S=n=>root.querySelector('.dm-s[data-s="'+n+'"]');let curS=null,sy=0;
  async function show(n){await gate();const b=S(n);b.style.transform='translateY('+(-sy)+'px)';b.style.zIndex=3;
    await A(b,[{opacity:0},{opacity:1}],420,'ease');if(curS&&curS!==b){curS.getAnimations().forEach(a=>a.cancel());curS.style.zIndex='';}b.style.zIndex=2;curS=b;}
  async function sc(to,ms=1200){await gate();const from=sy;const an=curS.animate([{transform:'translateY('+(-from)+'px)'},{transform:'translateY('+(-to)+'px)'}],{duration:ms,easing:EASE,fill:'forwards'});
    await an.finished;sy=to;curS.style.transform='translateY('+(-to)+'px)';an.cancel();}
  const resetS=()=>{root.querySelectorAll('.dm-s').forEach(i=>{i.getAnimations().forEach(a=>a.cancel());i.style.transform='';i.style.zIndex='';});curS=null;sy=0;};
  const reset=()=>[desk,...desk.querySelectorAll('*'),...mob.querySelectorAll('img')].forEach(el=>el.getAnimations().forEach(a=>a.cancel()));
  async function loop(){
    for(;;){
      await gate();await wait(1200);
      await A(page,[{transform:'none'},{transform:'translateY(-600px)'}],1500);await wait(500);   // down to the cards
      await tapD(92,500);await on($('.dm-r1'));await wait(450);                                     // + Mozzarella-mini → 1
      await tapD(139,500);await on($('.dm-r2'));await wait(800);                                    // + → 2
      await tapD(217,234);                                                                           // the pizza → Fast view
      on($('.dm-dim'),300);on($('.dm-x'),300);await A($('.dm-fvw'),[{opacity:0,transform:'scale(.96)'},{opacity:1,transform:'none'}],360);await wait(900);
      await tapD(762,542);await on($('.dm-f1'));await wait(450);
      await tapD(812,542);await on($('.dm-f2'));await wait(1000);
      await tapD(1368,72);off($('.dm-x'),250);off($('.dm-dim'),300);await A($('.dm-fvw'),[{opacity:1,transform:'none'},{opacity:0,transform:'scale(.96)'}],300);await wait(700);
      // Pizza Tracker and the loyalty page: full-page screens cross-fade over the catalog, taller ones scroll
      await show('tr0');await wait(1100);
      await tapD(828,392);await show('tr1');await wait(700);await sc(330);await wait(1200);
      await show('tr2');await wait(1300);await show('tr3');await wait(1300);await show('tr4');await wait(1300);
      await show('map');await wait(1700);await sc(0,900);await wait(300);
      await tapD(948,128);await show('money');await wait(900);await sc(430,1500);await wait(1300);await sc(0,1100);await wait(600);
      // narrow into the mobile version
      await gate();await off(desk,300);dev.classList.add('mob');await wait(650);await on(mob,350);await wait(1000);
      await tapM(140,332);await on($('.dm-m1'));await wait(450);
      await tapM(188,332);await on($('.dm-m2'));await wait(1800);
      // back to the desktop frame, everything reset
      await off(mob,300);desk.style.opacity='0';reset();resetS();dev.classList.remove('mob');await wait(900);
      fit();await on(desk,350);desk.getAnimations().forEach(a=>a.cancel());desk.style.opacity='';
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
