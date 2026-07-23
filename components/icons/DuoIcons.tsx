/**
 * Duolingo-style icon set.
 *
 * Design rules (kept intentionally strict for performance):
 * - Pure filled/stroked vector paths only. No <filter>, no blur, no gradients,
 *   no drop-shadows baked into the SVG — those are the expensive parts on
 *   weak/integrated GPUs, not the shapes themselves.
 * - Duotone via `currentColor` at two opacities (1 and ~0.16–0.35) instead of
 *   a second literal color, so every icon still inherits the existing
 *   `text-*` color classes and works in light/dark mode without changes.
 * - Thick, rounded strokes (linecap/linejoin = round) and soft geometry —
 *   that rounded, toy-like weight is the core of the Duolingo look.
 * - Every path count kept small (≤6 shapes/icon) so they're cheap to
 *   rasterize even on the worst integrated graphics.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
} as const;

export function DuoAward({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path d="M8.7 13.2 5.8 20.3l6.2-2.3 6.2 2.3-2.9-7.1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="10" r="5.6" fill="currentColor" />
      <path
        d="m12 7.7.86 1.86 2.02.27-1.47 1.44.35 2.03L12 12.28l-1.76 1.02.35-2.03-1.47-1.44 2.02-.27Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}

export function DuoUsers({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <circle cx="9.3" cy="9.6" r="3" fill="currentColor" />
      <path d="M4.2 18c.5-3 2.4-4.6 5.1-4.6s4.6 1.6 5.1 4.6Z" fill="currentColor" />
      <circle cx="15.6" cy="9.3" r="2.3" fill="currentColor" fillOpacity="0.45" />
      <path
        d="M14 18c.35-2.6 1.7-4 3.9-4.2 2.05.25 3.35 1.6 3.7 4.2Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}

export function DuoShield({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 4.4 18 6.6v4.7c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8V6.6Z" fill="currentColor" />
      <path
        d="m9.2 12.1 1.9 1.9 3.7-3.9"
        stroke="var(--duo-shield-check, #fff)"
        strokeOpacity="0.9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DuoTarget({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="7.3" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.9" fill="currentColor" fillOpacity="0.35" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function DuoZap({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path d="M13 3.6 6.6 13.4h4.1l-.9 6.9 6.7-9.9h-4.2Z" fill="currentColor" />
    </svg>
  );
}

export function DuoRocket({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M12 3.8c2.6 1.9 4 4.7 4 8.2 0 1.6-.3 3-.9 4.3H8.9c-.6-1.3-.9-2.7-.9-4.3 0-3.5 1.4-6.3 4-8.2Z"
        fill="currentColor"
      />
      <circle cx="12" cy="10.4" r="1.7" fill="var(--duo-rocket-window,#fff)" fillOpacity="0.85" />
      <path d="M8.6 14.6 5.7 17v-3.3Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M15.4 14.6 18.3 17v-3.3Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M10.3 18.4h3.4l-1 3.1a.9.9 0 0 1-1.4 0Z" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

export function DuoHeart({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M12 19s-6.4-3.9-6.4-8.6c0-2.3 1.8-4 4-4 1.1 0 2.1.5 2.7 1.4a3.3 3.3 0 0 1 5.1 2.6c0 4.7-6.4 8.6-6.4 8.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DuoBarChart({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <rect x="6" y="12.5" width="3.1" height="6" rx="1.2" fill="currentColor" fillOpacity="0.45" />
      <rect x="10.5" y="8.5" width="3.1" height="10" rx="1.2" fill="currentColor" />
      <rect x="15" y="5.5" width="3.1" height="13" rx="1.2" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

export function DuoBriefcase({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M9.2 8V6.8c0-.7.6-1.3 1.3-1.3h3c.7 0 1.3.6 1.3 1.3V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="4.8" y="8" width="14.4" height="9.6" rx="2.2" fill="currentColor" />
      <rect
        x="4.8"
        y="8"
        width="14.4"
        height="3.6"
        rx="1.4"
        fill="currentColor"
        fillOpacity="0.45"
      />
      <rect
        x="10.8"
        y="10.6"
        width="2.4"
        height="2.4"
        rx="0.6"
        fill="var(--duo-bag-clip,#fff)"
        fillOpacity="0.85"
      />
    </svg>
  );
}

export function DuoMedal({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path d="m7.6 4.4 3.4 6.3-3 1.7L4.6 6Z" fill="currentColor" fillOpacity="0.4" />
      <path d="m16.4 4.4-3.4 6.3 3 1.7L19.4 6Z" fill="currentColor" fillOpacity="0.4" />
      <circle cx="12" cy="14.4" r="5.2" fill="currentColor" />
      <circle cx="12" cy="14.4" r="2.4" fill="var(--duo-medal-core,#fff)" fillOpacity="0.85" />
    </svg>
  );
}

export function DuoGlobe({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.6 12h14.8M12 4.6c1.9 2 2.9 4.6 2.9 7.4s-1 5.4-2.9 7.4c-1.9-2-2.9-4.6-2.9-7.4s1-5.4 2.9-7.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DuoWrench({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M14.8 5.2a3.9 3.9 0 0 0-4.9 4.9L4.8 15.2c-.7.7-.7 1.9 0 2.6l1.4 1.4c.7.7 1.9.7 2.6 0l5.1-5.1a3.9 3.9 0 0 0 4.9-4.9l-2.5 2.5-2-.7-.7-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DuoDollarSign({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="7.4" fill="currentColor" fillOpacity="0.18" />
      <path
        d="M14.6 9.4c0-1.1-1.1-2-2.6-2s-2.6.8-2.6 1.9c0 1.2 1 1.6 2.6 2s2.6.8 2.6 2c0 1.1-1.1 1.9-2.6 1.9s-2.6-.9-2.6-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.4v1.1M12 16.5v1.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DuoCheckCircle({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="8.4" fill="currentColor" />
      <path
        d="m7.8 12.3 2.7 2.7 5.2-5.4"
        stroke="var(--duo-check,#fff)"
        strokeOpacity="0.92"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
