// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import {
//   Award,
//   ArrowLeft,
//   Shield,
//   Zap,
//   Clock,
//   Star,
//   Laptop,
//   ChevronDown,
//   User,
//   Phone,
//   Send,
//   HelpCircle,
//   Monitor,
//   Terminal,
//   Cpu,
//   Database,
//   Network,
//   BrainCircuit,
//   Code2,
//   CheckCircle2,
//   Play,
// } from 'lucide-react';

// // ─── Counter Hook ─────────────────────────────────────────────────────────────
// function useCounter(target: number, duration = 2000) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started.current) {
//           started.current = true;
//           const start = Date.now();
//           const tick = () => {
//             const elapsed = Date.now() - start;
//             const progress = Math.min(elapsed / duration, 1);
//             const eased = 1 - Math.pow(1 - progress, 3);
//             setCount(Math.floor(eased * target));
//             if (progress < 1) requestAnimationFrame(tick);
//             else setCount(target);
//           };
//           requestAnimationFrame(tick);
//         }
//       },
//       { threshold: 0.5 },
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [target, duration]);

//   return { count, ref };
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function CourseStatCard({
//   value,
//   suffix,
//   label,
//   icon: Icon,
// }: {
//   value: number;
//   suffix: string;
//   label: string;
//   icon: React.ElementType;
// }) {
//   const { count, ref } = useCounter(value);

//   return (
//     <div
//       ref={ref}
//       className="group relative flex flex-col items-center p-6 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-purple-500/20"
//     >
//       <div className="mb-4 p-3 rounded-xl bg-purple-500/5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-500">
//         <Icon size={22} strokeWidth={1.5} />
//       </div>
//       <div className="flex items-baseline justify-center gap-1">
//         <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
//           {count.toLocaleString('fa-IR')}
//         </span>
//         <span className="text-base font-bold text-purple-600 dark:text-purple-400">{suffix}</span>
//       </div>
//       <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
//     </div>
//   );
// }

// // ─── Accordion Item ───────────────────────────────────────────────────────────
// function AccordionItem({
//   num,
//   title,
//   children,
//   isOpen,
//   onToggle,
// }: {
//   num: string;
//   title: string;
//   children: React.ReactNode;
//   isOpen: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <div className="bg-gray-50/50 dark:bg-gray-900/20 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
//       <button
//         onClick={onToggle}
//         className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors focus:outline-none"
//       >
//         <div className="flex items-center gap-4">
//           <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono text-sm font-bold">
//             {num}
//           </span>
//           <span className="text-base md:text-lg">{title}</span>
//         </div>
//         <ChevronDown
//           size={20}
//           className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
//         />
//       </button>
//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           isOpen ? 'max-h-[800px] border-t border-gray-150 dark:border-gray-800/50' : 'max-h-0'
//         }`}
//       >
//         <div className="p-6 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400 text-sm leading-8 font-medium">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── 3D Eye-Tracking Robot Component ──────────────────────────────────────────
// const Premium3DRobot = () => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const requestRef = useRef<number>();

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//       requestRef.current = requestAnimationFrame(() => {
//         const { innerWidth, innerHeight } = window;
//         const x = (e.clientX / innerWidth - 0.5) * 14;
//         const y = (e.clientY / innerHeight - 0.5) * 10;
//         setMousePos({ x, y });
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//     };
//   }, []);

//   return (
//     <div className="relative w-64 h-64 mx-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.25)] animate-[float_4s_ease-in-out_infinite]">
//       <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
//         <defs>
//           <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#ffffff" />
//             <stop offset="60%" stopColor="#f3f4f6" />
//             <stop offset="100%" stopColor="#d1d5db" />
//           </linearGradient>
//           <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#a855f7" />
//             <stop offset="100%" stopColor="#6b21a8" />
//           </linearGradient>
//           <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#111827" />
//             <stop offset="100%" stopColor="#030712" />
//           </linearGradient>
//         </defs>
//         <rect x="96" y="25" width="8" height="20" fill="url(#body-grad)" rx="2" />
//         <circle cx="100" cy="20" r="8" fill="url(#purple-glow)" />
//         <ellipse cx="100" cy="45" r="22" fill="url(#purple-glow)" height="6" />
//         <rect x="22" y="80" width="14" height="35" rx="7" fill="url(#purple-glow)" />
//         <rect x="164" y="80" width="14" height="35" rx="7" fill="url(#purple-glow)" />
//         <rect
//           x="32"
//           y="52"
//           width="136"
//           height="92"
//           rx="40"
//           fill="url(#body-grad)"
//           stroke="#e5e7eb"
//           strokeWidth="2"
//         />
//         <rect
//           x="46"
//           y="66"
//           width="108"
//           height="64"
//           rx="24"
//           fill="url(#screen-grad)"
//           stroke="#1f2937"
//           strokeWidth="2"
//         />
//         <g
//           style={{
//             transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
//             transition: 'transform 0.15s ease-out',
//           }}
//         >
//           <path
//             d="M 62 96 Q 72 84 82 96"
//             fill="none"
//             stroke="#a855f7"
//             strokeWidth="5.5"
//             strokeLinecap="round"
//             className="animate-pulse"
//           />
//           <path
//             d="M 118 96 Q 128 84 138 96"
//             fill="none"
//             stroke="#a855f7"
//             strokeWidth="5.5"
//             strokeLinecap="round"
//             className="animate-pulse"
//           />
//           <path d="M 84 112 Q 100 124 116 112 Z" fill="#a855f7" opacity="0.9" />
//         </g>
//         <rect x="84" y="142" width="32" height="10" fill="#9ca3af" rx="2" />
//         <path d="M60 152 Q100 144 140 152 L146 180 Q100 195 54 180 Z" fill="url(#body-grad)" />
//       </svg>
//     </div>
//   );
// };

// // ─── Neural Brain Live Animation ──────────────────────────────────────────────
// const InteractiveNeuralBrain = () => {
//   return (
//     <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200 dark:border-purple-900/30 rounded-[2.5rem] p-8 overflow-hidden backdrop-blur-xl">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04)_0%,transparent_70%)]" />
//       <svg className="w-full h-full opacity-80" viewBox="0 0 800 400">
//         <g stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1.5">
//           <line x1="150" y1="200" x2="300" y2="100" />
//           <line x1="150" y1="200" x2="300" y2="200" />
//           <line x1="150" y1="200" x2="300" y2="300" />
//           <line x1="300" y1="100" x2="500" y2="80" />
//           <line x1="300" y1="100" x2="500" y2="180" />
//           <line x1="300" y1="200" x2="500" y2="180" />
//           <line x1="300" y1="200" x2="500" y2="280" />
//           <line x1="300" y1="300" x2="500" y2="280" />
//           <line x1="500" y1="80" x2="680" y2="200" />
//           <line x1="500" y1="180" x2="680" y2="200" />
//           <line x1="500" y1="280" x2="680" y2="200" />
//         </g>
//         <g>
//           <circle cx="150" cy="200" r="7" fill="#a855f7" />
//           <circle cx="300" cy="100" r="5" fill="#22d3ee" />
//           <circle cx="300" cy="200" r="5" fill="#a855f7" />
//           <circle cx="300" cy="300" r="5" fill="#22d3ee" />
//           <circle cx="500" cy="80" r="5" fill="#a855f7" />
//           <circle cx="500" cy="180" r="5" fill="#22d3ee" />
//           <circle cx="500" cy="280" r="5" fill="#a855f7" />
//           <circle cx="680" cy="200" r="9" fill="#22d3ee" className="animate-pulse" />
//         </g>
//         <circle cx="150" cy="200" r="3" fill="#a855f7">
//           <animateMotion
//             path="M 150,200 L 300,100 L 500,180 L 680,200"
//             dur="3s"
//             repeatCount="indefinite"
//           />
//         </circle>
//         <circle cx="150" cy="200" r="3" fill="#22d3ee">
//           <animateMotion
//             path="M 150,200 L 300,300 L 500,280 L 680,200"
//             dur="2.5s"
//             repeatCount="indefinite"
//           />
//         </circle>
//       </svg>
//     </div>
//   );
// };

// // ─── Main Page Component ──────────────────────────────────────────────────────
// export default function AIMasterclassCoursePage() {
//   const [openAccordion, setOpenAccordion] = useState<number | null>(1);

//   return (
//     <main
//       className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
//       dir="rtl"
//     >
//       {/* ══════════════════════════════════════════════════════
//           HERO SECTION (ساختار کاملاً یکپارچه با بقیه صفحات)
//       ══════════════════════════════════════════════════════ */}
//       <section className="relative pt-32 pb-24">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
//         <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

//         <div className="relative z-10 max-w-screen-xl mx-auto px-6">
//           <div className="flex flex-col lg:flex-row gap-16 items-center">
//             {/* سمت راست: جزییات متنی توسعه هوش مصنوعی */}
//             <div className="flex-1 text-right space-y-6">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold">
//                 <Cpu size={14} /> مهندسی مدل‌های بزرگ زبانی و معماری عمیق الگوریتم‌ها
//               </div>

//               <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
//                 دوره فوق‌پیشرفته <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-400">
//                   مهندسی هوش مصنوعی و ال‌ال‌ام
//                 </span>
//               </h1>

//               <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
//                 تنها دوره مهارتی کشور که شما را از یک اپراتور ساده ابزارهای آماده، به معمار و
//                 توسعه‌دهنده اصلی شبکه‌های عصبی عمیق تبدیل می‌کند. با کدنویسی مدل‌های لایه به لایه و
//                 استقرار سازمانی روی جی‌پی‌یوهای قدرتمند ابری.
//               </p>

//               <div className="grid grid-cols-2 gap-4 pt-2">
//                 <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
//                   <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
//                     <Terminal size={18} />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-900 dark:text-white text-sm">
//                       ساخت سفارشی LLM
//                     </h4>
//                     <p className="text-[11px] text-gray-400 mt-0.5">آموزش فاین‌تیونینگ مدل‌ها</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
//                   <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-600 dark:text-cyan-400">
//                     <Network size={18} />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-900 dark:text-white text-sm">
//                       معماری ترانسفورمرها
//                     </h4>
//                     <p className="text-[11px] text-gray-400 mt-0.5">توسعه سیستم‌های چندوجهی</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
//                 <a
//                   href="#register"
//                   className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-purple-600/10"
//                 >
//                   پیش‌ثبت‌نام و رزرو صندلی ماتریکس
//                   <ArrowLeft
//                     size={20}
//                     className="transition-transform group-hover:-translate-x-1"
//                   />
//                 </a>
//               </div>
//             </div>

//             {/* سمت چپ: ربات هوشمند با فیس کامپوننت ۳بعدی اصلاح‌شده */}
//             <div className="w-full lg:w-1/2 flex justify-center">
//               <Premium3DRobot />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── GRID STATS SECTION ─── */}
//       <section className="py-12 bg-gray-50/50 dark:bg-gray-900/20 border-y border-gray-100 dark:border-gray-900/40">
//         <div className="max-w-screen-xl mx-auto px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             <CourseStatCard
//               value={180}
//               suffix=" ساعت"
//               label="آموزش عمیق پروژه محور هوش مصنوعی"
//               icon={Clock}
//             />
//             <CourseStatCard
//               value={12}
//               suffix=" پروژه"
//               label="سطح کلان سازمانی و تجاری"
//               icon={Code2}
//             />
//             <CourseStatCard
//               value={100}
//               suffix="٪"
//               label="کدنویسی خالص ریاضیات ماشین"
//               icon={Terminal}
//             />
//             <CourseStatCard value={5} suffix=" از ۵" label="امتیاز ارشد متخصصین دوره" icon={Star} />
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════════
//           SPLIT VIDEO SECTION (چیدمان موازی ویدیو و متن خفن در دسکتاپ)
//       ══════════════════════════════════════════════════════ */}
//       <section className="py-24 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-500">
//         <div className="max-w-screen-xl mx-auto px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//             {/* سمت راست: متن فوق‌العاده جذاب و تبیینی از پشت صحنه دوره */}
//             <div className="lg:col-span-5 text-right space-y-6">
//               <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
//                 <BrainCircuit size={24} />
//               </div>
//               <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
//                 یک سفر سینمایی به <br />
//                 <span className="text-purple-600 dark:text-purple-400">
//                   پشت صحنه الگوریتم‌ها
//                 </span>{' '}
//                 با مربی دوره
//               </h2>
//               <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-8 font-medium">
//                 در این ویدیوی پیش‌نمایش، ساختار کلی کارگاه‌های حضوری و آنلاین آکادمی نخستین را بررسی
//                 کرده‌ایم. با مشاهده این ویدیو، متوجه خواهید شد که چرا سرفصل‌های ما با تمام دوره‌های
//                 کپی‌شدنی بازار ایران متفاوت است و چگونه از ریاضیات خطی به معماری ایجنت‌های هوشمند
//                 مهاجرت می‌کنید.
//               </p>
//               <div className="flex gap-4 items-center text-xs font-bold text-gray-400">
//                 <span className="flex items-center gap-1.5">
//                   <CheckCircle2 size={14} className="text-emerald-500" /> بررسی متدهای روز ۲۰۲۶
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <CheckCircle2 size={14} className="text-emerald-500" /> حجم متناسب دسکتاپ
//                 </span>
//               </div>
//             </div>

//             {/* سمت چپ: باکس ویدیوی اصلاح شده و بهینه شده در دسکتاپ */}
//             <div className="lg:col-span-7 w-full">
//               <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden p-2 group shadow-xl">
//                 <div className="absolute inset-0 bg-[url('/assets/ai-coach-banner.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
//                 <div className="w-full h-full border border-gray-200 dark:border-gray-800/60 rounded-2xl flex items-center justify-center relative">
//                   <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-purple-600 text-gray-950 dark:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105">
//                     <Play size={24} className="fill-current ml-1" />
//                   </button>
//                   <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-400">
//                     INSTRUCTOR: ARAD REZAEI — CHIEF TECHNOLOGY OFFICER
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════════
//           INTERACTIVE NEURAL BRAIN SECTION (شبکه عصبی مغز)
//       ══════════════════════════════════════════════════════ */}
//       <section className="py-16 bg-white dark:bg-gray-950">
//         <div className="max-w-screen-xl mx-auto px-6 space-y-12">
//           <div className="text-center max-w-2xl mx-auto space-y-2">
//             <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">
//               [ Neural Connectome Layer ]
//             </span>
//             <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
//               شبیه‌سازی ماتریس شبکه عصبی مغز
//             </h3>
//             <p className="text-gray-500 text-xs md:text-sm font-medium">
//               روند جریان پالس‌های داده از گره‌های ورودی لایه پنهان به توابع خروجی تصمیم‌گیری عمیق.
//             </p>
//           </div>
//           <InteractiveNeuralBrain />
//         </div>
//       </section>

//       {/* ─── ACCORDION SYLLABUS SECTION ─── */}
//       <section
//         id="syllabus"
//         className="py-24 bg-gray-50/30 dark:bg-gray-950/20 border-t border-gray-100 dark:border-gray-900/40"
//       >
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
//             <div className="inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">
//               Core Core Curriculum
//             </div>
//             <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
//               سرفصل‌های استخراج شده از عمق الگوریتم‌ها
//             </h2>
//           </div>

//           <div className="space-y-4">
//             <AccordionItem
//               num="۰۱"
//               title="ریاضیات پایه یادگیری ماشین و برنامه‌نویسی تنسورها"
//               isOpen={openAccordion === 1}
//               onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
//             >
//               <p className="mb-3">
//                 تسلط بر جبر خطی، محاسبات ماتریسی پیشرفته و پیاده‌سازی آرایه‌های چندبعدی در پایتون
//                 خالص بدون کتابخانه‌های آماده.
//               </p>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
//                 <li>محاسبه گرادیان نزولی (Gradient Descent) و توابع اتلاف خطا</li>
//                 <li>مدیریت بهینه حافظه RAM و معماری وکتورایزیشن برای دیتاست‌های میلیونی</li>
//               </ul>
//             </AccordionItem>

//             <AccordionItem
//               num="۰۲"
//               title="طراحی لایه‌های پنهان شبکه‌های عصبی (Deep MLP & CNN)"
//               isOpen={openAccordion === 2}
//               onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
//             >
//               <p className="mb-3">
//                 کدنویسی لایه به لایه ساختارهای پرسپترون چندلایه، لایه‌های کانولوشنال برای پردازش
//                 تصویر و بینایی ماشین کاملاً بومی با ابزار PyTorch.
//               </p>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
//                 <li>استفاده از شتاب‌دهنده‌های سخت‌افزاری گرافیکی CUDA و ROCm</li>
//                 <li>جلوگیری از Overfitting با استفاده از تکنیک‌های Dropout و Normalization</li>
//               </ul>
//             </AccordionItem>

//             <AccordionItem
//               num="۰۳"
//               title="توسعه مدل‌های بزرگ زبانی (LLMs) و مهندسی سیستم‌های RAG"
//               isOpen={openAccordion === 3}
//               onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
//             >
//               <p className="mb-3">
//                 کالبدشکافی کامل معماری Transformer، مکانیزم Self-Attention و توسعه مامورهای هوشمند
//                 برای پردازش متن سازمانی.
//               </p>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-bold text-xs md:text-sm">
//                 <li>
//                   اتصال مدل‌های منبع‌باز Hugging Face به بانک‌های دیتای برداری Vector Databases
//                 </li>
//                 <li>پیاده‌سازی سناریوهای مالتی‌ایجنت با ابزار فریم‌ورک LangChain</li>
//               </ul>
//             </AccordionItem>
//           </div>
//         </div>
//       </section>

//       {/* ─── FORM & CALL TO ACTION SECTION ─── */}
//       <section id="register" className="py-24 bg-white dark:bg-gray-950">
//         <div className="max-w-4xl mx-auto px-6 relative z-10">
//           <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
//             <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
//               <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
//                 ورود به ماتریکس تخصصی هوش مصنوعی
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
//                 جهت دریافت ساختار کلی زمان‌بندی و تست سطح پیش‌نیاز دوره، مشخصات خودت را وارد کن؛
//                 کارشناسان فنی آکادمی نخستین با شما در ارتباط خواهند بود.
//               </p>
//             </div>

//             <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2 text-right">
//                   <label className="text-xs font-bold text-gray-400 mr-1">نام و نام خانوادگی</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="مثال: آراد رضایی"
//                       className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
//                       required
//                     />
//                     <User
//                       size={16}
//                       className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2 text-right">
//                   <label className="text-xs font-bold text-gray-400 mr-1">شماره تماس (همراه)</label>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       placeholder="مثال: ۰۹۱۲xxxxxxx"
//                       className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none"
//                       required
//                     />
//                     <Phone
//                       size={16}
//                       className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2 text-right">
//                   <label className="text-xs font-bold text-gray-400 mr-1">
//                     سطح آشنایی با پایتون
//                   </label>
//                   <div className="relative">
//                     <select
//                       className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 focus:border-purple-500 text-gray-900 dark:text-white font-medium text-sm px-5 py-3.5 rounded-xl transition-all focus:outline-none appearance-none"
//                       required
//                     >
//                       <option value="" disabled selected>
//                         انتخاب وضعیت...
//                       </option>
//                       <option value="junior">مسلط به ساختارهای شی‌گرایی پایتون هستم</option>
//                       <option value="none">آشنایی کمی دارم و نیاز به گذراندن پیش‌نیاز دارم</option>
//                     </select>
//                     <ChevronDown
//                       size={16}
//                       className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     type="submit"
//                     className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-purple-600/10 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <span>تایید نهایی و ارسال به دپارتمان AI</span>
//                     <Send size={16} />
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Award,
  ArrowLeft,
  Clock,
  Star,
  Laptop,
  ChevronDown,
  Monitor,
  FileText,
  FileSpreadsheet,
  Presentation,
  Database,
  Image as ImageIcon,
  Play,
  Briefcase,
  GraduationCap,
  Users,
  Sparkles,
  Zap,
  Server,
  Terminal,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  MapPin,
} from 'lucide-react';

// ایمپورت کامپوننت فایلی که در بخش ۱ ساختیم
import FAQSection from '@/components/FAQSection';

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function CourseStatCard({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}) {
  const { count, ref } = useCounter(value);
  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center p-6 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-900 rounded-2xl text-center transition-all duration-300 hover:border-blue-500/20"
    >
      <div className="mb-4 p-3 rounded-xl bg-blue-500/5 text-blue-500 group-hover:scale-110 transition-transform duration-500">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          {count.toLocaleString('fa-IR')}
        </span>
        <span className="text-base font-bold text-blue-500">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  num,
  title,
  children,
  isOpen,
  onToggle,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900/20 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
      <button
        onClick={onToggle}
        className="w-full p-6 text-right flex items-center justify-between text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-sm font-bold">
            {num}
          </span>
          <span className="text-base md:text-lg">{title}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[800px] border-t border-gray-100 dark:border-gray-800/50' : 'max-h-0'}`}
      >
        <div className="p-6 bg-gray-50/50 dark:bg-gray-900/10 text-gray-600 dark:text-gray-450 text-sm leading-7">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ICDLCoursePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <main
      className="text-gray-900 dark:text-gray-100 -mt-2 bg-white dark:bg-gray-950 overflow-hidden"
      dir="rtl"
    >
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Monitor size={14} /> دروازه ورود به بازار کار و ارتقای شغلی رسمی
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.2] tracking-tight">
                دوره جامع و کاربردی <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                  مهارت‌های هفت‌گانه ICDL
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl font-medium">
                تسلط کامل بر سیستم‌عامل، اینترنت و اتوماسیون مایکروسافت آفیس. فرقی نمی‌کند کارمند
                باشید یا دانشجو؛ این پایه‌ای‌ترین مهارت برای ورود به هر پوزیشن شغلی مدرن است.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      آموزش کارگاهی اداری
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">شبیه‌سازی وظایف سازمان‌ها</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/60 rounded-2xl">
                  <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-600 dark:text-cyan-400">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      کد استاندارد بین‌المللی
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">امتیاز رسمی رزومه و مهاجرت</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="#syllabus"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-base px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/10"
                >
                  بررسی جزئیات ریز سرفصل‌ها
                  <ArrowLeft size={20} />
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
              <div className="relative w-full max-w-[460px] aspect-[4/4] rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800/80 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800/80 pb-4 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Microsoft Office Suite</span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4 z-10">
                  <div className="p-4 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 rounded-2xl flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FileText size={22} />
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs font-black text-gray-800 dark:text-white">Word</h4>
                      <p className="text-[10px] text-gray-400">اتوماسیون مکاتبات</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800 rounded-2xl flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <FileSpreadsheet size={22} />
                    </div>
                    <div className="text-right">
                      <h4 className="text-xs font-black text-gray-800 dark:text-white">Excel</h4>
                      <p className="text-[10px] text-gray-400">حسابداری و فرمول‌ها</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-800/80 rounded-2xl p-4 flex items-center justify-between shadow-xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <Sparkles size={18} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-800 dark:text-white">
                        متدولوژی کاملاً کاربردی
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        Nakhostin Academy Standard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/20 border-y border-gray-150 dark:border-gray-900/40">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <CourseStatCard value={130} suffix=" ساعت" label="آموزش کارگاهی" icon={Clock} />
            <CourseStatCard value={7} suffix=" ماژول" label="مهارت جامع" icon={Laptop} />
            <CourseStatCard
              value={100}
              suffix="٪"
              label="پروژه‌های شبیه‌سازی بازارکار"
              icon={Terminal}
            />
            <CourseStatCard value={4.9} suffix=" از ۵" label="رضایت مهارت‌آموزان" icon={Star} />
          </div>
        </div>
      </section>

      {/* INSTRUCTOR VIDEO SECTION */}
      <section className="py-24 bg-white dark:bg-gray-950 relative">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-950 border border-gray-250 dark:border-gray-800 shadow-2xl group">
                {!isVideoPlaying ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent z-10" />
                    <div className="absolute bottom-6 right-6 z-20 text-right">
                      <span className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-bold mb-2 inline-block">
                        پیش‌نمایش کارگاه
                      </span>
                      <h4 className="text-white text-lg font-black">
                        تیزر معرفی و ساختار آموزشی مربی دوره
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 m-auto w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center z-20 shadow-xl cursor-pointer"
                    >
                      <span className="absolute inset-0 rounded-full bg-blue-600 opacity-40 animate-ping" />
                      <Play size={28} fill="currentColor" className="mr-1" />
                    </button>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full relative z-20"
                    src="https://www.aparat.com/video/video/embed/videohash/SAMPLE/vt/frame"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                )}
              </div>
            </div>

            <div className="flex-1 text-right space-y-6">
              <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                Instructor Intro
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                چرا متد تدریس اساتید ما متمایز است؟
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-7 font-medium">
                در این ویدیو ۳ دقیقه‌ای، مربی ارشد دوره سیستم اتوماسیون دفتری، سرفصل‌های آزمون‌های
                کشوری و نحوه آماده‌سازی رزومه برای هدایت به شرکت‌های معتبر را تشریح می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 NEW SECTION 1: GOLDEN BENEFITS (بخش مزایای طلایی کارگاه‌ها) */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-900/10 border-y border-gray-150 dark:border-gray-900/40 relative">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-block px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
              Premium Values
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
              امکانات فوق حرفه‌ای زیرساخت آکادمی نخستین
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              ارزش‌هایی متمایز برای تضمین کامل کیفیت یادگیری مهارت‌جویان
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Server size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                سایت‌های کارگاهی مجهز اختصاصی
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-6">
                هر کارآموز در طول کارگاه حضوری، صاحب یک سیستم مجزا و مدرن با پردازنده بالا جهت تست
                زنده، تمرین فاکتورهای اکسل و اتوماسیون خواهد بود.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Zap size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                آپدیت دائمی و دسترسی مادام‌العمر
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-6">
                با تغییر نسخه‌های آفیس یا ویندوز، فایل‌های بروزرسانی متدها و ترفندهای نرم‌افزاری به
                همراه جزوات جدید تا همیشه در پنل شما رایگان آپدیت می‌شود.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                سنجش مستمر و شبیه‌ساز آزمون
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-6">
                برگزاری منظم آزمون‌های آزمایشی کتبی و عملی بر روی پلتفرم آنلاین آکادمی جهت کاهش کامل
                استرس کارآموزان در روز آزمون اصلی سازمان.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
              این دوره دقیقاً برای چه کسانی طراحی شده؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Briefcase size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                کارمندان و متقاضیان استخدام
              </h3>
              <p className="text-xs text-gray-500 leading-6">
                ارتقای رتبه اداری، افزایش سرعت پردازش پوشه‌ها و مکاتبات سازمانی دفتری.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <GraduationCap size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                دانشجویان فارغ‌التحصیل
              </h3>
              <p className="text-xs text-gray-500 leading-6">
                تنظیم پایان‌نامه‌های استاندارد در Word، شبیه‌سازی آماری و نموداری پایان‌دوره در
                Excel.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-900/30 border border-gray-150 dark:border-gray-850 rounded-2xl text-right space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Users size={22} />
              </div>
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                جویان کار و متقاضیان اصناف
              </h3>
              <p className="text-xs text-gray-500 leading-6">
                پایه‌ای‌ترین مهارتی که هر کارفرما در رزومه برای ردیف اداری چک می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS SECTION */}
      <section id="syllabus" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">
              ریزسرفصل‌ها و جزئیات هفت مهارت
            </h2>
          </div>
          <div className="space-y-4">
            <AccordionItem
              num="۰۱"
              title="مفاهیم پایه فناوری اطلاعات و سخت‌افزار (IT)"
              isOpen={openAccordion === 1}
              onToggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                <li>
                  آشنایی با پردازنده‌ها (CPU)، ساختار حافظه موقت (RAM) و دائمی (SSD)، شبکه و امنیت
                  داده‌ها.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              num="۰۲"
              title="کار با سیستم‌عامل و مدیریت حرفه‌ای فایل‌ها (Windows)"
              isOpen={openAccordion === 2}
              onToggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                <li>
                  مدیریت درایوها، ساختار فایلینگ، فشرده‌سازی لایه‌ای داده‌ها و کار با ابزارهای
                  مانیتورینگ Control Panel.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              num="۰۳"
              title="اینترنت، ارتباطات و جستجوی پیشرفته وب (Internet)"
              isOpen={openAccordion === 3}
              onToggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                <li>
                  عملگرهای سرچ پیشرفته موتورهای جستجو، مدیریت میل‌باکس‌های سازمانی و فضای ابری.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              num="۰۴"
              title="واژه‌پرداز مایکروسافت ورد (Microsoft Word)"
              isOpen={openAccordion === 4}
              onToggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                <li>
                  نامه‌نگاری رسمی اداری، صفحه‌آرایی کتب، فهرست‌نویسی خودکار دینامیک و ابزار Mail
                  Merge.
                </li>
              </ul>
            </AccordionItem>
            <AccordionItem
              num="۰۵"
              title="صفحه گسترده مایکروسافت اکسل (Microsoft Excel)"
              isOpen={openAccordion === 5}
              onToggle={() => setOpenAccordion(openAccordion === 5 ? null : 5)}
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                <li>
                  فرمول‌نویسی منطقی با توابع معروف (SUM, VLOOKUP, IF)، مرتب‌سازی پیشرفته و چارت‌های
                  آماری پویا.
                </li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-500">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* سمت راست: متن فوق‌العاده جذاب و تبیینی از پشت صحنه دوره */}
            <div className="lg:col-span-5 text-right space-y-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400"></div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-snug">
                یک سفر سینمایی به <br />
                <span className="text-purple-600 dark:text-purple-400">
                  پشت صحنه الگوریتم‌ها
                </span>{' '}
                با مربی دوره
              </h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-8 font-medium">
                در این ویدیوی پیش‌نمایش، ساختار کلی کارگاه‌های حضوری و آنلاین آکادمی نخستین را بررسی
                کرده‌ایم. با مشاهده این ویدیو، متوجه خواهید شد که چرا سرفصل‌های ما با تمام دوره‌های
                کپی‌شدنی بازار ایران متفاوت است و چگونه از ریاضیات خطی به معماری ایجنت‌های هوشمند
                مهاجرت می‌کنید.
              </p>
            </div>

            {/* سمت چپ: باکس ویدیوی اصلاح شده و بهینه شده در دسکتاپ */}
            <div className="lg:col-span-7 w-full">
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden p-2 group shadow-xl">
                <div className="absolute inset-0 bg-[url('/assets/ai-coach-banner.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="w-full h-full border border-gray-200 dark:border-gray-800/60 rounded-2xl flex items-center justify-center relative">
                  <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-purple-600 text-gray-950 dark:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Play size={24} className="fill-current ml-1" />
                  </button>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-400">
                    INSTRUCTOR: ARAD REZAEI — CHIEF TECHNOLOGY OFFICER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 NEW SECTION 2: PATHWAY TO MARKET (نقشه راه ۵ گام شغلی) */}
      <section className="py-24 bg-gray-50/30 dark:bg-gray-900/10 border-t border-gray-150 dark:border-gray-900/40 relative">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Career Roadmap
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
              نقشه راه گام‌به‌گام شما از یادگیری تا ورود به بازار کار
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              یک استراتژی مدون برای مهارت‌جویانی که به دنبال خروجی واقعی و ارتقای جدی هستند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: '۱',
                title: 'کارگاه تعاملی حضوری/آنلاین',
                desc: 'شروع کلاس‌ها از صفر مطلق و اجرای زنده تمرین‌ها زیر نظر استاد.',
              },
              {
                step: '۲',
                title: 'توسعه پورتفولیو کارگاهی',
                desc: 'طراحی اسناد اتوماسیون، لیست‌های مالی اکسل و نمونه‌کارهای فاکتور دفتری.',
              },
              {
                step: '۳',
                title: 'شبیه‌ساز آزمون‌های سراسری',
                desc: 'شرکت در تست‌های شبیه‌سازی پلتفرم آکادمی نخستین برای تضمین قبولی.',
              },
              {
                step: '۴',
                title: 'کسب کد مهارت بین‌المللی',
                desc: 'شرکت در آزمون رسمی سازمان فنی و حرفه‌ای و صدور گواهینامه الکترونیکی.',
              },
              {
                step: '۵',
                title: 'مصاحبه و ارتقای رزومه شغلی',
                desc: 'بهره‌گیری از نمونه‌کارها در رزومه جهت اپلای موفق در سازمان‌ها و شرکت‌ها.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-2xl relative text-right flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-mono text-xs font-black mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-black text-sm text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-5 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICAL PROJECTS SECTION */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
              پروژه‌های واقعی که در طول دوره پیاده‌سازی می‌کنید
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-850 rounded-2xl text-right">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-4 font-mono text-sm">
                01
              </div>
              <h4 className="font-black text-base text-gray-900 dark:text-white">
                نامه‌نگاری رسمی اداری
              </h4>
              <p className="text-xs text-gray-400 mt-2 leading-5">
                طراحی سربرگ شرکت، ساخت جداول اداری و خروجی اتوماسیون در محیط Word.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-850 rounded-2xl text-right">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-4 font-mono text-sm">
                02
              </div>
              <h4 className="font-black text-base text-gray-900 dark:text-white">
                لیست حقوق و دستمزد دفتری
              </h4>
              <p className="text-xs text-gray-400 mt-2 leading-5">
                فرمول‌نویسی خودکار بیمه، مالیات، دریافتی پرسنل و رسم چارت‌ها در Excel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 🌟 CALL GLOBAL FAQ COMPONENT 🌟 ─── */}
      {/* فراخوانی کامپوننت هوشمند و سراسری سوالات متداول در انتهای صفحه */}
      <FAQSection />
    </main>
  );
}
