import { scheduleEffect } from '@/lib/scheduleEffect';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toFa } from '@/lib/format';

const TONES: Record<string, string> = {
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
};

export function StatTile({
  icon,
  label,
  value,
  tone = 'violet',
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <div className="rounded-3xl border-2 border-slate-200 border-b-4 bg-white p-4 dark:border-slate-800 dark:bg-[#131f24]">
      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${TONES[tone]}`}>
        {icon}
      </span>
      <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
        {typeof value === 'number' ? toFa(value) : value}
      </p>
      <p className="mt-0.5 text-xs font-bold text-slate-400 dark:text-slate-500">{label}</p>
    </div>
  );
}

export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-black text-slate-900 dark:text-white">{title}</h2>
      {hint && (
        <p className="mt-0.5 text-xs font-bold text-slate-400 dark:text-slate-500">{hint}</p>
      )}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  hint,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 px-6 py-12 text-center dark:border-slate-700">
      {icon && (
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          {icon}
        </span>
      )}
      <p className="text-sm font-black text-slate-700 dark:text-slate-200">{title}</p>
      {hint && <p className="mt-1 text-xs font-bold text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
}

export function TuitionPill({ paid }: { paid: boolean }) {
  return paid ? (
    <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
      <CheckCircle2 className="h-3.5 w-3.5" /> شهریه تسویه شده
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-rose-300 bg-rose-100 px-3 py-1 text-xs font-extrabold text-rose-800 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
      <XCircle className="h-3.5 w-3.5" /> شهریه پرداخت‌نشده
    </span>
  );
}

export function Spinner({ label = 'در حال بارگذاری…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16">
      <span className="h-6 w-6 animate-spin rounded-full border-3 border-[#7c3aed] border-t-transparent" />
      <span className="text-sm font-black text-slate-500 dark:text-slate-300">{label}</span>
    </div>
  );
}

/**
 * Only shows a spinner if loading lasts longer than `delayMs`.
 * Fast responses stay spinner-free for a snappier panel feel.
 */
export function DeferredSpinner({
  active,
  delayMs = 350,
  label,
}: {
  active: boolean;
  delayMs?: number;
  label?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) {
      return scheduleEffect(() => {
        setShow(false);
      });
    }
    const id = window.setTimeout(() => {
      setShow(true);
    }, delayMs);
    return () => {
      window.clearTimeout(id);
    };
  }, [active, delayMs]);

  if (!active || !show) return null;
  return <Spinner label={label} />;
}
