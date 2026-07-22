'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Trophy } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toFa } from '@/lib/format';
import type { MyClassEntry } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert, Card } from '@/components/panel/ui';
import { EmptyState, Spinner, StatTile } from '@/components/panel/widgets';

export default function DashboardHome() {
  const { user, request } = useAuth();
  const [items, setItems] = useState<MyClassEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await request<MyClassEntry[]>('/me/classes'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت کلاس‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  const active = items.filter((i) => i.status === 'active');
  const unpaid = active.filter((i) => !i.tuitionPaid).length;

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        {user && <Avatar name={user.fullName} seed={user.id} size={56} />}
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            سلام {user?.fullName} 👋
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            پیشرفت، مدال‌ها و وضعیت شهریه‌ات اینجاست.
          </p>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={<BookOpen className="h-5 w-5" />}
          label="کلاس فعال"
          value={loading ? '—' : toFa(active.length)}
        />
        <StatTile
          tone={unpaid > 0 ? 'rose' : 'emerald'}
          icon={<Trophy className="h-5 w-5" />}
          label="شهریه باز"
          value={loading ? '—' : toFa(unpaid)}
        />
      </div>

      {unpaid > 0 && (
        <Card className="!p-4 border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
          <p className="text-sm font-black text-rose-800 dark:text-rose-300">
            {toFa(unpaid)} کلاس شهریه پرداخت‌نشده داری
          </p>
          <p className="mt-1 text-xs font-bold text-rose-600/80 dark:text-rose-400">
            برای تسویه با آموزشگاه هماهنگ کن.
          </p>
        </Card>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">کلاس‌های من</h2>
          <Link href="/dashboard/courses" className="text-xs font-black text-[#7c3aed]">
            همه
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="هنوز در کلاسی ثبت نشدی"
            hint="وقتی مدیر تو را به کلاس اضافه کند، اینجا می‌آید."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
          {items.slice(0, 4).map((entry) => (
            <ClassCard
              key={entry.enrollmentId}
              href={`/dashboard/courses/${entry.class.id}`}
              tuitionPaid={entry.tuitionPaid}
              item={{
                id: entry.class.id,
                title: entry.class.title,
                termNumber: entry.class.termNumber,
                totalSessions: entry.class.totalSessions,
                schedule: entry.class.schedule,
                status: entry.class.status,
                course: entry.class.course,
                teacher: entry.class.teacher,
                sessionsHeld: entry.class.sessionsHeld,
              }}
            />
          ))}
          </div>
        )}
      </section>
    </div>
  );
}
