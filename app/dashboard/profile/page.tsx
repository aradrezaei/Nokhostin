'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { formatDate, toFa } from '@/lib/format';
import { ROLE_LABEL } from '@/lib/roles';
import { useMyOverview } from '@/hooks/useMyOverview';
import Avatar from '@/components/panel/Avatar';
import Medal from '@/components/panel/Medal';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { classes, achievements } = useMyOverview();

  if (!user) {
    return <div className="h-40" aria-hidden />;
  }

  const activeCount = classes.filter((i) => i.status === 'active').length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 lg:mx-0 lg:max-w-3xl">
      <header className="panel-card flex flex-col items-center px-6 py-8 text-center">
        <Avatar name={user.fullName} seed={user.id} size={96} priority className="!rounded-full" />
        <h1 className="mt-4 text-xl font-extrabold text-[var(--p-ink)]">{user.fullName}</h1>
        <p dir="ltr" className="mt-1 text-sm font-bold text-[var(--p-muted)]">
          {user.mobile}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-[color-mix(in_srgb,var(--p-accent)_14%,transparent)] px-3 py-1 text-[11px] font-extrabold text-[var(--p-accent)]">
            {ROLE_LABEL[user.role]}
          </span>
          {user.studentType ? (
            <span className="rounded-full bg-[var(--p-bg)] px-3 py-1 text-[11px] font-extrabold text-[var(--p-muted)]">
              {user.studentType === 'online' ? 'آنلاین' : 'حضوری'}
            </span>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <div className="panel-card px-3 py-4 text-center">
          <p className="text-xl font-extrabold text-[var(--p-ink)]">{toFa(activeCount)}</p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">کلاس فعال</p>
        </div>
        <div className="panel-card px-3 py-4 text-center">
          <p className="text-xl font-extrabold text-[var(--p-ink)]">{toFa(achievements.length)}</p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">مدال</p>
        </div>
        <div className="panel-card px-3 py-4 text-center">
          <p className="text-xl font-extrabold text-[var(--p-ink)]">
            {user.status === 'active' ? '✓' : '—'}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[var(--p-muted)]">وضعیت</p>
        </div>
      </div>

      {achievements.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold text-[var(--p-ink)]">مدال‌ها</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {achievements.map((a) => (
              <Link
                key={`${a.code}-${a.classId}`}
                href={`/dashboard/courses/${a.classId}`}
                className="panel-card flex flex-col items-center px-2 py-3"
              >
                <Medal code={a.code} size={56} />
                <p className="mt-1 text-center text-[10px] font-extrabold text-[var(--p-ink)]">
                  {a.code === 'top_rank' ? 'مقام اول' : 'پیشرفت'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="panel-card divide-y-2 divide-[var(--p-line)] overflow-hidden !p-0">
        {[
          { label: 'موبایل', value: user.mobile, ltr: true },
          {
            label: 'عضویت',
            value: user.createdAt ? formatDate(user.createdAt) : '—',
          },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm font-bold text-[var(--p-muted)]">{row.label}</span>
            <span
              dir={row.ltr ? 'ltr' : undefined}
              className="text-sm font-extrabold text-[var(--p-ink)]"
            >
              {row.value}
            </span>
          </div>
        ))}
      </section>

      <button
        type="button"
        className="panel-btn panel-btn--ghost w-full text-[var(--p-rose)]"
        onClick={async () => {
          await logout();
          router.replace('/');
        }}
      >
        خروج از حساب
      </button>
    </div>
  );
}
