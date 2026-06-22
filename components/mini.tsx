'use client';

import React, { useState, useEffect } from 'react';
import {
  Code,
  BookOpen,
  PlayCircle,
  Calendar,
  Award,
  Check,
  X,
  ChevronDown,
  User,
  Star,
  MessageSquare,
} from 'lucide-react';

// ─── TYPES & INTERFACES ────────────────────────────────────────────────────────
interface CourseData {
  title: string;
  image: string;
  stats: {
    exercises: string;
    lessons: string;
    videos: string;
    deadline: string;
    certificate: boolean;
  };
  price: string;
  description: React.ReactNode;
  audience: string[];
  prerequisites: {
    needed: string[];
    notNeeded: string[];
  };
  syllabus: {
    chapter: string;
    lessonCount: number;
    videoCount: number;
    exerciseCount: number;
    items: string[];
  }[];
  instructor: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  reviews: {
    name: string;
    text: string;
    rating: number;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

// ─── ACCORDION COMPONENT ───────────────────────────────────────────────────────
const Accordion = ({ title, meta, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-800 rounded-xl mb-3 overflow-hidden bg-[#1A202C] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-[#1e2532] hover:bg-[#252d3d] transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4 text-right">
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
          <span className="font-bold text-slate-200">{title}</span>
        </div>
        {meta && (
          <div className="hidden sm:flex text-xs font-medium text-slate-400 gap-3" dir="ltr">
            {meta}
          </div>
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 border-t border-slate-800 text-sm text-slate-300 leading-7">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COURSE COMPONENT ─────────────────────────────────────────────────────
export default function MinimalCourseLanding({ data }: { data?: CourseData }) {
  // دیتای پیش‌فرض (Mock Data) برای نمایش ساختار در صورت پاس ندادن دیتا
  const course = data || {
    title: 'برنامه‌نویسی پایتون مقدماتی تا پیشرفته',
    image: '/api/placeholder/400/250',
    stats: {
      exercises: '+۱۰۵ تمرین عملی',
      lessons: '+۱۱۰ درسنامه آموزشی',
      videos: '+۵۰ ویدیو آموزشی',
      deadline: '۹۰ روز مهلت ارسال تمرین',
      certificate: true,
    },
    price: '۲,۵۰۰,۰۰۰',
    description: (
      <>
        <p className="mb-4 text-justify">
          دنیای امروز ما، تسلط به برنامه‌نویسی به یک «باید» تبدیل شده. به زبان خودمانی، برنامه‌نویسی
          یعنی امر کردن یک‌سری دستور به یک کامپیوتر. زبان پایتون، یک زبان پرکاربرد در دنیای امروز
          است. سادگی یادگیری این زبان موجب استقبال زیاد کاربران شده و از این رو این زبان برای شروع
          یادگیری برنامه‌نویسی مناسب است.
        </p>
        <p className="text-justify">
          در این مسیر، استانداردهای کدنویسی تمیز و ساختارهای پایه‌ای را به شکلی اصولی و مهندسی‌شده
          فرا خواهید گرفت.
        </p>
      </>
    ),
    audience: [
      'مشتاقید به بازار پردرآمد برنامه‌نویسی و حوزه‌ی نرم‌افزار وارد شده و آینده‌ی شغلی خود را رقم بزنید.',
      'برای پروژه‌های شخصی، دانشگاهی و یا کاری خود نیاز به یادگیری سریع زبان پایتون دارید.',
      'می‌خواهید دروس برنامه‌نویسی دانشگاه را با نمره‌ی عالی پشت سر بگذارید.',
      'می‌خواهید پایتون را به صورت عملی و یکبار برای همیشه به شکل اصولی بیاموزید.',
    ],
    prerequisites: {
      needed: ['علاقه و پشتکار داشته باشید.'],
      notNeeded: [
        'پیش‌زمینه‌ی برنامه‌نویسی داشته باشید.',
        'در رشته‌ی کامپیوتر تحصیل کرده باشید.',
        'دانش ریاضی قوی داشته باشید.',
      ],
    },
    syllabus: [
      {
        chapter: 'مقدمه و نصب ابزارها',
        lessonCount: 7,
        videoCount: 6,
        exerciseCount: 1,
        items: ['معرفی پایتون', 'نصب و راه‌اندازی', 'اولین برنامه شما'],
      },
      {
        chapter: 'ورودی، خروجی و متغیرها',
        lessonCount: 18,
        videoCount: 8,
        exerciseCount: 7,
        items: ['انواع داده', 'تعریف متغیر', 'گرفتن ورودی از کاربر'],
      },
      {
        chapter: 'عملگرهای ریاضی و منطقی',
        lessonCount: 10,
        videoCount: 6,
        exerciseCount: 9,
        items: ['عملگرهای حسابی', 'عملگرهای مقایسه‌ای', 'اولویت عملگرها'],
      },
    ],
    instructor: {
      name: 'مهندس ارشد سیستم',
      role: 'CTO آکادمی نخستین و لید فنی X Belt',
      bio: 'با سال‌ها تجربه در توسعه سیستم‌های مقیاس‌پذیر و آموزش صدها توسعه‌دهنده. هدف من در این دوره، انتقال مستقیم تجربیات واقعی بازار کار به شماست تا مفاهیم را به صورت مهندسی‌شده درک کنید.',
      avatar: '/api/placeholder/100/100',
    },
    reviews: [
      {
        name: 'علی رضایی',
        text: 'دوره به شدت کاربردی بود و تمرین‌ها باعث شد مفاهیم کاملاً جا بیفته.',
        rating: 5,
      },
      {
        name: 'سارا احمدی',
        text: 'بهترین انتخاب برای شروع برنامه‌نویسی. پشتیبانی عالی بود.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'مهلت ثبت‌نام در این دوره تا چه زمانی است؟',
        answer:
          'شما در هر زمانی می‌توانید در این دوره ثبت‌نام کنید و به محتوای آن دسترسی داشته باشید.',
      },
      {
        question: 'پیش‌نیاز شرکت در دوره چیست؟',
        answer: 'این دوره از صفر مطلق طراحی شده و نیاز به هیچ پیش‌زمینه‌ای ندارد.',
      },
      {
        question: 'آیا محتوای دوره به صورت یکجا در اختیارم قرار می‌گیرد؟',
        answer: 'بله، پس از ثبت‌نام به تمامی ویدیوها و تمرین‌ها دسترسی خواهید داشت.',
      },
    ],
  };

  const [activeTab, setActiveTab] = useState('intro');

  // ناوبری نرم برای اسکرول
  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'intro', label: 'معرفی' },
    { id: 'audience', label: 'مخاطبین' },
    { id: 'prerequisites', label: 'پیش‌نیازها' },
    { id: 'syllabus', label: 'سرفصل‌ها' },
    { id: 'instructor', label: 'اساتید' },
    { id: 'reviews', label: 'نظرات' },
    { id: 'faq', label: 'سوالات متداول' },
  ];

  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-200 font-sans" dir="rtl">
      {/* ─── STICKY NAVBAR ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4 text-sm font-bold text-slate-400">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                    activeTab === item.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ─── MAIN LAYOUT GRID ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ─── RIGHT CONTENT (MAIN) ─── 8 Cols ────────────────────── */}
        <div className="lg:col-span-8 space-y-16 order-2 lg:order-1">
          {/* معرفی دوره */}
          <section id="intro" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-white mb-6">معرفی دوره</h2>
            <div className="text-slate-400 leading-8 font-medium">{course.description}</div>
          </section>

          {/* ─── آنچه در این دوره می‌آموزید ─── */}
          <section id="what-you-learn" className="scroll-mt-24 pt-8">
            <h2 className="text-2xl font-black text-white mb-8">آنچه در این دوره می‌آموزید</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'نصب و پیکربندی محیط توسعه لاراول و لایوورایر',
                'طراحی و ایجاد دیتابیس فروشگاه به صورت اصولی',
                'کار با Livewire برای ساخت صفحات داینامیک بدون رفرش',
                'آشنایی با ساختار پروژه و معماری MVC در لاراول',
                'پیاده‌سازی پنل مدیریت (مدیریت محصولات، دسته‌بندی‌ها، سفارشات و کاربران)',
                'ایجاد سبد خرید حرفه‌ای و سیستم مدیریت سفارشات',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-[#1A202C] border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* این دوره مناسب شما است اگر... */}
          <section id="audience" className="scroll-mt-24">
            <h2 className="text-xl font-black text-white mb-6">این دوره مناسب شما است اگر...</h2>
            <ul className="space-y-6">
              {course.audience.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  {/* آیکون */}
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  {/* متن بدون پس‌زمینه و کارد */}
                  <span className="text-sm font-medium text-slate-300 leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* پیش‌نیازها */}
          <section id="prerequisites" className="scroll-mt-24 pt-8 border-t border-slate-800/60">
            <h2 className="text-2xl font-black text-white mb-8">پیش‌نیازها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* لازم نیست */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-400 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  لازم نیست...
                </h3>
                <ul className="space-y-4">
                  {course.prerequisites.notNeeded.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm font-medium text-slate-400"
                    >
                      <X className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* لازم است */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  لازم است...
                </h3>
                <ul className="space-y-4">
                  {course.prerequisites.needed.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm font-medium text-slate-200"
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* سرفصل‌های دوره */}
          <section id="syllabus" className="scroll-mt-24 pt-8 border-t border-slate-800/60">
            <h2 className="text-2xl font-black text-white mb-6">سرفصل‌های دوره</h2>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 bg-[#1e2532] px-5 py-3 rounded-xl border border-slate-800/50">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> ۱۱۲ درسنامه
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" /> ۵۳ ویدیو
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Code className="w-4 h-4" /> ۱۰۹ تمرین
              </span>
            </div>

            <div className="space-y-1">
              {course.syllabus.map((ch, idx) => (
                <Accordion
                  key={idx}
                  title={ch.chapter}
                  meta={
                    <>
                      <span>{ch.lessonCount} درسنامه</span> •<span>{ch.videoCount} ویدیو</span> •
                      <span>{ch.exerciseCount} تمرین</span>
                    </>
                  }
                >
                  <ul className="list-disc list-inside space-y-2 pr-2">
                    {ch.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>
          </section>

          {/* اساتید */}
          <section id="instructor" className="scroll-mt-24 pt-8 border-t border-slate-800/60">
            <h2 className="text-2xl font-black text-white mb-6">اساتید</h2>
            <div className="bg-[#1A202C] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-right">
              <img
                src={course.instructor.avatar}
                alt="مدرس"
                className="w-24 h-24 rounded-2xl object-cover bg-slate-800 border border-slate-700"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{course.instructor.name}</h3>
                <p className="text-xs font-bold text-cyan-400">{course.instructor.role}</p>
                <p className="text-sm text-slate-400 leading-7 font-medium pt-2 max-w-2xl">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </section>

          {/* نظرات کاربران */}
          <section id="reviews" className="scroll-mt-24 pt-8 border-t border-slate-800/60">
            <h2 className="text-2xl font-black text-white mb-6">نظرات کاربران</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-[#1A202C] border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{review.name}</h4>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-6 font-medium">«{review.text}»</p>
                </div>
              ))}
            </div>
          </section>

          {/* مستطیل ساده قیمت (Action Bar) */}
          <section id="price" className="scroll-mt-24 pt-8 border-t border-slate-800/60">
            <div className="bg-gradient-to-r from-[#1A202C] to-[#1e2532] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
              <div className="text-right w-full md:w-auto">
                <p className="text-sm font-bold text-slate-400 mb-1">
                  سرمایه‌گذاری شما برای این دوره
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{course.price}</span>
                  <span className="text-sm text-slate-500 font-bold">تومان</span>
                </div>
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                ثبت‌نام و شروع یادگیری
              </button>
            </div>
          </section>

          {/* سوالات متداول */}
          <section id="faq" className="scroll-mt-24 pt-8 border-t border-slate-800/60 pb-20">
            <h2 className="text-2xl font-black text-white mb-6 text-center">سوالات متداول</h2>
            <div className="max-w-3xl mx-auto space-y-1">
              {course.faqs.map((faq, idx) => (
                <Accordion key={idx} title={faq.question}>
                  <p className="text-slate-400 leading-7 font-medium">{faq.answer}</p>
                </Accordion>
              ))}
            </div>
          </section>
        </div>

        {/* ─── LEFT SIDEBAR (STICKY CONTENT) ─── 4 Cols ───────────────── */}
        <aside className="lg:col-span-4 order-1 lg:order-2">
          <div className="sticky top-24">
            {/* کارت مشخصات دوره */}
            <div className="bg-[#161C2D] border border-slate-800 rounded-[1.5rem] overflow-hidden shadow-2xl">
              {/* کاور دوره */}
              <div className="w-full aspect-video bg-slate-900 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161C2D] to-transparent"></div>
              </div>

              <div className="p-6 text-right">
                <h1 className="text-lg font-black text-white mb-6 leading-8">{course.title}</h1>

                {/* ویژگی‌ها / پتانسیل‌ها */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center justify-between text-sm font-bold text-slate-300">
                    <div className="flex items-center gap-3">
                      <Code className="w-4 h-4 text-slate-500" />
                      <span>{course.stats.exercises}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between text-sm font-bold text-slate-300">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span>{course.stats.lessons}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between text-sm font-bold text-slate-300">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-4 h-4 text-slate-500" />
                      <span>{course.stats.videos}</span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between text-sm font-bold text-slate-300">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>{course.stats.deadline}</span>
                    </div>
                  </li>
                  {course.stats.certificate && (
                    <li className="flex items-center justify-between text-sm font-bold text-slate-300">
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 pl-0.5 text-slate-500" />
                        <span>گواهی معتبر</span>
                      </div>
                      <Check className="w-4 h-4 text-emerald-500" />
                    </li>
                  )}
                </ul>

                {/* دکمه اصلی خرید (Primary CTA) */}
                <button className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-sm font-black rounded-xl transition-colors shadow-lg shadow-cyan-500/10 active:scale-[0.98]">
                  خرید دوره
                </button>
              </div>
            </div>

            {/* نشان‌واره چت پشتیبانی کوچک (Decorative) */}
            <div className="mt-6 flex justify-start">
              <button className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform text-slate-900">
                <MessageSquare className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
