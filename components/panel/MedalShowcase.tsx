'use client';

import Link from 'next/link';
import { Trophy } from 'lucide-react';
import type { Medal as MedalType } from '@/lib/types';
import Medal, { medalGlow } from '@/components/panel/Medal';
import { Card } from '@/components/panel/ui';

export type Achievement = MedalType & {
  classId: string;
  classTitle: string;
  courseName?: string | null;
};

/** Duolingo-style achievement grid for profile / dashboard. */
export default function MedalShowcase({
  items,
  emptyHint = 'مقام اول کلاس را بگیر تا مدالت اینجا بدرخشد.',
}: {
  items: Achievement[];
  emptyHint?: string;
}) {
  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center !py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40">
          <Trophy className="h-7 w-7 text-slate-300 dark:text-slate-600" />
        </span>
        <p className="mt-4 text-sm font-black text-slate-700 dark:text-slate-200">هنوز مدالی نداری</p>
        <p className="mt-1 max-w-xs text-xs font-bold leading-5 text-slate-400">{emptyHint}</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={`${item.code}-${item.classId}`}
          href={`/dashboard/courses/${item.classId}`}
          className="block"
        >
          <Card
            className={`!p-4 flex items-center gap-4 transition-transform hover:-translate-y-0.5 ${medalGlow(item.code)}`}
          >
            <span className="shrink-0 drop-shadow-sm">
              <Medal code={item.code} size={88} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-amber-700/80 dark:text-amber-300/80">
                مدال افتخار
              </p>
              <p className="mt-0.5 text-base font-black text-slate-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-1 text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">
                {item.classTitle}
                {item.courseName ? ` · ${item.courseName}` : ''}
              </p>
              <p className="mt-1.5 text-[11px] font-bold text-slate-400">{item.description}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
