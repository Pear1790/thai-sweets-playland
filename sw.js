// เก็บไฟล์ทั้งหมดไว้ในเครื่อง เพื่อให้เปิดเล่นได้แม้ไม่มีอินเทอร์เน็ต
// เปลี่ยนเลขเวอร์ชันทุกครั้งที่แก้ไฟล์ เพื่อให้ผู้เล่นได้ไฟล์ใหม่
const CACHE = 'thai-games-v2';
const FILES = [
  './', 'index.html', 'kitchen-3d.html', 'market-dash-3d.html', 'thai-sweets.html', 'quiz-rush.html', 'ai-guide.html', 'tomyum.html',
  'manifest.webmanifest', 'js/hub.js', 'js/sweets3d.js', 'vendor/three.min.js',
  'vendor/fonts/kanit.css', 'vendor/fonts/kanit-thai-400.woff2', 'vendor/fonts/kanit-thai-600.woff2', 'vendor/fonts/kanit-thai-700.woff2',
  'vendor/fonts/kanit-latin-400.woff2', 'vendor/fonts/kanit-latin-600.woff2', 'vendor/fonts/kanit-latin-700.woff2',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// ใช้ไฟล์จากเครื่องก่อน ถ้าไม่มีจึงโหลดจากเน็ตแล้วเก็บไว้
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  })));
});
