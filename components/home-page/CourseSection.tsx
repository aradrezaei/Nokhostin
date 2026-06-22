import { Play, Building2, CheckCircle2 } from 'lucide-react';

const onlineBenefits = [
  'دسترسی ۲۴/۷ به ویدیوهای آموزشی',
  'امکان مشاهده بارها و بارها',
  'صرفه‌جویی در هزینه و زمان رفت‌وآمد',
  'پشتیبانی آنلاین و رفع اشکال',
];

const inPersonBenefits = [
  'تعامل مستقیم با اساتید برتر',
  'محیط کارگاهی و تجهیزات واقعی',
  'شبکه‌سازی حرفه‌ای و ارتباط با هم‌دوره‌ها',
  'تمرکز بالا و نظم در آموزش',
];

export default function CourseSection() {
  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text- center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">کدوم مسیر برات مناسب تره؟</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            آموزشگاه ما با دو متد حضوری و آنلاین، برای هر شرایطی مسیر ویژه‌ای طراحی کرده.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* کارت آنلاین */}
          <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-500 shadow-xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-4 bg-blue-500/5 rounded-bl-3xl">
              <Play className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 mt-8">دوره آنلاین</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              مناسب برای کسانی که مشغله دارند و می‌خواهند در هر زمان و مکانی، با کیفیت بالا متخصص
              شوند.
            </p>
            <ul className="space-y-4 mb-8">
              {onlineBenefits.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <a
              href="/register/online"
              className="block text-center py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              شروع یادگیری آنلاین
            </a>
          </div>

          {/* کارت حضوری */}
          <div className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all duration-500 shadow-xl hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-4 bg-purple-500/5 rounded-bl-3xl">
              <Building2 className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 mt-8">دوره حضوری</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              اگر یادگیری در محیط واقعی، لمس ابزار و شبکه سازی با اساتید برایتان اولویت است، این
              دوره مخصوص شماست.
            </p>
            <ul className="space-y-4 mb-8">
              {inPersonBenefits.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" /> {item}
                </li>
              ))}
            </ul>
            <a
              href="/register/in-person"
              className="block text-center py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
            >
              شروع یادگیری حضوری
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
