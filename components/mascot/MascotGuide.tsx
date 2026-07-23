'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Bit, { type BitAccessory, type BitMood } from './Bit';
import SpeechBubble from './SpeechBubble';

export interface MascotGuideProps {
  /** Rotates through these when the user keeps tapping Bit. */
  messages?: string[];
  /** Pick per-route to signal which course track the visitor is in. */
  accessory?: BitAccessory;
  accentColor?: string;
  position?: 'bottom-left' | 'bottom-right';
  /** Auto-open a greeting bubble shortly after mount (e.g. on the homepage only). */
  greetOnMount?: boolean;
}

const DEFAULT_MESSAGES = [
  'سلام! من بیت‌ام 👋',
  'دنبال یه دوره خاصی می‌گردی؟',
  'هر سوالی داشتی همینجام.',
];

export default function MascotGuide({
  messages = DEFAULT_MESSAGES,
  accessory = 'none',
  accentColor,
  position = 'bottom-left',
  greetOnMount = false,
}: MascotGuideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mood, setMood] = useState<BitMood>('idle');

  useEffect(() => {
    if (!greetOnMount) return;
    const t = setTimeout(() => {
      setOpen(true);
    }, 900);
    return () => {
      clearTimeout(t);
    };
  }, [greetOnMount]);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % messages.length);
  }, [messages.length]);

  const handleClick = () => {
    if (open) {
      advance();
    } else {
      setOpen(true);
    }
    setMood('happy');
    window.setTimeout(() => {
      setMood('idle');
    }, 700);
  };

  const posClass = position === 'bottom-left' ? 'left-5' : 'right-5';

  return (
    <div ref={wrapperRef} className={`fixed bottom-5 ${posClass} z-50 flex flex-col items-end`}>
      {open && (
        <SpeechBubble
          text={messages[index]}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}

      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => {
          setMood('happy');
        }}
        onMouseLeave={() => {
          setMood('idle');
        }}
        aria-label="راهنمای بیت — برای صحبت با بیت کلیک کن"
        className="rounded-full transition-transform duration-150 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <Bit
          mood={mood}
          accessory={accessory}
          accentColor={accentColor}
          size={72}
          trackMouse
          anchorRef={wrapperRef}
        />
      </button>
    </div>
  );
}
