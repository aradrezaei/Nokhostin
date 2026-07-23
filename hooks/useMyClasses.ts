'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { queryKeys } from '@/lib/query/keys';
import type { MyClassEntry } from '@/lib/types';

/** Shared /me/classes via TanStack Query — snappy nav + shared cache. */
export function useMyClasses() {
  const { request } = useAuth();

  const query = useQuery({
    queryKey: queryKeys.classes,
    queryFn: () => request<MyClassEntry[]>('/me/classes'),
    staleTime: 60_000,
  });

  return {
    items: query.data ?? [],
    loading: query.isLoading,
    error: query.error
      ? query.error instanceof ApiError
        ? query.error.message
        : 'خطا در دریافت کلاس‌ها.'
      : '',
    reload: () => query.refetch(),
  };
}
