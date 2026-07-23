'use client';

import { useEffect, useState } from 'react';
import { ShieldOff, X } from 'lucide-react';
import { detectLikelyVpn, dismissVpnNotice, isVpnNoticeDismissed } from '@/lib/detectVpn';

/**
 * Ultra-light VPN hint for Iranian users.
 * No animations, one tiny network probe, session-dismissible.
 */
export default function VpnNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVpnNoticeDismissed()) return;

    const ac = new AbortController();
    let cancelled = false;

    // Idle so first paint never waits on the probe.
    const run = () => {
      void detectLikelyVpn(ac.signal).then((likely) => {
        if (!cancelled && likely) setVisible(true);
      });
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(run, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(run, 400);
    }

    return () => {
      cancelled = true;
      ac.abort();
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) return null;

  const close = () => {
    dismissVpnNotice();
    setVisible(false);
  };

  return (
    <div
      role="status"
      dir="rtl"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
    >
      <div className="pointer-events-auto flex w-full max-w-lg items-start gap-3 rounded-2xl border-2 border-slate-200 border-b-4 bg-white px-4 py-3 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-[#131f24]">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] dark:bg-[#7c3aed]/20 dark:text-[#a78bfa]">
          <ShieldOff className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-slate-900 dark:text-white">
            برای تجربه بهتر، VPN را خاموش کن
          </p>
          <p className="mt-1 text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">
            اتصال مستقیم سریع‌تر و پایدارتر است — ورود، پیامک و پنل بدون قطعی کار می‌کنند.
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-2.5 cursor-pointer text-xs font-black text-[#7c3aed] hover:text-[#5b21b6] dark:text-[#a78bfa] dark:hover:text-[#c4b5fd]"
          >
            متوجه شدم
          </button>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="بستن"
          className="nav-icon-btn cursor-pointer !h-8 !w-8 shrink-0"
        >
          <X className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
