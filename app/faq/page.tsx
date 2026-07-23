import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/marketing/faq/FaqAccordion';

const PAGE_URL = 'https://nokhostin.org/faq';
const PAGE_TITLE = 'سوالات متداول | آموزشگاه نخستین';
const PAGE_DESCRIPTION =
  'پاسخ سوالات پرتکرار درباره مدرک فنی و حرفه‌ای، کلاس‌های حضوری و آنلاین، اقساط شهریه، آزمون و مسیر یادگیری در آموزشگاه نخستین اندیشه.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/faq', languages: { 'fa-IR': '/faq' } },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: 'آموزشگاه نخستین',
    locale: 'fa_IR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    id: 1,
    question: 'آیا مدرک آموزشگاه معتبر و قابل ترجمه است؟',
    answer:
      'بله. دوره‌های آموزشگاه نخستین به آزمون رسمی سازمان فنی و حرفه‌ای ختم می‌شوند. پس از قبولی، مدرک قابل ترجمه رسمی و استعلام دریافت می‌کنید.',
  },
  {
    id: 2,
    question: 'کلاس‌ها حضوری است یا آنلاین؟',
    answer:
      'هر دو حالت برگزار می‌شود. کلاس‌های حضوری با ظرفیت محدود و کلاس‌های آنلاین با پشتیبانی کامل در دسترس هستند.',
  },
  {
    id: 3,
    question: 'آیا جلسه اول رایگان است؟',
    answer: 'بله. اولین جلسه هر دوره برای آشنایی با استاد و شیوه تدریس رایگان و بدون تعهد است.',
  },
  {
    id: 4,
    question: 'آزمون فنی و حرفه‌ای چگونه برگزار می‌شود؟',
    answer:
      'پس از اتمام دوره، ثبت‌نام در مرکز فنی و حرفه‌ای و آمادگی آزمون با راهنمایی تیم آموزشگاه انجام می‌شود.',
  },
  {
    id: 5,
    question: 'آیا معرفی به بازار کار دارید؟',
    answer:
      'در دوره‌های تخصصی، فارغ‌التحصیلان برای فرصت‌های شغلی مرتبط معرفی می‌شوند و در آماده‌سازی رزومه همراهی می‌شوند.',
  },
  {
    id: 6,
    question: 'آیا امکان پرداخت اقساطی وجود دارد؟',
    answer:
      'بله، برای بیشتر دوره‌ها پرداخت چندقسطی بدون کارمزد فراهم است. برای پرداخت یکجا هم تخفیف در نظر گرفته می‌شود.',
  },
  {
    id: 7,
    question: 'ساعات کاری و آدرس آموزشگاه چیست؟',
    answer: 'شعب حضوری معمولاً از ۱۰ صبح تا ۹ شب فعال است. آدرس: شهرک اندیشه، فاز سه.',
  },
  {
    id: 8,
    question: 'اساتید چه تجربه‌ای دارند؟',
    answer:
      'اساتید با سابقه عملی در صنعت انتخاب می‌شوند تا آموزش کاربردی و نزدیک به نیاز بازار کار باشد.',
  },
] as const;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function FAQPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f3f6f7] dark:bg-[#0b1418]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <header className="mb-10 text-center sm:mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#10242a] dark:text-[#edf3f5] sm:text-4xl">
            سوالات متداول
          </h1>
          <p className="mt-3 text-[15px] font-medium leading-7 text-[#5c6b71] dark:text-[#93a5ac]">
            پاسخ کوتاه به پرتکرارترین سوال‌ها درباره آموزشگاه نخستین.
          </p>
        </header>

        <FaqAccordion items={FAQS} columns={2} groupName="faq-page" />

        <aside className="mt-12 rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] px-6 py-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-lg font-extrabold">پاسخ سوالتان را پیدا نکردید؟</h2>
            <p className="mt-1 text-sm font-medium text-white/80">
              از صفحه تماس، مستقیم با پشتیبانی در ارتباط باشید.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex h-11 shrink-0 items-center justify-center rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-white px-6 text-sm font-extrabold text-[#5b21b6] sm:mt-0"
          >
            تماس با ما
          </Link>
        </aside>
      </section>
    </main>
  );
}
