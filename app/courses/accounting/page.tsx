'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  Zap,
  ChevronDown,
  User,
  Phone,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  FileText,
  PieChart,
  Briefcase,
  Layers,
  Sparkles,
  Grid,
} from 'lucide-react';

// ─── Accordion Item (سرفصل‌های فوق حرفه‌ای غول‌آسا) ───────────────────────────
function SyllabusModule({
  num,
  title,
  subtitle,
  children,
  isOpen,
  onToggle,
}: {
  num: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-850 rounded-[2rem] overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 text-right flex items-start justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800/10 transition-colors focus:outline-none"
      >
        <div className="flex gap-6">
          <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-base font-black border border-emerald-500/10">
            {num}
          </span>
          <div className="space-y-1">
            <span className="text-lg md:text-xl font-black block">{title}</span>
            <span className="text-xs text-gray-400 font-medium block">{subtitle}</span>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 mt-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[800px] border-t border-gray-200 dark:border-gray-800/40' : 'max-h-0'
        }`}
      >
        <div className="p-8 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 text-sm leading-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function AdvancedAccountingPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  // شبیه‌سازی وضعیت صندلی‌های کارگاه حسابداری (VIP)
  const totalSeats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];
  const reservedSeats = ['A2', 'B3', 'C1']; // صندلی‌های از قبل پر شده

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (لوکس، مینیمال و سئو محور)
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="absolute top-20 left-20 w-[450px] h-[450px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* سمت راست: عنوان غول‌آسا و توضیحات مهندسی شده مالی */}
            <div className="flex-1 text-right space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <TrendingUp size={14} /> معمار سیستم‌های مالی و مالیاتی بازار کار شوید
              </div>

              <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white leading-[1.15] tracking-tight">
                دوره جامع و غول <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                  حسابداری و مالیات
                </span>
              </h1>

              <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                تنها کارگاه کاملاً عملی بر پایه اسناد واقعی شرکت‌ها. از صفر مطلق ترازنامه‌ها تا
                هدایت پرونده‌های سنگین مالیاتی، ارزش افزوده و سامانه‌های مودیان دولتی بدون یک کلمه
                تئوری خسته‌کننده.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#seat-matrix"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/10"
                >
                  انتخاب صندلی و رزرو کارگاه
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>
                <a
                  href="#syllabus"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-base px-8 py-4 rounded-2xl transition-all"
                >
                  سرفصل‌های مهارتی
                </a>
              </div>
            </div>

            {/* سمت چپ: نمایشگر فوق مدرن تراز مالی خلاقانه (جایگزین ترمینال) */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="relative w-full max-w-[500px] aspect-[1.1/1] rounded-[3rem] bg-gray-950 border border-gray-850 p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* هدر گراف مالی */}
                <div className="flex items-center justify-between border-b border-gray-850 pb-4">
                  <div className="flex items-center gap-2">
                    <PieChart size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest">
                      FINANCIAL ANALYTICS
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono">
                    LIVE_DATA
                  </span>
                </div>

                {/* بادی لوکس و تعاملی فرانت‌اند */}
                <div className="my-6 space-y-6">
                  {/* شبیه‌ساز بالانس سود و زیان */}
                  <div className="p-4 bg-gray-900/40 border border-gray-850 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 block">TOTAL REVENUE (AUDIT)</span>
                      <span className="text-xl font-black text-white tracking-tight" dir="ltr">
                        + 2,480,500 T
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <DollarSign size={18} />
                    </div>
                  </div>

                  {/* چارت خطی مینیمال ماتریکس مالی */}
                  <div className="p-4 bg-gray-900/40 border border-gray-850 rounded-2xl space-y-3">
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>TAX COMPLIANCE RATE</span>
                      <span className="text-emerald-400 font-bold">100% SECURE</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                      <span>MODULE_01: GENERAL</span>
                      <span>MODULE_04: TAXATION</span>
                    </div>
                  </div>
                </div>

                {/* کامنت پورتفولیو برای لود تصویر یا ویدیو فضای کلاس */}
                <div className="bg-gray-900 border border-gray-850 rounded-2xl p-4 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <FileText size={18} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-200">
                        [جایگاه تصویر اسناد یا سیستم‌های مالی کلاس]
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                        accounting-dashboard.png
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                    V3.1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INFINITE SOFTWARE TICKER (جایگزین کارت‌های آماری قدیمی)
      ══════════════════════════════════════════════════════ */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-850 overflow-hidden relative">
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

        {/* انیمیشن ردیفی پیوسته و بسیار سبک */}
        <div className="flex gap-12 items-center whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] font-black text-xs md:text-sm text-gray-400 dark:text-gray-500 tracking-widest">
          {[
            'نرم‌افزار سپیدار سیستم',
            'نرم‌افزار هلو پیشرفته',
            'اکسل تخصصی مالی (Excel)',
            'سامانه مودیان مالیاتی',
            'قوانین مالیات بر ارزش افزوده',
            'قانون کار و تامین اجتماعی',
            'تنظیم لوایح دفاعی مالیاتی',
          ].map((tech, i) => (
            <div key={i} className="flex items-center gap-3">
              <Sparkles size={14} className="text-emerald-500" />
              <span>{tech}</span>
            </div>
          ))}
          {/* تکرار برای پیوستگی حرکت خطی */}
          {[
            'نرم‌افزار سپیدار سیستم',
            'نرم‌افزار هلو پیشرفته',
            'اکسل تخصصی مالی (Excel)',
            'سامانه مودیان مالیاتی',
            'قوانین مالیات بر ارزش افزوده',
            'قانون کار و تامین اجتماعی',
            'تنظیم لوایح دفاعی مالیاتی',
          ].map((tech, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-3">
              <Sparkles size={14} className="text-emerald-500" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SYLLABUS SECTION (ماژول‌های سرفصل غول‌آسا و عمیق)
      ══════════════════════════════════════════════════════ */}
      <section id="syllabus" className="py-28 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold">
              Comprehensive Curriculum
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              سرفصل‌های تخصصی و اجرایی بازار کار
            </h2>
            <p className="text-gray-400 text-sm">
              برنامه‌ای کاملاً جامع که شما را از یک کارآموز ساده به مشاور ارشد مالی تبدیل می‌کند.
            </p>
          </div>

          <div className="space-y-6">
            <SyllabusModule
              num="۰۱"
              title="حسابداری بازرگانی و مکانیزم شرکت‌ها"
              subtitle="اصول پایه، ساختار سندزنی و ترازنامه‌ها"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-4 text-base font-bold text-gray-800 dark:text-gray-200">
                کامل‌ترین پکیج ورود به دنیای مالی:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-350 font-medium">
                <li>تجزیه و تحلیل رویدادهای مالی و صدور سند حسابداری واقعی</li>
                <li>طراحی کدینگ حسابداری (کل، معین، تفصیلی) متناسب با نوع فعالیت شرکت‌ها</li>
                <li>تهیه مغایرت بانکی، اصلاحات پایان دوره و بستن حساب‌های موقت و دائمی</li>
                <li>تنظیم صورت‌های مالی نهایی شامل ترازنامه و صورت سود و زیان</li>
              </ul>
            </SyllabusModule>

            <SyllabusModule
              num="۰۲"
              title="کارگاه نرم‌افزارهای جامع مالی (سپیدار و هلو)"
              subtitle="پیاده‌سازی مکانیزه فرآیندهای مالی بازار کار"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-4 text-base font-bold text-gray-800 dark:text-gray-200">
                تسلط بر ابزارهای اصلی شرکت‌های بزرگ:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-350 font-medium">
                <li>راه‌اندازی سیستم خرید و فروش، دریافت و پرداخت و انبارداری مکانیزه</li>
                <li>کدنویسی دیتابیس مالی، ثبت فاکتورهای امانی و ضایعات کالا</li>
                <li>فرآیند حقوق و دستمزد، فرمول‌نویسی مزایا و کسورات و صدور اتوماتیک اسناد حقوق</li>
                <li>تولید گزارش‌های مدیریتی پیشرفته و خروجی‌های معتبر جهت حسابرسی داخلی</li>
              </ul>
            </SyllabusModule>

            <SyllabusModule
              num="۰۳"
              title="حسابداری مالیاتی پیشرفته و سامانه‌های دولتی"
              subtitle="قوانین مالیات مستقیم، ارزش افزوده و سامانه مودیان"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-4 text-base font-bold text-gray-800 dark:text-gray-200">
                لاین فوق‌تخصصی ویژه ارتقای درآمد:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-350 font-medium">
                <li>
                  قوانین پایه‌ای پایانه‌های فروشگاهی و نحوه اتصال و ارسال صورتحساب به سامانه مودیان
                </li>
                <li>
                  تنظیم و ارسال اظهارنامه مالیات بر ارزش افزوده و گزارش معاملات فصلی (ماده ۱۶۹)
                </li>
                <li>محاسبه مالیات عملکرد شرکت‌ها و تکنیک‌های قانونی معافیت و کاهش جرایم</li>
                <li>
                  آمادگی جهت حضور در هیئت‌های حل اختلاف مالیاتی و تنظیم لوایح دفاعی فوق‌حرفه ای
                </li>
              </ul>
            </SyllabusModule>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATION DETAIL SECTION (مدرک معتبر فنی و حرفه‌ای) ─── */}
      <section className="py-24 bg-gray-55/30 dark:bg-gray-900/10 border-t border-gray-100 dark:border-gray-900/60">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 text-right space-y-6">
                <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                  Official Certificate
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  مدرک بین‌المللی با کد <br />
                  <span className="text-emerald-500">استاندارد سازمان جهانی کار</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-7 font-medium">
                  پایان این دوره شما را مستقیماً به آزمون‌های هماهنگ کشوری هدایت می‌کند.
                  گواهینامه‌های دریافتی به عنوان معتبرترین سند مهارتی قابلیت ترجمه دادگستری جهت
                  رزومه‌های بین‌المللی خارج از کشور (ILO) را دارا هستند.
                </p>
                <div className="space-y-4 pt-2">
                  {[
                    'پذیرش فوری در ارزیابی شرکت‌های بازرگانی و صنعتی',
                    'امکان دریافت پروانه کسب و رتبه‌بندی‌های حرفه‌ای مشاوره مالی',
                    'کد شناسه آنلاین ملی قابل استعلام در پورتال سازمان مهارت',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                      <span className="font-bold text-sm md:text-base">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* کارت لوکس مدرک حسابداری */}
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
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                  </div>

                  <div className="my-4">
                    <span className="text-[9px] text-emerald-500 font-bold tracking-widest block uppercase">
                      Financial Expert Certification
                    </span>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mt-1">
                      رئیس حسابداری و مشاور مالیاتی
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Standard Code: ACC-FIN-2026
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-150 dark:border-gray-800/80 pt-4">
                    <div className="text-right">
                      <span className="text-[9px] text-gray-400 block">اعتبار گواهی</span>
                      <span className="text-xs font-bold text-emerald-500">
                        بین‌المللی و دارای کد رهگیری
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

      {/* ══════════════════════════════════════════════════════
          DIGITAL SEAT MATRIX SELECTION (جایگزین فرم ثبت‌نام قدیمی)
      ══════════════════════════════════════════════════════ */}
      <section id="seat-matrix" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gray-950 border border-gray-850 rounded-[3rem] p-8 md:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* توضیحات رزرو سیستم لوکس صندلی */}
            <div className="lg:col-span-5 text-right space-y-6">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono">
                Seat Matrix System
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white">
                رزرو صندلی هوشمند کارگاه حسابداری
              </h2>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                به دلیل ماهیت کاملاً کارگاهی و کار با سیستم‌های متصل به دیتابیس مالی، ظرفیت
                صندلی‌های هر کد دوره به شدت محدود است.{' '}
                <span className="text-white font-bold">
                  صندلی مورد نظر خود را در ماتریس روبرو انتخاب کنید
                </span>{' '}
                و مشخصات خود را نهایی سازید.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-bold">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-3 h-3 rounded bg-gray-800 border border-gray-700" /> صندلی آزاد
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-3 h-3 rounded bg-emerald-500" /> انتخاب شما
                </div>
                <div className="flex items-center gap-2 text-red-400">
                  <span className="w-3 h-3 rounded bg-red-950 border border-red-800/40" /> رزرو شده
                </div>
              </div>
            </div>

            {/* بخش ماتریس صندلی‌ها + ورودی‌های سریع فرانت‌اند */}
            <div className="lg:col-span-7 bg-gray-900/50 border border-gray-850 p-6 md:p-8 rounded-3xl space-y-6">
              {/* نقشه شماتیک صندلی‌ها */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 font-mono block text-center mb-2">
                  PROJECTOR SCREEN / مانیتور استاد
                </span>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-full mb-6" />

                <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                  {totalSeats.map((seat) => {
                    const isReserved = reservedSeats.includes(seat);
                    const isSelected = selectedSeat === seat;

                    return (
                      <button
                        key={seat}
                        disabled={isReserved}
                        onClick={() => setSelectedSeat(seat)}
                        className={`h-11 rounded-xl text-xs font-mono font-black transition-all cursor-pointer flex items-center justify-center
                          ${isReserved ? 'bg-red-950/40 border border-red-900/30 text-red-500/50 cursor-not-allowed' : ''}
                          ${isSelected ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-95 border-emerald-400' : ''}
                          ${!isReserved && !isSelected ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700 text-gray-300' : ''}
                        `}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ورودی اطلاعات سریع چسبیده به ماتریس */}
              <div className="border-t border-gray-850 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white font-medium text-xs px-4 py-3 rounded-xl transition-all focus:outline-none"
                  />
                  <User
                    size={14}
                    className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="شماره موبایل"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 hover:border-gray-700 focus:border-emerald-500 text-white font-medium text-xs px-4 py-3 rounded-xl transition-all focus:outline-none"
                  />
                  <Phone
                    size={14}
                    className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSeat || !formData.name || !formData.phone}
              >
                <span>تایید نهایی و قفل صندلی {selectedSeat ? `[${selectedSeat}]` : ''}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
