'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'nuqs';
import { Plus, Search, Trash2 } from 'lucide-react';
import { confirmAction } from '@/lib/confirm';
import { formatApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { queryKeys } from '@/lib/query/keys';
import { createUserSchema, type CreateUserValues } from '@/lib/validations/users';
import type { ManagedUser, Paginated, UserRole, UserStatus } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { Alert, Badge, Button, Field, Modal, Select, TextInput } from '@/components/panel/ui';
import { useUiStore } from '@/stores/ui-store';

const ROLE_LABEL: Record<UserRole, string> = {
  super_admin: 'مدیرکل',
  mentor: 'استاد',
  student: 'هنرجو',
};

type CreateMode = 'student' | 'mentor';

export default function AdminUsersPage() {
  const { request } = useAuth();
  const queryClient = useQueryClient();
  const setBanner = useUiStore((s) => s.setBanner);

  const [roleFilter, setRoleFilter] = useQueryState('role', parseAsString.withDefault(''));
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));
  const [modal, setModal] = useQueryState(
    'create',
    parseAsString.withDefault('').withOptions({ history: 'push' }),
  );

  const createMode: CreateMode | null =
    modal === 'student' || modal === 'mentor' ? modal : null;

  const usersQuery = useQuery({
    queryKey: queryKeys.adminUsers({ role: roleFilter, search }),
    queryFn: async () => {
      const params = new URLSearchParams({ pageSize: '50' });
      if (roleFilter) params.set('role', roleFilter);
      if (search.trim()) params.set('search', search.trim());
      return await request<Paginated<ManagedUser>>(`/users?${params.toString()}`);
    },
  });

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { fullName: '', mobile: '', studentType: 'in_person' },
  });

  useEffect(() => {
    if (createMode) {
      form.reset({ fullName: '', mobile: '', studentType: 'in_person' });
    }
  }, [createMode, form]);

  const createMutation = useMutation({
    mutationFn: async (values: CreateUserValues) => {
      if (createMode === 'mentor') {
        await request('/users/mentors', {
          method: 'POST',
          body: JSON.stringify({ fullName: values.fullName, mobile: values.mobile }),
        });
        return;
      }
      await request('/users/students', {
        method: 'POST',
        body: JSON.stringify({
          fullName: values.fullName,
          mobile: values.mobile,
          studentType: values.studentType,
        }),
      });
    },
    onSuccess: async () => {
      await setModal(null);
      await queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setBanner('کاربر با موفقیت ثبت شد.');
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: UserStatus }) => {
      await request(`/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await request(`/users/${id}`, { method: 'DELETE' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  const listError = usersQuery.error
    ? formatApiError(usersQuery.error, 'خطا در دریافت کاربران.')
    : statusMutation.error
      ? formatApiError(statusMutation.error, 'تغییر وضعیت ناموفق بود.')
      : deleteMutation.error
        ? formatApiError(deleteMutation.error, 'حذف کاربر ناموفق بود.')
        : '';

  const formError = createMutation.error
    ? formatApiError(createMutation.error, 'ثبت کاربر ناموفق بود.')
    : '';

  const onCreate = form.handleSubmit(async (values) => {
    await createMutation.mutateAsync(values);
  });

  const toggleStatus = (u: ManagedUser) => {
    const next: UserStatus = u.status === 'active' ? 'inactive' : 'active';
    statusMutation.mutate({ id: u.id, status: next });
  };

  const removeUser = (u: ManagedUser) => {
    const roleWord = u.role === 'mentor' ? 'استاد' : 'هنرجو';
    if (
      !confirmAction(`«${u.fullName}» (${roleWord}) برای همیشه حذف شود؟\nاین کار برگشت‌پذیر نیست.`)
    ) {
      return;
    }
    deleteMutation.mutate(u.id);
  };

  const data = usersQuery.data ?? null;
  const loading = usersQuery.isLoading;

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
          <Button
            variant="ghost"
            onClick={() => {
              void setModal('mentor');
            }}
          >
            <Plus className="h-4 w-4" /> منتور
          </Button>
          <Button
            onClick={() => {
              void setModal('student');
            }}
          >
            <Plus className="h-4 w-4" /> دانش‌آموز
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <TextInput
            value={search}
            onChange={(e) => {
              void setSearch(e.target.value);
            }}
            placeholder="جستجوی نام یا موبایل"
            className="pr-9"
          />
        </div>
        <Select
          value={roleFilter}
          onChange={(e) => {
            void setRoleFilter(e.target.value);
          }}
          className="w-40"
        >
          <option value="">همه نقش‌ها</option>
          <option value="student">دانش‌آموز</option>
          <option value="mentor">منتور</option>
          <option value="super_admin">مدیرکل</option>
        </Select>
      </div>

      {listError && <Alert>{listError}</Alert>}

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
                          onClick={() => {
                            toggleStatus(u);
                          }}
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
                          onClick={() => {
                            removeUser(u);
                          }}
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
        open={createMode !== null}
        title={createMode === 'mentor' ? 'ثبت منتور جدید' : 'ثبت دانش‌آموز جدید'}
        onClose={() => {
          void setModal(null);
        }}
      >
        <form className="space-y-4" onSubmit={onCreate} noValidate>
          {(formError || form.formState.errors.root) && (
            <Alert>{formError || form.formState.errors.root?.message}</Alert>
          )}
          <Field label="نام و نام خانوادگی">
            <TextInput
              {...form.register('fullName')}
              placeholder="مثلاً علی رضایی"
              aria-invalid={Boolean(form.formState.errors.fullName)}
            />
            {form.formState.errors.fullName && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </Field>
          <Field label="شماره موبایل" hint="کاربر با همین شماره و کد پیامکی وارد می‌شود.">
            <TextInput
              dir="ltr"
              {...form.register('mobile', {
                onChange: (e: { target: { value: string } }) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                  form.setValue('mobile', digits, { shouldValidate: form.formState.isSubmitted });
                },
              })}
              placeholder="09123456789"
              aria-invalid={Boolean(form.formState.errors.mobile)}
            />
            {form.formState.errors.mobile && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {form.formState.errors.mobile.message}
              </p>
            )}
          </Field>
          {createMode === 'student' && (
            <Field label="نوع دانش‌آموز">
              <Select {...form.register('studentType')}>
                <option value="in_person">حضوری</option>
                <option value="online">آنلاین</option>
              </Select>
            </Field>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                void setModal(null);
              }}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'در حال ثبت…' : 'ثبت'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
