'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Plus } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ClassSummary, Paginated } from '@/lib/types';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert, Button, Select, TextInput } from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

export default function AdminClassesPage() {
  const { request } = useAuth();
  const [data, setData] = useState<Paginated<ClassSummary> | null>(null);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ pageSize: '50' });
    if (status) params.set('status', status);
    if (search.trim()) params.set('search', search.trim());
    try {
      setData(await request<Paginated<ClassSummary>>(`/classes?${params}`));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request, status, search]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">کلاس‌ها</h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            ساخت کلاس، تخصیص استاد و هنرجو، برنامه هفتگی و شهریه
          </p>
        </div>
        <Link href="/admin/classes/new">
          <Button>
            <Plus className="h-4 w-4" /> کلاس جدید
          </Button>
        </Link>
      </header>

      <div className="flex flex-wrap gap-3">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی عنوان کلاس"
          className="min-w-[200px] flex-1"
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-44">
          <option value="">همه وضعیت‌ها</option>
          <option value="active">در حال برگزاری</option>
          <option value="finished">پایان‌یافته</option>
          <option value="archived">بایگانی</option>
        </Select>
      </div>

      {error && <Alert>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-6 w-6" />}
          title="کلاسی یافت نشد"
          hint="اول دوره و استاد را بساز، بعد کلاس جدید بساز."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.items.map((item) => (
            <ClassCard key={item.id} item={item} href={`/admin/classes/${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
