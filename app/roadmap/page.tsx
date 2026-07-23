'use client';

import { useState, useEffect } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Trophy,
  Target,
  Rocket,
} from 'lucide-react';

interface Skill {
  name: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'course' | 'tutorial' | 'practice';
}

interface Stage {
  id: number;
  title: string;
  icon: string;
  duration: string;
  description: string;
  color: string;
  skills: Skill[];
  projects: Project[];
  resources: Resource[];
}

const roadmapData: Stage[] = [
  {
    id: 1,
    title: 'HTML & CSS',
    icon: '🎨',
    duration: '2-3 ماه',
    description:
      'پایه و اساس توسعه وب. HTML ساختار صفحات را تعریف می‌کند و CSS زیبایی‌های بصری را به آن اضافه می‌کند. این مرحله اساسی‌ترین بخش یادگیری فرانت‌اند است.',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Semantic HTML', description: 'استفاده از تگ‌های معنایی برای ساختار بهتر' },
      { name: 'CSS Flexbox', description: 'چیدمان انعطاف‌پذیر المان‌ها' },
      { name: 'CSS Grid', description: 'سیستم لایه‌بندی پیشرفته' },
      { name: 'Responsive Design', description: 'طراحی واکنش‌گرا برای دستگاه‌های مختلف' },
      { name: 'CSS Animations', description: 'انیمیشن‌های روان و حرفه‌ای' },
      { name: 'CSS Variables', description: 'متغیرها برای مدیریت بهتر استایل‌ها' },
      { name: 'BEM Methodology', description: 'روش نام‌گذاری استاندارد CSS' },
    ],
    projects: [
      {
        title: 'صفحه فرود شخصی',
        description: 'طراحی یک landing page جذاب با انیمیشن',
        difficulty: 'beginner',
      },
      {
        title: 'کلون سایت معروف',
        description: 'بازسازی رابط کاربری سایت‌های معروف مانند Apple',
        difficulty: 'intermediate',
      },
      {
        title: 'داشبورد مدیریتی',
        description: 'ساخت یک پنل ادمین کامل',
        difficulty: 'intermediate',
      },
      {
        title: 'فرم چند مرحله‌ای',
        description: 'فرم ثبت‌نام با مراحل مختلف و اعتبارسنجی',
        difficulty: 'beginner',
      },
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'documentation' },
      { title: 'دوره HTML/CSS نخستین', url: '#', type: 'course' },
      { title: 'CSS-Tricks', url: 'https://css-tricks.com', type: 'tutorial' },
      { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com', type: 'practice' },
    ],
  },
  {
    id: 2,
    title: 'JavaScript',
    icon: '⚡',
    duration: '3-4 ماه',
    description:
      'زبان برنامه‌نویسی وب که قدرت تعامل و پویایی را به صفحات شما می‌بخشد. JavaScript پایه و اساس تمام فریمورک‌های مدرن است.',
    color: 'from-yellow-500 to-orange-500',
    skills: [
      { name: 'ES6+ Features', description: 'ویژگی‌های مدرن جاوااسکریپت' },
      { name: 'DOM Manipulation', description: 'کار با عناصر HTML از طریق JavaScript' },
      { name: 'Async/Await', description: 'برنامه‌نویسی ناهمگام' },
      { name: 'Fetch API', description: 'دریافت و ارسال داده از سرور' },
      { name: 'Array Methods', description: 'متدهای پیشرفته کار با آرایه‌ها' },
      { name: 'OOP & Classes', description: 'برنامه‌نویسی شی‌گرا' },
      { name: 'Modules', description: 'ماژول‌بندی کد برای مدیریت بهتر' },
      { name: 'Error Handling', description: 'مدیریت خطاها و اشکال‌زدایی' },
    ],
    projects: [
      { title: 'برنامه Todo', description: 'مدیریت وظایف با LocalStorage', difficulty: 'beginner' },
      {
        title: 'اپلیکیشن هواشناسی',
        description: 'نمایش وضعیت آب و هوا با API',
        difficulty: 'intermediate',
      },
      {
        title: 'ماشین حساب پیشرفته',
        description: 'ماشین حساب علمی با عملکرد کامل',
        difficulty: 'beginner',
      },
      {
        title: 'آزمون آنلاین',
        description: 'سیستم Quiz با تایمر و نمره‌دهی',
        difficulty: 'intermediate',
      },
      { title: 'گالری تصاویر', description: 'نمایش و جستجوی تصاویر', difficulty: 'intermediate' },
    ],
    resources: [
      { title: 'JavaScript.info', url: 'https://javascript.info', type: 'documentation' },
      { title: 'دوره JavaScript نخستین', url: '#', type: 'course' },
      { title: 'FreeCodeCamp', url: 'https://freecodecamp.org', type: 'tutorial' },
      { title: 'JavaScript30', url: 'https://javascript30.com', type: 'practice' },
    ],
  },
  {
    id: 3,
    title: 'React',
    icon: '⚛️',
    duration: '3-4 ماه',
    description:
      'محبوب‌ترین کتابخانه JavaScript برای ساخت رابط‌های کاربری. React با معماری Component-based، توسعه اپلیکیشن‌های پیچیده را ساده می‌کند.',
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Components', description: 'ساخت کامپوننت‌های قابل استفاده مجدد' },
      { name: 'Hooks', description: 'useState, useEffect و سایر Hooks' },
      { name: 'Props & State', description: 'مدیریت داده‌ها در کامپوننت‌ها' },
      { name: 'Context API', description: 'مدیریت state سراسری' },
      { name: 'React Router', description: 'مسیریابی در اپلیکیشن' },
      { name: 'Custom Hooks', description: 'ساخت Hook‌های اختصاصی' },
      { name: 'Performance', description: 'بهینه‌سازی عملکرد' },
      { name: 'Testing', description: 'تست کامپوننت‌ها با Jest و RTL' },
    ],
    projects: [
      {
        title: 'فروشگاه آنلاین',
        description: 'E-commerce با سبد خرید و پرداخت',
        difficulty: 'advanced',
      },
      { title: 'شبکه اجتماعی', description: 'پلتفرم اشتراک‌گذاری محتوا', difficulty: 'advanced' },
      {
        title: 'سیستم وبلاگ',
        description: 'پلتفرم انتشار مقاله با CMS',
        difficulty: 'intermediate',
      },
      { title: 'مدیریت پروژه', description: 'ابزار Task Management', difficulty: 'intermediate' },
      { title: 'چت آنلاین', description: 'سیستم پیام‌رسانی Real-time', difficulty: 'advanced' },
    ],
    resources: [
      { title: 'React Documentation', url: 'https://react.dev', type: 'documentation' },
      { title: 'دوره React نخستین', url: '#', type: 'course' },
      { title: 'React Projects', url: '#', type: 'tutorial' },
      { title: 'Epic React', url: 'https://epicreact.dev', type: 'course' },
    ],
  },
  {
    id: 4,
    title: 'Next.js',
    icon: '▲',
    duration: '2-3 ماه',
    description:
      'فریمورک React برای Production. Next.js با ویژگی‌هایی مانند SSR، SSG، API Routes و بهینه‌سازی‌های داخلی، توسعه اپلیکیشن‌های مقیاس‌پذیر را تسهیل می‌کند.',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'App Router', description: 'سیستم مسیریابی جدید Next.js 13+' },
      { name: 'Server Components', description: 'کامپوننت‌های سمت سرور' },
      { name: 'API Routes', description: 'ساخت API در خود Next.js' },
      { name: 'SSR & SSG', description: 'رندر سمت سرور و تولید استاتیک' },
      { name: 'Image Optimization', description: 'بهینه‌سازی خودکار تصاویر' },
      { name: 'Middleware', description: 'پردازش درخواست‌ها قبل از رسیدن' },
      { name: 'Authentication', description: 'سیستم احراز هویت' },
      { name: 'Deployment', description: 'استقرار روی Vercel و سرورها' },
    ],
    projects: [
      {
        title: 'پلتفرم وبلاگ',
        description: 'Full-stack blog با Prisma و Database',
        difficulty: 'advanced',
      },
      { title: 'فروشگاه کامل', description: 'E-commerce با پنل مدیریت', difficulty: 'advanced' },
      {
        title: 'داشبورد SaaS',
        description: 'پنل کاربری برای سرویس‌های SaaS',
        difficulty: 'advanced',
      },
      {
        title: 'پورتفولیو حرفه‌ای',
        description: 'وب‌سایت شخصی با CMS',
        difficulty: 'intermediate',
      },
      { title: 'پلتفرم آموزشی', description: 'سیستم LMS کامل', difficulty: 'advanced' },
    ],
    resources: [
      { title: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'documentation' },
      { title: 'دوره Next.js نخستین', url: '#', type: 'course' },
      {
        title: 'Next.js Examples',
        url: 'https://github.com/vercel/next.js/tree/canary/examples',
        type: 'tutorial',
      },
      { title: 'Vercel Templates', url: 'https://vercel.com/templates', type: 'practice' },
    ],
  },
  {
    id: 5,
    title: 'پیشرفته و تخصصی',
    icon: '🚀',
    duration: 'مادام‌العمر',
    description:
      'مسیر تبدیل شدن به متخصص. این مرحله شامل یادگیری تکنولوژی‌های پیشرفته، بهینه‌سازی‌های حرفه‌ای و مشارکت در پروژه‌های بزرگ است. یادگیری در این حوزه هیچ‌وقت تمام نمی‌شود.',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'TypeScript', description: 'JavaScript با تایپ استاتیک' },
      { name: 'State Management', description: 'Zustand, Redux, Jotai' },
      { name: 'Testing', description: 'Cypress, Playwright, Vitest' },
      { name: 'GraphQL', description: 'زبان کوئری برای API' },
      { name: 'Performance', description: 'بهینه‌سازی عملکرد وب' },
      { name: 'Accessibility', description: 'دسترسی‌پذیری (a11y)' },
      { name: 'CI/CD', description: 'یکپارچه‌سازی و استقرار مداوم' },
      { name: 'Architecture', description: 'معماری نرم‌افزار مقیاس‌پذیر' },
    ],
    projects: [
      {
        title: 'Design System',
        description: 'سیستم طراحی کامل برای سازمان',
        difficulty: 'advanced',
      },
      { title: 'Open Source', description: 'مشارکت در پروژه‌های متن‌باز', difficulty: 'advanced' },
      {
        title: 'پروژه Real-world',
        description: 'اپلیکیشن تجاری با کاربران واقعی',
        difficulty: 'advanced',
      },
      {
        title: 'Performance Audit',
        description: 'تحلیل و بهینه‌سازی عملکرد',
        difficulty: 'advanced',
      },
      {
        title: 'Technical Writing',
        description: 'نوشتن مقالات فنی و آموزشی',
        difficulty: 'intermediate',
      },
    ],
    resources: [
      {
        title: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs',
        type: 'documentation',
      },
      { title: 'دوره‌های پیشرفته نخستین', url: '#', type: 'course' },
      { title: 'Frontend Masters', url: 'https://frontendmasters.com', type: 'course' },
      { title: 'Web.dev', url: 'https://web.dev', type: 'tutorial' },
    ],
  },
];

export default function FrontendRoadmap() {
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('completedStages');
    if (saved) {
      scheduleEffect(() => {
        try {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.every((stage) => typeof stage === 'number')) {
            setCompletedStages(parsed);
          }
        } catch {
          // Ignore an invalid persisted roadmap state.
        }
      });
    }
  }, []);

  const toggleStage = (stageId: number) => {
    const updated = completedStages.includes(stageId)
      ? completedStages.filter((id) => id !== stageId)
      : [...completedStages, stageId];

    setCompletedStages(updated);
    localStorage.setItem('completedStages', JSON.stringify(updated));
  };

  const progress = (completedStages.length / roadmapData.length) * 100;

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const difficultyLabels = {
    beginner: 'مبتدی',
    intermediate: 'متوسط',
    advanced: 'پیشرفته',
  };

  const resourceIcons = {
    documentation: <BookOpen className="w-4 h-4" />,
    course: <Code2 className="w-4 h-4" />,
    tutorial: <Sparkles className="w-4 h-4" />,
    practice: <Target className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                نقشه راه توسعه‌دهنده Frontend
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                مسیر جامع یادگیری از صفر تا صد
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {completedStages.length} از {roadmapData.length} مرحله
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 h-full bg-gradient-to-l from-indigo-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {roadmapData.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isExpanded = expandedStage === stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < roadmapData.length - 1 && (
                  <div className="absolute right-[47px] top-24 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700" />
                )}

                <div
                  className={`
                  relative bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? 'border-green-500 dark:border-green-600'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }
                  ${isExpanded ? 'shadow-xl' : 'shadow-lg hover:shadow-xl'}
                `}
                >
                  {/* Stage Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => {
                      setExpandedStage(isExpanded ? null : stage.id);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Stage Number */}
                      <div
                        className={`
                        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold
                        bg-gradient-to-br ${stage.color} text-white shadow-lg
                      `}
                      >
                        {stage.icon}
                      </div>

                      {/* Stage Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {stage.title}
                          </h2>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <Clock className="w-3.5 h-3.5" />
                            {stage.duration}
                          </span>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>

                      {/* Completion Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStage(stage.id);
                        }}
                        className={`
                          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all
                          ${
                            isCompleted
                              ? 'bg-green-500 text-white scale-110'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      {/* Expand Button */}
                      <button className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <ChevronDown
                          className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <div className="p-6 space-y-6">
                        {/* Skills */}
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                            مهارت‌های کلیدی
                          </h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {stage.skills.map((skill, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                              >
                                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                                  {skill.name}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                  {skill.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-purple-600" />
                            پروژه‌های پیشنهادی
                          </h3>
                          <div className="space-y-3">
                            {stage.projects.map((project, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="font-semibold text-slate-900 dark:text-white mb-1">
                                      {project.title}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                      {project.description}
                                    </div>
                                  </div>
                                  <span
                                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}
                                  >
                                    {difficultyLabels[project.difficulty]}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-cyan-600" />
                            منابع آموزشی
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {stage.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors group"
                              >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                  {resourceIcons[resource.type]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-slate-900 dark:text-white truncate">
                                    {resource.title}
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <Rocket className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">آماده برای شروع یادگیری؟</h2>
            <p className="text-lg text-indigo-100 mb-6 leading-relaxed">
              با آموزشگاه نخستین، مسیر حرفه‌ای شدن را با اساتید برتر و پروژه‌های واقعی طی کنید. بیش
              از 8500 دانشجو قبل از شما این مسیر را با موفقیت پشت سر گذاشته‌اند.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-xl">
              مشاهده دوره‌های آموزشی
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
