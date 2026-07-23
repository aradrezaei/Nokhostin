'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { createPanelCache } from '@/lib/panelCache';
import type { MyClassEntry } from '@/lib/types';

const panelCache = createPanelCache<MyClassEntry[]>('nokhostin.classes.v1', 60_000);

/** Shared /me/classes fetch with memory + sessionStorage for snappy nav. */
export function useMyClasses() {
  const { request } = useAuth();
  const [items, setItems] = useState<MyClassEntry[]>(() => panelCache.getStale() ?? []);
  const [loading, setLoading] = useState(() => !panelCache.getStale());
  const [error, setError] = useState('');

  const load = useCallback(
    async (force = false) => {
      if (!force) {
        const fresh = panelCache.getFresh();
        if (fresh) {
          setItems(fresh);
          setLoading(false);
          return fresh;
        }
      }

      if (!panelCache.getStale()) setLoading(true);
      setError('');
      try {
        const next = await request<MyClassEntry[]>('/me/classes');
        panelCache.set(next);
        setItems(next);
        return next;
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
        return panelCache.getStale() ?? [];
      } finally {
        setLoading(false);
      }
    },
    [request],
  );

  useEffect(() => scheduleEffect(() => load()), [load]);

  return { items, loading, error, reload: () => load(true) };
}

export function invalidateMyClassesCache() {
  panelCache.clear();
}
