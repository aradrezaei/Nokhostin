import React from 'react';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { NavGate, FooterGate } from '@/components/Chrome';
import localFont from 'next/font/local';
import type { Metadata, Viewport } from 'next';

const shabnam = localFont({
  src: [
    { path: '../public/fonts/Shabnam.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Shabnam-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-shabnam',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nokhostin.org'),

  title: {
    default: 'آموزشگاه نخستین اندیشه | بهترین مجتمع فنی و حرفه‌ای شهرک اندیشه با ۲۴ سال سابقه',
    template: '%s | آموزشگاه نخستین اندیشه',
  },

  description:
    'آموزشگاه نخستین با ۲۴ سال سابقه در شهرک اندیشه فاز سه، بهترین مرکز آموزش برنامه‌نویسی، هوش مصنوعی، حسابداری، رباتیک، موسیقی، نقاشی، خیاطی و طراحی لباس در اندیشه و شهریار. مجوز رسمی فنی و حرفه‌ای.',

  keywords: [
    // Local — اصلی‌ترین‌ها
    'آموزشگاه نخستین',
    'آموزشگاه اندیشه',
    'آموزشگاه شهرک اندیشه',
    'آموزشگاه فاز سه اندیشه',
    'آموزشگاه شهریار',
    'بهترین آموزشگاه اندیشه',
    'مجتمع فنی اندیشه',
    'آموزشگاه فنی و حرفه ای اندیشه',
    // دوره‌ها
    'آموزش برنامه نویسی اندیشه',
    'آموزش هوش مصنوعی اندیشه',
    'کلاس پایتون اندیشه',
    'آموزش حسابداری اندیشه',
    'آموزش رباتیک اندیشه',
    'آموزش موسیقی اندیشه',
    'آموزش نقاشی اندیشه',
    'آموزش خیاطی اندیشه',
    'آموزش طراحی لباس اندیشه',
    'آموزش خوشنویسی اندیشه',
    'آموزش عکاسی اندیشه',
    // رقابتی
    'بهترین آموزشگاه برنامه نویسی اندیشه',
    'آموزشگاه با مجوز فنی حرفه ای اندیشه',
  ],

  authors: [{ name: 'آموزشگاه نخستین', url: 'https://nokhostin.org' }],
  creator: 'آموزشگاه نخستین',
  publisher: 'آموزشگاه نخستین',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'آموزشگاه نخستین | ۲۴ سال آموزش تخصصی در شهرک اندیشه',
    description:
      'با ۲۴ سال سابقه، آموزشگاه نخستین بهترین مرکز آموزش برنامه‌نویسی، هوش مصنوعی و هنر در شهر اندیشه.',
    url: 'https://nokhostin.org',
    siteName: 'آموزشگاه نخستین',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://nokhostin.org/og-image.jpg', // یک عکس 1200x630 از آموزشگاه بساز
        width: 1200,
        height: 630,
        alt: 'آموزشگاه نخستین — بهترین مجتمع فنی و حرفه‌ای شهرک اندیشه',
      },
    ],
  },

  alternates: {
    canonical: 'https://nokhostin.org',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// =====================================================
// SCHEMA.ORG — اطلاعات ساختاریافته برای گوگل
// =====================================================
const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://nokhostin.org/#organization',
      name: 'آموزشگاه نخستین',
      alternateName: 'مجتمع فنی و حرفه‌ای نخستین',
      url: 'https://nokhostin.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nokhostin.org/brand/logo.png',
        width: 200,
        height: 200,
      },
      image: 'https://nokhostin.org/og-image.jpg',
      description:
        'آموزشگاه نخستین با ۲۴ سال سابقه در شهر اندیشه، ارائه‌دهنده دوره‌های برنامه‌نویسی، هوش مصنوعی، حسابداری، رباتیک، موسیقی، نقاشی، خیاطی و عکاسی با مجوز رسمی سازمان فنی و حرفه‌ای.',
      foundingDate: '1381',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'شهر اندیشه فاز سه', // آدرس دقیق رو اینجا بنویس
        addressLocality: 'شهرک اندیشه',
        addressRegion: 'تهران',
        addressCountry: 'IR',
        postalCode: '', // کدپستی رو اضافه کن
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '', // مختصات GPS از گوگل مپ
        longitude: '',
      },
      telephone: '+989125770399',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+989125770399',
        contactType: 'customer service',
        availableLanguage: 'Persian',
      },
      sameAs: [
        'https://www.instagram.com/nokhostin_ir', // اینستاگرام
        // لینک گوگل مپ رو اضافه کن
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'دوره‌های آموزشی نخستین',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش برنامه‌نویسی' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش هوش مصنوعی' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش حسابداری' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش رباتیک' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش موسیقی' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش نقاشی' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Course', name: 'آموزش خیاطی' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nokhostin.org/#website',
      url: 'https://nokhostin.org',
      name: 'آموزشگاه نخستین',
      publisher: { '@id': 'https://nokhostin.org/#organization' },
      inLanguage: 'fa-IR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://nokhostin.org/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://nokhostin.org/#localbusiness',
      name: 'آموزشگاه نخستین',
      image: 'https://nokhostin.org/og-image.jpg',
      priceRange: '$$',
      servesCuisine: '',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'شهرک اندیشه فاز سه',
        addressLocality: 'شهرک اندیشه',
        addressRegion: 'تهران',
        addressCountry: 'IR',
      },
      telephone: '+989125770399',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '08:00',
          closes: '21:00',
        },
      ],
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl" className={shabnam.variable} suppressHydrationWarning>
      <head>
        {/* Schema.org — اطلاعات ساختاریافته */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        {/* Dark mode script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){const s=localStorage.theme;const p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&p)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}})()`,
          }}
        />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* اعتبارسنجی enamad */}
        <meta name="enamad" content="68174347" />
      </head>
      <body className="font-shabnam antialiased text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3f4a413e-35c7-43a7-9e97-98e29b907937"
        ></script>

        <AuthProvider>
          <NavGate />
          <main role="main" className="flex-1 w-full">
            {children}
          </main>
          <FooterGate />
        </AuthProvider>
      </body>
    </html>
  );
}
