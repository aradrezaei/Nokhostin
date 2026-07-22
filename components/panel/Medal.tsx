import type { Medal as MedalType } from '@/lib/types';

type MedalCode = MedalType['code'];

const THEME: Record<MedalCode, { fill: string; ring: string; ribbon: string }> = {
  top_rank: { fill: '#F59E0B', ring: '#B45309', ribbon: '#7c3aed' },
  improved: { fill: '#059669', ring: '#065F46', ribbon: '#0ea5e9' },
};

/** Flat SVG medal — no gradients, cheap to paint on weak GPUs. */
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
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <path d="M35 20 L28 60 L42 52 L45 30 Z" fill={t.ribbon} />
      <path d="M65 20 L72 60 L58 52 L55 30 Z" fill={t.ribbon} opacity="0.85" />
      <circle cx="50" cy="60" r="30" fill={t.ring} />
      <circle cx="50" cy="60" r="26" fill={t.fill} />
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
