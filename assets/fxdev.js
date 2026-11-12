/* Fintech · Framnex: "Applied across the platform" and "Back office" as animated devices (2026-11-11), same principle as petabox.js.
   Screens 1440×864 (some taller: they scroll), cross-fade between them, a tap circle where the user "clicks".
   Step: ['w',ms] wait · ['g',screen,x,y] tap (optional) and cross-fade to screen · ['s',px] scroll the current screen down by px. */
(function(){
  const S={
    applied:[
      ['w',2000],['g','accview',1288,169],['w',1400],['g','home',1288,169],['w',900],
      ['g','drawer',439,784],['w',1700],['g','home',1382,54],['w',700],
      ['g','recip',105,281],['w',1700],['g','activity',105,328],['w',1600],['g','home',91,223],['w',900],
      ['g','pm0',1102,81],['w',900],['g','pm1',713,264],['w',900],['g','pm2',710,345],['w',900],['g','pm3',828,324],['w',900],
      ['g','pm5',842,520],['w',700],['s',148],['w',500],['g','pm6',845,714],['w',700],['s',323],['w',500],
      ['g','otp',842,684],['w',1400],['g','pm7'],['w',1600],['g','loader'],['w',1400],['g','pm4'],['w',1500],['g','home',720,409],['w',900],
      ['g','exdd',1322,81],['w',1100],['g','ex',737,477],['w',1300],['g','sent',713,696],['w',1500],['g','home',713,406]
    ],
    bo:[
      ['w',2000],['g','tid',786,550],['w',1200],['g','tdet',823,330],['w',1500],['g','matched',823,563],['w',1500],['g','transfers',721,490],['w',900],
      ['g','brand',92,123],['w',1200],['g','basic',912,304],['w',1500],['g','docs',920,432],['w',1600],['g','docs1',165,252],['w',1300],
      ['g','benef',422,419],['w',800],['s',232],['w',900],['g','docs1',920,732],['w',1100],
      ['g','rep1',920,485],['w',1800],['g','rep'],['w',1100],['g','pw0',1302,113],['w',1400],['g','pw1',823,278],['w',1500],
      ['g','pw2',786,335],['w',1700],['g','pw1',1394,47],['w',900],['g','transfers',105,372]
    ]
  };
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';
  document.querySelectorAll('[data-fxdev]').forEach(root=>{
    const steps=S[root.dataset.fxdev];if(!steps)return;
    const $=s=>root.querySelector(s),dev=$('.dm-dev'),scr=$('.dm-scr'),vp=$('.pbd-vp');
    const P={};root.querySelectorAll('.pbd-p').forEach(i=>P[i.dataset.p]=i);
    let visible=false,cur=root.querySelector('.pbd-p.on').dataset.p,k=.6;
    const gate=async()=>{while(!visible||document.hidden)await wait(300);};
    const fit=()=>{const dw=root.clientWidth-20-(innerWidth>=900?100:0);dev.style.setProperty('--dw',dw+'px');k=dw/1440;vp.style.setProperty('--k',k.toFixed(4));};
    const A=(el,kf,ms,e=EASE)=>el.animate(kf,{duration:ms,easing:e,fill:'forwards'}).finished;
    async function tap(x,y){await gate();const t=document.createElement('span');t.className='d-tap';t.style.left=(x*k)+'px';t.style.top=(y*k)+'px';scr.appendChild(t);await wait(520);t.remove();}
    async function go(n,x,y){if(x!=null)await tap(x,y);await gate();const a=P[cur],b=P[n];b.style.zIndex=2;b.classList.add('on');
      await A(b,[{opacity:0},{opacity:1}],380,'ease');a.classList.remove('on');b.style.zIndex='';
      a.getAnimations().forEach(x=>x.cancel());b.getAnimations().forEach(x=>{if(x.effect&&x.effect.getKeyframes().some(f=>'opacity' in f))x.cancel();});cur=n;}
    async function scroll(px){await gate();await A(P[cur],[{transform:'translateY(0)'},{transform:`translateY(${-px}px)`}],900);}
    async function loop(){for(;;){for(const s of steps){await gate();
      if(s[0]==='w')await wait(s[1]);else if(s[0]==='g')await go(s[1],s[2],s[3]);else if(s[0]==='s')await scroll(s[1]);}}}
    (async()=>{
      await Promise.all([...root.querySelectorAll('img')].map(i=>i.decode?i.decode().catch(()=>{}):0));
      fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(root);root.classList.add('ready');
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      new IntersectionObserver(es=>{visible=es[0].isIntersecting&&!document.hidden;},{threshold:.3}).observe(root);
      loop();
    })();
  });
})();
