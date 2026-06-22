// -----------------------------'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';

// // ─── Nav Data ───────────────────────────────────────────────────────────────
// const NAV_ITEMS = [
//   {
//     label: 'دوره‌ها',
//     href: '/courses',
//     mega: [
//       {
//         category: 'برنامه‌نویسی',
//         items: [
//           { label: 'توسعه وب فرانت‌اند', href: '/courses/frontend', badge: 'پرطرفدار' },
//           { label: 'توسعه وب بک‌اند', href: '/courses/backend' },
//           { label: 'برنامه‌نویسی پایتون', href: '/courses/python' },
//           { label: 'توسعه اپلیکیشن موبایل', href: '/courses/mobile' },
//         ],
//       },
//       {
//         category: 'طراحی',
//         items: [
//           { label: 'طراحی UI/UX', href: '/courses/ui-ux', badge: 'جدید' },
//           { label: 'طراحی گرافیک', href: '/courses/graphic' },
//           { label: 'موشن گرافیک', href: '/courses/motion' },
//         ],
//       },
//       {
//         category: 'کسب‌وکار',
//         items: [
//           { label: 'دیجیتال مارکتینگ', href: '/courses/marketing' },
//           { label: 'مدیریت پروژه', href: '/courses/project-management' },
//           { label: 'حسابداری', href: '/courses/accounting' },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'مدارک',
//     href: '/certificates',
//     mega: [
//       {
//         category: 'مجوزها',
//         items: [
//           { label: 'مدرک فنی و حرفه‌ای', href: '/certificates/technical' },
//           { label: 'گواهی‌نامه بین‌المللی', href: '/certificates/international' },
//         ],
//       },
//       {
//         category: 'استعلام',
//         items: [
//           { label: 'استعلام مدرک', href: '/certificates/verify' },
//           { label: 'راهنمای مدارک', href: '/certificates/guide' },
//         ],
//       },
//     ],
//   },
//   { label: 'درباره ما', href: '/about' },
//   { label: 'وبلاگ', href: '/blog' },
//   { label: 'تماس', href: '/contact' },
// ];

// // ─── Logo SVG ────────────────────────────────────────────────────────────────
// function LogoMark() {
//   return (
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       {/* Outer hexagon frame */}
//       <path
//         d="M16 2L28.124 9V23L16 30L3.876 23V9L16 2Z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         fill="none"
//         className="text-purple-600 dark:text-purple-400"
//       />
//       {/* Inner accent lines */}
//       <path
//         d="M16 7L23.794 11.5V20.5L16 25L8.206 20.5V11.5L16 7Z"
//         fill="currentColor"
//         opacity="0.08"
//         className="text-purple-600 dark:text-purple-400"
//       />
//       {/* Center diamond */}
//       <path
//         d="M16 11L20 16L16 21L12 16L16 11Z"
//         fill="currentColor"
//         className="text-purple-600 dark:text-purple-400"
//       />
//       {/* Top tick — graduation symbol hint */}
//       <path d="M13 9.5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-purple-600 dark:text-purple-400" />
//     </svg>
//   );
// }

// // ─── Chevron SVG ─────────────────────────────────────────────────────────────
// function ChevronDown({ open }: { open: boolean }) {
//   return (
//     <svg
//       width="12"
//       height="12"
//       viewBox="0 0 12 12"
//       fill="none"
//       aria-hidden="true"
//       style={{
//         transition: 'transform 200ms ease',
//         transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
//       }}
//     >
//       <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// // ─── Mega Menu ────────────────────────────────────────────────────────────────
// function MegaMenu({ categories }: { categories: (typeof NAV_ITEMS)[0]['mega'] }) {
//   if (!categories) return null;
//   return (
//     <div
//       className="
//         absolute top-full right-0 mt-3 z-50
//         bg-white dark:bg-gray-950
//         border border-gray-100 dark:border-gray-800
//         rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]
//         dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]
//         p-5 min-w-[520px]
//         grid gap-x-8
//       "
//       style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
//     >
//       {/* Top decorative rule */}
//       <div className="col-span-full h-px bg-gradient-to-l from-transparent via-purple-200 dark:via-purple-800 to-transparent mb-4" />

//       {categories.map((cat, i) => (
//         <div key={i}>
//           <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 dark:text-gray-600 uppercase mb-3">
//             {cat.category}
//           </p>
//           <ul className="space-y-0.5">
//             {cat.items.map((item, j) => (
//               <li key={j}>
//                 <Link
//                   href={item.href}
//                   className="
//                     group flex items-center justify-between gap-2
//                     px-3 py-2 rounded-xl
//                     text-sm font-medium text-gray-700 dark:text-gray-300
//                     hover:bg-purple-50 dark:hover:bg-purple-900/20
//                     hover:text-purple-700 dark:hover:text-purple-300
//                     transition-colors duration-150
//                   "
//                 >
//                   <span>{item.label}</span>
//                   {item.badge && (
//                     <span className="text-[9px] font-black tracking-wide px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
//                       {item.badge}
//                     </span>
//                   )}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}

//       {/* Bottom CTA row */}
//       <div className="col-span-full mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
//         <p className="text-xs text-gray-400 dark:text-gray-600">
//           بیش از ۱۴۵ دوره تخصصی آماده شروع
//         </p>
//         <Link
//           href="/courses"
//           className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
//         >
//           مشاهده همه دوره‌ها
//           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
//             <path d="M9 6H3M5.5 3.5L3 6L5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// }

// // ─── Main Header ──────────────────────────────────────────────────────────────
// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
//   const headerRef = useRef<HTMLElement>(null);

//   // Scroll detection
//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 12);
//     window.addEventListener('scroll', handler, { passive: true });
//     return () => window.removeEventListener('scroll', handler);
//   }, []);

//   // Close mega on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   // Lock body scroll when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [mobileOpen]);

//   return (
//     <>
//       <header
//         ref={headerRef}
//         dir="rtl"
//         className={`
//           fixed top-0 right-0 left-0 z-50
//           transition-all duration-300
//           ${scrolled
//             ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100/80 dark:border-gray-800/80 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
//             : 'bg-transparent'
//           }
//         `}
//       >
//         <div className="max-w-screen-xl mx-auto px-5 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-[68px]">

//             {/* ── Logo ── */}
//             <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="نخستین - صفحه اصلی">
//               <div className="relative">
//                 <LogoMark />
//               </div>
//               <div className="flex flex-col leading-none">
//                 <span className="text-[15px] font-black tracking-tight text-gray-900 dark:text-white">
//                   نخستین
//                 </span>
//                 <span className="text-[9px] font-semibold tracking-[0.18em] text-purple-500 dark:text-purple-400 uppercase">
//                   آموزشگاه
//                 </span>
//               </div>
//             </Link>

//             {/* ── Desktop Nav ── */}
//             <nav className="hidden lg:flex items-center gap-1" aria-label="ناوبری اصلی">
//               {NAV_ITEMS.map((item) => {
//                 const hasMega = item.mega && item.mega.length > 0;
//                 const isOpen = openMenu === item.label;

//                 return (
//                   <div key={item.label} className="relative">
//                     {hasMega ? (
//                       <button
//                         onClick={() => setOpenMenu(isOpen ? null : item.label)}
//                         onMouseEnter={() => setOpenMenu(item.label)}
//                         aria-expanded={isOpen}
//                         aria-haspopup="true"
//                         className={`
//                           flex items-center gap-1.5 px-3.5 py-2 rounded-xl
//                           text-sm font-semibold transition-colors duration-150
//                           ${isOpen
//                             ? 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20'
//                             : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
//                           }
//                         `}
//                       >
//                         {item.label}
//                         <ChevronDown open={isOpen} />
//                       </button>
//                     ) : (
//                       <Link
//                         href={item.href}
//                         className="
//                           flex items-center px-3.5 py-2 rounded-xl
//                           text-sm font-semibold
//                           text-gray-600 dark:text-gray-400
//                           hover:text-gray-900 dark:hover:text-white
//                           hover:bg-gray-50 dark:hover:bg-gray-900
//                           transition-colors duration-150
//                         "
//                       >
//                         {item.label}
//                       </Link>
//                     )}

//                     {/* Mega menu dropdown */}
//                     {hasMega && isOpen && (
//                       <div onMouseLeave={() => setOpenMenu(null)}>
//                         <MegaMenu categories={item.mega} />
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </nav>

//             {/* ── Desktop Actions ── */}
//             <div className="hidden lg:flex items-center gap-2.5">
//               {/* Search */}
//               <button
//                 aria-label="جستجو"
//                 className="
//                   w-9 h-9 flex items-center justify-center rounded-xl
//                   text-gray-400 dark:text-gray-500
//                   hover:text-gray-700 dark:hover:text-gray-300
//                   hover:bg-gray-100 dark:hover:bg-gray-800
//                   transition-colors duration-150
//                 "
//               >
//                 <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
//                   <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
//                   <path d="M14 14L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                 </svg>
//               </button>

//               {/* Divider */}
//               <div className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />

//               <Link
//                 href="/login"
//                 className="
//                   text-sm font-semibold px-4 py-2 rounded-xl
//                   text-gray-600 dark:text-gray-400
//                   hover:text-gray-900 dark:hover:text-white
//                   hover:bg-gray-50 dark:hover:bg-gray-900
//                   transition-colors duration-150
//                 "
//               >
//                 ورود
//               </Link>

//               <Link
//                 href="/register"
//                 className="
//                   relative overflow-hidden
//                   inline-flex items-center gap-2
//                   text-sm font-bold text-white
//                   bg-purple-600 hover:bg-purple-700
//                   px-4 py-2 rounded-xl
//                   transition-colors duration-150
//                   shadow-[0_1px_8px_rgba(124,58,237,0.35)]
//                 "
//               >
//                 {/* Subtle shine line */}
//                 <span
//                   aria-hidden="true"
//                   className="absolute inset-x-0 top-0 h-px bg-white/20"
//                 />
//                 ثبت‌نام رایگان

//                 {/* Arrow icon */}
//                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
//                   <path d="M10 6.5H3M6 3.5L3 6.5L6 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Link>
//             </div>

//             {/* ── Mobile Hamburger ── */}
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
//               aria-expanded={mobileOpen}
//               className="
//                 lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]
//                 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800
//                 transition-colors duration-150
//               "
//             >
//               <span
//                 className={`
//                   block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full
//                   transition-transform duration-200
//                   ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}
//                 `}
//               />
//               <span
//                 className={`
//                   block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full
//                   transition-opacity duration-200
//                   ${mobileOpen ? 'opacity-0' : ''}
//                 `}
//               />
//               <span
//                 className={`
//                   block w-5 h-[1.5px] bg-gray-700 dark:bg-gray-300 rounded-full
//                   transition-transform duration-200
//                   ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}
//                 `}
//               />
//             </button>

//           </div>
//         </div>

//         {/* ── Announcement bar (optional — remove if not needed) ── */}
//         {!scrolled && (
//           <div className="hidden lg:block bg-purple-600 dark:bg-purple-700 text-center py-2">
//             <p className="text-[11px] font-semibold text-purple-100 tracking-wide">
//               ۳ ماه آموزش رایگان برای دانشجویان جدید — تا پایان مهرماه
//               <Link href="/offers" className="mr-2 underline underline-offset-2 text-white hover:text-purple-200 font-bold">
//                 جزئیات بیشتر
//               </Link>
//             </p>
//           </div>
//         )}
//       </header>

//       {/* ── Mobile Drawer ── */}
//       {mobileOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-40"
//           dir="rtl"
//           onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
//         >
//           {/* Backdrop */}
//           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

//           {/* Drawer panel */}
//           <nav
//             className="
//               absolute top-16 right-0 left-0
//               bg-white dark:bg-gray-950
//               border-t border-gray-100 dark:border-gray-800
//               h-[calc(100dvh-4rem)] overflow-y-auto
//               px-5 pt-4 pb-8
//             "
//             aria-label="ناوبری موبایل"
//           >
//             {/* Search bar */}
//             <div className="relative mb-5">
//               <input
//                 type="search"
//                 placeholder="جستجو در دوره‌ها…"
//                 className="
//                   w-full h-10 pl-4 pr-10
//                   bg-gray-50 dark:bg-gray-900
//                   border border-gray-200 dark:border-gray-800
//                   rounded-xl text-sm text-gray-800 dark:text-gray-200
//                   placeholder:text-gray-400
//                   focus:outline-none focus:border-purple-400 dark:focus:border-purple-600
//                   transition-colors
//                 "
//                 aria-label="جستجو"
//               />
//               <svg
//                 width="15" height="15" viewBox="0 0 15 15" fill="none"
//                 aria-hidden="true"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
//                 <path d="M12 12L9.8 9.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//               </svg>
//             </div>

//             {/* Nav items */}
//             <ul className="space-y-1">
//               {NAV_ITEMS.map((item) => {
//                 const hasMega = item.mega && item.mega.length > 0;
//                 const isExpanded = mobileExpanded === item.label;

//                 return (
//                   <li key={item.label}>
//                     {hasMega ? (
//                       <>
//                         <button
//                           onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
//                           className="
//                             w-full flex items-center justify-between
//                             px-4 py-3 rounded-xl
//                             text-sm font-semibold text-gray-700 dark:text-gray-300
//                             hover:bg-gray-50 dark:hover:bg-gray-900
//                             transition-colors duration-150
//                           "
//                           aria-expanded={isExpanded}
//                         >
//                           {item.label}
//                           <ChevronDown open={isExpanded} />
//                         </button>

//                         {isExpanded && (
//                           <div className="mt-1 mb-2 mr-4 pr-4 border-r-2 border-purple-100 dark:border-purple-900/50">
//                             {item.mega?.map((cat, ci) => (
//                               <div key={ci} className="mb-3">
//                                 <p className="text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase px-2 mb-1">
//                                   {cat.category}
//                                 </p>
//                                 {cat.items.map((subItem, si) => (
//                                   <Link
//                                     key={si}
//                                     href={subItem.href}
//                                     onClick={() => setMobileOpen(false)}
//                                     className="
//                                       flex items-center justify-between
//                                       px-2 py-2 rounded-lg
//                                       text-xs text-gray-600 dark:text-gray-400
//                                       hover:text-purple-700 dark:hover:text-purple-300
//                                       hover:bg-purple-50 dark:hover:bg-purple-900/20
//                                       transition-colors duration-150
//                                     "
//                                   >
//                                     {subItem.label}
//                                     {subItem.badge && (
//                                       <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
//                                         {subItem.badge}
//                                       </span>
//                                     )}
//                                   </Link>
//                                 ))}
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <Link
//                         href={item.href}
//                         onClick={() => setMobileOpen(false)}
//                         className="
//                           flex items-center px-4 py-3 rounded-xl
//                           text-sm font-semibold text-gray-700 dark:text-gray-300
//                           hover:bg-gray-50 dark:hover:bg-gray-900
//                           transition-colors duration-150
//                         "
//                       >
//                         {item.label}
//                       </Link>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>

//             {/* Mobile auth */}
//             <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
//               <Link
//                 href="/login"
//                 onClick={() => setMobileOpen(false)}
//                 className="
//                   block w-full text-center text-sm font-semibold py-3 rounded-xl
//                   border border-gray-200 dark:border-gray-800
//                   text-gray-700 dark:text-gray-300
//                   hover:border-purple-200 dark:hover:border-purple-800
//                   transition-colors duration-150
//                 "
//               >
//                 ورود به حساب
//               </Link>
//               <Link
//                 href="/register"
//                 onClick={() => setMobileOpen(false)}
//                 className="
//                   block w-full text-center text-sm font-bold py-3 rounded-xl
//                   bg-purple-600 hover:bg-purple-700 text-white
//                   transition-colors duration-150
//                   shadow-[0_1px_8px_rgba(124,58,237,0.35)]
//                 "
//               >
//                 ثبت‌نام رایگان
//               </Link>
//             </div>

//             {/* Trust badges */}
//             <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
//               {['فنی و حرفه‌ای', 'ISO 9001', 'بین‌المللی'].map((badge) => (
//                 <div
//                   key={badge}
//                   className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 dark:text-gray-600"
//                 >
//                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
//                     <path
//                       d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   {badge}
//                 </div>
//               ))}
//             </div>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// }
