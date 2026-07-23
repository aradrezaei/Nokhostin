// lib/serviceWorker.ts — ثبت و مدیریت Service Worker

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

function isLocalHost() {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  // روی لوکال SW را خاموش نگه می‌داریم تا DX خراب نشود.
  // برای تست PWA از دامنه واقعی / preview استفاده کن.
  if (isLocalHost()) {
    void unregisterServiceWorker();
    return;
  }

  const register = () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((registration) => {
        config?.onSuccess?.(registration);

        const watch = () => {
          const worker = registration.installing ?? registration.waiting;
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              config?.onUpdate?.(registration);
            }
          });
        };

        if (registration.waiting) config?.onUpdate?.(registration);
        registration.addEventListener('updatefound', watch);

        // چک دوره‌ای آپدیت
        setInterval(
          () => {
            void registration.update().catch(() => undefined);
          },
          60 * 60 * 1000,
        );
      })
      .catch((error: unknown) => {
        config?.onError?.(error instanceof Error ? error : new Error(String(error)));
      });
  };

  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}

export function unregisterServiceWorker(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve();
  }
  return navigator.serviceWorker
    .getRegistrations()
    .then((regs) => Promise.all(regs.map((r) => r.unregister())))
    .then(() => undefined)
    .catch(() => undefined);
}

export function applyWaitingServiceWorker(registration?: ServiceWorkerRegistration) {
  const waiting = registration?.waiting ?? null;
  if (waiting) {
    waiting.postMessage({ action: 'skipWaiting' });
  }
  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => {
      window.location.reload();
    },
    { once: true },
  );
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return await Notification.requestPermission();
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    ('standalone' in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}
