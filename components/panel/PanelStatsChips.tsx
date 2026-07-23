'use client';

import { Flame, Trophy } from 'lucide-react';
import { toFa } from '@/lib/format';
import { useMyOverview } from '@/hooks/useMyOverview';

/** Duo-style top chips: attendance + medals. Instant from query cache. */
export default function PanelStatsChips() {
  const { snapshots, achievements } = useMyOverview();

  const avgAttendance = (() => {
    const rates = snapshots.map((s) => s.attendanceRate).filter((n): n is number => n !== null);
    if (!rates.length) return null;
    return Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
  })();

  return (
    <>
      <span className="panel-chip text-[#ff9600]" title="میانگین حضور">
        <Flame className="h-4 w-4" strokeWidth={2.75} fill="currentColor" />
        {avgAttendance === null ? '—' : toFa(avgAttendance)}
      </span>
      <span className="panel-chip text-[var(--p-gold)]" title="مدال‌ها">
        <Trophy className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
        {toFa(achievements.length)}
      </span>
    </>
  );
}
