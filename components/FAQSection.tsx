import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'آیا دوره‌ها به‌صورت آنلاین هستند یا حضوری؟',
    answer:
      'ما در آکادمی نخستین هر دو نوع دوره حضوری (در سایت‌های مجهز کارگاهی) و آنلاین (به‌صورت استریم زنده با کیفیت بالا) را خدمت مهارت‌آموزانمان ارائه می‌دهیم.',
  },
  {
    question: 'آیا برای شروع دوره ICDL نیاز به پیش‌نیاز خاصی دارم؟',
    answer:
      'خیر، این دوره کاملاً از صفر و پایه شروع می‌شود و نیاز به هیچ دانش یا پیش‌نیاز قبلی در حوزه کامپیوتر ندارد.',
  },
  {
    question: 'شرایط برگزاری دوره‌های حضوری به چه صورت است؟',
    answer:
      'سیستم برنامه‌ریزی آکادمی نخستین کاملاً منعطف است؛ ابتدا شما زمان‌های آزاد خود را اعلام می‌کنید و سپس مربیان طبق آن برای شما کد کلاسی فعال می‌کنند.',
  },
  {
    question: 'گواهی‌نامه دوره چه اعتباری دارد؟',
    answer:
      'مدارک صادر شده تحت نظر سازمان آموزش فنی و حرفه‌ای کشور بوده و به دلیل داشتن کد بین‌المللی استاندارد شغلی، در بیش از ۱۸۰ کشور دنیا معتبر و قابل ترجمه رسمی هستند.',
  },
  {
    question: 'آیا امکان دسترسی به فایل‌های کارگاهی وجود دارد؟',
    answer:
      'بله، تمامی کارآموزان به پنل اختصاصی آکادمی دسترسی دارند که در آن فایل‌های تمرینی و نمونه سوالات آزمون‌های گذشته بدون محدودیت زمانی در دسترس است.',
  },
  {
    question: 'آیا امکان پرداخت اقساطی شهریه وجود دارد؟',
    answer:
      'بله، برای رفاه حال دانشجویان، امکان پرداخت شهریه در ۲ الی ۳ قسط مجزا در طول دوره فراهم شده است.',
  },
];

export default function FAQSection() {
  return (
    <section
      className="py-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-t border-gray-100 dark:border-gray-900"
      dir="rtl"
    >
      <div className="max-w-screen-md mx-auto px-6">
        {/* هدر بخش - کاملاً بهینه برای SEO */}
        <div className="mb-10 text-right">
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <HelpCircle size={22} className="text-blue-600 dark:text-blue-500" aria-hidden="true" />
            سوالات متداول کارآموزان
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
            پاسخ‌های کوتاه و شفاف به پرسش‌های رایج شما درباره دوره ICDL.
          </p>
        </div>

        {/* استفاده از کامپوننت نیتیو وب HTML5 برای سئو و سرعت فوق‌العاده */}
        <div className="space-y-2">
          {FAQS.map((item, index) => (
            <details
              key={index}
              className="group border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-4 text-sm md:text-base font-bold text-gray-900 dark:text-white cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-xl">
                <span>{item.question}</span>
                <span
                  className="text-blue-600 dark:text-blue-500 text-lg transition-transform duration-150 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-4 pb-4 pt-1 border-t border-gray-200/50 dark:border-gray-800/50">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-7 font-medium">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
