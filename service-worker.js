const CACHE_NAME = 'uf-cache-2026040303';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './bg_meadow.jpg',
  './bg_meadow_decay.jpg',
  './bg_forest.jpg',
  './bg_forest_decay.jpg',
  './bg_village.jpg',
  './bg_village_decay.jpg',
  './bg_waterfall.jpg',
  './bg_waterfall_decay.jpg',
  './cloud_01.png',
  './cloud_02.png',
  './cloud_03.png',
  './rain_overlay.png',
  './snow_overlay.png',
  './bgm1.mp3',
  './bgm2.mp3',
  './bgm3.mp3',
  './bgm4.mp3',
  './bgm5.mp3'
];

// インストール時にアセットをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache First 戦略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // 成功したレスポンスをキャッシュに追加
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
