'use client';

import { useAuth } from '@/lib/auth';
import { ROLE_LABEL } from '@/lib/roles';
import Avatar from '@/components/panel/Avatar';
import { Badge, Card } from '@/components/panel/ui';

export default function ProfilePage() {
  const { user } = useAuth();
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
            : 'حضوری',
    },
    { label: 'وضعیت حساب', value: user.status === 'active' ? 'فعال' : 'غیرفعال' },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card className="flex flex-col items-center !py-8 text-center">
        <Avatar name={user.fullName} seed={user.id} size={112} />
        <h1 className="mt-4 text-xl font-black text-slate-900 dark:text-white">{user.fullName}</h1>
        <div className="mt-2">
          <Badge tone="violet">{ROLE_LABEL[user.role]}</Badge>
        </div>
      </Card>

      <Card className="divide-y divide-slate-100 !p-0 dark:divide-slate-800">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{row.label}</span>
            <span
              dir={row.ltr ? 'ltr' : undefined}
              className="text-sm font-black text-slate-900 dark:text-white"
            >
              {row.value}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
