'use client';

import { BookOpen } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useMyOverview } from '@/hooks/useMyOverview';
import { prefetchClassProgress } from '@/hooks/useClassProgress';
import { ClassCard } from '@/components/panel/ClassCard';
import { Alert } from '@/components/panel/ui';
import { DeferredSpinner, EmptyState } from '@/components/panel/widgets';

export default function StudentCoursesPage() {
  const { request } = useAuth();
  const { classes, loading, error } = useMyOverview();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">کلاس‌های من</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">
          روی هر کلاس بزن تا روند رشد، مدال‌ها و حضورغیاب را ببینی.
        </p>
      </header>

      {error && <Alert>{error}</Alert>}
      {loading && classes.length === 0 ? (
        <DeferredSpinner active />
      ) : classes.length === 0 ? (
        <EmptyState icon={<BookOpen className="h-6 w-6" />} title="کلاسی ثبت نشده" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {classes.map((entry) => (
            <div
              key={entry.enrollmentId}
              onMouseEnter={() => { prefetchClassProgress(request, entry.class.id); }}
              onFocus={() => { prefetchClassProgress(request, entry.class.id); }}
            >
              <ClassCard
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
