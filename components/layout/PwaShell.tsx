'use client';

import { useCallback, useEffect, useState } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';
import { Download, WifiOff, X } from 'lucide-react';
import {
  applyWaitingServiceWorker,
  isStandaloneDisplay,
  registerServiceWorker,
  type ServiceWorkerConfig,
} from '@/lib/serviceWorker';

const INSTALL_DISMISS_KEY = 'nk-pwa-install-dismissed';
const DISMISS_DAYS = 14;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function wasInstallDismissed() {
  try {
    const raw = localStorage.getItem(INSTALL_DISMISS_KEY);
    if (!raw) return false;
    const until = Number(raw);
    return Number.isFinite(until) && Date.now() < until;
  } catch {
    return false;
  }
}

function dismissInstall() {
  try {
    localStorage.setItem(
      INSTALL_DISMISS_KEY,
      String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000),
    );
  } catch {
    /* ignore */
  }
}

/** PWA core only — silent SW updates, optional install, offline hint. */
export default function PwaShell() {
  const [offline, setOffline] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const stop = scheduleEffect(() => {
      setOffline(!navigator.onLine);
    });
    const on = () => {
      setOffline(false);
    };
    const off = () => {
      setOffline(true);
    };
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      stop();
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    if (isStandaloneDisplay() || wasInstallDismissed()) return;

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setShowInstall(true);
    };
    const onInstalled = () => {
      setShowInstall(false);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  useEffect(() => {
    const config: ServiceWorkerConfig = {
      onUpdate: (reg) => {
        applyWaitingServiceWorker(reg);
      },
    };
    registerServiceWorker(config);
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShowInstall(false);
  }, [deferred]);

  const dismiss = useCallback(() => {
    dismissInstall();
    setShowInstall(false);
  }, []);

  return (
    <>
      {offline && (
        <div
          role="status"
          className="pointer-events-none fixed inset-x-0 top-14 z-[70] flex justify-center px-3 sm:top-16"
        >
          <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-300 border-b-4 bg-amber-50 px-3.5 py-2 text-xs font-black text-amber-900 shadow-sm dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-200">
            <WifiOff className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
            حالت آفلاین — صفحات ذخیره‌شده در دسترس‌اند
          </div>
        </div>
      )}

      {showInstall && deferred && (
        <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
          <div className="flex w-full max-w-md items-start gap-3 rounded-2xl border-2 border-slate-200 border-b-4 bg-white px-3.5 py-3 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-[#131f24]">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] dark:bg-[#7c3aed]/20">
              <Download className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-slate-900 dark:text-white">نصب اپ نخستین</p>
              <p className="mt-0.5 text-[11px] font-bold leading-5 text-slate-500 dark:text-slate-400">
                دسترسی سریع‌تر، آیکون روی صفحه اصلی، و کار کردن حتی بدون اینترنت
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={install}
                  className="rounded-xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] px-3.5 py-2 text-xs font-black text-white"
                >
                  نصب
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="rounded-xl px-3 py-2 text-xs font-black text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  بعداً
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="بستن"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
