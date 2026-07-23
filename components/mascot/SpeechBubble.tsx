'use client';

export interface SpeechBubbleProps {
  text: string;
  onClose?: () => void;
  tone?: 'violet' | 'emerald' | 'amber' | 'rose';
}

const TONE_BG: Record<NonNullable<SpeechBubbleProps['tone']>, string> = {
  violet: 'bg-violet-600',
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-500',
  rose: 'bg-rose-600',
};

export default function SpeechBubble({ text, onClose, tone = 'violet' }: SpeechBubbleProps) {
  const bg = TONE_BG[tone];

  return (
    <div className="relative mb-3 max-w-[230px]" dir="rtl">
      <div
        className={`rounded-2xl ${bg} px-4 py-3 text-sm font-bold leading-6 text-white shadow-sm`}
      >
        {text}
      </div>
      {/* speech tail */}
      <span className={`absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 ${bg}`} aria-hidden="true" />

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-gray-500 shadow ring-1 ring-gray-200 transition-transform duration-150 ease-out hover:scale-110"
        >
          ✕
        </button>
      )}
    </div>
  );
}
