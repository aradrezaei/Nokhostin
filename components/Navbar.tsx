'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bot,
  BrainCircuit,
  Calculator,
  ChevronDown,
  ChevronLeft,
  Code2,
  Menu,
  Monitor,
  Moon,
  Palette,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { panelHome } from '@/lib/roles';
import { NAV_ITEMS } from '@/lib/site';
import UserMenu from '@/components/panel/UserMenu';
import Avatar from '@/components/panel/Avatar';
import BrandMark from '@/components/BrandMark';

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;
type CourseLink = { name: string; href: string };
type Department = {
  id: string;
  title: string;
  icon: IconComponent;
  courses: CourseLink[];
};

const DEPARTMENTS: Department[] = [
  {
    id: 'programming',
    title: 'برنامه‌نویسی',
    icon: Code2,
    courses: [
      { name: 'آموزش پایتون', href: '/courses/python-programming' },
      { name: 'طراحی وب HTML و CSS', href: '/courses/web-html' },
      { name: 'برنامه‌نویسی PHP', href: '/courses/php-course' },
    ],
  },
  {
    id: 'ai',
    title: 'هوش مصنوعی',
    icon: BrainCircuit,
    courses: [{ name: 'دوره هوش مصنوعی', href: '/courses/ai' }],
  },
  {
    id: 'computer',
    title: 'مهارت‌های کامپیوتر',
    icon: Monitor,
    courses: [{ name: 'مهارت‌های هفت‌گانه ICDL', href: '/courses/icdl' }],
  },
  {
    id: 'finance',
    title: 'مالی و حسابداری',
    icon: Calculator,
    courses: [{ name: 'حسابداری و مالیات', href: '/courses/accounting' }],
  },
  {
    id: 'robotics',
    title: 'رباتیک',
    icon: Bot,
    courses: [{ name: 'دوره تخصصی رباتیک', href: '/courses/robotics' }],
  },
  {
    id: 'arts',
    title: 'هنر و رسانه',
    icon: Palette,
    courses: [
      { name: 'فتوشاپ', href: '/courses/photoshop' },
      { name: 'عکاسی', href: '/courses/photo-graphi' },
      { name: 'طراحی و نقاشی', href: '/courses/naghashi' },
    ],
  },
];

function CourseMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="course-menu"
      role="menu"
      aria-label="دپارتمان‌های آموزشی"
      className="nav-dropdown absolute left-1/2 top-[calc(100%+12px)] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] shadow-[0_24px_64px_-16px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--nav-border)] px-5 py-3">
        <p className="text-[13px] font-semibold text-[var(--nav-ink)]">دپارتمان‌های آموزشی</p>
        <Link
          href="/courses"
          onClick={onNavigate}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--brand)] hover:bg-[var(--nav-muted)]"
        >
          همه دوره‌ها
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3">
        {DEPARTMENTS.map((department) => {
          const Icon = department.icon;
          return (
            <section key={department.id} className="rounded-xl p-3 hover:bg-[var(--nav-muted)]">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <h2 className="text-[12px] font-semibold text-[var(--nav-ink)]">{department.title}</h2>
              </div>
              <ul className="space-y-0.5">
                {department.courses.map((course) => (
                  <li key={course.href}>
                    <Link
                      href={course.href}
                      role="menuitem"
                      onClick={onNavigate}
                      className="block rounded-md px-1 py-1 text-[12px] text-[var(--nav-muted-ink)] hover:text-[var(--nav-ink)]"
                    >
                      {course.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setCoursesOpen(false);
      return;
    }
    closeBtnRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="منوی اصلی">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45"
        onClick={onClose}
        aria-label="بستن منو"
      />

      <aside className="nav-drawer absolute inset-y-0 right-0 flex w-[min(100vw-3rem,20rem)] flex-col bg-[var(--nav-bg)] shadow-2xl">
        <div className="flex h-14 items-center justify-between border-b border-[var(--nav-border)] px-4">
          <Link href="/" onClick={onClose} aria-label="صفحه اصلی نخستین">
            <BrandMark compact />
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="nav-icon-btn"
            aria-label="بستن منو"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3" aria-label="منوی موبایل">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`block rounded-xl px-3 py-2.5 text-[14px] font-semibold ${
                  isActive(item.href)
                    ? 'bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]'
                    : 'text-[var(--nav-ink)] hover:bg-[var(--nav-muted)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="my-3 h-px bg-[var(--nav-border)]" />

          <button
            type="button"
            onClick={() => setCoursesOpen((v) => !v)}
            aria-expanded={coursesOpen}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-semibold text-[var(--nav-ink)] hover:bg-[var(--nav-muted)]"
          >
            دپارتمان‌ها
            <ChevronDown
              className={`h-4 w-4 text-[var(--nav-muted-ink)] ${coursesOpen ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>

          {coursesOpen && (
            <div className="mt-1 space-y-2 rounded-xl bg-[var(--nav-muted)] p-2">
              {DEPARTMENTS.map((department) => {
                const Icon = department.icon;
                return (
                  <section key={department.id} className="rounded-lg px-2 py-1.5">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-[var(--brand)]" strokeWidth={2} />
                      <p className="text-[12px] font-bold text-[var(--nav-ink)]">{department.title}</p>
                    </div>
                    <div className="space-y-0.5 pr-5">
                      {department.courses.map((course) => (
                        <Link
                          key={course.href}
                          href={course.href}
                          onClick={onClose}
                          className="block py-1 text-[12px] text-[var(--nav-muted-ink)] hover:text-[var(--brand)]"
                        >
                          {course.name}
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
              <Link
                href="/courses"
                onClick={onClose}
                className="flex items-center justify-center gap-1 rounded-lg bg-[var(--nav-bg)] px-3 py-2 text-[12px] font-bold text-[var(--brand)] hover:text-[var(--brand-deep)]"
              >
                همه دوره‌ها
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
              </Link>
            </div>
          )}
        </nav>

        <div className="space-y-2 border-t border-[var(--nav-border)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {user ? (
            <>
              <Link
                href={panelHome(user.role)}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl border border-[var(--nav-border)] px-3 py-2.5 hover:bg-[var(--nav-muted)]"
              >
                <Avatar name={user.fullName} seed={user.id} size={36} className="!rounded-lg" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[var(--nav-ink)]">
                    {user.fullName}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--brand)]">ورود به پنل</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={async () => {
                  onClose();
                  await logout();
                  router.replace('/');
                }}
                className="flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
              >
                خروج از حساب
              </button>
            </>
          ) : (
            <Link href="/auth" onClick={onClose} className="nav-cta w-full">
              <UserRound className="h-4 w-4" strokeWidth={2} />
              ورود یا ثبت‌نام
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? '/';
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const courseMenuRef = useRef<HTMLDivElement>(null);
  const courseMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCourseMenu = useCallback(() => setCourseMenuOpen(false), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!courseMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (courseMenuRef.current && !courseMenuRef.current.contains(event.target as Node)) {
        closeCourseMenu();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCourseMenu();
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [courseMenuOpen, closeCourseMenu]);

  useEffect(() => {
    closeCourseMenu();
    closeMobileMenu();
  }, [pathname, closeCourseMenu, closeMobileMenu]);

  useEffect(() => {
    return () => {
      if (courseMenuTimerRef.current) clearTimeout(courseMenuTimerRef.current);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const openCourseMenu = () => {
    if (courseMenuTimerRef.current) clearTimeout(courseMenuTimerRef.current);
    setCourseMenuOpen(true);
  };

  const scheduleCloseCourseMenu = () => {
    courseMenuTimerRef.current = setTimeout(() => setCourseMenuOpen(false), 160);
  };

  return (
    <>
      <header
        dir="rtl"
        className={`nav-header fixed inset-x-0 top-0 z-50 h-14 sm:h-16 ${scrolled ? 'nav-header--scrolled' : ''}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href="/"
              className="flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
              aria-label="صفحه اصلی آموزشگاه نخستین"
            >
              <span className="lg:hidden">
                <BrandMark compact />
              </span>
              <span className="hidden lg:block">
                <BrandMark />
              </span>
            </Link>

            {/* Desktop links — from lg up; hamburger never shows here */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="منوی اصلی">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`nav-link ${active ? 'nav-link--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div
                ref={courseMenuRef}
                className="relative"
                onMouseEnter={openCourseMenu}
                onMouseLeave={scheduleCloseCourseMenu}
              >
                <button
                  type="button"
                  onClick={() => setCourseMenuOpen((v) => !v)}
                  aria-expanded={courseMenuOpen}
                  aria-controls="course-menu"
                  aria-haspopup="menu"
                  className={`nav-link inline-flex items-center gap-1.5 ${
                    courseMenuOpen ? 'nav-link--active' : ''
                  }`}
                >
                  دپارتمان‌ها
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 ${courseMenuOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2.25}
                  />
                </button>
                {courseMenuOpen && <CourseMenu onNavigate={closeCourseMenu} />}
              </div>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'فعال‌کردن حالت روشن' : 'فعال‌کردن حالت تاریک'}
              className="nav-icon-btn"
            >
              {isDark ? (
                <Sun className="h-[17px] w-[17px]" strokeWidth={2} />
              ) : (
                <Moon className="h-[17px] w-[17px]" strokeWidth={2} />
              )}
            </button>

            {/* Account chip only on desktop — mobile uses drawer */}
            <div className="hidden lg:block">
              <UserMenu />
            </div>

            {/* Hamburger only below lg — never beside desktop nav */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="بازکردن منو"
              className="nav-icon-btn nav-hamburger"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} pathname={pathname} />
      <div className="h-14 sm:h-16" aria-hidden="true" />
    </>
  );
}
