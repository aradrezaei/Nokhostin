'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Code,
  BookOpen,
  Award,
  Clock,
  ChevronLeft,
  Terminal,
  Gamepad2,
  Zap,
  Layers,
  Cpu,
  Play,
  CheckCircle2,
  Shield,
  Sparkles,
  Trophy,
  Flame,
  Sun,
  Moon,
  MousePointer,
  Target,
  RefreshCw,
} from 'lucide-react';

// ساختار اینترفیس ذرات برای افکت انفجار در صفحه
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
}

export default function HeroSection() {
  // مدیریت وضعیت حالت تاریک/روشن داخلی برای تست مستقیم
  const [isDarkMode, setIsDarkMode] = useState(true);

  // سیستم امتیاز و گیم‌پلی هیرو
  const [score, setScore] = useState(1240);
  const [streak, setStreak] = useState(5);
  const [activeQuest, setActiveQuest] = useState('variables');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleLog, setConsoleLog] = useState('SYSTEM:// Press RUN to compile your first spell.');

  // سیستم انفجار ذرات با کلیک روی دکمه اصلی
  const triggerExplosion = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    // محاسبه مرکز دکمه برای پرتاب ذرات
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      color: ['#22d3ee', '#818cf8', '#34d399', '#fbbf24', '#f43f5e'][Math.floor(Math.random() * 5)],
      angle: (i * 15 * Math.PI) / 180,
      speed: 3 + Math.random() * 5,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setScore((prev) => prev + 50);
    setStreak((prev) => prev + 1);

    // پاک‌سازی ذرات پس از اتمام انیمیشن برای حفظ سرعت ۱۲۰ فریم
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  };

  // شبیه‌ساز اجرای کامپایلر زنده
  const handleRunCompiler = () => {
    setIsCompiling(true);
    setConsoleLog('>>> Python3 engine initializing...');
    setTimeout(() => {
      setConsoleLog('>>> [OK] print("Hello World") executed. +100 XP');
      setIsCompiling(false);
      setScore((prev) => prev + 100);
    }, 1200);
  };

  return (
    <section
      className={`relative transition-colors duration-300 font-sans pt-24 pb-20 overflow-hidden select-none border-b-8 border-slate-900 ${isDarkMode ? 'bg-[#060913] text-slate-200' : 'bg-[#f8fafc] text-slate-800'}`}
      dir="rtl"
    >
      {/* ─── استایل‌ها و انیمیشن‌های پیشرفته خدایان CSS (Pure GPU Processing) ─── */}
      <style jsx global>{`
        @keyframes cdxExplodeAnimation {
          0% {
            transform: translate(0, 0) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
          }
        }
        @keyframes cdxBackgroundPulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }
        @keyframes cdxCardFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0.5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-0.5deg);
          }
        }
        @keyframes cdxGhostFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes cdxMarqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(50%);
          }
        }
        @keyframes cdxBorderRotate {
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-explode-particle {
          animation: cdxExplodeAnimation 0.7s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        .animate-bg-pulse {
          animation: cdxBackgroundPulse 10s ease-in-out infinite;
        }
        .animate-card-float {
          animation: cdxCardFloat 6s ease-in-out infinite;
        }
        .animate-ghost-float {
          animation: cdxGhostFloat 3s ease-in-out infinite;
        }
        .animate-marquee-slow {
          animation: cdxMarqueeSlow 30s linear infinite;
        }

        /* استایل‌های شخصی‌سازی شده موس زنده کددکس */
        .cursor-zone-game {
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2322d3ee" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>'),
            auto;
        }
        .cursor-zone-click {
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23f43f5e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 21v-6.5a3.5 3.5 0 0 0-7 0V21h7Z"></path><path d="M22 21v-6.5a3.5 3.5 0 0 0-7 0V21h7Z"></path><path d="M14 11V3a3 3 0 0 0-6 0v8h6Z"></path></svg>'),
            pointer;
        }
      `}</style>

      {/* ─── لایه پس‌زمینه بسیار سبک و فوق‌لوکس ماتریس نقطه‌ای (Pure CSS) ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-100 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-[0.25]' : 'opacity-[0.4]'}`}
          style={{
            backgroundImage: isDarkMode
              ? `radial-gradient(#1e293b 1.5px, transparent 1.5px), radial-gradient(#334155 1px, transparent 1px)`
              : `radial-gradient(#cbd5e1 1.5px, transparent 1.5px), radial-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />
        {/* هاله‌های انتزاعی مینی‌مال نئونی */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 dark:bg-cyan-500/[0.03] rounded-full blur-[120px] animate-bg-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-400/10 dark:bg-indigo-500/[0.03] rounded-full blur-[140px] animate-bg-pulse [animation-delay:3s]" />
      </div>

      {/* ─── کانفتی و سیستم رندر ذرات فعال انفجاری ─── */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => {
          const dx = Math.cos(p.angle) * p.speed * 25;
          const dy = Math.sin(p.angle) * p.speed * 25;
          return (
            <div
              key={p.id}
              className="absolute w-3 h-3 rounded-full animate-explode-particle"
              style={
                {
                  left: p.x,
                  top: p.y,
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      {/* ─── نوار دکوراتیو پیام روانده بالایی مینی‌مال (Continuous Game Marquee) ─── */}
      <div
        className={`absolute top-0 inset-x-0 h-10 border-b-2 flex items-center overflow-hidden z-30 transition-colors duration-300 ${isDarkMode ? 'bg-[#0b101f] border-slate-800' : 'bg-slate-100 border-slate-300'}`}
      >
        <div
          className={`flex whitespace-nowrap animate-marquee-slow text-[10px] font-mono tracking-[0.25em] uppercase font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
        >
          <span>
            {' '}
            • QUEST MODE COMPILING • NAKHOSTIN ACADEMY 2026 • LEARN PYTHON BY PLAYING • NO FLUFF
            TEXT • 100% REAL DEVELOPER SKILLS &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span>
            {' '}
            • QUEST MODE COMPILING • NAKHOSTIN ACADEMY 2026 • LEARN PYTHON BY PLAYING • NO FLUFF
            TEXT • 100% REAL DEVELOPER SKILLS &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        {/* ─── پنل بالایی داشبورد بازی (Top Gamified Stat Bar) ─── */}
        <div
          className={`mb-12 p-4 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-4 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#090d16] ${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-900'}`}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
              <span className="text-xs font-black">امتیاز شما (XP):</span>
              <span className="font-mono text-base font-black text-cyan-500">{score}</span>
            </div>
            <div className="h-6 w-[2px] bg-slate-300 dark:bg-slate-800" />
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
              <span className="text-xs font-black">کامپایل متوالی:</span>
              <span className="font-mono text-base font-black text-rose-500">{streak} روز</span>
            </div>
          </div>

          {/* سوییچ تم اختصاصی کددکس */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border-2 transition-all active:scale-95 flex items-center gap-2 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isDarkMode ? 'bg-slate-900 border-slate-700 text-amber-400' : 'bg-amber-100 border-slate-900 text-amber-900'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>تغییر حالت اتمسفر</span>
            </button>
          </div>
        </div>

        {/* ─── گرید اصلی محتوا ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 🔴 ستون راست: کوئست‌لاین تعاملی و متون اصلی (۵ ستون) */}
          <div className="lg:col-span-6 space-y-8 cursor-zone-game">
            <div className="space-y-6">
              <div
                className={`inline-flex items-center gap-2.5 border-2 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#000] ${isDarkMode ? 'bg-[#0d1527] border-slate-800 text-cyan-400' : 'bg-cyan-50 border-slate-900 text-cyan-700'}`}
              >
                <Terminal className="w-4 h-4" />
                <span className="font-mono tracking-wider">CORE_CURRICULUM://PYTHON_2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.2] tracking-tighter">
                مهندسی پایتون را <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400">
                  عملی فرا بگیرید
                </span>
              </h1>

              <p className="text-base md:text-lg font-bold leading-relaxed max-w-xl text-slate-500 dark:text-slate-400 border-r-4 border-cyan-500 pr-4">
                توسعه واقعی نرم‌افزار بر پایه مستندات رسمی هسته پایتون. ساختار متغیرها، مدیریت پشته
                حافظه و معماری تمیز را در قالب چالش‌های زنده کدنویسی باز کنید.
              </p>
            </div>

            {/* 🗺️ نقشه چالش‌های گیمیفای شده کددکس (Quest Path Matrix) */}
            <div
              className={`p-5 rounded-2xl border-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#02040a] space-y-4 transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0f1d] border-slate-800' : 'bg-white border-slate-900'}`}
            >
              <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-black">انتخاب کوئست فعال برای شروع کدنویسی:</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'variables', name: '۱. مهار متغیرها', desc: 'حافظه و دیتا', done: true },
                  { id: 'loops', name: '۲. حلقه‌های شرطی', desc: 'لوپ‌های مایکرو', done: false },
                  { id: 'functions', name: '۳. توابع مهندسی', desc: 'توسعه ماژولار', done: false },
                ].map((quest) => (
                  <div
                    key={quest.id}
                    onClick={() => setActiveQuest(quest.id)}
                    className={`p-3 rounded-xl border-2 cursor-zone-click transition-all duration-100 transform hover:-translate-y-0.5 flex flex-col justify-between h-24 ${activeQuest === quest.id ? 'bg-cyan-500/10 border-cyan-500 dark:border-cyan-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#22d3ee]' : 'bg-slate-50 dark:bg-[#0d1324] border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-slate-400">
                        #{quest.id.toUpperCase()}
                      </span>
                      {quest.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                        {quest.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{quest.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── دکمه‌های اکشن نئو بروتال با لایه پرتاب ذره زنده ─── */}
            <div className="flex flex-wrap items-center gap-5 pt-2 max-w-xl">
              <button
                onClick={triggerExplosion}
                className="flex-1 min-w-[220px] bg-cyan-400 text-slate-950 border-2 border-slate-950 px-8 py-4 rounded-xl text-sm font-black transition-all duration-75 transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:shadow-none flex justify-center items-center gap-2 cursor-zone-click"
              >
                <Gamepad2 className="w-5 h-5 text-slate-950" />
                شروع ماجراجویی (کلیک کنید!)
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                className={`flex-1 min-w-[220px] border-2 border-slate-950 px-8 py-4 rounded-xl text-sm font-black transition-all duration-75 transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:shadow-none flex justify-center items-center gap-2 cursor-zone-click ${isDarkMode ? 'bg-[#111827] text-slate-300' : 'bg-white text-slate-700'}`}
              >
                <Cpu className="w-4 h-4 text-slate-400" />
                درخواست نقشه راه کامپایل
              </button>
            </div>
          </div>

          {/* 🔵 ستون چپ: کنسول شبیه‌ساز گیم‌پلی کددکس همراه با گیف (۶ ستون) */}
          <div className="lg:col-span-6 relative gpu-optimized animate-card-float">
            {/* گجت شناور بالا - رتبه ملی آکادمی نخستین */}
            <div
              className={`absolute -top-6 -left-4 border-2 p-3 rounded-xl flex items-center gap-3 shadow-xl z-30 transition-all ${isDarkMode ? 'bg-[#090f1f] border-slate-800' : 'bg-white border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
            >
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                <Award className="w-4 h-4 animate-spin [animation-duration:12s]" />
              </div>
              <div className="text-right">
                <p className="text-[9px] font-mono font-black text-slate-400">
                  WORLDSKILLS COMPETITOR
                </p>
                <p className="text-xs font-black">مدال‌آور المپیاد ملی مهارت تهران</p>
              </div>
            </div>

            {/* 💻 بدنه اصلی گیم‌کانسول دسکتاپ */}
            <div
              className={`w-full border-2 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_#020409] ${isDarkMode ? 'bg-[#070b15] border-slate-800' : 'bg-white border-slate-950'}`}
            >
              {/* تب‌های مدیریتی بالای کنسول */}
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#0f172a] border border-slate-300 dark:border-slate-800 px-3 py-1 rounded-lg">
                  <Shield className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    TERMINAL_CTX_v2.0
                  </span>
                </div>
              </div>

              {/* 👾 ادغام گیف پیکسلی بازی کددکس (Pixel Art Gameplay Frame) */}
              <div className="mb-6 rounded-xl overflow-hidden border-2 border-slate-950 h-36 relative bg-[#111827] flex items-center justify-center shadow-inner group">
                {/* یک گیف مینی‌مال پیکسلی رترو متناسب با کددکس */}
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Zic3VvdndwcnlyZzV3b3I0czdxeWptNXlnaW95aTJscDR2bW10eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Lg0V8wI6MvYv6/giphy.gif"
                  alt="Retro Coding Game Pixels"
                  className="w-20 h-20 object-contain animate-ghost-float"
                />
                <div className="absolute bottom-2 right-3 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-400 tracking-wider">
                  QUEST_MAP_VIEW
                </div>
              </div>

              {/* 💻 شبیه‌ساز زنده کامپایلر مهندسی */}
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3 shadow-inner relative border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Terminal className="w-4 h-4" />
                    <span>nakhostin_workspace.py</span>
                  </div>
                  <button
                    onClick={handleRunCompiler}
                    disabled={isCompiling}
                    className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 text-slate-950 font-black px-3 py-1 rounded-md flex items-center gap-1.5 transition-all active:scale-95 cursor-zone-click shadow-md"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCompiling ? 'animate-spin' : ''}`} />
                    <span>{isCompiling ? 'کامپایل...' : 'RUN'}</span>
                  </button>
                </div>

                <div className="space-y-1 text-left min-h-[60px]" dir="ltr">
                  <p className="text-slate-500"># Active Quest: {activeQuest}</p>
                  <p className="text-emerald-400">student_rank = "WorldSkills Medalist"</p>
                  <p className="text-indigo-400">print(f"Leveling up {`{student_rank}`}")</p>
                  <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-900 mt-2 italic">
                    {consoleLog}
                  </p>
                </div>
              </div>

              {/* 🧰 بخش دستاوردها و آیتم‌های بازی (Inventory Slot Matrix) */}
              <div className="mt-6 space-y-2.5">
                <p className="text-xs font-black text-slate-400 text-right">
                  مقدمات و مهارت‌های نهایی دریافتی:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'مدیریت پشته', icon: Code, sub: 'Memory Core' },
                    { label: 'ساختار پایه‌ای', icon: Layers, sub: 'Syntax standard' },
                    { label: 'داده‌های پویا', icon: Cpu, sub: 'CRUD logic' },
                    { label: 'گواهی معتبر', icon: Award, sub: 'Official Rank' },
                  ].map((slot, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center gap-1.5 transition-all transform hover:scale-105 ${isDarkMode ? 'bg-[#0d1222] border-slate-800 hover:border-indigo-400' : 'bg-slate-50 border-slate-200 hover:border-slate-900 shadow-sm'}`}
                    >
                      <div
                        className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-slate-950 text-indigo-400' : 'bg-white text-indigo-600 border'}`}
                      >
                        <slot.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black block">{slot.label}</span>
                        <span className="text-[8px] font-mono text-slate-400 block mt-0.5">
                          {slot.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* گجت شناور پایین - ددلاین و دسترسی به دوره */}
            <div
              className={`absolute -bottom-6 -right-4 border-2 px-4 py-3 rounded-xl flex items-center gap-3 shadow-2xl z-30 transition-all ${isDarkMode ? 'bg-[#090f1f] border-slate-800' : 'bg-white border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
            >
              <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
              <div className="text-right">
                <p className="text-[9px] font-mono font-black text-slate-400">ACCESS_LIMIT</p>
                <p className="text-xs font-black">۹۰ روز مهلت گذراندن گام‌ها و چالش‌ها</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── نوار مایلستون‌های مینی‌مال نهایی (Bottom Feature Hub) ─── */}
        <div className="mt-24 pt-10 border-t-4 border-slate-200 dark:border-slate-900">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {[
              {
                label: 'روش آموزشی اصولی',
                value: 'متد Core Documentation',
                text: 'تدریس مبانی پایه بدون ابزارهای واسط سنگین',
              },
              {
                label: 'زبان مرجع سال ۲۰۲۶',
                value: 'رتبه دوم محبوبیت',
                text: 'پراستفاده‌ترین هسته برنامه‌نویسی فنی مهندسی',
              },
              {
                label: 'جامعه کدآموزان فعال',
                value: '+۴,۷۴۰ دانشجو',
                text: 'شبکه هم‌افزایی نخبگان و trainees آکادمی',
              },
              {
                label: 'بازار کار رو به رشد',
                value: '٪۳۸ رشد تقاضا',
                text: 'جهش آمار جذب توسعه‌دهندگان مسلط به معماری پایتون',
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="px-6 space-y-2 border-r-2 border-slate-200 dark:border-slate-900 first:border-r-0 md:first:border-r-2 group text-center md:text-right"
              >
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-400 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-[10px] tracking-wider uppercase font-mono">
                    {milestone.label}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {milestone.value}
                </h3>
                <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-[220px] mx-auto md:mx-0">
                  {milestone.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
