'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import 'swiper/css';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  initials: string;
  avatarColor: string;
  rating: number;
  course: string;
  quote: string;
  outcome: string;
  outcomeLabel: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'اراد رضایی',
    role: 'توسعه‌دهنده فرانت‌اند',
    company: '۱۵ ساله',
    avatar: '',
    initials: 'سم',
    avatarColor: 'bg-violet-100 text-violet-700',
    rating: 5,
    course: 'React.js پیشرفته',
    quote:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempora veritatis laboriosam laborum ut deleniti ipsum magnam, id distinctio quas voluptas! Placeat deserunt vitae, assumenda tempore quas itaque laborum ipsam.',
    outcome: '+۸۵٪',
    outcomeLabel: 'افزایش درآمد',
  },
  {
    id: 2,
    name: 'امیرحسین رضایی',
    role: 'داده‌کاو ارشد',
    company: 'اسنپ',
    avatar: '',
    initials: 'ار',
    avatarColor: 'bg-sky-100 text-sky-700',
    rating: 5,
    course: 'یادگیری ماشین با TensorFlow',
    quote:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempora veritatis laboriosam laborum ut deleniti ipsum magnam, id distinctio quas voluptas! Placeat deserunt vitae, assumenda tempore quas itaque laborum ipsam.',
    outcome: '۶ ماه',
    outcomeLabel: 'تا استخدام',
  },
  {
    id: 3,
    name: 'نیلوفر رضایی',
    role: 'طراح UI/UX',
    company: 'فریلنسر',
    avatar: '',
    initials: 'نک',
    avatarColor: 'bg-rose-100 text-rose-700',
    rating: 5,
    course: 'Figma برای طراحان UI',
    quote:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempora veritatis laboriosam laborum ut deleniti ipsum magnam, id distinctio quas voluptas! Placeat deserunt vitae, assumenda tempore quas itaque laborum ipsam.',
    outcome: '۳ پروژه',
    outcomeLabel: 'ماهانه',
  },
  {
    id: 4,
    name: 'محمد صادقی',
    role: 'مدیر محصول',
    company: 'تپسی',
    avatar: '',
    initials: 'مص',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    rating: 5,
    course: 'مدیریت مالی شخصی',
    quote:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis tempora veritatis laboriosam laborum ut deleniti ipsum magnam, id distinctio quas voluptas! Placeat deserunt vitae, assumenda tempore quas itaque laborum ipsam.',
    outcome: '۸ ماه',
    outcomeLabel: 'رسیدن به هدف',
  },
  {
    id: 5,
    name: 'فاطمه احمدی',
    role: 'مهندس نرم‌افزار',
    company: 'مایکروسافت',
    avatar: '',
    initials: 'فا',
    avatarColor: 'bg-amber-100 text-amber-700',
    rating: 5,
    course: 'آموزش جامع پایتون',
    quote:
      'با این دوره برای مصاحبه مایکروسافت آماده شدم. ساختار دوره خیلی هوشمندانه طراحی شده — از پایه تا مسائل پیچیده الگوریتمی. بهترین سرمایه‌گذاری عمرم.',
    outcome: 'مایکروسافت',
    outcomeLabel: 'محل کار فعلی',
  },
  {
    id: 6,
    name: 'رضا موسوی',
    role: 'معلم موسیقی',
    company: 'آموزشگاه سپهر',
    avatar: '',
    initials: 'رم',
    avatarColor: 'bg-indigo-100 text-indigo-700',
    rating: 4,
    course: 'گیتار از صفر تا صد',
    quote:
      'به عنوان کسی که هیچ پس‌زمینه‌ای در نوازندگی نداشتم، این دوره معجزه کرد. بعد از یک سال، الان خودم تدریس می‌کنم. استاد با عشق درس می‌ده و این فرق می‌کنه.',
    outcome: '۱ سال',
    outcomeLabel: 'تا تدریس',
  },
];

// ─── Stars ─────────────────────────────────────────────────────────────────────

// ─── TestimonialCard ────────────────────────────────────────────────────────────

function TestimonialCard({ t, active }: { t: Testimonial; active: boolean }) {
  return (
    <article
      className="
        relative flex flex-col h-full bg-white dark:bg-gray-900
        border rounded-2xl overflow-hidden
        transition-all duration-500 border-gray-100 dark:border-gray-800"
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full transition-all duration-500" />

      <div className="flex flex-col flex-1 p-6 gap-5">
        {/* Quote icon + stars */}
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-200 dark:bg-purple-700/50 flex items-center justify-center">
            <Quote size={16} />
          </div>
        </div>

        {/* Quote text */}
        <blockquote className="flex-1 text-sm text-gray-600 dark:text-gray-400 leading-7 font-medium">
          «{t.quote}»
        </blockquote>

        {/* Course tag */}
        <div className="inline-flex self-start items-center gap-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full">
          <svg
            viewBox="0 0 14 14"
            className="w-3 h-3 text-indigo-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 1L13 4v6L7 13 1 10V4L7 1Z" />
            <path d="M7 1v12M1 4l6 3 6-3" />
          </svg>
          {t.course}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-50 dark:bg-gray-800" />

        {/* Footer: avatar + outcome */}
        <div className="flex items-center justify-between gap-3">
          {/* Person */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${t.avatarColor}`}
            >
              {t.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                {t.name}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function TestimonialsSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
              دانشجویان ما
              <br />
              <span className="relative">
                چه میــگویند؟
                <span className="absolute -bottom-1 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
              </span>
            </h2>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-7 max-w-sm">
              هزاران نفر مسیر حرفه‌ای خود را با دوره‌های ما متحول کرده‌اند. اینجا بخشی از تجربه‌های
              واقعی‌شان را بخوانید.
            </p>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:hover:border-gray-700 dark:hover:text-white transition-all"
                aria-label="قبلی"
              >
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:hover:border-gray-700 dark:hover:text-white transition-all"
                aria-label="بعدی"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="max-w-screen-xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          loop
          grabCursor
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          className="!px-5 !py-4"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 14 },
            640: { slidesPerView: 1.8, spaceBetween: 16 },
            1024: { slidesPerView: 2.5, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 22 },
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={t.id} className="!h-[350px]">
              <TestimonialCard t={t} active={i === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* ── Progress dots ── */}
      <div className="flex justify-center gap-1.5 ">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-gray-200 dark:bg-gray-700'
            }`}
            aria-label={`رفتن به اسلاید ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
