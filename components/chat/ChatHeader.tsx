'use client';

import { ArrowRight, X } from 'lucide-react';

const AGENTS = [
  { name: 'پشتیبان ۱', src: '/avatar.webp' },
  { name: 'پشتیبان ۲', src: '/avatar-lg.webp' },
] as const;

export default function ChatHeader({
  showBack,
  onBack,
  onClose,
}: {
  showBack?: boolean;
  onBack?: () => void;
  onClose: () => void;
}) {
  return (
    <header className="relative z-10 flex items-center gap-2 border-b-2 border-[#5b21b6] bg-[#7c3aed] px-3 py-3 text-white">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="بازگشت به سوالات"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      ) : null}

      <div className="flex shrink-0 items-center ps-1" dir="ltr" aria-hidden>
        {AGENTS.map((agent, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={agent.name}
            src={agent.src}
            alt=""
            width={36}
            height={36}
            decoding="async"
            loading="lazy"
            className={`h-9 w-9 rounded-full border-2 border-white object-cover bg-violet-300 ${
              i === 0 ? '' : '-ms-2.5'
            }`}
          />
        ))}
      </div>

      <div className="min-w-0 flex-1 text-right">
        <p className="truncate text-sm font-black leading-5">پشتیبانی نخستین</p>
        <p className="truncate text-[11px] font-bold text-violet-100">در خدمت شما هستیم</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="بستن پشتیبانی"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15"
      >
        <X className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </header>
  );
}
