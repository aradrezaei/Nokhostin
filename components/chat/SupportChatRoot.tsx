'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';

const ChatPanel = dynamic(() => import('./ChatPanel'), {
  ssr: false,
  loading: () => null,
});

const HIDDEN_PREFIXES = ['/auth', '/admin', '/dashboard', '/mentor'];

function isHidden(pathname: string | null): boolean {
  if (!pathname) {
    return true;
  }
  return HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Lazy-mounts the support widget after idle so marketing pages stay snappy.
 * Hidden on auth + panel routes.
 */
export default function SupportChatRoot() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const hidden = isHidden(pathname);

  useEffect(() => {
    if (hidden) {
      return scheduleEffect(() => {
        setReady(false);
      });
    }

    let cancelled = false;
    const arm = () => {
      if (!cancelled) {
        setReady(true);
      }
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(arm, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(arm, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hidden]);

  if (!ready || hidden) {
    return null;
  }
  return <ChatPanel />;
}
