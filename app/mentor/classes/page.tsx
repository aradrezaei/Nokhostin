'use client';

import { useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'nuqs';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { formatApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { ClassSummary, Paginated } from '@/lib/types';
import { Alert, Select } from '@/components/panel/ui';

export default function MentorClassesPage() {
  const { request } = useAuth();
  const [status, setStatus] = useQueryState('status', parseAsString.withDefault('active'));

  const { data, error, isLoading } = useQuery({
    queryKey: ['mentor', 'classes', status],
    staleTime: 60_000,
    queryFn: async () => {
      const params = new URLSearchParams({ pageSize: '50' });
      if (status) params.set('status', status);
      return await request<Paginated<ClassSummary>>(`/classes?${params}`);
    },
  });

  const items = data?.items ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 lg:mx-0 lg:max-w-4xl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--p-ink)]">کلاس‌های من</h1>
          <p className="mt-1 text-sm font-bold text-[var(--p-muted)]">کلاس‌هایی که استاد آن‌ها هستید</p>
        </div>
        <Select
          value={status}
          onChange={(e) => {
            void setStatus(e.target.value);
          }}
          className="w-44"
        >
          <option value="">همه</option>
          <option value="active">فعال</option>
          <option value="finished">پایان‌یافته</option>
        </Select>
      </header>

      {error ? <Alert>{formatApiError(error, 'خطا در دریافت کلاس‌ها.')}</Alert> : null}

      {isLoading ? (
        <div className="h-40" aria-hidden />
      ) : items.length === 0 ? (
        <div className="panel-card flex flex-col items-center gap-2 px-6 py-14 text-center">
          <GraduationCap className="h-8 w-8 text-[var(--p-muted)]" strokeWidth={2.25} />
          <p className="text-sm font-extrabold text-[var(--p-ink)]">کلاسی یافت نشد</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const pct =
              item.totalSessions > 0
                ? Math.min((item.sessionsHeld / item.totalSessions) * 100, 100)
                : 0;
            return (
              <li key={item.id}>
                <Link
                  href={`/mentor/classes/${item.id}`}
                  className="panel-card flex items-center gap-4 !p-4 hover:border-[var(--p-accent)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--p-accent)] text-white">
                    <GraduationCap className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold text-[var(--p-ink)]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] font-bold text-[var(--p-muted)]">
                      {item.course?.name ?? '—'}
                      {' · '}ترم {toFa(item.termNumber)}
                      {' · '}
                      {toFa(item.studentCount)} هنرجو
                      {' · '}جلسه {toFa(item.sessionsHeld)}/{toFa(item.totalSessions)}
                    </span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[var(--p-line)]">
                      <span
                        className="block h-full rounded-full bg-[var(--p-accent)]"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
