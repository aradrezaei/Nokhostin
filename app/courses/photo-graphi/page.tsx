'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Aperture,
  Sliders,
  Image as ImageIcon,
  Clock,
  Star,
  ChevronDown,
  User,
  Phone,
  Send,
  CheckCircle2,
  Play,
  ArrowLeft,
  Film,
  Sun,
  Layers,
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
      className="group relative flex flex-col items-center p-6 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-amber-500/20"
    >
      <div className="mb-4 p-3 rounded-xl bg-amber-500/5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-amber-600 dark:text-amber-400">{suffix}</span>
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
          <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono text-sm font-bold">
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

// ─── Interactive Camera Lens (Aperture Simulator) ──────────────────────────
const InteractiveCameraLens = () => {
  const [aperture, setAperture] = useState(5); // 1 to 10 scale for blade opening

  return (
    <div className="relative w-full max-w-md mx-auto p-8 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200 dark:border-amber-900/30 rounded-[2.5rem] backdrop-blur-xl text-center space-y-6">
      <div className="relative w-48 h-48 mx-auto flex items-center justify-center bg-gray-200 dark:bg-gray-900 rounded-full border-4 border-gray-300 dark:border-gray-800 shadow-inner">
        {/* Lens Outer Body SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform rotate-45 transition-transform duration-500"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="#374151" strokeWidth="2" />
          {/* Dynamic Aperture Blades */}
          <g fill="none" stroke="#111827" strokeWidth="1">
            {/* Blade 1 */}
            <path
              d={`M 50 ${4 + (10 - aperture) * 2} L 80 30 L 50 50 Z`}
              fill="#1f2937"
              className="transition-all duration-300"
            />
            {/* Blade 2 */}
            <path
              d={`M ${96 - (10 - aperture) * 2} 50 L 70 80 L 50 50 Z`}
              fill="#111827"
              className="transition-all duration-300"
            />
            {/* Blade 3 */}
            <path
              d={`M 50 ${96 - (10 - aperture) * 2} L 20 70 L 50 50 Z`}
              fill="#1f2937"
              className="transition-all duration-300"
            />
            {/* Blade 4 */}
            <path
              d={`M ${4 + (10 - aperture) * 2} 50 L 30 20 L 50 50 Z`}
              fill="#111827"
              className="transition-all duration-300"
            />
          </g>
          {/* Glass Element Reflections */}
          <circle cx="50" cy="50" r="40" fill="rgba(6, 182, 212, 0.05)" />
          <path
            d="M 25 25 Q 50 15 75 25"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center font-mono text-[10px] text-gray-400 tracking-widest pointer-events-none select-none">
          f/{(11 - aperture).toFixed(1)}
        </div>
      </div>

      {/* Control Slider */}
      <div className="space-y-2 max-w-xs mx-auto">
        <div className="flex justify-between text-xs font-bold text-gray-400 px-1">
          <span>عمق میدان کم (f/1.4)</span>
          <span>عمق میدان زیاد (f/16)</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={aperture}
          onChange={(e) => setAperture(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <p className="text-xs font-medium text-gray-400">
          اسلایدر را برای تغییر فکوس و گشودگی تیغه‌های دیافراگم بکشید.
        </p>
      </div>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function PhotographyCoursePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-600/10 dark:bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* سمت راست: جزئیات متنی مهارتی عکاسی */}
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Camera size={14} /> آکادمی تخصصی عکاسی تجاری، مهارتی و نورپردازی حرفه‌ای
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                دوره جامع <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400">
                  عکاسی دیجیتال و مدیریت نور
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                هنر ترکیب زاویه‌ها، درک فیزیک نور و تسلط بر منوهای پیچیده دوربین را به شکل کاملاً
                کارگاهی تجربه کنید. از عکاسی خیابانی تا مدیریت پروژه‌های تبلیغاتی و استودیویی
                گران‌قیمت بازار مدرن.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400">
                    <Sun size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      نورپردازی ۳ نقطه‌ای
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      کار با فلاش‌های تک‌نور استودیویی
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-400">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      ادیت تخصصی Camera Raw
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">ریتاچ فرکانسی و اصلاح رنگ</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a
                  href="#register"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-600/10"
                >
                  رزرو کارگاه و آتلیه عملی
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* سمت چپ: شبیه‌ساز زنده لنز */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <InteractiveCameraLens />
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRID STATS SECTION ─── */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-gray-900/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <CourseStatCard
              value={120}
              suffix=" ساعت"
              label="کارگاه عملی و عکاسی محیطی"
              icon={Clock}
            />
            <CourseStatCard
              value={8}
              suffix=" ژورنال"
              label="پورتفولیو و خروجی فیزیکی هنرآموز"
              icon={ImageIcon}
            />
            <CourseStatCard
              value={100}
              suffix="٪"
              label="تمرین فوکوس، شاتر و فیزیک فلاش"
              icon={Sliders}
            />
            <CourseStatCard
              value={4.9}
              suffix=" از ۵"
              label="رضایت کیفی و هنری شرکت‌کنندگان"
              icon={Star}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SPLIT VIDEO SECTION (ویدیو معرفی دوره عکاسی)
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-500">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* سمت راست: متن معرفی ویدیو عکاسی */}
            <div className="lg:col-span-5 text-right space-y-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Film size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
                نگاهی به اتمسفر کلاسی <br />
                <span className="text-amber-600 dark:text-amber-400">و تجهیزات پیشرفته آتلیه</span>
              </h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-8 font-medium">
                در این ویدیو، محیط تاریک‌خانه دیجیتال، انواع اصلاح‌کننده‌های نور (سافت‌باکس،
                بیوتی‌دیش و اوکتا) و نحوه کار با دوربین‌های فول‌فریم آکادمی به تصویر کشیده شده است.
                قبل از ثبت نام، تفاوت آموزش آکادمیک و تجاری را احساس کنید.
              </p>
              <div className="flex gap-4 items-center text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" /> آشنایی با تجهیزات هسلبلاد
                  و سونی
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" /> آموزش چیدمان لایت استودیو
                </span>
              </div>
            </div>

            {/* سمت چپ: باکس ویدیو چیدمان دسکتاپ */}
            <div className="lg:col-span-7 w-full">
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden p-2 group shadow-xl">
                <div className="absolute inset-0 bg-[url('/assets/photo-coach-banner.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="w-full h-full border border-gray-200 dark:border-gray-800/60 rounded-2xl flex items-center justify-center relative">
                  <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-amber-600 text-gray-950 dark:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Play size={24} className="fill-current ml-1" />
                  </button>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-400">
                    STUDIO WORKSHOP: HIGH-END COMMERCIAL PHOTOGRAPHY
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
            <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
              Syllabus Blocks
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              سرفصل‌های کارگاهی و گام‌به‌گام عکاسی
            </h2>
          </div>

          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="مثلث نوردهی و مهندسی مکانیک دوربین"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-3">
                تسلط بر سه فاکتور کلیدی دیافراگم (Aperture)، سرعت شاتر (Shutter Speed) و حساسیت
                سنسور (ISO) در شرایط نوری متغیر.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>مدیریت عمق میدان و تکنیک‌های فوکوس دستی تخصصی</li>
                <li>درک هیستوگرام و بررسی دقیق کیفیت داینامیک رنج سنسورها</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۲"
              title="نورپردازی پیشرفته پرتره و فیزیک نور استودیویی"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-3">
                کار با فلاش‌های گران‌قیمت، چیدمان‌های کلاسیک نورپردازی (ریمبراند، باترفلای، اسپلیت)
                و کنترل بازتاب‌های نوری ملایم و شدید.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>استفاده از رفلکتورها، گریدها و زنبوری‌ها برای هدایت دقیق پرتوهای نور</li>
                <li>تکنیک‌های سرعت همگام‌سازی بالا (High-Speed Sync) در فضای باز</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۳"
              title="کمپوزیسیون، ترکیب‌بندی هنری و توسعه پورتفولیو"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-3">
                قوانین هندسی کادربندی، نقاط طلایی، خطوط راهنما و در نهایت پردازش فرمت خام تصاویر
                (RAW) در نرم‌افزارهای تخصصی دسکتاپ.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>اصلاحات نوری، کالرگریدینگ سینمایی و شارپ‌سازی متدهای مدرن ادیت</li>
                <li>مدیریت پروژه و نحوه ورود اصولی به بازار عکاسی تبلیغاتی و عروسی</li>
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
                ثبت‌نام و رزرو کارگاه عملی عکاسی
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
                جهت هماهنگی ساعت آتلیه و بررسی مدل دوربین شخصی خود، مشخصات را تکمیل کنید. کارشناسان
                هنر آکادمی نخستین با شما تماس می‌گیرند.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">نام و نام خانوادگی</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: علیرضا محمدی"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-amber-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-amber-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                    آیا دوربین شخصی دارید؟
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-amber-500 text-gray-900 dark:text-white font-medium text-sm ps-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none nk-select pe-11"
                      required
                    >
                      <option value="" disabled selected>
                        انتخاب وضعیت تجهیزات...
                      </option>
                      <option value="yes_dslr">بله، دوربین DSLR یا بدون آینه دارم</option>
                      <option value="no_rent">
                        خیر، تمایل دارم از دوربین‌های کارگاهی آکادمی استفاده کنم
                      </option>
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
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-amber-600/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>تایید و رزرو تایم استودیو عکاسی</span>
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
