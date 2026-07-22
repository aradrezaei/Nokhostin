import type { Metadata } from 'next';
import AboutView from '@/components/about/AboutView';
import { SITE, SOCIAL_LINKS } from '@/lib/site';

const PAGE_URL = 'https://nokhostin.org/about';
const PAGE_TITLE = 'درباره آموزشگاه نخستین اندیشه | ۲۴ سال آموزش فنی و حرفه‌ای';
const PAGE_DESCRIPTION =
  'آشنایی با آموزشگاه نخستین در شهرک اندیشه فاز سه: ۲۴ سال سابقه، مجوز رسمی سازمان فنی و حرفه‌ای، دوره‌های برنامه‌نویسی، هوش مصنوعی، حسابداری، رباتیک و هنر با مدرک قابل استعلام.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'درباره آموزشگاه نخستین',
    'آموزشگاه نخستین اندیشه',
    'آموزشگاه فنی و حرفه ای اندیشه',
    'مجتمع فنی اندیشه فاز سه',
    'بهترین آموزشگاه شهرک اندیشه',
    'آموزشگاه با مجوز فنی حرفه ای اندیشه',
    'مدرک فنی و حرفه ای اندیشه',
    'آموزش برنامه نویسی اندیشه',
  ],
  authors: [{ name: SITE.name, url: 'https://nokhostin.org' }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'education',
  alternates: {
    canonical: '/about',
    languages: { 'fa-IR': '/about' },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE.name,
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://nokhostin.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'درباره آموزشگاه نخستین — مجتمع فنی و حرفه‌ای شهرک اندیشه',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['https://nokhostin.org/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: 'fa-IR',
      isPartOf: { '@id': 'https://nokhostin.org/#website' },
      about: { '@id': 'https://nokhostin.org/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://nokhostin.org/og-image.jpg',
      },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'خانه',
          item: 'https://nokhostin.org',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'درباره ما',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${PAGE_URL}#org`,
      name: SITE.name,
      alternateName: ['مجتمع فنی و حرفه‌ای نخستین', 'آموزشگاه نخستین اندیشه'],
      url: 'https://nokhostin.org',
      description: PAGE_DESCRIPTION,
      foundingDate: '2001',
      telephone: '+982165565004',
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address,
        addressLocality: 'شهرک اندیشه',
        addressRegion: 'تهران',
        addressCountry: 'IR',
      },
      areaServed: [
        { '@type': 'City', name: 'شهرک اندیشه' },
        { '@type': 'City', name: 'شهریار' },
      ],
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutView />
    </>
  );
}
