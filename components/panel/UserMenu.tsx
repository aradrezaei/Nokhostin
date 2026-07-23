'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { panelHome, ROLE_LABEL } from '@/lib/roles';
import Avatar from '@/components/panel/Avatar';

/** Auth chip: guest CTA or logged-in avatar + name + panel/logout menu. */
export default function UserMenu() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (loading) {
    return (
      <span
        className="inline-flex h-9 w-28 items-center gap-2 rounded-xl bg-[var(--nav-muted)] px-2"
        aria-hidden="true"
      >
        <span className="h-7 w-7 animate-pulse rounded-xl bg-[var(--nav-border)]" />
        <span className="h-3 flex-1 animate-pulse rounded bg-[var(--nav-border)]" />
      </span>
    );
  }

  if (!user) {
    return (
      <Link href="/auth" className="nav-cta">
        ورود و ثبت‌نام
      </Link>
    );
  }

  const home = panelHome(user.role);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`حساب ${user.fullName}`}
        className="inline-flex max-w-[220px] items-center gap-2 rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] py-1 pe-2.5 ps-1 text-[13px] font-semibold text-[var(--nav-ink)] hover:bg-[var(--nav-muted)]"
      >
        <Avatar name={user.fullName} seed={user.id} size={28} priority className="!rounded-lg" />
        <span className="hidden truncate sm:inline">{user.fullName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-[var(--nav-muted-ink)] ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.25}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="nav-dropdown absolute left-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] shadow-[0_16px_40px_-12px_rgba(15,23,42,0.2)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-3 border-b border-[var(--nav-border)] px-3.5 py-3">
            <Avatar name={user.fullName} seed={user.id} size={40} className="!rounded-xl" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--nav-ink)]">
                {user.fullName}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[var(--brand)]">
                {ROLE_LABEL[user.role]}
              </p>
            </div>
          </div>
          <Link
            href={home}
            role="menuitem"
            onClick={() => { setOpen(false); }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium text-[var(--nav-muted-ink)] hover:bg-[var(--nav-muted)] hover:text-[var(--nav-ink)]"
          >
            <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
            ورود به پنل
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await logout();
              router.replace('/');
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
}
