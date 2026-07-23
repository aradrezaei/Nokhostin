'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { formatApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { ClassSummary, Paginated } from '@/lib/types';
import { Alert } from '@/components/panel/ui';

function firstName(fullName: string | undefined): string {
  if (!fullName) return '';
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export default function MentorHomePage() {
  const { user, request } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ['mentor', 'classes', 'active'],
    staleTime: 60_000,
    queryFn: () => request<Paginated<ClassSummary>>('/classes?pageSize=50&status=active'),
  });

  const items = data?.items ?? [];
  const students = items.reduce((sum, c) => sum + c.studentCount, 0);
  const name = firstName(user?.fullName);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 lg:mx-0 lg:max-w-4xl">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-extrabold text-[var(--p-ink)]">
          سلام{name ? ` ${name}` : ''}
        </h1>
        <p className="text-sm font-bold text-[var(--p-muted)]">کلاس‌ها و هنرجوهای فعال شما.</p>
      </header>

      {error ? <Alert>{formatApiError(error, 'خطا در دریافت کلاس‌ها.')}</Alert> : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="panel-card px-3 py-4">
          <GraduationCap className="h-5 w-5 text-[var(--p-accent)]" strokeWidth={2.25} />
          <p className="mt-3 text-2xl font-extrabold text-[var(--p-ink)]">
            {isLoading ? '—' : toFa(items.length)}
          </p>
          <p className="mt-0.5 text-[11px] font-extrabold text-[var(--p-muted)]">کلاس فعال</p>
        </div>
        <div className="panel-card px-3 py-4">
          <Users className="h-5 w-5 text-[var(--p-accent)]" strokeWidth={2.25} />
          <p className="mt-3 text-2xl font-extrabold text-[var(--p-ink)]">
            {isLoading ? '—' : toFa(students)}
          </p>
          <p className="mt-0.5 text-[11px] font-extrabold text-[var(--p-muted)]">هنرجو</p>
        </div>
        <div className="panel-card col-span-2 px-3 py-4 sm:col-span-1">
          <BookOpen className="h-5 w-5 text-[var(--p-accent)]" strokeWidth={2.25} />
          <p className="mt-3 text-2xl font-extrabold text-[var(--p-ink)]">
            {isLoading
              ? '—'
              : toFa(items.reduce((s, c) => s + c.sessionsHeld, 0))}
          </p>
          <p className="mt-0.5 text-[11px] font-extrabold text-[var(--p-muted)]">جلسه برگزارشده</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-extrabold text-[var(--p-ink)]">کلاس‌های فعال</h2>
          <Link href="/mentor/classes" className="text-xs font-extrabold text-[var(--p-accent)]">
            همه
          </Link>
        </div>

        {!isLoading && items.length === 0 ? (
          <div className="panel-card px-6 py-12 text-center">
            <p className="text-sm font-extrabold text-[var(--p-ink)]">کلاسی تخصیص داده نشده</p>
            <p className="mt-1 text-xs font-bold text-[var(--p-muted)]">
              از مدیر بخواهید شما را به کلاس وصل کند.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {(isLoading ? [] : items.slice(0, 6)).map((item) => {
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
      </section>
    </div>
  );
}
