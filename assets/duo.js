/* In-app screens as a self-playing showcase: two phones, each running its own loop of screens
   (scrolling long screens, sliding, fading, sheets from the bottom). No clicks needed.
   <div class="duo" data-duo="sofy"></div>; screens and pinned bars come from proto-data.js,
   the scenarios live in DUO below (screen numbers are 1-based, as in proto-data). */
(function(){
  const P=window.PROTO;if(!P)return;
  const DIR='assets/img/mobile/app/',SCR=812/375; // phone screen height / width
  // step: [screen, how it enters ('push' | 'fade' | 'up'), pause before scrolling (ms), scroll to (0…1 of the long screen), scroll time (ms), pause after (ms), optional tap [x%, y%] shown on the previous screen first]
  // scenario: freeze:true shows only its first screen (no loop)
  const DUO={
    vib:[
      {label:'Onboarding',steps:[ // a tap on Next, then the next screen fades in place
        [1,'fade',1800,0,0,0],[2,'fade',1800,0,0,0,[50,89.3]],[3,'fade',1800,0,0,0,[50,89.3]],[4,'fade',1800,0,0,0,[50,89.3]],[5,'fade',2200,0,0,0,[50,89.3]],[16,'fade',2600,0,0,0,[8.4,13.6]]]}, // the cross on the paywall opens the free version
      {label:'Modes, AI chat and settings',steps:[ // taps on the tab bar and the mode tabs, screens change in place
        [6,'fade',1800,0,0,0,[50,66.5]],[17,'fade',2000,0,0,0,[15,93]],[14,'fade',2000,0,0,0,[83,93]],[6,'fade',1500,0,0,0,[50,93]],[7,'fade',1500,0,0,0,[50,28.8]],[8,'fade',1500,0,0,0,[78,28.8]],[18,'fade',2800,0,0,0,[50,78.3]],[9,'fade',2400,0,0,0,[83,8.4]]]} // Ok on the dialog leads back to Soft
    ],
    luv:[
      {label:'Onboarding',steps:[ // Continue taps, the partner's name is typed, the cross on the paywall opens the app
        [28,'fade',1600,0,0,0],[29,'fade',1600,0,0,0,[50,92.5]],[30,'fade',1600,0,0,0,[50,92.5]],[31,'fade',900,0,0,0,[50,92.5]],[32,'fade',300,0,0,0,[50,47]],[33,'fade',1000,0,0,0,[87.6,90.9]],[34,'fade',1500,0,0,0,[50,92.5]],[35,'fade',1500,0,0,0,[50,92.5]],[36,'fade',1800,0,0,0,[50,92.5]],[37,'fade',2400,0,0,0,[8,15.4]]]},
      {label:'Anniversary, photo and special dates',steps:[ // scroll down and back up, tap + Add anniversary, the date wheel turns to 4 March 2023, tap Add anniversary
        [15,'fade',900,1,1600,600],[15,'',200,0,1300,500],[16,'sheet',500,0,0,0,[50,70.5]],[17,'fade',2000,0,0,0,[50,84.5]],[18,'fade',1500,0,0,0,[50,33]],[19,'fade',1200,0,0,0,[16,45]],[20,'fade',1300,1,1500,700,[95,15.7]],[21,'fade',1300,0,0,0,[50,84.4]],[22,'fade',1000,0,0,0,[50,40]],[23,'fade',1100,0,0,0,[50,93]],[24,'fade',200,0,0,0,[50,43.3]],[25,'sheet',300,0,0,0,[50,55.5]],[26,'fade',1500,0,0,0,[50,89.2]],[27,'fade',900,1,1200,2000,[50,92.7]]]}, // joint photo, then a special date: type, pick the date, add
    ],
    love:[
      {label:'Onboarding',steps:[ // Continue ×6, Skip, the name «Lucia» is typed, Continue, Not now, the focus list scrolls and two areas are picked, Continue, Not now, View all plans
        [18,'fade',1600,0,0,0],[19,'fade',1500,0,0,0,[50,90.1]],[20,'fade',1500,0,0,0,[50,90.2]],[21,'fade',1500,0,0,0,[50,90.2]],[22,'fade',1500,0,0,0,[50,90.2]],[23,'fade',1600,0,0,0,[50,90.2]],[24,'fade',1600,0,0,0,[50,90.2]],
        [25,'fade',700,0,0,0,[89.3,8.2]],[26,'fade',1500,0,0,0,[50,57.7]],
        [27,'fade',900,1,1800,500,[50,82.1]],[28,'fade',600,0,0,0,[50,43]],[29,'fade',900,0,0,0,[50,54.9]],
        [30,'fade',1600,0,0,0,[50,90.9]],[31,'fade',2000,0,0,0,[13.3,8.1]],[32,'fade',2600,0,0,0,[49.6,82.9]]]},
      {label:'Today, explore, answers and audio',steps:[ // the tab bar stays pinned; Today scrolls, Explore → Questions, Answers → chat and back, Audio: Explore / To do / My Stats, Us
        [33,'fade',1200,1,2400,700,[12,92.4]],[33,'',0,0,1800,600],
        [34,'fade',1000,1,2400,600,[30.8,92.4]],[35,'fade',2000,0,0,0,[50,61.2]],
        [36,'fade',1500,0,0,0,[50,92.4]],[37,'fade',2200,0,0,0,[64,56.6]],[36,'fade',1500,0,0,0,[8.4,10.7]],
        [38,'fade',900,1,2000,600,[68.8,92.4]],[38,'',0,0,1500,500],
        [39,'fade',900,1,2400,600,[50,19.2]],[39,'',0,0,1800,500],
        [40,'fade',1800,0,0,0,[79.6,19.2]],[41,'fade',2400,0,0,0,[88,92.4]]]}
    ],
    inti:[
      {label:'Onboarding and personalization',steps:[ // Start / Continue taps, then the ten questions run fast: a quick Yes / No tap and a short crossfade, the counter goes 1/10 → 10/10
        [20,'fade',1600,0,0,0],[21,'fade',1500,0,0,0,[50,90.3]],[22,'fade',1500,0,0,0,[50,90.3]],[23,'fade',1500,0,0,0,[50,90.3]],[24,'fade',1800,0,0,0,[50,90.3]],
        [25,'fade',1600,0,0,0,[50,82.6]], // question 1: the counter spins 1 → 10 like a slot reel, then the question turns into the 10th
        [35,'fade',1300,0,0,0,[50,82.6]], // questions 1, 2 and 10 only, then «Personalized app for you» loads 0% → 87%
        [36,'fade',2000,0,0,0],[37,'fade',2000,0,0,0,[50,90.4]],[38,'fade',2600,0,0,0,[6.7,7.6]]]}, // Wonderful! → Unlock → paywall → cross → Sex stories
      {label:'Sex stories and audio sessions',steps:[ // the tab bar stays pinned; scroll down and back up to «The power of Fantasies», open the story, scroll it, back
        [39,'fade',1200,1,5200,700,[11.9,92]],[39,'',0,.283,3800,800],
        [40,'fade',1200,1,3600,700,[41.3,50]],[40,'',0,0,2800,700],[39,'fade',1000,0,0,0,[10.3,9.1]],
        // Listen tab: scroll down and back to «Getting started», open the collection, play «Welcome to Inti» (the track runs to the end), rate screen, cross, back
        [41,'fade',1000,1,3200,700,[30.8,92]],[41,'',0,.62,2600,800],[42,'fade',1500,0,0,0,[42.3,50]],
        [43,'fade',300,0,0,0,[30,74.5]],[44,'fade',2000,0,0,0],[45,'fade',1800,0,0,0,[10.4,8.9]],[41,'fade',1500,0,0,0,[10.4,8.9]],
        // Tracker tab: + New Entry, Activity → Masturbation, the unneeded rows turn disabled, orgasm, three stars, a note, Save
        [46,'fade',1500,0,0,0,[50,92]],[47,'fade',1200,0,0,0,[50,71.4]],[48,'sheet',300,0,0,0,[50,19.4]],[49,'fade',300,0,0,0,[50,91.4]],[50,'fade',2600,0,0,0,[50,91.4]]]}
    ],
    sofy:[
      {label:'Articles, reading and comments',steps:[
        [9,'fade',700,.28,3200,500],[9,'',0,.52,2600,600],
        [10,'push',600,.6,2600,700],
        [11,'push',900,0,0,700],
        [20,'push',600,.55,4200,800],
        [21,'fade',1400,0,0,0],
        [14,'up',1500,0,0,0],
        [22,'fade',900,0,0,0],
        [23,'fade',1500,0,0,0]]},
      {label:'Onboarding, modes and settings',steps:[
        [1,'fade',1500,0,0,0],[2,'push',1500,0,0,0],[3,'push',1500,0,0,0],[4,'push',1500,0,0,0],[5,'push',1800,0,0,0],
        [6,'fade',1300,0,0,0],[7,'fade',1300,0,0,0],[8,'fade',1500,0,0,0],
        [16,'push',1500,0,0,0],
        [17,'up',1800,0,0,0],
        [13,'fade',1800,0,0,0]]}
    ]
  };
  // live parts drawn over a screen (geometry measured on the 786 × 1704 export)
  const FX={
    // Vibrator, Hard mode on: the sound wave plays, the power arc fills from the left and the knob rides along it (base image has an empty track)
    // My Luv, Add anniversary: the date wheel is drawn in code (Chivo, sizes and colours from the Figma file) and turns to 4 March 2023
    luvPicker:()=>`<svg class="d-fx d-pk" viewBox="0 0 393 852" aria-hidden="true">
        <rect x="20" y="480" width="353" height="190" fill="#F4F4F4"/>
        <rect x="20" y="556" width="353" height="36" rx="6" fill="#E3E3E3"/>
        <g class="pk-d"></g><g class="pk-m"></g><g class="pk-y"></g></svg>`,
    // My Luv, New Birthday: the name is typed into the field (Chivo 16) and the bar above the keyboard (Source Sans Pro 14)
    luvName:()=>`<svg class="d-fx d-nm" viewBox="0 0 393 852" aria-hidden="true">
        <rect x="34" y="356" width="290" height="26" fill="#fff"/><rect x="22" y="523" width="60" height="24" fill="#F4F4F4"/>
        <text class="nm-f" x="36" y="369" font-size="16" fill="#9BA0BA" dominant-baseline="central"></text><rect class="nm-c" x="36" y="360" width="1.5" height="18" fill="#7061DD"/>
        <text class="nm-b" x="24" y="535" font-size="14" fill="#0C1821" dominant-baseline="central"></text></svg>`,
    // My Luv, When was it?: the same wheel lower on the sheet, turns to 16 March 1999
    luvBday:()=>`<svg class="d-fx d-pk" viewBox="0 0 393 852" aria-hidden="true">
        <rect x="20" y="520" width="353" height="190" fill="#F4F4F4"/>
        <rect x="20" y="596" width="353" height="36" rx="6" fill="#E3E3E3"/>
        <g class="pk-d"></g><g class="pk-m"></g><g class="pk-y"></g></svg>`,
    // My Luv onboarding, What are your names?: the partner's name is typed (Chivo 16, field at y 398)
    luvPartner:()=>`<svg class="d-fx d-nm" viewBox="0 0 393 852" aria-hidden="true">
        <rect x="34" y="386" width="270" height="26" fill="#fff"/>
        <text class="nm-f" x="36" y="398" font-size="16" fill="#9BA0BA" dominant-baseline="central"></text><rect class="nm-c" x="36" y="390" width="1.5" height="17" fill="#7061DD"/></svg>`,
    // My Love onboarding, What is your name?: «Lucia» appears letter by letter, cut from the filled export (8.1), so the font is the design's own
    loveName:(f,id,k)=>`<svg class="d-fx d-nm" viewBox="0 0 750 1624" aria-hidden="true">
        <rect x="74" y="740" width="12" height="48" fill="#fff"/>
        <clipPath id="lt-${id}"><rect class="lt-r" x="80" y="740" width="0" height="48"/></clipPath>
        <clipPath id="lb-${id}"><rect x="36" y="878" width="678" height="120"/></clipPath>
        <image href="${DIR+k}" width="750" height="1624" clip-path="url(#lt-${id})"/>
        <image class="lt-b" href="${DIR+k}" width="750" height="1624" clip-path="url(#lb-${id})" opacity="0" style="transition:opacity .3s ease"/>
        <rect class="nm-c" x="78" y="744" width="2" height="40" fill="#84BC9C"/></svg>`,
    // Inti, Personalized app for you: base = the 0% export; the «0%» is covered with the clean background (Personalized 3),
    // the gradient arc is revealed from the 87% export by a growing stroke mask, the number is Jost SemiBold drawn in code
    // Inti, Question 1/10: the counter digit spins through 2…9 to 10 like a slot reel; glyphs are cut from the owner's exports
    // (white with alpha, background removed), the counter sits on a cleaned copy of question 1; then the 10th question fades in
    intiReel:()=>{const D={1:[409,12],2:[405,20],3:[407,18],4:[405,21],5:[406,20],6:[406,20],7:[407,16],8:[407,18],9:[407,16],10:[398,36]},I=(n,x,y,w,h=47)=>`<image href="${DIR}${n}.webp" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
      return `<svg class="d-fx d-qr" viewBox="0 0 750 1624" aria-hidden="true">
        <defs><clipPath id="qc-cnt"><rect x="255" y="624" width="245" height="47"/></clipPath><clipPath id="qc-win"><rect x="396" y="627" width="40" height="42"/></clipPath><clipPath id="qc-q"><rect x="30" y="696" width="695" height="262"/></clipPath></defs>
        <image href="${DIR}inti-q1-clean.webp" width="750" height="1624" clip-path="url(#qc-cnt)"/>
        <g class="qr-pre">${I('inti-qc-pre',272,624,129)}</g><g class="qr-suf">${I('inti-qc-suf',420,624,58)}</g>
        <g clip-path="url(#qc-win)"><g class="qr-reel">${Object.entries(D).map(([n,[x,w]])=>I('inti-qc-d'+n,x,624+(n-1)*44,w)).join('')}</g></g>
        <g class="qr-q" opacity="0"><image href="${DIR}inti-q1-clean.webp" width="750" height="1624" clip-path="url(#qc-q)"/>${I('inti-q10-text',30,696,695,262)}</g></svg>`;},
    // Inti tracker, Select activities: the Masturbation box gets checked (the checked box is cut from the export)
    intiCheck:(f,id,k)=>`<svg class="d-fx d-ck" viewBox="0 0 750 1624" aria-hidden="true"><clipPath id="ck-${id}"><rect x="630" y="408" width="48" height="48"/></clipPath>
        <image class="ck-on" href="${DIR+k}" width="750" height="1624" clip-path="url(#ck-${id})" opacity="0"/></svg>`,
    // Inti tracker, New Entry · Masturbation: base = the form before (rows enabled, orgasm off, no stars, empty note — made from the export);
    // pieces of the final export fade in: the disabled rows, the orgasm switch, stars 1–3, «Meow» letter by letter. The overlay scrolls with the screen.
    intiForm:(f,id,k)=>{const R=(c,x,y,w,h)=>`<clipPath id="${c}-${id}"><rect ${c==='fm-t'?'class="fm-tr" ':''}x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><image class="${c}" href="${DIR+k}" width="750" height="2868" clip-path="url(#${c}-${id})"${c==='fm-t'?'':' opacity="0"'}/>`;
      return `<svg class="d-fx d-fxs d-fm" viewBox="0 0 750 2868" aria-hidden="true">
        ${R('fm-d',0,590,750,750)}${R('fm-o',552,1405,132,80)}${R('fm-s1',80,1940,80,82)}${R('fm-s2',208,1940,80,82)}${R('fm-s3',335,1940,80,82)}${R('fm-t',96,2405,0,45)}
        <rect class="fm-c" x="99" y="2413" width="2.5" height="31" fill="#fff" opacity="0"/></svg>`;},
    // Inti, audio player: a tap on play, the track runs from its position (00:10) to the end; line, fill and knob redrawn in the export's colours,
    // at the end the left time becomes «00:54», cut from the right-hand label of the same export
    intiPlay:(f,id)=>`<svg class="d-fx d-ap" viewBox="0 0 750 1624" aria-hidden="true">
        <clipPath id="rl-${id}"><rect x="640" y="1442" width="72" height="26"/></clipPath>
        <rect x="22" y="1392" width="706" height="38" fill="#070B14"/>
        <line x1="40" y1="1411" x2="709" y2="1411" stroke="#51545B" stroke-width="5" stroke-linecap="round"/>
        <line class="ap-f" x1="40" y1="1411" x2="191.5" y2="1411" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <circle class="ap-k" cx="191.5" cy="1410.5" r="15" fill="#fff"/>
        <g class="ap-t" opacity="0"><rect x="36" y="1442" width="72" height="26" fill="#070B14"/><g transform="translate(-602 0)"><image href="${DIR+f}" width="750" height="1624" clip-path="url(#rl-${id})"/></g></g></svg>`,
    intiLoad:(f,id,k)=>`<svg class="d-fx d-pl" viewBox="0 0 750 1624" aria-hidden="true">
        <clipPath id="pc-${id}"><rect x="286" y="1250" width="180" height="90"/></clipPath>
        <mask id="pm-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="750" height="1624"><circle class="pl-a" cx="375.5" cy="1293.5" r="203" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round" pathLength="100" stroke-dasharray="0 100" stroke-opacity="0" transform="rotate(-90 375.5 1293.5)"/></mask>
        <image href="${DIR}inti-pers-3.webp" width="750" height="1624" clip-path="url(#pc-${id})"/>
        <image href="${DIR+k}" width="750" height="1624" mask="url(#pm-${id})"/>
        <text class="pl-t" x="376.5" y="1325" font-size="83" font-weight="600" fill="#fff" text-anchor="middle">0%</text></svg>`,
    vibHard:(f,id,k)=>{const B=[[262, 187, 206], [276, 182, 236], [290, 187, 224], [304, 201, 244], [318, 171, 267], [332, 171, 236], [346, 187, 206], [360, 182, 236], [374, 201, 206], [388, 140, 267], [402, 153, 254], [416, 187, 232], [430, 182, 236], [444, 187, 224], [458, 167, 206], [472, 153, 224], [486, 171, 236], [500, 187, 206], [514, 182, 188]];
      return `<svg class="d-fx" viewBox="0 0 786 1704" aria-hidden="true">
        <rect x="255" y="132" width="275" height="142" fill="#F1F1F2"/>
        ${B.map(([x,a,b],i)=>`<rect class="vw" x="${x}" y="${a}" width="8" height="${b-a+1}" rx="4" fill="#DE4A6E" style="animation-duration:${(.55+(i*37%9)/20).toFixed(2)}s;animation-delay:-${((i*53%11)/10).toFixed(1)}s"/>`).join('')}
        <path class="va" d="M85 1280A381.5 381.5 0 0 1 704 1280" fill="none" stroke="#DE4A6E" stroke-width="62" stroke-linecap="round" pathLength="100"/>
        <clipPath id="vk-${id}"><circle cx="708" cy="1284" r="41"/></clipPath>
        <g class="vk"><g class="vk2"><image href="${DIR+k}" width="786" height="1704" clip-path="url(#vk-${id})"/></g></g>
      </svg>`;}
  };
  // scripted parts that play once a screen is in place
  const PK={days:Array.from({length:31},(_,i)=>String(i+1)),months:['January','February','March','April','May','June','July','August','September','October','November','December'],years:Array.from({length:41},(_,i)=>String(1990+i))};
  function wheel(g,items,pos,x,anchor,cy=574){ // pos: index of the item in the highlight (may be fractional)
    let h='';const lo=Math.max(0,Math.floor(pos)-3),hi=Math.min(items.length-1,Math.ceil(pos)+3);
    for(let i=lo;i<=hi;i++){const d=i-pos,a=Math.abs(d),k=Math.min(a,1);
      const off=a<=1?40*a:a<=2?40+34*(a-1):74+34*(a-2),y=cy+Math.sign(d)*off;
      const op=a<=1?1:a<=2?1-.6*(a-1):a<2.6?.4*(2.6-a)/.6:0;if(op<=0)continue;
      const fs=24-6*k,xx=anchor==='middle'?x:x+(x===145?3:1)*(1-k);
      h+=`<text x="${xx}" y="${y}" font-size="${fs}" fill="#0C1821" fill-opacity="${(a<=1?1:op).toFixed(3)}" opacity="${a<=1?1:1}" text-anchor="${anchor}" dominant-baseline="central">${items[i]}</text>`;}
    g.innerHTML=h;}
  const tween=(ms,fn)=>new Promise(r=>{const t0=performance.now();const ease=x=>1-Math.pow(1-x,3);(function f(t){const p=Math.min(1,(t-t0)/ms);fn(ease(p));p<1?requestAnimationFrame(f):r();})(t0);});
  // first frame of a scripted part, drawn before the screen appears (so a sheet never slides in empty)
  const PRE={
    luvPicker:L=>{const sv=L.querySelector('.d-pk');wheel(sv.querySelector('.pk-d'),PK.days,18,83,'middle');wheel(sv.querySelector('.pk-m'),PK.months,2,145,'start');wheel(sv.querySelector('.pk-y'),PK.years,32,266,'start');},
    luvBday:L=>{const sv=L.querySelector('.d-pk');wheel(sv.querySelector('.pk-d'),PK.days,18,83,'middle',614);wheel(sv.querySelector('.pk-m'),PK.months,2,145,'start',614);wheel(sv.querySelector('.pk-y'),PK.years,32,266,'start',614);}
  };
  const tapAt=async(scr,x,y,ms=520)=>{const t=document.createElement('span');t.className='d-tap';t.style.left=x+'%';t.style.top=y+'%';scr.appendChild(t);await wait(ms);t.remove();};
  const RUN={
    intiCheck:async L=>{const sv=L.querySelector('.d-ck');if(!sv)return;const on=sv.querySelector('.ck-on');
      if(matchMedia('(prefers-reduced-motion: reduce)').matches){on.setAttribute('opacity',1);return;}
      await wait(600);await tapAt(L.parentElement,87.2,26.6,300);await tween(220,p=>on.setAttribute('opacity',p.toFixed(3)));await wait(500);},
    intiForm:async L=>{const sv=L.querySelector('.d-fm');if(!sv)return;const scr=L.parentElement,img=L.querySelector('.d-c'),$=c=>sv.querySelector(c);
      const show=async(el,ms=250)=>tween(ms,p=>el.setAttribute('opacity',p.toFixed(3)));
      if(matchMedia('(prefers-reduced-motion: reduce)').matches){['.fm-d','.fm-o','.fm-s1','.fm-s2','.fm-s3'].forEach(c=>$(c).setAttribute('opacity',1));$('.fm-tr').setAttribute('width',70);return;}
      await wait(800);await show($('.fm-d'),600);await wait(700);                 // Partners, Postures, Protection, Sexy lingerie turn disabled
      const k=-L._room*100,o={duration:1800,easing:EASE,fill:'forwards'};
      img.animate([{transform:'none'},{transform:`translateY(${k}%)`}],o);await sv.animate([{transform:'none'},{transform:`translateY(${k}%)`}],o).finished;await wait(400);
      await tapAt(scr,82,12.4,300);await show($('.fm-o'));await wait(350);        // Orgasm
      for(const [i,x] of [[1,15.9],[2,32.9],[3,49.9]]){await tapAt(scr,x,45.4,260);await show($('.fm-s'+i),180);await wait(120);} // 3 stars
      await wait(300);await tapAt(scr,50,72.9,300);const C=$('.fm-c'),T=$('.fm-tr');C.setAttribute('opacity',1);C.classList.add('nm-c');await wait(450);
      for(const e of [119,133,147,166]){T.setAttribute('width',e-96);C.setAttribute('x',e+2);await wait(170);} // Meow
      await wait(700);},
    intiPlay:async L=>{const sv=L.querySelector('.d-ap');if(!sv)return;const scr=L.parentElement;
      const F=sv.querySelector('.ap-f'),K=sv.querySelector('.ap-k'),T=sv.querySelector('.ap-t');
      const set=x=>{F.setAttribute('x2',x.toFixed(1));K.setAttribute('cx',x.toFixed(1));};
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      await wait(700);const tp=document.createElement('span');tp.className='d-tap';tp.style.left='50%';tp.style.top='77.4%';scr.appendChild(tp);
      await wait(520);tp.remove();
      await new Promise(r=>{const t0=performance.now(),T0=2000;(function f(t){const p=Math.min(1,(t-t0)/T0);set(191.5+(709-191.5)*p);p<1?requestAnimationFrame(f):r();})(t0);}); // linear, like playback
      await tween(250,p=>T.setAttribute('opacity',p.toFixed(3)));await wait(500);
    },
    intiReel:async L=>{const sv=L.querySelector('.d-qr');if(!sv)return;
      const R=sv.querySelector('.qr-reel'),A=sv.querySelector('.qr-pre'),B=sv.querySelector('.qr-suf'),Qn=sv.querySelector('.qr-q');
      const set=pos=>{R.setAttribute('transform',`translate(0 ${(-44*pos).toFixed(2)})`);const k=Math.max(0,Math.min(1,pos-8));
        A.setAttribute('transform',`translate(${(-10*k).toFixed(2)} 0)`);B.setAttribute('transform',`translate(${(10*k).toFixed(2)} 0)`);};
      if(matchMedia('(prefers-reduced-motion: reduce)').matches){set(9);Qn.setAttribute('opacity',1);return;}
      set(0);await wait(1100);
      await new Promise(r=>{const t0=performance.now(),T=2200;(function f(t){const p=Math.min(1,(t-t0)/T);
        const e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;set(9*e);p<1?requestAnimationFrame(f):r();})(t0);}); // slow start, fast middle, settles on 10
      await wait(250);await tween(500,p=>Qn.setAttribute('opacity',p.toFixed(3)));
    },
    intiLoad:async L=>{const sv=L.querySelector('.d-pl');if(!sv)return;
      const A=sv.querySelector('.pl-a'),T=sv.querySelector('.pl-t');
      const set=p=>{A.setAttribute('stroke-dasharray',p.toFixed(2)+' 100');A.setAttribute('stroke-opacity',p>.4?1:0);T.textContent=Math.round(p)+'%';};
      if(matchMedia('(prefers-reduced-motion: reduce)').matches){set(87);return;}
      await wait(700);await tween(2600,p=>set(87*p)); // 0% → 87%
    },
    loveName:async L=>{const sv=L.querySelector('.d-nm');if(!sv)return;const scr=L.parentElement;
      const R=sv.querySelector('.lt-r'),C=sv.querySelector('.nm-c'),B=sv.querySelector('.lt-b');
      const ends=[99,116,134,141,162],keys=[[89.6,74.4],[64.8,67.7],[40.3,81.3],[74.7,67.7],[10.7,74.4]]; // L u c i a
      const put=i=>{const e=i<0?80:ends[i];R.setAttribute('width',e-80);C.setAttribute('x',i<0?78:e+1);B.setAttribute('opacity',i<0?0:1);};
      put(-1);if(matchMedia('(prefers-reduced-motion: reduce)').matches){put(4);return;}
      await wait(450);
      for(let i=0;i<5;i++){const k=keys[i];const tp=document.createElement('span');tp.className='d-tap d-key';tp.style.left=k[0]+'%';tp.style.top=k[1]+'%';scr.appendChild(tp);
        await wait(170);put(i);await wait(170);tp.remove();await wait(60);}
    },
    luvPartner:async L=>{const sv=L.querySelector('.d-nm');if(!sv)return;const scr=L.parentElement;
      const F=sv.querySelector('.nm-f'),C=sv.querySelector('.nm-c');
      const keys={M:[79.8,84.3],a:[10.1,78],r:[34.9,71.6],y:[55,71.6]},word='Mary';
      const put=s=>{F.textContent=s;C.setAttribute('x',36+(s?F.getComputedTextLength():0)+1);};
      put('');if(matchMedia('(prefers-reduced-motion: reduce)').matches){put(word);return;}
      await wait(450);
      for(let i=0;i<word.length;i++){const k=keys[word[i]];const tp=document.createElement('span');tp.className='d-tap d-key';tp.style.left=k[0]+'%';tp.style.top=k[1]+'%';scr.appendChild(tp);
        await wait(170);put(word.slice(0,i+1));await wait(170);tp.remove();await wait(60);}
    },
    luvName:async L=>{const sv=L.querySelector('.d-nm');if(!sv)return;const scr=L.parentElement;
      const F=sv.querySelector('.nm-f'),C=sv.querySelector('.nm-c'),B=sv.querySelector('.nm-b');
      const keys={M:[80,81.9],a:[9.8,75.5],r:[34.9,69.2],y:[55,69.2]},word='Mary';
      const put=s=>{F.textContent=s;B.textContent=s?s+'|':'';C.setAttribute('x',36+(F.getComputedTextLength?F.getComputedTextLength():0)+1);};
      put('');if(matchMedia('(prefers-reduced-motion: reduce)').matches){put(word);return;}
      await wait(450);
      for(let i=0;i<word.length;i++){const k=keys[word[i]];const tp=document.createElement('span');tp.className='d-tap d-key';tp.style.left=k[0]+'%';tp.style.top=k[1]+'%';scr.appendChild(tp);
        await wait(170);put(word.slice(0,i+1));await wait(170);tp.remove();await wait(60);}
    },
    luvBday:async L=>{const sv=L.querySelector('.d-pk');if(!sv)return;
      const D=sv.querySelector('.pk-d'),M=sv.querySelector('.pk-m'),Y=sv.querySelector('.pk-y');
      let d=18,y=32;const draw=()=>{wheel(D,PK.days,d,83,'middle',614);wheel(M,PK.months,2,145,'start',614);wheel(Y,PK.years,y,266,'start',614);};
      draw();if(matchMedia('(prefers-reduced-motion: reduce)').matches){d=15;y=9;draw();return;}
      await wait(450);await tween(900,p=>{d=18-3*p;draw();});   // 19 → 16
      await wait(200);await tween(1600,p=>{y=32-23*p;draw();}); // 2022 → 1999
    },
    luvPicker:async L=>{const sv=L.querySelector('.d-pk');if(!sv)return;
      const D=sv.querySelector('.pk-d'),M=sv.querySelector('.pk-m'),Y=sv.querySelector('.pk-y');
      let d=18,y=32;const draw=()=>{wheel(D,PK.days,d,83,'middle');wheel(M,PK.months,2,145,'start');wheel(Y,PK.years,y,266,'start');};
      draw();if(matchMedia('(prefers-reduced-motion: reduce)').matches){d=3;y=33;draw();return;}
      await wait(500);await tween(1500,p=>{d=18-15*p;draw();}); // 19 → 4
      await wait(250);await tween(700,p=>{y=32+p;draw();});   // 2022 → 2023
    }
  };
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const EASE='cubic-bezier(.45,0,.2,1)';

  document.querySelectorAll('.duo[data-duo]').forEach(root=>{
    const app=P[root.dataset.duo],cfg=DUO[root.dataset.duo];if(!app||!cfg)return;const S=app.s;
    let visible=false;
    new IntersectionObserver(es=>{visible=es[0].isIntersecting&&!document.hidden;},{threshold:.25}).observe(root);
    const gate=async()=>{while(!visible||document.hidden)await wait(300);};

    root.innerHTML=cfg.map(c=>`<div class="d-item"><div class="p-phone"><div class="d-scr" role="img" aria-label="${app.name}: ${c.label}"></div></div><p class="d-cap">${c.label}</p></div>`).join('');
    const pre=new Set(),load=f=>{if(pre.has(f))return;pre.add(f);const i=new Image();i.src=DIR+f;};

    function layer(n){ // one screen: content image + pinned header / tab bar
      const [label,f,w,h,,ex]=S[n-1];const L=document.createElement('div');L.className='d-layer';
      if(ex&&ex.sheet){ // modal sheet: [sheet top, sheet bottom] in px of the 852-tall frame
        const [a,b]=ex.sheet,H=852,pa=(a/H*100).toFixed(3),pb=(b/H*100).toFixed(3);
        L.className='d-layer d-sheet';
        L.innerHTML=`<img class="d-c" src="${DIR+f}" alt="" style="clip-path:inset(0 0 ${(100-pa).toFixed(3)}% 0)">`+
          `<div class="d-dim" style="top:${pa}%"></div>`+
          `<div class="d-sh" style="clip-path:inset(${pa}% 0 ${(100-pb).toFixed(3)}% 0)"><img src="${DIR+f}" alt="">${ex.fx&&FX[ex.fx]?FX[ex.fx](f,Math.random().toString(36).slice(2,8),ex.knob):''}</div>`+
          `<img class="d-tb" src="${DIR+f}" alt="" style="clip-path:inset(${pb}% 0 0 0)">`;
        L._room=0;L._fx=ex.fx;if(PRE[ex.fx])PRE[ex.fx](L);return L;
      }
      L.innerHTML=`<img class="d-c" src="${DIR+f}" alt="">`+(ex&&ex.top?`<img class="d-top" src="${DIR+ex.top}" alt="">`:'')+(ex&&ex.bar?`<img class="d-bar" src="${DIR+ex.bar}" alt="">`:'')+(ex&&ex.fx&&FX[ex.fx]?FX[ex.fx](f,Math.random().toString(36).slice(2,8),ex.knob):'');
      L._room=Math.max(0,1-SCR*w/h); // share of the image that lies below the first screen
      L._fx=ex&&ex.fx;return L;
    }
    async function enter(scr,L,how){
      // decode every picture of the new screen first, then add it already at its start state: no flash
      await Promise.all([...L.querySelectorAll('img')].map(i=>i.decode?i.decode().catch(()=>{}):0));
      const old=scr.lastElementChild;
      if(how==='push')L.style.transform='translateX(100%)';else if(how==='up')L.style.transform='translateY(100%)';else if(how==='sheet')L.querySelector('.d-sh').style.transform='translateY(60%)';else if(how)L.style.opacity='0';
      scr.appendChild(L);
      const o={duration:520,easing:EASE,fill:'both'};
      if(how==='push'){L.animate([{transform:'translateX(100%)'},{transform:'none'}],o);if(old)old.animate([{transform:'none',filter:'none'},{transform:'translateX(-28%)',filter:'brightness(.85)'}],o);}
      else if(how==='up'){L.animate([{transform:'translateY(100%)'},{transform:'none'}],{...o,duration:560});}
      else if(how==='sheet'){ // only the dimmer fades and the sheet rises; the tab bar stays put
        L.style.opacity='';const top=L.querySelector('.d-c'),sh=L.querySelector('.d-sh'),tb=L.querySelector('.d-tb');
        top.animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease',fill:'both'});
        L.querySelector('.d-dim').animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease',fill:'both'});
        tb.animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease',fill:'both'});
        sh.animate([{transform:'translateY(60%)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});}
      else L.animate([{opacity:0},{opacity:1}],{...o,duration:how===''?0:how==='quick'?260:600,easing:'ease'});
      await wait(how==='up'||how==='sheet'?600:how==='fade'?640:how==='quick'?280:540);
      L.style.transform='';L.style.opacity='';if(how==='sheet')L.querySelector('.d-sh').style.transform='';
      if(L._fx&&RUN[L._fx])await RUN[L._fx](L);
      [...scr.children].slice(0,-1).forEach(c=>c.remove());
    }
    async function run(scr,steps,freeze){
      steps.forEach(s=>{const e=S[s[0]-1];load(e[1]);if(e[5]&&e[5].knob)load(e[5].knob);if(e[5]&&e[5].pre)e[5].pre.forEach(load);});
      let L=null,at=0;
      if(reduce||freeze){scr.appendChild(layer(steps[0][0]));return;}
      for(;;){
        for(const [n,how,before,to,dur,after,tap] of steps){
          await gate();
          if(tap&&L){const t=document.createElement('span');t.className='d-tap';t.style.left=tap[0]+'%';t.style.top=tap[1]+'%';if(how==='quick')t.style.animationDuration='.3s';scr.appendChild(t);await wait(how==='quick'?300:520);t.remove();}
          if(how||!L){L=layer(n);at=0;await enter(scr,L,how||'fade');}
          await wait(before);
          if(dur&&L._room){
            const img=L.querySelector('.d-c'),k=-L._room*100;
            await img.animate([{transform:`translateY(${k*at}%)`},{transform:`translateY(${k*to}%)`}],{duration:dur,easing:EASE,fill:'forwards'}).finished;at=to;
          }
          await wait(after);
        }
      }
    }
    root.querySelectorAll('.d-scr').forEach((scr,i)=>{setTimeout(()=>run(scr,cfg[i].steps,cfg[i].freeze),i*900);}); // phones start out of step
  });
})();
