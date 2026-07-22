'use client';

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { ChevronDown } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle';

const variants: Record<Variant, string> = {
  primary:
    'bg-[#7c3aed] text-white border-2 border-[#5b21b6] border-b-4 hover:bg-[#6d28d9] active:border-b-2',
  ghost:
    'bg-white text-slate-700 border-2 border-slate-200 border-b-4 hover:bg-slate-50 hover:border-slate-300 active:border-b-2 dark:bg-[#131f24] dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-600',
  danger:
    'bg-rose-500 text-white border-2 border-rose-700 border-b-4 hover:bg-rose-600 active:border-b-2',
  subtle:
    'bg-slate-100 text-slate-700 border-2 border-slate-200 border-b-4 hover:bg-slate-200 hover:border-slate-300 active:border-b-2 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-slate-600',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-black select-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-b-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-extrabold text-slate-700 dark:text-slate-200">
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs font-medium text-slate-400">{hint}</span>}
    </label>
  );
}

// ورودی‌ها با بوردر ۲ پیکسلی ضخیم و پس‌زمینه منطبق بر دارک‌مود اختصاصی (#131f24)
const controlClass =
  'w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#7c3aed] focus:bg-white focus:ring-0 dark:border-slate-700 dark:bg-[#131f24] dark:text-white dark:focus:border-[#8b5cf6] dark:focus:bg-[#131f24]';

export function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${controlClass} ${className}`} {...props} />;
}

export function Textarea({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${controlClass} ${className}`} {...props} />;
}

/**
 * RTL-safe select: native arrow removed, custom chevron on inline-end
 * so it never mirrors wrong or overlaps Persian text.
 */
export function Select({
  className = '',
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`relative ${className || 'w-full'}`}>
      <select
        {...props}
        className={`${controlClass} nk-select w-full cursor-pointer appearance-none pe-11`}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={2.5}
        className="pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
      />
    </div>
  );
}

export function Badge({
  tone,
  children,
}: {
  tone: 'green' | 'gray' | 'violet' | 'amber';
  children: ReactNode;
}) {
  const tones = {
    green:
      'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800',
    gray: 'bg-slate-100 text-slate-700 border-2 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    violet:
      'bg-violet-100 text-[#7c3aed] border-2 border-violet-300 dark:bg-violet-950/80 dark:text-violet-300 dark:border-violet-800',
    amber:
      'bg-amber-100 text-amber-800 border-2 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800',
  };
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-extrabold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

// کارت با بوردر ضخیم و سایه پایینی (Duolingo Style Card)
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border-2 border-slate-200 border-b-4 bg-white p-6 dark:border-slate-800 dark:bg-[#131f24] ${className}`}
    >
      {children}
    </div>
  );
}

export function Alert({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'success';
  children: ReactNode;
}) {
  const cls =
    tone === 'error'
      ? 'border-2 border-rose-300 border-b-4 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
      : 'border-2 border-emerald-300 border-b-4 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300';
  return <div className={`rounded-2xl px-4 py-3 text-sm font-black ${cls}`}>{children}</div>;
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl border-2 border-slate-200 border-b-8 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#131f24]">
        <h2 className="mb-4 text-xl font-black text-slate-900 dark:text-white">{title}</h2>
        {children}
      </div>
    </div>
  );
}
