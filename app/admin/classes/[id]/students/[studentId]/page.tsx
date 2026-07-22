'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ClassProgress } from '@/lib/types';
import ProgressView from '@/components/panel/ProgressView';
import { Alert } from '@/components/panel/ui';
import { Spinner } from '@/components/panel/widgets';

export default function AdminStudentProgressPage() {
  const { id, studentId } = useParams<{ id: string; studentId: string }>();
  const { request } = useAuth();
  const [data, setData] = useState<ClassProgress | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await request<ClassProgress>(`/classes/${id}/students/${studentId}/progress`));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت روند رشد.');
    } finally {
      setLoading(false);
    }
  }, [request, id, studentId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Spinner />;
  if (error) return <Alert>{error}</Alert>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-slate-400">
        <Link href={`/admin/classes/${id}`} className="hover:text-[#7c3aed]">
          بازگشت به کلاس
        </Link>
      </p>
      <ProgressView data={data} />
    </div>
  );
}
