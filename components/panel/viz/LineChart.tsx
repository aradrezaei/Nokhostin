import { useId } from 'react';
import { toFa } from '@/lib/format';

export interface LinePoint {
  x: number;
  y: number | null;
}

/**
 * Lightweight trend line. Always scales to container width — no horizontal overflow.
 */
export default function LineChart({
  points,
  max = 5,
  height = 160,
}: {
  points: LinePoint[];
  max?: number;
  height?: number;
  /** @deprecated ignored — chart is always fluid */
  width?: number;
}) {
  const gid = useId();
  const width = 360;
  const pad = { top: 14, right: 16, bottom: 26, left: 16 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  const valid = points.filter((p) => p.y !== null) as { x: number; y: number }[];
  if (valid.length === 0) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 dark:border-slate-700"
        style={{ height }}
      >
        هنوز ارزیابی‌ای ثبت نشده
      </div>
    );
  }

  const xs = points.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const spanX = maxX - minX || 1;

  const px = (x: number) => pad.left + ((x - minX) / spanX) * w;
  const py = (y: number) => pad.top + (1 - Math.min(y / max, 1)) * h;

  const line = valid.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.x)} ${py(p.y)}`).join(' ');
  const area = `${line} L ${px(valid[valid.length - 1]!.x)} ${pad.top + h} L ${px(valid[0]!.x)} ${pad.top + h} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${width} ${height}`}
        className="block max-w-full"
        role="img"
        aria-label="روند نمرات"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`l-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((g) => (
          <line
            key={g}
            x1={pad.left}
            x2={pad.left + w}
            y1={pad.top + g * h}
            y2={pad.top + g * h}
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-100 dark:text-slate-800"
          />
        ))}

        <path d={area} fill={`url(#l-${gid})`} />
        <path
          d={line}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {valid.map((p, i) => (
          <circle
            key={i}
            cx={px(p.x)}
            cy={py(p.y)}
            r="4"
            fill="#fff"
            stroke="#7c3aed"
            strokeWidth="2.5"
          />
        ))}
        {points.map((p) => (
          <text
            key={p.x}
            x={px(p.x)}
            y={height - 6}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            className="fill-slate-400"
          >
            {toFa(p.x)}
          </text>
        ))}
      </svg>
    </div>
  );
}
