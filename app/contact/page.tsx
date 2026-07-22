'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Headphones,
  Building2,
  Loader2,
  Navigation,
  Award,
  Globe,
  ArrowLeft,
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
    q: 'آیا پس از اتمام دوره کمک استخدامی ارائه می‌شودScheduling؟',
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
    bg: 'bg-violet-100 dark:bg-violet-500/15',
    href: 'tel:02165565004',
  },
  {
    icon: Mail,
    label: 'ایمیل آکادمی',
    value: 'info@nokhostin.org',
    sub: 'پاسخگویی سریع مکاتبات تیمی',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/15',
    href: 'mailto:info@nokhostin.org',
  },
  {
    icon: MapPin,
    label: 'آدرس موسسه ',
    value: 'تهران، اندیشه، فاز ۱',
    sub: 'نرسیده به شاهد غربی',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/15',
    href: '#map',
  },
  {
    icon: Headphones,
    label: 'چت آنلاین',
    value: 'گفتگوی زنده اختصاصی',
    sub: 'سریع‌ترین روش ارتباطی تکنسین‌ها',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-500/15',
    href: '#',
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

// ─── FAQ Item Component ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#f8fafb] dark:bg-[#17242a] border border-[#e6ecef] dark:border-[#2b3b42] rounded-2xl overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-right px-6 py-5 flex items-center justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="font-bold text-sm text-[#10242a] dark:text-[#edf3f5] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {q}
        </span>
        <span className="w-7 h-7 rounded-lg bg-white dark:bg-[#1e2d33] border border-[#e6ecef] dark:border-[#2b3b42] flex items-center justify-center flex-shrink-0 transition-colors">
          {open ? (
            <ChevronUp size={14} className="text-violet-600 dark:text-violet-400" />
          ) : (
            <ChevronDown size={14} className="text-[#61727a] dark:text-[#93a5ac]" />
          )}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-xs md:text-sm text-[#61727a] dark:text-[#93a5ac] leading-7 border-t border-[#e6ecef] dark:border-[#2b3b42] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
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
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3.5 rounded-xl bg-[#f8fafb] dark:bg-[#17242a] border text-sm font-bold text-[#10242a] dark:text-[#edf3f5] placeholder-[#93a5ac] dark:placeholder-[#61727a] outline-none transition-all duration-150 ` +
    (errors[field] && touched[field]
      ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/40'
      : 'border-[#d9e4e8] dark:border-[#2b3b42] focus:border-violet-500 dark:focus:border-violet-400');

  return (
    <main className="text-[#10242a] dark:text-[#edf3f5] bg-white dark:bg-[#0f191d]" dir="rtl">
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#10242a] dark:text-[#edf3f5] tracking-tight leading-tight mb-6">
            چطور می‌توانیم <br />
            <span className="text-violet-600 dark:text-violet-400">کمک کنیم؟</span>
          </h1>
          <p className="text-base md:text-lg text-[#61727a] dark:text-[#93a5ac] max-w-2xl mx-auto leading-8 font-bold">
            تیم پشتیبانی متخصص ما، آماده راهنمایی شما در مسیر{' '}
            <span className="text-[#10242a] dark:text-[#edf3f5] underline decoration-violet-500 decoration-2">
              توسعه مهارت‌های حرفه‌ای
            </span>{' '}
            است.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT CHANNELS
      ══════════════════════════════════════════════════════ */}
      <section className="border-y border-[#e6ecef] py-12 lg:py-16 dark:border-[#26363d]">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((ch, i) => (
              <a
                key={i}
                href={ch.href}
                className="group rounded-3xl bg-[#f8fafb] border-b-4 border-b-[#d9e4e8] p-7 transition-colors duration-200 hover:bg-[#f2f6f8] dark:bg-[#17242a] dark:border-b-[#2b3b42] dark:hover:bg-[#1d2d33]"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${ch.bg}`}
                >
                  <ch.icon size={22} className={ch.color} strokeWidth={2} />
                </div>
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#93a5ac] dark:text-[#61727a]">
                  {ch.label}
                </span>
                <h3 className="mb-2 text-xl font-black text-[#10242a] dark:text-[#edf3f5] tracking-tight">
                  {ch.value}
                </h3>
                <p className="text-xs leading-6 text-[#61727a] dark:text-[#93a5ac] font-medium">
                  {ch.sub}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORM + SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Form */}
            <div className="flex-1 min-w-0 w-full">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#10242a] dark:text-[#edf3f5] tracking-tight">
                  پیام خود را{' '}
                  <span className="text-violet-600 dark:text-violet-400 border-b-4 border-violet-600 dark:border-violet-400 pb-1">
                    بفرستید
                  </span>
                </h2>
              </div>

              {submitted ? (
                <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-xl font-black text-[#10242a] dark:text-[#edf3f5] mb-2">
                    پیام شما با موفقیت ارسال شد
                  </h3>
                  <p className="text-sm text-[#61727a] dark:text-[#93a5ac] leading-7 max-w-sm mx-auto font-bold">
                    کارشناسان فنی ما در اسرع وقت، معمولاً کمتر از ۲۴ ساعت، با شما تماس خواهند گرفت.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                      setTouched({});
                      setErrors({});
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    ارسال پیام جدید
                    <ArrowLeft size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#23363d] dark:text-[#d8e3e6] mb-1.5">
                        نام و نام خانوادگی <span className="text-red-500">*</span>
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
                        <p className="mt-1.5 text-xs font-bold text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#23363d] dark:text-[#d8e3e6] mb-1.5">
                        شماره موبایل <span className="text-red-500">*</span>
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
                        <p className="mt-1.5 text-xs font-bold text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#23363d] dark:text-[#d8e3e6] mb-1.5">
                        ایمیل{' '}
                        <span className="text-[#93a5ac] dark:text-[#61727a] font-normal">
                          (اختیاری)
                        </span>
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
                        <p className="mt-1.5 text-xs font-bold text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#23363d] dark:text-[#d8e3e6] mb-1.5">
                        موضوع پیام <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        className={inputClass('subject') + ' cursor-pointer appearance-none'}
                      >
                        <option value="">انتخاب کنید...</option>
                        {SUBJECTS.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && touched.subject && (
                        <p className="mt-1.5 text-xs font-bold text-red-500">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23363d] dark:text-[#d8e3e6] mb-1.5">
                      پیام شما <span className="text-red-500">*</span>
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
                        <p className="text-xs font-bold text-red-500">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-[11px] font-bold ${formData.message.length < 20 ? 'text-[#93a5ac]' : 'text-emerald-600'}`}
                      >
                        {formData.message.length} کاراکتر
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-bold text-sm px-6 py-4 rounded-xl border-b-2 border-violet-800 transition-colors duration-150"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> در حال ارسال پیام...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> ارسال نهایی فرم پیام
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#61727a] dark:text-[#93a5ac] leading-5 font-bold">
                    با ارسال این فرم، با{' '}
                    <Link
                      href="/privacy"
                      className="text-violet-600 dark:text-violet-400 hover:underline"
                    >
                      سیاست حریم خصوصی
                    </Link>{' '}
                    آکادمی موافقت می‌کنید.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:w-[360px] w-full flex-shrink-0 space-y-5">
              {/* Support Hours */}
              <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
                    <Clock size={16} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-black text-sm text-[#10242a] dark:text-[#edf3f5]">
                    ساعات پاسخگویی حضوری و تلفنی
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: 'شنبه تا چهارشنبه', time: '۹:۰۰ – ۲۲:۰۰', active: true },
                    { day: 'پنجشنبه', time: '۹:۰۰ – ۱۸:۰۰', active: true },
                    { day: 'جمعه', time: 'تعطیل', active: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-[#61727a] dark:text-[#93a5ac] font-bold">
                        {row.day}
                      </span>
                      <span
                        className={`font-black ${row.active ? 'text-[#10242a] dark:text-[#edf3f5]' : 'text-[#93a5ac]'}`}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Block */}
              <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
                    <Building2 size={14} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-black text-sm text-[#10242a] dark:text-[#edf3f5]">
                    دفتر مرکزی آکادمی
                  </h3>
                </div>
                <p className="text-sm text-[#61727a] dark:text-[#93a5ac] leading-6 font-bold">
                  تهران، شهرک اندیشه، فاز ۱<br />
                  نرسیده به شاهد غربی، مجتمع آموزشی نخستین
                </p>
              </div>

              {/* Identity Channels */}
              <div className="bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
                    <Globe size={14} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-black text-sm text-[#10242a] dark:text-[#edf3f5]">
                    اعتبار بین‌المللی
                  </h3>
                </div>
                <p className="text-xs text-[#61727a] dark:text-[#93a5ac] leading-5 font-bold">
                  تاییدیه رسمی تحت نظارت وزارت کار و سازمان آموزش فنی و حرفه‌ای کشور با قابلیت ترجمه
                  رسمی بین‌المللی (ILO).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ SECTION (ROBUST & INTEGRATED)
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 border-t border-[#e6ecef] dark:border-[#26363d] bg-white dark:bg-[#0f191d]">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="mb-10 text-right">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 block mb-2">
              پاسخ سوالات شما
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#10242a] dark:text-[#edf3f5]">
              سوالات متداول متقاضیان دوره ها
            </h2>
          </div>
          <div className="max-w-4xl space-y-4">
            {FAQS.map((faq, idx) => (
              <FaqItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTERACTIVE GOOGLE MAP SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="map"
        className="relative w-full py-16 border-t border-[#e6ecef] dark:border-[#26363d] bg-[#f8fafb] dark:bg-[#131d22]"
      >
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider block mb-2">
                مراجعه حضوری و کارگاه ها
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#10242a] dark:text-[#edf3f5]">
                موقعیت مکانی دقیق آکادمی نخستین
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://maps.app.goo.gl/BPr6K6wDofNsh2w9A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-[#1e2d33] hover:border-violet-500 border border-[#e6ecef] dark:border-[#2b3b42] rounded-xl px-4 py-2.5 text-xs font-bold text-[#10242a] dark:text-[#edf3f5] transition-all"
              >
                <Navigation size={14} className="text-violet-600 dark:text-violet-400" />
                گوگل مپ
              </a>

              <a
                href="https://nshn.ir/65_bsfUpxJt1v4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-[#1e2d33] hover:border-violet-500 border border-[#e6ecef] dark:border-[#2b3b42] rounded-xl px-4 py-2.5 text-xs font-bold text-[#10242a] dark:text-[#edf3f5] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                مسیریابی با نشان
              </a>

              <a
                href="https://balad.ir/p/7McOa2wP2V8Eep"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-[#1e2d33] hover:border-violet-500 border border-[#e6ecef] dark:border-[#2b3b42] rounded-xl px-4 py-2.5 text-xs font-bold text-[#10242a] dark:text-[#edf3f5] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                مسیریابی با بلد
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-[#e6ecef] dark:border-[#2b3b42] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d405.1424169727404!2d51.019399!3d35.687034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8ded002c479b9f%3A0x28362c2e993b0218!2z2KfZg9mK2KfYr9mF2Yog2KfZhdmI2LLsome24_bjCDZhti624zYp9mG!5e0!3m2!1sfa!2sir!4v1718900000000!5m2!1sfa!2sir"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[102%] dark:invert-[90%] dark:hue-rotate-[180deg]"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA SECTION (FLAT & ARGANIC PREMIUM STYLE)
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-screen-xl mx-auto px-6">
        <div className="w-full bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-between gap-8 relative overflow-hidden">
          {/* پترن نقطه‌ای ظریف معماری سیستم */}
          <div className="absolute inset-0 bg-[radial-gradient(#d9e4e8_1px,transparent_1px)] dark:bg-[radial-gradient(#2b3b42_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-black text-[#10242a] dark:text-[#edf3f5] leading-tight tracking-tight">
              هنوز مطمئن نیستی؟
            </h2>
            <p className="text-sm md:text-base text-[#61727a] dark:text-[#93a5ac] leading-relaxed font-bold">
              با کارشناسان ما یک جلسه مشاوره رایگان تنظیم کن تا بهترین مسیر آموزشی را بر اساس اهداف
              و شرایط تو پیدا کنیم.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/courses"
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-sm transition-all duration-200 border-b-2 border-violet-800"
            >
              مشاهده دوره‌ها
            </Link>

            <a
              href="tel:02165565004"
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-white dark:bg-[#1e2d33] hover:bg-gray-50 dark:hover:bg-[#23353c] text-[#10242a] dark:text-[#edf3f5] font-bold rounded-xl text-sm border border-[#d9e4e8] dark:border-[#2b3b42] border-b-4 transition-all duration-200"
            >
              تماس مستقیم با ما
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
