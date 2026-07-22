import Link from 'next/link';
import { ArrowLeft, BookOpen, Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <section
      dir="rtl"
      className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[180px] font-bold leading-none text-slate-200/50 dark:text-slate-800/40 sm:text-[280px]"
        aria-hidden="true"
      >
        ۴۰۴
      </div>

      <div className="relative mx-auto w-full max-w-2xl text-center">
        <div className="rounded-2xl border border-slate-200 bg-white/95 px-6 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:px-12 sm:py-14">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300">
            خطای ۴۰۴
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-none text-slate-900 dark:text-white sm:text-7xl">
            ۴۰۴
          </h1>
          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            صفحه مورد نظر پیدا نشد
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
            ممکن است نشانی صفحه تغییر کرده باشد یا صفحه‌ای که به دنبال آن هستید دیگر در دسترس نباشد.
          </p>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-violet-300 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-700 dark:hover:text-violet-300"
            >
              <BookOpen className="h-4 w-4" />
              مشاهده دوره‌ها
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700"
            >
              <Home className="h-4 w-4" />
              بازگشت به صفحه اصلی
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
            >
              <Phone className="h-3.5 w-3.5" />
              برای راهنمایی با ما تماس بگیرید
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
