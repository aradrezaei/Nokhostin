'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight, Clock, Users, Star, Award, Zap } from 'lucide-react';
import 'swiper/css';

// ─── Types ────────────────────────────────────────────────────────────────────

type PricingType = 'free' | 'discount' | 'paid';

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  categoryKey: string;
  image: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  hours: number;
  pricing: PricingType;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  hasCertificate: boolean;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته';
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'all', label: 'همه دوره‌ها' },
  { key: 'programming', label: 'برنامه‌نویسی' },
  { key: 'ai', label: 'هوش مصنوعی' },
  { key: 'finance', label: 'امور مالی' },
  { key: 'accounting', label: 'حسابداری' },
  { key: 'language', label: 'زبان' },
  { key: 'music', label: 'موسیقی' },
  { key: 'robotics', label: 'رباتیک' },
  { key: 'design', label: 'طراحی' },
];

const COURSES: Course[] = [
  {
    id: 1,
    title: 'آموزش جامع پایتون ۱۴۰۳',
    instructor: 'جادی میرمیرانی',
    category: 'برنامه‌نویسی',
    categoryKey: 'programming',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.9,
    reviewCount: 3820,
    studentCount: 18400,
    hours: 42,
    pricing: 'discount',
    price: 490000,
    originalPrice: 690000,
    discountPercent: 29,
    hasCertificate: true,
    level: 'مقدماتی',
  },
  {
    id: 2,
    title: 'یادگیری ماشین با TensorFlow',
    instructor: 'دکتر رضایی',
    category: 'هوش مصنوعی',
    categoryKey: 'ai',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.8,
    reviewCount: 2140,
    studentCount: 9700,
    hours: 38,
    pricing: 'paid',
    price: 590000,
    hasCertificate: true,
    level: 'پیشرفته',
  },
  {
    id: 3,
    title: 'مدیریت مالی شخصی',
    instructor: 'مهندس احمدی',
    category: 'امور مالی',
    categoryKey: 'finance',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.7,
    reviewCount: 1580,
    studentCount: 6200,
    hours: 24,
    pricing: 'free',
    hasCertificate: false,
    level: 'مقدماتی',
  },
  {
    id: 4,
    title: 'آموزش زبان انگلیسی IELTS',
    instructor: 'استاد کریمی',
    category: 'زبان',
    categoryKey: 'language',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.9,
    reviewCount: 4210,
    studentCount: 22100,
    hours: 56,
    pricing: 'discount',
    price: 750000,
    originalPrice: 950000,
    discountPercent: 21,
    hasCertificate: true,
    level: 'متوسط',
  },
  {
    id: 5,
    title: 'React.js پیشرفته ۲۰۲۴',
    instructor: 'علی محمدی',
    category: 'برنامه‌نویسی',
    categoryKey: 'programming',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.8,
    reviewCount: 2970,
    studentCount: 14300,
    hours: 35,
    pricing: 'paid',
    price: 520000,
    hasCertificate: true,
    level: 'پیشرفته',
  },
  {
    id: 6,
    title: 'گیتار از صفر تا صد',
    instructor: 'استاد رستمی',
    category: 'موسیقی',
    categoryKey: 'music',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.6,
    reviewCount: 1120,
    studentCount: 5400,
    hours: 28,
    pricing: 'discount',
    price: 380000,
    originalPrice: 480000,
    discountPercent: 21,
    hasCertificate: false,
    level: 'مقدماتی',
  },
  {
    id: 7,
    title: 'رباتیک با Arduino',
    instructor: 'دکتر صادقی',
    category: 'رباتیک',
    categoryKey: 'robotics',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.7,
    reviewCount: 890,
    studentCount: 3800,
    hours: 30,
    pricing: 'paid',
    price: 450000,
    hasCertificate: true,
    level: 'متوسط',
  },
  {
    id: 8,
    title: 'حسابداری مالی ۱۴۰۳',
    instructor: 'مهندس نوری',
    category: 'حسابداری',
    categoryKey: 'accounting',
    image:
      'https://media1.maktabkhooneh.org/CACHE/images/courses/images/Python-Jadi-2_1403-12-13-113008363/3b93e9d629dc333cc648387a996d35db.webp?expire=4893471932&token=94fb7de009a85c6b8a27e6bce14262e9&md5=lPt94AmoXGuKJ-a84UJi6Q==',
    rating: 4.5,
    reviewCount: 760,
    studentCount: 4100,
    hours: 22,
    pricing: 'free',
    hasCertificate: false,
    level: 'مقدماتی',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return n.toLocaleString('fa-IR');
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg key={i} viewBox="0 0 14 14" className="w-3 h-3 flex-shrink-0" fill="none">
            {half && (
              <defs>
                <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#D1D5DB" />
                  <stop offset="50%" stopColor="#D97706" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M7 1L8.854 4.764L13 5.382L10 8.3L10.708 12.5L7 10.5L3.292 12.5L4 8.3L1 5.382L5.146 4.764L7 1Z"
              fill={filled ? '#D97706' : half ? `url(#half-${i})` : '#E5E7EB'}
            />
          </svg>
        );
      })}
    </div>
  );
}

// ─── RatingCircle ─────────────────────────────────────────────────────────────

// function RatingCircle({ rating }: { rating: number }) {
//   const radius = 16;
//   const circumference = 2 * Math.PI * radius;
//   const progress = (rating / 5) * circumference;
//   const color = rating >= 4.7 ? '#059669' : rating >= 4.3 ? '#D97706' : '#6B7280';

//   return (
//     <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
//       <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
//         <circle cx="20" cy="20" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="3" />
//         <circle
//           cx="20"
//           cy="20"
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth="3"
//           strokeDasharray={`${progress} ${circumference}`}
//           strokeLinecap="round"
//         />
//       </svg>
//       <span className="absolute text-[11px] font-bold" style={{ color }}>
//         {rating.toFixed(1)}
//       </span>
//     </div>
//   );
// }

// ─── PriceBadge ───────────────────────────────────────────────────────────────

function PriceBadge({ course }: { course: Course }) {
  if (course.pricing === 'free') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg">
          <Zap size={11} />
          رایگان
        </span>
      </div>
    );
  }

  if (course.pricing === 'discount') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md leading-none">
          {course.discountPercent}٪
        </span>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10px] text-gray-400 line-through leading-none">
            {formatNumber(course.originalPrice!)} تومان
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
            {formatNumber(course.price!)} تومان
          </span>
        </div>
      </div>
    );
  }

  return (
    <span className="text-sm font-bold text-gray-900 dark:text-white">
      {formatNumber(course.price!)} تومان
    </span>
  );
}

// ─── CourseCard ───────────────────────────────────────────────────────────────

function CourseCard({ course }: { course: Course }) {
  const levelColor: Record<string, string> = {
    مقدماتی: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300',
    متوسط: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300',
    پیشرفته:
      'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300',
  };

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      {/* ── Thumbnail ── */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Top-right: level badge */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-sm ${levelColor[course.level]}`}
        >
          {course.level}
        </span>

        {/* Top-left: certificate badge */}
        {course.hasCertificate && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/60">
            <Award size={10} />
            گواهی‌نامه
          </span>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category */}
        <div className="flex items-center justify-between gap-4">
          {' '}
          {/* 1. کانتینر اصلی برای قرار دادن دسته بندی و بلوک امتیاز در دو طرف */}
          {/* سمت چپ: دسته بندی */}
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">
            {course.category}
          </span>
          {/* سمت راست: بلوک امتیاز و تعداد نظر */}
          <div className="flex items-center gap-2">
            {' '}
            {/* 2. کانتینر برای امتیاز (عدد + ستاره) و تعداد نظر */}
            {/* بخش امتیاز: عدد + ستاره ها */}
            <div className="flex items-center gap-1.5">
              {' '}
              {/* 3. کانتینر برای عدد امتیاز و ستاره ها */}
              <StarRating rating={course.rating} /> {/* 5. کامپوننت ستاره ها */}
            </div>
          </div>
        </div>
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 flex-1">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-none">{course.instructor}</p>

        {/* Rating row */}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-1 border-t border-gray-50 dark:border-gray-800/60">
          <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
            <Users size={11} className="text-indigo-400" />
            <span>{formatNumber(course.studentCount)}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
            <Clock size={11} className="text-indigo-400" />
            <span>{course.hours} ساعت</span>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-4 flex items-center justify-between gap-2">
        <PriceBadge course={course} />
        <button className="flex-shrink-0 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 rounded-xl px-3 py-2 transition-colors duration-150">
          ثبت‌نام
        </button>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CourseSlider() {
  const [activeCategory, setActiveCategory] = useState('all');
  const swiperRef = useRef<SwiperType | null>(null);

  const filtered =
    activeCategory === 'all' ? COURSES : COURSES.filter((c) => c.categoryKey === activeCategory);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-screen-xl mx-auto px-2">
        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              محبوب‌ترین{' '}
              <span className="relative">
                دوره‌ها
                <span className="absolute -bottom-1.5 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/courses"
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
        <div className="flex gap-2 overflow-x-auto max-w-screen-xl pb-4 mb-6 no-scrollbar">
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
          {filtered.map((course) => (
            <SwiperSlide key={course.id} className="h-auto">
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
