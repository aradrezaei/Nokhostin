'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Award,
  ArrowLeft,
  Shield,
  Zap,
  Clock,
  Star,
  Terminal,
  Laptop,
  ChevronDown,
  User,
  Phone,
  Send,
  HelpCircle,
  Binary,
  Cpu,
  Braces,
  Boxes,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function CourseStatCard({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}) {
  const { count, ref } = useCounter(value);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center p-6 bg-gray-950/40 border border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-yellow-500/20"
    >
      <div className="mb-4 p-3 rounded-xl bg-yellow-500/5 text-yellow-500 group-hover:scale-110 transition-transform duration-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-yellow-500">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  num,
  title,
  children,
  isOpen,
  onToggle,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-gray-900/10 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-mono text-sm font-bold">
            {num}
          </span>
          <span className="text-base md:text-lg">{title}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] border-t border-gray-100 dark:border-gray-800/50' : 'max-h-0'
        }`}
      >
        <div className="p-6 bg-gray-50/50 dark:bg-gray-900/10 text-gray-500 dark:text-gray-400 text-sm leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function PythonCoursePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (لوکس، پایتونی و تعاملی)
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24">
        {/* گرید پترن اختصاصی با تم زرد ضعیف */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(234,179,8,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,179,8,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* اورب‌های نوری پس‌زمینه */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* سمت راست: محتوا و اطلاعات دوره */}
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                <Binary size={14} /> شروع قدرتمند برنامه‌نویسی و تفکر الگوریتمی
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                ساده، عمیق و اصولی <br />
                با{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-500 to-blue-500 dark:from-yellow-400 dark:to-blue-400">
                  پایتون مقدماتی
                </span>{' '}
                همرنگ شوید
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                محبوب‌ترین زبان برنامه‌نویسی دنیا را بدون نیاز به هیچ دانش قبلی یاد بگیرید. این دوره
                دروازه ورود شما به دنیای{' '}
                <span className="text-gray-900 dark:text-white font-bold">
                  هوش مصنوعی، وب و اتوماسیون
                </span>{' '}
                است که با مدرک رسمی سازمان فنی و حرفه‌ای برگزار می‌شود.
              </p>

              {/* مزایای کلیدی دوره به صورت ساختار یافته */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-400">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      تفکر برنامه‌نویسی
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">درک عمیق منطق کدنویسی</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <Boxes size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      پروژه‌محور و کاربردی
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      پیاده‌سازی مینی‌پروژه‌های واقعی
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="#register"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-yellow-500/10"
                >
                  پیش‌ثبت‌نام و مشاوره رایگان
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </Link>

                <Link
                  href="#syllabus"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-base px-8 py-4 rounded-2xl transition-all duration-150"
                >
                  سرفصل‌های گام‌به‌گام
                </Link>
              </div>
            </div>

            {/* سمت چپ: طراحی خفن و بازی با لوگوی پایتون + جایگاه اختصاصی عکس */}
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
              <div className="relative w-full max-w-[460px] aspect-[4/4] rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800/80 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
                {/* ─── جایگاه اختصاصی تصویر شما ───
                    برای انداختن بنر یا عکس دوره، کافیست خط زیر را فعال کرده و آدرس عکست را بگذاری:
                    <img src="/your-image.png" className="absolute inset-0 w-full h-full object-cover z-20" alt="Python" />
                */}

                {/* هدر باکس ادیتور */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800/80 pb-4 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">main.py</span>
                  <Terminal size={16} className="text-yellow-500" />
                </div>

                {/* بازی انتزاعی و خفن با ساختار لوگوی پایتون (مارهای مدرن هندسی) */}
                <div className="relative flex-1 flex items-center justify-center my-4 z-10">
                  <div className="absolute w-44 h-44 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-full animate-[spin_40s_linear_infinite]" />

                  {/* مار آبی بالا (انتزاعی و شیشه‌ای) */}
                  <div className="absolute translate-y-[-24px] translate-x-[-24px] w-24 h-24 rounded-t-3xl rounded-l-3xl bg-gradient-to-br from-blue-600/80 to-blue-400/80 backdrop-blur-md shadow-lg flex items-center justify-center animate-[bounce_3s_ease-in-out_infinite]">
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* مار زرد پایین (انتزاعی و شیشه‌ای) */}
                  <div className="absolute translate-y-[24px] translate-x-[24px] w-24 h-24 rounded-b-3xl rounded-r-3xl bg-gradient-to-br from-yellow-500/90 to-yellow-400/90 backdrop-blur-md shadow-xl flex items-center justify-center animate-[bounce_3s_ease-in-out_infinite_1.5s]">
                    <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gray-950" />
                  </div>
                </div>

                {/* کامنت راهنما و باکس اطلاعات پایینی */}
                <div className="bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800/80 rounded-2xl p-4 flex items-center justify-between shadow-xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                      <ImageIcon size={18} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-800 dark:text-white">
                        [محل قرارگیری تصویر دوره شما]
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        app/assets/python-hero.png
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-400 font-mono">
                    v3.11
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRID STATS SECTION ─── */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-gray-900/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <CourseStatCard value={80} suffix=" ساعت" label="آموزش کاملاً کارگاهی" icon={Clock} />
            <CourseStatCard value={4} suffix=" پروژۀ" label="هوشمند و کاربردی" icon={Laptop} />
            <CourseStatCard
              value={100}
              suffix="٪"
              label="امکان دریافت مدرک بین‌المللی"
              icon={Award}
            />
            <CourseStatCard value={5} suffix=" از ۵" label="رضایت دوره قبلی" icon={Star} />
          </div>
        </div>
      </section>

      {/* ─── ACCORDION SYLLABUS SECTION (سرفصل‌های دوره مقدماتی) ─── */}
      <section id="syllabus" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
              Syllabus Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              نقشه راه پایتون از صفر مطلق
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              سرفصل‌ها به شکلی چیده شده‌اند که تفکر منطقی برنامه‌نویسی را بدون سردرگمی در ذهن شما
              شکل دهند.
            </p>
          </div>

          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="آشنایی با الگوریتم و سینتکس پایتون"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-3">
                در این بخش یاد می‌گیرید که چطور مثل یک مهندس نرم‌افزار فکر کنید و اولین خط کدهای خود
                را بنویسید.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>مفهوم الگوریتم، متغیرها (Variables) و قوانین نام‌گذاری</li>
                <li>آشنایی با ساختار داده‌های اولیه (Strings, Integers, Floats)</li>
                <li>کار با ابزارهای ورودی و خروجی (input و print)</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۲"
              title="ساختارهای شرطی و حلقه‌های تکرار (Control Flow)"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-3">
                هوشمند کردن برنامه‌ها؛ چگونگی تصمیم‌گیری کدها بر اساس شرایط مختلف و تکرار فرآیندها.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>ساختارهای تصمیم‌گیری (if, elif, else) و عملگرهای منطقی</li>
                <li>حلقه‌های تکرار قدرتمند for و while برای پردازش داده‌ها</li>
                <li>کنترل کدهای درون حلقه با دستورات break و continue</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۳"
              title="ساختارهای داده پیشرفته (Collections)"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-3">
                آشنایی با روش‌های نگهداری پیچیده و انبوه داده‌ها در پایتون به صورت بهینه.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>کار با لیست‌ها (Lists) و متدهای مدیریت آرایه‌ها</li>
                <li>شناخت تاپل‌ها (Tuples) و مجموعه‌ها (Sets)</li>
                <li>دیکشنری‌ها (Dictionaries) و ساختار کلید/مقدار برای ذخیره‌سازی اطلاعات</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۴"
              title="توابع، ماژول‌ها و پیاده‌سازی پروژه پایانی"
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <p className="mb-3">
                توسعه کدهای تمیز، ماژولار و با قابلیت استفاده مجدد به همراه توسعه یک پروژه واقعی
                بازار کار.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>تعریف توابع اختصاصی (def)، آرگومان‌ها و مقادیر بازگشتی</li>
                <li>کار با کتابخانه‌های داخلی پایتون (مثل math و random)</li>
                <li>پروژه نهایی: پیاده‌سازی کامل یک سیستم مدیریت اطلاعات یا وب‌اسکرپر ساده</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATION DETAIL SECTION (بخش مدرک لوکس سازمان فنی و حرفه‌ای) ─── */}
      <section className="py-24 bg-gray-50/40 dark:bg-gray-900/10 border-t border-gray-100 dark:border-gray-900/60">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-gray-150 dark:border-gray-800/80 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 text-right space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                  Official Technical Degree
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  اعتبار رسمی و بین‌المللی <br />
                  <span className="text-yellow-500">سازمان فنی و حرفه‌ای کشور</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-7 font-medium">
                  پس از پایان دوره پایتون مقدماتی، شما به آزمون‌های رسمی هدایت می‌شوید. گواهی‌نامه
                  مهارت صادر شده دارای کد معتبر بین‌المللی است که در تمامی کشورهای عضو سازمان جهانی
                  کار (ILO) به عنوان سابقه تخصصی پذیرفته می‌شود.
                </p>
                <div className="space-y-4 pt-2">
                  {[
                    'امکان ترجمه رسمی دادگستری برای رزومه‌های مهاجرتی',
                    'دریافت وام‌های خوداشتغالی و تاسیس شرکت‌های فناور',
                    'تاییدیه رسمی مهارت برنامه‌نویسی پایتون درجه ۱',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-850 dark:text-gray-300"
                    >
                      <CheckCircle2 size={18} className="text-yellow-500 flex-shrink-0" />
                      <span className="font-bold text-sm md:text-base">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* کارت نمایشی مدرک لوکس پایتون */}
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-[440px] aspect-[1.4/1] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-right">
                      <h4 className="text-xs font-black text-gray-900 dark:text-white">
                        وزارت تعاون، کار و رفاه اجتماعی
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        سازمان آموزش فنی و حرفه‌ای کشور
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                  </div>

                  <div className="my-4">
                    <span className="text-[9px] text-yellow-500 font-bold tracking-widest block uppercase">
                      Python Programmer Degree
                    </span>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mt-1">
                      برنامه‌نویس پایتون (مقدماتی و الگوریتم)
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Standard ID: PY-311-BASIC
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-150 dark:border-gray-800/80 pt-4">
                    <div className="text-right">
                      <span className="text-[9px] text-gray-400 block">ارزش سند</span>
                      <span className="text-xs font-bold text-emerald-500">
                        بین‌المللی و قابل ترجمه رسمی
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                      <HelpCircle size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM & CALL TO ACTION SECTION (فرم درخواست) ─── */}
      <section id="register" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
              <div className="inline-block px-3 py-1 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                Seat Reservation
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
                رزرو صندلی مشاوره رایگان دوره
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                مشخصات خود را وارد کنید؛ مشاوران آکادمی نخستین در کمتر از ۲۴ ساعت جهت پاسخگویی به
                سوالات و نحوه حضور در دوره با شما تماس خواهند گرفت.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">نام و نام خانوادگی</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: آرد رضایی"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-yellow-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
                      required
                    />
                    <User
                      size={16}
                      className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">شماره تماس (همراه)</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-yellow-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
                      required
                    />
                    <Phone
                      size={16}
                      className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">
                    شیوه برگزاری مد نظر
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-yellow-500 text-gray-900 dark:text-white font-medium text-sm ps-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none nk-select pe-11"
                      required
                    >
                      <option value="" disabled selected>
                        انتخاب روش برگزاری کلاس...
                      </option>
                      <option value="in-person">حضوری (کارگاه مجهز تهران)</option>
                      <option value="online">آنلاین (پخش زنده استودیویی)</option>
                      <option value="consult">نیاز به دریافت مشاوره تلفنی</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="text-gray-400 absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ثبت نهایی و رزرو دوره پایتون</span>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
