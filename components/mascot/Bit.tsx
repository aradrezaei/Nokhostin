'use client';

import { useEffect, useRef } from 'react';

/**
 * BIT — the mascot of آموزشگاه نخستین
 * ------------------------------------
 * Concept: a small screen-faced companion robot. "بیت" (bit) is the smallest
 * unit of digital information — a deliberate, ownable name for a technical/
 * vocational school (as opposed to a generic wise-owl archetype). Its screen
 * face + swappable chest/head badges let ONE character represent every
 * course track (programming, AI, robotics, accounting, art) instead of
 * needing a different animal per subject.
 *
 * Performance rules (kept strict on purpose):
 * - No <filter>, no blur, no gradients baked into the SVG. Every "glow" is a
 *   flat low-opacity shape, not a filter — cheap even on old integrated GPUs.
 * - Mouse-follow eyes update via refs + a single rAF-throttled listener,
 *   directly setting an SVG attribute. This never triggers a React
 *   re-render, so it stays smooth regardless of page complexity.
 * - Blinking is timer-driven and also ref-based (no state).
 * - The only continuous animation is a 3s transform-only float, which
 *   respects prefers-reduced-motion.
 */

export type BitMood =
  | 'idle'
  | 'happy'
  | 'thinking'
  | 'celebrating'
  | 'confused'
  | 'wave'
  | 'sleepy';
export type BitAccessory = 'none' | 'cap' | 'beret' | 'tools' | 'calculator' | 'code';

export interface BitProps {
  /** Rendered width/height in px. viewBox is square. */
  size?: number;
  mood?: BitMood;
  accessory?: BitAccessory;
  /** Body / accent color. Defaults to the site's violet-600. */
  accentColor?: string;
  /** If true, the pupils follow the cursor anywhere on screen. */
  trackMouse?: boolean;
  /** Element to measure the cursor offset against (defaults to Bit itself). */
  anchorRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  /** Gentle idle bob. Turn off when Bit is inside a card/hover context that already animates. */
  floating?: boolean;
}

const SCREEN = '#10242a';
const LENS = '#e9fbff';

function Mouth({ mood }: { mood: BitMood }) {
  switch (mood) {
    case 'happy':
    case 'wave':
    case 'celebrating':
      return (
        <path
          d="M80 90q20 18 40 0"
          stroke={LENS}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'thinking':
      return (
        <>
          <circle cx="84" cy="94" r="3" fill={LENS} />
          <circle cx="100" cy="94" r="3" fill={LENS} opacity="0.7" />
          <circle cx="116" cy="94" r="3" fill={LENS} opacity="0.4" />
        </>
      );
    case 'confused':
      return (
        <path
          d="M82 92l8 6 8-6 8 6 8-6"
          stroke={LENS}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'sleepy':
      return (
        <line
          x1="86"
          y1="93"
          x2="114"
          y2="93"
          stroke={LENS}
          strokeWidth="4"
          strokeLinecap="round"
        />
      );
    case 'idle':
      return (
        <path
          d="M84 93q16 8 32 0"
          stroke={LENS}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      );
    default:
      return null;
  }
}

function Accessory({ type, accentColor }: { type: BitAccessory; accentColor: string }) {
  switch (type) {
    case 'cap':
      return (
        <g>
          <path d="M38 33 100 12 162 33 100 51Z" fill={SCREEN} />
          <rect x="96" y="49" width="8" height="16" rx="3" fill={SCREEN} />
          <circle cx="100" cy="67" r="4.5" fill={accentColor} />
        </g>
      );
    case 'beret':
      return (
        <g transform="rotate(-10 118 24)">
          <ellipse cx="118" cy="24" rx="28" ry="13" fill={SCREEN} />
          <circle cx="136" cy="15" r="4" fill={accentColor} />
        </g>
      );
    case 'tools':
      return (
        <g>
          <rect x="58" y="148" width="84" height="13" rx="6.5" fill={SCREEN} opacity="0.9" />
          <rect x="91" y="132" width="18" height="30" rx="5" fill={SCREEN} />
          <circle cx="100" cy="138" r="4" fill={accentColor} />
        </g>
      );
    case 'calculator':
      return (
        <g>
          <rect x="79" y="124" width="42" height="26" rx="7" fill={SCREEN} />
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <circle
                key={`${r}-${c}`}
                cx={88 + c * 12}
                cy={132 + r * 10}
                r="2"
                fill={accentColor}
              />
            )),
          )}
        </g>
      );
    case 'code':
      return (
        <g>
          <rect x="77" y="124" width="46" height="26" rx="7" fill={SCREEN} />
          <path
            d="M89 130 82 137 89 144"
            stroke={accentColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M111 130 118 137 111 144"
            stroke={accentColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case 'none':
      return null;
  }
}

export default function Bit({
  size = 96,
  mood = 'idle',
  accessory = 'none',
  accentColor = '#7C3AED',
  trackMouse = false,
  anchorRef,
  className = '',
  floating = true,
}: BitProps) {
  const rootRef = useRef<SVGSVGElement>(null);
  const leftPupil = useRef<SVGCircleElement>(null);
  const rightPupil = useRef<SVGCircleElement>(null);
  const lidLeft = useRef<SVGRectElement>(null);
  const lidRight = useRef<SVGRectElement>(null);
  const rafId = useRef<number | null>(null);

  // Mouse-tracking eyes: direct DOM writes, throttled to one per animation frame.
  useEffect(() => {
    if (!trackMouse) return;
    const target = anchorRef?.current ?? rootRef.current;
    if (!target) return;

    const handleMove = (e: MouseEvent) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const MAX = 2.8;
        const pull = Math.min(1, dist / 220);
        const nx = (dx / dist) * MAX * pull;
        const ny = (dy / dist) * MAX * pull;
        leftPupil.current?.setAttribute('transform', `translate(${nx} ${ny})`);
        rightPupil.current?.setAttribute('transform', `translate(${nx} ${ny})`);
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [trackMouse, anchorRef]);

  // Blink loop — ref-driven, no re-renders.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const scheduleBlink = () => {
      const delay = 2600 + Math.random() * 2600;
      timeout = setTimeout(() => {
        if (cancelled) return;
        lidLeft.current?.setAttribute('height', '20');
        lidRight.current?.setAttribute('height', '20');
        setTimeout(() => {
          if (cancelled) return;
          lidLeft.current?.setAttribute('height', '0');
          lidRight.current?.setAttribute('height', '0');
        }, 110);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const armRightRotate = mood === 'wave' ? -35 : mood === 'celebrating' ? -18 : 0;
  const armLeftRotate = mood === 'celebrating' ? 18 : 0;

  return (
    <>
      <svg
        ref={rootRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`${className}${floating ? ' bit-float' : ''}`}
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <ellipse cx="100" cy="182" rx="34" ry="6" fill="#10242a" opacity="0.12" />

        {/* antenna */}
        <line
          x1="100"
          y1="10"
          x2="100"
          y2="28"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="8" r="10" fill={accentColor} opacity="0.22" />
        <circle cx="100" cy="8" r="6" fill={accentColor} />

        {/* arms */}
        <g
          style={{
            transform: `rotate(${armLeftRotate}deg)`,
            transformOrigin: '46px 108px',
            transition: 'transform 200ms ease-out',
          }}
        >
          <rect x="30" y="100" width="16" height="42" rx="8" fill={accentColor} />
        </g>
        <g
          style={{
            transform: `rotate(${armRightRotate}deg)`,
            transformOrigin: '154px 108px',
            transition: 'transform 200ms ease-out',
          }}
        >
          <rect x="154" y="100" width="16" height="42" rx="8" fill={accentColor} />
        </g>

        {/* torso */}
        <rect x="52" y="96" width="96" height="82" rx="30" fill={accentColor} />
        <rect x="76" y="120" width="48" height="34" rx="10" fill="#ffffff" opacity="0.14" />

        {/* head + screen */}
        <rect x="40" y="28" width="120" height="86" rx="28" fill={accentColor} />
        <rect x="56" y="42" width="88" height="58" rx="18" fill={SCREEN} />

        {/* eyes */}
        <rect x="72" y="60" width="20" height="20" rx="6" fill={LENS} />
        <rect x="108" y="60" width="20" height="20" rx="6" fill={LENS} />
        <circle ref={leftPupil} cx="82" cy="70" r="6" fill={accentColor} />
        <circle ref={rightPupil} cx="118" cy="70" r="6" fill={accentColor} />
        <rect ref={lidLeft} x="72" y="60" width="20" height="0" fill={SCREEN} />
        <rect ref={lidRight} x="108" y="60" width="20" height="0" fill={SCREEN} />

        <Mouth mood={mood} />
        <Accessory type={accessory} accentColor={accentColor} />
      </svg>

      <style jsx>{`
        .bit-float {
          animation: bitFloat 3s ease-in-out infinite;
        }
        @keyframes bitFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bit-float {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
