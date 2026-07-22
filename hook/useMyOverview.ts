'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
const TTL_MS = 20_000;

const TOP_MEDAL: Pick<Medal, 'code' | 'title' | 'description'> = {
  code: 'top_rank',
  title: 'مقام اول کلاس',
  description: 'بالاترین نمره در این کلاس',
};

/** Ensure achievements always surface when snapshots mark isTop / carry medals. */
function normalizeOverview(raw: StudentOverview): StudentOverview {
  const seen = new Set<string>();
  const achievements: OverviewAchievement[] = [];

  const push = (item: OverviewAchievement) => {
    const key = `${item.code}:${item.classId}`;
    if (seen.has(key)) return;
    seen.add(key);
    achievements.push(item);
  };

  for (const a of raw.achievements ?? []) push(a);

  for (const s of raw.snapshots ?? []) {
    for (const m of s.medals ?? []) {
      push({
        ...m,
        classId: s.classId,
        classTitle: s.title,
        courseName: s.courseName,
      });
    }
    if (s.isTop) {
      push({
        ...TOP_MEDAL,
        classId: s.classId,
        classTitle: s.title,
        courseName: s.courseName,
      });
    }
  }

  return { ...raw, achievements };
}

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
        const raw = await request<StudentOverview>('/me/overview');
        const next = normalizeOverview(raw);
        cache = { at: Date.now(), data: next };
        setData(next);
        return next;
      } catch (e) {
        // Fallback: classes only — better than a blank panel if overview is down.
        try {
          const classes = await request<MyClassEntry[]>('/me/classes');
          const next = normalizeOverview({ classes, snapshots: [], achievements: [] });
          cache = { at: Date.now(), data: next };
          setData(next);
          setError('');
          return next;
        } catch {
          setError(e instanceof ApiError ? e.message : 'خطا در دریافت عملکرد.');
          return null;
        }
      } finally {
        setLoading(false);
      }
    },
    [request],
  );

  useEffect(() => {
    load();
  }, [load]);

  const achievements = useMemo(() => data?.achievements ?? [], [data]);

  return {
    data,
    classes: data?.classes ?? [],
    snapshots: data?.snapshots ?? [],
    achievements,
    loading,
    error,
    reload: () => load(true),
  };
}

export function invalidateOverviewCache() {
  cache = null;
}
