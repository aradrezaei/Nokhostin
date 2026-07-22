const CACHE_VERSION = 'nakhostin-v1.1.0';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;
const CACHE_IMAGES = `${CACHE_VERSION}-images`;
const CACHE_FONTS = `${CACHE_VERSION}-fonts`;
const CACHE_API = `${CACHE_VERSION}-api`;
const MAX_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE = 100;

// فایل‌های استاتیک که باید کش شوند
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/brand/logo-white.png',
];

// API endpoints که باید کش شوند
const API_CACHE_PATTERNS = [
  '/api/courses',
  '/api/categories',
  '/api/teachers',
  '/api/posts',
  '/api/blog',
];

// محدود کردن سایز کش
const limitCacheSize = (cacheName, maxItems) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
};

// بررسی آنلاین بودن
const isOnline = () => {
  return self.navigator.onLine;
};

// Install Event
self.addEventListener('install', (event) => {
  console.log('[SW] 🚀 Installing Service Worker...', CACHE_VERSION);

  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then((cache) => {
        console.log('[SW] ✅ Precaching static assets');
        return cache.addAll(STATIC_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
      })
      .catch((err) => {
        console.error('[SW] ❌ Precaching failed:', err);
        // ادامه نصب حتی در صورت خطا
        return Promise.resolve();
      }),
  );

  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  console.log('[SW] 🔄 Activating Service Worker...', CACHE_VERSION);

  event.waitUntil(
    Promise.all([
      // پاکسازی کش‌های قدیمی
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key.startsWith('nakhostin-') && !key.includes(CACHE_VERSION)) {
              console.log('[SW] 🗑️ Removing old cache:', key);
              return caches.delete(key);
            }
          }),
        );
      }),
      // اطلاع به کلاینت‌ها
      self.clients.claim().then(() => {
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_UPDATED',
              version: CACHE_VERSION,
              timestamp: Date.now(),
            });
          });
        });
      }),
    ]),
  );
});

// Fetch Event - استراتژی پیشرفته
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // فقط درخواست‌های HTTP(S)
  if (!request.url.startsWith('http')) {
    return;
  }

  // نادیده گرفتن درخواست‌های خاص
  if (
    url.pathname.startsWith('/_next/webpack-hmr') ||
    url.pathname.startsWith('/__nextjs_original-stack-frame') ||
    request.method !== 'GET'
  ) {
    return;
  }

  // 1. API Requests - Network First با Cache Fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      networkFirstStrategy(request, CACHE_API, 5000), // 5 second timeout
    );
    return;
  }

  // 2. Images - Cache First با Update در پس‌زمینه
  if (
    request.destination === 'image' ||
    /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirstStrategy(request, CACHE_IMAGES, MAX_IMAGE_CACHE));
    return;
  }

  // 3. Fonts - Cache First (فونت‌ها تغییر نمی‌کنند)
  if (request.destination === 'font' || /\.(woff|woff2|ttf|otf|eot)$/i.test(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_FONTS, 50));
    return;
  }

  // 4. Static Assets (_next/static) - Cache First
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirstStrategy(request, CACHE_STATIC, MAX_CACHE_SIZE));
    return;
  }

  // 5. HTML Pages - Stale While Revalidate
  if (request.headers.get('accept')?.includes('text/html') || request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidateStrategy(request, CACHE_DYNAMIC));
    return;
  }

  // 6. سایر فایل‌ها - Network First
  event.respondWith(networkFirstStrategy(request, CACHE_DYNAMIC, 3000));
});

// استراتژی Network First
async function networkFirstStrategy(request, cacheName, timeout = 5000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(request, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      limitCacheSize(cacheName, MAX_CACHE_SIZE);
    }

    return response;
  } catch (error) {
    console.log('[SW] 🌐 Network failed, trying cache:', request.url);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // اگر HTML است، صفحه آفلاین نشون بده
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) return offlinePage;
    }

    return new Response('Offline - محتوا در دسترس نیست', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

// استراتژی Cache First
async function cacheFirstStrategy(request, cacheName, maxSize) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // به‌روزرسانی در پس‌زمینه
    if (isOnline()) {
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            caches.open(cacheName).then((cache) => {
              cache.put(request, response.clone());
              limitCacheSize(cacheName, maxSize);
            });
          }
        })
        .catch(() => {});
    }

    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      limitCacheSize(cacheName, maxSize);
    }

    return response;
  } catch (error) {
    console.error('[SW] ❌ Cache First failed:', error);
    return new Response('Resource not available', { status: 404 });
  }
}

// استراتژی Stale While Revalidate
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        const cache = caches.open(cacheName);
        cache.then((c) => {
          c.put(request, response.clone());
          limitCacheSize(cacheName, MAX_CACHE_SIZE);
        });
      }
      return response;
    })
    .catch((error) => {
      console.log('[SW] 🔄 Revalidation failed:', error);
      return cachedResponse;
    });

  return cachedResponse || fetchPromise;
}

// Background Sync
self.addEventListener('sync', (event) => {
  console.log('[SW] 🔄 Background sync:', event.tag);

  if (event.tag === 'sync-comments') {
    event.waitUntil(syncComments());
  }

  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }

  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] 📬 Push notification received');

  let data = {
    title: 'آموزشگاه نخستین',
    body: 'پیام جدید دریافت شد',
    icon: '/icons/icon-192.png',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    vibrate: [200, 100, 200, 100, 200],
    tag: data.tag || 'nakhostin-notification',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      ...data.data,
    },
    actions: [
      {
        action: 'open',
        title: '📖 مشاهده',
        icon: '/icons/open.png',
      },
      {
        action: 'close',
        title: '✖️ بستن',
        icon: '/icons/close.png',
      },
    ],
    dir: 'rtl',
    lang: 'fa',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] 🔔 Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // اگر تب باز است، فوکوس کن
      for (let client of windowClients) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      // اگر تب باز نیست، تب جدید باز کن
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    }),
  );
});

// Message Handler
self.addEventListener('message', (event) => {
  console.log('[SW] 💬 Message received:', event.data);

  if (event.data?.action === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data?.action === 'clearCache') {
    event.waitUntil(
      caches
        .keys()
        .then((keyList) => {
          return Promise.all(keyList.map((key) => caches.delete(key)));
        })
        .then(() => {
          event.ports[0]?.postMessage({ success: true });
        }),
    );
  }

  if (event.data?.action === 'getCacheInfo') {
    event.waitUntil(
      getCacheInfo().then((info) => {
        event.ports[0]?.postMessage(info);
      }),
    );
  }
});

// Helper Functions
async function syncComments() {
  try {
    const cache = await caches.open(CACHE_DYNAMIC);
    const requests = await cache.keys();

    const commentRequests = requests.filter(
      (req) => req.url.includes('/api/comments') && req.method === 'POST',
    );

    for (let request of commentRequests) {
      try {
        const response = await fetch(request.clone());
        if (response.ok) {
          await cache.delete(request);
          console.log('[SW] ✅ Comment synced');
        }
      } catch (error) {
        console.error('[SW] ❌ Sync failed:', error);
      }
    }
  } catch (error) {
    console.error('[SW] ❌ syncComments failed:', error);
  }
}

async function syncProgress() {
  console.log('[SW] 📊 Syncing progress...');
  // منطق همگام‌سازی پیشرفت
}

async function syncOfflineForms() {
  console.log('[SW] 📝 Syncing offline forms...');
  // منطق همگام‌سازی فرم‌های آفلاین
}

async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};

  for (let name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    info[name] = keys.length;
  }

  return info;
}

// Periodic Background Sync
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', (event) => {
    console.log('[SW] ⏰ Periodic sync:', event.tag);

    if (event.tag === 'update-content') {
      event.waitUntil(updateContent());
    }
  });
}

async function updateContent() {
  try {
    const response = await fetch('/api/updates');
    if (!response.ok) return;

    const data = await response.json();

    if (data.hasUpdates) {
      await self.registration.showNotification('📚 محتوای جدید!', {
        body: 'دوره‌های جدید اضافه شده است',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72x72.png',
        tag: 'content-update',
        data: { url: '/courses' },
      });
    }
  } catch (error) {
    console.error('[SW] ❌ Update content failed:', error);
  }
}

// Error Handler
self.addEventListener('error', (event) => {
  console.error('[SW] ❌ Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] ❌ Unhandled rejection:', event.reason);
});

console.log('[SW] 🎉 Service Worker loaded successfully!');
