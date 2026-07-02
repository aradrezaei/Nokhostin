'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Award,
  Users,
  GraduationCap,
  Building2,
  Trophy,
  ArrowLeft,
  Shield,
  Target,
  Zap,
  BookOpen,
  Clock,
  TrendingUp,
  Star,
  ChevronRight,
  Rocket,
  Heart,
  Code2,
  BarChart3,
  Briefcase,
  Medal,
  Play,
  Globe,
  Wrench,
  DollarSign,
  CheckCircle,
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
function StatCard({
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
      className="group relative flex flex-col items-center lg:items-start text-center lg:text-right px-4 lg:border-l last:border-l-0 border-gray-100 dark:border-gray-800/50"
    >
      {/* آیکون بسیار ظریف و کوچک برای حفظ سادگی */}
      <div className="mb-4 p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-500">
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-center lg:justify-start gap-1">
          <span className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
            {count.toLocaleString('fa-IR')}
          </span>
          <span className="text-lg font-bold text-purple-600 dark:text-purple-500">{suffix}</span>
        </div>

        <p className="text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {label}
        </p>
      </div>

      {/* خط دکوراتیو پایین که فقط در حالت دسکتاپ و هاور حس پویایی می‌دهد */}
      <div className="hidden lg:block absolute bottom-[-10px] right-4 w-0 h-[2px] bg-purple-500 transition-all duration-700 group-hover:w-12" />
    </div>
  );
}
// 1. آیکون‌های مورد نیاز از lucide-react را اینجا ایمپورت کنید
// همچنین CheckCircle اگر از lucide-react می‌آید، باید اینجا باشد

// این قسمت برای نشان دادن نحوه استفاده از VALUES در بخش دوم کد شما بود و لازم نیست آن را اینجا قرار دهید
// اگر این بخش دوم در فایل دیگری است یا در ادامه همین فایل استفاده می‌شود، مطمئن شوید VALUES تعریف شده باشد.
/*
        <section className="py-24 bg-white dark:bg-gray-950">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        آرمان های ما که به آن{' '}
                        <span className="relative">
                            پایبندیم
                            <span className="absolute -bottom-1 right-0 left-0 h-[3px] bg-purple-500 rounded-full" />
                        </span>
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VALUES.map((v, i) => (
                        <div
                            key={i}
                            className="group flex gap-4 items-start bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-purple-200 dark:hover:border-purple-800"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors duration-200">
                                <v.icon size={18} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                                    {v.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
*/
const benefits = [
  {
    icon: Briefcase, // استفاده مستقیم از کامپوننت Briefcase
    title: 'افزایش فرصت‌های شغلی',
    description: 'دسترسی به بازار کار پویا و مشاغل تخصصی',
  },
  {
    icon: Globe, // استفاده مستقیم از کامپوننت Globe
    title: 'اعتبار جهانی',
    description: 'امکان کار و مهاجرت به کشورهای مختلف',
  },
  {
    icon: Wrench, // استفاده از Wrench برای "Tools"
    title: 'تایید مهارت‌های عملی',
    description: 'اثبات توانمندی‌های کاربردی منطبق با استانداردهای روز',
  },
  {
    icon: DollarSign, // استفاده مستقیم از کامپوننت DollarSign
    title: 'کسب درآمد بالاتر و خوداشتغالی',
    description: 'پتانسیل بالای درآمدزایی و راه‌اندازی کسب‌وکار',
  },
];

// ─── Team Member ──────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'دکتر علیرضا کریمی',
    role: 'مدیرعامل و بنیان‌گذار',
    exp: '۲۳ سال تجربه',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    initials: 'عک',
  },
  {
    name: 'مهندس سارا محمدی',
    role: 'مدیر آموزش',
    exp: '۱۵ سال تجربه',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    initials: 'سم',
  },
  {
    name: 'دکتر رضا موسوی',
    role: 'سرپرست فنی',
    exp: '۱۸ سال تجربه',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    initials: 'رم',
  },
  {
    name: 'مهندس نیلوفر احمدی',
    role: 'مدیر محتوا',
    exp: '۱۲ سال تجربه',
    color: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
    initials: 'نا',
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '۱۳۸۰', title: 'تأسیس آموزشگاه', desc: 'شروع با یک کلاس و ۱۲ دانشجو در تهران' },
  {
    year: '۱۳۸۷',
    title: 'مجوز فنی و حرفه‌ای',
    desc: 'دریافت مجوز رسمی از سازمان آموزش فنی و حرفه‌ای کشور',
  },
  { year: '۱۳۹۳', title: 'گسترش ملی', desc: 'افتتاح شعبات در ۵ استان و پوشش ۱۰,۰۰۰ دانشجو' },
  {
    year: '۱۳۹۸',
    title: 'پلتفرم آنلاین',
    desc: 'راه‌اندازی سامانه آموزش مجازی با بیش از ۲۰۰ دوره',
  },
  {
    year: '۱۴۰۱',
    title: 'اعتبار بین‌المللی',
    desc: 'همکاری با ۱۵ مؤسسه بین‌المللی برای صدور مدرک معتبر',
  },
  { year: '۱۴۰۳', title: 'امروز', desc: '+۴۸,۰۰۰ دانش‌آموخته و +۲۰۰ دوره تخصصی فعال' },
];

// ─── Values ───────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: Shield,
    title: 'صداقت و شفافیت',
    desc: 'در هر مرحله از یادگیری، اطلاعات دقیق و صادقانه ارائه می‌دهیم.',
  },
  { icon: Target, title: 'هدف‌محوری', desc: 'هر دوره با هدف مشخص شغلی و عملی طراحی شده است.' },
  { icon: Heart, title: 'دانشجومحوری', desc: 'موفقیت دانشجو، معیار اصلی سنجش کیفیت ماست.' },
  {
    icon: Rocket,
    title: 'نوآوری مداوم',
    desc: 'بروزرسانی همیشگی طیق سر فصل های استاندارد.',
  },
  {
    icon: Globe,
    title: 'دیدگاه جهانی',
    desc: 'مدارک ما قابلیت ترجمه رسمی و استفاده در سراسر دنیا را دارند.',
  },
  {
    icon: BarChart3,
    title: 'کیفیت سنجش‌پذیر',
    desc: 'برگذاری امتحانات و گزارش های دقیق.',
  },
];

// ─── Partners ─────────────────────────────────────────────────────────────────
const PARTNERS = [
  'دیجی‌کالا',
  'اسنپ',
  'تپسی',
  'مایکروسافت',
  'بانک ملت',
  'ایران‌خودرو',
  'شرکت نفت',
  'وزارت آموزش',
  'صداوسیما',
  'ایرانسل',
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950" dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900"
        dir="rtl"
      >
        {/* Background: Ultra-lightweight CSS Pattern
        بدون افت فریم، کاملاً بهینه برای موبایل و دسکتاپ 
      */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Title: Solid, High-Contrast, Authoritative */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-950 dark:text-white tracking-tight leading-tight mb-6">
            ما{' '}
            <span className="relative bg-gradient-to-b from-purple-500 via-purple-700 to-purple-700 dark:from-purple-500 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent mb-4 px-1">
              نخستین
              {/* Architectural static underline instead of floating SVGs */}
            </span>{' '}
            هستیم.
          </h1>

          {/* Subtitle: Clean, legible, professional weight */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            با بیش از{' '}
            <span className="text-gray-950 dark:text-white font-bold">۲۴ سال سابقه درخشان</span>،
            بستری استاندارد و بین‌المللی برای شکوفایی مهارت‌های شما فراهم کرده‌ایم.
          </p>

          {/* CTAs: Enterprise-grade, no bouncy hover effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <Link
              href="/courses"
              className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-base px-8 py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              مشاهده دوره‌های تخصصی
              <ArrowLeft size={18} />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact"
              className="flex items-center justify-center w-full sm:w-auto bg-transparent border-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              دریافت مشاوره رایگان
            </Link>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════
          STATS (Refined & Professional)
    ══════════════════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════════════════
          WHY US — asymmetric layout
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* سمت راست: محتوا */}
            <div className="lg:w-[45%]">
              <div className="inline-block px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-bold mb-6">
                چرا آموزشگاه نخستین؟
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.2] mb-8">
                مسیر یادگیری <br />
                <span className="text-purple-600 dark:text-purple-400">تا استخدام حرفه‌ای</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-8 mb-10 text-lg">
                ما در نخستین، فاصله‌ی بین آموزش و بازار کار را حذف کرده‌ایم. متدهای ما بر اساس
                استانداردهای بین‌المللی طراحی شده است.
              </p>

              <div className="grid gap-4">
                {[
                  { text: 'مدرک رسمی فنی و حرفه‌ای قابل استعلام' },
                  { text: 'پشتیبانی اختصاصی تا روز آزمون' },
                  { text: 'معرفی مستقیم به پروژه‌های اجرایی' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-5 h-5 rounded-full border-2 border-purple-500/30 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* سمت چپ: گرید کارت‌ها (مینیمال و مهندسی شده) */}
            <div className="flex-1 grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none">
              {[
                {
                  icon: Medal,
                  label: 'رتبه برتر',
                  sub: 'جزو آموزشگاه های نمونه کشور',
                  color: 'text-amber-500',
                },
                {
                  icon: Users,
                  label: '+۳,۹۰۰',
                  sub: 'دانش‌آموخته متخصص',
                  color: 'text-purple-500',
                },
                {
                  icon: Globe,
                  label: '۱۸۷ کشور',
                  sub: 'اعتبار بین‌المللی مدارک',
                  color: 'text-blue-500',
                },
                {
                  icon: Zap,
                  label: 'استخدام سریع',
                  sub: 'کوتاه‌ترین مسیر شغلی',
                  color: 'text-emerald-500',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-950 p-8 hover:bg-gray-50 dark:hover:bg-gray-900/50 "
                >
                  <item.icon
                    size={24}
                    className={`${item.color} mb-4 opacity-80`}
                    strokeWidth={1.5}
                  />
                  <p className="text-xl font-black text-gray-900 dark:text-white mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-8 md:mb-12">
            آرمان‌هایی که به آن{' '}
            <span className="text-purple-600 dark:text-purple-400">پایبندیم</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-gray-950 p-6 md:p-8 text-right hover:bg-gray-50 dark:hover:bg-gray-900/50"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110">
                  <v.icon
                    size={18}
                    className="text-purple-600 dark:text-purple-400"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-base md:text-lg font-black text-gray-900 dark:text-white mb-2.5 md:mb-3 leading-none">
                  {v.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
            {/* واترماک ظریف پس‌زمینه برای حس اصالت */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  opacity-[0.02] pointer-events-none">
              <Award size={400} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-8 leading-tight">
                  اعتباری که <br />{' '}
                  <span className="text-purple-600 dark:text-purple-400 font-medium ">
                    مرز نمی‌شناسد
                  </span>
                </h2>
                <div className="space-y-6">
                  {[
                    'تاییدیه مستقیم سازمان فنی و حرفه‌ای کشور',
                    'قابلیت ترجمه رسمی برای مهاجرت (ILO)',
                    'کد استاندارد بین‌المللی مهارت',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 text-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle
                        size={20}
                        className="text-purple-700 dark:text-purple-500 flex-shrink-0"
                      />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white/80 dark:bg-black/20 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <benefit.icon size={24} className="text-purple-400 mb-4" />
                    <h4 className="text-gray-800 dark:text-white font-bold text-sm mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-5">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950" dir="rtl">
        {/* کوچک‌تر کردن عرض کل باکس برای دسکتاپ از xl به 5xl جهت زیبایی و انسجام بیشتر */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* پس‌زمینه خفن‌تر با ترکیب گرادیانت عمیق‌تر، سایه ظریف و بوردر داخلی شیشه‌ای */}
          <div className="relative rounded-[2rem] bg-gradient-to-br from-purple-600 via-indigo-700 to-violet-900 overflow-hidden p-8 md:p-12 text-center shadow-xl shadow-indigo-950/10 border border-white/10">
            {/* بهینه‌سازی و کوچک‌تر کردن دکوراسیون‌های نئونی پس‌زمینه برای پرفورمنس عالی در موبایل */}
            <div className="absolute -top-10 -right-10 w-44 h-44 md:w-64 md:h-64 bg-pink-500/20 rounded-full blur-[50px] md:blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 md:w-64 md:h-64 bg-cyan-500/20 rounded-full blur-[50px] md:blur-[80px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* تیتر بهینه شده: اندازه کاملاً ریسپانسیو جهت عدم شکستگی زشت در موبایل */}
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight md:leading-snug bg-gradient-to-b from-white via-slate-100 to-purple-200 bg-clip-text text-transparent mb-4">
                آماده شروع مسیر حرفه‌ای هستی؟
              </h2>

              {/* زیرعنوان جمع‌وجور با خوانایی بالا و هایلایت شیشه‌ای عدد */}
              <p className="text-white/85 text-lg sm:text-xs md:text-lg leading-relaxed max-w-xl mb-8">
                همین الان به بیش از ۴۸,۰۰۰ دانش‌آموخته‌ای بپیوند که مسیر حرفه‌ای خود را با{' '}
                <span className="font-bold text-purple-200">نخستین</span> آغاز کردند.
              </p>

              {/* دکمه‌های مدرن با استایل شیشه‌ای (Glassmorphism) و انیمیشن میکرو حرکتی هاور */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* دکمه اصلی - مشاهده دوره‌ها */}
                <Link
                  href="/courses"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-indigo-950 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-lg shadow-indigo-950/20 active:scale-[0.98] hover:-translate-y-0.5"
                >
                  مشاهده دوره‌ها
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1.5 transition-transform duration-300"
                  />
                </Link>

                {/* دکمه فرعی شیشه‌ای - مشاوره رایگان */}
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl hover:bg-white/20"
                >
                  مشاوره رایگان
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
