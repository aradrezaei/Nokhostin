'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useWarmOverviewCache } from '@/hooks/useMyOverview';
import { applyTheme, readIsDark } from '@/lib/theme';
import { panelHome } from '@/lib/roles';
import type { UserRole } from '@/lib/types';
import Avatar from '@/components/panel/Avatar';

export interface PanelNavItem {
  href: string;
  label: string;
  icon: ReactNode;
  tab?: string;
}

interface PanelLayoutProps {
  brand?: string;
  navItems: PanelNavItem[];
  allowedRoles: UserRole[];
  children: ReactNode;
  chips?: ReactNode;
}

function useThemeToggle() {
  const [dark, setDark] = useState(readIsDark);

  useEffect(() => {
    const sync = () => {
      setDark(readIsDark());
    };
    window.addEventListener('storage', sync);
    window.addEventListener('nokhostin-theme', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('nokhostin-theme', sync);
    };
  }, []);

  const toggle = useCallback(() => {
    setDark((current) => {
      const next = !current;
      applyTheme(next);
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

function profileHref(role: UserRole): string {
  if (role === 'student') return '/dashboard/profile';
  if (role === 'mentor') return '/mentor';
  return '/admin';
}

/** Authenticated shell — top bar + right sidebar (desktop) / bottom tabs (mobile). */
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
        <div className="flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href={home}
            className="flex shrink-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-accent)]"
            aria-label={brand}
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--p-accent)]">
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
              {dark ? (
                <Sun className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={2.5} />
              )}
            </button>
            {user ? (
              <Link
                href={profileHref(user.role)}
                className="flex items-center gap-2 rounded-xl pe-1 ps-1 hover:bg-[var(--p-bg)]"
                aria-label={user.fullName}
              >
                <Avatar
                  name={user.fullName}
                  seed={user.id}
                  size={32}
                  priority
                  className="!rounded-full"
                />
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

      <div className="flex w-full">
        <aside className="panel-side sticky top-[var(--p-top)] hidden h-[calc(100dvh-var(--p-top))] w-56 shrink-0 flex-col border-e-2 border-[var(--p-line)] bg-[var(--p-surface)] py-5 pe-3 ps-4 lg:flex xl:w-60 xl:ps-6">
          <nav className="flex flex-col gap-0.5" aria-label="منوی پنل">
            {navItems.map((item) => {
              const active = ready && isNavActive(pathname, item.href, home);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-extrabold ${
                    active
                      ? 'bg-[color-mix(in_srgb,var(--p-accent)_12%,transparent)] text-[var(--p-accent)]'
                      : 'text-[var(--p-muted)] hover:bg-[var(--p-bg)] hover:text-[var(--p-ink)]'
                  }`}
                >
                  <span className="[&_svg]:h-5 [&_svg]:w-5">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-[calc(100dvh-var(--p-top)-var(--p-bottom))] min-w-0 flex-1 px-4 pb-[calc(var(--p-bottom)+1rem)] pt-5 sm:px-6 lg:px-8 lg:pb-8 xl:px-10">
          {ready ? children : <div className="h-32" aria-hidden />}
        </main>
      </div>

      <nav className="panel-bottom lg:hidden" aria-label="ناوبری پایین">
        <div className="flex h-[4rem] w-full items-stretch">
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
