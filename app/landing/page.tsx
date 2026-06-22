'use client';

import { useState } from 'react';
import {
  Sparkles,
  Phone,
  ArrowLeft,
  Check,
  Users,
  Target,
  Play, // برای دوره آنلاین
  Building2, // برای دوره حضوری
  Clock, // برای انعطاف‌پذیری
  Network, // برای شبکه سازی
  GraduationCap, // برای مدرک
} from 'lucide-react';
import Categories from '@/components/home-page/Categories';
import CertificateSection from '@/components/home-page/CertificateSection';
import CourseSection from '@/components/home-page/CourseSection';
import FAQ from '@/components/ui/FAQ';

export default function LandingPage() {
  const myFaqs = [
    { q: 'آیا مدرک معتبر است؟', a: 'بله، مدرک فنی و حرفه‌ای بین‌المللی صادر می‌شود.' },
    { q: 'امکان پرداخت قسطی؟', a: 'بله، در ۳ قسط بدون بهره.' },
    // ... بقیه سوالات
  ];

  const [loading, setLoading] = useState(false);

  // لیست مزایای دوره‌ها
  const onlineCourseBenefits = [
    { icon: Clock, text: 'ساعت زمانی های مختلف' },
    { icon: Play, text: '' },
    { icon: Target, text: 'صرفه‌جویی در هزینه' },
    { icon: GraduationCap, text: 'یادگیری از هر کجا' },
  ];

  const inPersonCourseBenefits = [
    { icon: Building2, text: 'محیط یادگیری پویا' },
    { icon: Network, text: 'شبکه‌سازی با اساتید و هم‌دوره‌ها' },
    { icon: Users, text: 'تعامل مستقیم و پرسش و پاسخ' },
    { icon: Target, text: 'تمرکز بالا بدون حواس‌پرتی' },
  ];

  // لیست آمارهای کلیدی
  const stats = [
    { icon: Users, title: '۸۵۰۰+', desc: 'دانشجوی موفق' },
    { icon: Target, title: 'پشتیبانی تا استخدام', desc: 'کنار شما تا رسیدن به قرارداد' },
    { icon: GraduationCap, title: 'مدرک معتبر', desc: 'قابل ترجمه و بین‌المللی' },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>مسیر حرفه‌ای شدنت از همین‌جا شروع میشه.</span>
          </div>

          <h1 className="text-7xl md:text-8xl  font-black mb-8 leading-[1.1] tracking-tight">
            هوشمند یاد بگیر، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-500">
              سریعتر کار پیدا کن!
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            دیگه نباید وقت تلف بکنی, خیلی سریع تو حوضه ای که دوست داری میتونی متخصص بشی.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl text-lg hover:shadow-2xl hover:scale-105 transition-all">
              ثبت‌نام در دوره‌ها
            </button>
            <button className="px-8 py-5 bg-blue-600 text-white font-bold rounded-2xl text-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              دریافت مشاوره سریع و رایگان
            </button>
          </div>
        </div>
      </section>

      <CourseSection />
      <CertificateSection />
      <Categories />

      <FAQ
        items={myFaqs}
        title="سوالات متداول"
        accentColor="blue" // می‌توانید برای هر صفحه رنگ را عوض کنید (purple, blue, rose, etc)
      />

      {/* Trust & Stats Section */}
      <section className="py-24 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {stats.map((item, i) => (
              <div key={i} className="space-y-4">
                <item.icon className="w-12 h-12 mx-auto text-blue-500 p-2 rounded-full bg-blue-100 dark:bg-blue-900" />
                <h3 className="text-3xl font-black">{item.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy & Experience Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-black border-b border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-5xl font-black mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            ۲۴ سال تجربه، افتخار آفرینی مستمر
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-8">
            از سال ۱۳۸۱، با تعهد به کیفیت و نوآوری، مسیر هزاران متخصص را هموار کرده‌ایم.
          </p>
          <div className="flex justify-center items-center gap-4">
            {/* می‌تونید اینجا لوگوی قدیمی یا نمادی از قدمت رو اضافه کنید */}
            <span className="text-5xl font-black text-blue-600 dark:text-blue-400">۱۳۸۱</span>
            <span className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              <ArrowLeft className="w-8 h-8 inline-block rotate-180" /> تا کنون
            </span>
          </div>
        </div>
      </section>

      {/* Final Call to Action / Contact */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-slate-900 dark:to-black">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-6xl font-black leading-tight mb-6">
            آماده‌ای تا آینده شغلی خودت رو بسازی؟
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            همین امروز اولین قدم رو بردار. تیم پشتیبانی ما آماده است تا به تمام سوالاتت پاسخ بده و
            بهترین مسیر رو بهت پیشنهاد کنه.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#courses"
              className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl text-lg hover:shadow-2xl hover:scale-105 transition-all transform duration-300 ease-in-out"
            >
              انتخاب دوره و شروع یادگیری
            </a>
            <button
              onClick={() => setLoading(true)} // یا باز کردن مودال تماس
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              درخواست مشاوره رایگان
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
