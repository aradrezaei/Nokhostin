'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';
import { isAppRoute } from '@/lib/routes';

const ChatPanel = dynamic(() => import('./ChatPanel'), {
  ssr: false,
  loading: () => null,
});

/** Short defer so chat doesn't compete with first paint — not a long wait. */
const BOOT_DELAY_MS = 800;

/** Chat only on marketing site — never inside auth/panel shells. */
function isHidden(pathname: string | null): boolean {
  return !pathname || isAppRoute(pathname);
}

/**
 * Defers support chat slightly after mount, then dynamic-imports the panel.
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
    let idleId: number | undefined;
    const timeoutId = setTimeout(() => {
      if (cancelled) {
        return;
      }
      const start = () => {
        if (!cancelled) {
          setReady(true);
        }
      };
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 500 });
      } else {
        start();
      }
    }, BOOT_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [hidden]);

  if (!ready || hidden) {
    return null;
  }
  return <ChatPanel />;
}
