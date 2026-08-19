
/* --- reliable audio initialization --- */
document.addEventListener("DOMContentLoaded", () => {
  const menuMusic = document.getElementById("menuMusic");
  if (menuMusic) {
    menuMusic.volume = 0.7;
    menuMusic.muted = false;
  }

  // Browsers block autoplay until the user interacts with the page.
  // Start menu music on the first click/key press.
  const startMenuMusic = () => {
    if (!menuMusic) return;
    menuMusic.muted = false;
    menuMusic.play().catch(() => {});
    document.removeEventListener("click", startMenuMusic);
    document.removeEventListener("keydown", startMenuMusic);
  };

  document.addEventListener("click", startMenuMusic, { once: true });
  document.addEventListener("keydown", startMenuMusic, { once: true });
});

(function(){
  "use strict";

  const HAPPY_SRC = "assets/images/player-happy.png";
  const CRY_SRC = "assets/images/player-cry.png";

  /* =========================================================
     CONFIG / DATA  (pure data, no rendering logic)
     ========================================================= */
  const BANK = {
    countries: { glyph:"🌍", name:"Countries",
      easy:[["nepal","home of mount everest"],["japan","land of the rising sun"],["egypt","home of the pyramids"],["italy","shaped like a boot"],["chile","a long thin country"],["spain","famous for flamenco"],["kenya","known for its safaris"],["china","the most populous country"],["india","home of the taj mahal"],["peru","home of machu picchu"],["cuba","a caribbean island nation"],["iran","a country in the middle east"],["wales","part of the united kingdom"],["ghana","known for its gold coast"],["haiti","shares an island with the dominican republic"],["qatar","hosted the 2022 world cup"]],
      medium:[["canada","known for maple syrup"],["brazil","home of the amazon"],["mexico","known for its tacos"],["poland","home to krakow"],["norway","land of the fjords"],["turkey","spans two continents"],["sweden","home of ikea"],["greece","birthplace of democracy"],["iceland","land of ice and fire"],["ireland","known for its green hills"],["vietnam","famous for pho and long coastlines"],["morocco","home to marrakesh"],["finland","land of a thousand lakes"],["ecuador","named for the equator"],["portugal","known for its port wine"],["thailand","known as the land of smiles"]],
      hard:[["kazakhstan","the largest landlocked country"],["madagascar","an island off east africa"],["azerbaijan","land of fire, in the caucasus"],["mozambique","a country in southeast africa"],["uzbekistan","doubly landlocked in asia"],["montenegro","a small balkan nation"],["kyrgyzstan","a mountainous central asian nation"],["mauritania","a saharan nation in west africa"],["liechtenstein","a tiny alpine microstate"],["turkmenistan","a desert nation in central asia"],["bosnia and herzegovina","a balkan nation with a famous bridge"],["papua new guinea","a nation of hundreds of languages"],["equatorial guinea","a small nation on africa's west coast"],["east timor","a young nation in southeast asia"]]
    },
    animals: { glyph:"🦊", name:"Animals",
      easy:[["cat","a common house pet"],["lion","king of the jungle"],["frog","hops and croaks"],["shark","apex ocean predator"],["horse","runs and neighs"],["sheep","gives us wool"],["tiger","has orange and black stripes"],["zebra","has black and white stripes"],["snake","a legless reptile"],["eagle","a sharp eyed bird of prey"],["camel","carries loads across the desert"],["otter","plays in rivers and holds hands"],["moose","a huge antlered forest dweller"],["gecko","a small clingy lizard"],["puffin","a colorful beaked seabird"]],
      medium:[["dolphin","a smart marine mammal"],["penguin","a flightless bird"],["giraffe","the tallest land animal"],["octopus","eight armed sea creature"],["cheetah","the fastest land animal"],["kangaroo","carries its young in a pouch"],["raccoon","a masked nighttime forager"],["elephant","the largest land animal"],["squirrel","buries nuts for winter"],["flamingo","a pink, one legged wader"],["hedgehog","a spiny little forager"],["albatross","a seabird with a huge wingspan"],["wolverine","a fierce forest weasel"],["mongoose","famous for fighting snakes"],["narwhal","a whale with a long tusk"]],
      hard:[["chameleon","changes its skin color"],["platypus","a duck billed egg layer"],["hippopotamus","a huge semi aquatic mammal"],["armadillo","a small armored mammal"],["pangolin","a scaly anteater"],["salamander","an amphibian that can regrow limbs"],["orangutan","a red haired great ape"],["rhinoceros","a thick skinned horned mammal"],["capybara","the world's largest rodent"],["tarsier","a tiny wide eyed primate"],["axolotl","a smiling aquatic salamander"],["okapi","looks like a mix of zebra and giraffe"],["wildebeest","migrates in huge herds across africa"],["porcupine","a rodent covered in sharp quills"]]
    },
    food: { glyph:"🍜", name:"Food",
      easy:[["pizza","a cheesy italian classic"],["bread","baked from flour and yeast"],["apple","a crunchy fruit, keeps doctors away"],["sushi","raw fish on vinegared rice"],["mango","a sweet tropical fruit"],["honey","made by bees"],["bacon","a crispy breakfast strip"],["salad","a bowl of mixed greens"],["taco","a folded tortilla with fillings"],["pasta","italian dough shaped and boiled"],["curry","a spiced saucy dish"],["donut","a fried, glazed ring of dough"],["mochi","a chewy japanese rice cake"],["pretzel","a twisted salty baked snack"]],
      medium:[["burger","a patty in a bun"],["coffee","a roasted, brewed pick me up"],["cheese","made from curdled milk"],["noodles","long thin strands of dough"],["avocado","a creamy green fruit"],["waffle","a griddled grid of batter"],["risotto","a creamy italian rice dish"],["falafel","fried chickpea balls"],["dumpling","a wrapped and steamed parcel of filling"],["pancake","a fluffy griddled breakfast disc"],["lasagna","layered pasta baked with sauce and cheese"],["biscuit","a flaky baked bread roll"],["hummus","a blended chickpea dip"],["pudding","a soft, sweet baked or set dessert"]],
      hard:[["guacamole","a mashed avocado dip"],["croissant","a flaky french pastry"],["casserole","a baked one dish meal"],["artichoke","a thistle you eat leaf by leaf"],["ratatouille","a french stewed vegetable dish"],["empanada","a stuffed, folded pastry"],["tiramisu","a coffee soaked italian dessert"],["bruschetta","toasted bread with toppings"],["quesadilla","a folded, cheese filled tortilla"],["jambalaya","a spiced louisiana rice dish"],["bouillabaisse","a french seafood stew"],["shakshuka","eggs poached in spiced tomato sauce"],["gazpacho","a chilled spanish tomato soup"]]
    },
    occupation: { glyph:"🧑‍🚀", name:"Occupations",
      easy:[["chef","cooks in a kitchen"],["nurse","cares for patients"],["pilot","flies an aircraft"],["actor","performs on stage or screen"],["coach","trains a sports team"],["judge","presides over a courtroom"],["baker","bakes bread and pastries"],["dancer","performs choreographed movement"],["farmer","grows crops and raises animals"],["writer","crafts stories and articles"],["barber","cuts and styles hair"],["welder","joins metal with heat"],["florist","arranges and sells flowers"]],
      medium:[["teacher","educates students"],["dentist","cares for your teeth"],["plumber","fixes pipes and leaks"],["painter","creates art or paints walls"],["surgeon","performs operations"],["mechanic","repairs vehicles"],["engineer","designs and builds systems"],["sculptor","shapes stone or clay into art"],["electrician","installs and repairs wiring"],["librarian","organizes and manages books"],["therapist","helps people work through problems"],["publisher","produces books and media"],["biologist","studies living organisms"],["carpenter","builds things from wood"]],
      hard:[["pharmacist","dispenses medication"],["veterinarian","treats sick animals"],["astronaut","travels into space"],["archaeologist","studies ancient civilizations"],["choreographer","designs dance routines"],["cartographer","creates maps"],["ambassador","represents a country abroad"],["orthodontist","straightens teeth"],["cinematographer","films movies and shows"],["paleontologist","studies fossils and ancient life"],["meteorologist","forecasts the weather"],["locksmith","makes and repairs locks"],["upholsterer","covers furniture in fabric"]]
    },
    sports: { glyph:"🏅", name:"Sports",
      easy:[["golf","played with clubs and a small ball"],["chess","a strategic board game for two"],["boxing","fighting with padded gloves"],["rugby","a rough team sport with an oval ball"],["darts","thrown at a round target board"],["hockey","played on ice with a puck"],["tennis","played with rackets over a net"],["diving","jumping and flipping into water"]],
      medium:[["cricket","played with a bat, ball, and wickets"],["archery","shooting arrows at a target"],["curling","sliding stones across ice toward a target"],["bowling","rolling a ball to knock down pins"],["swimming","racing through water"],["cycling","racing on two wheels"],["wrestling","grappling to pin an opponent"],["baseball","a bat and ball game with innings"]],
      hard:[["gymnastics","acrobatic routines on various apparatus"],["badminton","played with a racket and a shuttlecock"],["taekwondo","a korean martial art with kicks"],["triathlon","swim, bike, and run in one race"],["snowboarding","riding a board down snowy slopes"],["water polo","a team sport played swimming in a pool"],["pentathlon","five combined athletic events"],["fencing","dueling with thin swords"]]
    },
    science: { glyph:"🔬", name:"Science",
      easy:[["atom","the smallest unit of an element"],["moon","orbits the earth"],["orbit","the path a planet follows"],["fossil","preserved remains of ancient life"],["magnet","attracts iron and steel"],["comet","a icy body that grows a tail near the sun"],["gravity","pulls objects toward each other"],["volcano","erupts with molten rock"]],
      medium:[["molecule","a group of bonded atoms"],["gravity well","the curve of spacetime around a mass"],["electron","a negatively charged particle"],["ecosystem","living things and their environment together"],["evolution","gradual change in species over time"],["telescope","used to view distant objects in space"],["hormone","a chemical messenger in the body"],["asteroid","a rocky body orbiting the sun"]],
      hard:[["photosynthesis","how plants convert light into energy"],["mitochondria","the powerhouse of the cell"],["thermodynamics","the study of heat and energy"],["radioactivity","spontaneous emission of particles from atoms"],["biodiversity","the variety of life in an ecosystem"],["crystallography","the study of crystal structure"],["electromagnetism","the force linking electricity and magnetism"],["paleogenetics","studying dna from ancient remains"]]
    }
  };

  const LEVELS = { easy:{lives:8,label:"Easy"}, medium:{lives:6,label:"Medium"}, hard:{lives:4,label:"Hard"} };
  const BALLOON_PALETTE = ["#d43d3d","#e08b2e","#e3b93a","#3f9e6d","#3f8fd4","#8264d8","#d9508f"];
  const VOWELS = new Set(['a','e','i','o','u']);

  /* =========================================================
     COLOR HELPERS
     ========================================================= */
  function shadeColor(hex, percent){
    const f = parseInt(hex.slice(1),16), t = percent<0?0:255, p = Math.abs(percent);
    const R=f>>16, G=f>>8&0x00FF, B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }
  function hexToRgb(hex){
    const v = parseInt(hex.slice(1),16);
    return [v>>16 & 255, v>>8 & 255, v & 255];
  }
  function lerpColor(hexA, hexB, t){
    t = Math.max(0, Math.min(1, t));
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    const r = Math.round(a[0]+(b[0]-a[0])*t);
    const g = Math.round(a[1]+(b[1]-a[1])*t);
    const bl = Math.round(a[2]+(b[2]-a[2])*t);
    return "#" + [r,g,bl].map(x=>x.toString(16).padStart(2,'0')).join('');
  }

  /* =========================================================
     PROCEDURAL AUDIO (Web Audio API — no external assets)
     ========================================================= */
  const Audio2 = (function(){
    let ctx = null;
    let enabled = true;
    function context(){
      if(!ctx){
        try{ ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ enabled=false; }
      }
      return ctx;
    }
    function tone(freq, dur, type, startGain, delay){
      if(!enabled) return;
      const c = context(); if(!c) return;
      try{
        const t0 = c.currentTime + (delay||0);
        const o = c.createOscillator(), g = c.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, t0);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.linearRampToValueAtTime(startGain==null?0.08:startGain, t0+0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
        o.connect(g); g.connect(c.destination);
        o.start(t0); o.stop(t0+dur+0.02);
      }catch(e){}
    }
    function sweep(f1,f2,dur,type,gain,delay){
      if(!enabled) return;
      const c = context(); if(!c) return;
      try{
        const t0 = c.currentTime + (delay||0);
        const o = c.createOscillator(), g = c.createGain();
        o.type = type || 'sawtooth';
        o.frequency.setValueAtTime(f1, t0);
        o.frequency.exponentialRampToValueAtTime(Math.max(f2,20), t0+dur);
        g.gain.setValueAtTime(gain==null?0.09:gain, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
        o.connect(g); g.connect(c.destination);
        o.start(t0); o.stop(t0+dur+0.02);
      }catch(e){}
    }
    function noiseBurst(dur, gain, delay){
      if(!enabled) return;
      const c = context(); if(!c) return;
      try{
        const t0 = c.currentTime + (delay||0);
        const bufferSize = Math.max(1, Math.floor(c.sampleRate * dur));
        const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i=0;i<bufferSize;i++){ data[i] = (Math.random()*2-1) * (1 - i/bufferSize); }
        const src = c.createBufferSource(); src.buffer = buffer;
        const g = c.createGain(); g.gain.setValueAtTime(gain==null?0.12:gain, t0);
        const filt = c.createBiquadFilter(); filt.type='highpass'; filt.frequency.value = 800;
        src.connect(filt); filt.connect(g); g.connect(c.destination);
        src.start(t0);
      }catch(e){}
    }
    return {
      setEnabled(v){ enabled = v; },
      isEnabled(){ return enabled; },
      keyClick(){ tone(1200, 0.045, 'square', 0.03); },
      correct(){ tone(660, 0.12, 'triangle', 0.09); tone(880,0.14,'triangle',0.05,0.05); },
      pop(){ sweep(680, 90, 0.22, 'sawtooth', 0.11); noiseBurst(0.12, 0.10, 0.0); },
      hint(){ tone(500,0.09,'square',0.06); tone(700,0.09,'square',0.05,0.07); },
      freeHint(){ tone(760,0.1,'triangle',0.07); tone(980,0.12,'triangle',0.06,0.06); tone(1200,0.14,'triangle',0.05,0.12); },
      win(){
        [523.25,659.25,783.99,1046.5].forEach((f,i)=> tone(f, 0.22, 'triangle', 0.08, i*0.09));
      },
      lose(){
        [392,349.2,293.7,220].forEach((f,i)=> tone(f, 0.32, 'sawtooth', 0.07, i*0.14));
        noiseBurst(0.3, 0.08, 0.0);
      }
    };
  })();

  /* =========================================================
     SVG BALLOON-BURST PARTICLES
     ========================================================= */
  function spawnBurstParticles(svgRoot, x, y, color){
    const knot = shadeColor(color, -0.2);
    const colors = [color, knot, "#ffffff"];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    svgRoot.appendChild(g);
    const pieces = 7;
    for(let i=0;i<pieces;i++){
      const ang = (Math.PI*2*i/pieces) + (Math.random()*0.6-0.3);
      const dist = 18 + Math.random()*22;
      const dx = Math.cos(ang)*dist, dy = Math.sin(ang)*dist;
      const size = 3 + Math.random()*3.5;
      const shard = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      const c = colors[i % colors.length];
      shard.setAttribute('points', `0,${-size} ${size*0.8},${size*0.6} ${-size*0.8},${size*0.6}`);
      shard.setAttribute('fill', c);
      shard.setAttribute('class','burst-piece');
      shard.setAttribute('transform', `translate(${x} ${y}) rotate(${Math.random()*360})`);
      shard.style.transition = 'transform .55s cubic-bezier(.2,.7,.4,1), opacity .55s ease';
      shard.style.opacity = '1';
      g.appendChild(shard);
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          shard.setAttribute('transform', `translate(${x+dx} ${y+dy}) rotate(${Math.random()*360})`);
          shard.style.opacity = '0';
        });
      });
    }
    setTimeout(()=>{ g.remove(); }, 650);
  }

  /* =========================================================
     SKY MOOD — dynamic lighting as lives decrease
     ========================================================= */
  function setSkyMood(progress){
    // progress: 0 (safe / calm) -> 1 (critical / stormy)
    const sky1 = lerpColor('#bfe3ea', '#3c3a55', progress);
    const sky2 = lerpColor('#6fb7c9', '#1c1826', progress);
    document.documentElement.style.setProperty('--sky1', sky1);
    document.documentElement.style.setProperty('--sky2', sky2);
  }

  /* =========================================================
     STATE
     ========================================================= */
  let state = {
    category:null, level:null, maxLives:0, lives:0,
    word:"", clue:"", guessed:new Set(), lastWord:"", wordQueues:{},
    saved:0, best:0,
    streak:0, bestStreak:0,
    hintsUsedThisWord:0, freeHints:0, wordsSinceFreeHint:0,
    tier1Used:false, tier2Used:false
  };

  const screens = { setup:document.getElementById('screen-setup'), game:document.getElementById('screen-game'), end:document.getElementById('screen-end') };
  function showScreen(name){
    Object.values(screens).forEach(s=>s.classList.remove('active'));
    screens[name].classList.add('active');
    if(name === 'setup' || name === 'game'){
      // theme music plays continuously through the menu and the round itself;
      // it's only swapped out for the lose track on the end screen (see gameOver()).
      pauseLoseMusic();
      playMenuMusic();
    } else {
      pauseMenuMusic();
    }
  }

  /* =========================================================
     MAIN MENU MUSIC
     ========================================================= */
  const menuMusic = document.getElementById('menuMusic');
  const loseMusic = document.getElementById('loseMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIconOn = document.getElementById('musicIconOn');
  const musicIconOff = document.getElementById('musicIconOff');
  menuMusic.volume = 0.5;
  loseMusic.volume = 0.5;
  let musicMuted = false;
  let musicUnlocked = false;

  function updateMusicIcon(){
    musicIconOn.style.display = musicMuted ? 'none' : 'block';
    musicIconOff.style.display = musicMuted ? 'block' : 'none';
  }

  function playMenuMusic(){
    if(musicMuted) return;
    const p = menuMusic.play();
    if(p && p.catch){
      p.catch(()=>{
        // Autoplay blocked until the user interacts with the page — retry on first interaction.
        const resume = ()=>{
          const onMenuOrGame = screens.setup.classList.contains('active') || screens.game.classList.contains('active');
          if(onMenuOrGame && !musicMuted){ menuMusic.play().catch(()=>{}); }
          document.removeEventListener('pointerdown', resume);
          document.removeEventListener('keydown', resume);
        };
        document.addEventListener('pointerdown', resume, { once:true });
        document.addEventListener('keydown', resume, { once:true });
      });
    }
  }
  function pauseMenuMusic(){ menuMusic.pause(); }
  function playLoseMusic(){
    if(musicMuted) return;
    loseMusic.currentTime = 0;
    const p = loseMusic.play();
    if(p && p.catch) p.catch(()=>{});
  }
  function pauseLoseMusic(){
    loseMusic.pause();
    loseMusic.currentTime = 0;
  }

  musicToggleBtn.addEventListener('click', ()=>{
    musicMuted = !musicMuted;
    updateMusicIcon();
    if(musicMuted){
      pauseMenuMusic();
      pauseLoseMusic();
    }
    else if(screens.setup.classList.contains('active') || screens.game.classList.contains('active')){
      playMenuMusic();
    }
    else if(screens.end.classList.contains('active')){
      playLoseMusic();
    }
  });

  // start music on load since setup is the initial active screen
  playMenuMusic();

  /* =========================================================
     SETUP SCREEN UI
     ========================================================= */
  const catGrid = document.getElementById('catGrid');
  Object.entries(BANK).forEach(([key,cat])=>{
    const card = document.createElement('button');
    card.className='cat-card'; card.dataset.key=key; card.dataset.glyph=cat.glyph; card.type='button';
    card.innerHTML = `<span class="check-mark">✓</span><span class="glyph-badge">${cat.glyph}</span><span class="name">${cat.name}</span>`;
    card.addEventListener('click', ()=>{
      document.querySelectorAll('.cat-card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected'); state.category=key; checkReady();
    });
    catGrid.appendChild(card);
  });
  document.querySelectorAll('.diff-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.diff-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected'); state.level=btn.dataset.level; checkReady();
    });
  });
  const startBtn=document.getElementById('startBtn'), startHint=document.getElementById('startHint');
  function checkReady(){
    if(state.category && state.level){ startBtn.disabled=false; startHint.textContent="everything's set — good luck"; }
    else { startBtn.disabled=true; startHint.textContent="Choose a category and difficulty to continue"; }
  }
  startBtn.addEventListener('click', startRun);
  document.getElementById('homeBtn').addEventListener('click', ()=>showScreen('setup'));
  document.getElementById('menuBtn').addEventListener('click', ()=>showScreen('setup'));
  document.getElementById('playAgainBtn').addEventListener('click', startRun);

  /* =========================================================
     BALLOON DEFS + HEAD BALLOON RENDERING
     ========================================================= */
  function initBalloonDefs(){
    const defs = document.getElementById('svgDefs');
    defs.innerHTML =
      `<linearGradient id="monsterGrad" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="#2c2c2c"/>
         <stop offset="100%" stop-color="#0e0e0e"/>
       </linearGradient>
       <radialGradient id="sceneGlow" cx="50%" cy="8%" r="70%">
         <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
         <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
       </radialGradient>` +
      BALLOON_PALETTE.map((c,i)=>
        `<radialGradient id="balloonGrad${i}" cx="32%" cy="24%" r="82%">
           <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
           <stop offset="32%" stop-color="${c}" stop-opacity="1"/>
           <stop offset="100%" stop-color="${shadeColor(c,-0.28)}" stop-opacity="1"/>
         </radialGradient>`
      ).join('');
  }

  function balloonLayout(count){
    const arr = [];
    for(let i=0;i<count;i++){
      const t = count===1 ? 0 : (i/(count-1))-0.5;
      arr.push({t, order:Math.abs(t)});
    }
    arr.sort((a,b)=>a.order-b.order); // center-out, so last = outermost
    const span = Math.min(150, 20*count);
    return arr.map((a,i)=>({
      x: 120 + a.t*span,
      y: 34 + Math.abs(a.t)*44 + (i%2===0?-6:6)
    }));
  }

  function renderHeadBalloons(count){
    const g = document.getElementById('headBalloons');
    g.innerHTML = '';
    const positions = balloonLayout(count);
    positions.forEach((pos,i)=>{
      const colorIdx = i % BALLOON_PALETTE.length;
      const knot = shadeColor(BALLOON_PALETTE[colorIdx], -0.15);
      const item = document.createElementNS('http://www.w3.org/2000/svg','g');
      item.setAttribute('class','balloon-item');
      item.dataset.colorIdx = colorIdx;
      item.dataset.x = pos.x; item.dataset.y = pos.y;
      item.style.animationDelay = ((i*0.35)%2.6).toFixed(2)+'s';
      item.innerHTML =
        `<line x1="120" y1="97" x2="${pos.x}" y2="${pos.y+20}" stroke="#33261f" stroke-width="1.4" stroke-linecap="round" opacity="0.75"/>
         <path d="M${pos.x-5} ${pos.y+18} L${pos.x} ${pos.y+27} L${pos.x+5} ${pos.y+18} Z" fill="${knot}" stroke="#1c1c1c" stroke-width="1"/>
         <ellipse cx="${pos.x}" cy="${pos.y}" rx="16.5" ry="20" fill="url(#balloonGrad${colorIdx})" stroke="#1c1c1c" stroke-width="1.6"/>
         <ellipse cx="${pos.x-5.5}" cy="${pos.y-8}" rx="4" ry="5.5" fill="#ffffff" opacity="0.6"/>`;
      g.appendChild(item);
    });
  }

  function popHeadBalloon(){
    const g = document.getElementById('headBalloons');
    const items = g.querySelectorAll('.balloon-item');
    if(!items.length) return;
    const last = items[items.length-1];
    const colorIdx = Number(last.dataset.colorIdx)||0;
    const x = Number(last.dataset.x), y = Number(last.dataset.y);
    const svgRoot = document.querySelector('.scene svg');
    spawnBurstParticles(svgRoot, x, y, BALLOON_PALETTE[colorIdx % BALLOON_PALETTE.length]);
    last.classList.remove('balloon-item');
    last.classList.add('balloon-pop-anim');
    setTimeout(()=>{ last.remove(); }, 420);
  }

  initBalloonDefs();

  /* =========================================================
     AMBIENT BACKGROUND DECOR (drifting clouds + rising balloons)
     ========================================================= */
  function initBgDecor(){
    const host = document.getElementById('bgDecor');
    if(!host) return;
    const cloudSvg = `<svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="30" rx="28" ry="14" fill="#fff"/><ellipse cx="60" cy="22" rx="22" ry="16" fill="#fff"/><ellipse cx="86" cy="30" rx="20" ry="12" fill="#fff"/></svg>`;
    const cloudCount = 5;
    for(let i=0;i<cloudCount;i++){
      const el = document.createElement('div');
      el.className = 'bcloud';
      const w = 120 + Math.random()*160;
      el.style.width = w+'px';
      el.style.height = (w*50/120)+'px';
      el.style.top = (4 + Math.random()*70) + 'vh';
      el.style.animationDuration = (34 + Math.random()*30) + 's';
      el.style.animationDelay = (-Math.random()*40) + 's';
      el.innerHTML = cloudSvg;
      host.appendChild(el);
    }
    const balloonColors = ["#d43d3d","#e08b2e","#e3b93a","#3f9e6d","#3f8fd4","#8264d8","#d9508f"];
    const balloonCount = 6;
    for(let i=0;i<balloonCount;i++){
      const el = document.createElement('div');
      el.className = 'bballoon';
      const size = 26 + Math.random()*22;
      const c = balloonColors[i % balloonColors.length];
      el.style.left = (Math.random()*94) + 'vw';
      el.style.width = size+'px';
      el.style.height = (size*1.22)+'px';
      el.style.animationDuration = (16 + Math.random()*14) + 's';
      el.style.animationDelay = (-Math.random()*26) + 's';
      el.innerHTML = `<svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg"><line x1="20" y1="42" x2="20" y2="50" stroke="#33261f" stroke-width="1.2" opacity="0.5"/><ellipse cx="20" cy="20" rx="18" ry="21" fill="${c}"/><ellipse cx="14" cy="10" rx="4" ry="5.5" fill="#fff" opacity=".55"/></svg>`;
      host.appendChild(el);
    }
  }
  initBgDecor();

  /* =========================================================
     RUN MANAGEMENT
     ========================================================= */
  function startRun(){
    pauseLoseMusic();
    const endWrap = document.querySelector('#screen-end .end-wrap');
    const endGlyphEl = document.getElementById('endGlyph');
    endWrap.classList.remove('loss-mode');
    endGlyphEl.classList.remove('loss-image');
    endGlyphEl.innerHTML = '🎈';
    document.getElementById('endTitle').textContent = 'Game over';
    document.getElementById('endSub').textContent = "Here's how it went.";
    setFigureFace(false);
    state.maxLives = LEVELS[state.level].lives;
    state.lives = state.maxLives;
    state.saved = 0;
    state.streak = 0;
    state.lastWord = "";
    state.freeHints = 0;
    state.wordsSinceFreeHint = 0;
    document.getElementById('savedVal').textContent = state.saved;
    document.getElementById('bestVal').textContent = state.best;
    document.getElementById('streakVal').textContent = state.streak;
    document.getElementById('bestStreakVal').textContent = state.bestStreak;
    document.getElementById('catLabel').textContent = BANK[state.category].name;
    document.getElementById('monsterGroup').style.transform='';
    setSkyMood(0);
    setFigureDanger(0);
    renderLivesRow();
    renderHeadBalloons(state.maxLives);
    showScreen('game');
    loadWord();
  }

  function renderLivesRow(){
    const row = document.getElementById('livesRow');
    row.innerHTML = '';
    for(let i=0;i<state.maxLives;i++){
      const b = document.createElement('span');
      b.className = 'life-balloon';
      b.textContent = '🎈';
      row.appendChild(b);
    }
  }

  function updateLivesRow(){
    const balloons = document.querySelectorAll('.life-balloon');
    balloons.forEach((b,i)=>{
      const lost = i >= state.lives;
      if(lost && !b.classList.contains('lost')){
        b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      }
      b.classList.toggle('lost', lost);
    });
  }

  function pickWord(){
    const pool = BANK[state.category][state.level];
    const key = state.category + '|' + state.level;
    let queue = state.wordQueues[key];
    if(!queue || queue.length === 0){
      queue = shuffleArr(pool.map((_,i)=>i));
      // avoid the new cycle starting with the same word that just ended the last one
      if(queue.length > 1 && pool[queue[0]][0] === state.lastWord){
        [queue[0], queue[1]] = [queue[1], queue[0]];
      }
      state.wordQueues[key] = queue;
    }
    const idx = queue.shift();
    const choice = pool[idx];
    state.lastWord = choice[0];
    return choice;
  }

  function loadWord(){
    const [word, clue] = pickWord();
    state.word = word; state.clue = clue; state.guessed = new Set();
    state.hintsUsedThisWord = 0;
    state.tier1Used = false;
    state.tier2Used = false;
    document.getElementById('clueText').textContent = clue;
    document.getElementById('tier1ClueText').textContent = '';
    document.getElementById('msgRow').textContent=''; document.getElementById('msgRow').className='msg-row';
    renderWord(false);
    renderKeyboard();
    updateHintTierButtons();
    renderStreakRow();
  }

  function renderWord(animateLast){
    const wrap = document.getElementById('wordDisplay');
    wrap.innerHTML='';
    [...state.word].forEach((ch, i)=>{
      const span = document.createElement('span');
      span.className='ch';
      if(ch===' '){ span.innerHTML='&nbsp;&nbsp;'; }
      else if(state.guessed.has(ch)){ span.textContent = ch.toUpperCase(); if(animateLast) span.classList.add('pop'); }
      else { span.textContent = '_'; }
      wrap.appendChild(span);
    });
  }

  function revealFullWord(){
    const wrap = document.getElementById('wordDisplay');
    wrap.innerHTML='';
    [...state.word].forEach(ch=>{
      const span = document.createElement('span');
      span.className='ch';
      if(ch===' '){ span.innerHTML='&nbsp;&nbsp;'; }
      else {
        span.textContent = ch.toUpperCase();
        if(!state.guessed.has(ch)){ span.style.color='var(--balloon-dark)'; }
      }
      wrap.appendChild(span);
    });
  }

  function renderKeyboard(){
    const kb = document.getElementById('keyboard');
    kb.innerHTML='';
    "abcdefghijklmnopqrstuvwxyz".split('').forEach(letter=>{
      const b=document.createElement('button');
      b.className='key'+(VOWELS.has(letter)?' vowel':''); b.type='button'; b.textContent=letter; b.dataset.letter=letter;
      b.addEventListener('click', ()=>guessLetter(letter, 'click'));
      kb.appendChild(b);
    });
  }

  /* =========================================================
     FIGURE STATE (native SVG face swap, replaces raster images)
     ========================================================= */
  function setFigureFace(sad){
    const img = document.getElementById('figureImg');
    if(!img) return;
    img.setAttribute('href', sad ? CRY_SRC : HAPPY_SRC);
  }

  function setFigureDanger(progress){
    // progress 0 = safe, 1 = caught
    const maxDrop = 165;
    const dropY = progress*maxDrop;
    const scale = 1 - progress*0.35;
    const opacity = progress > 0.8 ? Math.max(0.1, 1 - (progress-0.8)/0.2*0.9) : 1;
    const fg = document.getElementById('figureGroup');
    fg.style.setProperty('--dropY', dropY+'px');
    fg.style.transformOrigin = '120px 140px';
    fg.style.transform = `translateY(${dropY}px) scale(${scale})`;
    fg.style.opacity = opacity;
    setFigureFace(progress > 0.4);
    setSkyMood(progress);
  }

  /* =========================================================
     PROGRESSIVE HINT SYSTEM
       Tier 1 (free)   — a contextual text clue, once per word
       Tier 2 (−1)     — eliminate 3–4 dead keyboard letters, once per word
       Solving 3 words in a row without a tier-2 hint earns a free
       token that covers one Tier 2 use.
     ========================================================= */
  function remainingLetters(){
    return [...new Set(state.word.split(''))].filter(ch=>ch!==' ' && !state.guessed.has(ch));
  }
  function shuffleArr(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }
  function updateHintTierButtons(){
    const t1 = document.getElementById('hintTier1');
    const t2 = document.getElementById('hintTier2');

    t1.disabled = state.tier1Used;
    t1.classList.toggle('used', state.tier1Used);

    t2.classList.toggle('free-token', state.freeHints > 0);
    if(state.tier2Used){
      t2.disabled = true;
      t2.innerHTML = `🔀 50/50`;
    } else if(state.freeHints > 0){
      t2.disabled = false;
      t2.innerHTML = `🔀 50/50 <b>free ×${state.freeHints}</b>`;
    } else {
      t2.disabled = state.lives <= 1;
      t2.innerHTML = `🔀 50/50 <b>−1</b>`;
    }
  }

  function renderStreakRow(){
    const el = document.getElementById('streakRow');
    if(state.freeHints > 0){
      el.textContent = `🎁 ${state.freeHints} free hint${state.freeHints>1?'s':''} banked from your no-hint streak!`;
    } else if(state.streak > 0){
      const remaining = 3 - (state.wordsSinceFreeHint % 3);
      el.textContent = `no-hint streak: ${state.streak} · ${remaining} more word${remaining>1?'s':''} to earn a free hint`;
    } else {
      el.textContent = '';
    }
  }

  /* =========================================================
     GUESSING LOGIC
     ========================================================= */
  function guessLetter(letter, source){
    if(state.guessed.has(letter) || state.lives<=0) return;
    const btn = document.querySelector(`.key[data-letter="${letter}"]`);
    state.guessed.add(letter);

    if(source === 'key' && btn){
      btn.classList.remove('key-press'); void btn.offsetWidth; btn.classList.add('key-press');
    }
    Audio2.keyClick();

    if(state.word.includes(letter)){
      if(btn){ btn.classList.add('correct'); btn.disabled=true; }
      renderWord(true);
      showMsg('Nice — correct guess!', 'good');
      Audio2.correct();
      checkWin();
    } else {
      if(btn){ btn.classList.add('wrong'); btn.disabled=true; btn.classList.add('shake'); setTimeout(()=>btn.classList.remove('shake'),400); }
      const cost = VOWELS.has(letter) ? 2 : 1;
      const before = state.lives;
      state.lives = Math.max(0, state.lives - cost);
      const actuallyLost = before - state.lives;
      updateLivesRow();
      for(let i=0;i<actuallyLost;i++) popHeadBalloon();
      Audio2.pop();
      triggerWrongFeedback();
      const monster = document.getElementById('monsterGroup');
      monster.classList.remove('angry'); void monster.offsetWidth; monster.classList.add('angry');
      const progress = 1 - (state.lives/state.maxLives);
      setFigureDanger(Math.min(1, progress));
      updateHintTierButtons();
      if(state.lives<=0){
        revealFullWord();
        showMsg(`Caught! The word was "${state.word.toUpperCase()}"`, 'warn');
        gameOver();
      } else {
        showMsg(cost>1 ? 'Vowels cost more — not in the word! (−2 balloons)' : 'Not in the word — careful! (−1 balloon)', 'warn');
      }
    }
  }

  function triggerWrongFeedback(){
    const card = document.getElementById('cardEl');
    card.classList.remove('shake-screen'); void card.offsetWidth; card.classList.add('shake-screen');
    setTimeout(()=>card.classList.remove('shake-screen'), 460);

    const flash = document.getElementById('flash');
    flash.classList.remove('soft-on'); void flash.offsetWidth; flash.classList.add('soft-on');
  }

  function showMsg(text, kind){
    const el=document.getElementById('msgRow');
    el.textContent=text; el.className='msg-row'+(kind?' '+kind:'');
  }

  function checkWin(){
    const solved = [...state.word].every(ch=> ch===' ' || state.guessed.has(ch));
    if(solved){
      state.saved += 1;
      document.getElementById('savedVal').textContent = state.saved;

      // streak / hint-economy bookkeeping
      if(state.hintsUsedThisWord === 0){
        state.streak += 1;
        state.wordsSinceFreeHint += 1;
        if(state.wordsSinceFreeHint >= 3){
          state.wordsSinceFreeHint = 0;
          state.freeHints += 1;
          Audio2.freeHint();
        }
      } else {
        state.streak = 0;
      }
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      document.getElementById('streakVal').textContent = state.streak;
      document.getElementById('bestStreakVal').textContent = state.bestStreak;

      showMsg('Saved! Off to the next word...', 'good');
      Audio2.win();
      disableKeyboard();
      const fig = document.getElementById('figureGroup');
      fig.classList.add('fly-away');
      setTimeout(()=>{
        fig.classList.remove('fly-away');
        fig.style.opacity = 1;
        setFigureDanger(0);
        loadWord();
      }, 900);
    }
  }

  function disableKeyboard(){ document.querySelectorAll('.key').forEach(k=>k.disabled=true); }

  function gameOver(){
    disableKeyboard();
    pauseMenuMusic();
    playLoseMusic();
    Audio2.lose();
    const flash = document.getElementById('flash');
    const teeth = document.getElementById('frontTeeth');
    teeth.classList.remove('chomp'); void teeth.offsetWidth; teeth.classList.add('chomp');
    setTimeout(()=>{
      flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
      setFigureFace(true);
      const figGroup = document.getElementById('figureGroup');
      figGroup.style.setProperty('--dropY', '55px');
      figGroup.style.transformOrigin = '120px 140px';
      figGroup.style.transform = 'translateY(55px) scale(1)';
      figGroup.style.opacity = 1;
      figGroup.classList.remove('cry-shake'); void figGroup.offsetWidth; figGroup.classList.add('cry-shake');
    }, 420);
    state.best = Math.max(state.best, state.saved);
    document.getElementById('bestVal').textContent = state.best;
    setSkyMood(1);
    setTimeout(()=>{
      showScreen('end');

      const endWrap = document.querySelector('#screen-end .end-wrap');
      const endGlyphEl = document.getElementById('endGlyph');
      endWrap.classList.add('loss-mode');
      endGlyphEl.classList.add('loss-image');
      endGlyphEl.innerHTML = '<img src="assets/images/game-over.png" alt="SpongeBob crying in bed">';

      document.getElementById('endTitle').textContent = 'YOU LOSE';
      document.getElementById('endSub').textContent = 'The word got away...';

      document.getElementById('statSaved').textContent = state.saved;
      document.getElementById('statBest').textContent = state.best;
      document.getElementById('statStreak').textContent = state.bestStreak;
      document.getElementById('endWord').textContent = `The word that got away: ${state.word.toUpperCase()}`;
      if(state.saved>0 && state.saved>=state.best) launchConfetti();
    }, 900);
  }

  /* =========================================================
     TIER 1 — free contextual clue (once per word)
     ========================================================= */
  document.getElementById('hintTier1').addEventListener('click', ()=>{
    if(state.tier1Used) return;
    state.tier1Used = true;
    const w = state.word.replace(/ /g,'');
    const startsVowel = VOWELS.has(w[0]);
    const hasDouble = /(.)\1/.test(w);
    document.getElementById('tier1ClueText').textContent =
      `📏 ${state.word.length} letters · starts with a ${startsVowel?'vowel':'consonant'}${hasDouble?' · has a repeated letter':''}`;
    Audio2.freeHint();
    updateHintTierButtons();
  });

  /* =========================================================
     TIER 2 — eliminate 3–4 dead letters, 50/50 style
       (−1 balloon, or free if a streak token is banked; once per word)
     ========================================================= */
  document.getElementById('hintTier2').addEventListener('click', ()=>{
    if(state.tier2Used) return;
    let usedFree = false;
    if(state.freeHints > 0){
      state.freeHints -= 1;
      usedFree = true;
    } else {
      const cost = 1;
      if(state.lives <= cost) return;
      state.lives -= cost;
      updateLivesRow();
      popHeadBalloon();
      const progress = 1 - (state.lives/state.maxLives);
      setFigureDanger(Math.min(1, progress));
    }
    state.tier2Used = true;

    const pool = shuffleArr("abcdefghijklmnopqrstuvwxyz".split('').filter(l => !state.word.includes(l) && !state.guessed.has(l)));
    const chosen = pool.slice(0, Math.min(pool.length, 3 + Math.round(Math.random())));
    chosen.forEach(l=>{
      state.guessed.add(l);
      const btn = document.querySelector(`.key[data-letter="${l}"]`);
      if(btn){ btn.classList.add('wrong'); btn.disabled = true; }
    });

    state.hintsUsedThisWord += 1;
    Audio2.hint();
    showMsg(usedFree
      ? `Free hint used — eliminated ${chosen.length} dead letters!`
      : `Eliminated ${chosen.length} dead letters from the keyboard.`, 'good');
    updateHintTierButtons();
    renderStreakRow();
  });

  /* =========================================================
     PHYSICAL KEYBOARD SUPPORT
     ========================================================= */
  document.addEventListener('keydown', (e)=>{
    if(!screens.game.classList.contains('active')) return;
    const k = e.key.toLowerCase();
    if(k.length===1 && k>='a' && k<='z'){
      const btn = document.querySelector(`.key[data-letter="${k}"]`);
      if(btn && !btn.disabled) guessLetter(k, 'key');
    } else if(k === 'escape'){
      showScreen('setup');
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      if(screens.setup.classList.contains('active') && !startBtn.disabled) startBtn.click();
      else if(screens.end.classList.contains('active')) document.getElementById('playAgainBtn').click();
    }
  });

  /* =========================================================
     CONFETTI (win celebration)
     ========================================================= */
  function launchConfetti(){
    const holder=document.createElement('div'); holder.className='confetti'; document.body.appendChild(holder);
    const colors=['#d43d3d','#f0b72f','#2f9e5c','#6fb7c9','#1c1c1c'];
    for(let i=0;i<70;i++){
      const s=document.createElement('span');
      const size=5+Math.random()*6;
      s.style.left=Math.random()*100+'vw';
      s.style.width=size+'px'; s.style.height=(size*1.6)+'px';
      s.style.background=colors[Math.floor(Math.random()*colors.length)];
      s.style.animationDuration=(2.4+Math.random()*1.6)+'s';
      s.style.animationDelay=(Math.random()*0.4)+'s';
      holder.appendChild(s);
    }
    setTimeout(()=>holder.remove(),4200);
  }
})();
