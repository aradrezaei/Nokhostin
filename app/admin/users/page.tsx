'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ManagedUser, Paginated, UserRole, UserStatus } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Badge, Button, Field, Modal, Select, TextInput } from '@/components/panel/ui';

const ROLE_LABEL: Record<UserRole, string> = {
  super_admin: 'مدیرکل',
  mentor: 'استاد',
  student: 'هنرجو',
};

type CreateMode = 'student' | 'mentor';

export default function AdminUsersPage() {
  const { request } = useAuth();
  const [data, setData] = useState<Paginated<ManagedUser> | null>(null);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [modal, setModal] = useState<CreateMode | null>(null);
  const [form, setForm] = useState({ fullName: '', mobile: '', studentType: 'in_person' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ pageSize: '50' });
    if (roleFilter) params.set('role', roleFilter);
    if (search.trim()) params.set('search', search.trim());
    try {
      setData(await request<Paginated<ManagedUser>>(`/users?${params.toString()}`));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کاربران.');
    } finally {
      setLoading(false);
    }
  }, [request, roleFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const openModal = (mode: CreateMode) => {
    setForm({ fullName: '', mobile: '', studentType: 'in_person' });
    setFormError('');
    setModal(mode);
  };

  const submitCreate = async () => {
    setSaving(true);
    setFormError('');
    try {
      if (modal === 'mentor') {
        await request('/users/mentors', {
          method: 'POST',
          body: JSON.stringify({ fullName: form.fullName, mobile: form.mobile }),
        });
      } else {
        await request('/users/students', {
          method: 'POST',
          body: JSON.stringify({
            fullName: form.fullName,
            mobile: form.mobile,
            studentType: form.studentType,
          }),
        });
      }
      setModal(null);
      await load();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : 'ثبت کاربر ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (u: ManagedUser) => {
    const next: UserStatus = u.status === 'active' ? 'inactive' : 'active';
    try {
      await request(`/users/${u.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: next }),
      });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'تغییر وضعیت ناموفق بود.');
    }
  };

  const removeUser = async (u: ManagedUser) => {
    const roleWord = u.role === 'mentor' ? 'استاد' : 'هنرجو';
    if (!confirm(`«${u.fullName}» (${roleWord}) برای همیشه حذف شود؟\nاین کار برگشت‌پذیر نیست.`)) {
      return;
    }
    try {
      await request(`/users/${u.id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'حذف کاربر ناموفق بود.');
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">مدیریت کاربران</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            دانش‌آموزان حضوری و منتورها را اینجا ثبت و مدیریت کنید.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => openModal('mentor')}>
            <Plus className="h-4 w-4" /> منتور
          </Button>
          <Button onClick={() => openModal('student')}>
            <Plus className="h-4 w-4" /> دانش‌آموز
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی نام یا موبایل"
            className="pr-9"
          />
        </div>
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-40">
          <option value="">همه نقش‌ها</option>
          <option value="student">دانش‌آموز</option>
          <option value="mentor">منتور</option>
          <option value="super_admin">مدیرکل</option>
        </Select>
      </div>

      {error && <Alert>{error}</Alert>}

      <div className="overflow-x-auto rounded-3xl border-2 border-slate-200 border-b-4 dark:border-slate-800">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 text-right font-black">کاربر</th>
              <th className="px-4 py-3 text-right font-black">نقش</th>
              <th className="px-4 py-3 text-right font-black">وضعیت</th>
              <th className="px-4 py-3 text-left font-black">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-[#131f24]">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  در حال بارگذاری…
                </td>
              </tr>
            ) : data && data.items.length > 0 ? (
              data.items.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.fullName} seed={u.id} size={40} />
                      <div className="min-w-0">
                        <p className="truncate font-black text-slate-900 dark:text-white">
                          {u.fullName}
                        </p>
                        <p dir="ltr" className="text-left text-xs font-bold text-slate-400">
                          {u.mobile}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      tone={
                        u.role === 'super_admin' ? 'violet' : u.role === 'mentor' ? 'amber' : 'gray'
                      }
                    >
                      {ROLE_LABEL[u.role]}
                      {u.role === 'student' && u.studentType === 'online' ? ' (آنلاین)' : ''}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={u.status === 'active' ? 'green' : 'gray'}>
                      {u.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-left">
                    {u.role !== 'super_admin' && (
                      <div className="inline-flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(u)}
                          className={`cursor-pointer rounded-xl border-2 border-b-4 px-3 py-1.5 text-xs font-black ${
                            u.status === 'active'
                              ? 'border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-rose-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-300'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70'
                          }`}
                        >
                          {u.status === 'active' ? 'غیرفعال' : 'فعال‌سازی'}
                        </button>
                        <Button
                          variant="danger"
                          onClick={() => removeUser(u)}
                          className="!px-3 !py-1.5"
                          title="حذف دائم"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          حذف
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  کاربری یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modal !== null}
        title={modal === 'mentor' ? 'ثبت منتور جدید' : 'ثبت دانش‌آموز جدید'}
        onClose={() => setModal(null)}
      >
        <div className="space-y-4">
          {formError && <Alert>{formError}</Alert>}
          <Field label="نام و نام خانوادگی">
            <TextInput
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              placeholder="مثلاً علی رضایی"
            />
          </Field>
          <Field label="شماره موبایل" hint="کاربر با همین شماره و کد پیامکی وارد می‌شود.">
            <TextInput
              dir="ltr"
              value={form.mobile}
              onChange={(e) =>
                setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, '').slice(0, 11) }))
              }
              placeholder="09123456789"
            />
          </Field>
          {modal === 'student' && (
            <Field label="نوع دانش‌آموز">
              <Select
                value={form.studentType}
                onChange={(e) => setForm((f) => ({ ...f, studentType: e.target.value }))}
              >
                <option value="in_person">حضوری</option>
                <option value="online">آنلاین</option>
              </Select>
            </Field>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModal(null)}>
              انصراف
            </Button>
            <Button
              onClick={submitCreate}
              disabled={saving || form.fullName.length < 2 || form.mobile.length !== 11}
            >
              {saving ? 'در حال ثبت…' : 'ثبت'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
