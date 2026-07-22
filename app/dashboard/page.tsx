'use client';

import Link from 'next/link';
import { BookOpen, ChevronLeft, Flame, Sparkles, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatScore, toFa } from '@/lib/format';
import { useMyOverview } from '@/hook/useMyOverview';
import Avatar from '@/components/panel/Avatar';
import { ClassCard } from '@/components/panel/ClassCard';
import Medal from '@/components/panel/Medal';
import { Alert, Card } from '@/components/panel/ui';
import { DeferredSpinner, EmptyState, StatTile } from '@/components/panel/widgets';

export default function DashboardHome() {
  const { user } = useAuth();
  const { classes, snapshots, achievements, loading, error } = useMyOverview();

  const active = classes.filter((i) => i.status === 'active');
  const unpaid = active.filter((i) => !i.tuitionPaid).length;
  const topCount = snapshots.filter((s) => s.isTop).length;

  const bestScore = snapshots.reduce<number | null>((best, s) => {
    if (s.score === null) return best;
    if (best === null) return s.score;
    return Math.max(best, s.score);
  }, null);

  const avgAttendance = (() => {
    const rates = snapshots
      .map((s) => s.attendanceRate)
      .filter((n): n is number => n !== null);
    if (!rates.length) return null;
    return Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
  })();

  return (
    <div className="space-y-6">
      <Card className="!p-5 flex flex-wrap items-center gap-4">
        {user && <Avatar name={user.fullName} seed={user.id} size={64} priority />}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#7c3aed]">پنل هنرجو</p>
          <h1 className="truncate text-2xl font-black text-slate-900 dark:text-white">
            {user?.fullName}
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            خلاصه کلاس‌ها، نمره و حضور
          </p>
        </div>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-1 rounded-2xl border-2 border-slate-200 border-b-4 px-4 py-2 text-xs font-black text-slate-600 hover:border-[#7c3aed] hover:text-[#7c3aed] dark:border-slate-700 dark:text-slate-300"
        >
          پروفایل
          <ChevronLeft className="h-3.5 w-3.5" />
        </Link>
      </Card>

      {error && <Alert>{error}</Alert>}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          icon={<BookOpen className="h-5 w-5" />}
          label="کلاس فعال"
          value={loading ? '—' : toFa(active.length)}
        />
        <StatTile
          tone="amber"
          icon={<Trophy className="h-5 w-5" />}
          label="مدال مقام اول"
          value={loading ? '—' : toFa(achievements.filter((a) => a.code === 'top_rank').length)}
        />
        <StatTile
          tone="sky"
          icon={<Sparkles className="h-5 w-5" />}
          label="بهترین نمره"
          value={loading ? '—' : formatScore(bestScore)}
        />
        <StatTile
          tone="emerald"
          icon={<Flame className="h-5 w-5" />}
          label="میانگین حضور"
          value={
            loading || avgAttendance === null ? '—' : `${toFa(avgAttendance)}٪`
          }
        />
      </div>

      {unpaid > 0 && (
        <Card className="!p-4 border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
          <p className="text-sm font-black text-rose-800 dark:text-rose-300">
            {toFa(unpaid)} کلاس شهریه پرداخت‌نشده داری
          </p>
          <p className="mt-1 text-xs font-bold text-rose-600/80 dark:text-rose-400">
            برای پرداخت شهریه با آموزشگاه تماس بگیرید.
          </p>
        </Card>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">مدال‌ها</h2>
          <Link href="/dashboard/profile" className="text-xs font-black text-[#7c3aed]">
            پروفایل
          </Link>
        </div>
        {loading && achievements.length === 0 ? (
          <DeferredSpinner active label="در حال بارگذاری مدال‌ها…" />
        ) : achievements.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {achievements.map((a) => (
              <Link
                key={`${a.code}-${a.classId}`}
                href={`/dashboard/courses/${a.classId}`}
                className="flex w-[148px] shrink-0 flex-col items-center rounded-3xl border-2 border-amber-200 border-b-4 bg-amber-50 px-3 py-4 text-center dark:border-amber-900/60 dark:bg-amber-950/30"
              >
                <Medal code={a.code} size={72} />
                <p className="mt-2 text-xs font-black text-slate-900 dark:text-white">
                  {a.code === 'top_rank' ? 'مقام اول' : a.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[10px] font-bold text-slate-400">
                  {a.classTitle}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="!p-5 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
              <Trophy className="h-6 w-6 text-amber-400" />
            </span>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">مدالی ثبت نشده</p>
              <p className="mt-1 text-xs font-bold leading-5 text-slate-400">
                با بالاترین نمره کلاس، مدال مقام اول اینجا نمایش داده می‌شود.
              </p>
            </div>
          </Card>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">عملکرد کلاس‌ها</h2>
          {topCount > 0 && (
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              {toFa(topCount)} مقام اول
            </span>
          )}
        </div>

        {loading && snapshots.length === 0 ? (
          <DeferredSpinner active />
        ) : snapshots.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="h-6 w-6" />}
            title="گزارشی از کلاس‌ها نیست"
            hint="پس از ثبت حضور و ارزیابی، آمار اینجا می‌آید."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {snapshots.map((s) => {
              const pct =
                s.sessionsTotal > 0
                  ? Math.min((s.sessionsCurrent / s.sessionsTotal) * 100, 100)
                  : 0;
              return (
                <Link key={s.classId} href={`/dashboard/courses/${s.classId}`} className="block">
                  <Card className="!p-4 hover:border-[#7c3aed]/50">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900 dark:text-white">
                          {s.title}
                        </p>
                        {s.courseName && (
                          <p className="mt-0.5 truncate text-[11px] font-bold text-slate-400">
                            {s.courseName}
                          </p>
                        )}
                      </div>
                      {s.isTop ? (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-xl border-2 border-amber-300 bg-amber-100 px-2 py-1 text-[10px] font-black text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                          <Trophy className="h-3 w-3" />
                          مقام اول
                        </span>
                      ) : (
                        <ChevronLeft className="h-4 w-4 shrink-0 text-slate-300" />
                      )}
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span>
                          جلسه {toFa(s.sessionsCurrent)} از {toFa(s.sessionsTotal)}
                        </span>
                        <span>{toFa(Math.round(pct))}٪</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-[#7c3aed]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-extrabold">
                      <span className="rounded-lg bg-slate-100 px-2 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        نمره {formatScore(s.score)}
                      </span>
                      <span className="rounded-lg bg-emerald-50 px-2 py-1 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        حضور{' '}
                        {s.attendanceRate === null ? '—' : `${toFa(s.attendanceRate)}٪`}
                      </span>
                      {s.medals.length > 0 && (
                        <span className="rounded-lg bg-amber-50 px-2 py-1 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                          {toFa(s.medals.length)} مدال
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">کلاس‌های من</h2>
          <Link href="/dashboard/courses" className="text-xs font-black text-[#7c3aed]">
            همه
          </Link>
        </div>
        {loading && classes.length === 0 ? (
          <DeferredSpinner active />
        ) : classes.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="کلاسی ثبت نشده"
            hint="پس از ثبت‌نام در کلاس، اینجا نمایش داده می‌شود."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {classes.slice(0, 4).map((entry) => (
              <ClassCard
                key={entry.enrollmentId}
                href={`/dashboard/courses/${entry.class.id}`}
                tuitionPaid={entry.tuitionPaid}
                item={{
                  id: entry.class.id,
                  title: entry.class.title,
                  termNumber: entry.class.termNumber,
                  totalSessions: entry.class.totalSessions,
                  schedule: entry.class.schedule,
                  status: entry.class.status,
                  course: entry.class.course,
                  teacher: entry.class.teacher,
                  sessionsHeld: entry.class.sessionsHeld,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
