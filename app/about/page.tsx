'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BtnLink from '@/components/ui/BtnLink';
import OBtn from  '@/components/ui/OutlineBtn'
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
    <main className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-dark " dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32  border-b border-gray-100 dark:border-gray-900"
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
  <BtnLink href="/courses" className="sm:w-auto px-8">
    مشاهده دوره‌های تخصصی
  </BtnLink>

  <BtnLink variant='secondary' className="sm:w-auto px-8">
    دریافت مشاوره رایگان
  </BtnLink>
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
     <section className="py-24">
  <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-20 px-6 lg:flex-row">
    {/* متن */}
    <div className="lg:w-[45%]">
      <div className="mb-6 inline-flex rounded-xl bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
        چرا آموزشگاه نخستین؟
      </div>

      <h2 className="mb-8 text-4xl font-black leading-[1.2] tracking-tight text-[#10242a] md:text-5xl dark:text-[#edf3f5]">
        مسیر یادگیری
        <br />
        <span className="text-violet-600 dark:text-violet-400">
          تا استخدام حرفه‌ای
        </span>
      </h2>

      <p className="mb-10 text-lg leading-8 text-[#61727a] dark:text-[#93a5ac]">
        ما در نخستین فاصله‌ی بین آموزش و بازار کار را حذف کرده‌ایم. تمامی
        دوره‌ها بر اساس استانداردهای بین‌المللی طراحی شده‌اند تا شما در
        کوتاه‌ترین زمان وارد بازار کار شوید.
      </p>

      <div className="space-y-5">
        {[
          'مدرک رسمی فنی و حرفه‌ای قابل استعلام',
          'پشتیبانی اختصاصی تا روز آزمون',
          'معرفی مستقیم به پروژه‌های اجرایی',
        ].map((item) => (
          <div
            key={item}
            className="group flex items-center gap-4"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-violet-500/25 transition-colors group-hover:border-violet-500">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
            </div>

            <span className="font-bold text-[#23363d] dark:text-[#d8e3e6]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* کارت‌ها */}
    <div className="grid flex-1 grid-cols-2 gap-5">
      {[
        {
          icon: Medal,
          title: 'رتبه برتر',
          sub: 'جزو آموزشگاه‌های نمونه کشور',
          color: 'text-amber-500',
        },
        {
          icon: Users,
          title: '+۳,۹۰۰',
          sub: 'دانش‌آموخته متخصص',
          color: 'text-violet-500',
        },
        {
          icon: Globe,
          title: '۱۸۷ کشور',
          sub: 'اعتبار بین‌المللی مدارک',
          color: 'text-sky-500',
        },
        {
          icon: Zap,
          title: 'استخدام سریع',
          sub: 'کوتاه‌ترین مسیر ورود به بازار کار',
          color: 'text-emerald-500',
        },
      ].map((item) => (
        <div
          key={item.title}
          className="
            rounded-3xl
            border-b-4
            border-b-[#d9e4e8]
            bg-[#f8fafb]
            p-8
            transition-colors
            duration-200

            hover:bg-[#f2f6f8]

            dark:border-b-[#2b3b42]
            dark:bg-[#17242a]
            dark:hover:bg-[#1d2d33]
          "
        >
          <item.icon
            size={28}
            strokeWidth={1.8}
            className={`${item.color} mb-6`}
          />

          <h3 className="mb-2 text-2xl font-black text-[#10242a] dark:text-[#edf3f5]">
            {item.title}
          </h3>

          <p className="leading-6 text-[#6b7b82] dark:text-[#8fa2aa]">
            {item.sub}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* ══════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════ */}
    <section className="border-t border-[#e6ecef] py-12 md:py-16 dark:border-[#26363d]">
  <div className="mx-auto max-w-screen-xl px-6">
    <h2 className="mb-8 text-center text-2xl font-black tracking-tight text-[#10242a] md:mb-12 md:text-4xl dark:text-[#edf3f5]">
      آرمان‌هایی که به آن{' '}
      <span className="text-violet-600 dark:text-violet-400">
        پایبندیم
      </span>
    </h2>

    <div className="grid gap-5 md:grid-cols-3">
      {VALUES.map((v, i) => (
        <div
          key={i}
          className="
            rounded-3xl
            bg-[#f8fafb]
            p-6
            border-b-4
            border-b-[#d9e4e8]

            transition-colors
            duration-200

            hover:bg-[#f2f6f8]

            dark:bg-[#17242a]
            dark:border-b-[#2b3b42]
            dark:hover:bg-[#1d2d33]
          "
        >
          <div
            className="
              mb-6
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-violet-100
              dark:bg-violet-500/15
            "
          >
            <v.icon
              size={20}
              strokeWidth={1.7}
              className="text-violet-600 dark:text-violet-400"
            />
          </div>

          <h3 className="mb-3 text-lg font-black text-[#10242a] dark:text-[#edf3f5]">
            {v.title}
          </h3>

          <p className="leading-7 text-[#66757c] dark:text-[#93a5ac]">
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
    CERTIFICATIONS SECTION
══════════════════════════════════════════════════════ */}
<section className="py-24 border-t border-[#e6ecef] dark:border-[#26363d]">
  <div className="max-w-screen-xl mx-auto px-6">
    <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-8 md:p-16 overflow-hidden relative">
      
      {/* واترماک مچ شده با دیزاین فلت پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] dark:opacity-[0.02] text-[#10242a] dark:text-[#edf3f5] pointer-events-none">
        <Award size={420} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="mb-4 inline-flex rounded-xl bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            سازمان آموزش فنی و حرفه‌ای کشور
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-[#10242a] dark:text-[#edf3f5] mb-8 leading-[1.25] tracking-tight">
            اعتباری که <br />{' '}
            <span className="text-violet-600 dark:text-violet-400">
              مرز نمی‌شناسد
            </span>
          </h2>
          
          <div className="space-y-5">
            {[
              'تاییدیه مستقیم سازمان فنی و حرفه‌ای کشور تحت نظر وزارت کار',
              'قابلیت ترجمه رسمی و بین‌المللی جهت مهاجرت کاری (ILO)',
              'صدور کد استاندارد بین‌المللی هولوگرام‌دار مهارت',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 text-[#61727a] dark:text-[#93a5ac]">
                <CheckCircle size={20} className="text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                <span className="font-bold text-[#23363d] dark:text-[#d8e3e6] text-sm md:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* کارت‌های فرعی گواهینامه */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-[#1d2d33]/50 border border-[#e6ecef] dark:border-[#2b3b42] transition-colors"
            >
              <benefit.icon size={24} className="text-violet-500 dark:text-violet-400 mb-4" />
              <h4 className="text-[#10242a] dark:text-[#edf3f5] font-black text-sm mb-2">
                {benefit.title}
              </h4>
              <p className="text-[#61727a] dark:text-[#93a5ac] text-xs leading-6">
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

    </main>
  );
}
