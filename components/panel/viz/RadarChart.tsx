import { useId } from 'react';
import { toFa } from '@/lib/format';

export interface RadarAxis {
  label: string;
  value: number | null;
}

/**
 * Four-skill radar. Responsive SVG with generous label padding so nothing clips.
 */
export default function RadarChart({
  axes,
  max = 5,
  size = 240,
}: {
  axes: RadarAxis[];
  max?: number;
  size?: number;
}) {
  const gid = useId();
  // Extra canvas padding keeps Persian labels inside the viewBox.
  const pad = 42;
  const canvas = size + pad * 2;
  const cx = canvas / 2;
  const cy = canvas / 2;
  const radius = size / 2 - 8;
  const count = axes.length;

  const point = (index: number, ratio: number) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return [cx + radius * ratio * Math.cos(angle), cy + radius * ratio * Math.sin(angle)] as const;
  };

  const labelPoint = (index: number) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    const r = radius + 28;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = axes.map((axis, i) => point(i, Math.max((axis.value ?? 0) / max, 0)));
  const dataPath = dataPoints.map((p) => p.join(',')).join(' ');

  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden">
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${canvas} ${canvas}`}
        className="block max-w-full"
        role="img"
        aria-label="نمودار مهارت‌ها"
      >
        <defs>
          <linearGradient id={`r-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={axes.map((_, i) => point(i, level).join(',')).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-200 dark:text-slate-700"
          />
        ))}

        {axes.map((_, i) => {
          const [x, y] = point(i, 1);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-200 dark:text-slate-700"
            />
          );
        })}

        <polygon
          points={dataPath}
          fill={`url(#r-${gid})`}
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#7c3aed" stroke="#fff" strokeWidth="1.5" />
        ))}

        {axes.map((axis, i) => {
          const [x, y] = labelPoint(i);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
              fontWeight="800"
              className="fill-slate-500 dark:fill-slate-400"
            >
              {axis.label}
              {axis.value !== null ? ` ${toFa(axis.value)}` : ''}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
