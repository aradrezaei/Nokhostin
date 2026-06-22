'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Layers,
  Sparkles,
  Crop,
  Brush,
  Clock,
  Star,
  ChevronDown,
  User,
  Phone,
  Send,
  CheckCircle2,
  Play,
  ArrowLeft,
  Flame,
  Palette,
  Eye,
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
      className="group relative flex flex-col items-center p-6 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-blue-500/20"
    >
      <div className="mb-4 p-3 rounded-xl bg-blue-500/5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-blue-600 dark:text-blue-400">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
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
    <div className="bg-gray-50/50 dark:bg-gray-900/20 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-sm font-bold">
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
          isOpen ? 'max-h-[800px] border-t border-gray-150 dark:border-gray-800/50' : 'max-h-0'
        }`}
      >
        <div className="p-6 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 text-sm leading-8 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Photoshop Before/After Artwork Splitter ──────────────────────
const PhotoshopImageSplitter = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200 dark:border-blue-900/30 rounded-[2.5rem] backdrop-blur-xl space-y-6">
      {/* Container Image Visual Simulation */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-900 select-none shadow-inner border border-gray-300 dark:border-gray-800">
        {/* RIGHT SIDE: Before (خام، بدون افکت، خاکستری) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-400 to-gray-300 flex items-center justify-center text-center">
          <div className="text-gray-600 font-black text-lg opacity-40">
            تصویر خام دوربین دیجیتال
          </div>
        </div>

        {/* LEFT SIDE: After (ادیت شده، نئونی، خفن، فتوشاپی) */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 overflow-hidden transition-all duration-75"
          style={{ width: `${sliderPos}%` }}
        >
          {/* محتوای لایه فتوشاپی رنگی متناسب با درصد عرض */}
          <div className="absolute inset-0 w-[400px] h-[300px] flex items-center justify-center text-center">
            <div className="text-white font-black text-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] animate-pulse">
              خروجی سورئال فتوشاپ 🎨
            </div>
          </div>
        </div>

        {/* Dynamic Split Handle Indicator */}
        <div
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-md -translate-x-1/2">
            ↔
          </div>
        </div>

        {/* Native Hidden input slider overlap */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      {/* Info labels */}
      <div className="flex justify-between items-center px-2">
        <span className="text-xs font-bold text-gray-400">لایه اصلی (Original)</span>
        <span className="text-xs font-bold text-blue-500 dark:text-blue-400">
          ریتاچ هوشمند (Photoshop Ps)
        </span>
      </div>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function PhotoshopCoursePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (خفن، سریع و باحال گرافیکی)
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* سمت راست: جزئیات متنی مهارتی ادوبی فتوشاپ */}
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Palette size={14} /> مسترکلاس ابزارهای خلاقیت، خلق پوستر و آرت‌ورک‌های تجاری
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                دوره ماراتن <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
                  کالرگریدینگ و فتوشاپ دیزاین
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                از باز کردن اولین سند لایه‌باز تا ترکیب تصاویر پیچیده (Compositing)، ریتاچ پیشرفته
                پوست و ساخت طرح‌های نئونی بیلبوردهای شهری. صفر تا صد بازار کار آتلیه‌ها و آژانس‌های
                تبلیغاتی بزرگ کشور.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      بلندینگ مد و ماسک
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      ترکیب فرکانسی نور و رنگ لایه‌ها
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      هوش مصنوعی Firefly
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      کار با ابزار Generative Fill جدید
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href="#register"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/10"
                >
                  شروع انفجاری دیزاین و رندر لایه‌ها
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* سمت چپ: اسپلیتر تعاملی قبل و بعد فتوشاپ */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <PhotoshopImageSplitter />
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRID STATS SECTION ─── */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-gray-900/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <CourseStatCard
              value={90}
              suffix=" ساعت"
              label="تمرین فشرده منوهای لایه باز"
              icon={Clock}
            />
            <CourseStatCard
              value={25}
              suffix=" پروژه"
              label="پوستر، بروشور و بنرهای سطح کلان"
              icon={Crop}
            />
            <CourseStatCard
              value={100}
              suffix="٪"
              label="پروژه‌محور متناسب با نیاز بازار"
              icon={Brush}
            />
            <CourseStatCard
              value={5}
              suffix=" از ۵"
              label="رضایت گرافیست‌ها و طراحان برتر"
              icon={Star}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SPLIT VIDEO SECTION (تیزر ویدیو فتوشاپ)
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-500">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* سمت راست: متن لندینگ ویدیو فتوشاپ */}
            <div className="lg:col-span-5 text-right space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Flame size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
                مکانیزم پروژه‌های سنگین <br />
                <span className="text-blue-600 dark:text-blue-400">و ریتاچ فیس بیلبوردها</span>
              </h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-8 font-medium">
                در این ویدیو پیش‌نمایش، چند نمونه از سنگین‌ترین پروژه‌های بیلبوردی طراحی شده در
                دپارتمان آکادمی نخستین را باز کرده‌ایم تا ببینید چگونه با مدیریت درست اسمارت
                آبجکت‌ها و کانال‌های رنگی (Channels) می‌توان رندرهایی با ابعاد بزرگ و بدون افت کیفیت
                خلق کرد.
              </p>
              <div className="flex gap-4 items-center text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" /> بررسی ترفندهای وکتور و
                  پنتول
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" /> خروجی چاپ CMYK و RGB
                </span>
              </div>
            </div>

            {/* سمت چپ: باکس پلیر کاور دیجیتال آرت فتوشاپ */}
            <div className="lg:col-span-7 w-full">
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden p-2 group shadow-xl">
                <div className="absolute inset-0 bg-[url('/assets/ps-coach-banner.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="w-full h-full border border-gray-200 dark:border-gray-800/60 rounded-2xl flex items-center justify-center relative">
                  <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-blue-600 text-gray-950 dark:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Play size={24} className="fill-current ml-1" />
                  </button>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-400">
                    PHOTOSHOP MASTERCLASS: DIGITAL ART & COMPOSITING
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACCORDION SYLLABUS SECTION ─── */}
      <section
        id="syllabus"
        className="py-24 bg-gray-50/30 dark:bg-gray-950/20 border-t border-gray-100 dark:border-gray-900/40"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
              Syllabus Structure
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              سرفصل‌های کارگاهی و ماژولار فتوشاپ
            </h2>
          </div>

          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="مدیریت لایه‌ها، سلکشن‌های پیشرفته و ماسک"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-3">
                یادگیری انواع روش‌های جداسازی سوژه از پس‌زمینه (حتی موهای پراکنده) با استفاده از
                ابزارهای هوش مصنوعی و متد کارهای دستی دقیق Pen Tool.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>کاربرد الگوهای ماسک غیرمخرب (Non-Destructive Editing)</li>
                <li>آشنایی عمیق با کارکرد کانال‌های رنگی لایه الفا</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۲"
              title="اصلاح رنگ سینمایی (Camera Raw) و ریتاچ فرکانسی پوست"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-3">
                جداسازی بافت و رنگ پوست به دو لایه مجزا برای صاف کردن اصولی صورت، بدون از بین رفتن
                روزنه‌ها و ساختار طبیعی پوست بدن در آتلیه عکاسی.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>کاربرد فیلتر قدرتمند برون‌برنامه‌ای Camera Raw جهت هماهنگی تناژ نوری</li>
                <li>تکنیک‌های تطابق نوری سوژه‌های مختلف در کارهای فتومونتاژ</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۳"
              title="خلق پوسترهای تبلیغاتی و آماده‌سازی خروجی چاپ صنعتی"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-3">
                طراحی هویت‌های بصری، پوسترهای اینستاگرامی و بیلبوردهایی با سایز بزرگ که نیازمند
                مدیریت رزولوشن بالا (DPI 300) هستند.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>اصلاحات پروفایل‌های رنگی مانیتور و تفاوت‌های چاپی CMYK</li>
                <li>ایجاد افکت‌های متنی سه بعدی نئونی جذاب همراه با سایه‌های طبیعی</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ─── FORM & CALL TO ACTION SECTION ─── */}
      <section id="register" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
                رزرو صندلی کارگاه گرافیک فتوشاپ
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
                جهت دریافت پکیج فونت‌های اختصاصی و تست تعیین سطح نرم‌افزاری، اطلاعات خود را تکمیل
                کنید. تیم ادوبی آکادمی نخستین با شما هماهنگ خواهد شد.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">نام و نام خانوادگی</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: رضا کریمی"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                      placeholder="مثال: ۰۹۱۲xxxxxxx"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                    هدف اصلی شما از یادگیری چیست؟
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none"
                      required
                    >
                      <option value="" disabled selected>
                        انتخاب هدف گرافیکی...
                      </option>
                      <option value="advertising">
                        ورود به بازار کار، طراحی پوستر و بیلبوردهای تجاری
                      </option>
                      <option value="retouch">
                        علاقه‌مند به ریتاچ آتلیه‌ای و ادیت پرتره عکاسی
                      </option>
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
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>تایید نهایی و ارسال طرح به سیستم</span>
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
