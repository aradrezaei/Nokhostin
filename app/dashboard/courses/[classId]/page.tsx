'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useClassProgress } from '@/hooks/useClassProgress';
import ImprovementModal from '@/components/panel/ImprovementModal';
import { Alert } from '@/components/panel/ui';

const ProgressView = dynamic(() => import('@/components/panel/ProgressView'), {
  loading: () => <div className="h-64" aria-hidden />,
  ssr: false,
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
  if (!data) {
    return loading ? <div className="h-64" aria-hidden /> : null;
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <ImprovementModal items={improvementItems} />
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[var(--p-accent)] hover:text-[var(--p-accent-deep)]"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2.75} aria-hidden />
        کلاس‌ها
      </Link>
      <ProgressView data={data} />
    </div>
  );
}
