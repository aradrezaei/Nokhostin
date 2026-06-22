'use client';
import { useState } from 'react';
import { Check, X, Users, Video, Zap, Shield, Sparkles } from 'lucide-react';

const comparisons = [
  { f: 'شهریه پرداختی', online: 'اقتصادی (۳۰٪ کمتر)', حضوری: 'استاندارد' },
  { f: 'هزینه رفت‌وآمد', online: 'صفر', حضوری: 'بسته به مسافت' },
  { f: 'مدرک فنی‌حرفه‌ای', online: 'یکسان', حضوری: 'یکسان' },
  { f: 'زمان شروع دوره', online: 'سریع (۸ روزه)', حضوری: 'بسته به ظرفیت' },
  { f: 'تعامل با استاد', online: 'آنلاین/چت', حضوری: 'چهره به چهره' },
  { f: 'تمرکز محیطی', online: 'محیط خانه', حضوری: 'محیط کارگاهی' },
  { f: 'دسترسی به ویدیو', online: 'دارد (بازپخش)', حضوری: 'ندارد' },
  { f: 'رفع اشکال', online: 'گروه اختصاصی', حضوری: 'لحظه‌ای' },
  { f: 'پروژه عملی', online: 'دریافت توسط استاد', حضوری: 'نظارت مستقیم' },
  { f: 'شبکه‌سازی شغلی', online: 'آنلاین', حضوری: 'عالی/حضوری' },
  { f: 'مناسب شاغلین', online: 'بسیار بالا', حضوری: 'متوسط' },
  { f: 'انعطاف زمانی', online: 'بالا', حضوری: 'ثابت' },
  { f: 'تجهیزات فنی', online: 'سیستم شخصی', حضوری: 'آموزشگاه' },
  { f: 'محیط آرام', online: 'دلخواه', حضوری: 'اشتراکی' },
  { f: 'امکان دانلود فایل‌ها', online: 'دارد', حضوری: 'حضوری' },
  { f: 'پشتیبانی فنی', online: '۲۴/۷', حضوری: 'ساعات کاری' },
  { f: 'آزمون نهایی', online: 'حضوری در تهران', حضوری: 'حضوری' },
  { f: 'تعداد جلسات', online: 'دقیق و منظم', حضوری: 'دقیق و منظم' },
  { f: 'آپدیت محتوا', online: 'فوری', حضوری: 'مبتنی بر سیلابس' },
  { f: 'حس یادگیری', online: 'مدرن', حضوری: 'کلاسیک' },
];

export default function ProfessionalComparison() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">
            کدوم روش برات بهتره؟
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            مقایسه ریزبینانه برای انتخاب بهترین مسیر یادگیری
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800 p-6 font-black text-slate-900 dark:text-white text-center border-b border-slate-100 dark:border-slate-600">
            <div>شاخص</div>
            <div className="text-slate-500">حضوری</div>

            <div className="text-blue-600">آنلاین زنده</div>
          </div>

          {/* Body Rows */}
          {comparisons.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 p-6 text-center border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900"
            >
              {' '}
              <div className="font-bold text-slate-700 dark:text-slate-300">{row.f}</div>
              <div className="font-medium text-slate-700 dark:text-slate-300">{row.حضوری}</div>
              <div className="font-medium text-blue-600 dark:text-white">{row.online}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <button className="p-8 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            ثبت‌نام دوره آنلاین زنده
          </button>
          <button className="p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-xl hover:bg-slate-800 border border-slate-700">
            ثبت‌نام دوره حضوری
          </button>
        </div>
      </div>
    </main>
  );
}
