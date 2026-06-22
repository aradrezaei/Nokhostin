'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, BrainCircuit, Calculator, Bot, Palette, Camera, Languages } from 'lucide-react';
// TYPES & DATA
interface SubCategory {
  name: string;
  slug: string;
}

interface AcademyDepartment {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  subItems: SubCategory[];
}

const NAV_ITEMS = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/blog', label: 'مجله علمی' },
  { href: '/about', label: 'درباره آکادمی' },
];

const ACADEMY_DEPARTMENTS: AcademyDepartment[] = [
  {
    id: 'programming',
    title: 'برنامه نویسی',
    icon: <Code2 />,
    subItems: [
      { name: 'پایتون', slug: 'frontend' },
      { name: ' بک‌اند (/)', slug: 'backend' },
      { name: 'هوش مصنوعی و یادگیری ماشین', slug: 'ai-ml' },
      { name: 'امنیت شبکه و تست نفوذ', slug: 'security' },
    ],
  },
  {
    id: 'ai',
    title: 'هوش مصنوعی',
    icon: <BrainCircuit />,
    subItems: [
      { name: 'توسعه فرانت‌اند (React/ .js)', slug: 'frontend' },
      { name: 'برنامه‌نویسی بک‌اند (Node.js/Python)', slug: 'backend' },
      { name: 'هوش مصنوعی و یادگیری ماشین', slug: 'ai-ml' },
      { name: 'امنیت شبکه و تست نفوذ', slug: 'security' },
    ],
  },
  {
    id: 'accounting',
    title: 'امور مالی و حسابداری ',
    icon: <Calculator />,
    subItems: [
      { name: 'حسابداری ویژه بازار کار', slug: 'job-accounting' },
      { name: 'قوانین مالیاتی و اظهارنامه', slug: 'tax-laws' },
      { name: 'حسابداری مکانیزه (هلو و سپیدار)', slug: 'software-accounting' },
    ],
  },
  {
    id: 'robotics',
    title: 'رباتیک',
    icon: <Bot />,
    subItems: [
      { name: 'اینترنت اشیاء (IoT)', slug: 'iot' },
      { name: 'طراحی و عیب‌یابی مدارهای الکترونیکی', slug: 'circuits' },
      { name: 'برنامه‌نویسی میکروکنترلرها', slug: 'mcu' },
    ],
  },
  {
    id: 'photography',
    title: 'عکاسی',
    icon: <Camera />,
    subItems: [
      { name: 'طراحی گرافیک خلاقانه', slug: 'graphics' },
      { name: 'تدوین ویدیو و جلوه‌های ویژه', slug: 'video-editing' },
      { name: 'طراحی رابط کاربری (UI/UX)', slug: 'ui-ux' },
    ],
  },
  {
    id: 'language',
    title: 'زبان',
    icon: <Languages />,
    subItems: [
      { name: 'انگلیسی', slug: 'a' },
      { name: 'آلمانی', slug: 'b' },
      { name: 'چینی', slug: 'c' },
      { name: 'ژاپنی', slug: 'd' },
      { name: 'فرانسوی', slug: 'e' },
      { name: 'عربی', slug: 'f' },
    ],
  },
  {
    id: 'Art',
    title: 'هنر',
    icon: <Palette />,
    subItems: [
      { name: 'موسیقی', slug: 'iot' },
      { name: 'طراحی و نقاشی', slug: 'circuits' },
      { name: 'خیاطی', slug: 'mcu' },
      { name: 'طراحی لباس', slug: 'dokht' },
    ],
  },
];

// ─── PREMIUM ACADEMIC ICONS (SVG) ────────────────────────────────────────────
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12h-1m13.657-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const AcademicHomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);

const CategoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);

// ─── DESKTOP MEGA MENU ────────────────────────────────────────────────────────
function DesktopMegaMenu({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState(ACADEMY_DEPARTMENTS[0].id);
  const currentDept =
    ACADEMY_DEPARTMENTS.find((dept) => dept.id === activeTab) || ACADEMY_DEPARTMENTS[0];

  if (!visible) return null;

  return (
    <div
      role="menu"
      className="absolute top-full right-0 mt-2 w-[750px] bg-white dark:bg-gray-950 rounded-2xl  border border-gray-100/70 dark:border-gray-800 flex overflow-hidden z-50 text-right animate-in fade-in slide-in-from-top-2 "
    >
      <div className="w-[45%] bg-gray-50/40 dark:bg-gray-900/40 p-4 border-l border-gray-100/70 dark:border-gray-800 max-h-[480px] overflow-y-auto">
        <div className="space-y-1">
          {ACADEMY_DEPARTMENTS.map((dept) => {
            const isSelected = activeTab === dept.id;
            return (
              <button
                key={dept.id}
                onMouseEnter={() => setActiveTab(dept.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-right font-semibold text-xs ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/10'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                <span className="text-xs">{dept.icon}</span>
                <span className="flex-1 truncate">{dept.title}</span>
                {dept.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] rounded font-medium ${isSelected ? 'bg-white/20 text-white' : 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'}`}
                  >
                    {dept.badge}
                  </span>
                )}
                <ChevronLeftIcon
                  className={`w-3.5 h-3.5 opacity-60 ${isSelected ? 'translate-x-1' : ''} transition-transform`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-[55%] bg-white dark:bg-gray-950 p-5 flex flex-col justify-between max-h-[480px] overflow-y-auto">
        <div>
          <div className="grid grid-cols-1 gap-1">
            {currentDept.subItems.map((sub) => (
              <Link
                key={sub.slug}
                href={`/courses/${currentDept.id}/${sub.slug}`}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-900 text-xs font-semibold transition-colors"
              >
                <span>{sub.name}</span>
                <span className="text-[10px] text-gray-400 font-normal">مشاهده سرفصل‌ها</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-6 border-t border-gray-100/70 dark:border-gray-800/60 text-center">
          <Link
            href={`/courses/${currentDept.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            مشاهده تقویم آموزشی این دپارتمان
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE BOTTOM CATEGORIES DRAWER ─────────────────────────────────────────
function MobileCategoriesDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedDept, setSelectedDept] = useState<AcademyDepartment | null>(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 flex flex-col animate-in slide-in-from-bottom  text-right"
      dir="rtl"
    >
      <div className="h-14 border-b border-gray-100/70 dark:border-gray-900 px-4 flex items-center justify-between flex-shrink-0">
        {selectedDept ? (
          <button
            onClick={() => setSelectedDept(null)}
            className="flex items-center gap-1 text-xs font-bold text-purple-600"
          >
            <ChevronLeftIcon className="w-4 h-4 rotate-180" />
            <span>بازگشت</span>
          </button>
        ) : (
          <span className="text-xs font-black text-gray-900 dark:text-white">دستبه بندی های</span>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 text-xs font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-12">
        {!selectedDept ? (
          <div className="space-y-2">
            {ACADEMY_DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/60 dark:bg-gray-900 rounded-xl text-right transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{dept.icon}</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    {dept.title}
                  </span>
                </div>
                <ChevronLeftIcon className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-gray-400 mb-3 px-2">{selectedDept.title}</p>
            {selectedDept.subItems.map((sub) => (
              <Link
                key={sub.slug}
                href={`/courses/${selectedDept.id}/${sub.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100/50 dark:border-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent"
              >
                <span>{sub.name}</span>
                <ChevronLeftIcon className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN HEADER & NAVBAR
export default function Navbar() {
  const pathname = usePathname();

  // All Hooks are strictly defined inside the component body now
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  // Combined Scroll Listener for clean performance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Core Header Border/Background effect
      setScrolled(currentScrollY > 15);

      // 2. Smart Mobile Search Box Auto-Hide logic
      if (currentScrollY < 10) {
        setShowMobileSearch(true);
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        if (currentScrollY > lastScrollY) {
          setShowMobileSearch(false); // Scrolling Down
        } else {
          setShowMobileSearch(true); // Scrolling Up
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop & Base Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 text-right transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100/70 dark:border-gray-800/80 h-14 lg:h-16'
            : 'bg-transparent border-b border-transparent h-16 lg:h-20' // این خط را تغییر دهید
        }`}
        dir="rtl"
      >
        <div className="max-w-screen-xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 lg:gap-8 flex-1">
              <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <div className="relative w-8 h-8 lg:w-9 lg:h-9 flex-shrink-0 rounded-xl overflow-hidden bg-purple-600 flex items-center justify-center shadow-sm">
                  <img
                    src="/logo-white.png"
                    alt="آکادمی نخستین"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="hidden sm:block text-base lg:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                  آکادمی نخستین
                </span>
              </Link>

              <nav
                className="hidden lg:flex items-center gap-1 text-xs font-bold"
                aria-label="Academic Navigation"
              >
                <div
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={() => {
                    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
                    setMegaOpen(true);
                  }}
                  onMouseLeave={() => {
                    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
                  }}
                >
                  <button
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400  ${
                      megaOpen ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' : ''
                    }`}
                  >
                    دپارتمان‌های آموزشی
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <DesktopMegaMenu visible={megaOpen} />
                </div>

                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3.5 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex-1 max-w-sm relative hidden lg:block">
                <div
                  className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-xl border ${
                    searchFocused
                      ? 'border-purple-500 bg-white dark:bg-gray-900 ring-2 ring-purple-500/10'
                      : 'border-gray-100/80 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40'
                  }`}
                >
                  <SearchIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <input
                    type="search"
                    placeholder="جستجو در دوره‌ها و مهارت‌ها..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="flex-1 bg-transparent text-xs font-semibold text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div aria-label="دکمه تغییر تم" className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50/50 dark:bg-gray-900 border border-gray-100/70 dark:border-gray-800 text-gray-600 dark:text-gray-400"
              >
                {isDark ? (
                  <SunIcon className="w-4 h-4 text-yellow-500" />
                ) : (
                  <MoonIcon className="w-4 h-4 text-purple-600" />
                )}
              </button>

              <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl bg-gray-50/50 dark:bg-gray-900 border border-gray-100/70 dark:border-gray-800 text-gray-600 dark:text-gray-400 relative">
                <BellIcon className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-600 rounded-full" />
              </button>

              <div className="hidden lg:block w-px h-4 bg-gray-100 dark:bg-gray-800 mx-1" />

              <Link
                href="/auth"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span>ورود | ثبت نام</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── HIGHLY-ACCESSIBLE MOBILE SEARCH BAR (WITH AUTO-HIDE) ──────────────── */}
      <div
        className={`fixed top-14 lg:hidden inset-x-0 z-30 px-4 py-2 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100/40 dark:border-gray-900/60 transition-all duration-300 transform ${
          showMobileSearch
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        dir="rtl"
      >
        <div className="w-full flex items-center gap-2.5 px-3.5 py-1.5 bg-gray-50/80 dark:bg-gray-900 rounded-xl border border-gray-100/30 dark:border-gray-800/40">
          <SearchIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <input
            type="search"
            placeholder="جستجوی سریع دوره یا مهارت فنی..."
            className="flex-1 bg-transparent text-[11px] font-bold text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* ── DYNAMIC PREMIUM MOBILE BOTTOM NAVIGATION ─────────────────────────── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-100/70 dark:border-gray-900 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.015)]">
        <div className="flex items-center justify-around h-16 px-2" dir="rtl">
          {[
            { href: '/', icon: AcademicHomeIcon, label: 'خانه' },
            { href: '/courses', icon: GraduationCapIcon, label: 'دوره‌ها' },
            { isTrigger: true, label: 'دسته‌بندی‌ها' },
            { href: '/blog', icon: BookmarkIcon, label: 'بلاگ' },
            { href: '/auth', icon: UserIcon, label: 'پرتال' },
          ].map((item, index) => {
            if ('isTrigger' in item) {
              return (
                <button
                  key={index}
                  onClick={() => setMobileMenuOpen(true)}
                  className={`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all ${
                    mobileMenuOpen
                      ? 'text-purple-600 scale-105 font-black'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <CategoryIcon className="w-[19px] h-[19px]" />
                  <span className="text-[9px] font-black tracking-tight">{item.label}</span>
                </button>
              );
            }

            const isActive =
              pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-14 h-full gap-1 transition-all ${
                  isActive
                    ? 'text-purple-600 scale-105 font-black'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <item.icon className="w-[19px] h-[19px]" />
                <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Screen Categories Overlay System */}
      <MobileCategoriesDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Content Spacers */}
      <div className="h-[104px] lg:hidden" aria-hidden="true" />
    </>
  );
}
