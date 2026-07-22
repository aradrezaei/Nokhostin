'use client';

import Link from 'next/link';
import { CalendarDays, ChevronLeft, Users } from 'lucide-react';
import type { ClassSummary } from '@/lib/types';
import { CLASS_STATUS_LABEL, formatSchedule, toFa } from '@/lib/format';
import Avatar from '@/components/panel/Avatar';
import { Badge, Card } from '@/components/panel/ui';
import { TuitionPill } from '@/components/panel/widgets';

export function ClassCard({
  item,
  href,
  tuitionPaid,
}: {
  item: Pick<
    ClassSummary,
    'id' | 'title' | 'termNumber' | 'totalSessions' | 'schedule' | 'status' | 'course' | 'teacher'
  > & { studentCount?: number; sessionsHeld?: number };
  href: string;
  tuitionPaid?: boolean;
}) {
  const held = item.sessionsHeld ?? 0;
  const total = item.totalSessions;
  const pct = total > 0 ? Math.min((held / total) * 100, 100) : 0;

  return (
    <Link href={href} className="block group">
      <Card className="!p-5 group-hover:border-[#7c3aed]/60 dark:group-hover:border-[#a78bfa]/50">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-900 dark:text-white">
              {item.title}
            </p>
            <p className="mt-1 text-xs font-bold text-slate-400">
              {item.course?.name ?? '—'}
              {item.course?.level ? ` · ${item.course.level}` : ''}
              {' · '}ترم {toFa(item.termNumber)}
            </p>
          </div>
          <Badge
            tone={
              item.status === 'active' ? 'green' : item.status === 'finished' ? 'amber' : 'gray'
            }
          >
            {CLASS_STATUS_LABEL[item.status] ?? item.status}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>
              جلسه {toFa(held)} از {toFa(total)}
            </span>
            <span>{toFa(Math.round(pct))}٪</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-[#7c3aed]" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatSchedule(item.schedule)}
          </span>
          {typeof item.studentCount === 'number' && item.studentCount >= 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {toFa(item.studentCount)} هنرجو
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-slate-100 pt-3 dark:border-slate-800">
          {item.teacher ? (
            <span className="flex min-w-0 items-center gap-2">
              <Avatar name={item.teacher.fullName} seed={item.teacher.id} size={28} />
              <span className="truncate text-xs font-black text-slate-700 dark:text-slate-200">
                {item.teacher.fullName}
              </span>
            </span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-2">
            {typeof tuitionPaid === 'boolean' && <TuitionPill paid={tuitionPaid} />}
            <ChevronLeft className="h-4 w-4 text-slate-300" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
