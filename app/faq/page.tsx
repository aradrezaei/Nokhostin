'use client';

import { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Phone,
  Mail,
  Award,
  BookOpen,
  Users,
  Briefcase,
  CreditCard,
  Clock,
  GraduationCap,
  RefreshCw,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    category: 'مدرک و اعتبار',
    icon: Award,
    q: 'آیا مدرک آموزشگاه معتبر و قابل ترجمه است؟',
    a: 'بله. تمام دوره‌های آموزشگاه نخستین به آزمون رسمی سازمان فنی و حرفه‌ای کشور ختم می‌شوند. پس از قبولی، مدرک بین‌المللی دریافت می‌کنید که قابل ترجمه رسمی و دارای اعتبار جهانی در بازار کار است.',
  },
  {
    category: 'آموزش',
    icon: BookOpen,
    q: 'کلاس‌ها حضوری است یا آنلاین؟',
    a: 'دوره‌ها به هر دو صورت برگزار می‌شوند. کلاس‌های حضوری با حداکثر ۵ دانشجو برای بازدهی حداکثری و کلاس‌های آنلاین از طریق پلتفرم اختصاصی با پشتیبانی کامل در دسترس هستند.',
  },
  {
    category: 'آموزش',
    icon: GraduationCap,
    q: 'آیا جلسه اول رایگان است؟',
    a: 'بله. اولین جلسه هر دوره جهت آشنایی با استاد، محیط آموزشی و شیوه تدریس کاملاً رایگان و بدون تعهد است.',
  },
  {
    category: 'آزمون و مدرک',
    icon: RefreshCw,
    q: 'آزمون فنی و حرفه‌ای چگونه برگزار می‌شود؟',
    a: 'پس از اتمام دوره، تیم ما شما را در نزدیک‌ترین مرکز فنی و حرفه‌ای ثبت‌نام کرده و کلاس‌های جمع‌بندی ویژه آزمون را برای موفقیت ۱۰۰٪ شما برگزار می‌کند.',
  },
  {
    category: 'اشتغال',
    icon: Briefcase,
    q: 'آیا تضمین اشتغال دارید؟',
    a: 'بیش از ۸۰٪ دوره‌های تخصصی شامل معرفی به بازار کار هستند. آمار ما نشان می‌دهد بیش از ۶۵٪ فارغ‌التحصیلان در سه ماه اول جذب بازار کار می‌شوند.',
  },
  {
    category: 'پرداخت',
    icon: CreditCard,
    q: 'آیا امکان پرداخت اقساطی وجود دارد؟',
    a: 'بله، امکان پرداخت در ۳ تا ۶ قسط بدون کارمزد برای اکثر دوره‌ها فراهم است. همچنین برای پرداخت‌های یکجا، تخفیف‌های ویژه‌ای در نظر گرفته شده است.',
  },
  {
    category: 'ساعات و آدرس',
    icon: Clock,
    q: 'ساعات کاری و آدرس آموزشگاه چیست؟',
    a: 'شعب حضوری: ۱۰ صبح تا ۹ شب | پلتفرم آنلاین: ۷ صبح تا ۱۱ شب. آدرس: تهران، اندیشه، فاز ۱، نرسیده به شاهد غربی.',
  },
  {
    category: 'اساتید',
    icon: Users,
    q: 'اساتید چه سطحی از تجربه دارند؟',
    a: 'تمامی اساتید دارای مدرک ارشد یا دکترا و حداقل ۵ سال سابقه فعالیت در صنعت هستند تا دانش کاربردی و روز را منتقل کنند.',
  },
];

const CATEGORIES = [...new Set(FAQS.map((f) => f.category))];

// ─── FAQ Item ──────────────────────────────────────────────────────────────
const FAQItem = memo(function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: any;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'bg-indigo-50/50 dark:bg-slate-800/50 border-indigo-200 dark:border-indigo-900'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
      >
        <span className="font-semibold text-slate-800 dark:text-slate-100">{faq.q}</span>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
        />
      </button>

      {/* بخش پاسخ که دقیقاً از ابتدای سطر شروع می‌شود */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('همه');

  const filtered =
    activeCategory === 'همه' ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">سوالات متداول</h1>
          <p className="text-slate-600 dark:text-slate-400">
            پاسخ به دغدغه‌های شما برای شروع یک مسیر حرفه‌ای
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['همه', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium  ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filtered.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-16 p-8 rounded-3xl bg-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-800 rounded-2xl">
              <MessageCircle />
            </div>
            <div>
              <h3 className="font-bold text-lg">پاسخ سوالتان را نیافتید؟</h3>
              <p className="text-indigo-200 text-sm">کارشناسان ما آماده پاسخگویی مستقیم هستند</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </main>
  );
}
