import FaqAccordion from '@/components/marketing/faq/FaqAccordion';

const FAQS = [
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

export default function FAQSection() {
  return (
    <section
      className="bg-white py-16 dark:bg-[#131F24] sm:py-20"
      dir="rtl"
      aria-labelledby="home-faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 text-center sm:mb-12">
          <h2
            id="home-faq-heading"
            className="text-3xl font-extrabold text-[#4B4B4B] dark:text-white md:text-4xl"
          >
            سوالات متداول
          </h2>
          <p className="mt-3 text-lg font-bold text-[#5B6472] dark:text-[#94A3B8]">
            پاسخ سریع به سوالات پرتکرار شما.
          </p>
        </header>

        <FaqAccordion items={FAQS} columns={2} groupName="home-faq" />
      </div>
    </section>
  );
}
