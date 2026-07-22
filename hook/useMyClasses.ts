'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { MyClassEntry } from '@/lib/types';

type Cache = { at: number; items: MyClassEntry[] };
let cache: Cache | null = null;
const TTL_MS = 30_000;

/** Shared /me/classes fetch with a short in-memory cache to keep the panel snappy. */
export function useMyClasses() {
  const { request } = useAuth();
  const [items, setItems] = useState<MyClassEntry[]>(() => cache?.items ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState('');

  const load = useCallback(
    async (force = false) => {
      if (!force && cache && Date.now() - cache.at < TTL_MS) {
        setItems(cache.items);
        setLoading(false);
        return cache.items;
      }
      setLoading(true);
      setError('');
      try {
        const next = await request<MyClassEntry[]>('/me/classes');
        cache = { at: Date.now(), items: next };
        setItems(next);
        return next;
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [request],
  );

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: () => load(true) };
}

export function invalidateMyClassesCache() {
  cache = null;
}
