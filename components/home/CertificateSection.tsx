const icons = {
  Medal: () => (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Globe: () => (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Plane: () => (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Bank: () => (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
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
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
} as const;

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
    color: 'text-[#E5A100]',
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
] as const;

export default function CertificateSection() {
  return (
    <section
      className="bg-white px-6 py-16 dark:bg-[#131F24]"
      dir="rtl"
      aria-labelledby="certificate-section-heading"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h2
            id="certificate-section-heading"
            className="mb-4 text-3xl font-extrabold text-[#4B4B4B] dark:text-white md:text-4xl"
          >
            مدارک معتبر و بین‌المللی
          </h2>
          <p className="text-lg font-bold text-[#5B6472] dark:text-[#94A3B8]">
            پس از پایان دوره، مدرکی بگیرید که همه‌جا خریدار دارد.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <article
                  itemScope
                  itemType="https://schema.org/EducationalOccupationalCredential"
                  className={`flex flex-col items-center rounded-2xl border-2 border-b-[6px] border-[#E5E5E5] bg-white p-6 text-center dark:border-[#37464F] dark:bg-[#202F36] ${item.hoverBorder}`}
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${item.bg} ${item.color} ${item.border}`}
                    aria-hidden="true"
                  >
                    <div className="h-8 w-8">
                      <Icon />
                    </div>
                  </div>

                  <h3
                    itemProp="credentialCategory"
                    className="mb-2 text-lg font-extrabold text-[#4B4B4B] dark:text-white"
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
