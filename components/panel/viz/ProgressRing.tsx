import { toFa } from '@/lib/format';

/**
 * Circular progress ring for "session X of Y". Pure static SVG — no animation.
 */
export default function ProgressRing({
  value,
  max,
  size = 132,
  stroke = 12,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const dash = circumference * ratio;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-900 dark:text-white">
          {toFa(label ?? `${value}/${max}`)}
        </span>
        {sublabel && (
          <span className="mt-0.5 text-[11px] font-bold text-slate-400 dark:text-slate-500">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
