'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Medal, MyClassEntry } from '@/lib/types';

export interface OverviewSnapshot {
  classId: string;
  title: string;
  courseName: string | null;
  score: number | null;
  isTop: boolean;
  attendanceRate: number | null;
  sessionsCurrent: number;
  sessionsTotal: number;
  tuitionPaid: boolean;
  medals: Medal[];
}

export interface OverviewAchievement extends Medal {
  classId: string;
  classTitle: string;
  courseName: string | null;
}

export interface StudentOverview {
  classes: MyClassEntry[];
  snapshots: OverviewSnapshot[];
  achievements: OverviewAchievement[];
}

type Cache = { at: number; data: StudentOverview };
let cache: Cache | null = null;
const TTL_MS = 45_000;

/** Single /me/overview fetch shared by dashboard + profile. */
export function useMyOverview() {
  const { request } = useAuth();
  const [data, setData] = useState<StudentOverview | null>(() => cache?.data ?? null);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState('');

  const load = useCallback(
    async (force = false) => {
      if (!force && cache && Date.now() - cache.at < TTL_MS) {
        setData(cache.data);
        setLoading(false);
        return cache.data;
      }
      setLoading(true);
      setError('');
      try {
        const next = await request<StudentOverview>('/me/overview');
        cache = { at: Date.now(), data: next };
        setData(next);
        return next;
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'خطا در دریافت عملکرد.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [request],
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    classes: data?.classes ?? [],
    snapshots: data?.snapshots ?? [],
    achievements: data?.achievements ?? [],
    loading,
    error,
    reload: () => load(true),
  };
}

export function invalidateOverviewCache() {
  cache = null;
}
