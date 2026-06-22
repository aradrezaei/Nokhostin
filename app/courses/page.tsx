'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Layers,
  Cpu,
  TrendingUp,
  Code,
  BookOpen,
  Image as ImageIcon,
  Sparkles,
  Bookmark,
  Paintbrush,
  Calculator,
} from 'lucide-react';

// TYPES & DATA
interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'programming' | 'accounting' | 'robotics' | 'design';
  categoryLabel: string;
  instructor: string;
  duration: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  imagePath?: string;
  icon: React.ElementType;
}

const CATEGORIES = [
  { id: 'all', label: 'همه دوره‌ها', icon: Layers, count: '۲۴ دوره' },
  { id: 'programming', label: 'برنامه‌نویسی و توسعه وب', icon: Code, count: '۸ دوره' },
  { id: 'robotics', label: 'رباتیک و هوش مصنوعی', icon: Cpu, count: '۵ دوره' },
  { id: 'accounting', label: 'حسابداری و مالیات پیشرفته', icon: Calculator, count: '۴ دوره' },
  { id: 'design', label: 'طراحی، معماری و گرافیک', icon: Paintbrush, count: '۷ دوره' },
] as const;

const COURSES_DATA: Course[] = [
  {
    id: '1',
    slug: 'icdl',
    title: 'دوره جامع حسابداری ویژه بازار کار و مالیات پیشرفته',
    category: 'accounting',
    categoryLabel: 'حسابداری و مالی',
    instructor: 'مشاور ارشد مالیاتی',
    duration: '۱۸۰ ساعت',
    price: '۶,۸۰۰,۰۰۰',
    oldPrice: '۸,۵۰۰,۰۰۰',
    badge: 'دوره مصوب',
    imagePath: '/assets/courses/accounting.jpg',
    icon: TrendingUp,
  },
  {
    id: '2',
    slug: 'robotics-mcu',
    title: 'مهندسی رباتیک کارگاهی و مکاترونیک هوشمند (IoT)',
    category: 'robotics',
    categoryLabel: 'مکاترونیک',
    instructor: 'مربی ارشد آکادمی',
    duration: '۱۶۰ ساعت',
    badge: 'مسابقات بین‌المللی',
    price: '۷,۲۰۰,۰۰۰',
    imagePath: '/assets/courses/robotics.jpg',
    icon: Cpu,
  },
  {
    id: '3',
    slug: 'bleeding-edge-frontend',
    title: 'دوره پیشرفته فرانت‌اند: Next.js 15، TypeScript و Hono.js',
    category: 'programming',
    categoryLabel: 'برنامه‌نویسی',
    instructor: 'آراد رضایی',
    duration: '۲۲۰ ساعت',
    badge: 'توسعه تخصصی',
    price: '۹,۵۰۰,۰۰۰',
    imagePath: '/assets/courses/frontend.jpg',
    icon: Code,
  },
];

// ─── BADGE CHIP (ACCESSIBLE & MINIMAL) ────────────────────────────────────────
function BadgeChip({ label }: { label: string }) {
  return (
    <span className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-gray-900/80 dark:bg-gray-950/80 backdrop-blur-md text-white text-[10px] font-black tracking-wide rounded-md border border-white/10 shadow-sm select-none">
      {label}
    </span>
  );
}

// COURSE CARD
function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex flex-col bg-white dark:bg-gray-950 border border-gray-150/40 dark:border-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/30 dark:hover:border-purple-500/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {course.imagePath ? (
          <img
            src={course.imagePath}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300 dark:text-gray-800">
            <ImageIcon size={24} strokeWidth={1.5} />
            <span className="text-[9px] font-mono tracking-widest">NO ASSET</span>
          </div>
        )}
        {course.badge && <BadgeChip label={course.badge} />}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-5 gap-3.5" dir="rtl">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-purple-600 dark:bg-purple-400" />
          <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 tracking-wide">
            {course.categoryLabel}
          </span>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className="block focus-visible:outline-none focus-visible:underline"
        >
          <h3 className="text-sm font-black text-gray-900 dark:text-white leading-relaxed line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {course.title}
          </h3>
        </Link>

        <div className="border-t border-gray-150/30 dark:border-gray-900/50" />

        {/* Metadata Details */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <User size={12} aria-hidden="true" />
            <span>مدرس: {course.instructor}</span>
          </div>
          <div className="flex items-center gap-1.5" dir="ltr">
            <Clock size={12} aria-hidden="true" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price Tag & CTA button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-150/30 dark:border-gray-900/50">
          <div>
            {course.oldPrice && (
              <span
                className="block text-[10px] text-gray-400 line-through font-mono tracking-tight"
                dir="ltr"
              >
                {course.oldPrice}
              </span>
            )}
            <div className="flex items-baseline gap-0.5">
              <span className="text-base font-black text-gray-900 dark:text-white font-mono tabular-nums">
                {course.price}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">تومان</span>
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 dark:bg-gray-900 border border-transparent dark:border-gray-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white text-[11px] font-bold rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <span>مشاهده دوره</span>
            <ArrowLeft size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PremiumCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);

  // CPU Optimized Search and Filter Function
  const filteredCourses = useMemo(() => {
    const cleanedQuery = searchQuery.trim().toLowerCase();
    return COURSES_DATA.filter((course) => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      if (!matchesCategory) return false;
      if (cleanedQuery.length < 2) return true; // Avoid excessive heavy checks on tiny inputs
      return course.title.toLowerCase().includes(cleanedQuery);
    });
  }, [selectedCategory, searchQuery]);

  // Performance optimized slider scrolling using useCallback
  const scrollSlider = useCallback((direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft } = sliderRef.current;
      const offset = direction === 'left' ? -240 : 240;
      sliderRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <main
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-purple-500/10"
      dir="rtl"
    >
      {/* ── HERO SECTION ── */}
      <section className="relative pt-20 pb-14 bg-gray-50/20 dark:bg-gray-900/10 border-b border-gray-150/40 dark:border-gray-900/40">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex mt-3 items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-150/50 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-[11px] font-bold">
            <Sparkles size={11} className="text-purple-500" /> مهارت امروز شغل فردا
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              جستجو در دروه ها و مهارت ها
            </h1>
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 max-w-lg mx-auto leading-relaxed font-semibold">
              مسیرهای یادگیری ساختاریافته فنی و حرفه‌ای، مبتنی بر نیاز سنجی بازار کار و استانداردهای
              بین‌المللی کشور.
            </p>
          </div>

          {/* Search Box Engine Container */}
          <div className="w-full max-w-xl mx-auto p-1.5 bg-white dark:bg-gray-900 border border-gray-150/60 dark:border-gray-800 rounded-xl flex items-center gap-2 focus-within:border-purple-500/50 transition-colors">
            <div className="flex-1 relative flex items-center">
              <Search size={16} className="text-gray-400 absolute right-3" aria-hidden="true" />
              <input
                type="text"
                aria-label="جستجوی دوره آموزشی"
                placeholder="جستوجو در دوره ها.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-gray-900 dark:text-white pr-9 pl-3 py-2.5 focus:outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL SLIDER CATEGORIES ── */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-150/40 dark:border-gray-900  top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark size={11} /> دسته بندی های آموزشی
            </span>

            {/* Slider Controls Buttons */}
            <div className="flex items-center gap-1" dir="ltr">
              <button
                onClick={() => scrollSlider('left')}
                aria-label="حرکت به چپ"
                className="w-6 h-6 rounded-md border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={12} />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                aria-label="حرکت به راست"
                className="w-6 h-6 rounded-md border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Horizontal Slider Layout */}
          <div
            ref={sliderRef}
            role="tablist"
            aria-label="دسته بندی ها"
            className="flex gap-2.5 overflow-x-auto pb-1.5 snap-x no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 w-[190px] snap-start flex items-center gap-2.5 p-2 rounded-lg border text-right transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 ${
                    isActive
                      ? 'bg-gray-900 dark:bg-gray-900 border-transparent text-white shadow-sm'
                      : 'bg-white dark:bg-gray-950 border-gray-150/60 dark:border-gray-900 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-800'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${isActive ? 'bg-white/10 text-white' : 'bg-gray-50 dark:bg-gray-900 border border-gray-150/30 dark:border-gray-800 text-gray-400'}`}
                  >
                    <CatIcon size={14} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[11px] truncate">{cat.label}</h4>
                    <p
                      className={`text-[9px] mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}
                    >
                      {cat.count}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COURSE GRID SYSTEM ── */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        {filteredCourses.length > 0 ? (
          <>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-5 font-bold flex items-center gap-2.5">
              <span className="w-1 h-2.5 bg-gray-400 rounded-full" />
              نمایش {filteredCourses.length} استاندارد مهارتی معتبر
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        ) : (
          /* Empty Search Fallback UI */
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-150/40 dark:border-gray-800 flex items-center justify-center text-gray-400">
              <BookOpen size={18} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-black text-gray-900 dark:text-white">
                دوره مورد نظر یافت نشد
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed font-semibold">
                کلمه کلیدی یا دپارتمان فعال را مجدداً بازبینی فرمایید.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-1 px-3 py-1.5 text-[10px] font-black text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-md bg-purple-50/20 dark:bg-purple-950/20 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors"
            >
              بازنشانی فیلترها
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
