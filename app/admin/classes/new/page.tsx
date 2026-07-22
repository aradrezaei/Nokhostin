'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { WEEKDAY_LABEL, WEEKDAYS_ORDER } from '@/lib/format';
import type {
  Course,
  Institute,
  ManagedUser,
  Paginated,
  WeekDay,
} from '@/lib/types';
import { Alert, Button, Card, Field, Select, TextInput } from '@/components/panel/ui';

export default function AdminNewClassPage() {
  const { request } = useAuth();
  const router = useRouter();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<ManagedUser[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    instituteId: '',
    courseId: '',
    teacherId: '',
    title: '',
    termNumber: '1',
    totalSessions: '12',
    startDate: '',
    time: '17:30',
    days: ['saturday', 'monday'] as WeekDay[],
  });

  const boot = useCallback(async () => {
    try {
      const [inst, mentorsRes] = await Promise.all([
        request<Institute[]>('/admin/institutes'),
        request<Paginated<ManagedUser>>('/users?role=mentor&pageSize=100&status=active'),
      ]);
      setInstitutes(inst);
      setMentors(mentorsRes.items);
      if (inst[0]) {
        setForm((f) => ({ ...f, instituteId: f.instituteId || inst[0]!.id }));
      }
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در بارگذاری فرم.');
    }
  }, [request]);

  useEffect(() => {
    boot();
  }, [boot]);

  useEffect(() => {
    if (!form.instituteId) return;
    request<Paginated<Course>>(`/admin/courses?instituteId=${form.instituteId}&pageSize=100`)
      .then((res) => {
        setCourses(res.items);
        setForm((f) => ({
          ...f,
          courseId: res.items.some((c) => c.id === f.courseId)
            ? f.courseId
            : (res.items[0]?.id ?? ''),
        }));
      })
      .catch(() => setCourses([]));
  }, [form.instituteId, request]);

  const toggleDay = (day: WeekDay) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const created = await request<{ id: string }>('/classes', {
        method: 'POST',
        body: JSON.stringify({
          instituteId: form.instituteId,
          courseId: form.courseId,
          teacherId: form.teacherId,
          title: form.title,
          termNumber: Number(form.termNumber),
          totalSessions: Number(form.totalSessions),
          startDate: form.startDate,
          schedule: { days: form.days, time: form.time },
        }),
      });
      router.replace(`/admin/classes/${created.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'ساخت کلاس ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">کلاس جدید</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          جلسات به‌صورت خودکار از برنامه هفتگی ساخته می‌شوند.
        </p>
      </header>

      <Card>
        <form className="space-y-4" onSubmit={submit}>
          {error && <Alert>{error}</Alert>}

          <Field label="آموزشگاه">
            <Select
              required
              value={form.instituteId}
              onChange={(e) => setForm((f) => ({ ...f, instituteId: e.target.value }))}
            >
              {institutes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="دوره / کتاب">
            <Select
              required
              value={form.courseId}
              onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
            >
              {courses.length === 0 && <option value="">دوره‌ای نیست — اول بساز</option>}
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                  {c.level ? ` · ${c.level}` : ''}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="استاد">
            <Select
              required
              value={form.teacherId}
              onChange={(e) => setForm((f) => ({ ...f, teacherId: e.target.value }))}
            >
              <option value="">انتخاب استاد</option>
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName} — {m.mobile}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="عنوان کلاس">
            <TextInput
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="آلمانی ترم ۳ عصر"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="شماره ترم">
              <TextInput
                type="number"
                min={1}
                required
                value={form.termNumber}
                onChange={(e) => setForm((f) => ({ ...f, termNumber: e.target.value }))}
              />
            </Field>
            <Field label="تعداد جلسات">
              <TextInput
                type="number"
                min={1}
                max={120}
                required
                value={form.totalSessions}
                onChange={(e) => setForm((f) => ({ ...f, totalSessions: e.target.value }))}
              />
            </Field>
            <Field label="ساعت شروع">
              <TextInput
                type="time"
                required
                dir="ltr"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              />
            </Field>
          </div>

          <Field label="تاریخ شروع اولین جلسه">
            <TextInput
              type="date"
              required
              dir="ltr"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
            />
          </Field>

          <Field label="روزهای هفته">
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS_ORDER.map((day) => {
                const active = form.days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`rounded-xl border-2 px-3 py-2 text-xs font-black ${
                      active
                        ? 'border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white'
                        : 'border-slate-200 border-b-4 bg-white text-slate-600 dark:border-slate-700 dark:bg-[#131f24] dark:text-slate-300'
                    }`}
                  >
                    {WEEKDAY_LABEL[day]}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              انصراف
            </Button>
            <Button
              type="submit"
              disabled={
                saving ||
                !form.courseId ||
                !form.teacherId ||
                form.days.length === 0 ||
                !form.startDate
              }
            >
              {saving ? 'در حال ساخت…' : 'ساخت کلاس و جلسات'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
