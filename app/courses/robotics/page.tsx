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
  Laptop,
  ChevronDown,
  User,
  Phone,
  Send,
  HelpCircle,
  Cpu,
  Settings,
  Radio,
  CheckCircle2,
  Image as ImageIcon,
  Wrench,
  CircuitBoard,
  Play,
  Activity,
  Gauge,
  Sliders,
} from 'lucide-react';

// ─── Counter Hook (Ultra-lightweight) ─────────────────────────────────────────
function useCounter(target: number, duration = 1500) {
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
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) window.requestAnimationFrame(step);
            else setCount(target);
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 },
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
      className="group relative flex flex-col items-center p-6 bg-gray-950/50 border border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-orange-500/30"
    >
      <div className="mb-4 p-3 rounded-xl bg-orange-500/10 text-orange-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-orange-500">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold text-gray-400 tracking-wide">{label}</p>
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
    <div className="bg-gray-900/20 border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-mono text-sm font-bold">
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
          isOpen ? 'max-h-[600px] border-t border-gray-100 dark:border-gray-800/50' : 'max-h-0'
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
export default function RoboticsAdvancedPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'junior' | 'senior'>('junior');

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* ══════════════════════════════════════════════════════
          HERO SECTION (طراحی خدایان فرانت‌اند - تلمتری سخت‌افزار)
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* سمت راست: محتوا و بیانیه ارزش آکادمی */}
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold">
                <CircuitBoard size={14} /> آکادمی مکاترونیک و هوش مصنوعی نخستین
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                لاین تخصصی مهندسی <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400">
                  رباتیک و اتوماسیون
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                بزرگ‌ترین کارگاه مهندسی عملی کشور برای سنین{' '}
                <span className="text-gray-900 dark:text-white font-bold">۶ تا ۲۲ سال</span>. توسعه
                مدارهای الکترونیکی، مکانیزم‌های صنعتی و برنامه‌نویسی بردهای هوشمند با استانداردهای
                رسمی مسابقات بین‌المللی.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="#register"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-orange-500/10"
                >
                  مشاوره تخصصی و تعیین سطح سنین
                  <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </Link>
                <Link
                  href="#syllabus"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-base px-8 py-4 rounded-2xl transition-all"
                >
                  بررسی نقشه راه مهندسی
                </Link>
              </div>
            </div>

            {/* سمت چپ: سیستم تلمتری سخت‌افزاری لوکس (جایگزین ترمینال برنامه‌نویسی) */}
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
              <div className="relative w-full max-w-[480px] aspect-[1.05/1] rounded-[2.5rem] bg-gray-950/90 border border-gray-800 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* دکوراسیون خطوط رادار و شبکه‌ای هاردور */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full" />

                {/* ─── جایگاه اختصاصی تصویر یا بنر اصلی شما ───
                    <img src="/robot-hero.png" className="absolute inset-0 w-full h-full object-cover z-20" alt="Robotics" />
                */}

                {/* هدر تلمتری */}
                <div className="flex items-center justify-between border-b border-gray-850 pb-4 z-10">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-orange-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                      Hardware Telemetry // Online
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">SYS_OK</span>
                  </div>
                </div>

                {/* بدنه تلمتری (طراحی لول بالای فرانت‌اند کاملاً بهینه) */}
                <div className="grid grid-cols-3 gap-3 my-4 z-10 font-mono text-right" dir="ltr">
                  {/* رادار فرکانس سیگنال */}
                  <div className="col-span-2 p-4 bg-gray-900/40 border border-gray-850 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span>OSCILLOSCOPE</span>
                      <Radio size={12} className="text-orange-500" />
                    </div>
                    {/* شبیه‌ساز سبک موج سیگنال سخت‌افزاری با سادگی کامل */}
                    <div className="h-10 flex items-center justify-center gap-0.5 my-2">
                      {[30, 60, 45, 90, 20, 75, 40, 85, 50, 95, 30, 60, 40].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-gradient-to-t from-orange-600 to-amber-400 rounded-full"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 font-bold">
                      <span>FREQ: 433 MHz</span>
                      <span className="text-orange-400">SIGNAL: LOCKED</span>
                    </div>
                  </div>

                  {/* وضعیت ولتاژ هسته */}
                  <div className="p-4 bg-gray-900/40 border border-gray-850 rounded-xl flex flex-col justify-between items-center text-center">
                    <Gauge size={16} className="text-amber-500" />
                    <div>
                      <span className="text-xl font-black text-white">5.0</span>
                      <span className="text-[10px] font-bold text-amber-500 ml-0.5">V</span>
                    </div>
                    <span className="text-[9px] text-gray-500">CORE VOLT</span>
                  </div>

                  {/* وضعیت پورت‌های سخت‌افزاری I/O */}
                  <div className="p-3 bg-gray-900/40 border border-gray-850 rounded-xl space-y-2">
                    <span className="text-[9px] text-gray-500 block">I/O BUS STATUS</span>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400">PIN 09</span>
                      <span className="px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[9px]">
                        PWM
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400">PIN 13</span>
                      <span className="px-1 py-0.2 rounded bg-orange-500/10 text-orange-400 text-[9px]">
                        HIGH
                      </span>
                    </div>
                  </div>

                  {/* کانال رادیویی ریموت */}
                  <div className="col-span-2 p-3 bg-gray-900/40 border border-gray-850 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders size={14} className="text-gray-500" />
                      <div className="text-left">
                        <span className="text-[9px] text-gray-500 block">SERVO ANGLE</span>
                        <span className="text-xs font-bold text-white">90° STEADY</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-850 text-gray-400">
                      CH_02
                    </span>
                  </div>
                </div>

                {/* کامنت پورتفولیو و آیکون تصویر اختصاصی */}
                <div className="bg-gray-900 border border-gray-850 rounded-2xl p-4 flex items-center justify-between shadow-xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <ImageIcon size={18} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-200">
                        [محل قرارگیری تصویر تجهیزات یا کارگاه شما]
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                        assets/robotics-hardware.jpg
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono">
                    MCU-v2
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
            <CourseStatCard value={160} suffix=" ساعت" label="آموزش عملی و کارگاهی" icon={Clock} />
            <CourseStatCard
              value={2}
              suffix=" لاین"
              label="تفکیک حرفه‌ای رده سنی"
              icon={Settings}
            />
            <CourseStatCard
              value={100}
              suffix="٪"
              label="تامین کامل کیت‌های مکانیکی"
              icon={Wrench}
            />
            <CourseStatCard
              value={5}
              suffix=" ستاره"
              label="رضایت اولیاء و کارآموزان"
              icon={Star}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROFESSIONAL AGE LINES & INSTRUCTORS (لاین‌های سنی و مربیان)
      ══════════════════════════════════════════════════════ */}
      <section id="age-groups" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 text-xs font-bold">
              Engineering Tracks
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              تفکیک مهندسی رده‌های سنی رباتیک
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              برنامه آموزشی توسعه یافته متناسب با رشد ذهنی و تخصصی کارآموزان تا ۲۲ سال.
            </p>
          </div>

          {/* سوییچ تب‌های مدرن و لوکس */}
          <div className="flex justify-center p-1.5 bg-gray-100 dark:bg-gray-900 max-w-lg mx-auto rounded-2xl mb-16">
            <button
              onClick={() => setActiveTab('junior')}
              className={`flex-1 py-3 text-center text-xs md:text-sm font-black rounded-xl transition-all ${activeTab === 'junior' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/10' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              کودکان و نوجوانان (۶ تا ۱۵ سال)
            </button>
            <button
              onClick={() => setActiveTab('senior')}
              className={`flex-1 py-3 text-center text-xs md:text-sm font-black rounded-xl transition-all ${activeTab === 'senior' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/10' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              جوانان و متخصصین (۱۶ تا ۲۲ سال)
            </button>
          </div>

          {/* محتوای تب‌ها متمرکز بر ساختار مربی + لاین درسی */}
          <div className="transition-all duration-300">
            {activeTab === 'junior' ? (
              <div className="space-y-12">
                {/* بخش معرفی ساختار درسی لاین جونیور */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-850 p-8 md:p-12 rounded-[2.5rem]">
                  <div className="space-y-6 text-right">
                    <div className="inline-block px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">
                      لاین جونیور مکاترونیک
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                      پرورش خلاقیت مکانیکی و تفکر منطقی
                    </h3>
                    <p className="text-gray-550 dark:text-gray-400 text-sm leading-7">
                      در این سطح، دانش‌آموزان با ساختارهای فیزیکی، قوانین اهرم‌ها، چرخ‌دنده‌ها و
                      اتصالات بدون پیچیدگی ریاضی آشنا می‌شوند. هدف اصلی، ساختارهای حرکتی، افزایش
                      تمرکز دست و ذهن و اصول پایه‌ای الکتریسیته و سنسورهاست.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-orange-500" /> ساخت مکانیزم‌های بازو
                        و شاسی
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-orange-500" /> آشنایی با سنسورهای
                        تماسی و نوری
                      </div>
                    </div>
                  </div>

                  {/* ─── بخش ویدیو/صحبت مربی کودکان و نوجوانان ─── */}
                  <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[260px] group">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full" />

                    {/* ساختار پلیر یا پورتفولیو مربی */}
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 relative overflow-hidden">
                        <ImageIcon size={20} />
                        {/* تگ ایمیج مربی جونیور: <img src="/junior-teacher.jpg" className="absolute inset-0 object-cover w-full h-full" /> */}
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white">
                          سخنی با اولیاء گرامی
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          مربی بخش کودکان و نوجوانان آکادمی نخستین
                        </p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-7 text-right my-4 italic">
                      "رباتیک برای فرزند شما صرفاً یک کلاس تفریحی نیست؛ این دوره ساختار حل مسئله را
                      در مغز کودک مهندسی می‌کند تا در آینده با هر چالش منطقی و ریاضی به راحتی روبرو
                      شود."
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 font-mono">
                        assets/media/junior-intro.mp4
                      </span>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors cursor-pointer text-[11px]">
                        <Play size={12} fill="currentColor" /> پخش ویدیو معرفی لاین
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* بخش معرفی ساختار درسی لاین بزرگسال */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-850 p-8 md:p-12 rounded-[2.5rem]">
                  <div className="space-y-6 text-right">
                    <div className="inline-block px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">
                      لاین سینیور مکاترونیک
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                      الکترونیک پیشرفته و اینترنت اشیاء (IoT)
                    </h3>
                    <p className="text-gray-550 dark:text-gray-400 text-sm leading-7">
                      ویژه سنین ۱۶ تا ۲۲ سال. کارآموزان مستقیماً روی طراحی سخت‌افزار، مدارات مجتمع،
                      برنامه‌نویسی بردهای آردوینو و ESP متمرکز می‌شوند. مفاهیم فرکانس‌های رادیویی،
                      اتصال ربات به شبکه اینترنت جهت مانیتورینگ آنلاین دیتای سنسورها و کنترل بازوهای
                      هوشمند صنعتی.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-orange-500" /> برنامه نویسی بردهای
                        میکروکنترلر
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-orange-500" /> پروتکل‌های ارتباطی
                        IoT و Wi-Fi
                      </div>
                    </div>
                  </div>

                  {/* ─── بخش ویدیو/صحبت مربی جوانان و بزرگسالان ─── */}
                  <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[260px] group">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full" />

                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 relative overflow-hidden">
                        <ImageIcon size={20} />
                        {/* تگ ایمیج مربی بزرگسال: <img src="/senior-teacher.jpg" className="absolute inset-0 object-cover w-full h-full" /> */}
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white">
                          شروع تخصص سخت‌افزاری
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          مدیر ارشد لاین مهندسی و مسابقات آکادمی نخستین
                        </p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-7 text-right my-4 italic">
                      "هدف ما در لاین سینیور، تربیت تکنسین‌های ماهری است که بتوانند مستقلاً ایده خود
                      را نمونه‌سازی سخت‌افزاری کنند و وارد بازار کار اتوماسیون یا مسابقات ایران‌اپن
                      شوند."
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-400 font-mono">
                        assets/media/senior-intro.mp4
                      </span>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors cursor-pointer text-[11px]">
                        <Play size={12} fill="currentColor" /> مشاهده کارگاه و رزومه استاد
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── ACCORDION SYLLABUS SECTION ─── */}
      <section
        id="syllabus"
        className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900/40"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 text-xs font-bold">
              Comprehensive Syllabus
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              سرفصل‌های کارگاهی دوره رباتیک
            </h2>
          </div>

          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="مبانی الکترونیک عمومی و آنالوگ سخت‌افزار"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <p className="mb-2">
                آشنایی کامل با ماهیت جریان، ولتاژ، توان و المان‌های پایه‌ای در مدارات الکترونیک.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-750 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>کار با مقاومت‌ها، خازن‌ها، دیودها و ترانزیستورها به عنوان سوئیچ سخت‌افزاری</li>
                <li>تست مدارات با منبع تغذیه کارگاهی و مالتی‌مترهای دیجیتال</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۲"
              title="معماری بردهای هوشمند و برنامه نویسی میکروکنترلر"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <p className="mb-2">
                برنامه‌ریزی مغز متفکر ربات جهت تصمیم‌گیری هوشمند بر اساس ورودی‌های سنسورها.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-750 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>پیکربندی پورت‌های ورودی و خروجی دیجیتال و سیگنال‌های پالس (PWM)</li>
                <li>راه‌اندازی سنسورهای مادون قرمز، التراسونیک (فاصله‌سنج) و درایورهای موتور</li>
              </ul>
            </AccordionItem>

            <AccordionItem
              num="۰۳"
              title="مکانیک مکانیزم‌ها، شاسی و سیستم‌های انتقال قدرت"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <p className="mb-2">
                طراحی سیستم فیزیکی ربات، اتصالات موتور، گیربکس‌ها و بازوهای مکانیکی متحرک.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-750 dark:text-gray-300 font-bold text-xs md:text-sm">
                <li>بررسی محاسبات گشتاور موتورها و نحوه اتصال چرخ‌های مکانوم و ساده</li>
                <li>کار با بدنه و فریم‌های استاندارد مهندسی و برش‌های لیزری شاسی ربات</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATION DETAIL SECTION (مدرک بین‌المللی فنی و حرفه‌ای) ─── */}
      <section className="py-24 bg-gray-50/40 dark:bg-gray-900/10 border-t border-gray-100 dark:border-gray-900/60">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 text-right space-y-6">
                <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-500 text-xs font-bold">
                  Official Technical Degree
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  اعتبار سند مهارت <br />
                  <span className="text-orange-500">بین‌المللی سازمان فنی و حرفه‌ای</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-7 font-medium">
                  پس از پایان فرآیند ساخت ربات‌ها، کارآموزان واجد شرایط به آزمون رسمی معرفی می‌شوند.
                  گواهی صادر شده دارای کد رهگیری ملی هوشمند بوده و در تمامی کشورهای عضو سازمان جهانی
                  کار (ILO) دارای ارزش سابقه تخصصی و مهندسی است.
                </p>
                <div className="space-y-4 pt-2">
                  {[
                    'امتیاز ویژه رزومه جهت پذیرش در دانشگاه‌ها و مهاجرت کاری',
                    'مجوز رسمی تاسیس شرکت‌های فناور و اتوماسیون سخت‌افزار',
                    'تاییدیه رسمی صلاحیت حرفه‌ای تکنسین رباتیک درجه یک',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0" />
                      <span className="font-bold text-sm md:text-base">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* کارت لوکس مدرک رباتیک */}
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
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                  </div>

                  <div className="my-4">
                    <span className="text-[9px] text-orange-500 font-bold tracking-widest block uppercase">
                      Robotics Engineering Degree
                    </span>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mt-1">
                      طراح و سازنده سیستم‌های رباتیک
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Standard Code: ROBOT-312-ADV
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

      {/* ─── FORM & CALL TO ACTION SECTION (ثبت نام و رزرو نهایی کارگاه) ─── */}
      <section id="register" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
              <span className="px-3 py-1 rounded-xl bg-orange-500/10 text-orange-500 text-xs font-bold">
                Seat Reservation
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
                رزرو صندلی کارگاه عملی رباتیک
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                به دلیل محدودیت ابزارها و کیت‌های آزمایشگاهی آکادمی نخستین، اولویت ثبت‌نام نهایی با
                کارآموزانی است که زودتر فرم مشاوره و تعیین سطح سنی را تکمیل کنند.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">
                    نام و نام خانوادگی کارآموز
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: آرد رضایی"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-orange-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
                      required
                    />
                    <User
                      size={16}
                      className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-gray-400 mr-1">
                    شماره تماس (ولی یا کارآموز)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-orange-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
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
                    رده سنی و لاین مهندسی
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 focus:border-orange-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none"
                      required
                    >
                      <option value="" disabled selected>
                        انتخاب رده سنی مناسب...
                      </option>
                      <option value="junior">کودکان و نوجوانان (۶ تا ۱۵ سال) - لاین جونیور</option>
                      <option value="senior">جوانان و متخصصین (۱۶ تا ۲۲ سال) - لاین سینیور</option>
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
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ثبت نهایی مشخصات و رزرو کیت سخت‌افزار</span>
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
