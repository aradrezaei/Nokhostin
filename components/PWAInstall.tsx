'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, requestNotificationPermission } from '@/lib/serviceWorker';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // بررسی نصب قبلی
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // ثبت Service Worker
    registerServiceWorker({
      onSuccess: (registration) => {
        console.log('✅ SW registered successfully');
      },
      onUpdate: (registration) => {
        console.log('🔄 SW updated');
        // نمایش نوتیفیکیشن به‌روزرسانی
      },
      onError: (error) => {
        console.error('❌ SW registration failed:', error);
      },
    });

    // Event Listener برای Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Event Listener برای نصب موفق
    window.addEventListener('appinstalled', () => {
      console.log('🎉 PWA installed successfully');
      setIsInstalled(true);
      setShowInstallButton(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ User accepted install');
    } else {
      console.log('❌ User dismissed install');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleNotificationRequest = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      console.log('✅ Notification permission granted');
    }
  };

  if (isInstalled) {
    return null; // قبلاً نصب شده
  }

  if (!showInstallButton) {
    return null; // دکمه نصب نمایش داده نمی‌شود
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-6 animate-slide-up">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">نصب آموزشگاه نخستین</h3>
            <p className="text-sm text-white/90 mb-4">
              برای دسترسی سریع‌تر و استفاده آفلاین، اپلیکیشن را نصب کنید
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-white text-purple-600 hover:bg-purple-50 px-4 py-2.5 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              >
                نصب اپلیکیشن
              </button>

              <button
                onClick={() => setShowInstallButton(false)}
                className="px-4 py-2.5 hover:bg-white/10 rounded-lg transition-all"
              >
                بعداً
              </button>
            </div>

            <button
              onClick={handleNotificationRequest}
              className="w-full mt-2 text-xs text-white/80 hover:text-white underline"
            >
              فعال‌سازی اعلان‌ها
            </button>
          </div>

          <button
            onClick={() => setShowInstallButton(false)}
            className="flex-shrink-0 w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
