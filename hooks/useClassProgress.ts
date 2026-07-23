'use client';

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { queryKeys } from '@/lib/query/keys';
import type { ClassProgress } from '@/lib/types';

/** Cached /me/classes/:id/progress — instant paint on revisit + background revalidate. */
export function useClassProgress(classId: string | undefined) {
  const { request } = useAuth();

  const query = useQuery({
    queryKey: classId ? queryKeys.classProgress(classId) : ['me', 'classes', 'progress', 'idle'],
    queryFn: () => {
      if (!classId) throw new Error('classId is required');
      return request<ClassProgress>(`/me/classes/${classId}/progress`);
    },
    enabled: Boolean(classId),
    staleTime: 60_000,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error
      ? query.error instanceof ApiError
        ? query.error.message
        : 'خطا در دریافت روند رشد.'
      : '',
    reload: () => query.refetch(),
  };
}

/** Warm a class progress entry during idle time (hover / overview load). */
export function usePrefetchClassProgress() {
  const { request } = useAuth();
  const queryClient = useQueryClient();

  return useCallback(
    (classId: string) => {
      void queryClient.prefetchQuery({
        queryKey: queryKeys.classProgress(classId),
        queryFn: () => request<ClassProgress>(`/me/classes/${classId}/progress`),
        staleTime: 60_000,
      });
    },
    [queryClient, request],
  );
}

/** @deprecated Use usePrefetchClassProgress — kept for gradual migration. */
export function prefetchClassProgress(
  _request: <T>(path: string, init?: RequestInit) => Promise<T>,
  classId: string,
) {
  void _request;
  void classId;
}

export function putClassProgress(_classId: string, _data: ClassProgress) {
  void _classId;
  void _data;
}

export function invalidateClassProgressCache(_classId?: string) {
  void _classId;
}
