'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'courses' | 'payment' | 'certificate';
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const FAQS: FAQItem[] = [
  {
    id: 1,
    category: 'general',
    question: 'آیا دوره‌ها به‌صورت آنلاین هستند یا حضوری؟',
    answer:
      'ما در آموزشگاه نخستین افتخار داریم دو نوع دوره حضوری و آنلاین رو خدمت مهارت آموزانمان ارائه دهیم.',
  },
  {
    id: 2,
    category: 'courses',
    question: 'آیا برای شروع دوره‌ها نیاز به پیش‌نیاز خاصی دارم؟',
    answer:
      'برای دوره های پایه نیازی ببه پیش نیاز نیست اما دوره های سطح بالاتر نیازمند پیشنیاز های خاص خود هستند که در صفحه توضیحات همان دوره ذکر شده است.',
  },
  {
    id: 3,
    category: 'payment',
    question: 'شرایط برگذاری دوره های حضوری به چه صورت است؟',
    answer:
      'ابتدا شما یک لیست از زمان های آزادتون به ما میدهید و سپس ما طبق آنها برایتان کلاس تشکیل میدهیم.',
  },
  {
    id: 4,
    category: 'certificate',
    question: 'گواهی‌نامه دوره چه اعتباری دارد؟',
    answer: 'ما در نخستین دو نوع گواهینامه صادر میکنیم که هر دو اعتبار بالایی دارند.',
  },
  {
    id: 5,
    category: 'courses',
    question: 'آیا امکان دانلود ویدیوها برای مشاهده آفلاین وجود دارد؟',
    answer:
      'امکان دانلود ویدیو ها وجود ندارد اما تا ۶ ماه محتویات دوره در دسترس شما قرار دارد به همراه تیم پشتیبانیه ما.',
  },
  {
    id: 6,
    category: 'payment',
    question: 'آیا امکان خرید اقساطی دوره‌ها وجود دارد؟',
    answer:
      'در هر دو نوع دوره هم حضوری و هم آنلاین امکان  پرداخت اقساطی وجود دارد اما با توجه به نوع دوره شرایط اقساط فرق میکند.',
  },
  {
    id: 7,
    category: 'general',
    question: 'تیم پشتیبانی چگونه و در چه ساعاتی پاسخگو است؟',
    answer:
      'تیم پشتیبانی ما از شنبه تا چهارشنبه ۸ تا ۲۰ و پنجشنبه‌ها ۸ تا ۱۴ آماده پاسخگویی است. می‌توانید از طریق چت آنلاین و تلفن با ما در ارتباط باشید. میانگین زمان پاسخ‌دهی ما کمتر از ۲ ساعت است.',
  },
  {
    id: 8,
    category: 'certificate',
    question: 'چه زمانی گواهی‌نامه دوره صادر می‌شود؟',
    answer:
      'بعد از قبول شدن در امتحان داخلیه آموزشگاه مدرک داخلی آموزشگاه برای شما صادر میشود اما اگر به مدرک فنی و حرفه ای نیاز دارید پس از قبول شدن در ازمون داخلی  به نزدیکترین مرکز آموزشی در استان خود شمارا معرفی میکنیم و پس از قبول شدن در امتحان فنی و حرفه ای مدرک شما صادر میشود.',
  },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
        isOpen
          ? 'border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-900'
          : 'border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-bold">{item.question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? ' bg-slate-300 dark:bg-slate-700 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
          }`}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 pb-5 pt-4 text-sm text-gray-500 dark:text-gray-400 leading-7 border-t border-gray-50 dark:border-gray-800">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const half = Math.ceil(FAQS.length / 2);
  const leftCol = FAQS.slice(0, half);
  const rightCol = FAQS.slice(half);

  return (
    <section className="py-20 bg-white dark:bg-gray-950" dir="rtl">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="max-w-xl mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
            سوالات{' '}
            <span className="relative">
              متداول
              <span className="absolute -bottom-1 right-0 left-0 h-[4px] bg-purple-500 rounded-full" />
            </span>
          </h2>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-7">
            پاسخ سوالات رایج را اینجا بیابید. اگر پاسخ خود را نیافتید,
            <a href="./contact" className="text-purple-700 dark:text-purple-500">
              {' '}
              تیم پشتیبانی{' '}
            </a>
            ما آماده کمک است.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Right column */}
          <div className="flex flex-col gap-3">
            {rightCol.map((item) => (
              <FAQRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftCol.map((item) => (
              <FAQRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
