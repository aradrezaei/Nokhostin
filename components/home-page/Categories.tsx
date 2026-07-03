'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Code,
  BrainCircuit,
  Globe,
  Terminal,
  Layers,
  LayoutGrid,
  PenTool,
  Camera,
  Cog,
  Music,
  TrendingUp,
  Scissors,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

type Category = {
  name: string;
  icon: LucideIcon;
  count: string | null;
  tag: string | null;
  iconWrap: string;
  dot: string;
  hoverBorder: string;
};

const categories: Category[] = [
  {
    name: 'برنامه‌نویسی',
    icon: Code,
    count: '۲۴۰ دوره',
    tag: 'پرطرفدار',
    iconWrap: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    dot: 'bg-blue-500',
    hoverBorder: 'group-hover:border-blue-200 dark:group-hover:border-blue-500/40',
  },
  {
    name: 'هوش مصنوعی',
    icon: BrainCircuit,
    count: '۱۸۵ دوره',
    tag: 'داغ',
    iconWrap: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
    dot: 'bg-violet-500',
    hoverBorder: 'group-hover:border-violet-200 dark:group-hover:border-violet-500/40',
  },
  {
    name: 'طراحی سایت',
    icon: Globe,
    count: '۱۲۰ دوره',
    tag: null,
    iconWrap: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400',
    dot: 'bg-cyan-500',
    hoverBorder: 'group-hover:border-cyan-200 dark:group-hover:border-cyan-500/40',
  },
  {
    name: 'پایتون',
    icon: Terminal,
    count: null,
    tag: null,
    iconWrap: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
    dot: 'bg-yellow-500',
    hoverBorder: 'group-hover:border-yellow-200 dark:group-hover:border-yellow-500/40',
  },
  {
    name: 'فتوشاپ',
    icon: Layers,
    count: null,
    tag: null,
    iconWrap: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    dot: 'bg-indigo-500',
    hoverBorder: 'group-hover:border-indigo-200 dark:group-hover:border-indigo-500/40',
  },
  {
    name: 'اکسل',
    icon: LayoutGrid,
    count: null,
    tag: null,
    iconWrap: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    hoverBorder: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-500/40',
  },
  {
    name: 'گرافیک',
    icon: PenTool,
    count: '۶۷ دوره',
    tag: null,
    iconWrap: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    dot: 'bg-orange-500',
    hoverBorder: 'group-hover:border-orange-200 dark:group-hover:border-orange-500/40',
  },
  {
    name: 'عکاسی',
    icon: Camera,
    count: '۴۲ دوره',
    tag: null,
    iconWrap: 'bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400',
    dot: 'bg-fuchsia-500',
    hoverBorder: 'group-hover:border-fuchsia-200 dark:group-hover:border-fuchsia-500/40',
  },
  {
    name: 'رباتیک',
    icon: Cog,
    count: '۳۱ دوره',
    tag: 'جدید',
    iconWrap: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
    dot: 'bg-slate-500',
    hoverBorder: 'group-hover:border-slate-300 dark:group-hover:border-slate-500/40',
  },
  {
    name: 'موسیقی',
    icon: Music,
    count: '۵۵ دوره',
    tag: null,
    iconWrap: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    dot: 'bg-purple-500',
    hoverBorder: 'group-hover:border-purple-200 dark:group-hover:border-purple-500/40',
  },
  {
    name: 'امور مالی',
    icon: TrendingUp,
    count: '۶۱ دوره',
    tag: null,
    iconWrap: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    dot: 'bg-amber-500',
    hoverBorder: 'group-hover:border-amber-200 dark:group-hover:border-amber-500/40',
  },
  {
    name: 'هنرهای دستی',
    icon: Scissors,
    count: '۲۸ دوره',
    tag: null,
    iconWrap: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    dot: 'bg-rose-500',
    hoverBorder: 'group-hover:border-rose-200 dark:group-hover:border-rose-500/40',
  },
];

function CategoryCard({ item, index }: { item: Category; index: number }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      aria-label={item.name}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      className={`category-card group relative flex w-[124px] shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-center outline-none transition-[transform,border-color] duration-150 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 active:translate-y-0 dark:border-slate-800 dark:bg-gray-900 dark:focus-visible:ring-offset-gray-950 sm:w-[140px] sm:p-5 ${item.hoverBorder}`}
    >
      {item.tag && (
        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:bg-slate-800 dark:text-gray-300">
          <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
          {item.tag}
        </span>
      )}

      <span
        className={`flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-150 ease-out group-hover:scale-110 group-active:scale-95 ${item.iconWrap}`}
      >
        <Icon size={26} strokeWidth={1.75} />
      </span>

      <span className="flex flex-col gap-0.5">
        <span className="text-[13.5px] font-bold text-gray-800 dark:text-gray-100">{item.name}</span>
        {item.count && <span className="text-[11px] text-gray-400 dark:text-gray-500">{item.count}</span>}
      </span>
    </button>
  );
}

/** RTL-safe horizontal scroller: handles both scrollLeft conventions
 *  browsers use in `dir="rtl"` (Chrome/Firefox go 0 → -max, legacy
 *  Safari goes max → 0) and exposes clean prev/next + boundary state. */
function useHorizontalScroller<T extends HTMLDivElement>() {
  const ref = useRef<T>(null);
  const convention = useRef<'negative' | 'positive'>('negative');
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) {
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    const fromStart = convention.current === 'negative' ? -el.scrollLeft : max - el.scrollLeft;
    setAtStart(fromStart <= 4);
    setAtEnd(fromStart >= max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    convention.current = el.scrollLeft > max / 2 ? 'positive' : 'negative';
    measure();

    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const scrollByStep = useCallback((dir: 'prev' | 'next') => {
    const el = ref.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, 480);
    el.scrollBy({ left: dir === 'next' ? -step : step, behavior: 'smooth' });
  }, []);

  return { ref, atStart, atEnd, scrollByStep };
}

export default function CategoriesSection() {
  const { ref: scrollerRef, atStart, atEnd, scrollByStep } = useHorizontalScroller<HTMLDivElement>();

  return (
    <section className="w-full bg-white py-14 dark:bg-gray-950" dir="rtl">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-3xl">
            دسته‌بندی‌های{' '}
            <span className="relative">
              مهارت
              <span className="absolute -bottom-1.5 right-0 left-0 h-[4px] rounded-full bg-violet-500" />
            </span>
          </h2>

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-600 transition-colors duration-150 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 sm:px-4"
          >
            <span className="hidden sm:inline">مشاهده همه دسته‌بندی‌ها</span>
            <span className="sm:hidden">همه</span>
            <ArrowLeft size={14} />
          </a>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="scroller flex gap-3 overflow-x-auto scroll-smooth px-1 py-1"
            style={{
              scrollSnapType: 'x proximity',
              maskImage: 'linear-gradient(90deg, transparent, black 20px, black calc(100% - 20px), transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, black 20px, black calc(100% - 20px), transparent)',
            }}
          >
            {categories.map((item, i) => (
              <CategoryCard key={item.name} item={item} index={i} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByStep('prev')}
            disabled={atStart}
            aria-label="نمایش دسته‌بندی‌های قبلی"
            className="nav-arrow absolute start-0 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-0 dark:border-slate-700 dark:bg-gray-900 dark:text-gray-300 md:flex"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByStep('next')}
            disabled={atEnd}
            aria-label="نمایش دسته‌بندی‌های بعدی"
            className="nav-arrow absolute end-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-0 dark:border-slate-700 dark:bg-gray-900 dark:text-gray-300 md:flex"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroller::-webkit-scrollbar {
          display: none;
        }

        :global(.category-card) {
          animation: category-in 420ms ease-out both;
        }

        @keyframes category-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.category-card) {
            animation: none;
          }
          :global(.category-card),
          .nav-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}