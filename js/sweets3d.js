// โมเดลขนมไทย 3D และข้อมูลขนม ใช้ร่วมกันทุกเกม (ต้องโหลด vendor/three.min.js ก่อน)
(function () {
  const REF = {
    michelin: { t: 'Michelin Guide: ขนมมงคล 9 อย่าง', u: 'https://guide.michelin.com/th/th/article/features/9-auspicious-thai-desserts' },
    tf9: { t: 'Thailand Foundation: Nine Auspicious Thai Desserts', u: 'https://thailandfoundation.or.th/nine-auspicious-thai-desserts/' },
    silpa: { t: 'ศิลปวัฒนธรรม: ท้าวทองกีบม้ากับขนมหวาน', u: 'https://www.silpa-mag.com/history/article_16626' },
    lukchup: { t: 'Thailand Foundation: Luk Chup', u: 'https://thailandfoundation.or.th/?p=519494' },
    chan: { t: 'Wikipedia: Khanom chan', u: 'https://en.wikipedia.org/wiki/Khanom_chan' },
    antho: { t: 'Wikipedia: Anthocyanin', u: 'https://en.wikipedia.org/wiki/Anthocyanin' },
    fios: { t: 'Wikipedia: Fios de ovos', u: 'https://en.wikipedia.org/wiki/Fios_de_ovos' }
  };
  const DATA = [
    { name: 'ทองหยอด', pts: 10, color: '#f5b324', fact: 'ทำจากไข่แดง แป้ง และน้ำตาล หยอดลงในน้ำเชื่อมเดือดจนสุกเป็นเม็ดกลมสีทอง', meaning: 'สื่อว่าจะมีเงินทองใช้ไม่ขาดมือ', refs: [REF.michelin, REF.tf9] },
    { name: 'ทองหยิบ', pts: 15, color: '#f08a24', fact: 'ทำจากไข่แดง ต้มในน้ำเชื่อมแล้วหยิบมาจีบเป็นกลีบดอกไม้ เชื่อกันว่าท้าวทองกีบม้านำขนมตำรับโปรตุเกสมาปรับใช้ในสมัยอยุธยา', meaning: 'สื่อว่าหยิบจับสิ่งใดก็เป็นเงินเป็นทอง', refs: [REF.silpa, REF.michelin] },
    { name: 'ลูกชุบ', pts: 20, color: '#e5405e', fact: 'ทำจากถั่วเขียวกวนกับกะทิและน้ำตาล ปั้นเป็นผลไม้จิ๋ว แต้มสี แล้วชุบวุ้นให้เงา บางแหล่งระบุว่าตำรับเดิมสมัยอยุธยาใช้อัลมอนด์ ก่อนเปลี่ยนมาใช้ถั่วเขียว', meaning: 'ชื่อมาจาก "ลูก" ที่หมายถึงชิ้นเล็ก และ "ชุบ" ที่หมายถึงการจุ่มเคลือบ', refs: [REF.lukchup] },
    { name: 'ขนมชั้น', pts: 25, color: '#4fbf55', fact: 'นึ่งทีละชั้น นิยมทำ 9 ชั้น เพราะ "เก้า" พ้องเสียงกับ "ก้าว" สีเขียวมาจากใบเตย', meaning: 'สื่อถึงการเลื่อนชั้น เลื่อนตำแหน่งในหน้าที่การงาน', refs: [REF.chan, REF.michelin] },
    { name: 'ช่อม่วง', pts: 20, color: '#9a5bd8', fact: 'ขนมไทยไส้เค็ม แป้งบางนุ่มห่อไส้แล้วจีบเป็นช่อดอกไม้ สีม่วงมาจากดอกอัญชันซึ่งมีสารแอนโทไซยานิน', meaning: 'ขึ้นชื่อเรื่องความประณีตในการจีบแป้ง', refs: [REF.antho] },
    { name: 'กลีบลำดวน', pts: 15, color: '#e8cf98', fact: 'ปั้นเป็นรูปกลีบดอกลำดวน ทำจากแป้ง น้ำตาล และกะทิ แล้วอบ มักอบควันเทียนให้หอม', meaning: 'ตั้งชื่อตามดอกลำดวน ดอกไม้กลิ่นหอมของไทย', refs: [] },
    { name: 'ฝอยทอง', pts: 20, color: '#f7c531', fact: 'โรยไข่แดงเป็นเส้นบาง ๆ ลงในน้ำเชื่อมเดือด ดัดแปลงจากขนมโปรตุเกส fios de ovos ที่แปลว่า "เส้นไข่"', meaning: 'เส้นที่ยาวสื่อถึงอายุที่ยืนยาว', refs: [REF.fios, REF.silpa] },
    { name: 'เม็ดขนุน', pts: 15, color: '#f2a516', fact: 'ทำจากถั่วเขียวกวน ปั้นเป็นรูปเมล็ดขนุน ชุบไข่แดงแล้วต้มในน้ำเชื่อม', meaning: 'สื่อว่าจะมีคนคอยหนุนนำ ช่วยให้ก้าวหน้า', refs: [REF.michelin] },
    { name: 'ขนมถ้วยฟู', pts: 15, color: '#ffb3c9', fact: 'ขนมนึ่งในถ้วยเล็กที่ขึ้นฟูจนผิวด้านบนแตกเป็นดอก เป็นหนึ่งในชุดขนมมงคล 9 อย่าง', meaning: 'นิยมตีความว่าความฟูหมายถึงความเฟื่องฟู', refs: [REF.tf9] },
    { name: 'จ่ามงกุฎ', pts: 30, color: '#c98a2b', fact: 'ขนมโบราณรูปทรงคล้ายมงกุฎ ทำยากและประณีต มักแต่งด้วยทองคำเปลว อยู่ในชุดขนมมงคล 9 อย่าง', meaning: 'สื่อถึงความเจริญก้าวหน้า มียศตำแหน่งเป็นที่นับหน้าถือตา', refs: [REF.michelin] }
  ];

  let M = null;
  const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .7, ...o });
  const glaze = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: .28, metalness: .05, clearcoat: 1, clearcoatRoughness: .15, ...o });
  function mats() {
    if (M) return M;
    M = {
      gold: glaze(0xf5b324), orange: glaze(0xf08a24), chub: glaze(0xe5405e, { roughness: .18, clearcoatRoughness: .05 }),
      leaf: std(0x3fae49, { roughness: .45 }), stem: std(0x6b4423),
      layerG: std(0x4fbf55, { roughness: .5 }), layerW: std(0xeaf6d6, { roughness: .55 }),
      purple: std(0x9a5bd8, { roughness: .45 }), purpleDark: std(0x7a3fb8, { roughness: .45 }),
      cream: std(0xf4e3bd, { roughness: .85 }), toasted: std(0xe0bf82, { roughness: .8 }),
      thread: glaze(0xf7c531, { roughness: .35 }), seed: glaze(0xf2a516),
      cup: std(0xfff0f4, { roughness: .6 }), fu: std(0xffb3c9, { roughness: .95 }), fuTop: std(0xffd6e2, { roughness: .95 }),
      jam: std(0xc98a2b, { roughness: .55 }), jamDark: std(0xa86a1c, { roughness: .55 }),
      leafGold: new THREE.MeshStandardMaterial({ color: 0xffd84a, metalness: .35, roughness: .3, emissive: 0x7a5200, side: THREE.DoubleSide }),
      pearl: glaze(0xfff8e8)
    };
    return M;
  }
  function mesh(geo, mat, x = 0, y = 0, z = 0) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; return m; }

  // ขนาดประมาณ 1 หน่วย ฐานอยู่ที่ y = 0
  function makeSweet(t) {
    const M = mats(), g = new THREE.Group();
    if (t === 0) { // ทองหยอด
      const b = mesh(new THREE.SphereGeometry(.36, 32, 24), M.gold, 0, .3, 0); b.scale.set(1, .85, 1); g.add(b);
      g.add(mesh(new THREE.ConeGeometry(.12, .22, 20), M.gold, 0, .65, 0));
    } else if (t === 1) { // ทองหยิบ
      const pg = new THREE.SphereGeometry(.22, 24, 16);
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2, p = mesh(pg, M.orange, Math.cos(a) * .27, .2, Math.sin(a) * .27);
        p.scale.set(1.25, .45, .8); p.rotation.set(0, -a, .35); g.add(p);
      }
      const c = mesh(new THREE.SphereGeometry(.17, 24, 16), M.gold, 0, .3, 0); c.scale.set(1, .8, 1); g.add(c);
      g.add(mesh(new THREE.SphereGeometry(.07, 16, 12), M.orange, 0, .43, 0));
    } else if (t === 2) { // ลูกชุบ
      const b = mesh(new THREE.SphereGeometry(.32, 32, 24), M.chub, 0, .38, 0); b.scale.set(.9, 1.15, .9); b.rotation.z = .35; g.add(b);
      const lf = mesh(new THREE.SphereGeometry(.18, 16, 10), M.leaf, .02, .76, 0); lf.scale.set(1, .12, .45); lf.rotation.z = -.4; g.add(lf);
      g.add(mesh(new THREE.CylinderGeometry(.02, .025, .12, 8), M.stem, -.08, .74, 0));
    } else if (t === 3) { // ขนมชั้น 9 ชั้น
      const sub = new THREE.Group(), lg = new THREE.BoxGeometry(.7, .065, .7);
      for (let i = 0; i < 9; i++) sub.add(mesh(lg, i % 2 ? M.layerW : M.layerG, 0, .05 + i * .065, 0));
      sub.rotation.y = Math.PI / 4; g.add(sub);
    } else if (t === 4) { // ช่อม่วง
      const b = mesh(new THREE.SphereGeometry(.34, 32, 20), M.purple, 0, .22, 0); b.scale.set(1, .6, 1); g.add(b);
      const cg = new THREE.ConeGeometry(.06, .26, 12);
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2, c = mesh(cg, i % 2 ? M.purple : M.purpleDark, Math.cos(a) * .17, .44, Math.sin(a) * .17);
        c.rotation.set(-Math.sin(a) * .45, 0, Math.cos(a) * .45); g.add(c);
      }
      g.add(mesh(new THREE.ConeGeometry(.07, .3, 12), M.purpleDark, 0, .5, 0));
    } else if (t === 5) { // กลีบลำดวน
      const pg = new THREE.SphereGeometry(.2, 24, 16);
      for (let i = 0; i < 3; i++) {
        const a = i / 3 * Math.PI * 2, p = mesh(pg, M.cream, Math.cos(a) * .2, .14, Math.sin(a) * .2);
        p.scale.set(1.3, .55, .8); p.rotation.set(0, -a, .15); g.add(p);
      }
      g.add(mesh(new THREE.SphereGeometry(.11, 16, 12), M.toasted, 0, .3, 0));
    } else if (t === 6) { // ฝอยทอง: ขดเส้นไข่
      const tg = new THREE.TorusGeometry(.26, .024, 6, 48), nest = new THREE.Group();
      for (let i = 0; i < 9; i++) {
        const r = mesh(tg, M.thread, 0, 0, 0);
        r.rotation.set(Math.PI / 2 + Math.sin(i * 2.1) * .7, i * .7, Math.cos(i * 1.7) * .5); nest.add(r);
      }
      nest.scale.set(1.1, .6, 1.1); nest.position.y = .22; g.add(nest);
    } else if (t === 7) { // เม็ดขนุน
      const b = mesh(new THREE.SphereGeometry(.3, 32, 24), M.seed, 0, .24, 0); b.scale.set(1.25, .8, .85); g.add(b);
      const tip = mesh(new THREE.SphereGeometry(.07, 12, 10), M.seed, .34, .26, 0); g.add(tip);
    } else if (t === 8) { // ขนมถ้วยฟู
      g.add(mesh(new THREE.CylinderGeometry(.3, .23, .26, 28), M.cup, 0, .13, 0));
      const sg = new THREE.SphereGeometry(.17, 20, 14);
      [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(([a, b]) => { const s = mesh(sg, M.fu, a * .1, .32, b * .1); s.scale.y = .85; g.add(s); });
      g.add(mesh(new THREE.SphereGeometry(.13, 20, 14), M.fuTop, 0, .42, 0));
    } else { // จ่ามงกุฎ
      g.add(mesh(new THREE.CylinderGeometry(.3, .34, .22, 8), M.jam, 0, .11, 0));
      const cg = new THREE.ConeGeometry(.055, .17, 8);
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; g.add(mesh(cg, M.jamDark, Math.cos(a) * .26, .3, Math.sin(a) * .26)); }
      const dome = mesh(new THREE.SphereGeometry(.15, 20, 14), M.jamDark, 0, .26, 0); dome.scale.y = .9; g.add(dome);
      const leaf = mesh(new THREE.PlaneGeometry(.16, .16), M.leafGold, 0, .43, 0); leaf.rotation.set(-1.2, .5, .3); g.add(leaf);
    }
    return g;
  }
  // ขนมรวมมิตร (ชิ้นพิเศษ ล้างขนมทั้งสี)
  function makeBomb(colors) {
    const M = mats(), g = new THREE.Group(), ring = new THREE.Group(); ring.name = 'ring';
    g.add(mesh(new THREE.SphereGeometry(.28, 32, 24), M.pearl, 0, .35, 0));
    const bg = new THREE.SphereGeometry(.12, 20, 14);
    colors.forEach((c, i) => { const a = i / colors.length * Math.PI * 2; ring.add(mesh(bg, glaze(new THREE.Color(c).getHex()), Math.cos(a) * .4, 0, Math.sin(a) * .4)); });
    ring.position.y = .35; g.add(ring);
    return g;
  }
  function addLights(scene, pos, target, intensity = .95) {
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a6a4a, .9));
    const d = new THREE.DirectionalLight(0xfff0d8, intensity); d.position.copy(pos); d.target.position.copy(target); scene.add(d, d.target); return d;
  }
  // ถ่ายภาพโมเดลเป็น canvas สำหรับใช้เป็นไอคอน 2D
  function sprites(types, size = 160) {
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    r.setPixelRatio(1); r.setSize(size, size, false);
    const s = new THREE.Scene(); addLights(s, new THREE.Vector3(-2, 4, 4), new THREE.Vector3(0, 0, 0));
    const cam = new THREE.PerspectiveCamera(30, 1, .1, 20); cam.position.set(0, 1.25, 2.1); cam.lookAt(0, .32, 0);
    const out = types.map(i => {
      const m = makeSweet(i); s.add(m); r.render(s, cam); s.remove(m);
      const c = document.createElement('canvas'); c.width = c.height = size; c.getContext('2d').drawImage(r.domElement, 0, 0); return c;
    });
    r.dispose(); return out;
  }

  window.Sweets3D = { DATA, REF, makeSweet, makeBomb, addLights, sprites, mats, std, glaze, mesh };
})();
