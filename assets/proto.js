/* clickable phone prototypes: <div class="proto" data-proto="vib"></div>, data in proto-data.js */
(function(){
  const P=window.PROTO;if(!P)return;
  const DIR='assets/img/mobile/app/',VH=2.165; // one phone screen = width * 2.165
  document.querySelectorAll('.proto[data-proto]').forEach(root=>{
    const app=P[root.dataset.proto];if(!app)return;const S=app.s;let cur=0;
    root.innerHTML=
      '<div class="p-stage"><div class="p-phone"><div class="p-scr" tabindex="0"><div class="p-cnt"><img alt=""><div class="p-hs"></div></div></div></div>'+
      '<div class="p-ctl"><button type="button" class="fbtn p-prev" aria-label="Previous screen">←</button><span class="p-num"></span><button type="button" class="fbtn p-next" aria-label="Next screen">→</button></div></div>'+
      '<div class="p-side"><p class="p-hint">Tap the buttons on the screen. A tap anywhere else shows what is clickable.</p><ol class="p-list"></ol>'+
      '<button type="button" class="p-restart">↺ Start over</button></div>';
    const scr=root.querySelector('.p-scr'),cnt=root.querySelector('.p-cnt'),img=cnt.querySelector('img'),hs=root.querySelector('.p-hs'),
          list=root.querySelector('.p-list'),num=root.querySelector('.p-num');
    // navigation = sections (Onboarding, Modes…): a tap opens the first screen, the rest is clicked through on the phone
    const G=(app.g||S.map((s,i)=>[s[0],[i+1]])).map(([n,ix])=>[n,ix.map(x=>x-1)]);
    list.innerHTML=G.map(([n,ix],gi)=>`<li><button type="button" data-i="${ix[0]}" data-g="${gi}"><b>${String(gi+1).padStart(2,'0')}</b>${n}${ix.length>1?`<small>${ix.length}</small>`:''}</button></li>`).join('');
    const items=[...list.querySelectorAll('button')];
    const pre=new Set();function preload(i){if(i<0||i>=S.length||pre.has(i))return;pre.add(i);const im=new Image();im.src=DIR+S[i][1];}
    function show(i,focusList){
      const prev=cur;cur=(i+S.length)%S.length;const [label,f,w,h,spots]=S[cur];
      const fd=app.fade||[],soft=prev!==cur&&fd.includes(prev+1)&&fd.includes(cur+1)&&img.complete&&img.naturalWidth;
      cnt.querySelectorAll('.p-old').forEach(o=>o.remove());
      if(soft){ // same screen in another state: cross-fade so the slider and tabs morph in place
        const o=img.cloneNode();o.className='p-old';o.removeAttribute('alt');cnt.appendChild(o);
        const nx=new Image();nx.src=DIR+f;(nx.decode?nx.decode():Promise.resolve()).catch(()=>{}).then(()=>{requestAnimationFrame(()=>o.classList.add('out'));setTimeout(()=>o.remove(),400);});
      }else{cnt.classList.remove('in');void cnt.offsetWidth;cnt.classList.add('in');}
      img.src=DIR+f;img.alt=app.name+': '+label;cnt.style.aspectRatio=w+'/'+h;if(!soft)scr.scrollTop=0;
      const k=VH*w/h; // y units -> % of image height
      const ex=S[cur][5];root.querySelectorAll('.p-bar,.p-top').forEach(b=>b.remove());
      if(ex&&ex.top){ // header pinned to the top while the article scrolls
        const t=document.createElement('div');t.className='p-top';t.style.aspectRatio=ex.tw+'/'+ex.th;t.style.marginBottom=(-ex.th/ex.tw*100)+'%';
        t.innerHTML='<img alt="" src="'+DIR+ex.top+'">'+ex.ts.map(([x,ww,to])=>`<button type="button" class="p-spot" data-to="${to-1}" style="left:${x}%;width:${ww}%;top:35%;height:55%" aria-label="Go to ${S[to-1][0]}"></button>`).join('');
        scr.insertBefore(t,scr.firstChild);
      }
      if(ex&&ex.bar){ // tab bar fixed to the bottom of the phone while the long screen scrolls under it
        const bar=document.createElement('div');bar.className='p-bar';bar.style.aspectRatio=ex.bw+'/'+ex.bh;bar.style.marginTop=(-ex.bh/ex.bw*100)+'%';
        bar.innerHTML='<img alt="" src="'+DIR+ex.bar+'">'+ex.bs.map(([x,ww,to])=>`<button type="button" class="p-spot" data-to="${to-1}" style="left:${x}%;width:${ww}%;top:20%;height:60%" aria-label="Go to ${S[to-1][0]}"></button>`).join('');
        scr.appendChild(bar);
      }
      hs.innerHTML=spots.map(([x,y,ww,hh,to])=>`<button type="button" class="p-spot" data-to="${to-1}" style="left:${x}%;width:${ww}%;top:${y*k}%;height:${hh*k}%" aria-label="Go to ${S[to-1][0]}"></button>`).join('');
      spots.forEach(s=>preload(s[4]-1));{const q=G.flatMap(g=>g[1]);preload(q[q.indexOf(cur)+1]);}
      const gi=Math.max(0,G.findIndex(g=>g[1].includes(cur))),gx=G[gi][1];
      items.forEach((b,j)=>{const on=j===gi;b.classList.toggle('on',on);b.setAttribute('aria-current',on?'step':'false');});
      num.textContent=gx.length>1?`${G[gi][0]} · ${gx.indexOf(cur)+1} / ${gx.length}`:G[gi][0];
      const b=items[gi],l=list;if(l.scrollHeight>l.clientHeight||l.scrollWidth>l.clientWidth){
        const r=b.getBoundingClientRect(),p=l.getBoundingClientRect();
        l.scrollBy({top:r.top-p.top-(p.height-r.height)/2,left:r.left-p.left-(p.width-r.width)/2,behavior:'smooth'});}
    }
    scr.addEventListener('click',e=>{const b=e.target.closest('.p-spot');if(b){e.stopPropagation();show(+b.dataset.to);}});
    cnt.addEventListener('click',e=>{if(e.target.closest('.p-spot'))return;root.classList.remove('flash');void root.offsetWidth;root.classList.add('flash');});
    list.addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(+b.dataset.i);});
    const seq=G.flatMap(g=>g[1]),step=d=>show(seq[(seq.indexOf(cur)+d+seq.length)%seq.length]);root.querySelector('.p-prev').onclick=()=>step(-1);root.querySelector('.p-next').onclick=()=>step(1);
    root.querySelector('.p-restart').onclick=()=>show(0);
    scr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
    show(0);
  });
})();
