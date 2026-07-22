import { toFa } from '@/lib/format';

/**
 * Horizontal stacked attendance bar (present / late / absent) with a legend.
 * Flexbox + widths only — no SVG, no layout thrash on weak CPUs.
 */
export default function AttendanceBar({
  present,
  late,
  absent,
}: {
  present: number;
  late: number;
  absent: number;
}) {
  const total = present + late + absent;
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  const segments = [
    { key: 'present', value: present, color: 'bg-emerald-500', label: 'حاضر' },
    { key: 'late', value: late, color: 'bg-amber-500', label: 'تأخیر' },
    { key: 'absent', value: absent, color: 'bg-rose-500', label: 'غایب' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {total === 0 ? (
          <div className="h-full w-full" />
        ) : (
          segments.map((s) => (
            <div
              key={s.key}
              className={s.color}
              style={{ width: `${pct(s.value)}%` }}
              title={`${s.label}: ${s.value}`}
            />
          ))
        )}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {segments.map((s) => (
          <span
            key={s.key}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
            {s.label}
            <span className="text-slate-400 dark:text-slate-500">({toFa(s.value)})</span>
          </span>
        ))}
      </div>
    </div>
  );
}
