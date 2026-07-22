'use client';

// آیکون‌های تمیز، دقیق و استاندارد (خط‌محور، بدون نیاز به کتابخانه)
// نکته: تمام SVGها aria-hidden هستند چون صرفاً تزئینی‌اند و متن کنارشان محتوا را توضیح می‌دهد.
const icons = {
  Medal: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Globe: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Plane: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Bank: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 21 8 3 8 12 2" />
    </svg>
  ),
  Store: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
};

const benefits = [
  {
    title: 'مدرک فنی و حرفه‌ای',
    desc: 'معتبر در سراسر کشور',
    icon: icons.Medal,
    color: 'text-[#58CC02]',
    bg: 'bg-[#ddf4c4] dark:bg-[#2b4216]',
    border: 'border-[#58CC02]',
    hoverBorder: 'hover:border-[#58CC02]',
  },
  {
    title: 'اعتبار جهانی',
    desc: 'قابل ترجمه رسمی برای خارج',
    icon: icons.Globe,
    color: 'text-[#1CB0F6]',
    bg: 'bg-[#d1effc] dark:bg-[#123e53]',
    border: 'border-[#1CB0F6]',
    hoverBorder: 'hover:border-[#1CB0F6]',
  },
  {
    title: 'امتیاز مهاجرت',
    desc: 'امتیاز طلایی برای ویزای کار',
    icon: icons.Plane,
    color: 'text-[#CE82FF]',
    bg: 'bg-[#f4e0ff] dark:bg-[#402354]',
    border: 'border-[#CE82FF]',
    hoverBorder: 'hover:border-[#CE82FF]',
  },
  {
    title: 'وام خوداشتغالی',
    desc: 'امکان دریافت وام با بهره کم',
    icon: icons.Bank,
    color: 'text-[#E5A100]', // کمی تیره‌تر از زرد اصلی برای کنتراست بهتر روی پس‌زمینه روشن
    bg: 'bg-[#fff0b3] dark:bg-[#4d3f00]',
    border: 'border-[#E5A100]',
    hoverBorder: 'hover:border-[#E5A100]',
  },
  {
    title: 'پروانه کسب',
    desc: 'مجوز رسمی راه‌اندازی کار',
    icon: icons.Store,
    color: 'text-[#FF4B4B]',
    bg: 'bg-[#ffdbdb] dark:bg-[#4a1313]',
    border: 'border-[#FF4B4B]',
    hoverBorder: 'hover:border-[#FF4B4B]',
  },
  {
    title: 'استخدام سریع',
    desc: 'یک رزومه قدرتمند و متمایز',
    icon: icons.Briefcase,
    color: 'text-[#2B70C9]',
    bg: 'bg-[#d6e5f7] dark:bg-[#102a4d]',
    border: 'border-[#2B70C9]',
    hoverBorder: 'hover:border-[#2B70C9]',
  },
];

export default function CertificateSection() {
  return (
    <section
      className="py-16 px-6 bg-white dark:bg-[#131F24]"
      dir="rtl"
      aria-labelledby="certificate-section-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* هدر */}
        <div className="text-center mb-12">
          <h2
            id="certificate-section-heading"
            className="text-3xl md:text-4xl font-extrabold text-[#4B4B4B] dark:text-white mb-4"
          >
            مدارک معتبر و بین‌المللی
          </h2>
          <p className="text-lg font-bold text-[#5B6472] dark:text-[#94A3B8]">
            پس از پایان دوره، مدرکی بگیرید که همه‌جا خریدار دارد.
          </p>
        </div>

        {/* گرید کارت‌ها */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className="list-none">
                <article
                  itemScope
                  itemType="https://schema.org/EducationalOccupationalCredential"
                  className={`
                    flex flex-col items-center text-center p-6
                    bg-white dark:bg-[#202F36]
                    border-2 border-[#E5E5E5] dark:border-[#37464F]
                    border-b-[6px] rounded-2xl
                    transition-colors duration-200
                    ${item.hoverBorder}
                  `}
                >
                  {/* آیکون */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 ${item.bg} ${item.color} ${item.border}`}
                  >
                    <div className="w-8 h-8">
                      <Icon />
                    </div>
                  </div>

                  {/* متن */}
                  <h3
                    itemProp="credentialCategory"
                    className="text-lg font-extrabold text-[#4B4B4B] dark:text-white mb-2"
                  >
                    {item.title}
                  </h3>
                  <p
                    itemProp="description"
                    className="text-sm font-bold text-[#5B6472] dark:text-[#94A3B8]"
                  >
                    {item.desc}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}