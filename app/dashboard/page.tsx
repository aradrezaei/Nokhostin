'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft, Flame, Target, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatScore, toFa } from '@/lib/format';
import type { ClassProgress } from '@/lib/types';
import { useMyClasses } from '@/hook/useMyClasses';
import Avatar from '@/components/panel/Avatar';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert, Card } from '@/components/panel/ui';
import { EmptyState, Spinner, StatTile } from '@/components/panel/widgets';

type Snapshot = {
  classId: string;
  title: string;
  score: number | null;
  rankLabel: string;
  attendanceRate: number | null;
  medals: number;
  sessionLabel: string;
};

export default function DashboardHome() {
  const { user, request } = useAuth();
  const { items, loading, error } = useMyClasses();
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [snapLoading, setSnapLoading] = useState(false);

  const active = useMemo(() => items.filter((i) => i.status === 'active'), [items]);
  const unpaid = useMemo(() => active.filter((i) => !i.tuitionPaid).length, [active]);
  const targetIds = useMemo(
    () =>
      active
        .slice(0, 4)
        .map((e) => e.class.id)
        .join(','),
    [active],
  );

  useEffect(() => {
    if (!targetIds) {
      setSnapshots([]);
      return;
    }

    const targets = active.slice(0, 4);
    let cancelled = false;
    setSnapLoading(true);

    Promise.all(
      targets.map(async (entry) => {
        try {
          const data = await request<ClassProgress>(
            `/me/classes/${entry.class.id}/progress`,
          );
          const attended = data.attendance.present + data.attendance.late;
          const marked = attended + data.attendance.absent;
          return {
            classId: entry.class.id,
            title: entry.class.title,
            score: data.score,
            rankLabel: data.rank.position
              ? `${toFa(data.rank.position)} / ${toFa(data.rank.totalRanked)}`
              : '—',
            attendanceRate: marked > 0 ? Math.round((attended / marked) * 100) : null,
            medals: data.medals.length,
            sessionLabel: `${toFa(data.sessions.current)}/${toFa(data.sessions.total)}`,
          } satisfies Snapshot;
        } catch {
          return null;
        }
      }),
    ).then((rows) => {
      if (!cancelled) {
        setSnapshots(rows.filter((r): r is Snapshot => r !== null));
        setSnapLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
    // active is derived from items; targetIds is the stable trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIds, request]);

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
            عملکردت اینجاست — دقیق، سریع، بدون شلوغی.
          </p>
        </div>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-1 rounded-2xl border-2 border-slate-200 border-b-4 px-4 py-2 text-xs font-black text-slate-600 hover:border-[#7c3aed] hover:text-[#7c3aed] dark:border-slate-700 dark:text-slate-300"
        >
          پروفایل کامل
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
          tone={unpaid > 0 ? 'rose' : 'emerald'}
          icon={<Trophy className="h-5 w-5" />}
          label="شهریه باز"
          value={loading ? '—' : toFa(unpaid)}
        />
        <StatTile
          tone="sky"
          icon={<Target className="h-5 w-5" />}
          label="بهترین نمره"
          value={snapLoading && !snapshots.length ? '—' : formatScore(bestScore)}
        />
        <StatTile
          tone="amber"
          icon={<Flame className="h-5 w-5" />}
          label="میانگین حضور"
          value={
            snapLoading && avgAttendance === null
              ? '—'
              : avgAttendance === null
                ? '—'
                : `${toFa(avgAttendance)}٪`
          }
        />
      </div>

      {unpaid > 0 && (
        <Card className="!p-4 border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
          <p className="text-sm font-black text-rose-800 dark:text-rose-300">
            {toFa(unpaid)} کلاس شهریه پرداخت‌نشده داری
          </p>
          <p className="mt-1 text-xs font-bold text-rose-600/80 dark:text-rose-400">
            برای تسویه با آموزشگاه هماهنگ کن.
          </p>
        </Card>
      )}

      {snapshots.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">عملکرد لحظه‌ای</h2>
            <span className="text-[11px] font-bold text-slate-400">نمره · رتبه · حضور</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {snapshots.map((s) => (
              <Link key={s.classId} href={`/dashboard/courses/${s.classId}`} className="block">
                <Card className="!p-4 hover:border-[#7c3aed]/50">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-black text-slate-900 dark:text-white">
                      {s.title}
                    </p>
                    <ChevronLeft className="h-4 w-4 shrink-0 text-slate-300" />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-slate-50 px-2 py-2 dark:bg-slate-900/50">
                      <p className="text-base font-black text-[#7c3aed]">
                        {formatScore(s.score)}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">نمره</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-2 py-2 dark:bg-slate-900/50">
                      <p className="text-base font-black text-slate-900 dark:text-white">
                        {s.rankLabel}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">رتبه</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-2 py-2 dark:bg-slate-900/50">
                      <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {s.attendanceRate === null ? '—' : `${toFa(s.attendanceRate)}٪`}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">حضور</p>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-slate-400">
                    جلسه {s.sessionLabel}
                    {s.medals > 0 ? ` · ${toFa(s.medals)} مدال` : ''}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">کلاس‌های من</h2>
          <Link href="/dashboard/courses" className="text-xs font-black text-[#7c3aed]">
            همه
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="هنوز در کلاسی ثبت نشدی"
            hint="وقتی مدیر تو را به کلاس اضافه کند، اینجا می‌آید."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.slice(0, 4).map((entry) => (
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
