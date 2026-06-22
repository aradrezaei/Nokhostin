'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Headphones,
  Building2,
  Loader2,
  Star,
  Users,
  Zap,
  Shield,
  Navigation,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'آیا مدارک صادرشده قابل استعلام هستند؟',
    a: 'بله، تمامی گواهی‌نامه‌ها دارای کد QR یکتا هستند و توسط کارفرمایان، سازمان‌ها و مراکز بین‌المللی قابل استعلام فوری می‌باشند.',
  },
  {
    q: 'چه مدت پس از ثبت‌نام می‌توان به دوره دسترسی داشت؟',
    a: 'پس از ثبت‌نام، دسترسی مادام‌العمر به محتوای دوره و به‌روزرسانی‌های آتی آن فراهم می‌شود. همچنین پشتیبانی اختصاصی تا روز آزمون فعال است.',
  },
  {
    q: 'آیا امکان مشاوره رایگان قبل از ثبت‌نام وجود دارد؟',
    a: 'بله، مشاوران ما شنبه تا پنجشنبه از ساعت ۹ تا ۲۲ آماده ارائه مشاوره رایگان حضوری، تلفنی و آنلاین هستند.',
  },
  {
    q: 'روش‌های پرداخت شهریه چیست؟',
    a: 'پرداخت نقدی، اقساطی (۳ تا ۱۲ ماهه)، درگاه اینترنتی و همچنین امکان استفاده از تسهیلات صندوق رفاه فراهم است.',
  },
  {
    q: 'آیا پس از اتمام دوره کمک استخدامی ارائه می‌شود؟',
    a: 'بله، واحد کاریابی نخستین دانش‌آموختگان را به شبکه ۱۵۰+ شرکت همکار معرفی می‌کند و در تنظیم رزومه و آمادگی مصاحبه نیز همراهی می‌کند.',
  },
];

// ─── Contact Channels ─────────────────────────────────────────────────────────
const CHANNELS = [
  {
    icon: Phone,
    label: 'تلفن پشتیبانی',
    value: '۰۲۱-۶۵۵۶۵۰۰۴',
    sub: 'شنبه تا پنجشنبه · ۹ تا ۲۲',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    href: 'tel:02165565004',
  },
  {
    icon: Mail,
    label: 'ایمیل ',
    value: 'info@nokhostin.org',
    sub: 'تیم فنی پشتیبانی',
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    href: 'mailto:info@nakhostin.academy',
  },
  {
    icon: MapPin,
    label: 'آدرس موسسه ',
    value: 'تهران، اندیشه، فاز ۱',
    sub: 'نرسیده به شاهد غربی',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    href: '#map',
  },
  {
    icon: Headphones,
    label: 'چت آنلاین',
    value: 'گفتگوی زنده با پشتیبانی',
    sub: 'سریعترین روش  ',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    href: '#chat',
  },
];

// ─── Subjects ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  'مشاوره ثبت‌نام',
  'سوال درباره دوره',
  'گزارش مشکل فنی',
  'همکاری و مشارکت',
  'درخواست فاکتور',
  'سایر موارد',
];

// ─── Social Links ─────────────────────────────────────────────────────────────
const SOCIALS = [
  { icon: MessageSquare, label: 'اینستاگرام', href: '#', color: 'hover:text-pink-500' },
  { icon: MessageSquare, label: 'لینکدین', href: '#', color: 'hover:text-sky-500' },
  {
    icon: MessageSquare,
    label: 'توییتر / X',
    href: '#',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
];

// ─── Validate ─────────────────────────────────────────────────────────────────
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 3)
    errors.name = 'نام باید حداقل ۳ کاراکتر باشد';
  if (!/^09[0-9]{9}$/.test(data.phone.replace(/\s/g, ''))) errors.phone = 'شماره موبایل معتبر نیست';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'فرمت ایمیل صحیح نیست';
  if (!data.subject) errors.subject = 'موضوع پیام را انتخاب کنید';
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = 'پیام باید حداقل ۲۰ کاراکتر باشد';
  return errors;
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full text-right bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-5 hover:border-purple-200 dark:hover:border-purple-800 transition-colors duration-200 group"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
          {q}
        </span>
        <span className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30">
          {open ? (
            <ChevronUp size={14} className="text-purple-500" />
          ) : (
            <ChevronDown
              size={14}
              className="text-gray-400 group-hover:text-purple-500 transition-colors duration-200"
            />
          )}
        </span>
      </div>
      {open && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-7 text-right border-t border-gray-100 dark:border-gray-800 pt-4">
          {a}
        </p>
      )}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validate({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof FormData, boolean>>,
    );
    setTouched(allTouched);
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-150 focus:bg-white dark:focus:bg-gray-900 ${
      errors[field] && touched[field]
        ? 'border-red-300 dark:border-red-800 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
        : 'border-gray-200 dark:border-gray-800 focus:border-purple-400 dark:focus:border-purple-700 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/40'
    }`;

  return (
    <main className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950 -mt-2" dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-8">
            چطور می‌توانیم <br />
            <span className="relative inline-block text-purple-600 dark:text-purple-400">
              کمک کنیم؟
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-purple-200 dark:text-purple-900/40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0 50 5 T 100 5"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto leading-8 font-medium italic">
            تیم پشتیبانی متخصص ما، آماده راهنمایی شما در مسیر{' '}
            <span className="text-gray-900 dark:text-white">توسعه مهارت‌های حرفه‌ای</span> است.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT CHANNELS
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-12 lg:py-20 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-white/[0.05]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-3xl border border-gray-100 dark:border-white/[0.05] lg:border-none">
            {CHANNELS.map((ch, i) => (
              <a
                key={i}
                href={ch.href}
                className={`
            group relative flex flex-col p-6 sm:p-8 transition-all duration-300
            hover:bg-gray-50 dark:hover:bg-white/[0.02]
            /* خطوط جداکننده در موبایل */
            border-gray-100 dark:border-white/[0.05]
            ${i % 2 === 0 ? 'border-l' : ''} 
            ${i < 2 ? 'border-b' : ''}
            /* خطوط جداکننده در دسکتاپ */
            lg:border-l lg:border-b-0 lg:first:border-r-0 lg:last:border-l-0
          `}
              >
                {/* Icon Container */}
                <div className="mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${ch.bg} bg-opacity-10 dark:bg-opacity-20`}
                  >
                    <ch.icon size={20} className={`${ch.color}`} />
                  </div>
                </div>

                {/* Texts */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] sm:text-[11px] tracking-[0.05em] uppercase font-bold text-gray-400 dark:text-gray-500">
                    {ch.label}
                  </span>

                  <div className="flex items-baseline gap-1">
                    <span className="text-[15px] sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                      {ch.value}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-600 font-medium leading-relaxed line-clamp-1">
                    {ch.sub}
                  </p>
                </div>

                {/* دکوراسیون گوشه کارت - بسیار محو */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORM + SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* ── Form ──────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  پیام خود را{' '}
                  <span className="relative">
                    بفرستید
                    <span className="absolute -bottom-1 right-0 left-0 h-[3px] bg-purple-500 rounded-full" />
                  </span>
                </h2>
              </div>

              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                    پیام شما با موفقیت ارسال شد
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-7 max-w-sm mx-auto">
                    کارشناسان ما در اسرع وقت، معمولاً کمتر از ۲۴ ساعت، با شما تماس خواهند گرفت.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                      setTouched({});
                      setErrors({});
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    ارسال پیام جدید
                    <ArrowLeft size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        نام و نام خانوادگی <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="مثلاً: علی محمدی"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={inputClass('name')}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        شماره موبایل <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="۰۹۱۲XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        className={inputClass('phone')}
                        dir="ltr"
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        ایمیل <span className="text-gray-400 font-normal">(اختیاری)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={inputClass('email')}
                        dir="ltr"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        موضوع پیام <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        className={inputClass('subject') + ' cursor-pointer'}
                      >
                        <option value="">انتخاب کنید...</option>
                        {SUBJECTS.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && touched.subject && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      پیام شما <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="سوال یا پیشنهاد خود را اینجا بنویسید..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      className={inputClass('message') + ' resize-none'}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message && touched.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-[11px] ${formData.message.length < 20 ? 'text-gray-400' : 'text-green-500'}`}
                      >
                        {formData.message.length} کاراکتر
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold text-sm px-6 py-4 rounded-xl transition-colors duration-150"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> در حال ارسال...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> ارسال پیام
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-gray-600 leading-5">
                    با ارسال این فرم، با{' '}
                    <Link href="/privacy" className="text-purple-500 hover:underline">
                      سیاست حریم خصوصی
                    </Link>{' '}
                    نخستین موافقت می‌کنید.
                  </p>
                </form>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────────── */}
            <div className="lg:w-[360px] flex-shrink-0 space-y-5">
              {/* Working Hours */}
              <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    ساعات پشتیبانی
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: 'شنبه تا چهارشنبه', time: '۹:۰۰ – ۲۲:۰۰', active: true },
                    { day: 'پنجشنبه', time: '۹:۰۰ – ۱۸:۰۰', active: true },
                    { day: 'جمعه', time: 'تعطیل', active: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {row.day}
                      </span>
                      <span
                        className={`font-bold ${row.active ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                      <Building2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">دفتر مرکزی</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">
                    تهران، شهرک اندیشه، فاز ۱<br />
                    نرسیده به شاهد غربی
                    <br />
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
                  شبکه‌های اجتماعی
                </h3>
                <div className="flex gap-3">
                  {SOCIALS.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className={`w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-150 hover:scale-110 hover:border-gray-300 dark:hover:border-gray-600 ${s.color}`}
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 leading-5">
                  آخرین اخبار دوره‌ها، تخفیف‌ها و محتوای آموزشی را در شبکه‌های اجتماعی دنبال کنید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTERACTIVE GOOGLE MAP SECTION (OFFICIAL EMBED LINK)
      ══════════════════════════════════════════════════════ */}
      <section
        id="map"
        className="relative w-full py-12 bg-gray-50 dark:bg-gray-950 overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
                مراجعه حضوری
              </span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                موقعیت مکانی آکادمی نخستین
              </h2>
            </div>

            {/* دکمه‌های مسیریابی با اپلیکیشن‌های ایرانی و بین‌المللی */}
            <div className="flex flex-wrap items-center gap-3">
              {/* گوگل مپ */}
              <a
                href="https://maps.app.goo.gl/BPr6K6wDofNsh2w9A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 hover:border-purple-500 dark:hover:border-purple-500 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 shadow-sm transition-all duration-200 group hover:-translate-y-0.5"
              >
                <Navigation
                  size={15}
                  className="text-purple-500 group-hover:rotate-12 transition-transform"
                />
                گوگل مپ
              </a>

              {/* نشان */}
              <a
                href="https://nshn.ir/65_bsfUpxJt1v4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-500 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 shadow-sm transition-all duration-200 group hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 transition-transform group-hover:scale-125" />
                مسیریابی با نشان
              </a>

              {/* بلد */}
              <a
                href="https://balad.ir/p/7McOa2wP2V8Eep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 hover:border-amber-500 dark:hover:border-amber-500 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 shadow-sm transition-all duration-200 group hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 transition-transform group-hover:scale-125" />
                مسیریابی با بلد
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.08] shadow-2xl group">
            {/* Dark Mode Map Layer Filter overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-purple-900/5 mix-blend-color dark:bg-transparent" />

            {/* لود شدن لوکیشن ارگانیک و دقیق آموزشگاه نخستین از روی لینکی که فرستادی */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d405.1424169727404!2d51.019399!3d35.687034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8ded002c479b9f%3A0x28362c2e993b0218!2z2KfZg9mK2KfYr9mF2Yog2KfZhdmI2LLsome24_bjCDZhti624zYp9mG!5e0!3m2!1sfa!2sir!4v1718900000000!5m2!1sfa!2sir"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-[105%] dark:invert-[90%] dark:hue-rotate-[180deg] dark:grayscale-[30%] dark:contrast-[120%]"
            />

            {/* Info Card Float Badge */}
            <div className="absolute bottom-6 right-6 z-20 hidden sm:block max-w-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-5 shadow-xl">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                دسترسی سریع و آسان
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                محیط آموزشی مجهز، دسترسی به پارکینگ حاشیه‌ای مناسب و فاصله کوتاه تا ایستگاه‌های حمل
                و نقل عمومی فاز ۱ اندیشه.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="relative rounded-3xl bg-purple-600 dark:bg-purple-700 overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                هنوز مطمئن نیستی؟
              </h2>
              <p className="text-purple-200 text-sm leading-7 max-w-xl mx-auto mb-8">
                با کارشناسان ما یک جلسه مشاوره رایگان تنظیم کن تا بهترین مسیر آموزشی را بر اساس
                اهداف و شرایط تو پیدا کنیم.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors duration-150"
                >
                  مشاهده دوره‌ها
                  <ArrowLeft size={16} />
                </Link>
                <a
                  href="tel:02165565004"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors duration-150"
                >
                  <Phone size={15} />
                  تماس مستقیم
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
