'use client';

import { useCallback, useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ClassSummary, Paginated } from '@/lib/types';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert, Select } from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

export default function MentorClassesPage() {
  const { request } = useAuth();
  const [data, setData] = useState<Paginated<ClassSummary> | null>(null);
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ pageSize: '50' });
    if (status) params.set('status', status);
    try {
      setData(await request<Paginated<ClassSummary>>(`/classes?${params}`));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">کلاس‌های من</h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            فقط کلاس‌هایی که استاد آن‌ها هستید
          </p>
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-44">
          <option value="">همه</option>
          <option value="active">فعال</option>
          <option value="finished">پایان‌یافته</option>
        </Select>
      </header>

      {error && <Alert>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={<GraduationCap className="h-6 w-6" />} title="کلاسی یافت نشد" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.items.map((item) => (
            <ClassCard key={item.id} item={item} href={`/mentor/classes/${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
