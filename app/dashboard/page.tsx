'use client';

import Link from 'next/link';
import { BookOpen, Check, Lock, Star, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatScore, toFa } from '@/lib/format';
import { useMyOverview } from '@/hooks/useMyOverview';
import { usePrefetchClassProgress } from '@/hooks/useClassProgress';
import ImprovementModal from '@/components/panel/ImprovementModal';
import Medal from '@/components/panel/Medal';
import { Alert } from '@/components/panel/ui';

function firstName(fullName: string | undefined): string {
  if (!fullName) return '';
  const part = fullName.trim().split(/\s+/)[0];
  return part || fullName;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { classes, snapshots, achievements, improvementHighlights, error } = useMyOverview();
  const prefetch = usePrefetchClassProgress();

  const active = classes.filter((i) => i.status === 'active');
  const unpaid = active.filter((i) => !i.tuitionPaid);
  const focusCandidate = active.length > 0 ? active[0] : classes.length > 0 ? classes[0] : undefined;
  const focus = focusCandidate ?? null;

  const focusSnap = focus ? snapshots.find((s) => s.classId === focus.class.id) : undefined;

  const warm = (id: string) => {
    prefetch(id);
  };

  const name = firstName(user?.fullName);

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <ImprovementModal items={improvementHighlights} />

      <header className="space-y-1">
        <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--p-muted)]">
          مسیر یادگیری
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--p-ink)]">
          سلام{name ? ` ${name}` : ''}
        </h1>
      </header>

      {error ? <Alert>{error}</Alert> : null}

      {unpaid.length > 0 ? (
        <div className="panel-card flex items-start gap-3 border-[var(--p-rose)] bg-[color-mix(in_srgb,var(--p-rose)_8%,var(--p-surface))] p-4">
          <span className="mt-0.5 text-sm font-extrabold text-[var(--p-rose)]">!</span>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-[var(--p-ink)]">
              {toFa(unpaid.length)} کلاس شهریهٔ باز
            </p>
            <p className="mt-1 text-xs font-bold text-[var(--p-muted)]">با آموزشگاه هماهنگ کنید.</p>
          </div>
        </div>
      ) : null}

      {/* Active lesson — Duo "START" unit */}
      {focus ? (
        <section className="relative">
          <div className="panel-card overflow-hidden">
            <div className="border-b-2 border-[var(--p-line)] bg-[color-mix(in_srgb,var(--p-green)_10%,var(--p-surface))] px-5 py-4">
              <p className="text-[11px] font-extrabold text-[var(--p-green)]">
                {focus.class.course?.name ?? 'کلاس فعال'}
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-[var(--p-ink)]">{focus.class.title}</h2>
            </div>
            <div className="flex flex-col items-center gap-5 px-5 py-8">
              <Link
                href={`/dashboard/courses/${focus.class.id}`}
                onMouseEnter={() => {
                  warm(focus.class.id);
                }}
                onFocus={() => {
                  warm(focus.class.id);
                }}
                className={`panel-path-node inline-flex items-center justify-center ${
                  focusSnap?.isTop ? 'panel-path-node--gold' : ''
                }`}
                aria-label={`ادامه ${focus.class.title}`}
              >
                {focusSnap?.isTop ? (
                  <Trophy className="h-8 w-8" strokeWidth={2.5} />
                ) : (
                  <Star className="h-8 w-8" strokeWidth={2.5} fill="currentColor" />
                )}
              </Link>

              <div className="w-full max-w-xs space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] font-extrabold text-[var(--p-muted)]">
                  <span>
                    جلسه {toFa(focus.class.sessionsHeld)} / {toFa(focus.class.totalSessions)}
                  </span>
                  <span>
                    {focusSnap?.attendanceRate != null
                      ? `حضور ${toFa(focusSnap.attendanceRate)}٪`
                      : '—'}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--p-line)]">
                  <div
                    className="h-full rounded-full bg-[var(--p-green)]"
                    style={{
                      width: `${
                        focus.class.totalSessions > 0
                          ? Math.min(
                              (focus.class.sessionsHeld / focus.class.totalSessions) * 100,
                              100,
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
                {focusSnap?.score != null ? (
                  <p className="text-xs font-extrabold text-[var(--p-ink)]">
                    نمره {formatScore(focusSnap.score)}
                  </p>
                ) : null}
              </div>

              <Link
                href={`/dashboard/courses/${focus.class.id}`}
                onMouseEnter={() => {
                  warm(focus.class.id);
                }}
                className="panel-btn panel-btn--green w-full max-w-xs uppercase tracking-wide"
              >
                ادامه
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="panel-card flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="panel-path-node panel-path-node--idle inline-flex items-center justify-center">
            <Lock className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <p className="text-sm font-extrabold text-[var(--p-ink)]">هنوز کلاسی نداری</p>
          <p className="text-xs font-bold text-[var(--p-muted)]">بعد از ثبت‌نام، مسیر اینجا باز می‌شود.</p>
        </section>
      )}

      {/* Path of other classes */}
      {classes.length > 1 && focus ? (
        <section className="space-y-4">
          <h2 className="text-center text-xs font-extrabold uppercase tracking-wide text-[var(--p-muted)]">
            بقیهٔ مسیر
          </h2>
          <ol className="relative mx-auto flex max-w-xs flex-col items-center gap-6">
            <span
              aria-hidden
              className="absolute inset-y-2 start-1/2 w-1 -translate-x-1/2 rounded-full bg-[var(--p-line)]"
            />
            {classes
              .filter((c) => c.class.id !== focus.class.id)
              .map((entry) => {
                const snap = snapshots.find((s) => s.classId === entry.class.id);
                const done = entry.class.status === 'finished';
                const locked = entry.class.status === 'archived';
                return (
                  <li key={entry.enrollmentId} className="relative z-[1] flex w-full flex-col items-center gap-2">
                    <Link
                      href={`/dashboard/courses/${entry.class.id}`}
                      onMouseEnter={() => {
                        warm(entry.class.id);
                      }}
                      className={`panel-path-node inline-flex items-center justify-center ${
                        snap?.isTop
                          ? 'panel-path-node--gold'
                          : done || locked
                            ? 'panel-path-node--idle'
                            : ''
                      }`}
                      aria-label={entry.class.title}
                    >
                      {snap?.isTop ? (
                        <Trophy className="h-7 w-7" strokeWidth={2.5} />
                      ) : done ? (
                        <Check className="h-7 w-7" strokeWidth={3} />
                      ) : locked ? (
                        <Lock className="h-6 w-6" strokeWidth={2.5} />
                      ) : (
                        <BookOpen className="h-7 w-7" strokeWidth={2.5} />
                      )}
                    </Link>
                    <div className="panel-card w-full px-4 py-3 text-center">
                      <p className="truncate text-sm font-extrabold text-[var(--p-ink)]">
                        {entry.class.title}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--p-muted)]">
                        {entry.class.course?.name ?? '—'}
                        {snap?.score != null ? ` · ${formatScore(snap.score)}` : ''}
                      </p>
                    </div>
                  </li>
                );
              })}
          </ol>
        </section>
      ) : null}

      {/* Medals strip — only if any */}
      {achievements.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-[var(--p-ink)]">مدال‌ها</h2>
            <Link
              href="/dashboard/profile"
              className="text-xs font-extrabold text-[var(--p-blue)]"
            >
              همه
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {achievements.map((a) => (
              <Link
                key={`${a.code}-${a.classId}`}
                href={`/dashboard/courses/${a.classId}`}
                onMouseEnter={() => {
                  warm(a.classId);
                }}
                className="panel-card flex w-[120px] shrink-0 flex-col items-center px-2 py-3"
              >
                <Medal code={a.code} size={64} />
                <p className="mt-1 text-[11px] font-extrabold text-[var(--p-ink)]">
                  {a.code === 'top_rank' ? 'مقام اول' : 'پیشرفت'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
