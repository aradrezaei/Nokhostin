'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ClassDetail, TermGrade } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Button, Card, Field, TextInput } from '@/components/panel/ui';
import { Spinner } from '@/components/panel/widgets';

export default function MentorTermGradePage() {
  const { id, studentId } = useParams<{ id: string; studentId: string }>();
  const { request } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [form, setForm] = useState({
    midterm: '',
    final: '',
    finalSpeaking: '',
    finalListening: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const klass = await request<ClassDetail>(`/classes/${id}`);
      const student = klass.students.find((s) => s.student.id === studentId);
      setName(student?.student.fullName ?? 'هنرجو');
      // progress endpoint includes termGrade — reuse it
      const progress = await request<{ termGrade: TermGrade | null }>(
        `/classes/${id}/students/${studentId}/progress`,
      );
      const g = progress.termGrade;
      if (g) {
        setForm({
          midterm: g.midterm?.toString() ?? '',
          final: g.final?.toString() ?? '',
          finalSpeaking: g.finalSpeaking?.toString() ?? '',
          finalListening: g.finalListening?.toString() ?? '',
        });
      }
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در بارگذاری.');
    } finally {
      setLoading(false);
    }
  }, [request, id, studentId]);

  useEffect(() => scheduleEffect(() => load()), [load]);

  const parse = (v: string) => (v === '' ? null : Number(v));

  const save = async () => {
    setSaving(true);
    setError('');
    setOk('');
    try {
      await request(`/classes/${id}/students/${studentId}/term-grade`, {
        method: 'PUT',
        body: JSON.stringify({
          midterm: parse(form.midterm),
          final: parse(form.final),
          finalSpeaking: parse(form.finalSpeaking),
          finalListening: parse(form.finalListening),
        }),
      });
      setOk('نمرات ترم ذخیره شد.');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'ذخیره ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <header>
        <p className="text-xs font-bold text-slate-400">
          <Link href={`/mentor/classes/${id}`} className="hover:text-[#7c3aed]">
            بازگشت به کلاس
          </Link>
        </p>
        <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">نمرات ترم</h1>
        <div className="mt-3 flex items-center gap-3">
          <Avatar name={name} seed={studentId} size={44} />
          <p className="text-sm font-black text-slate-900 dark:text-white">{name}</p>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}
      {ok && <Alert tone="success">{ok}</Alert>}

      <Card>
        <div className="space-y-4">
          {(
            [
              ['midterm', 'میان‌ترم'],
              ['final', 'پایان‌ترم'],
              ['finalSpeaking', 'اسپیکینگ پایانی'],
              ['finalListening', 'لیسنینگ پایانی'],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={`${label} (۰–۱۰۰)`}>
              <TextInput
                type="number"
                min={0}
                max={100}
                dir="ltr"
                value={form[key]}
                onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); }}
                placeholder="مثلاً ۸۵"
              />
            </Field>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => { router.back(); }}>
              انصراف
            </Button>
            <Button className="flex-1" onClick={save} disabled={saving}>
              {saving ? 'در حال ذخیره…' : 'ذخیره نمرات'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
