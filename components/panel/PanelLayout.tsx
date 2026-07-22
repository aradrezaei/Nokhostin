'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { panelHome } from '@/lib/roles';
import type { UserRole } from '@/lib/types';

export interface PanelNavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

interface PanelLayoutProps {
  title: string;
  subtitle?: string;
  navItems: PanelNavItem[];
  allowedRoles: UserRole[];
  children: ReactNode;
}

/**
 * Simple panel shell that sits under the site navbar.
 * Horizontal pill tabs instead of a heavy sidebar — easier on mobile and clearer UX.
 */
export default function PanelLayout({
  title,
  subtitle,
  navItems,
  allowedRoles,
  children,
}: PanelLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  if (loading || !user || !allowedRoles.includes(user.role)) {
    return (
      <div dir="rtl" className="flex min-h-[40vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 border-b-4 bg-white px-6 py-4 dark:border-slate-800 dark:bg-[#131f24]">
          <span className="h-6 w-6 animate-spin rounded-full border-3 border-[#7c3aed] border-t-transparent" />
          <span className="text-sm font-black text-slate-700 dark:text-slate-200">
            در حال بارگذاری...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="bg-slate-50 text-slate-900 dark:bg-[#0f181c] dark:text-slate-100">
      <div className="border-b-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-[#131f24]">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h1 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          <nav
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="منوی پنل"
          >
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== panelHome(user.role) && pathname.startsWith(`${item.href}/`)) ||
                (item.href === panelHome(user.role) && pathname === item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black ${
                    active
                      ? 'border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white'
                      : 'border-2 border-slate-200 border-b-4 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-[#131f24] dark:text-slate-300'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
