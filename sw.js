// Zen service worker — network-first (always fresh online) + offline fallback
const VERSION = 'zen-v4';
const CORE = [
  'index.html',
  'offline.html',
  'styles.css',
  'app.css',
  'zen.css',
  'zen.js',
  'shared.js',
  'app-shell.js',
  'icon.svg',
  'manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Cache files individually so one failure doesn't abort the whole precache
    await Promise.allSettled(CORE.map(u => cache.add(new Request(u, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first with revalidation. Online → always latest from server.
  // Offline → fall back to cache, and to offline.html for navigations.
  e.respondWith((async () => {
    try {
      // {cache:'no-cache'} forces revalidation with the server (conditional request),
      // so we never serve a stale file from the browser HTTP cache while online.
      const fresh = await fetch(req, { cache: 'no-cache' });
      if (fresh && fresh.status === 200 && fresh.type === 'basic') {
        const copy = fresh.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
      }
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        return (await caches.match('offline.html')) || Response.error();
      }
      return Response.error();
    }
  })());
});
