/* Chalo Kisaan Service Worker v3.0 */
// Bump version on every deploy — forces activate to purge stale caches
const CACHE_NAME = 'chalo-kisaan-v3';

// Only pre-cache truly static files (no hashed JS/CSS bundles)
const PRECACHE_ASSETS = [
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/apple-touch-icon.png',
];

// Install: pre-cache only stable assets, skip waiting immediately
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Chalo Kisaan Service Worker v3');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.log('[SW] Pre-cache partial failure (non-fatal):', err);
      })
    )
  );
});

// Activate: delete ALL old caches, claim all clients immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Chalo Kisaan Service Worker v3 — purging old caches');
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => {
        console.log('[SW] Deleting old cache:', key);
        return caches.delete(key);
      })))
      .then(() => self.clients.claim())
      .then(() => {
        // Tell all open tabs to reload so they pick up the new bundle
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
      })
  );
});

// Fetch strategy:
//   • index.html (navigation)  → network-first, NO cache storage (always fresh)
//   • /static/js|css/*         → network-first (hashed filenames; cache after fetch)
//   • images / fonts / icons   → cache-first (immutable)
//   • API / ALB calls          → network-only
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and non-http(s) requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // ── API calls: network-only, never cache ──────────────────────────────
  const isApi = url.pathname.startsWith('/api/') ||
                url.hostname.includes('elb.amazonaws.com') ||
                url.hostname.includes('execute-api');
  if (isApi) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'Offline — please check your connection' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
        })
      )
    );
    return;
  }

  // ── HTML navigation (index.html): network-first, NEVER cache ─────────
  if (request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request).catch(() =>
        // Only fall back to cached index.html when truly offline
        caches.match('/index.html').then((cached) =>
          cached || new Response('Offline', { status: 503 })
        )
      )
    );
    return;
  }

  // ── Hashed JS/CSS bundles: network-first, then cache ─────────────────
  const isHashedAsset = /\/static\/(js|css)\//.test(url.pathname);
  if (isHashedAsset) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // ── Static images / icons / fonts: cache-first ───────────────────────
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.status === 200 && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});

// Background sync for plan generation when back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-plan') {
    console.log('[SW] Background sync triggered');
  }
});

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Chalo Kisaan', {
    body: data.body || 'Your plan is ready!',
    icon: '/logo192.png',
    badge: '/logo192.png',
  });
});
