/* Other Products: a row of screens slides one step to the left every few seconds; the centre one sits in a phone frame.
   Starts only when every screen is decoded (no flash), pauses off-screen, stays still with reduced motion. */
(function(){
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-carousel]').forEach(async root=>{
    const track=root.querySelector('.op-track'),src=[...track.children],N=src.length;if(!N)return;
    // three copies so the row never runs out; we live in the middle copy and jump back by N without a visible change
    for(let k=0;k<2;k++)src.forEach(i=>track.appendChild(i.cloneNode(true)));
    const items=[...track.children];let i=N,visible=false;
    const place=(anim)=>{const w=items[0].offsetWidth,g=parseFloat(getComputedStyle(track).columnGap)||0;
      const x=root.clientWidth/2-(i*(w+g)+w/2);track.style.transition=anim?'transform .9s cubic-bezier(.45,0,.2,1)':'none';
      track.style.transform=`translateX(${x}px)`;items.forEach((el,j)=>{if(!anim)el.style.transition='none';el.classList.toggle('on',j===i);if(!anim){void el.offsetWidth;el.style.transition='';}});};
    await Promise.all(items.map(im=>im.decode?im.decode().catch(()=>{}):0));
    place(false);root.classList.add('ready');addEventListener('resize',()=>place(false));new ResizeObserver(()=>{if(root.clientWidth)place(false);}).observe(root); // pages start hidden: re-centre once the strip gets a size
    if(reduce)return;
    new IntersectionObserver(es=>{visible=es[0].isIntersecting;},{threshold:.2}).observe(root);
    for(;;){
      await wait(2600);while(!visible||document.hidden)await wait(300);
      i++;place(true);await wait(950);
      if(i>=2*N){i-=N;place(false);}
    }
  });
})();
