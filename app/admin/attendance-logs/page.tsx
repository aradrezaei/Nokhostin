'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { ATTENDANCE_LABEL, toFa } from '@/lib/format';
import { Alert, Badge, Card } from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

interface AttendanceLogItem {
  id: string;
  classId: string;
  classTitle: string;
  sessionNumber: number;
  scheduledDateJalali: string;
  studentName: string;
  actorName: string;
  previousStatus: string | null;
  newStatus: string;
  lateMinutes: number;
  smsSent: boolean;
  smsKind: string | null;
  recordedAtJalali: string;
}

interface LogsResponse {
  items: AttendanceLogItem[];
  pagination: { page: number; pageSize: number; total: number };
}

export default function AdminAttendanceLogsPage() {
  const { request } = useAuth();
  const [data, setData] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setData(
        await request<LogsResponse>(`/classes/attendance-logs?page=${page}&pageSize=40`),
      );
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت لاگ‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request, page]);

  useEffect(() => {
    load();
  }, [load]);

  const items = data?.items ?? [];
  const total = data?.pagination.total ?? 0;
  const pageSize = data?.pagination.pageSize ?? 40;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">لاگ حضور و غیاب</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          هر تغییر حضور، با تاریخ شمسی و وضعیت پیامک اینجا ثبت می‌شود.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="h-6 w-6" />}
          title="لاگی ثبت نشده"
          hint="پس از ثبت حضور توسط استاد یا مدیر، رکوردها اینجا می‌آیند."
        />
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id} className="!p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {item.studentName}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <Link href={`/admin/classes/${item.classId}`} className="hover:text-[#7c3aed]">
                      {item.classTitle}
                    </Link>
                    {' · '}جلسه {toFa(item.sessionNumber)}
                    {' · '}
                    {item.scheduledDateJalali}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    ثبت‌کننده: {item.actorName} · {item.recordedAtJalali}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {item.previousStatus && (
                    <Badge tone="gray">
                      {ATTENDANCE_LABEL[item.previousStatus] ?? item.previousStatus}
                    </Badge>
                  )}
                  <span className="text-xs font-bold text-slate-400">←</span>
                  <Badge
                    tone={
                      item.newStatus === 'present'
                        ? 'green'
                        : item.newStatus === 'late'
                          ? 'amber'
                          : 'gray'
                    }
                  >
                    {ATTENDANCE_LABEL[item.newStatus] ?? item.newStatus}
                    {item.newStatus === 'late' ? ` (${toFa(item.lateMinutes)}د)` : ''}
                  </Badge>
                  {item.smsSent ? (
                    <Badge tone="violet">
                      پیامک {item.smsKind === 'late' ? 'تأخیر' : 'غیبت'}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border-2 border-slate-200 px-3 py-2 text-xs font-black disabled:opacity-40 dark:border-slate-700"
          >
            قبلی
          </button>
          <span className="text-xs font-bold text-slate-500">
            {toFa(page)} / {toFa(pages)}
          </span>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="rounded-xl border-2 border-slate-200 px-3 py-2 text-xs font-black disabled:opacity-40 dark:border-slate-700"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}
