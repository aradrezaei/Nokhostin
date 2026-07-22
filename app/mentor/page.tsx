'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { ClassSummary, Paginated } from '@/lib/types';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert, Card } from '@/components/panel/ui';
import { EmptyState, Spinner, StatTile } from '@/components/panel/widgets';

export default function MentorHomePage() {
  const { user, request } = useAuth();
  const [data, setData] = useState<Paginated<ClassSummary> | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await request<Paginated<ClassSummary>>('/classes?pageSize=50&status=active'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  const items = data?.items ?? [];
  const students = items.reduce((sum, c) => sum + c.studentCount, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          سلام {user?.fullName} 👋
        </h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          فقط کلاس‌های خودتان را می‌بینید — افزودن/حذف هنرجو فقط با مدیر است.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={<GraduationCap className="h-5 w-5" />}
          label="کلاس فعال"
          value={loading ? '—' : toFa(items.length)}
        />
        <StatTile
          tone="emerald"
          icon={<GraduationCap className="h-5 w-5" />}
          label="هنرجویان"
          value={loading ? '—' : toFa(students)}
        />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">کلاس‌های فعال</h2>
          <Link href="/mentor/classes" className="text-xs font-black text-[#7c3aed]">
            همه کلاس‌ها
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<GraduationCap className="h-6 w-6" />}
            title="کلاسی به شما تخصیص داده نشده"
            hint="از مدیر بخواهید شما را به عنوان استاد کلاس ثبت کند."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.slice(0, 4).map((item) => (
              <ClassCard key={item.id} item={item} href={`/mentor/classes/${item.id}`} />
            ))}
          </div>
        )}
      </section>

      <Card className="!p-5 border-[#7c3aed]/30 bg-violet-50/50 dark:bg-violet-950/20">
        <p className="text-sm font-black text-slate-900 dark:text-white">راهنمای سریع جلسه</p>
        <ol className="mt-2 list-decimal space-y-1 pr-5 text-xs font-bold leading-6 text-slate-500 dark:text-slate-400">
          <li>جلسه را باز کنید و حضور / غیبت / تأخیر را ثبت کنید.</li>
          <li>در پایان جلسه چهار مهارت را از ۵ نمره دهید.</li>
          <li>در پایان ترم، نمرات میان‌ترم و پایان‌ترم را وارد کنید.</li>
        </ol>
      </Card>
    </div>
  );
}
