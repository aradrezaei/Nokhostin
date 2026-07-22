import type { Medal as MedalType } from '@/lib/types';

export type MedalCode = MedalType['code'];

const THEME: Record<
  MedalCode,
  { fill: string; highlight: string; ring: string; ribbon: string; glow: string }
> = {
  top_rank: {
    fill: '#FBBF24',
    highlight: '#FDE68A',
    ring: '#B45309',
    ribbon: '#7c3aed',
    glow: 'bg-amber-100 dark:bg-amber-950/40',
  },
  improved: {
    fill: '#34D399',
    highlight: '#A7F3D0',
    ring: '#047857',
    ribbon: '#0ea5e9',
    glow: 'bg-emerald-100 dark:bg-emerald-950/40',
  },
};

/**
 * Duolingo-flavored medal — solid fills only (no SVG gradients) for weak GPUs.
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
  const t = THEME[code];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {/* ribbons */}
      <path d="M38 8 L30 52 L44 44 L46 18 Z" fill={t.ribbon} />
      <path d="M62 8 L70 52 L56 44 L54 18 Z" fill={t.ribbon} opacity="0.88" />
      {/* knot */}
      <rect x="42" y="6" width="16" height="12" rx="3" fill={t.ribbon} />

      {/* body */}
      <circle cx="50" cy="68" r="32" fill={t.ring} />
      <circle cx="50" cy="68" r="27" fill={t.fill} />
      <circle cx="50" cy="68" r="22" fill={t.highlight} opacity="0.35" />
      <circle cx="50" cy="68" r="27" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />

      {code === 'top_rank' ? (
        <path
          d="M50 50 l5.2 10.5 11.6 1.7 -8.4 8.2 2 11.5 -10.4 -5.5 -10.4 5.5 2 -11.5 -8.4 -8.2 11.6 -1.7 Z"
          fill="#fff"
        />
      ) : (
        <path
          d="M38 76 L48 66 L54 72 L64 58 M64 58 L64 68 M64 58 L54 58"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function medalGlow(code: MedalCode): string {
  return THEME[code].glow;
}
