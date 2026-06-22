'use client';

import { useState, useEffect } from 'react';

export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [registration, setRegistration] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // بررسی نصب Service Worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // بررسی وضعیت آنلاین
    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // بررسی نصب PWA
    checkIfInstalled();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      setRegistration(reg);
      console.log('✅ Service Worker registered successfully');

      // بررسی آپدیت
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 New version available!');
            setUpdateAvailable(true);
          }
        });
      });

      // بررسی آپدیت هر 1 ساعت
      setInterval(
        () => {
          reg.update();
        },
        60 * 60 * 1000,
      );
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  };

  const checkIfInstalled = () => {
    // بررسی display mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      localStorage.setItem('pwa-installed', 'true');
    }

    // iOS standalone mode
    if (window.navigator.standalone === true) {
      setIsInstalled(true);
      localStorage.setItem('pwa-installed', 'true');
    }

    // بررسی localStorage
    const installed = localStorage.getItem('pwa-installed');
    if (installed === 'true') {
      setIsInstalled(true);
    }
  };

  const handleOnline = () => {
    setIsOnline(true);
    console.log('🌐 Back online');

    // همگام‌سازی داده‌های آفلاین
    if ('sync' in registration) {
      registration.sync.register('sync-data');
    }
  };

  const handleOffline = () => {
    setIsOnline(false);
    console.log('📵 Offline mode');
  };

  const updateServiceWorker = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ action: 'skipWaiting' });
      window.location.reload();
    }
  };

  const clearCache = async () => {
    if (registration) {
      registration.active.postMessage({ action: 'clearCache' });
      console.log('🗑️ Cache cleared');
    }
  };

  // درخواست اجازه نوتیفیکیشن
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('❌ This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  // ارسال نوتیفیکیشن تستی
  const sendTestNotification = async () => {
    const granted = await requestNotificationPermission();

    if (granted && registration) {
      registration.showNotification('نخستین', {
        body: 'نوتیفیکیشن با موفقیت فعال شد! 🎉',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [200, 100, 200],
        tag: 'test-notification',
        requireInteraction: false,
        actions: [
          {
            action: 'open',
            title: 'باز کردن',
          },
        ],
      });
    }
  };

  // اشتراک Push Notification
  const subscribePushNotification = async () => {
    if (!registration) return;

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });

      // ارسال subscription به سرور
      await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      console.log('✅ Push notification subscribed');
      return subscription;
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
    }
  };

  // Background Sync
  const syncData = async (tag) => {
    if ('sync' in registration) {
      try {
        await registration.sync.register(tag);
        console.log(`✅ Background sync registered: ${tag}`);
      } catch (error) {
        console.error('❌ Background sync failed:', error);
      }
    }
  };

  // Periodic Background Sync (اگر مرورگر پشتیبانی کند)
  const registerPeriodicSync = async (tag, interval) => {
    if ('periodicSync' in registration) {
      try {
        const status = await navigator.permissions.query({
          name: 'periodic-background-sync',
        });

        if (status.state === 'granted') {
          await registration.periodicSync.register(tag, {
            minInterval: interval, // به میلی‌ثانیه
          });
          console.log(`✅ Periodic sync registered: ${tag}`);
        }
      } catch (error) {
        console.error('❌ Periodic sync failed:', error);
      }
    }
  };

  // Helper function
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    registration,
    updateAvailable,
    updateServiceWorker,
    clearCache,
    requestNotificationPermission,
    sendTestNotification,
    subscribePushNotification,
    syncData,
    registerPeriodicSync,
  };
}
