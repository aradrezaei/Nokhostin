'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Award,
  ArrowLeft,
  Shield,
  Target,
  Zap,
  Clock,
  Star,
  Code2,
  CheckCircle,
  Video,
  MapPin,
  Laptop,
  Terminal,
  Layers,
  ChevronDown,
  User,
  Phone,
  Send,
  HelpCircle,
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
      className="group relative flex flex-col items-center p-6 bg-gray-900/10 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800/60 rounded-2xl text-center transition-all duration-300 hover:border-purple-500/30"
    >
      <div className="mb-4 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-purple-600 dark:text-purple-500">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
        {label}
      </p>
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
    <div className="bg-white dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono text-sm font-bold">
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
export default function HTMLCSSCoursePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  return (
    <main className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950" dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (دگرگون شده و ساختار یافته)
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white dark:bg-gray-950">
        {/* گرید پترن پس‌زمینه برای حفظ اصالت تم شما */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* سمت راست: جزئیات متنی و عنوان اصلی */}
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 text-xs font-bold">
                <Zap size={14} /> دوره جامع و فوق‌تخصصی پیاده‌سازی رابط کاربری
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                کدنویسی استاندارد را <br />
                از{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400">
                  ریشه و پایه
                </span>{' '}
                آغاز کنید
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                بنیانِ وب فرانت‌اند را اصولی یاد بگیرید. این دوره به صورت هم‌زمان{' '}
                <span className="text-gray-900 dark:text-white font-bold">حضوری (کارگاهی)</span> و{' '}
                <span class="text-gray-900 dark:text-white font-bold">آنلاین (استریم زنده)</span>{' '}
                برگزار شده و در نهایت منجر به صدور{' '}
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  مدرک رسمی سازمان فنی و حرفه‌ای کشور
                </span>{' '}
                با قابلیت ترجمه بین‌المللی می‌گردد.
              </p>

              {/* نشانگرهای سریع نحوه برگزاری */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white text-sm">برگزاری حضوری</h4>
                    <p class="text-[11px] text-gray-400 mt-0.5">سایت‌های مجهز آکادمی</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Video size={18} />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white text-sm">برگزاری آنلاین</h4>
                    <p class="text-[11px] text-gray-400 mt-0.5">پخش زنده و آرشیو ابدی</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="#register"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-purple-600/10"
                >
                  رزرو صندلی و پیش‌ثبت‌نام
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </Link>

                <Link
                  href="#syllabus"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-base px-8 py-4 rounded-2xl transition-all duration-150"
                >
                  مشاهده دقیق سرفصل‌ها
                </Link>
              </div>
            </div>

            {/* سمت چپ: باکس تعاملی نگهدارنده تصویر دوره */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-[4/3.5] rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl overflow-hidden flex flex-col justify-between group">
                {/* ─── جایگاه قرارگیری تصویر شما ───
                    کافیست در آینده تگ <img /> خود را فعال کنید و کلاس absolute بگذارید تا کل باکس را پر کند.
                */}

                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">index.html</span>
                  <Terminal size={16} className="text-gray-400" />
                </div>

                {/* استایل شبیه‌ساز کد برای زیبایی بصری تم پیش از قرار دادن تصویر اصلی */}
                <div
                  className="font-mono text-xs md:text-sm text-left space-y-2 py-4 text-gray-400"
                  dir="ltr"
                >
                  <p className="text-purple-600 dark:text-purple-400">
                    &lt;<span className="text-indigo-600 dark:text-indigo-400">div</span>{' '}
                    <span className="text-yellow-600 dark:text-yellow-500">class</span>=
                    <span className="text-emerald-600 dark:text-emerald-400">"web-container"</span>
                    &gt;
                  </p>
                  <p className="pl-4 text-purple-600 dark:text-purple-400">
                    &lt;<span className="text-indigo-600 dark:text-indigo-400">h1</span>&gt;
                    <span className="text-gray-900 dark:text-white font-bold">
                      Build The Modern Web
                    </span>
                    &lt;/<span class="text-indigo-600 dark:text-indigo-400">h1</span>&gt;
                  </p>
                  <p className="pl-4 text-purple-600 dark:text-purple-400">
                    &lt;<span className="text-indigo-600 dark:text-indigo-400">p</span>&gt;
                    <span className="text-gray-500">HTML5 & CSS3 Professional Course</span>&lt;/
                    <span class="text-indigo-600 dark:text-indigo-400">p</span>&gt;
                  </p>
                  <p className="text-purple-600 dark:text-purple-400">
                    &lt;/<span className="text-indigo-600 dark:text-indigo-400">div</span>&gt;
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      [محل قرارگیری دمو یا تصویر دوره شما]
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400">
                    HTML5 / CSS3
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
            <CourseStatCard value={120} suffix=" ساعت" label="آموزش تخصصی ورک‌شاپی" icon={Clock} />
            <CourseStatCard value={6} suffix="+" label="پروژه کامل بازار کار" icon={Laptop} />
            <CourseStatCard value={100} suffix="٪" label="امکان استعلام مدرک رسمی" icon={Award} />
            <CourseStatCard value={4.9} suffix=" از ۵" label="رضایت نهایی دانشجویان" icon={Star} />
          </div>
        </div>
      </section>

      {/* ─── CLASS METHODS (نحوه برگزاری با گرافیک مجزا) ─── */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-bold">
              امکانات آموزشی یکپارچه نخستین
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              یک دوره آموزشی، دو شیوه یادگیری
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              ما هیچ تفاوتی میان دانشجویان آنلاین و حضوری قائل نیستیم؛ کیفیت و پشتیبانی برای همه
              یکسان است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* کارت کلاس‌های حضوری */}
            <div className="p-8 md:p-10 bg-white dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                کارگاه‌های حضوری و تعاملی
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-7 mb-6 font-medium">
                برگزاری جلسات در سایت‌های مجهز کامپیوتری آکادمی. دسترسی به سیستم اختصاصی برای هر
                فرد، ارتباط رو در رو و چهره به چهره با استاد و امکان حل مستقیم مشکلات و خطاهای
                کدنویسی در لحظه.
              </p>
              <div className="space-y-3 border-t border-gray-100 dark:border-gray-800/60 pt-6">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-emerald-500" /> ظرفیت کاملاً محدود برای حفظ
                  بالاترین راندمان
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-emerald-500" /> مجهز به سیستم‌های مدرن
                  توسعه نرم‌افزار
                </div>
              </div>
            </div>

            {/* کارت کلاس‌های آنلاین */}
            <div className="p-8 md:p-10 bg-white dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                پلتفرم پخش زنده اختصاصی
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-7 mb-6 font-medium">
                بدون مشکل قطعی یا افت کیفیت، به صورت زنده در کلاس حضور داشته باشید. پنل اختصاصی پرسش
                و پاسخ، دسترسی سریع به کدهای نوشته شده در کلاس و امکان رفع اشکال با منتورهای دوره به
                صورت آنلاین.
              </p>
              <div className="space-y-3 border-t border-gray-100 dark:border-gray-800/60 pt-6">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-emerald-500" /> ضبط استودیویی با کیفیت Full
                  HD تمام جلسات
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-emerald-500" /> دسترسی مادام‌العمر به آرشیو
                  ویدیوها و جزوات
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACCORDION SYLLABUS SECTION (سرفصل‌های لوکس آکاردئونی) ─── */}
      <section
        id="syllabus"
        class="py-24 bg-gray-50/30 dark:bg-gray-950/40 border-t border-gray-100 dark:border-gray-900"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-bold">
              Course Roadmap
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              سرفصل‌های آموزشی مهندسی‌شده
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              مسیر یادگیری گام به گام، کاملاً منطبق بر نیاز واقعی بازار کار و استانداردهای نوین
              توسعه وب.
            </p>
          </div>

          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="اصول اینترنت، معماری وب و مقدمات HTML5"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-3">
                در گام نخست، با الفبا و معماری شبکه و وب آشنا می‌شوید تا بدانید کدهای شما چطور روی
                مرورگر رندر می‌شوند.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>مفاهیم Client/Server، هاست، دامین و ساختار مرورگرها</li>
                <li>تگ‌های معنایی (Semantic Tag) برای بهبود رتبه سئو وب‌سایت</li>
                <li>پیاده‌سازی جامع فرم‌های وب، فیلدهای متنی و ورودی‌های پیشرفته</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۲"
              title="استایل‌دهی و جلوه‌های گرافیکی با CSS3"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-3">
                رنگ، لعاب و روح بخشیدن به ساختار مرده‌ی تگ‌های HTML با استفاده از ویژگی‌های مدرن
                CSS3.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>تسلط بر مدل جعبه‌ای (CSS Box Model)، حاشیه‌ها، پدینگ و مارجین</li>
                <li>شناخت دقیق انواع سلکتورها، شبه‌کلاس‌ها (Pseudo-classes) و اولویت‌ها</li>
                <li>کار با متغیرهای بومی CSS (CSS Variables) جهت مدیریت سریع تم رنگی</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۳"
              title="چیدمان‌های پیشرفته و مدرن (Flexbox & CSS Grid Layout)"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-3">
                خداحافظی با متدهای قدیمی فلوت؛ نحوه چیدمان پیچیده‌ترین طرح‌های گرافیکی وب به
                ساده‌ترین شکل ممکن.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>پیاده‌سازی سیستم‌های چیدمان یک‌بعدی با معماری قدرتمند Flexbox</li>
                <li>طراحی گرید سیستم‌های دوبعدی پیچیده با استفاده از CSS Grid Layout</li>
                <li>اصول طراحی واکنش‌گرا (Responsive) و استراتژی Mobile-First</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۴"
              title="انیمیشن‌های انحصاری، ترنزیشن‌ها و ساخت پورتفولیو نهایی"
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <p className="mb-3">
                متحرک‌سازی و خلق المان‌های جذاب بصری برای جلب توجه کاربر و آماده‌سازی نهایی برای
                بازار کار.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>طراحی حرکات نرم با Transitions و انیمیشن‌های پیشرفته با Keyframes</li>
                <li>پیاده‌سازی جلوه‌های سه‌بعدی و فیلترهای پس‌زمینه (Backdrop Filters)</li>
                <li>نحوه آپلود سایت روی سرورهای واقعی و ایجاد رزومه آنلاین و شخصی</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATION DETAIL SECTION (طرح مدرک لوکس) ─── */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-gray-100 dark:border-gray-900/60 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none text-gray-900 dark:text-white">
              <Award size={400} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 text-right space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">
                  International Certificate
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  ارزش و اعتبار <br />
                  <span className="text-purple-600 dark:text-purple-400">بدون مرز مدارک رسمی</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-7 font-medium">
                  گواهی‌نامه پایان‌دوره شما مستقیماً از سوی سازمان آموزش فنی و حرفه‌ای کشور صادر
                  می‌شود. این گواهی‌نامه به دلیل دارا بودن کد استاندارد بین‌المللی شایستگی، در تمامی
                  کشورهای عضو سازمان جهانی کار (ILO) معتبر بوده و قابلیت ترجمه رسمی دارد.
                </p>
                <div className="space-y-4 pt-2">
                  {[
                    'مدرک رسمی قابل استعلام در سراسر کشور',
                    'دارای ارزش امتیازی بالا برای فرآیندهای مهاجرت کاری',
                    'مهر تاییدیه سازمان جهانی کار (ILO)',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle
                        size={18}
                        className="text-purple-600 dark:text-purple-500 flex-shrink-0"
                      />
                      <span className="font-bold text-sm md:text-base">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ساختار شبیه‌ساز فیزیکی مدرک با دیزاین پریمیوم */}
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-[440px] aspect-[1.4/1] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-right">
                      <h4 className="text-xs font-black text-gray-900 dark:text-white">
                        سازمان آموزش فنی و حرفه‌ای کشور
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">گواهی‌نامه هوشمند مهارت وب</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                  </div>

                  <div className="my-4">
                    <span className="text-[9px] text-purple-600 dark:text-purple-400 font-bold tracking-widest block uppercase">
                      International Standard
                    </span>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mt-1">
                      توسعه‌دهنده رابط کاربری (HTML5 & CSS3)
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Ref-ID: ILO-4322/99
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-4">
                    <div className="text-right">
                      <span className="text-[9px] text-gray-400 block">وضعیت اعتبار</span>
                      <span className="text-xs font-bold text-emerald-500">
                        تایید شده در ۱۸۰ کشور عضو ILO
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                      <HelpCircle size={24} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM & CALL TO ACTION SECTION (فرم رزرو مشاوره و پیش‌ثبت‌نام) ─── */}
      <section id="register" className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
              <div className="inline-block px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">
                مشاوره رایگان و رزرو صندلی
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
                همین امروز مسیرت را آغاز کن
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                مشخصاتت را وارد کن؛ کارشناسان آموزشی نخستین به زودی با شما تماس می‌گیرند تا اطلاعات
                تکمیلی حضور در کلاس‌ها یا دسترسی آنلاین را هماهنگ کنند.
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
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                    روش برگزاری مورد علاقه شما
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none"
                      required
                    >
                      <option value="" disabled selected>
                        انتخاب نوع شیوه برگزاری...
                      </option>
                      <option value="in-person">حضوری (کارگاه مجهز آموزشی)</option>
                      <option value="online">آنلاین (استریم زنده و دسترسی به ویدیوها)</option>
                      <option value="consult">نیاز به مشاوره بیشتر دارم</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-purple-600/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ثبت درخواست مشاوره و رزرو</span>
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
