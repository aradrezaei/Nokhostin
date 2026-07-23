'use client';

import Link from 'next/link';
import { BookOpen, Check, Lock, TrendingUp, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatScore, toFa } from '@/lib/format';
import { useMyOverview } from '@/hooks/useMyOverview';
import { usePrefetchClassProgress } from '@/hooks/useClassProgress';
import ImprovementModal from '@/components/panel/ImprovementModal';
import { Alert } from '@/components/panel/ui';

function firstName(fullName: string | undefined): string {
  if (!fullName) return '';
  const part = fullName.trim().split(/\s+/)[0];
  return part || fullName;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { classes, snapshots, improvementHighlights, error } = useMyOverview();
  const prefetch = usePrefetchClassProgress();
  const name = firstName(user?.fullName);

  const unpaid = classes.filter((i) => i.status === 'active' && !i.tuitionPaid);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 lg:mx-0 lg:max-w-3xl">
      <ImprovementModal items={improvementHighlights} />

      <header className="space-y-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--p-ink)]">
          سلام{name ? ` ${name}` : ''}
        </h1>
        <p className="text-sm font-bold leading-6 text-[var(--p-muted)]">
          اینجا می‌تونی وضعیتت توی کلاس‌هات رو ببینی.
        </p>
      </header>

      {error ? <Alert>{error}</Alert> : null}

      {unpaid.length > 0 ? (
        <div className="panel-card flex items-center gap-4 border-[var(--p-rose)] p-4 sm:p-5">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--p-rose)_12%,transparent)] text-3xl font-black text-[var(--p-rose)]"
            aria-hidden
          >
            !
          </span>
          <div className="min-w-0">
            <p className="text-base font-extrabold text-[var(--p-ink)]">
              {toFa(unpaid.length)} کلاس شهریه پرداخت‌نشده
            </p>
            <p className="mt-1 text-xs font-bold text-[var(--p-muted)]">
              برای ادامه، با آموزشگاه هماهنگ کن.
            </p>
          </div>
        </div>
      ) : null}

      {classes.length === 0 ? (
        <section className="panel-card flex flex-col items-center gap-3 px-6 py-14 text-center">
          <span className="panel-path-node panel-path-node--idle inline-flex items-center justify-center">
            <Lock className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="text-sm font-extrabold text-[var(--p-ink)]">هنوز کلاسی ثبت نشده</p>
        </section>
      ) : (
        <section className="space-y-4">
          <h2 className="text-sm font-extrabold text-[var(--p-ink)]">کلاس‌های من</h2>
          <ol className="relative mx-auto flex max-w-sm flex-col items-center gap-5 sm:max-w-md">
            <span
              aria-hidden
              className="absolute inset-y-3 start-1/2 w-1 -translate-x-1/2 rounded-full bg-[var(--p-line)]"
            />
            {classes.map((entry) => {
              const snap = snapshots.find((s) => s.classId === entry.class.id);
              const improved =
                snap?.improvement?.improved ?? snap?.medals.some((m) => m.code === 'improved');
              const isTop = Boolean(snap?.isTop);
              const done = entry.class.status === 'finished';
              const locked = entry.class.status === 'archived';
              const pct =
                entry.class.totalSessions > 0
                  ? Math.min((entry.class.sessionsHeld / entry.class.totalSessions) * 100, 100)
                  : 0;

              return (
                <li
                  key={entry.enrollmentId}
                  className="relative z-[1] flex w-full flex-col items-center gap-2"
                >
                  <Link
                    href={`/dashboard/courses/${entry.class.id}`}
                    onMouseEnter={() => {
                      prefetch(entry.class.id);
                    }}
                    className={`panel-path-node inline-flex items-center justify-center ${
                      isTop
                        ? 'panel-path-node--gold'
                        : done || locked
                          ? 'panel-path-node--idle'
                          : ''
                    }`}
                    aria-label={entry.class.title}
                  >
                    {isTop ? (
                      <Trophy className="h-7 w-7" strokeWidth={2.5} />
                    ) : done ? (
                      <Check className="h-7 w-7" strokeWidth={3} />
                    ) : locked ? (
                      <Lock className="h-6 w-6" strokeWidth={2.5} />
                    ) : (
                      <BookOpen className="h-7 w-7" strokeWidth={2.5} />
                    )}
                  </Link>

                  <Link
                    href={`/dashboard/courses/${entry.class.id}`}
                    onMouseEnter={() => {
                      prefetch(entry.class.id);
                    }}
                    className="panel-card w-full px-4 py-3.5 text-center hover:border-[var(--p-accent)]"
                  >
                    <p className="truncate text-sm font-extrabold text-[var(--p-ink)]">
                      {entry.class.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--p-muted)]">
                      {entry.class.course?.name ?? '—'}
                      {' · '}ترم {toFa(entry.class.termNumber)}
                      {snap?.score != null ? ` · نمره ${formatScore(snap.score)}` : ''}
                    </p>

                    <div className="mx-auto mt-2.5 h-1.5 max-w-[12rem] overflow-hidden rounded-full bg-[var(--p-line)]">
                      <div
                        className="h-full rounded-full bg-[var(--p-accent)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                      {isTop ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                          <Trophy className="h-3 w-3" />
                          مقام اول
                        </span>
                      ) : null}
                      {improved ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                          <TrendingUp className="h-3 w-3" />
                          پیشرفت
                        </span>
                      ) : null}
                      <span className="text-[10px] font-extrabold text-[var(--p-muted)]">
                        جلسه {toFa(entry.class.sessionsHeld)}/{toFa(entry.class.totalSessions)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
}
