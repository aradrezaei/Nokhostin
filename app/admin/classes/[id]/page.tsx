'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Download, Plus, Trash2, UserPlus } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { downloadAuthed } from '@/lib/download';
import { CLASS_STATUS_LABEL, formatDate, formatSchedule, toFa } from '@/lib/format';
import type { ClassDetail, ManagedUser, Paginated } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import {
  Alert,
  Badge,
  Button,
  Card,
  Field,
  Modal,
  TextInput,
} from '@/components/panel/ui';
import { Spinner, TuitionPill } from '@/components/panel/widgets';

export default function AdminClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { request } = useAuth();
  const [klass, setKlass] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [students, setStudents] = useState<ManagedUser[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [exporting, setExporting] = useState(false);

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

  const fetchStudents = useCallback(async () => {
    setFormError('');
    try {
      const params = new URLSearchParams({
        role: 'student',
        status: 'active',
        pageSize: '100',
      });
      if (studentSearch.trim()) params.set('search', studentSearch.trim());
      const res = await request<Paginated<ManagedUser>>(`/users?${params}`);
      setStudents(res.items);
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : 'خطا در لیست هنرجویان.');
    }
  }, [request, studentSearch]);

  const openEnroll = async () => {
    setEnrollOpen(true);
    await fetchStudents();
  };

  useEffect(() => {
    if (!enrollOpen) return;
    const t = setTimeout(() => {
      fetchStudents();
    }, 250);
    return () => clearTimeout(t);
  }, [enrollOpen, studentSearch, fetchStudents]);

  const enrolledIds = useMemo(
    () => new Set(klass?.students.map((s) => s.student.id) ?? []),
    [klass],
  );

  const enroll = async (studentId: string) => {
    setSaving(true);
    setFormError('');
    try {
      await request(`/classes/${id}/enrollments`, {
        method: 'POST',
        body: JSON.stringify({ studentId }),
      });
      setEnrollOpen(false);
      await load();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : 'ثبت‌نام ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  const toggleTuition = async (enrollmentId: string, paid: boolean) => {
    try {
      await request(`/classes/${id}/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ tuitionPaid: !paid }),
      });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'تغییر وضعیت شهریه ناموفق بود.');
    }
  };

  const removeStudent = async (enrollmentId: string) => {
    if (!confirm('این هنرجو از کلاس حذف شود؟')) return;
    try {
      await request(`/classes/${id}/enrollments/${enrollmentId}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'حذف هنرجو ناموفق بود.');
    }
  };

  const exportExcel = async () => {
    setExporting(true);
    try {
      await downloadAuthed(`/classes/${id}/export`, `class-${id}.xlsx`);
    } catch {
      setError('دانلود اکسل ناموفق بود.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <Spinner />;
  if (error && !klass) return <Alert>{error}</Alert>;
  if (!klass) return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400">
            <Link href="/admin/classes" className="hover:text-[#7c3aed]">
              کلاس‌ها
            </Link>
            {' / '}جزئیات
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{klass.title}</h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            {klass.course?.name}
            {klass.course?.level ? ` · ${klass.course.level}` : ''}
            {' · '}ترم {toFa(klass.termNumber)}
            {' · '}
            {formatSchedule(klass.schedule)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={klass.status === 'active' ? 'green' : 'gray'}>
            {CLASS_STATUS_LABEL[klass.status]}
          </Badge>
          <Button variant="ghost" onClick={exportExcel} disabled={exporting}>
            <Download className="h-4 w-4" />
            {exporting ? 'در حال آماده‌سازی…' : 'خروجی اکسل'}
          </Button>
          <Button onClick={openEnroll}>
            <UserPlus className="h-4 w-4" /> افزودن هنرجو
          </Button>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="!p-4">
          <p className="text-xs font-bold text-slate-400">استاد</p>
          {klass.teacher && (
            <div className="mt-2 flex items-center gap-2">
              <Avatar name={klass.teacher.fullName} seed={klass.teacher.id} size={36} />
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  {klass.teacher.fullName}
                </p>
                {klass.teacher.mobile && (
                  <p dir="ltr" className="text-left text-xs font-bold text-slate-400">
                    {klass.teacher.mobile}
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
        <Card className="!p-4">
          <p className="text-xs font-bold text-slate-400">پیشرفت جلسات</p>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {toFa(klass.sessionsHeld)} / {toFa(klass.totalSessions)}
          </p>
          <p className="text-xs font-bold text-slate-400">شروع: {formatDate(klass.startDate)}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs font-bold text-slate-400">هنرجویان فعال</p>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {toFa(klass.students.filter((s) => s.status === 'active').length)}
          </p>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-white">لیست هنرجویان</h2>
        <div className="overflow-hidden rounded-3xl border-2 border-slate-200 border-b-4 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-right font-black">هنرجو</th>
                <th className="px-4 py-3 text-right font-black">شهریه</th>
                <th className="px-4 py-3 text-left font-black">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-[#131f24]">
              {klass.students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-400">
                    هنوز هنرجویی ثبت نشده.
                  </td>
                </tr>
              ) : (
                klass.students.map((row) => (
                  <tr key={row.enrollmentId}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={row.student.fullName} seed={row.student.id} size={36} />
                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {row.student.fullName}
                          </p>
                          <p dir="ltr" className="text-left text-xs font-bold text-slate-400">
                            {row.student.mobile}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleTuition(row.enrollmentId, row.tuitionPaid)}
                      >
                        <TuitionPill paid={row.tuitionPaid} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="inline-flex gap-2">
                        <Link href={`/admin/classes/${id}/students/${row.student.id}`}>
                          <Button variant="subtle" className="!px-3 !py-1.5">
                            روند رشد
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="!px-3 !py-1.5"
                          onClick={() => removeStudent(row.enrollmentId)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-white">جلسات ترم</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {klass.sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-2xl border-2 border-slate-200 border-b-4 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#131f24]"
            >
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  جلسه {toFa(s.sessionNumber)}
                </p>
                <p className="text-xs font-bold text-slate-400">{formatDate(s.scheduledDate)}</p>
              </div>
              <Badge
                tone={s.status === 'held' ? 'green' : s.status === 'canceled' ? 'gray' : 'violet'}
              >
                {s.status === 'held' ? 'برگزارشده' : s.status === 'canceled' ? 'لغو' : 'برنامه‌ریزی'}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <Modal open={enrollOpen} title="افزودن هنرجو به کلاس" onClose={() => setEnrollOpen(false)}>
        <div className="space-y-4">
          {formError && <Alert>{formError}</Alert>}
          <Field label="جستجو">
            <TextInput
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="نام یا موبایل"
            />
          </Field>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {students
              .filter((s) => !enrolledIds.has(s.id))
              .map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={saving}
                  onClick={() => enroll(s.id)}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-slate-200 px-3 py-2.5 text-right hover:border-[#7c3aed] dark:border-slate-700"
                >
                  <Avatar name={s.fullName} seed={s.id} size={36} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-slate-900 dark:text-white">
                      {s.fullName}
                    </span>
                    <span dir="ltr" className="block text-left text-xs font-bold text-slate-400">
                      {s.mobile}
                    </span>
                  </span>
                  <Plus className="h-4 w-4 text-[#7c3aed]" />
                </button>
              ))}
            {students.filter((s) => !enrolledIds.has(s.id)).length === 0 && (
              <p className="py-6 text-center text-xs font-bold text-slate-400">
                هنرجوی قابل افزودنی یافت نشد.
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
