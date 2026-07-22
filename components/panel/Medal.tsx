import { useId } from 'react';
import type { Medal as MedalType } from '@/lib/types';

type MedalCode = MedalType['code'];

const THEME: Record<MedalCode, { from: string; to: string; ring: string; ribbon: string }> = {
  top_rank: { from: '#FDE68A', to: '#F59E0B', ring: '#B45309', ribbon: '#7c3aed' },
  improved: { from: '#6EE7B7', to: '#059669', ring: '#065F46', ribbon: '#0ea5e9' },
};

/**
 * A polished, self-contained SVG medal (no image assets). `top_rank` is a gold
 * star medal; `improved` is an emerald upward-trend medal. Includes ribbon,
 * bevel and a light sheen — all vector, cheap to render on weak devices.
 */
export default function Medal({
  code,
  size = 72,
  className = '',
}: {
  code: MedalCode;
  size?: number;
  className?: string;
}) {
  const gid = useId();
  const t = THEME[code];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`m-${gid}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </radialGradient>
      </defs>

      {/* ribbons */}
      <path d={`M35 20 L28 60 L42 52 L45 30 Z`} fill={t.ribbon} opacity="0.95" />
      <path d={`M65 20 L72 60 L58 52 L55 30 Z`} fill={t.ribbon} opacity="0.8" />

      {/* medal body */}
      <circle cx="50" cy="60" r="30" fill={t.ring} />
      <circle cx="50" cy="60" r="26" fill={`url(#m-${gid})`} />
      <circle cx="50" cy="60" r="26" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      {/* sheen */}
      <path d="M32 46 A26 26 0 0 1 66 44 Q50 40 32 46 Z" fill="#ffffff" opacity="0.25" />

      {code === 'top_rank' ? (
        <path
          d="M50 45 l4.7 9.5 10.5 1.5 -7.6 7.4 1.8 10.4 -9.4 -4.9 -9.4 4.9 1.8 -10.4 -7.6 -7.4 10.5 -1.5 Z"
          fill="#ffffff"
        />
      ) : (
        <path
          d="M38 68 L48 58 L54 64 L64 52 M64 52 L64 60 M64 52 L56 52"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
