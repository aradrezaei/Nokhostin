'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { EvaluationRow } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Button, Card } from '@/components/panel/ui';
import { Spinner } from '@/components/panel/widgets';

interface Skills {
  listening: number | null;
  writing: number | null;
  reading: number | null;
  speaking: number | null;
}

const SKILL_LABELS: { key: keyof Skills; label: string }[] = [
  { key: 'listening', label: 'لیسنینگ' },
  { key: 'writing', label: 'رایتینگ' },
  { key: 'reading', label: 'ریدینگ' },
  { key: 'speaking', label: 'اسپیکینگ' },
];

export default function MentorEvaluationsPage() {
  const { id, sessionId } = useParams<{ id: string; sessionId: string }>();
  const { request } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<EvaluationRow[]>([]);
  const [draft, setDraft] = useState<Record<string, Skills>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request<EvaluationRow[]>(
        `/classes/${id}/sessions/${sessionId}/evaluations`,
      );
      setRows(data);
      const next: Record<string, Skills> = {};
      for (const row of data) {
        next[row.studentId] = {
          listening: row.listening,
          writing: row.writing,
          reading: row.reading,
          speaking: row.speaking,
        };
      }
      setDraft(next);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت ارزیابی‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request, id, sessionId]);

  useEffect(() => scheduleEffect(() => load()), [load]);

  const setScore = (studentId: string, key: keyof Skills, value: number) => {
    setDraft((prev) => {
      const current = prev[studentId] ?? {
        listening: null,
        writing: null,
        reading: null,
        speaking: null,
      };
      const nextVal = current[key] === value ? null : value;
      return { ...prev, [studentId]: { ...current, [key]: nextVal } };
    });
  };

  const save = async () => {
    setSaving(true);
    setError('');
    setOk('');
    try {
      const records = rows.map((row) => ({
        studentId: row.studentId,
        ...draft[row.studentId],
      }));
      await request(`/classes/${id}/sessions/${sessionId}/evaluations`, {
        method: 'PUT',
        body: JSON.stringify({ records }),
      });
      setOk('ارزیابی جلسه ذخیره شد.');
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
      <header>
        <p className="text-xs font-bold text-slate-400">
          <Link href={`/mentor/classes/${id}`} className="hover:text-[#7c3aed]">
            بازگشت به کلاس
          </Link>
        </p>
        <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
          ارزیابی پایان جلسه
        </h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          چهار مهارت از ۰ تا ۵ — برای راحتی استاد با یک ضربه انتخاب می‌شود.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}
      {ok && <Alert tone="success">{ok}</Alert>}

      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm font-bold text-slate-400">هنرجوی فعالی نیست.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => {
            const d = draft[row.studentId] ?? {
              listening: null,
              writing: null,
              reading: null,
              speaking: null,
            };
            return (
              <Card key={row.studentId} className="!p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Avatar name={row.fullName} seed={row.studentId} size={40} />
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {row.fullName}
                  </p>
                </div>
                <div className="space-y-3">
                  {SKILL_LABELS.map((skill) => {
                    const score = d[skill.key];
                    return (
                      <div key={skill.key}>
                        <p className="mb-1.5 text-[11px] font-extrabold text-slate-400">
                          {skill.label}
                          {score !== null ? ` · ${toFa(score)}` : ''}
                        </p>
                        <div className="grid grid-cols-6 gap-1.5">
                          {[0, 1, 2, 3, 4, 5].map((n) => {
                            const active = d[skill.key] === n;
                            return (
                              <button
                                key={n}
                                type="button"
                                onClick={() => {
                                  setScore(row.studentId, skill.key, n);
                                }}
                                className={`rounded-xl border-2 py-2 text-xs font-black ${
                                  active
                                    ? 'border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white'
                                    : 'border-slate-200 text-slate-500 dark:border-slate-700'
                                }`}
                              >
                                {toFa(n)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="sticky bottom-3 flex gap-2 rounded-2xl border-2 border-slate-200 border-b-4 bg-white/95 p-3 backdrop-blur dark:border-slate-800 dark:bg-[#131f24]/95">
        <Button
          variant="ghost"
          className="flex-1"
          onClick={() => {
            router.back();
          }}
        >
          انصراف
        </Button>
        <Button className="flex-1" onClick={save} disabled={saving || rows.length === 0}>
          {saving ? 'در حال ذخیره…' : 'ذخیره ارزیابی'}
        </Button>
      </div>
    </div>
  );
}
