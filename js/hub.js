// ระบบส่วนกลางของทุกหน้า: โปรไฟล์ สถิติ เหรียญรางวัล กระดานคะแนนในเครื่อง และเพลงระนาด
(function () {
  const KEY = 'thai-hub';
  let S = { name: '', avatar: '🍮', stats: {}, ach: {}, visited: {}, seen: {}, board: {}, music: false };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  const PAGES = { hub: 'เมนูหลัก', pop: 'ขนมไทยป๊อป', dash: 'ตลาดน้ำซิ่ง', quiz: 'Quiz Rush', guide: 'สารานุกรม AI', tomyum: 'Tom Yum Rush', kitchen: 'ครัวขนมไทย' };
  const GAMES = { dash: 'ตลาดน้ำซิ่ง 3D', pop: 'ขนมไทยป๊อป (ดาวรวม)', quiz: 'Quiz Rush', kitchen: 'ครัวขนมไทย (ดาวรวม)', tomyum: 'Tom Yum Rush' };
  const st = k => S.stats[k] || 0;
  const ACH = [
    { id: 'pop1', icon: '🍮', t: 'ป๊อปครั้งแรก', d: 'ผ่านด่านแรกของขนมไทยป๊อป', ok: () => st('pop.levels') >= 1 },
    { id: 'pop8', icon: '🎯', t: 'ครึ่งทางขนมหวาน', d: 'ผ่านขนมไทยป๊อป 8 ด่าน', ok: () => st('pop.levels') >= 8 },
    { id: 'popAll', icon: '👑', t: 'ราชาจับคู่', d: 'ผ่านขนมไทยป๊อปครบ 16 ด่าน', ok: () => st('pop.levels') >= 16 },
    { id: 'pop3', icon: '⭐', t: 'สามดาวห้าด่าน', d: 'ได้ 3 ดาว 5 ด่าน', ok: () => st('pop.three') >= 5 },
    { id: 'cards', icon: '📖', t: 'นักสะสมความรู้', d: 'เก็บการ์ดความรู้ครบ 16 ใบ', ok: () => st('pop.cards') >= 16 },
    { id: 'dash500', icon: '🛶', t: 'ฝีพายมือใหม่', d: 'พายเรือได้ 500 เมตร', ok: () => st('dash.dist') >= 500 },
    { id: 'dash2k', icon: '🌊', t: 'ฝีพายเจ้าคลอง', d: 'พายเรือได้ 2,000 เมตร', ok: () => st('dash.dist') >= 2000 },
    { id: 'dash100', icon: '🧺', t: 'ตะกร้าเต็ม', d: 'เก็บขนมในตลาดน้ำสะสม 100 ชิ้น', ok: () => st('dash.total') >= 100 },
    { id: 'allSweets', icon: '🏆', t: 'ครบสิบขนม', d: 'ค้นพบขนมไทยครบทั้ง 10 ชนิด', ok: () => Object.keys(S.seen).length >= 10 },
    { id: 'quiz3k', icon: '⚡', t: 'นักปั่นตัวจริง', d: 'Quiz Rush ได้ 3,000 แต้มขึ้นไป', ok: () => st('quiz.best') >= 3000 },
    { id: 'streak10', icon: '🔥', t: 'ถูกรัว ๆ', d: 'ตอบควิซถูกติดกัน 10 ข้อ', ok: () => st('quiz.streak') >= 10 },
    { id: 'quiz100', icon: '🧠', t: 'ร้อยข้อแม่นยำ', d: 'ตอบควิซถูกสะสม 100 ข้อ', ok: () => st('quiz.correct') >= 100 },
    { id: 'teacher', icon: '🧑‍🏫', t: 'คุณครูใจดี', d: 'สร้างชุดคำถามของตัวเองในโหมดครู', ok: () => st('quiz.sets') >= 1 },
    { id: 'cook1', icon: '🧑‍🍳', t: 'ขนมจานแรก', d: 'ทำขนมในครัวขนมไทยสำเร็จ', ok: () => st('kitchen.recipes') >= 1 },
    { id: 'cookAll', icon: '🍽️', t: 'ครบทุกสูตร', d: 'ทำขนมครบทุกเมนูในครัว', ok: () => st('kitchen.recipes') >= 3 },
    { id: 'cookMaster', icon: '🥇', t: 'มือทองแห่งวัง', d: 'ได้ 3 ดาวทุกเมนูในครัว', ok: () => st('kitchen.three') >= 3 },
    { id: 'tomyum', icon: '🍲', t: 'ต้มยำเข้มข้น', d: 'Tom Yum Rush ได้ 300 แต้ม', ok: () => st('tomyum.best') >= 300 },
    { id: 'prompt5', icon: '🤖', t: 'นักสั่ง AI', d: 'คัดลอกพรอมต์ไปลองใช้ 5 ครั้ง', ok: () => st('guide.copied') >= 5 },
    { id: 'explorer', icon: '🗺️', t: 'นักสำรวจ', d: 'เปิดครบทุกเมนู', ok: () => Object.keys(PAGES).every(p => S.visited[p]) }
  ];
  const TITLES = ['ลูกมือหัดใหม่', 'แม่ครัวฝึกหัด', 'แม่ค้าตลาดน้ำ', 'เชฟขนมไทย', 'ครูขนมไทย', 'ปรมาจารย์ขนมไทย', 'ตำนานห้องเครื่องวัง'];

  // ---------- toast ----------
  let toastBox = null;
  function toast(title, body, icon = '🏅') {
    if (!document.body) return;
    if (!toastBox) {
      toastBox = document.createElement('div');
      toastBox.style.cssText = 'position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:min(380px,92vw)';
      document.body.appendChild(toastBox);
    }
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center;padding:10px 14px;border-radius:16px;background:linear-gradient(#fff3d1,#f1d595);color:#4a2a10;border:3px solid #c8861f;box-shadow:0 10px 24px rgba(0,0,0,.35);font-family:Kanit,"Noto Sans Thai",system-ui,sans-serif;transition:opacity .4s,transform .4s;opacity:0;transform:translateY(-10px)';
    const i = document.createElement('div'); i.textContent = icon; i.style.cssText = 'font-size:30px';
    const tx = document.createElement('div');
    const a = document.createElement('div'); a.textContent = title; a.style.cssText = 'font-weight:700;color:#a04a00';
    const b = document.createElement('div'); b.textContent = body; b.style.cssText = 'font-size:13px';
    tx.append(a, b); d.append(i, tx); toastBox.appendChild(d);
    requestAnimationFrame(() => { d.style.opacity = 1; d.style.transform = 'none'; });
    setTimeout(() => { d.style.opacity = 0; setTimeout(() => d.remove(), 450); }, 3800);
  }

  // ---------- stats & achievements ----------
  function check() {
    let changed = false;
    for (const a of ACH) if (!S.ach[a.id] && a.ok()) {
      S.ach[a.id] = Date.now(); changed = true;
      toast('ปลดล็อกเหรียญ: ' + a.t, a.d, a.icon); chime();
    }
    if (changed) save();
  }
  function stat(key, val, op = 'max') {
    const cur = S.stats[key] || 0;
    const next = op === 'add' ? cur + val : op === 'set' ? val : Math.max(cur, val);
    if (next !== cur) { S.stats[key] = next; save(); }
    check();
  }
  function seeSweet(i) { if (!S.seen[i]) { S.seen[i] = Date.now(); save(); check(); } }
  function visit(page) { if (!S.visited[page]) { S.visited[page] = Date.now(); save(); } check(); }
  function xp() {
    return Math.round(st('pop.stars') * 40 + st('pop.kp') * 15 + st('dash.best') / 20 + st('quiz.best') / 30 +
      st('kitchen.stars') * 40 + st('tomyum.best') / 5 + Object.keys(S.ach).length * 100 + Object.keys(S.seen).length * 20);
  }
  function level() {
    const x = xp(), lv = Math.floor(Math.sqrt(x / 120)) + 1, base = 120 * (lv - 1) ** 2, next = 120 * lv ** 2;
    return { xp: x, lv, title: TITLES[Math.min(TITLES.length - 1, lv - 1)], progress: (x - base) / (next - base), next };
  }

  // ---------- local leaderboard ----------
  // unique: เก็บแถวเดียวต่อชื่อ (ใช้กับคะแนนสะสม เช่น ดาวรวม)
  function submit(game, score, unique = false) {
    score = Math.floor(score); if (!(score > 0)) return;
    const name = S.name || 'ผู้เล่น';
    let list = S.board[game] || [];
    if (unique) list = list.filter(r => r.n !== name);
    list.push({ n: name, a: S.avatar, s: score, d: Date.now() });
    list.sort((x, y) => y.s - x.s); S.board[game] = list.slice(0, 10); save();
  }

  // ---------- ระนาด music (WebAudio) ----------
  let ac = null, timer = null, nextT = 0, step = 0, note = 7;
  const SCALE = [0, 2, 4, 7, 9]; // ห้าเสียง
  const freq = i => 392 * Math.pow(2, (Math.floor(i / 5) * 12 + SCALE[((i % 5) + 5) % 5]) / 12);
  function ctx() { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac; }
  function ranat(f, t, v = .09) {
    const o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain();
    o.type = 'triangle'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2.76;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .45);
    const g2 = ac.createGain(); g2.gain.value = .25; o2.connect(g2); g2.connect(g);
    o.connect(g); g.connect(ac.destination); o.start(t); o2.start(t); o.stop(t + .5); o2.stop(t + .5);
  }
  function ching(t, open) { // ฉิ่ง: เสียงเปิด/ปิด
    const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = open ? 2650 : 2400;
    g.gain.setValueAtTime(open ? .035 : .03, t); g.gain.exponentialRampToValueAtTime(.0001, t + (open ? .5 : .08));
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + .55);
  }
  function tick() {
    const beat = .2;
    while (nextT < ac.currentTime + .3) {
      if (step % 16 === 0 && Math.random() < .25) { for (let k = 0; k < 4; k++) ranat(freq(note), nextT + k * beat / 4, .05); } // รัว
      else if (step % 2 === 0 || Math.random() < .55) {
        note = Math.max(3, Math.min(13, note + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
        ranat(freq(note), nextT); if (step % 4 === 0) ranat(freq(note - 5), nextT, .05);
      }
      if (step % 4 === 0) ching(nextT, true); else if (step % 4 === 2) ching(nextT, false);
      nextT += beat; step++;
    }
  }
  function musicOn(on) {
    S.music = on; save(); updateBtn();
    if (on) { try { ctx(); nextT = ac.currentTime + .05; clearInterval(timer); timer = setInterval(tick, 90); } catch (e) {} }
    else clearInterval(timer);
  }
  function chime() { try { ctx(); const t = ac.currentTime; [0, 4, 7].forEach((n, i) => ranat(freq(7 + n), t + i * .09, .07)); } catch (e) {} }
  let btn = null;
  function updateBtn() { if (btn) { btn.textContent = S.music ? '🎵' : '🔇'; btn.title = S.music ? 'ปิดเพลงระนาด' : 'เปิดเพลงระนาด'; btn.style.opacity = S.music ? 1 : .7; } }
  function mountMusic(pos = 'right:12px;bottom:12px') {
    btn = document.createElement('button');
    btn.setAttribute('aria-label', 'เปิดหรือปิดเพลง');
    btn.style.cssText = 'position:fixed;' + pos + ';z-index:9000;width:42px;height:42px;border-radius:50%;border:2px solid #ffd36a;background:rgba(30,15,0,.55);color:#fff;font-size:20px;cursor:pointer;backdrop-filter:blur(3px)';
    btn.onclick = e => { e.stopPropagation(); musicOn(!S.music); };
    document.body.appendChild(btn); updateBtn();
    if (S.music) addEventListener('pointerdown', function once() { removeEventListener('pointerdown', once); if (S.music && !timer) musicOn(true); });
  }

  window.Hub = { S, PAGES, GAMES, ACH, stat, seeSweet, visit, xp, level, submit, toast, save, mountMusic, musicOn, chime };
})();
