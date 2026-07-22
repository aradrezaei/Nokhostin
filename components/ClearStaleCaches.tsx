'use client';

import { useEffect } from 'react';

/**
 * On local/dev hosts, kill any leftover service workers + caches so
 * Navbar / panel UI changes always show up without a fight.
 */
export default function ClearStaleCaches() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
    if (!isLocal || !('serviceWorker' in navigator)) return;

    let cancelled = false;
    (async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if (!cancelled && regs.length > 0) {
        console.info('[cache] Cleared stale SW/caches — hard refresh once if UI still looks old');
      }
    })().catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
