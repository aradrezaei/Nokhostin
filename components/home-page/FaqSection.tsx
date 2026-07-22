'use client';

import { useState } from 'react';

// ─── SVG Icons (بدون کتابخانه) ────────────────────────────────────────────────

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <path d="M8 2V14M2 8H14" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <path d="M2 8H14" />
  </svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────────

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'آیا دوره‌ها به‌صورت آنلاین هستند یا حضوری؟',
    answer: 'ما در آموزشگاه نخستین هم دوره‌های حضوری و هم آنلاین داریم.',
  },
  {
    id: 2,
    question: 'آیا برای شروع دوره‌ها نیاز به پیش‌نیاز است؟',
    answer: 'دوره‌های پایه خیر، اما دوره‌های پیشرفته نیاز به بررسی دارند.',
  },
  {
    id: 3,
    question: 'شرایط برگزاری دوره‌های حضوری چیست؟',
    answer: 'طبق زمان‌بندی آزاد شما، کلاس‌ها تنظیم می‌شود.',
  },
  {
    id: 4,
    question: 'گواهی‌نامه دوره چه اعتباری دارد؟',
    answer: 'ما دو نوع گواهی با اعتبار بالا ارائه می‌دهیم.',
  },
  {
    id: 5,
    question: 'امکان مشاهده آفلاین ویدیوها وجود دارد؟',
    answer: 'دانلود خیر، اما تا ۶ ماه به محتوا و پشتیبانی دسترسی دارید.',
  },
  {
    id: 6,
    question: 'امکان خرید اقساطی وجود دارد؟',
    answer: 'بله، شرایط اقساطی برای تمام دوره‌ها فراهم است.',
  },
  {
    id: 7,
    question: 'ساعات پاسخ‌دهی تیم پشتیبانی؟',
    answer: 'شنبه تا چهارشنبه ۸ تا ۲۰، پنجشنبه‌ها ۸ تا ۱۴.',
  },
  {
    id: 8,
    question: 'چه زمانی گواهی‌نامه صادر می‌شود؟',
    answer: 'پس از قبولی در آزمون داخلی و در صورت نیاز، آزمون فنی‌وحرفه‌ای.',
  },
];

// ─── FAQ Component ─────────────────────────────────────────────────────────────

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
      className={`
      border-2 border-[#E5E5E5] dark:border-[#37464F] 
      border-b-[6px] rounded-2xl overflow-hidden
      ${isOpen ? 'bg-[#f0fcff] dark:bg-[#1a2d33]' : 'bg-white dark:bg-[#202F36]'}
    `}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
      >
        <span className="text-[15px] font-extrabold text-[#4B4B4B] dark:text-white">
          {item.question}
        </span>
        <span
          className={`
          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
          ${isOpen ? 'bg-[#1CB0F6] text-white' : 'bg-[#E5E5E5] dark:bg-[#37464F] text-[#77858F]'}
        `}
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 text-[14px] font-bold text-[#77858F] dark:text-[#AFAFAF] leading-7 border-t-2 border-[#E5E5E5] dark:border-[#37464F] pt-4">
          {item.answer}
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const half = Math.ceil(FAQS.length / 2);
  const leftCol = FAQS.slice(0, half);
  const rightCol = FAQS.slice(half);

  return (
    <section className="py-20 bg-white dark:bg-[#131F24]" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#4B4B4B] dark:text-white mb-4">
            سوالات متداول
          </h2>
          <p className="text-lg font-bold text-[#AFAFAF] dark:text-[#77858F]">
            پاسخ سریع به سوالات پرتکرار شما.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {leftCol.map((item) => (
              <FAQRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightCol.map((item) => (
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
