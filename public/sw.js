/**
 * Service Worker — آموزشگاه نخستین
 * هدف: شل اپ + صفحات بازدیدشده + استاتیک‌ها آفلاین کار کنند.
 * نسخه را با هر دیپلوی مهم بالا ببر.
 */
const CACHE_VERSION = 'nakhostin-v2.0.0';
const CACHE_SHELL = `${CACHE_VERSION}-shell`;
const CACHE_PAGES = `${CACHE_VERSION}-pages`;
const CACHE_ASSETS = `${CACHE_VERSION}-assets`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;
const CACHE_API = `${CACHE_VERSION}-api`;

const SHELL_URLS = [
  '/',
  '/offline.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/brand/logo.png',
  '/brand/logo-white.png',
  '/fonts/Shabnam.woff2',
  '/fonts/Shabnam-Bold.woff2',
  '/courses',
  '/blog',
  '/about',
  '/contact',
  '/faq',
  '/auth',
];

const MAX_PAGES = 60;
const MAX_ASSETS = 80;
const MAX_IMAGES = 100;
const MAX_API = 40;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_SHELL);
      await Promise.all(
        SHELL_URLS.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: 'reload' }));
          } catch {
            /* بعضی مسیرها ممکن است موقتاً fail شوند — نصب ادامه یابد */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('nakhostin-') && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => {
        client.postMessage({ type: 'SW_ACTIVATED', version: CACHE_VERSION });
      });
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // همان‌origin فقط — API خارجی کش نشود
  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.startsWith('/_next/webpack-hmr') ||
    url.pathname.startsWith('/__nextjs') ||
    url.pathname.includes('hot-update')
  ) {
    return;
  }

  // ناوبری HTML
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(handleNavigation(request));
    return;
  }

  // استاتیک‌های هش‌شده Next — Cache First
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, CACHE_ASSETS, MAX_ASSETS));
    return;
  }

  // بقیه _next — Stale While Revalidate
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(staleWhileRevalidate(request, CACHE_ASSETS, MAX_ASSETS));
    return;
  }

  // فونت / آیکون / برند
  if (
    request.destination === 'font' ||
    /\.(woff2?|ttf|otf)$/i.test(url.pathname) ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/brand/') ||
    url.pathname === '/site.webmanifest'
  ) {
    event.respondWith(cacheFirst(request, CACHE_SHELL, 40));
    return;
  }

  // تصاویر
  if (
    request.destination === 'image' ||
    /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, CACHE_IMAGES, MAX_IMAGES));
    return;
  }

  // API همان‌origin (اگر پروکسی شده باشد)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, CACHE_API, MAX_API, 4000));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, CACHE_ASSETS, MAX_ASSETS));
});

async function handleNavigation(request) {
  const cache = await caches.open(CACHE_PAGES);
  try {
    const response = await fetchWithTimeout(request, 4500);
    if (response && response.ok) {
      cache.put(request, response.clone());
      trimCache(CACHE_PAGES, MAX_PAGES);
      return response;
    }
  } catch {
    /* fall through */
  }

  const cached =
    (await cache.match(request)) ||
    (await caches.match(request)) ||
    (await caches.match(new URL(request.url).pathname)) ||
    (await caches.match('/'));

  if (cached) return cached;

  const offline = await caches.match('/offline.html');
  if (offline) return offline;

  return new Response('آفلاین — محتوا در دسترس نیست', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

async function cacheFirst(request, cacheName, max) {
  const cached = await caches.match(request);
  if (cached) {
    refreshInBackground(request, cacheName, max);
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      trimCache(cacheName, max);
    }
    return response;
  } catch {
    return new Response('', { status: 504 });
  }
}

async function staleWhileRevalidate(request, cacheName, max) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
        trimCache(cacheName, max);
      }
      return response;
    })
    .catch(() => null);

  if (cached) return cached;
  const network = await networkPromise;
  if (network) return network;
  return new Response('', { status: 504 });
}

async function networkFirst(request, cacheName, max, timeoutMs) {
  try {
    const response = await fetchWithTimeout(request, timeoutMs);
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      trimCache(cacheName, max);
    }
    if (response) return response;
  } catch {
    /* fall through */
  }
  const cached = await caches.match(request);
  if (cached) return cached;
  return new Response(JSON.stringify({ offline: true }), {
    status: 503,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function fetchWithTimeout(request, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

function refreshInBackground(request, cacheName, max) {
  if (!self.navigator.onLine) return;
  fetch(request)
    .then(async (response) => {
      if (!response || !response.ok) return;
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      trimCache(cacheName, max);
    })
    .catch(() => undefined);
}

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length <= maxItems) return;
      cache.delete(keys[0]).then(() => trimCache(cacheName, maxItems));
    });
  });
}

self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data) return;

  if (data.action === 'skipWaiting') {
    self.skipWaiting();
  }

  if (data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => {
        event.ports?.[0]?.postMessage({ success: true });
      }),
    );
  }

  if (data.action === 'getCacheInfo') {
    event.waitUntil(
      (async () => {
        const names = await caches.keys();
        const info = {};
        for (const name of names) {
          const cache = await caches.open(name);
          info[name] = (await cache.keys()).length;
        }
        event.ports?.[0]?.postMessage(info);
      })(),
    );
  }
});

self.addEventListener('push', (event) => {
  let payload = {
    title: 'آموزشگاه نخستین',
    body: 'پیام جدید دریافت شد',
    url: '/',
  };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch {
    if (event.data) payload.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: payload.tag || 'nakhostin',
      renotify: true,
      dir: 'rtl',
      lang: 'fa',
      data: { url: payload.url || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          client.navigate?.(target);
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});
