'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useClassProgress } from '@/hooks/useClassProgress';
import ImprovementModal from '@/components/panel/ImprovementModal';
import { Alert } from '@/components/panel/ui';
import { DeferredSpinner } from '@/components/panel/widgets';

const ProgressView = dynamic(() => import('@/components/panel/ProgressView'), {
  loading: () => <DeferredSpinner active label="در حال آماده‌سازی گزارش…" />,
});

export default function StudentClassProgressPage() {
  const { classId } = useParams<{ classId: string }>();
  const { data, loading, error } = useClassProgress(classId);

  const improvementItems = useMemo(() => {
    if (!data?.improvement.improved) return [];
    return [
      {
        classId: data.class.id,
        classTitle: data.class.title,
        courseName: data.class.course?.name ?? null,
        previousScore: data.improvement.previousScore,
        currentScore: data.improvement.currentScore ?? data.score,
        delta: data.improvement.delta,
      },
    ];
  }, [data]);

  if (error && !data) return <Alert>{error}</Alert>;
  if (loading && !data) return <DeferredSpinner active />;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <ImprovementModal items={improvementItems} />
      <p className="text-xs font-bold text-slate-400">
        <Link href="/dashboard/courses" className="hover:text-[#7c3aed]">
          کلاس‌های من
        </Link>
        {' / '}روند رشد
      </p>
      {error ? <Alert>{error}</Alert> : null}
      <ProgressView data={data} />
    </div>
  );
}
