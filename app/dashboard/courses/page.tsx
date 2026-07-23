'use client';

import Link from 'next/link';
import { BookOpen, Check, Lock, Star } from 'lucide-react';
import { formatScore, toFa } from '@/lib/format';
import { useMyOverview } from '@/hooks/useMyOverview';
import { usePrefetchClassProgress } from '@/hooks/useClassProgress';
import { Alert } from '@/components/panel/ui';

export default function StudentCoursesPage() {
  const { classes, snapshots, error } = useMyOverview();
  const prefetch = usePrefetchClassProgress();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--p-ink)]">کلاس‌ها</h1>
        <p className="mt-1 text-sm font-bold text-[var(--p-muted)]">یکی را انتخاب کن و ادامه بده.</p>
      </header>

      {error ? <Alert>{error}</Alert> : null}

      {classes.length === 0 ? (
        <div className="panel-card flex flex-col items-center gap-3 px-6 py-14 text-center">
          <span className="panel-path-node panel-path-node--idle inline-flex items-center justify-center">
            <BookOpen className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="text-sm font-extrabold text-[var(--p-ink)]">کلاسی نیست</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {classes.map((entry) => {
            const snap = snapshots.find((s) => s.classId === entry.class.id);
                const pct =
              entry.class.totalSessions > 0
                ? Math.min((entry.class.sessionsHeld / entry.class.totalSessions) * 100, 100)
                : 0;
            const done = entry.class.status === 'finished';
            const locked = entry.class.status === 'archived';

            return (
              <li key={entry.enrollmentId}>
                <Link
                  href={`/dashboard/courses/${entry.class.id}`}
                  onMouseEnter={() => {
                    prefetch(entry.class.id);
                  }}
                  className="panel-card flex items-center gap-4 p-4 transition-colors hover:border-[var(--p-green)]"
                >
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-b-4 ${
                      snap?.isTop
                        ? 'border-[var(--p-gold-deep)] bg-[var(--p-gold)] text-[#3c3c3c]'
                        : done || locked
                          ? 'border-[#bdbdbd] bg-[#e5e5e5] text-[#afafaf] dark:border-[#1a2830] dark:bg-[#2a3a44] dark:text-[#6b7c86]'
                          : 'border-[var(--p-green-deep)] bg-[var(--p-green)] text-white'
                    }`}
                  >
                    {snap?.isTop ? (
                      <Star className="h-6 w-6" fill="currentColor" strokeWidth={2} />
                    ) : done ? (
                      <Check className="h-6 w-6" strokeWidth={3} />
                    ) : locked ? (
                      <Lock className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <BookOpen className="h-6 w-6" strokeWidth={2.5} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold text-[var(--p-ink)]">
                      {entry.class.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] font-bold text-[var(--p-muted)]">
                      {entry.class.course?.name ?? '—'}
                      {snap?.score != null ? ` · نمره ${formatScore(snap.score)}` : ''}
                    </span>
                    <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[var(--p-line)]">
                      <span
                        className="block h-full rounded-full bg-[var(--p-green)]"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="mt-1 block text-[10px] font-extrabold text-[var(--p-muted)]">
                      {toFa(Math.round(pct))}٪ · جلسه {toFa(entry.class.sessionsHeld)}/
                      {toFa(entry.class.totalSessions)}
                      {!entry.tuitionPaid ? ' · شهریه باز' : ''}
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
