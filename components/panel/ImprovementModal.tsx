'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, X } from 'lucide-react';
import { formatScore, toFa } from '@/lib/format';
import Medal from '@/components/panel/Medal';

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

/** One-shot progress unlock — short copy, no fluff. */
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
        setItem(items.find((i) => !seen.has(i.classId)) ?? null);
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
      aria-label="پیشرفت"
    >
      <button type="button" className="absolute inset-0 bg-black/45" aria-label="بستن" onClick={close} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-[var(--p-line)] border-b-4 bg-[var(--p-surface)]">
        <button
          type="button"
          onClick={close}
          className="absolute end-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[var(--p-muted)] hover:bg-[var(--p-bg)]"
          aria-label="بستن"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="px-6 pb-6 pt-8 text-center">
          <Medal code="improved" size={96} className="mx-auto" />
          <h2 className="mt-4 text-xl font-extrabold text-[var(--p-ink)]">پیشرفت ترم</h2>
          <p className="mt-2 text-sm font-bold text-[var(--p-muted)]">{item.classTitle}</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border-2 border-[var(--p-line)] px-2 py-3">
              <p className="text-[10px] font-bold text-[var(--p-muted)]">قبل</p>
              <p className="mt-1 text-lg font-extrabold">{formatScore(item.previousScore)}</p>
            </div>
            <div className="rounded-2xl border-2 border-[var(--p-green)] bg-[color-mix(in_srgb,var(--p-green)_12%,transparent)] px-2 py-3">
              <p className="text-[10px] font-bold text-[var(--p-green)]">تغییر</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-lg font-extrabold text-[var(--p-green)]">
                <TrendingUp className="h-4 w-4" />
                {deltaLabel ?? '—'}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[var(--p-line)] px-2 py-3">
              <p className="text-[10px] font-bold text-[var(--p-muted)]">الان</p>
              <p className="mt-1 text-lg font-extrabold">{formatScore(item.currentScore)}</p>
            </div>
          </div>

          {delta !== null && delta > 0 ? (
            <p className="mt-4 text-xs font-extrabold text-[var(--p-green)]">
              +{toFa(Math.round(delta * 10) / 10)} نسبت به ترم قبل
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={close} className="panel-btn panel-btn--ghost flex-1">
              بستن
            </button>
            <Link
              href={`/dashboard/courses/${item.classId}`}
              onClick={close}
              className="panel-btn panel-btn--green flex-1"
            >
              مشاهده کلاس
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
