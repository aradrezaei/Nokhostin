'use client';

import Link from 'next/link';
import { Building2, GraduationCap, MessageCircle } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
interface StatItem {
  value: string;
  label: string;
  accent: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'دانشجویان فعال', value: '۱۲,۴۰۰+', accent: '#3b82f6' }, // آبی
  { label: 'دوره‌های آموزشی', value: '۸۵۰+', accent: '#8b5cf6' }, // بنفش
  { label: 'استادان مجرب', value: '۱۲۰+', accent: '#ec4899' }, // صورتی
  { label: 'رضایت کاربران', value: '۹۸٪', accent: '#10b981' }, // سبز
];

const FEATURES = [
  { icon: <Building2 size={20} />, text: 'مجوز رسمی سازمان فنی و حرفه‌ای' },
  { icon: <GraduationCap size={20} />, text: 'مدرک معتبر بین‌المللی' },
  { icon: <MessageCircle size={20} />, text: 'پشتیبانی ۲۴/۷' },
];

// ─── Inline SVG Illustration ───────────────────────────────────────────────
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      {/* ── Decorative rings ───────────────────────────────────────── */}
      <circle
        className="stroke-olive-900 dark:stroke-olive-300 "
        cx="260"
        cy="220"
        r="195"
        strokeWidth="1"
        strokeDasharray="6 8"
        opacity="0.15"
      />

      {/* ── Laptop base ────────────────────────────────────────────── */}
      <rect
        x="80"
        y="310"
        width="360"
        height="18"
        rx="9"
        className="fill-slate-300 dark:fill-[#e2e8f0]"
      />
      <rect
        x="110"
        y="300"
        width="300"
        height="14"
        rx="4"
        className="fill-slate-400 dark:fill-[#cbd5e1]"
      />

      {/* ── Laptop body ────────────────────────────────────────────── */}
      <rect
        x="108"
        y="68"
        width="304"
        height="236"
        rx="14"
        fill="#1e293b"
        filter="url(#softShadow)"
      />
      <rect x="112" y="72" width="296" height="228" rx="11" fill="#0f172a" />

      {/* ── Screen content ─────────────────────────────────────────── */}
      <rect
        x="114"
        y="74"
        width="292"
        height="224"
        rx="10"
        fill="url(#screenGrad)"
        clipPath="url(#screenClip)"
      />

      {/* Screen grid lines */}
      <line x1="114" y1="104" x2="406" y2="104" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="114" y1="134" x2="406" y2="134" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="114" y1="164" x2="406" y2="164" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="114" y1="194" x2="406" y2="194" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="174" y1="74" x2="174" y2="298" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="234" y1="74" x2="234" y2="298" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="294" y1="74" x2="294" y2="298" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />
      <line x1="354" y1="74" x2="354" y2="298" stroke="#ffffff" strokeWidth="0.4" opacity="0.1" />

      {/* Screen - Code editor mockup */}
      {/* Sidebar */}
      <rect x="114" y="74" width="52" height="224" fill="#1a1033" opacity="0.5" />
      {/* Sidebar items */}
      {[90, 110, 130, 150, 170, 190, 210, 230, 250, 270].map((y, i) => (
        <rect
          key={i}
          x="122"
          y={y}
          width={i % 3 === 0 ? 34 : i % 3 === 1 ? 28 : 22}
          height="6"
          rx="3"
          fill="#6366f1"
          opacity={i === 1 ? 0.9 : 0.3}
        />
      ))}

      {/* Code lines */}
      <rect x="174" y="84" width="60" height="6" rx="3" fill="#818cf8" opacity="0.8" />
      <rect x="238" y="84" width="40" height="6" rx="3" fill="#f472b6" opacity="0.7" />
      <rect x="174" y="98" width="20" height="6" rx="3" fill="#34d399" opacity="0.7" />
      <rect x="200" y="98" width="80" height="6" rx="3" fill="#fb923c" opacity="0.6" />
      <rect x="286" y="98" width="50" height="6" rx="3" fill="#818cf8" opacity="0.5" />
      <rect x="178" y="112" width="45" height="6" rx="3" fill="#60a5fa" opacity="0.7" />
      <rect x="229" y="112" width="30" height="6" rx="3" fill="#34d399" opacity="0.6" />
      <rect x="265" y="112" width="70" height="6" rx="3" fill="#f472b6" opacity="0.5" />
      <rect x="174" y="126" width="90" height="6" rx="3" fill="#fbbf24" opacity="0.6" />
      <rect x="270" y="126" width="50" height="6" rx="3" fill="#818cf8" opacity="0.5" />
      <rect x="178" y="140" width="55" height="6" rx="3" fill="#34d399" opacity="0.7" />
      <rect x="239" y="140" width="100" height="6" rx="3" fill="#60a5fa" opacity="0.5" />
      <rect x="174" y="154" width="30" height="6" rx="3" fill="#f472b6" opacity="0.6" />
      <rect x="210" y="154" width="70" height="6" rx="3" fill="#fbbf24" opacity="0.5" />
      <rect x="286" y="154" width="40" height="6" rx="3" fill="#818cf8" opacity="0.4" />
      <rect x="178" y="168" width="110" height="6" rx="3" fill="#818cf8" opacity="0.6" />
      <rect x="174" y="182" width="50" height="6" rx="3" fill="#34d399" opacity="0.5" />
      <rect x="230" y="182" width="80" height="6" rx="3" fill="#60a5fa" opacity="0.4" />
      <rect x="178" y="196" width="65" height="6" rx="3" fill="#fb923c" opacity="0.5" />
      <rect x="249" y="196" width="45" height="6" rx="3" fill="#f472b6" opacity="0.4" />
      <rect x="174" y="210" width="40" height="6" rx="3" fill="#fbbf24" opacity="0.5" />
      <rect x="220" y="210" width="90" height="6" rx="3" fill="#818cf8" opacity="0.4" />
      <rect x="178" y="224" width="75" height="6" rx="3" fill="#34d399" opacity="0.4" />
      <rect x="259" y="224" width="55" height="6" rx="3" fill="#60a5fa" opacity="0.3" />
      <rect x="174" y="238" width="35" height="6" rx="3" fill="#f472b6" opacity="0.4" />
      <rect x="215" y="238" width="100" height="6" rx="3" fill="#fbbf24" opacity="0.3" />
      <rect x="178" y="252" width="85" height="6" rx="3" fill="#818cf8" opacity="0.3" />
      <rect x="269" y="252" width="45" height="6" rx="3" fill="#34d399" opacity="0.3" />
      <rect x="174" y="266" width="50" height="6" rx="3" fill="#60a5fa" opacity="0.3" />
      <rect x="230" y="266" width="70" height="6" rx="3" fill="#fb923c" opacity="0.25" />

      {/* ── Laptop camera dot ──────────────────────────────────────── */}
      <circle cx="260" cy="79" r="3" fill="#334155" />
      <circle cx="260" cy="79" r="1.5" fill="#475569" />

      {/* ── Decorative dots ──────────────────────────────────────────── */}
      {[
        [66, 92],
        [78, 92],
        [90, 92],
        [430, 400],
        [442, 400],
        [454, 400],
        [50, 350],
        [62, 360],
        [74, 350],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" className="fill-purple-600 dark:fill-purple-400" />
      ))}

      {/* Gradient dots accent */}
      {[
        [446, 186],
        [458, 196],
        [470, 186],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          className="fill-purple-950 dark:fill-purple-700"
          opacity={0.5 + i * 0.1}
        />
      ))}
    </svg>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden -mt-5 lg:pt-36 bg-white dark:bg-slate-900"
      aria-label="بخش اصلی صفحه"
    >
      {/* ── Subtle background texture ─────────────────────────────── */}
      <div className="absolute  inset-0 pointer-events-none" aria-hidden="true">
        {/* Top right blob */}
        {/* Bottom left blob */}
        {/* Dot grid — pure CSS, zero JS */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: Text content ──────────────────────────────────── */}
          <div className="order-2 lg:order-1 space-y-7">
            {/* Trust pill */}

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl -mt-12 sm:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tighter text-gray-900 dark:text-white">
                مسیر شغلی خود را
                <br />
                <span className="relative inline-block mt-2">
                  {/* متن با گرادینت عمودی رسمی (از آبی تیره به آبی روشن) */}
                  <span className="relative z-10 bg-gradient-to-b from-purple-500 via-purple-700 to-purple-700 dark:from-purple-500 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent">
                    با ما بسازید
                  </span>

                  {/* خط زیرین (Underline) رسمی و ظریف */}
                  <svg
                    className="absolute -bottom-1 right-0 w-full overflow-visible"
                    viewBox="0 0 200 6"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 4 Q100 0 200 4"
                      stroke="currentColor"
                      className="text-purple-600/30"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-mono leading-relaxed max-w-lg">
                با بیش از{' '}
                <strong className="text-gray-800 dark:text-gray-200 font-bold">۲۰ سال تجربه</strong>
                ، از صفر تا استخدام همراه شما هستیم.
              </p>
            </div>

            {/* Feature list */}
            <ul className="space-y-2.5" role="list">
              {FEATURES.map((f) => (
                <li
                  key={f.text}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span
                    className="flex-shrink-0 text-black opacity-65 dark:text-white"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            {/* <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl 
bg-purple-600 dark:
active:scale-95 transform transition-all duration-200 
text-white font-bold text-sm
border border-white/10"
              >
                مشاهده دوره‌ها
              </Link>
              <a
                href="tel:02165565004"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 text-gray-900 dark:text-white font-bold text-sm  border border-gray-200 dark:border-gray-700"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                مشاوره رایگان
              </a>
            </div> */}
          </div>

          {/* ── Right: Illustration ─────────────────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] lg:max-w-[500px]">
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* ── Stats bar ─────────────────────────────────────────────── */}
        <div
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-300 dark:border-gray-800 "
          role="list"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              role="listitem"
              className="group relative bg-white dark:bg-gray-900 px-6 py-3 text-center "
            >
              {/* خط جداکننده افقی برای موبایل در صورت نیاز */}
              <div className="relative z-10">
                <div
                  className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tighter tabular-nums bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${stat.accent}, ${stat.accent}80)`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>

              {/* افکت درخشش ضعیف در هاور */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
