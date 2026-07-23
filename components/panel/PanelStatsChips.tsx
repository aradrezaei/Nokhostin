'use client';

import { Flame, Trophy } from 'lucide-react';
import { formatScore, toFa } from '@/lib/format';
import { useMyOverview } from '@/hooks/useMyOverview';

/** Top chips: average score + medal count. */
export default function PanelStatsChips() {
  const { snapshots, achievements } = useMyOverview();

  const avgScore = (() => {
    const scores = snapshots.map((s) => s.score).filter((n): n is number => n !== null);
    if (!scores.length) return null;
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  })();

  return (
    <>
      <span className="panel-chip text-[#ff9600]" title="میانگین نمرات">
        <Flame className="h-4 w-4" strokeWidth={2.75} fill="currentColor" />
        {avgScore === null ? '—' : formatScore(avgScore)}
      </span>
      <span className="panel-chip text-[var(--p-gold)]" title="مدال‌ها">
        <Trophy className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
        {toFa(achievements.length)}
      </span>
    </>
  );
}
