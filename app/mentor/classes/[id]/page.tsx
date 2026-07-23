'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ClipboardCheck, Star } from 'lucide-react';
import { formatApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import {
  CLASS_STATUS_LABEL,
  SESSION_STATUS_LABEL,
  formatDate,
  formatSchedule,
  toFa,
} from '@/lib/format';
import type { ClassDetail, ClassSession } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Badge, Button } from '@/components/panel/ui';

export default function MentorClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { request } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'sessions' | 'students'>('sessions');
  const [actionError, setActionError] = useState('');

  const { data: klass, error } = useQuery({
    queryKey: ['mentor', 'class', id],
    enabled: Boolean(id),
    staleTime: 30_000,
    queryFn: () => request<ClassDetail>(`/classes/${id}`),
  });

  const statusMutation = useMutation({
    mutationFn: async ({
      session,
      status,
    }: {
      session: ClassSession;
      status: 'canceled' | 'scheduled';
    }) => {
      await request(`/classes/${id}/sessions/${session.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return { sessionId: session.id, status };
    },
    onSuccess: ({ sessionId, status }) => {
      setActionError('');
      queryClient.setQueryData<ClassDetail>(['mentor', 'class', id], (prev) =>
        prev
          ? {
              ...prev,
              sessions: prev.sessions.map((s) => (s.id === sessionId ? { ...s, status } : s)),
            }
          : prev,
      );
    },
    onError: (e) => {
      setActionError(formatApiError(e, 'تغییر وضعیت جلسه ناموفق بود.'));
    },
  });

  if (!klass) {
    if (error) return <Alert>{formatApiError(error, 'خطا در دریافت کلاس.')}</Alert>;
    return <div className="h-48" aria-hidden />;
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 lg:mx-0 lg:max-w-4xl">
      <header>
        <p className="text-xs font-bold text-[var(--p-muted)]">
          <Link href="/mentor/classes" className="text-[var(--p-accent)]">
            کلاس‌ها
          </Link>
          {' / '}
          {klass.title}
        </p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-[var(--p-ink)]">{klass.title}</h1>
            <p className="mt-1 text-sm font-bold text-[var(--p-muted)]">
              {klass.course?.name}
              {klass.course?.level ? ` · ${klass.course.level}` : ''}
              {' · '}ترم {toFa(klass.termNumber)}
              {' · '}
              {formatSchedule(klass.schedule)}
            </p>
            <p className="mt-1 text-xs font-bold text-[var(--p-muted)]">
              شروع: {klass.startDateJalali ?? formatDate(klass.startDate)}
              {' · '}
              جلسه {toFa(klass.sessionsHeld)} از {toFa(klass.totalSessions)}
            </p>
          </div>
          <Badge tone={klass.status === 'active' ? 'green' : 'gray'}>
            {CLASS_STATUS_LABEL[klass.status]}
          </Badge>
        </div>
      </header>

      {actionError ? <Alert>{actionError}</Alert> : null}

      <div className="flex gap-1 rounded-2xl border-2 border-[var(--p-line)] bg-[var(--p-surface)] p-1">
        {(
          [
            { key: 'sessions', label: 'جلسات' },
            { key: 'students', label: 'هنرجویان' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setTab(t.key);
            }}
            className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-extrabold ${
              tab === t.key
                ? 'bg-[var(--p-accent)] text-white'
                : 'text-[var(--p-muted)] hover:text-[var(--p-ink)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sessions' ? (
        <div className="space-y-2">
          {klass.sessions.map((s) => {
            const canceled = s.status === 'canceled';
            const held = s.status === 'held';
            const mutatingSessionId = statusMutation.isPending
              ? statusMutation.variables.session.id
              : null;
            const busy = mutatingSessionId === s.id;
            return (
              <div
                key={s.id}
                className="panel-card flex flex-wrap items-center justify-between gap-3 !p-4"
              >
                <div>
                  <p className="text-sm font-extrabold text-[var(--p-ink)]">
                    جلسه {toFa(s.sessionNumber)}
                  </p>
                  <p className="text-xs font-bold text-[var(--p-muted)]">
                    {s.scheduledDateJalali ?? formatDate(s.scheduledDate)}
                    {s.isToday ? ' · امروز' : ''}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={held ? 'green' : canceled ? 'amber' : s.isToday ? 'violet' : 'gray'}>
                    {SESSION_STATUS_LABEL[s.status] ?? s.status}
                  </Badge>
                  {!canceled ? (
                    <>
                      <Link href={`/mentor/classes/${id}/sessions/${s.id}/attendance`}>
                        <Button variant="ghost" className="!px-3 !py-2">
                          <ClipboardCheck className="h-4 w-4" /> حضور
                        </Button>
                      </Link>
                      <Link href={`/mentor/classes/${id}/sessions/${s.id}/evaluations`}>
                        <Button className="!px-3 !py-2">
                          <Star className="h-4 w-4" /> ارزیابی
                        </Button>
                      </Link>
                    </>
                  ) : null}
                  {!held ? (
                    <Button
                      variant="subtle"
                      className="!px-3 !py-2"
                      disabled={busy}
                      onClick={() => {
                        statusMutation.mutate({
                          session: s,
                          status: canceled ? 'scheduled' : 'canceled',
                        });
                      }}
                    >
                      {canceled ? 'بازگردانی' : 'لغو'}
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {klass.students.length === 0 ? (
            <p className="panel-card py-10 text-center text-sm font-bold text-[var(--p-muted)]">
              هنرجویی در این کلاس نیست.
            </p>
          ) : (
            klass.students.map((row) => (
              <div
                key={row.enrollmentId}
                className="panel-card flex flex-wrap items-center justify-between gap-3 !p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={row.student.fullName} seed={row.student.id} size={40} />
                  <div>
                    <p className="text-sm font-extrabold text-[var(--p-ink)]">
                      {row.student.fullName}
                    </p>
                    <p dir="ltr" className="mt-0.5 text-xs font-bold text-[var(--p-muted)]">
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
                    <Button className="!px-3 !py-2">پیشرفت</Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
