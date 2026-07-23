'use client';

import {
  CalendarClock,
  Clock3,
  TrendingUp,
  Trophy,
  UserCheck,
  UserX,
} from 'lucide-react';
import type { ClassProgress, Medal as MedalType } from '@/lib/types';
import { formatScore, formatSchedule, toFa } from '@/lib/format';
import Medal from '@/components/panel/Medal';
import { Card } from '@/components/panel/ui';
import AttendanceBar from '@/components/panel/viz/AttendanceBar';
import LineChart from '@/components/panel/viz/LineChart';
import ProgressRing from '@/components/panel/viz/ProgressRing';
import SkillBars from '@/components/panel/viz/SkillBars';
import { SectionTitle, StatTile, TuitionPill } from '@/components/panel/widgets';

/**
 * Class progress surface — factual, light DOM, no motivational fluff.
 */
export default function ProgressView({
  data,
  studentName,
  showTuition = true,
}: {
  data: ClassProgress;
  studentName?: string;
  showTuition?: boolean;
}) {
  const { attendance, evaluations, sessions, medals, rank, improvement, termGrade } = data;
  const attended = attendance.present + attendance.late;
  const marked = attended + attendance.absent;
  const attendanceRate = marked > 0 ? Math.round((attended / marked) * 100) : 0;

  const displayMedals = (() => {
    const list = [...medals];
    const has = (code: MedalType['code']) => list.some((m) => m.code === code);
    if (rank.isTop && data.score !== null && !has('top_rank')) {
      list.push({
        code: 'top_rank',
        title: 'مقام اول',
        description: 'بالاترین نمره این کلاس',
      });
    }
    if (improvement.improved && !has('improved')) {
      list.push({
        code: 'improved',
        title: 'پیشرفت',
        description: 'نمره بالاتر از ترم قبل',
      });
    }
    return list;
  })();

  return (
    <div className="w-full space-y-5 overflow-x-hidden">
      <header className="panel-card flex flex-wrap items-start justify-between gap-4 !p-5 sm:!p-6">
        <div className="min-w-0 flex-1">
          {studentName ? (
            <p className="text-xs font-bold text-[var(--p-accent)]">{studentName}</p>
          ) : null}
          <h1 className="truncate text-xl font-extrabold text-[var(--p-ink)] sm:text-2xl">
            {data.class.title}
          </h1>
          <p className="mt-1 text-sm font-bold leading-6 text-[var(--p-muted)]">
            {data.class.course?.name}
            {data.class.course?.level ? ` · ${data.class.course.level}` : ''}
            {' · '}ترم {toFa(data.class.termNumber)}
            <span className="mt-0.5 block sm:mt-0 sm:inline">
              <span className="hidden sm:inline">{' · '}</span>
              {formatSchedule(data.class.schedule)}
            </span>
          </p>
        </div>
        {showTuition ? <TuitionPill paid={data.tuitionPaid} /> : null}
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="panel-card px-3 py-4 text-center sm:px-4 sm:py-5">
          <p className="text-xl font-extrabold text-[var(--p-accent)] sm:text-2xl">
            {formatScore(data.score)}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">نمره</p>
        </div>
        <div className="panel-card px-3 py-4 text-center sm:px-4 sm:py-5">
          <p className="text-xl font-extrabold text-[var(--p-ink)] sm:text-2xl">
            {marked > 0 ? `${toFa(attendanceRate)}٪` : '—'}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">حضور</p>
        </div>
        <div className="panel-card px-3 py-4 text-center sm:px-4 sm:py-5">
          <p className="text-xl font-extrabold text-[var(--p-ink)] sm:text-2xl">
            {rank.isTop ? '۱' : '—'}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">رتبه</p>
        </div>
        <div className="panel-card px-3 py-4 text-center sm:px-4 sm:py-5">
          <p className="text-xl font-extrabold text-[var(--p-ink)] sm:text-2xl">
            {toFa(sessions.current)}/{toFa(sessions.total)}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">جلسات</p>
        </div>
      </div>

      {displayMedals.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2">
          {displayMedals.map((m) => (
            <div
              key={m.code}
              className={`panel-card flex items-center gap-4 !p-4 ${
                m.code === 'improved'
                  ? 'border-emerald-200 dark:border-emerald-900/50'
                  : 'border-amber-200 dark:border-amber-900/50'
              }`}
            >
              <Medal code={m.code} size={72} />
              <div>
                <p className="text-sm font-extrabold text-[var(--p-ink)]">{m.title}</p>
                <p className="mt-1 text-xs font-bold text-[var(--p-muted)]">{m.description}</p>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]">
        <Card className="flex flex-col items-center justify-center !p-5 sm:!p-6">
          <SectionTitle title="پیشرفت ترم" hint={`${toFa(sessions.remaining)} جلسه مانده`} />
          <ProgressRing
            value={sessions.current}
            max={sessions.total}
            label={`${sessions.current}/${sessions.total}`}
            sublabel="جلسه برگزارشده"
          />
        </Card>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <StatTile
            tone="emerald"
            icon={<UserCheck className="h-5 w-5" />}
            label="حضور"
            value={attendance.present}
          />
          <StatTile
            tone="rose"
            icon={<UserX className="h-5 w-5" />}
            label="غیبت"
            value={attendance.absent}
          />
          <StatTile
            tone="amber"
            icon={<Clock3 className="h-5 w-5" />}
            label="تأخیر"
            value={attendance.late}
          />
          <StatTile
            tone="sky"
            icon={<CalendarClock className="h-5 w-5" />}
            label="دقایق تأخیر"
            value={attendance.totalLateMinutes}
          />
        </div>
      </div>

      <Card>
        <SectionTitle title="حضور و غیاب" />
        <AttendanceBar
          present={attendance.present}
          late={attendance.late}
          absent={attendance.absent}
        />
        {attendance.lateSessions.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {attendance.lateSessions.map((l) => (
              <span
                key={l.sessionNumber}
                className="rounded-xl border-2 border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
              >
                جلسه {toFa(l.sessionNumber)} · {toFa(l.lateMinutes)} دقیقه
              </span>
            ))}
          </div>
        ) : null}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle title="مهارت‌ها" hint="میانگین از ۵" />
          <SkillBars
            axes={[
              { label: 'شنیدن', value: evaluations.averages.listening },
              { label: 'نوشتن', value: evaluations.averages.writing },
              { label: 'خواندن', value: evaluations.averages.reading },
              { label: 'صحبت', value: evaluations.averages.speaking },
            ]}
          />
        </Card>

        <Card className="!overflow-hidden">
          <SectionTitle title="روند ترم" hint="میانگین هر جلسه" />
          <LineChart
            max={5}
            points={evaluations.series.map((p) => ({
              x: p.sessionNumber,
              y: p.average,
            }))}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-[11px] font-bold text-slate-400">نمره کلی</p>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                {formatScore(data.score)}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-[11px] font-bold text-slate-400">جایگاه</p>
              <p className="flex items-center gap-1.5 text-lg font-extrabold text-slate-900 dark:text-white">
                {rank.isTop ? (
                  <>
                    <Trophy className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="truncate text-amber-600 dark:text-amber-400">مقام اول</span>
                  </>
                ) : (
                  <span className="truncate text-slate-400">—</span>
                )}
              </p>
            </div>
          </div>
          {improvement.previousScore !== null ? (
            <div
              className={`mt-3 flex items-start gap-3 rounded-2xl border-2 px-3 py-3 ${
                improvement.improved
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40'
              }`}
            >
              {improvement.improved ? (
                <Medal code="improved" size={48} className="shrink-0" />
              ) : (
                <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
              )}
              <div className="min-w-0">
                <p
                  className={`text-xs font-extrabold ${
                    improvement.improved
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {improvement.improved ? 'پیشرفت نسبت به ترم قبل' : 'مقایسه با ترم قبل'}
                </p>
                <p className="mt-1 text-xs font-bold leading-5 text-slate-600 dark:text-slate-300">
                  ترم قبل: {formatScore(improvement.previousScore)}
                  {improvement.delta !== null ? (
                    <>
                      {' '}
                      · تغییر: {improvement.delta > 0 ? '+' : ''}
                      {formatScore(improvement.delta)}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          ) : null}
        </Card>
      </div>

      <Card>
        <SectionTitle title="نمرات ترم" hint="از ۱۰۰" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'میان‌ترم', value: termGrade?.midterm },
            { label: 'پایان‌ترم', value: termGrade?.final },
            { label: 'اسپیکینگ پایانی', value: termGrade?.finalSpeaking },
            { label: 'لیسنینگ پایانی', value: termGrade?.finalListening },
          ].map((g) => (
            <div
              key={g.label}
              className="rounded-2xl border-2 border-slate-200 border-b-4 px-3 py-4 text-center dark:border-slate-800"
            >
              <p className="text-2xl font-extrabold text-[#7c3aed] dark:text-[#a78bfa]">
                {formatScore(g.value ?? null)}
              </p>
              <p className="mt-1 text-[11px] font-bold text-slate-400">{g.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
