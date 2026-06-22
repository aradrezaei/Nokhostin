// lib/serviceWorker.ts
// ثبت و مدیریت Service Worker

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined') {
    console.log('[SW] Running on server, skipping registration');
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Worker not supported');
    return;
  }

  // ثبت بعد از load شدن صفحه
  window.addEventListener('load', () => {
    const swUrl = '/sw.js';

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('[SW] ✅ Service Worker registered:', registration.scope);

        // بررسی به‌روزرسانی
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // SW جدید در انتظار است
                console.log('[SW] 🔄 New content available, please refresh');

                if (config?.onUpdate) {
                  config.onUpdate(registration);
                } else {
                  // نمایش نوتیفیکیشن پیش‌فرض
                  showUpdateNotification(registration);
                }
              } else {
                // اولین بار نصب شده
                console.log('[SW] ✨ Content cached for offline use');
                config?.onSuccess?.(registration);
              }
            }
          };
        };

        // بررسی به‌روزرسانی هر ساعت
        setInterval(
          () => {
            registration.update();
          },
          1000 * 60 * 60,
        ); // 1 ساعت
      })
      .catch((error) => {
        console.error('[SW] ❌ Service Worker registration failed:', error);
        config?.onError?.(error);
      });

    // دریافت پیام‌ها از Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] 💬 Message from SW:', event.data);

      if (event.data?.type === 'SW_UPDATED') {
        showUpdateNotification();
      }
    });

    // مدیریت Controller Change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] 🔄 Controller changed, reloading...');
      // می‌توانید صفحه را reload کنید یا یک پیام نشان دهید
    });
  });
}

export function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
      console.log('[SW] 🗑️ Service Worker unregistered');
    })
    .catch((error) => {
      console.error('[SW] ❌ Unregister failed:', error);
    });
}

// نمایش نوتیفیکیشن به‌روزرسانی
function showUpdateNotification(registration?: ServiceWorkerRegistration) {
  // می‌توانید از یک toast notification استفاده کنید
  const message = 'نسخه جدید آماده است! برای دریافت آخرین به‌روزرسانی‌ها، صفحه را رفرش کنید.';

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('به‌روزرسانی موجود', {
      body: message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'sw-update',
      requireInteraction: true,
    });
  } else {
    console.log('[SW] 📢', message);

    // نمایش با toast یا modal
    if (typeof window !== 'undefined') {
      const shouldReload = confirm(message);
      if (shouldReload) {
        registration?.waiting?.postMessage({ action: 'skipWaiting' });
        window.location.reload();
      }
    }
  }
}

// درخواست مجوز Notification
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.log('[SW] Notifications not supported');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

// ثبت Push Subscription
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    console.log('[SW] 📬 Push subscription successful');

    // ارسال subscription به سرور
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });

    return subscription;
  } catch (error) {
    console.error('[SW] ❌ Push subscription failed:', error);
    return null;
  }
}

// لغو Push Subscription
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();

      // اطلاع به سرور
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      console.log('[SW] 🔕 Push unsubscribed');
      return true;
    }

    return false;
  } catch (error) {
    console.error('[SW] ❌ Push unsubscribe failed:', error);
    return false;
  }
}

// دریافت اطلاعات Cache
export async function getCacheInfo(): Promise<Record<string, number>> {
  const registration = await navigator.serviceWorker.ready;

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      resolve(event.data);
    };

    registration.active?.postMessage({ action: 'getCacheInfo' }, [messageChannel.port2]);
  });
}

// پاک کردن Cache
export async function clearCache(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      registration.active?.postMessage({ action: 'clearCache' }, [messageChannel.port2]);
    });
  } catch (error) {
    console.error('[SW] ❌ Clear cache failed:', error);
    return false;
  }
}

// بررسی آفلاین بودن
export function isOffline(): boolean {
  return !navigator.onLine;
}

// Event Listeners برای آفلاین/آنلاین
export function setupNetworkListeners(onOnline?: () => void, onOffline?: () => void) {
  window.addEventListener('online', () => {
    console.log('[SW] 🌐 Back online');
    onOnline?.();
  });

  window.addEventListener('offline', () => {
    console.log('[SW] 📡 Gone offline');
    onOffline?.();
  });
}
