import BtnLink from '@/components/ui/BtnLink';
import {
  Award,
  Users,
  Shield,
  Target,
  Zap,
  Rocket,
  Heart,
  BarChart3,
  Briefcase,
  Medal,
  Globe,
  Wrench,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

const benefits = [
  {
    icon: Briefcase,
    title: 'افزایش فرصت‌های شغلی',
    description: 'دسترسی به بازار کار پویا و مشاغل تخصصی',
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    icon: Globe,
    title: 'اعتبار جهانی',
    description: 'امکان کار و مهاجرت به کشورهای مختلف',
    color: 'text-sky-500 dark:text-sky-400',
  },
  {
    icon: Wrench,
    title: 'تایید مهارت‌های عملی',
    description: 'اثبات توانمندی‌های کاربردی منطبق با استانداردهای روز',
    color: 'text-amber-500 dark:text-amber-400',
  },
  {
    icon: DollarSign,
    title: 'کسب درآمد بالاتر و خوداشتغالی',
    description: 'پتانسیل بالای درآمدزایی و راه‌اندازی کسب‌وکار',
    color: 'text-emerald-500 dark:text-emerald-400',
  },
];

const VALUES = [
  {
    icon: Shield,
    title: 'صداقت و شفافیت',
    desc: 'در هر مرحله از یادگیری، اطلاعات دقیق و صادقانه ارائه می‌دهیم.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/15',
  },
  {
    icon: Target,
    title: 'هدف‌محوری',
    desc: 'هر دوره با هدف مشخص شغلی و عملی طراحی شده است.',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/15',
  },
  {
    icon: Heart,
    title: 'دانشجومحوری',
    desc: 'موفقیت دانشجو، معیار اصلی سنجش کیفیت ماست.',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-500/15',
  },
  {
    icon: Rocket,
    title: 'نوآوری مداوم',
    desc: 'بروزرسانی همیشگی طیق سر فصل های استاندارد.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/15',
  },
  {
    icon: Globe,
    title: 'دیدگاه جهانی',
    desc: 'مدارک ما قابلیت ترجمه رسمی و استفاده در سراسر دنیا را دارند.',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-500/15',
  },
  {
    icon: BarChart3,
    title: 'کیفیت سنجش‌پذیر',
    desc: 'برگذاری امتحانات و گزارش های دقیق.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-500/15',
  },
];

/** Visual about page — appearance must stay identical to the previous design. */
export default function AboutView() {
  return (
    <div className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-dark " dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32  border-b border-gray-100 dark:border-gray-900"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-950 dark:text-white tracking-tight leading-tight mb-6">
            ما{' '}
            <span className="relative bg-gradient-to-b from-purple-500 via-purple-700 to-purple-700 dark:from-purple-500 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent mb-4 px-1">
              نخستین
            </span>{' '}
            هستیم.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            با بیش از{' '}
            <span className="text-gray-950 dark:text-white font-bold">۲۴ سال سابقه درخشان</span>،
            بستری استاندارد و بین‌المللی برای شکوفایی مهارت‌های شما فراهم کرده‌ایم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <BtnLink href="/courses" className="sm:w-auto px-8">
              مشاهده دوره‌های تخصصی
            </BtnLink>

            <BtnLink href="/contact" variant="secondary" className="sm:w-auto px-8">
              دریافت مشاوره رایگان
            </BtnLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY US — asymmetric layout
      ══════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-20 px-6 lg:flex-row">
          <div className="lg:w-[45%]">
            <div className="mb-6 inline-flex rounded-xl bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              چرا آموزشگاه نخستین؟
            </div>

            <h2 className="mb-8 text-4xl font-black leading-[1.2] tracking-tight text-[#10242a] md:text-5xl dark:text-[#edf3f5]">
              مسیر یادگیری
              <br />
              <span className="text-violet-600 dark:text-violet-400">تا استخدام حرفه‌ای</span>
            </h2>

            <p className="mb-10 text-lg leading-8 text-[#61727a] dark:text-[#93a5ac]">
              ما در نخستین فاصله‌ی بین آموزش و بازار کار را حذف کرده‌ایم. تمامی دوره‌ها بر اساس
              استانداردهای بین‌المللی طراحی شده‌اند تا شما در کوتاه‌ترین زمان وارد بازار کار شوید.
            </p>

            <div className="space-y-5">
              {[
                'مدرک رسمی فنی و حرفه‌ای قابل استعلام',
                'پشتیبانی اختصاصی تا روز آزمون',
                'معرفی مستقیم به پروژه‌های اجرایی',
              ].map((item) => (
                <div key={item} className="group flex items-center gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-violet-500/25 transition-colors group-hover:border-violet-500">
                    <div className="h-2 w-2 rounded-full bg-violet-500" />
                  </div>

                  <span className="font-bold text-[#23363d] dark:text-[#d8e3e6]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-5">
            {[
              {
                icon: Medal,
                title: 'رتبه برتر',
                sub: 'جزو آموزشگاه‌های نمونه کشور',
                color: 'text-amber-500 dark:text-amber-400',
              },
              {
                icon: Users,
                title: '+۳,۹۰۰',
                sub: 'دانش‌آموخته متخصص',
                color: 'text-violet-500 dark:text-violet-400',
              },
              {
                icon: Globe,
                title: '۱۸۷ کشور',
                sub: 'اعتبار بین‌المللی مدارک',
                color: 'text-sky-500 dark:text-sky-400',
              },
              {
                icon: Zap,
                title: 'استخدام سریع',
                sub: 'کوتاه‌ترین مسیر ورود به بازار کار',
                color: 'text-emerald-500 dark:text-emerald-400',
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
                <item.icon size={28} strokeWidth={1.8} className={`${item.color} mb-6`} />

                <h3 className="mb-2 text-2xl font-black text-[#10242a] dark:text-[#edf3f5]">
                  {item.title}
                </h3>

                <p className="leading-6 text-[#6b7b82] dark:text-[#8fa2aa]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#e6ecef] py-12 md:py-16 dark:border-[#26363d]">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black tracking-tight text-[#10242a] md:mb-12 md:text-4xl dark:text-[#edf3f5]">
            آرمان‌هایی که به آن{' '}
            <span className="text-violet-600 dark:text-violet-400">پایبندیم</span>
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
                  className={`
              mb-6
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              ${v.bg || 'bg-violet-100 dark:bg-violet-500/15'}
            `}
                >
                  <v.icon
                    size={20}
                    strokeWidth={1.7}
                    className={v.color || 'text-violet-600 dark:text-violet-400'}
                  />
                </div>

                <h3 className="mb-3 text-lg font-black text-[#10242a] dark:text-[#edf3f5]">
                  {v.title}
                </h3>

                <p className="leading-7 text-[#66757c] dark:text-[#93a5ac]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
    CERTIFICATIONS SECTION
══════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-[#e6ecef] dark:border-[#26363d]">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-8 md:p-16 overflow-hidden relative">
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
                  <span className="text-violet-600 dark:text-violet-400">مرز نمی‌شناسد</span>
                </h2>

                <div className="space-y-5">
                  {[
                    'تاییدیه مستقیم سازمان فنی و حرفه‌ای کشور تحت نظر وزارت کار',
                    'قابلیت ترجمه رسمی و بین‌المللی جهت مهاجرت کاری (ILO)',
                    'صدور کد استاندارد بین‌المللی هولوگرام‌دار مهارت',
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 text-[#61727a] dark:text-[#93a5ac]"
                    >
                      <CheckCircle
                        size={20}
                        className="text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                      />
                      <span className="font-bold text-[#23363d] dark:text-[#d8e3e6] text-sm md:text-base">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white dark:bg-[#1d2d33]/50 border border-[#e6ecef] dark:border-[#2b3b42] transition-colors"
                  >
                    <benefit.icon
                      size={24}
                      className={`${benefit.color || 'text-violet-500 dark:text-violet-400'} mb-4`}
                    />
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
    </div>
  );
}
