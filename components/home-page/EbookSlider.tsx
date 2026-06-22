'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight, Download, BookOpen, FileText, Zap, Eye } from 'lucide-react';
import 'swiper/css';

// ─── Types ────────────────────────────────────────────────────────────────────

type EbookPricing = 'free' | 'paid';
type EbookType = 'ebook' | 'note' | 'summary' | 'workbook';

interface Ebook {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryKey: string;
  cover: string;
  pages: number;
  downloads: number;
  views: number;
  pricing: EbookPricing;
  price?: number;
  type: EbookType;
  format: string[];
  isNew?: boolean;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all', label: 'همه محتوا' },
  { key: 'programming', label: 'برنامه‌نویسی' },
  { key: 'ai', label: 'هوش مصنوعی' },
  { key: 'finance', label: 'امور مالی' },
  { key: 'language', label: 'زبان' },
  { key: 'design', label: 'طراحی' },
  { key: 'business', label: 'کسب‌وکار' },
  { key: 'math', label: 'ریاضی' },
];

const TYPE_LABEL: Record<EbookType, string> = {
  ebook: 'کتاب الکترونیک',
  note: 'جزوه',
  summary: 'خلاصه درس',
  workbook: 'کتاب تمرین',
};

const TYPE_COLOR: Record<EbookType, string> = {
  ebook:
    'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
  note: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  summary:
    'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  workbook:
    'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800',
};

// Gradient covers — no external image dependency
const COVER_GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-teal-500 to-cyan-600',
  'from-orange-500 to-red-600',
];

const EBOOKS: Ebook[] = [
  {
    id: 1,
    title: 'راهنمای جامع پایتون برای مبتدیان',
    author: 'جادی میرمیرانی',
    category: 'برنامه‌نویسی',
    categoryKey: 'programming',
    cover: COVER_GRADIENTS[0],
    pages: 240,
    downloads: 18400,
    views: 42000,
    pricing: 'free',
    type: 'ebook',
    format: ['PDF', 'EPUB'],
    isNew: false,
  },
  {
    id: 2,
    title: 'جزوه یادگیری ماشین — فصل به فصل',
    author: 'دکتر رضایی',
    category: 'هوش مصنوعی',
    categoryKey: 'ai',
    cover: COVER_GRADIENTS[1],
    pages: 96,
    downloads: 9700,
    views: 21000,
    pricing: 'paid',
    price: 89000,
    type: 'note',
    format: ['PDF'],
    isNew: true,
  },
  {
    id: 3,
    title: 'خلاصه مدیریت مالی شخصی',
    author: 'مهندس احمدی',
    category: 'امور مالی',
    categoryKey: 'finance',
    cover: COVER_GRADIENTS[2],
    pages: 48,
    downloads: 6200,
    views: 14500,
    pricing: 'free',
    type: 'summary',
    format: ['PDF'],
    isNew: false,
  },
  {
    id: 4,
    title: 'کتاب تمرین IELTS Writing',
    author: 'استاد کریمی',
    category: 'زبان',
    categoryKey: 'language',
    cover: COVER_GRADIENTS[3],
    pages: 180,
    downloads: 22100,
    views: 51000,
    pricing: 'paid',
    price: 129000,
    type: 'workbook',
    format: ['PDF', 'EPUB'],
    isNew: false,
  },
  {
    id: 5,
    title: 'راهنمای طراحی UI با Figma',
    author: 'سارا حسینی',
    category: 'طراحی',
    categoryKey: 'design',
    cover: COVER_GRADIENTS[4],
    pages: 132,
    downloads: 14300,
    views: 33000,
    pricing: 'paid',
    price: 69000,
    type: 'ebook',
    format: ['PDF'],
    isNew: true,
  },
  {
    id: 6,
    title: 'جزوه استارتاپ و کارآفرینی',
    author: 'دکتر موسوی',
    category: 'کسب‌وکار',
    categoryKey: 'business',
    cover: COVER_GRADIENTS[5],
    pages: 72,
    downloads: 5400,
    views: 12000,
    pricing: 'free',
    type: 'note',
    format: ['PDF'],
    isNew: false,
  },
  {
    id: 7,
    title: 'خلاصه ریاضی مهندسی پیشرفته',
    author: 'دکتر صادقی',
    category: 'ریاضی',
    categoryKey: 'math',
    cover: COVER_GRADIENTS[6],
    pages: 88,
    downloads: 3800,
    views: 8900,
    pricing: 'paid',
    price: 49000,
    type: 'summary',
    format: ['PDF'],
    isNew: false,
  },
  {
    id: 8,
    title: 'کتاب تمرین الگوریتم و ساختار داده',
    author: 'علی محمدی',
    category: 'برنامه‌نویسی',
    categoryKey: 'programming',
    cover: COVER_GRADIENTS[7],
    pages: 204,
    downloads: 4100,
    views: 9600,
    pricing: 'free',
    type: 'workbook',
    format: ['PDF', 'EPUB'],
    isNew: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return n.toLocaleString('fa-IR');
}

// ─── EbookCover ───────────────────────────────────────────────────────────────

function EbookCover({ gradient, type }: { gradient: string; type: EbookType }) {
  const Icon = type === 'ebook' ? BookOpen : FileText;
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3`}
    >
      <Icon size={32} className="text-white/80" />
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-0.5 rounded-full bg-white/40"
            style={{ width: `${20 + i * 8}px` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── EbookCard ────────────────────────────────────────────────────────────────

function EbookCard({ book }: { book: Ebook }) {
  return (
    <article className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      {/* ── Cover ── */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <EbookCover gradient={book.cover} type={book.type} />

        {/* Type badge */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-sm ${TYPE_COLOR[book.type]}`}
        >
          {TYPE_LABEL[book.type]}
        </span>

        {/* New badge */}
        {book.isNew && (
          <span className="absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-500 text-white">
            جدید
          </span>
        )}

        {/* Format chips */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {book.format.map((f) => (
            <span
              key={f}
              className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-white backdrop-blur-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
          {book.category}
        </span>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 flex-1">
          {book.title}
        </h3>

        <p className="text-xs text-gray-400 dark:text-gray-500 leading-none">{book.author}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-1 border-t border-gray-50 dark:border-gray-800/60  text-purple-600 dark:text-purple-500">
          <div className="flex items-center gap-1 text-[11px] ">
            <Download size={11} />
            <span>{formatNumber(book.downloads)}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] ">
            <Eye size={11} className="" />
            <span>{formatNumber(book.views)}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <FileText size={11} />
            <span>{formatNumber(book.pages)} صفحه</span>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-4 flex items-center justify-between gap-2">
        {book.pricing === 'free' ? (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg">
            <Zap size={11} />
            رایگان
          </span>
        ) : (
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {formatNumber(book.price!)} تومان
          </span>
        )}

        <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-200 bg-purple-50 dark:bg-purple-600/50 hover:bg-purple-100 dark:hover:bg-purple-950/30 border border-purple-200 dark:border-purple-950/90 rounded-xl px-3 py-2 transition-colors duration-150">
          <Download size={11} />
          دانلود
        </button>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EbookSlider() {
  const [activeCategory, setActiveCategory] = useState('all');
  const swiperRef = useRef<SwiperType | null>(null);

  const filtered =
    activeCategory === 'all' ? EBOOKS : EBOOKS.filter((b) => b.categoryKey === activeCategory);

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-screen-xl mx-auto px-2">
        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-indigo-500 uppercase mb-2">
              کتابخانه دیجیتال
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              کتاب‌ها و{' '}
              <span className="relative">
                جزوات
                <span className="absolute -bottom-1.5 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/library"
              className="hidden md:inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4"
            >
              مشاهده همه
            </a>
            <div className="hidden md:flex gap-1.5">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                aria-label="قبلی"
              >
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                aria-label="بعدی"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                swiperRef.current?.slideTo(0);
              }}
              className={`flex-shrink-0 text-[12.5px] font-semibold px-4 py-2 rounded-full border transition-all duration-150 ${
                activeCategory === cat.key
                  ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="max-w-screen-xl mx-auto">
        <Swiper
          key={activeCategory}
          modules={[Navigation, FreeMode]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={false}
          grabCursor
          freeMode={{ enabled: true, sticky: false, momentum: true, momentumRatio: 0.6 }}
          className="!px-5 !py-3"
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 12 },
            480: { slidesPerView: 1.6, spaceBetween: 14 },
            640: { slidesPerView: 2.1, spaceBetween: 16 },
            1024: { slidesPerView: 3.1, spaceBetween: 18 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {filtered.map((book) => (
            <SwiperSlide key={book.id} className="h-auto">
              <EbookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
