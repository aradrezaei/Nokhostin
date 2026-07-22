/** Shared site navigation + footer link data (single source of truth). */

export const NAV_ITEMS = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
] as const;

export const FOOTER_ABOUT = [
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
  { label: 'سوالات متداول', href: '/faq' },
  { label: 'وبلاگ', href: '/blog' },
] as const;

export const FOOTER_LEARN = [
  { label: 'همه دوره‌ها', href: '/courses' },
  { label: 'انواع دوره‌ها', href: '/course-types' },
  { label: 'مسیر یادگیری', href: '/roadmap' },
  { label: 'مدرک فنی‌حرفه‌ای', href: '/why-vocational-certificate' },
] as const;

export const FOOTER_COURSES = [
  { label: 'پایتون', href: '/courses/python-programming' },
  { label: 'طراحی وب', href: '/courses/web-html' },
  { label: 'PHP', href: '/courses/php-course' },
  { label: 'هوش مصنوعی', href: '/courses/ai' },
  { label: 'ICDL', href: '/courses/icdl' },
  { label: 'حسابداری', href: '/courses/accounting' },
  { label: 'رباتیک', href: '/courses/robotics' },
  { label: 'فتوشاپ', href: '/courses/photoshop' },
] as const;

export const LEGAL_LINKS = [
  { label: 'حریم خصوصی', href: '/privacy' },
  { label: 'شرایط استفاده', href: '/terms' },
] as const;

export const SOCIAL_LINKS = [
  {
    label: 'اینستاگرام',
    href: 'https://www.instagram.com/nokhostin_ir',
    icon: 'instagram' as const,
  },
  {
    label: 'تلگرام',
    href: 'https://t.me',
    icon: 'telegram' as const,
  },
] as const;

export const SITE = {
  name: 'آموزشگاه نخستین',
  tagline: 'یادگیری برای آینده',
  phoneDisplay: '۰۲۱-۶۵۵۶۵۰۰۴',
  phoneHref: 'tel:02165565004',
  email: 'info@nokhostin.org',
  address: 'اندیشه، فاز سه',
} as const;
