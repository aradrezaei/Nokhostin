import React, { useState, useRef, useEffect } from 'react';
import {
  Code,
  BrainCircuit,
  PenTool,
  Cog,
  Music,
  TrendingUp,
  Camera,
  Layers,
  LayoutGrid,
  Terminal,
  Globe,
  Scissors,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Users,
  BookOpen,
} from 'lucide-react';

const cat = [
  {
    name: 'برنامه‌نویسی',
    icon: Code,
    count: '۲۴۰ دوره',
    lightBg: 'bg-blue-50',
    tag: 'پرطرفدار',
  },
  {
    name: 'هوش مصنوعی',
    icon: BrainCircuit,
    count: '۱۸۵ دوره',
    lightIcon: 'text-violet-600',
    tag: 'داغ',
  },
  {
    name: 'طراحی سایت',
    icon: Globe,
    count: '۱۲۰ دوره',
    lightIcon: 'text-cyan-600',
    tag: null,
  },
  {
    name: 'پایتون',
    icon: Terminal,
    count: null,
    lightIcon: 'text-yellow-600',
    tag: null,
  },
  {
    name: 'فتوشاپ',
    icon: Layers,
    count: null,
    lightIcon: 'text-indigo-600',
    tag: null,
  },
  {
    name: 'اکسل',
    icon: LayoutGrid,
    count: null,
    lightIcon: 'text-green-600',
    tag: null,
  },
  {
    name: 'گرافیک',
    icon: PenTool,
    count: '۶۷ دوره',
    lightIcon: 'text-orange-600',
    tag: null,
  },
  {
    name: 'عکاسی',
    icon: Camera,
    count: '۴۲ دوره',
    lightIcon: 'text-pink-600',
    tag: null,
  },
  {
    name: 'رباتیک',
    icon: Cog,
    count: '۳۱ دوره',
    lightIcon: 'text-emerald-600',
    tag: 'جدید',
  },
  {
    name: 'موسیقی',
    icon: Music,
    count: '۵۵ دوره',
    lightIcon: 'text-indigo-600',
    tag: null,
  },
  {
    name: 'امور مالی',
    icon: TrendingUp,
    count: '۶۱ دوره',
    lightIcon: 'text-amber-600',
    tag: null,
  },
  {
    name: 'هنرهای دستی',
    icon: Scissors,
    count: '۲۸ دوره',
    lightIcon: 'text-rose-600',
    tag: null,
  },
];

function CategoryCard({ cat, index }: { cat: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = cat.icon;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 60}ms`,
        outline: 'none',
      }}
      className="group relative flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-slate-700/60    cursor-pointer overflow-hidden "
      aria-label={cat.name}
    >
      {/* Gradient overlay on hover */}
      <div className="" />

      {/* Tag badge */}
      {cat.tag && (
        <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-700/90 text-gray-700 dark:text-gray-200 shadow-sm">
          {cat.tag}
        </span>
      )}

      {/* Icon container */}
      <div
        className="relative z-10 flex items-center justify-center rounded-xl 
          
          
           group-hover:scale-120 transition duration-150 "
      >
        <Icon size={40} className={`${cat.lightIcon}`} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center">
        <p className="text-md font-bold text-gray-800 dark:text-gray-100">{cat.name}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{cat.count}</p>
      </div>
    </button>
  );
}

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null); // ← این خط رو اصلاح کن
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10); // اصلاح شده برای RTL
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = dir === 'right' ? 200 : -200;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // چک اولیه
      checkScroll();
    }

    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="w-full py-14 px-2 bg-white dark:bg-gray-950  " dir="rtl">
      <div className="max-w-screen-xl mx-auto px-2">
        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              دسته بندی های{' '}
              <span className="relative">
                مهارت
                <span className="absolute -bottom-1.5 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
              </span>
            </h2>
          </div>

          <div className="flex items-center tracking-tight gap-2 shrink-0">
            <a
              href="#"
              className="md:hidden inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400  bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full"
            >
              مشاهده همه
              <ArrowLeft size={14} />
            </a>
            <a
              href="#"
              className=" hidden md:inline items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-4 py-2 rounded-full"
            >
              مشاهده همه دسته بندی ها
              <ArrowLeft size={14} />
            </a>
          </div>
        </div>

        {/* ── Grid (desktop) / Scroll (mobile) ── */}
        <div
          ref={scrollRef}
          className="
            grid grid-cols-3  sm:grid-cols-4 md:grid-cols-6 gap-3
            md:overflow-visible
            
          "
          style={{ direction: 'rtl' }}
        >
          {cat.map(
            (
              catItem,
              i, // یا اسم آرایه رو به categories تغییر بده
            ) => (
              <CategoryCard key={catItem.name} cat={catItem} index={i} />
            ),
          )}
        </div>

        {/* ── Mobile "see all" ── */}
        <div className="mt-6 flex md:hidden justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-6 py-2.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all"
          >
            مشاهده همه دسته‌بندی‌ها
            <ArrowLeft size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
