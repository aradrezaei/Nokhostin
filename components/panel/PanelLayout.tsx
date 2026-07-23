'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useWarmOverviewCache } from '@/hooks/useMyOverview';
import { panelHome } from '@/lib/roles';
import type { UserRole } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';

export interface PanelNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  /** Short label for bottom tab (defaults to label). */
  tab?: string;
}

interface PanelLayoutProps {
  brand?: string;
  navItems: PanelNavItem[];
  allowedRoles: UserRole[];
  children: ReactNode;
  /** Optional top-bar stats (Duo-style chips). */
  chips?: ReactNode;
}

function useThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );

  const toggle = useCallback(() => {
    setDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return { dark, toggle };
}

function isNavActive(pathname: string, href: string, home: string): boolean {
  if (pathname === href) return true;
  if (href === home) return pathname === href;
  return pathname.startsWith(`${href}/`);
}

/**
 * Full-screen authenticated shell — separate world from the marketing site.
 * Duo pattern: sticky top stats + bottom tabs (mobile) / side rail (desktop).
 */
export default function PanelLayout({
  brand = 'نخستین',
  navItems,
  allowedRoles,
  children,
  chips,
}: PanelLayoutProps) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { dark, toggle } = useThemeToggle();
  const home = user ? panelHome(user.role) : '/';

  useWarmOverviewCache();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/auth');
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      router.replace(panelHome(user.role));
    }
  }, [user, loading, allowedRoles, router]);

  const primaryTabs = useMemo(() => {
    if (navItems.length <= 5) return navItems;
    return navItems.slice(0, 5);
  }, [navItems]);

  const ready = Boolean(user && allowedRoles.includes(user.role));

  return (
    <div dir="rtl" className="panel-app">
      <header className="panel-top">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-3 px-4">
          <Link
            href={home}
            className="flex shrink-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-green)]"
            aria-label={brand}
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--p-green)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-white.png"
                alt=""
                className="h-full w-full scale-[1.12] object-contain"
              />
            </span>
            <span className="hidden text-[15px] font-extrabold tracking-tight text-[var(--p-ink)] sm:block">
              {brand}
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2">
            {chips}
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? 'حالت روشن' : 'حالت تاریک'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[var(--p-muted)] hover:bg-[var(--p-bg)]"
            >
              {dark ? <Sun className="h-4 w-4" strokeWidth={2.5} /> : <Moon className="h-4 w-4" strokeWidth={2.5} />}
            </button>
            {user ? (
              <Link
                href={
                  user.role === 'student'
                    ? '/dashboard/profile'
                    : user.role === 'mentor'
                      ? '/mentor'
                      : '/admin'
                }
                className="flex items-center gap-2 rounded-xl pe-1 ps-1 hover:bg-[var(--p-bg)]"
                aria-label={user.fullName}
              >
                <Avatar name={user.fullName} seed={user.id} size={32} priority className="!rounded-full" />
              </Link>
            ) : null}
            {user ? (
              <button
                type="button"
                aria-label="خروج"
                className="hidden h-9 w-9 items-center justify-center rounded-xl text-[var(--p-muted)] hover:bg-[var(--p-bg)] hover:text-[var(--p-rose)] sm:inline-flex"
                onClick={async () => {
                  await logout();
                  router.replace('/');
                }}
              >
                <LogOut className="h-4 w-4" strokeWidth={2.5} />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl gap-0 lg:gap-8 lg:px-4">
        <aside className="panel-side sticky top-[var(--p-top)] hidden h-[calc(100dvh-var(--p-top))] w-52 shrink-0 flex-col border-e-2 border-[var(--p-line)] py-6 pe-4 lg:flex">
          <nav className="flex flex-col gap-1" aria-label="منوی پنل">
            {navItems.map((item) => {
              const active = ready && isNavActive(pathname, item.href, home);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-extrabold transition-colors ${
                    active
                      ? 'bg-[color-mix(in_srgb,var(--p-green)_14%,transparent)] text-[var(--p-green)]'
                      : 'text-[var(--p-muted)] hover:bg-[var(--p-surface)] hover:text-[var(--p-ink)]'
                  }`}
                >
                  <span className="[&_svg]:h-5 [&_svg]:w-5">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-[calc(100dvh-var(--p-top)-var(--p-bottom))] min-w-0 flex-1 px-4 pb-[calc(var(--p-bottom)+1.25rem)] pt-5 sm:px-6 lg:px-2 lg:pb-10">
          {ready ? children : <div className="h-40" aria-hidden />}
        </main>
      </div>

      <nav className="panel-bottom lg:hidden" aria-label="ناوبری پایین">
        <div className="mx-auto flex h-[4rem] max-w-lg items-stretch">
          {primaryTabs.map((item) => {
            const active = ready && isNavActive(pathname, item.href, home);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`panel-tab ${active ? 'panel-tab--on' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="[&_svg]:h-6 [&_svg]:w-6">{item.icon}</span>
                <span className="truncate px-1">{item.tab ?? item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
