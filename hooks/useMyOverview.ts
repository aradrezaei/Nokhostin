'use client';

import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { queryKeys } from '@/lib/query/keys';
import type { ClassProgress, Medal, MyClassEntry } from '@/lib/types';

export interface OverviewImprovement {
  improved: boolean;
  previousScore: number | null;
  currentScore: number | null;
  delta: number | null;
}

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
  /** Present when API compares this term to the previous one. */
  improvement?: OverviewImprovement | null;
}

export interface OverviewAchievement extends Medal {
  classId: string;
  classTitle: string;
  courseName: string | null;
  previousScore?: number | null;
  currentScore?: number | null;
  delta?: number | null;
}

export interface StudentOverview {
  classes: MyClassEntry[];
  snapshots: OverviewSnapshot[];
  achievements: OverviewAchievement[];
}

const TOP_MEDAL: Pick<Medal, 'code' | 'title' | 'description'> = {
  code: 'top_rank',
  title: 'مقام اول کلاس',
  description: 'بالاترین نمره در این کلاس',
};

const IMPROVED_MEDAL: Pick<Medal, 'code' | 'title' | 'description'> = {
  code: 'improved',
  title: 'مدال پیشرفت',
  description: 'نسبت به ترم قبل پیشرفت داشته‌اید',
};

function normalizeOverview(raw: StudentOverview): StudentOverview {
  const seen = new Set<string>();
  const achievements: OverviewAchievement[] = [];

  const push = (item: OverviewAchievement) => {
    const key = `${item.code}:${item.classId}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    achievements.push(item);
  };

  for (const a of raw.achievements) {
    push(a);
  }

  for (const s of raw.snapshots) {
    for (const m of s.medals) {
      push({
        ...m,
        classId: s.classId,
        classTitle: s.title,
        courseName: s.courseName,
        previousScore: s.improvement?.previousScore ?? null,
        currentScore: s.improvement?.currentScore ?? s.score,
        delta: s.improvement?.delta ?? null,
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
    if (s.improvement?.improved) {
      push({
        ...IMPROVED_MEDAL,
        classId: s.classId,
        classTitle: s.title,
        courseName: s.courseName,
        previousScore: s.improvement.previousScore,
        currentScore: s.improvement.currentScore ?? s.score,
        delta: s.improvement.delta,
      });
    }
  }

  achievements.sort((a, b) => {
    const rank = (c: Medal['code']) => (c === 'improved' ? 0 : 1);
    return rank(a.code) - rank(b.code);
  });

  return { ...raw, achievements };
}

function mergeProgressIntoOverview(
  overview: StudentOverview,
  progress: ClassProgress,
): StudentOverview {
  if (!progress.improvement.improved) {
    return overview;
  }

  const snapshots = overview.snapshots.map((s) =>
    s.classId === progress.class.id
      ? {
          ...s,
          improvement: progress.improvement,
          medals: s.medals.some((m) => m.code === 'improved')
            ? s.medals
            : [...s.medals, { ...IMPROVED_MEDAL }],
        }
      : s,
  );

  return normalizeOverview({
    ...overview,
    snapshots,
    achievements: overview.achievements,
  });
}

function scheduleIdle(fn: () => void) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(
      () => {
        fn();
      },
      { timeout: 2500 },
    );
    return;
  }
  window.setTimeout(fn, 400);
}

/** Single /me/overview fetch shared by dashboard + profile + courses. */
export function useMyOverview() {
  const { request } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.overview,
    queryFn: async () => {
      try {
        const raw = await request<StudentOverview>('/me/overview');
        const next = normalizeOverview(raw);

        scheduleIdle(() => {
          void Promise.all(
            next.classes.slice(0, 4).map(async (entry) => {
              try {
                const progress = await request<ClassProgress>(
                  `/me/classes/${entry.class.id}/progress`,
                );
                queryClient.setQueryData(queryKeys.classProgress(entry.class.id), progress);
                return progress;
              } catch {
                return null;
              }
            }),
          ).then((results) => {
            let current =
              queryClient.getQueryData<StudentOverview>(queryKeys.overview) ?? next;
            for (const progress of results) {
              if (!progress) continue;
              const merged = mergeProgressIntoOverview(current, progress);
              if (merged !== current) current = merged;
            }
            queryClient.setQueryData(queryKeys.overview, current);
          });
        });

        return next;
      } catch (e) {
        try {
          const classes = await request<MyClassEntry[]>('/me/classes');
          return normalizeOverview({ classes, snapshots: [], achievements: [] });
        } catch {
          throw e;
        }
      }
    },
    staleTime: 90_000,
  });

  const data = query.data ?? null;
  const achievements = useMemo(() => data?.achievements ?? [], [data]);

  const improvementHighlights = useMemo(
    () =>
      achievements
        .filter((a) => a.code === 'improved')
        .map((a) => ({
          classId: a.classId,
          classTitle: a.classTitle,
          courseName: a.courseName,
          previousScore: a.previousScore ?? null,
          currentScore: a.currentScore ?? null,
          delta: a.delta ?? null,
        })),
    [achievements],
  );

  return {
    data,
    classes: data?.classes ?? [],
    snapshots: data?.snapshots ?? [],
    achievements,
    improvementHighlights,
    loading: query.isLoading,
    error: query.error
      ? query.error instanceof ApiError
        ? query.error.message
        : 'خطا در دریافت عملکرد.'
      : '',
    reload: () => query.refetch(),
  };
}

export function invalidateOverviewCache() {
  /* Prefer queryClient.invalidateQueries({ queryKey: queryKeys.overview }) in components. */
}

/** Fire-and-forget warm used by panel shell after auth resolves. */
export function useWarmOverviewCache() {
  const { request, user, loading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (loading || user?.role !== 'student') return;
    if (queryClient.getQueryData(queryKeys.overview)) return;
    void queryClient.prefetchQuery({
      queryKey: queryKeys.overview,
      queryFn: async () => {
        const raw = await request<StudentOverview>('/me/overview');
        return normalizeOverview(raw);
      },
      staleTime: 90_000,
    });
  }, [loading, user, request, queryClient]);
}

/** @deprecated Use useWarmOverviewCache */
export function warmOverviewCache(
  _request: <T>(path: string, init?: RequestInit) => Promise<T>,
) {
  void _request;
}
