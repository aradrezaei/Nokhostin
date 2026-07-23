import Link from 'next/link';
import BrandMark from '@/components/layout/BrandMark';
import LinkColumn from '@/components/layout/LinkColumn';
import SocialLinks from '@/components/layout/SocialLinks';
import { FOOTER_ABOUT, FOOTER_COURSES, FOOTER_LEARN, LEGAL_LINKS, SITE } from '@/lib/site';

/**
 * Duolingo-inspired footer: vivid brand band, chunky 3D CTAs, soft course pills,
 * static wave divider — no JS animation, weak-device friendly.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
      className="relative overflow-hidden bg-[#7c3aed] text-white [content-visibility:auto] [contain-intrinsic-size:1px_1100px]"
    >
      <meta itemProp="name" content={SITE.name} />

      {/* wave lip (Duolingo-style section join) */}
      <div
        className="relative w-full overflow-hidden leading-none bg-[#fcfbff] dark:bg-[#131f24]"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
          className="block h-9 w-full text-[#7c3aed] sm:h-12 md:h-14"
        >
          <path
            fill="currentColor"
            d="M0,22 C240,50 480,10 720,30 C960,50 1200,10 1440,26 V54 H0 Z"
          />
        </svg>
      </div>

      {/* static decorative blob (only bottom-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-[#5b21b6]/40"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-4">
        {/* hero strip */}
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border-2 border-white/15 border-b-4 bg-[#6d28d9]/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BrandMark tone="footer" />
            <p className="mt-4 max-w-md text-base font-bold leading-7 text-[#ede9fe]">
              یاد بگیر. تمرین کن. بدرخش. — مسیر مهارت، قدم‌به‌قدم مثل یک بازی.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-white px-5 py-3 text-sm font-black text-[#5b21b6]"
            >
              شروع یادگیری
            </Link>
            <a
              href={SITE.phoneHref}
              itemProp="telephone"
              className="inline-flex items-center rounded-2xl border-2 border-white/25 border-b-4 bg-white/10 px-5 py-3 text-sm font-black text-white"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        {/* columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <LinkColumn
            title="آموزشگاه"
            items={FOOTER_ABOUT}
            titleClassName="text-white"
            linkClassName="text-[15px] font-bold text-white"
          />
          <LinkColumn
            title="یادگیری"
            items={FOOTER_LEARN}
            titleClassName="text-white"
            linkClassName="text-[15px] font-bold text-white"
          />
          <LinkColumn
            title="دوره‌ها"
            items={FOOTER_COURSES.slice(0, 6)}
            titleClassName="text-white"
            linkClassName="text-[15px] font-bold text-white"
          />
          <div>
            <h3 className="mb-5 text-sm font-black">ارتباط</h3>
            <ul className="space-y-3 text-[15px] font-bold text-white">
              <li>
                <a href={`mailto:${SITE.email}`} itemProp="email">
                  {SITE.email}
                </a>
              </li>
              <li itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{SITE.address}</span>
              </li>
            </ul>
            <SocialLinks className="mt-5" />
          </div>
        </div>

        {/* course pill strip — Duolingo language-row vibe */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="mb-4 text-xs font-black uppercase tracking-wide text-[#c4b5fd]">
            مسیرهای محبوب
          </p>
          <ul className="flex flex-wrap gap-2">
            {FOOTER_COURSES.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="inline-flex items-center rounded-full border-2 border-white/20 border-b-4 bg-white/10 px-3.5 py-1.5 text-xs font-black text-white"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-[#5b21b6]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 text-sm font-bold text-[#c4b5fd] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
