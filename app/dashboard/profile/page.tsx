'use client';

import Link from 'next/link';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatDate, formatSchedule, toFa } from '@/lib/format';
import { ROLE_LABEL } from '@/lib/roles';
import { useMyClasses } from '@/hook/useMyClasses';
import Avatar from '@/components/panel/Avatar';
import { Badge, Card } from '@/components/panel/ui';
import { EmptyState, Spinner, TuitionPill } from '@/components/panel/widgets';

export default function ProfilePage() {
  const { user } = useAuth();
  const { items, loading } = useMyClasses();

  if (!user) return null;

  const rows = [
    { label: 'نام و نام خانوادگی', value: user.fullName },
    { label: 'شماره موبایل', value: user.mobile, ltr: true },
    { label: 'نقش', value: ROLE_LABEL[user.role] },
    {
      label: 'نوع هنرجو',
      value:
        user.role !== 'student'
          ? '—'
          : user.studentType === 'online'
            ? 'آنلاین'
            : user.studentType === 'in_person'
              ? 'حضوری'
              : '—',
    },
    { label: 'وضعیت حساب', value: user.status === 'active' ? 'فعال' : 'غیرفعال' },
    ...(user.createdAt
      ? [{ label: 'تاریخ عضویت', value: formatDate(user.createdAt) }]
      : []),
  ];

  const activeClasses = items.filter((i) => i.status === 'active');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="flex flex-col items-center !py-8 text-center">
        <Avatar name={user.fullName} seed={user.id} size={112} priority />
        <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
          {user.fullName}
        </h1>
        <p dir="ltr" className="mt-1 text-sm font-bold text-slate-400">
          {user.mobile}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Badge tone="violet">{ROLE_LABEL[user.role]}</Badge>
          <Badge tone={user.status === 'active' ? 'green' : 'gray'}>
            {user.status === 'active' ? 'فعال' : 'غیرفعال'}
          </Badge>
          {user.studentType && (
            <Badge tone="amber">
              {user.studentType === 'online' ? 'آنلاین' : 'حضوری'}
            </Badge>
          )}
        </div>
      </Card>

      <Card className="divide-y divide-slate-100 !p-0 dark:divide-slate-800">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {row.label}
            </span>
            <span
              dir={row.ltr ? 'ltr' : undefined}
              className="text-sm font-black text-slate-900 dark:text-white"
            >
              {row.value}
            </span>
          </div>
        ))}
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">کلاس‌های ثبت‌شده</h2>
          <Link href="/dashboard/courses" className="text-xs font-black text-[#7c3aed]">
            مشاهده همه
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : activeClasses.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="کلاسی ثبت نشده"
            hint="کلاس‌های فعال اینجا نمایش داده می‌شوند."
          />
        ) : (
          <div className="space-y-3">
            {activeClasses.map((entry) => (
              <Link
                key={entry.enrollmentId}
                href={`/dashboard/courses/${entry.class.id}`}
                className="block"
              >
                <Card className="!p-4 hover:border-[#7c3aed]/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-900 dark:text-white">
                        {entry.class.title}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-400">
                        {entry.class.course?.name ?? '—'}
                        {entry.class.course?.level ? ` · ${entry.class.course.level}` : ''}
                        {' · '}ترم {toFa(entry.class.termNumber)}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-400">
                        {formatSchedule(entry.class.schedule)}
                        {entry.class.teacher ? ` · ${entry.class.teacher.fullName}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <TuitionPill paid={entry.tuitionPaid} />
                      <ChevronLeft className="h-4 w-4 text-slate-300" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
