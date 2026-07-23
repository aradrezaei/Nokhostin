'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';
import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { createPanelCache } from '@/lib/panelCache';
import type { ClassProgress } from '@/lib/types';

const cache = createPanelCache<Record<string, ClassProgress>>('nokhostin.progress.v1', 60_000);

function readMap(): Record<string, ClassProgress> {
  return cache.getStale() ?? {};
}

function getCached(classId: string): ClassProgress | undefined {
  const map = readMap();
  return Object.prototype.hasOwnProperty.call(map, classId) ? map[classId] : undefined;
}

/** Cached /me/classes/:id/progress — instant paint on revisit + background revalidate. */
export function putClassProgress(classId: string, data: ClassProgress) {
  cache.set({ ...readMap(), [classId]: data });
}

export function useClassProgress(classId: string | undefined) {
  const { request } = useAuth();
  const [data, setData] = useState<ClassProgress | null>(() =>
    classId ? (getCached(classId) ?? null) : null,
  );
  const [loading, setLoading] = useState(() => (classId ? !getCached(classId) : true));
  const [error, setError] = useState('');

  const load = useCallback(
    async (force = false) => {
      if (!classId) {
        return null;
      }

      const cached = getCached(classId);
      const freshMap = cache.getFresh();
      const freshHit =
        freshMap !== null && Object.prototype.hasOwnProperty.call(freshMap, classId);

      if (!force && cached && freshHit) {
        setData(cached);
        setLoading(false);
        return cached;
      }

      if (!cached) {
        setLoading(true);
      }
      setError('');
      try {
        const next = await request<ClassProgress>(`/me/classes/${classId}/progress`);
        const updated = { ...readMap(), [classId]: next };
        cache.set(updated);
        setData(next);
        return next;
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'خطا در دریافت روند رشد.');
        return cached ?? null;
      } finally {
        setLoading(false);
      }
    },
    [request, classId],
  );

  useEffect(() => scheduleEffect(() => load()), [load]);

  return { data, loading, error, reload: () => load(true) };
}

/** Warm a class progress entry during idle time (hover / overview load). */
export function prefetchClassProgress(
  request: <T>(path: string, init?: RequestInit) => Promise<T>,
  classId: string,
) {
  const freshMap = cache.getFresh();
  if (freshMap !== null && Object.prototype.hasOwnProperty.call(freshMap, classId)) {
    return;
  }

  void request<ClassProgress>(`/me/classes/${classId}/progress`)
    .then((next) => {
      putClassProgress(classId, next);
    })
    .catch(() => undefined);
}

export function invalidateClassProgressCache(classId?: string) {
  if (!classId) {
    cache.clear();
    return;
  }
  const map = readMap();
  const { [classId]: _removed, ...rest } = map;
  cache.set(rest);
}
