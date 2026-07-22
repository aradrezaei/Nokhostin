'use client';

import { useCallback, useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { MyClassEntry } from '@/lib/types';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert } from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

export default function StudentCoursesPage() {
  const { request } = useAuth();
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

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">کلاس‌های من</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          روی هر کلاس بزن تا روند رشد، مدال‌ها و حضورغیاب را ببینی.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState icon={<BookOpen className="h-6 w-6" />} title="کلاسی ثبت نشده" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((entry) => (
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
    </div>
  );
}
