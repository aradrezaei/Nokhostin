'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ClipboardCheck, Star } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { CLASS_STATUS_LABEL, formatDate, formatSchedule, toFa } from '@/lib/format';
import type { ClassDetail } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Badge, Button, Card } from '@/components/panel/ui';
import { Spinner } from '@/components/panel/widgets';

export default function MentorClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { request } = useAuth();
  const [klass, setKlass] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'sessions' | 'students'>('sessions');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setKlass(await request<ClassDetail>(`/classes/${id}`));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس.');
    } finally {
      setLoading(false);
    }
  }, [request, id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Spinner />;
  if (error && !klass) return <Alert>{error}</Alert>;
  if (!klass) return null;

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-bold text-slate-400">
          <Link href="/mentor/classes" className="hover:text-[#7c3aed]">
            کلاس‌های من
          </Link>
          {' / '}جزئیات
        </p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">{klass.title}</h1>
            <p className="mt-1 text-sm font-bold text-slate-400">
              {klass.course?.name}
              {klass.course?.level ? ` · ${klass.course.level}` : ''}
              {' · '}ترم {toFa(klass.termNumber)}
              {' · '}
              {formatSchedule(klass.schedule)}
            </p>
          </div>
          <Badge tone={klass.status === 'active' ? 'green' : 'gray'}>
            {CLASS_STATUS_LABEL[klass.status]}
          </Badge>
        </div>
        <p className="mt-2 text-xs font-bold text-slate-400">
          شروع ترم: {klass.startDateJalali ?? formatDate(klass.startDate)}
          {' · '}
          جلسه {toFa(klass.sessionsHeld)} از {toFa(klass.totalSessions)} برگزار شده
        </p>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="flex gap-2 rounded-2xl border-2 border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900/50">
        {(
          [
            { key: 'sessions', label: 'جلسات' },
            { key: 'students', label: 'هنرجویان' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-black ${
              tab === t.key
                ? 'bg-[#7c3aed] text-white border-2 border-[#5b21b6] border-b-4'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sessions' && (
        <div className="space-y-2">
          {klass.sessions.map((s) => (
            <Card key={s.id} className="!p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  جلسه {toFa(s.sessionNumber)}
                </p>
                <p className="text-xs font-bold text-slate-400">
                  {s.scheduledDateJalali ?? formatDate(s.scheduledDate)}
                  {s.isToday ? ' · امروز' : ''}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={s.status === 'held' ? 'green' : s.isToday ? 'violet' : 'gray'}>
                  {s.status === 'held' ? 'برگزارشده' : s.isToday ? 'امروز' : 'زمان‌بندی‌شده'}
                </Badge>
                <Link href={`/mentor/classes/${id}/sessions/${s.id}/attendance`}>
                  <Button variant="ghost" className="!px-3 !py-2">
                    <ClipboardCheck className="h-4 w-4" /> حضور و غیاب
                  </Button>
                </Link>
                <Link href={`/mentor/classes/${id}/sessions/${s.id}/evaluations`}>
                  <Button className="!px-3 !py-2">
                    <Star className="h-4 w-4" /> ارزیابی
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'students' && (
        <div className="space-y-2">
          {klass.students.length === 0 ? (
            <p className="py-10 text-center text-sm font-bold text-slate-400">
              هنرجویی در این کلاس نیست. مدیر باید هنرجو اضافه کند.
            </p>
          ) : (
            klass.students.map((row) => (
              <Card
                key={row.enrollmentId}
                className="!p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={row.student.fullName} seed={row.student.id} size={40} />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      {row.student.fullName}
                    </p>
                    <p dir="ltr" className="mt-0.5 text-xs font-bold text-slate-400">
                      {row.student.mobile}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/mentor/classes/${id}/students/${row.student.id}/grade`}>
                    <Button variant="ghost" className="!px-3 !py-2">
                      نمره ترم
                    </Button>
                  </Link>
                  <Link href={`/mentor/classes/${id}/students/${row.student.id}`}>
                    <Button className="!px-3 !py-2">گزارش پیشرفت</Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
