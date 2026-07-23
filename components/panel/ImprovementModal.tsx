'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, X } from 'lucide-react';
import { formatScore, toFa } from '@/lib/format';
import Medal from '@/components/panel/Medal';
import { Button } from '@/components/panel/ui';

const SEEN_KEY = 'nokhostin.improvementSeen.v1';

export interface ImprovementHighlight {
  classId: string;
  classTitle: string;
  courseName?: string | null;
  previousScore: number | null;
  currentScore: number | null;
  delta: number | null;
}

function readSeen(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function markSeen(classId: string) {
  const seen = readSeen();
  seen.add(classId);
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    /* ignore */
  }
}

/**
 * Motivational celebration when the student beat their previous-term score.
 * Shows once per class until they dismiss (persisted in localStorage).
 */
export default function ImprovementModal({ items }: { items: ImprovementHighlight[] }) {
  const [item, setItem] = useState<ImprovementHighlight | null>(null);

  useEffect(
    () =>
      scheduleEffect(() => {
        if (!items.length) {
          setItem(null);
          return;
        }
        const seen = readSeen();
        const next = items.find((i) => !seen.has(i.classId)) ?? null;
        setItem(next);
      }),
    [items],
  );

  if (!item) return null;

  const delta = item.delta;
  const deltaLabel = delta === null ? null : `${delta > 0 ? '+' : ''}${formatScore(delta)}`;

  const close = () => {
    markSeen(item.classId);
    setItem(null);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="مدال پیشرفت"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"
        aria-label="بستن"
        onClick={close}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border-2 border-emerald-300 border-b-8 bg-white shadow-2xl dark:border-emerald-800 dark:bg-[#131f24]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-100/90 to-transparent dark:from-emerald-950/50" />

        <button
          type="button"
          onClick={close}
          className="absolute end-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-[#131f24] dark:text-slate-300"
          aria-label="بستن"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-6 pb-6 pt-8 text-center">
          <div className="mx-auto flex h-[108px] w-[108px] items-center justify-center">
            <span className="absolute h-24 w-24 animate-ping rounded-full bg-emerald-300/30" />
            <Medal code="improved" size={100} className="relative drop-shadow-sm" />
          </div>

          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            مدال پیشرفت
          </p>

          <h2 className="mt-3 text-xl font-black text-slate-900 dark:text-white">
            نسبت به ترم قبل رشد کردی!
          </h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500 dark:text-slate-400">
            تو کلاس <span className="text-slate-800 dark:text-slate-200">{item.classTitle}</span>
            {item.courseName ? ` · ${item.courseName}` : ''} نمره‌ات از ترم قبل بالاتر رفته.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-2 py-3 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-[10px] font-bold text-slate-400">ترم قبل</p>
              <p className="mt-1 text-lg font-black text-slate-700 dark:text-slate-200">
                {formatScore(item.previousScore)}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-2 py-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">تغییر</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-lg font-black text-emerald-700 dark:text-emerald-300">
                <TrendingUp className="h-4 w-4 shrink-0" />
                {deltaLabel ?? '—'}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 px-2 py-3 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-[10px] font-bold text-slate-400">ترم فعلی</p>
              <p className="mt-1 text-lg font-black text-[#7c3aed] dark:text-[#a78bfa]">
                {formatScore(item.currentScore)}
              </p>
            </div>
          </div>

          {delta !== null && delta > 0 && (
            <p className="mt-4 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
              {toFa(Math.round(delta * 10) / 10)} نمره جلوتر از خودِ قبلی‌ات — ادامه بده.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button variant="ghost" className="flex-1" onClick={close}>
              باشه، دیدم
            </Button>
            <Link
              href={`/dashboard/courses/${item.classId}`}
              onClick={close}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] px-5 py-2.5 text-sm font-black text-white hover:bg-[#6d28d9] active:border-b-2"
            >
              جزئیات کلاس
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
