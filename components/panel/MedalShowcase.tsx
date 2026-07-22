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

/** Compact medal cards for profile / dashboard. */
export default function MedalShowcase({
  items,
  emptyHint = 'وقتی بالاترین نمرهٔ کلاس را داشته باشید، مدال مقام اول اینجا نمایش داده می‌شود.',
}: {
  items: Achievement[];
  emptyHint?: string;
}) {
  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center !py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40">
          <Trophy className="h-7 w-7 text-slate-300 dark:text-slate-600" />
        </span>
        <p className="mt-4 text-sm font-black text-slate-700 dark:text-slate-200">مدالی ثبت نشده</p>
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
          <Card className={`!p-4 flex items-center gap-4 ${medalGlow(item.code)}`}>
            <span className="shrink-0">
              <Medal code={item.code} size={72} />
            </span>
            <div className="min-w-0">
              <p className="text-base font-black text-slate-900 dark:text-white">{item.title}</p>
              <p className="mt-1 text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">
                {item.classTitle}
                {item.courseName ? ` · ${item.courseName}` : ''}
              </p>
              {item.description ? (
                <p className="mt-1.5 text-[11px] font-bold text-slate-400">{item.description}</p>
              ) : null}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
