'use client'; // این خط برای Client Component بودن ضروری است، مشابه صفحه اصلی شما.

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Award,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Globe,
  GraduationCap,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
  TrendingUp,
  ChevronLeft,
  BookOpen,
} from 'lucide-react';

export default function WhyVocationalCertificatePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade-up animations for various elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    document.querySelectorAll('.animate-fade-up').forEach((el) => {
      observer.observe(el);
    });

    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 text-center py-20"
      >
        {/* Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
          <Award className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 dark:text-yellow-400 mx-auto mb-6 animate-fade-in-down" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-slate-900 dark:text-white mb-6 animate-fade-up opacity-0 translate-y-12">
            چرا مدرک فنی و حرفه‌ای نخستین،
            <br className="hidden sm:inline" />{' '}
            <span className="text-blue-600 dark:text-blue-400">گامی مطمئن به سوی آینده شغلی</span>{' '}
            شماست؟
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-up opacity-0 translate-y-12 animation-delay-300">
            با مدرک فنی و حرفه‌ای نخستین، تنها یک دوره آموزشی نمی‌گذرانید؛ بلکه{' '}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              اعتباری ملی و بین‌المللی
            </span>
            ،<span className="font-bold text-emerald-600 dark:text-emerald-400">مهارت کاربردی</span>{' '}
            و<span className="font-bold text-blue-600 dark:text-blue-400">مسیر روشن استخدام</span>{' '}
            را برای خود تضمین می‌کنید.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 translate-y-12 animation-delay-600">
            <a
              href="/courses"
              className="group px-7 py-4 sm:px-9 sm:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <span>مشاهده دوره‌های تخصصی</span>
              <ChevronLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:02165565004"
              className="px-7 py-4 sm:px-9 sm:py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-base sm:text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>مشاوره رایگان بگیرید</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why Our Vocational Certificate? - Key Benefits */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-fade-up opacity-0 translate-y-12" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 animate-fade-up opacity-0 translate-y-12 animation-delay-100">
              اعتباری بی‌بدیل، مهارتی کاربردی، <br />{' '}
              <span className="text-purple-600 dark:text-purple-400">آینده‌ای تضمین‌شده</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto animate-fade-up opacity-0 translate-y-12 animation-delay-200">
              مدارک فنی و حرفه‌ای ما، فراتر از یک گواهینامه، <br className="sm:hidden" /> دروازه‌ای
              به سوی تخصص و اشتغال پایدار است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                icon: Shield,
                title: 'اعتبار ملی و بین‌المللی',
                description:
                  'مدارک ما مورد تایید سازمان آموزش فنی و حرفه‌ای کشور بوده و قابل ترجمه و ارائه در سایر کشورهاست، که در پروسه‌های مهاجرت یا استخدام در خارج از کشور، امتیاز ویژه‌ای به شما می‌دهد.',
                color: 'blue',
              },
              {
                icon: Briefcase,
                title: 'مهارت‌آموزی کاملاً عملی',
                description:
                  'برخلاف آموزش‌های صرفاً تئوری، تمرکز ما بر پروژه‌های عملی و واقعی بازار کار است. آنچه یاد می‌گیرید، بلافاصله قابل پیاده‌سازی و درآمدزایی است.',
                color: 'purple',
              },
              {
                icon: TrendingUp,
                title: 'افزایش چشمگیر فرصت‌های شغلی',
                description:
                  'داشتن مدرک فنی و حرفه‌ای، شانس استخدام شما را در شرکت‌های معتبر و حتی فعالیت‌های کارآفرینانه به شدت افزایش می‌دهد. کارفرمایان به دنبال افراد با مهارت عملی و گواهینامه معتبر هستند.',
                color: 'emerald',
              },
              {
                icon: Users,
                title: 'اساتید مجرب و با سابقه صنعت',
                description:
                  'آموزش توسط اساتیدی انجام می‌شود که خودشان سال‌ها تجربه کار در صنعت مرتبط را دارند. این یعنی یادگیری از بهترین‌ها و انتقال دانش و تجربیات واقعی.',
                color: 'rose',
              },
              {
                icon: Clock,
                title: 'کوتاه‌ترین مسیر به تخصص و درآمد',
                description:
                  'برنامه‌های آموزشی فشرده و هدفمند ما، شما را در کمترین زمان ممکن به یک متخصص تبدیل می‌کند تا زودتر وارد بازار کار شوید و کسب درآمد کنید.',
                color: 'indigo',
              },
              {
                icon: Globe,
                title: 'قابلیت کارآفرینی و استقلال شغلی',
                description:
                  'با مهارت‌های کسب شده و گواهینامه معتبر، شما نه تنها می‌توانید در شرکت‌ها استخدام شوید، بلکه امکان راه‌اندازی کسب و کار خود و کارآفرینی را نیز خواهید داشت.',
                color: 'orange',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const bgColorClass = `bg-gradient-to-br from-${item.color}-500 to-${item.color}-700`;
              const ringColorClass = `ring-${item.color}-300/50 dark:ring-${item.color}-700/50`;
              return (
                <div
                  key={i}
                  className="group bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500  animate-fade-up opacity-0 "
                  style={{ animationDelay: `${i * 100 + 300}ms` }}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${bgColorClass} flex items-center justify-center mb-4 sm:mb-6 shadow-lg ring-4 ${ringColorClass} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Unique Advantage - Distinguishing Factor */}
      <section className="py-16 sm:py-24 lg:py-32 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-right animate-fade-up opacity-0 translate-y-12">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 dark:text-yellow-400 mx-auto lg:mx-0 mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                آنچه{' '}
                <span className="text-purple-600 dark:text-purple-400">مدرک فنی و حرفه‌ای ما</span>{' '}
                را از رقبا متمایز می‌کند
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                در بازار امروز، گواهینامه‌های بسیاری وجود دارد. اما مدرک فنی و حرفه‌ای نخستین، از
                چند جهت دارای{' '}
                <span className="font-bold text-blue-600 dark:text-blue-400">اعتباری بی‌رقیب</span>{' '}
                و{' '}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  تضمینی برای آینده
                </span>{' '}
                شماست.
              </p>

              <ul className="space-y-4 text-right pr-4 sm:pr-0">
                <li className="flex items-start gap-3 sm:gap-4 text-slate-800 dark:text-slate-200 animate-fade-up opacity-0 translate-y-12 animation-delay-100">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-base sm:text-lg font-bold">تاییدیه رسمی دولتی:</span>
                  <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
                    {' '}
                    مورد تایید سازمان فنی و حرفه‌ای کشور، مرجع اصلی اعتبارسنجی مهارت در ایران.
                  </span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4 text-slate-800 dark:text-slate-200 animate-fade-up opacity-0 translate-y-12 animation-delay-200">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-base sm:text-lg font-bold">استانداردهای آموزشی ملی:</span>
                  <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
                    {' '}
                    محتوای دوره‌ها بر اساس سرفصل‌های مصوب سازمان فنی و حرفه‌ای طراحی شده‌اند، نه
                    صرفاً تجربیات یک موسسه.
                  </span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4 text-slate-800 dark:text-slate-200 animate-fade-up opacity-0 translate-y-12 animation-delay-300">
                  <Code className="w-6 h-6 sm:w-7 sm:h-7 text-purple-500 flex-shrink-0 mt-1" />
                  <span className="text-base sm:text-lg font-bold">ارزیابی مستقل و معتبر:</span>
                  <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
                    {' '}
                    آزمون‌های پایان دوره تحت نظارت سازمان فنی و حرفه‌ای برگزار شده و مدرک شما بر
                    اساس یک ارزیابی استاندارد و بی‌طرفانه صادر می‌شود.
                  </span>
                </li>
                <li className="flex items-start gap-3 sm:gap-4 text-slate-800 dark:text-slate-200 animate-fade-up opacity-0 translate-y-12 animation-delay-400">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-base sm:text-lg font-bold">قابلیت استعلام و پیگیری:</span>
                  <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
                    {' '}
                    هر مدرک دارای کد رهگیری ملی است که کارفرمایان می‌توانند از صحت آن استعلام
                    بگیرند. این ویژگی باعث تمایز آشکار از گواهینامه‌های غیررسمی می‌شود.
                  </span>
                </li>
              </ul>
            </div>

            {/* Image/Illustration */}
            <div className="flex justify-center animate-fade-in-left opacity-0 translate-x-12 animation-delay-600">
              <Image
                src="/images/vocational-advantage.svg" // یک تصویر مناسب (SVG) برای این بخش اضافه کنید
                alt="Vocational Certificate Advantage"
                width={600}
                height={600}
                className="w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
                priority // برای بارگذاری سریع‌تر
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Reusing HomePage component for consistency */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4 animate-fade-up opacity-0 translate-y-12" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 animate-fade-up opacity-0 translate-y-12 animation-delay-100">
              باور ندارید؟{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                از زبان موفق‌ها بشنوید!
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 animate-fade-up opacity-0 translate-y-12 animation-delay-200">
              دانشجویانی که با مدارک فنی و حرفه‌ای ما، مسیر شغلی خود را متحول کردند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'سارا امینی',
                role: 'توسعه‌دهنده فرانت‌اند',
                company: 'شرکت فناوری موج',
                image: '👩‍💻',
                text: 'بعد از گرفتن مدرک برنامه‌نویسی فنی و حرفه‌ای از نخستین، ظرف یک ماه تونستم در یک شرکت خوب استخدام بشم. اعتبار مدرک و مهارت‌های عملی واقعا کمکم کرد.',
                rating: 5,
              },
              {
                name: 'رضا کمالی',
                role: 'مدیر پروژه (ساختمان)',
                company: 'عمران سازه نوین',
                image: '👷',
                text: 'با مدرک مدیریت پروژه نخستین، تونستم ارتقای شغلی بگیرم و مسئولیت پروژه‌های بزرگتری را عهده‌دار بشم. دید عملی و استانداردهای آموزشی بی‌نظیر بود.',
                rating: 5,
              },
              {
                name: 'نازنین عبادی',
                role: 'کارآفرین دیجیتال',
                company: 'استودیو طراحی آنلاین',
                image: '✨',
                text: 'مدرک گرافیک فنی و حرفه‌ای نخستین به من این اعتماد به نفس رو داد که کسب و کار خودم رو راه‌اندازی کنم. الان چند نفر هم زیرمجموعه دارم. واقعا ممنونم!',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-up opacity-0 translate-y-12"
                style={{ animationDelay: `${i * 150 + 300}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3 sm:mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Reusing HomePage component for consistency */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <div className="mb-8 sm:mb-10 animate-fade-up opacity-0 translate-y-12">
            <Rocket className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              آینده شغلی شما در انتظار است!
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              همین امروز با یک مدرک معتبر و مهارتی کاربردی، آینده خود را تضمین کنید.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 animate-fade-up opacity-0 translate-y-12 animation-delay-300">
            <a
              href="/courses"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-blue-900 font-bold rounded-xl text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
            >
              <span>مشاهده دوره‌های فنی و حرفه‌ای</span>
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </a>

            <a
              href="tel:02165565004"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white font-bold rounded-xl text-base sm:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>مشاوره رایگان دریافت کنید</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm opacity-75 animate-fade-up opacity-0 translate-y-12 animation-delay-600">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>آموزش استاندارد و معتبر</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>مدرک قابل ترجمه بین‌المللی</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>مهارت برای اشتغال پایدار</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
