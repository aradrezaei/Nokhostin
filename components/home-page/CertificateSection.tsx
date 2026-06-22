'use client';

import { Award, Globe, Building2, Landmark, Plane, BookOpen } from 'lucide-react';

const certificateBenefits = [
  {
    title: 'مدرک رسمی',
    desc: 'صادر شده توسط سازمان آموزش فنی و حرفه‌ای کشور',
    icon: Award,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    ring: 'ring-violet-200 dark:ring-violet-800',
  },
  {
    title: 'بین‌المللی',
    desc: 'قابلیت ترجمه رسمی و معتبر در سراسر دنیا',
    icon: Globe,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    ring: 'ring-sky-200 dark:ring-sky-800',
  },
  {
    title: 'مهاجرت',
    desc: 'امتیاز مثبت در پرونده‌های مهاجرتی و کاری',
    icon: Plane,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    ring: 'ring-rose-200 dark:ring-rose-800',
  },
  {
    title: 'وام خوداشتغالی',
    desc: 'امکان دریافت وام‌های کم‌بهره کسب‌وکار',
    icon: Landmark,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    ring: 'ring-amber-200 dark:ring-amber-800',
  },
  {
    title: 'پروانه کسب',
    desc: 'مجوز رسمی برای راه‌اندازی کسب‌وکار مستقل',
    icon: Building2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
  },
  {
    title: 'اعتبار در رزومه',
    desc: 'تمایز حرفه‌ای در میان رقبا و بازار کار',
    icon: BookOpen,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    ring: 'ring-indigo-200 dark:ring-indigo-800',
  },
];

export default function CertificateSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* ── Layout: text right, items left ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24  items-start">
          {/* ── Sticky text column ── */}
          <div className=" lg:top-24 lg:w-96 flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug ">
              چرا مدرک ما
              <br />
              <span className="relative inline-block mt-1">
                ارزشمند است؟
                <span className="absolute -bottom-1 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
              </span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 ">
              <br />
              مجتمع فنی و حرفه‌ای «نخستین» افتخار دارد که دو نوع مدرک مجزا را به مهارت آموزان خود
              ارائه نماید:
              <br />
              1. <strong>مدرک داخلی:</strong> این مدرک به صورت رسمی توسط مجتمع فنی و حرفه‌ای
              «نخستین» صادر می‌گردد.
              <br />
              2. <strong>مدرک سازمان فنی و حرفه‌ای:</strong> این مجتمع، شما را به سازمان فنی و
              حرفه‌ای معرفی می‌نماید. آزمون مربوطه درنزدیک‌ترین شعبه محل سکونت شما برگزار خواهد شد.
              پس از موفقیت در آزمون، مدرک سازمان فنی و حرفه‌ای توسط آن مرجع صادر خواهد شد.
            </p>
          </div>

          {/* ── Benefits grid ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificateBenefits.map((item, i) => {
              const Icon = item.icon;
              // alternate card sizes for visual rhythm
              const isFeatured = i === 0 || i === 5;

              return (
                <div
                  key={i}
                  className={`
                    group relative flex gap-4 items-start
                    bg-white dark:bg-gray-900
                    border border-gray-100 dark:border-gray-800
                    hover:border-gray-200 dark:hover:border-gray-700
                    rounded-2xl p-3
                    transition-all duration-200
                    ${isFeatured ? 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-6' : ''}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                    flex-shrink-0 w-11 h-11 rounded-2xl
                    flex items-center justify-center
                    ring-1 ${item.ring} ${item.bg}
                  
                    ${isFeatured ? 'w-14 h-14 rounded-3xl' : ''}
                  `}
                  >
                    <Icon className={`${item.color} ${isFeatured ? 'w-7 h-7' : 'w-5 h-5'}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3
                        className={`font-bold text-gray-900 dark:text-white ${isFeatured ? 'text-base' : 'text-sm'}`}
                      >
                        {item.title}
                      </h3>
                      {isFeatured && (
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
                          ویژه
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* subtle number */}
                  <span className="absolute bottom-4 left-4 text-[11px] font-black text-gray-100 dark:text-gray-800 select-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
