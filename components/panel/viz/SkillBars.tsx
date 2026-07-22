import { toFa } from '@/lib/format';

export interface SkillAxis {
  label: string;
  value: number | null;
}

/**
 * CSS-only skill meters — cheaper than SVG radar on weak GPUs
 * (no gradients, no polygons, just width + solid color).
 */
export default function SkillBars({ axes, max = 5 }: { axes: SkillAxis[]; max?: number }) {
  return (
    <div className="space-y-3">
      {axes.map((axis) => {
        const ratio =
          axis.value === null || axis.value === undefined
            ? 0
            : Math.min(Math.max(axis.value / max, 0), 1);
        return (
          <div key={axis.label}>
            <div className="mb-1 flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-600 dark:text-slate-300">{axis.label}</span>
              <span className="tabular-nums text-slate-400">
                {axis.value === null || axis.value === undefined ? '—' : toFa(axis.value)}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[#7c3aed]"
                style={{ width: `${ratio * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
