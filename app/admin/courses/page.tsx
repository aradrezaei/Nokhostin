'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';
import { confirmAction } from '@/lib/confirm';

import { useCallback, useEffect, useState } from 'react';
import { BookMarked, Plus, Trash2 } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Course, Institute, Paginated } from '@/lib/types';
import {
  Alert,
  Button,
  Card,
  Field,
  Modal,
  Select,
  TextInput,
  Textarea,
} from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

export default function AdminCoursesPage() {
  const { request } = useAuth();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [data, setData] = useState<Paginated<Course> | null>(null);
  const [instituteFilter, setInstituteFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({
    instituteId: '',
    name: '',
    level: '',
    description: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ pageSize: '50' });
    if (instituteFilter) params.set('instituteId', instituteFilter);
    try {
      const [inst, courses] = await Promise.all([
        request<Institute[]>('/admin/institutes'),
        request<Paginated<Course>>(`/admin/courses?${params}`),
      ]);
      setInstitutes(inst);
      setData(courses);
      if (!form.instituteId && inst[0]) {
        setForm((f) => ({ ...f, instituteId: inst[0].id }));
      }
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت دوره‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request, instituteFilter, form.instituteId]);

  useEffect(() => scheduleEffect(() => load()), [load]);

  const submit = async () => {
    setSaving(true);
    setFormError('');
    try {
      await request('/admin/courses', {
        method: 'POST',
        body: JSON.stringify({
          instituteId: form.instituteId,
          name: form.name,
          level: form.level || undefined,
          description: form.description || undefined,
        }),
      });
      setOpen(false);
      setForm((f) => ({ ...f, name: '', level: '', description: '' }));
      await load();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : 'ثبت دوره ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirmAction('این دوره حذف شود؟')) return;
    try {
      await request(`/admin/courses/${id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'حذف دوره ناموفق بود.');
    }
  };

  const instituteName = (id: string) => institutes.find((i) => i.id === id)?.name ?? '—';

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">دوره‌ها</h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            کاتالوگ کتاب و سطح — مثلاً Family Friends 2 · A2
          </p>
        </div>
        <Button
          onClick={() => {
            setFormError('');
            setOpen(true);
          }}
          disabled={institutes.length === 0}
        >
          <Plus className="h-4 w-4" /> دوره جدید
        </Button>
      </header>

      <Select
        value={instituteFilter}
        onChange={(e) => {
          setInstituteFilter(e.target.value);
        }}
        className="max-w-xs"
      >
        <option value="">همه آموزشگاه‌ها</option>
        {institutes.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
      </Select>

      {error && <Alert>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          icon={<BookMarked className="h-6 w-6" />}
          title="دوره‌ای ثبت نشده"
          hint="اول یک دوره بساز، بعد کلاس را به آن وصل کن."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((course) => (
            <Card key={course.id} className="!p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-base font-black text-slate-900 dark:text-white">
                    {course.name}
                  </p>
                  {course.level && (
                    <span className="mt-1 inline-flex rounded-lg border-2 border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-extrabold text-[#7c3aed] dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
                      {course.level}
                    </span>
                  )}
                  <p className="mt-2 text-[11px] font-bold text-slate-400">
                    {instituteName(course.instituteId)}
                  </p>
                  {course.description && (
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-500">
                      {course.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(course.id)}
                  className="rounded-xl border-2 border-rose-200 p-2 text-rose-500 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
                  aria-label="حذف دوره"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={open}
        title="ثبت دوره جدید"
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="space-y-4">
          {formError && <Alert>{formError}</Alert>}
          <Field label="آموزشگاه">
            <Select
              value={form.instituteId}
              onChange={(e) => {
                setForm((f) => ({ ...f, instituteId: e.target.value }));
              }}
            >
              {institutes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="نام دوره / کتاب">
            <TextInput
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
              }}
              placeholder="Family Friends 2"
            />
          </Field>
          <Field label="سطح" hint="اختیاری — مثلاً A2 یا Term A">
            <TextInput
              value={form.level}
              onChange={(e) => {
                setForm((f) => ({ ...f, level: e.target.value }));
              }}
              placeholder="A2"
            />
          </Field>
          <Field label="توضیح">
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => {
                setForm((f) => ({ ...f, description: e.target.value }));
              }}
              placeholder="توضیح کوتاه درباره دوره"
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
              }}
            >
              انصراف
            </Button>
            <Button onClick={submit} disabled={saving || form.name.length < 2 || !form.instituteId}>
              {saving ? 'در حال ثبت…' : 'ثبت'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
