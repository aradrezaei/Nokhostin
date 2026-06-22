'use client';

import {
  Shield,
  FileCheck,
  Scale,
  Globe,
  Video,
  Download,
  CheckCircle,
  AlertTriangle,
  Laptop,
  Headphones,
} from 'lucide-react';

export default function TermsPage() {
  const lastUpdate = '۱ اردیبهشت ۱۴۰۴';

  return (
    <>
      {/* هدر اصلی */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent dark:from-purple-950/20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-8 px-10 py-5 bg-purple-900/10 dark:bg-purple-900/20 border-2 border-purple-800/40 dark:border-purple-700/60 rounded-full">
            <Scale className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-bold text-xl">
              سند حقوقی رسمی — حضوری + آنلاین + ضبط‌شده
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
            شرایط و ضوابط استفاده
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
            معتبر برای تمام دوره‌های حضوری، آنلاین زنده و دوره‌های ضبط‌شده (VOD)
            <br />
            آخرین به‌روزرسانی:{' '}
            <span className="text-purple-700 dark:text-purple-400 font-bold">{lastUpdate}</span>
          </p>
        </div>
      </section>

      {/* مقدمه قدرتمند */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="flex justify-center gap-8 mb-8">
              <Laptop className="w-16 h-16 text-purple-600" />
              <Headphones className="w-16 h-16 text-purple-600" />
              <Globe className="w-16 h-16 text-purple-600" />
            </div>
            <p className="text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
              این توافق‌نامه بین شما (کاربر/دانشجو) و <strong>آموزشگاه فنی و حرفه‌ای نخستین</strong>
              <br />
              (دارای مجوز رسمی سازمان فنی و حرفه‌ای کشور به شماره ۱۲۳۴۵/ت/۸۷) منعقد می‌گردد و شامل
              تمام خدمات حضوری، آنلاین زنده و دوره‌های ضبط‌شده می‌باشد.
            </p>
          </div>
        </div>
      </section>

      {/* مواد اصلی */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-16">
            {/* ماده ۱ — تعاریف */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۱</span>
                تعاریف
              </h2>
              <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> «دوره حضوری» → کلاس‌های
                  برگزار شده در تهران
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> «دوره آنلاین زنده» →
                  کلاس‌های زنده از طریق پلتفرم آموزشگاه
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> «دوره ضبط‌شده (VOD)» →
                  ویدیوهای آموزشی قابل دانلود یا استریم
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> «پلتفرم» → وبسایت و
                  اپلیکیشن آموزشگاه نخستین
                </li>
              </ul>
            </div>

            {/* ماده ۲ — ثبت‌نام و پرداخت */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۲</span>
                ثبت‌نام و پرداخت
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> ثبت‌نام با پرداخت کامل یا
                  حداقل ۳۰٪ پیش‌پرداخت معتبر می‌شود
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> امکان پرداخت اقساطی تا ۶
                  قسط بدون سود (با چک یا سفته)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> استرداد وجه:
                  <ul className="mr-8 mt-2 space-y-2 text-base">
                    <li>• تا ۴۸ ساعت قبل از شروع: ۱۰۰٪ بازگشت</li>
                    <li>• تا ۷ روز پس از شروع: ۷۰٪ بازگشت (منهای هزینه جلسات برگزار شده)</li>
                    <li>• پس از ۷ روز: غیرقابل استرداد</li>
                  </ul>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" /> دوره‌های ضبط‌شده (VOD)
                  به هیچ عنوان قابل استرداد نیستند
                </li>
              </ul>
            </div>

            {/* ماده ۳ — دسترسی به محتوا (آنلاین و VOD) */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۳</span>
                دسترسی به دوره‌های آنلاین و ضبط‌شده
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Video className="w-6 h-6 text-purple-600 mt-1" /> دسترسی به دوره آنلاین زنده: تا
                  ۳۰ روز پس از آخرین جلسه
                </li>
                <li className="flex items-start gap-3">
                  <Download className="w-6 h-6 text-purple-600 mt-1" /> دسترسی به دوره ضبط‌شده:
                  <strong>۱۲ ماه کامل</strong> از تاریخ خرید (قابل تمدید با پرداخت هزینه)
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" /> دانلود، اشتراک‌گذاری، فروش
                  مجدد یا پخش عمومی ویدیوها کاملاً ممنوع و پیگرد قانونی دارد
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" /> هر اکانت فقط روی{' '}
                  <strong>۲ دستگاه</strong> همزمان قابل استفاده است
                </li>
              </ul>
            </div>

            {/* ماده ۴ — مدرک و آزمون */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۴</span>
                مدرک رسمی فنی و حرفه‌ای
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> فقط دوره‌های حضوری و
                  آنلاین زنده مشمول آزمون و مدرک رسمی هستند
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" /> دوره‌های ضبط‌شده (VOD)
                  مدرک رسمی ندارند — گواهی پایان دوره دیجیتال صادر می‌شود
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> آزمون حضوری در مراکز رسمی
                  فنی و حرفه‌ای برگزار می‌شود
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> در صورت مردودی: یک بار
                  آزمون مجدد رایگان
                </li>
              </ul>
            </div>

            {/* ماده ۵ — تعهدات آموزشگاه */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-12">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۵</span>
                تعهدات آموزشگاه
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-purple-600 mt-1" /> برگزاری کلاس طبق برنامه
                  اعلام‌شده
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-purple-600 mt-1" /> پشتیبانی ۲۴ ساعته از طریق تیکت
                  و تلفن
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-purple-600 mt-1" /> آپدیت رایگان دوره‌های ضبط‌شده
                  تا ۲ سال
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-purple-600 mt-1" /> حفظ کامل امنیت اطلاعات شخصی و
                  پرداخت
                </li>
              </ul>
            </div>

            {/* ماده ۶ — قوانین عمومی */}
            <div>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
                <span className="text-purple-700 dark:text-purple-400">ماده ۶</span>
                قوانین عمومی و ممنوعات
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" /> هرگونه کپی، دانلود، فروش
                  مجدد یا اشتراک‌گذاری محتوا پیگرد قانونی دارد (ماده ۷۴ قانون تجارت الکترونیک)
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" /> استفاده از اکانت مشترک
                  ممنوع — منجر به مسدودی دائم می‌شود
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" /> توهین، تبلیغات یا رفتار
                  نامناسب = اخراج بدون بازگشت وجه
                </li>
              </ul>
            </div>
          </div>

          {/* پذیرش نهایی — خیلی قوی */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-16 text-center text-white shadow-2xl">
            <CheckCircle className="w-24 h-24 mx-auto mb-8" />
            <h3 className="text-4xl font-black   mb-6">
              با خرید یا ثبت‌نام در هر یک از دوره‌های آموزشگاه نخستین
              <br />
              (حضوری، آنلاین زنده یا ضبط‌شده)
            </h3>
            <p className="text-2xl font-bold">
              شما تمامی شرایط و ضوابط فوق را مطالعه کرده و به‌طور کامل می‌پذیرید.
            </p>
            <p className="mt-8 text-lg opacity-90">
              این سند دارای اعتبار قانونی بوده و در مراجع قضایی قابل استناد است.
            </p>
          </div>

          {/* امضا */}
          <div className="mt-16 text-center text-gray-500 dark:text-gray-400 space-y-2">
            <p className="text-lg">واحد حقوقی آموزشگاه فنی و حرفه‌ای نخستین</p>
            <p>مجوز رسمی سازمان فنی و حرفه‌ای کشور • شماره: ۱۲۳۴۵/ت/۸۷</p>
            <p className="text-sm">آخرین به‌روزرسانی: {lastUpdate}</p>
          </div>
        </div>
      </section>
    </>
  );
}
