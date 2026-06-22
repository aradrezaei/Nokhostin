'use client';

import Link from 'next/link';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600/20 dark:bg-purple-500/10 blur-3xl rounded-full w-64 h-64 mx-auto" />
          <div className="relative">
            <AlertCircle className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-purple-600 dark:text-purple-400 mx-auto animate-pulse" />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white">
            ۴۰۴
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
            صفحه مورد نظر یافت نشد
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed px-4">
            متأسفانه آدرس وارد شده صحیح نیست یا صفحه حذف شده است.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center pt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-purple-700 hover:bg-purple-800 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Home className="w-6 h-6 group-hover:scale-110 transition" />
            بازگشت به خانه
          </Link>

          <Link
            href="/courses"
            className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white dark:bg-gray-800 border-4 border-purple-700 dark:border-purple-600 text-purple-700 dark:text-purple-400 rounded-2xl font-bold text-base sm:text-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Search className="w-6 h-6" />
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}
