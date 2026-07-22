'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { AttendanceRow, AttendanceStatus } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Button, Card, TextInput } from '@/components/panel/ui';
import { Spinner } from '@/components/panel/widgets';

type Draft = {
  status: AttendanceStatus;
  lateMinutes: number;
};

const STATUS_OPTS: { value: AttendanceStatus; label: string; tone: string }[] = [
  {
    value: 'present',
    label: 'حاضر',
    tone: 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
  {
    value: 'late',
    label: 'تأخیر',
    tone: 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  },
  {
    value: 'absent',
    label: 'غایب',
    tone: 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
  },
];

export default function MentorAttendancePage() {
  const { id, sessionId } = useParams<{ id: string; sessionId: string }>();
  const { request } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [draft, setDraft] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request<AttendanceRow[]>(
        `/classes/${id}/sessions/${sessionId}/attendance`,
      );
      setRows(data);
      const next: Record<string, Draft> = {};
      for (const row of data) {
        next[row.studentId] = {
          status: row.status ?? 'present',
          lateMinutes: row.lateMinutes || 5,
        };
      }
      setDraft(next);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت حضورغیاب.');
    } finally {
      setLoading(false);
    }
  }, [request, id, sessionId]);

  useEffect(() => {
    load();
  }, [load]);

  const markAll = (status: AttendanceStatus) => {
    setDraft((prev) => {
      const next = { ...prev };
      for (const row of rows) {
        next[row.studentId] = {
          status,
          lateMinutes: prev[row.studentId]?.lateMinutes || 5,
        };
      }
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setError('');
    setOk('');
    try {
      const records = rows.map((row) => {
        const d = draft[row.studentId]!;
        return {
          studentId: row.studentId,
          status: d.status,
          lateMinutes: d.status === 'late' ? Math.max(1, d.lateMinutes) : 0,
        };
      });
      await request(`/classes/${id}/sessions/${sessionId}/attendance`, {
        method: 'PUT',
        body: JSON.stringify({ records }),
      });
      setOk('حضور و غیاب ذخیره شد. در صورت غیبت/تأخیر پیامک ارسال می‌شود.');
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'ذخیره ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400">
            <Link href={`/mentor/classes/${id}`} className="hover:text-[#7c3aed]">
              بازگشت به کلاس
            </Link>
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            ثبت حضور و غیاب
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            برای تأخیر، دقیقه‌ها را وارد کنید — پیامک خودکار ارسال می‌شود.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => markAll('present')}>
            همه حاضر
          </Button>
          <Button variant="subtle" onClick={() => markAll('absent')}>
            همه غایب
          </Button>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}
      {ok && <Alert tone="success">{ok}</Alert>}

      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm font-bold text-slate-400">
          هنرجوی فعالی در این کلاس نیست.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const d = draft[row.studentId] ?? { status: 'present' as const, lateMinutes: 5 };
            return (
              <Card key={row.studentId} className="!p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={row.fullName} seed={row.studentId} size={40} />
                  <p className="flex-1 text-sm font-black text-slate-900 dark:text-white">
                    {row.fullName}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {STATUS_OPTS.map((opt) => {
                    const active = d.status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            [row.studentId]: { ...d, status: opt.value },
                          }))
                        }
                        className={`rounded-xl border-2 px-2 py-2.5 text-xs font-black ${
                          active
                            ? `${opt.tone} border-b-4`
                            : 'border-slate-200 text-slate-500 dark:border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                {d.status === 'late' && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">دقیقه تأخیر:</span>
                    <TextInput
                      type="number"
                      min={1}
                      max={600}
                      dir="ltr"
                      className="!w-24 !py-2"
                      value={d.lateMinutes}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          [row.studentId]: {
                            ...d,
                            lateMinutes: Number(e.target.value) || 1,
                          },
                        }))
                      }
                    />
                    <span className="text-xs font-bold text-slate-400">
                      {toFa(d.lateMinutes)} دقیقه
                    </span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <div className="sticky bottom-3 flex gap-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white/95 p-3 backdrop-blur dark:border-slate-800 dark:bg-[#131f24]/95">
        <Button variant="ghost" className="flex-1" onClick={() => router.back()}>
          انصراف
        </Button>
        <Button className="flex-1" onClick={save} disabled={saving || rows.length === 0}>
          {saving ? 'در حال ذخیره…' : 'ذخیره حضورغیاب'}
        </Button>
      </div>
    </div>
  );
}
