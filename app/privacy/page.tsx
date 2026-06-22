'use client';

import {
  Shield,
  Lock,
  CheckCircle,
  FileText,
  EyeOff,
  Database,
  Users,
  AlertCircle,
  Award,
  Mail,
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      {/* هدر صفحه */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent dark:from-purple-950/20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-8 px-10 py-5 bg-purple-900/10 dark:bg-purple-900/20 border-2 border-purple-800/40 dark:border-purple-700/60 rounded-full">
            <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-bold text-xl">
              امنیت اطلاعات شما اولویت ماست
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
            حریم خصوصی و امنیت اطلاعات
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
            آموزشگاه نخستین متعهد به حفاظت کامل از اطلاعات شخصی شماست
            <br />
            آخرین به‌روزرسانی: ۱ اردیبهشت ۱۴۰۴
          </p>
        </div>
      </section>

      {/* مقدمه */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-200 dark:border-gray-700">
            <Lock className="w-20 h-20 text-purple-600 mx-auto mb-6" />
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              ما در آموزشگاه نخستین، حفاظت از حریم خصوصی شما را نه تنها یک الزام قانونی، بلکه یک{' '}
              <strong className="text-purple-700 dark:text-purple-400">تعهد اخلاقی</strong>{' '}
              می‌دانیم. اطلاعات شما نزد ما کاملاً امن و محفوظ است.
            </p>
          </div>
        </div>
      </section>

      {/* بخش‌های اصلی */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-16">
            {/* ۱. اطلاعات جمع‌آوری شده */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <FileText className="w-8 h-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    اطلاعات جمع‌آوری شده
                  </h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>ما فقط اطلاعات ضروری برای ارائه خدمات آموزشی را جمع‌آوری می‌کنیم:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" /> نام و نام
                    خانوادگی
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" /> شماره تماس
                    و ایمیل
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" /> مدرک
                    تحصیلی و سابقه شغلی (در صورت نیاز)
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" /> اطلاعات
                    پرداخت (فقط از طریق درگاه‌های بانکی معتبر)
                  </li>
                </ul>
                <p className="text-purple-700 dark:text-purple-400 font-semibold">
                  هیچ‌گونه اطلاعات حساس مانند شماره ملی، شماره کارت یا رمز عبور جمع‌آوری نمی‌شود.
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            {/* ۲. استفاده از اطلاعات */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <Users className="w-8 h-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    استفاده از اطلاعات
                  </h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>اطلاعات شما فقط برای اهداف زیر استفاده می‌شود:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> ثبت‌نام در دوره‌های
                    آموزشی
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> ارسال اطلاع‌رسانی
                    کلاس‌ها و آزمون‌ها
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> صدور مدرک رسمی فنی و
                    حرفه‌ای
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> ارائه پشتیبانی آموزشی
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            {/* ۳. امنیت اطلاعات */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <Database className="w-8 h-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    امنیت و حفاظت
                  </h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" /> تمام ارتباطات با
                    پروتکل HTTPS رمزنگاری شده
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" /> ذخیره‌سازی
                    اطلاعات در سرورهای امن داخل ایران
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" /> دسترسی محدود
                    پرسنل (فقط افراد مجاز)
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" /> پشتیبان‌گیری
                    روزانه و رمزنگاری شده
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" /> عدم اشتراک‌گذاری
                    اطلاعات با هیچ شخص یا سازمان ثالث
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-800" />

            {/* ۴. کوکی‌ها */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <EyeOff className="w-8 h-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    کوکی‌ها و ردیابی
                  </h3>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>ما فقط از کوکی‌های ضروری استفاده می‌کنیم:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> ذخیره تم دارک/لایت
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" /> نگهداری اطلاعات ورود (در
                    صورت انتخاب)
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" /> هیچ کوکی تبلیغاتی یا
                    ردیابی شخص ثالث استفاده نمی‌شود
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* تعهد نهایی */}
      <section className="py-24 bg-purple-700 dark:bg-purple-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <Shield className="w-24 h-24 text-white mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">تعهد ما به شما</h2>
            <p className="text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto">
              آموزشگاه نخستین از سال ۱۳۸۱ تا امروز، با افتخار اطلاعات بیش از ۱۰۰٬۰۰۰ دانشجو را با
              بالاترین استانداردهای امنیتی حفظ کرده است و هیچ‌گونه نقض امنیتی نداشته‌ایم.
            </p>
            <div className="mt-12 inline-flex items-center gap-4 px-10 py-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <Award className="w-12 h-12 text-yellow-400" />
              <span className="text-xl font-bold text-white">۲۳ سال بدون نقض امنیت اطلاعات</span>
            </div>
          </div>
        </div>
      </section>

      {/* تماس در صورت نگرانی */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            در صورت هرگونه سوال یا نگرانی در مورد حریم خصوصی، با مسئول حفاظت داده‌های ما تماس
            بگیرید:
          </p>
          <div className="mt-8 inline-flex items-center gap-4 px-8 py-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Mail className="w-6 h-6 text-purple-700 dark:text-purple-400" />
            <a
              href="mailto:privacy@nakhostin.academy"
              className="text-xl font-bold text-purple-700 dark:text-purple-400"
            >
              privacy@nakhostin.academy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
