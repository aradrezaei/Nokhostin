'use client';

import React from 'react';
import { Users, Code, BookOpen, Award, Clock, ChevronLeft } from 'lucide-react';

// ─── HERO COMPONENT ────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      className="relative bg-[#0B1120] text-slate-200 font-sans pt-16 pb-8 overflow-hidden"
      dir="rtl"
    >
      {/* ─── BACKGROUND EFFECTS ─────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* ─── MAIN HERO CONTENT (Grid Layout) ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center pt-8 pb-20">
          {/* ─── RIGHT COLUMN (Text & Actions) ─── */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] tracking-tight">
                برنامه‌نویسی پایتون مقدماتی
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                زبان پایتون را از پایه به شکل اصولی و مهندسی‌شده بیاموزید و برای ورود به بازار کار
                نرم‌افزار آماده شوید.
              </p>
            </div>

            {/* Action Buttons (بدون قیمت) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="flex-1 md:flex-none min-w-[180px] bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-8 py-4 rounded-xl text-sm font-black transition-all shadow-lg shadow-cyan-500/10 active:scale-95 flex justify-center items-center gap-2">
                شروع یادگیری
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="flex-1 md:flex-none min-w-[180px] border border-slate-700 bg-[#161C2D]/50 hover:bg-[#1e2532] text-slate-300 px-8 py-4 rounded-xl text-sm font-bold transition-all active:scale-95 flex justify-center items-center">
                مشاوره رایگان
              </button>
            </div>
          </div>

          {/* ─── LEFT COLUMN (Visual/Stats Card) ─── */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            {/* Main Stats Card */}
            <div className="relative w-full max-w-sm bg-[#161C2D] border border-slate-800 rounded-2xl p-8 shadow-2xl">
              {/* Decorative top shape */}
              <div className="absolute -top-12 -right-8 opacity-50 pointer-events-none">
                <div className="w-40 h-24 bg-slate-800 rounded-xl flex items-center justify-center rotate-12">
                  <Code className="w-10 h-10 text-slate-600" />
                </div>
              </div>

              <div className="space-y-6 relative z-10 pt-4">
                {/* Stat Row 1 */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                  <span className="text-slate-400 font-bold text-sm">کدآموز</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-lg">+۴۷۴۰</span>
                    <Users className="w-5 h-5 text-slate-500" />
                  </div>
                </div>

                {/* Stat Row 2 */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
                  <span className="text-slate-400 font-bold text-sm">تمرین عملی</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-lg">+۱۰۵</span>
                    <Code className="w-5 h-5 text-slate-500" />
                  </div>
                </div>

                {/* Stat Row 3 */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-sm">درسنامه آموزشی</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-lg">+۱۱۰</span>
                    <BookOpen className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* ─── FLOATING BADGES ─── */}
              <div className="absolute -bottom-5 -right-4 md:-right-8 bg-[#1e2532] border border-slate-700/80 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-md">
                <Award className="w-5 h-5 text-slate-300" />
                <span className="text-xs font-bold text-slate-200">
                  به همراه گواهی معتبر آکادمی نخستین
                </span>
              </div>

              <div className="absolute -bottom-20 md:-bottom-8 -left-4 md:-left-12 bg-[#1A202C] border border-slate-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-300">۹۰ روز مهلت گذراندن دوره</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM FEATURES BAR ────────────────────────────────── */}
        <div className="mt-12 md:mt-20 pt-10 border-t border-slate-800/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-x-reverse divide-slate-800/50">
            <div className="text-center px-4 space-y-3">
              <h3 className="text-2xl font-black text-white">مناسب‌ترین</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                زبان برای شروع یادگیری
                <br />
                برنامه‌نویسی
              </p>
            </div>

            <div className="text-center px-4 space-y-3">
              <h3 className="text-2xl font-black text-white">رتبه دوم</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                پراستفاده‌ترین زبان برنامه‌نویسی
                <br />
                در سال ۲۰۲۱
              </p>
            </div>

            <div className="text-center px-4 space-y-3">
              <h3 className="text-2xl font-black text-white">پرکاربردترین</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                زبان برنامه‌نویسی در رشته‌های
                <br />
                فنی و مهندسی
              </p>
            </div>

            <div className="text-center px-4 space-y-3">
              <h3 className="text-2xl font-black text-white">٪۳۸ رشد</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                تعداد برنامه‌نویسان پایتون از سال
                <br />
                ۲۰۲۱ به ۲۰۲۲
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
