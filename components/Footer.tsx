import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { label: 'خانه', href: '/' },
    { label: 'همه دوره‌ها', href: '/courses' },
    { label: 'انواع دوره ها', href: '/course-types' },
    { label: 'اساتید', href: '/teachers' },
    { label: 'درباره ما', href: '/about' },
    { label: 'بلاگ', href: '/blog' },
    { label: 'تماس با ما', href: '/contact' },
  ];

  const categories = [
    'برنامه‌نویسی',
    'هوش مصنوعی',
    'طراحی گرافیک',
    'رباتیک',
    'موسیقی',
    'مهارت‌های مالی',
    'هنرهای دستی',
    'عکاسی',
  ];

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800">
      <div className="relative max-w-7xl   mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* links */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
              لینک‌های سریع
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300" // فقط کلاس‌های مربوط به رنگ و transition حذف شدند
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* categroies */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
              دسته‌بندی دوره‌ها
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500 rounded-full" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href="/categories"
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-white/5 px-4 py-2 rounded-lg text-sm  border border-slate-200 dark:border-white/10 hover:border-purple-400/50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* contact */}
          <div className="space-y-6 ">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
              تماس با ما
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500 rounded-full" />
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl  border border-purple-300 dark:border-purple-500/30">
                  <svg
                    className="w-5 h-5  text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">تلفن پشتیبانی</p>
                  <p className="font-semibold text-slate-900 dark:text-white">021-65565004</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl lg border border-blue-300 dark:border-blue-500/30">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>{' '}
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">ایمیل</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    info@nakhostin.academy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl border border-indigo-300 dark:border-indigo-500/30">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>{' '}
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">آدرس</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    تهران، اندیشه، فاز ۱، نرسیده به شاهد غربی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 mb-8   h-px bg-slate-200 dark:bg-slate-800  rounded-2xl" />

        {/* end */}
        <div className="flex flex-col justify-center text-center items-center gap-4 text-sm text-slate-600 dark:text-slate-500">
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              حریم خصوصی
            </Link>
            <Link
              href="/terms"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              شرایط استفاده
            </Link>
            <Link
              href="/faq"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              سوالات متداول
            </Link>
          </div>
          <p>©آموزشگاه آزاد فنی و حرفه ای نخستین • تمام حقوق محفوظ است</p>
        </div>
      </div>
    </footer>
  );
}
