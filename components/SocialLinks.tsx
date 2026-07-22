import { SOCIAL_LINKS } from '@/lib/site';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 5L3 12.5l5.5 1.8L17 8l-6.8 8.2 6.3 2.5L21 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
} as const;

/** Shared social icon buttons. */
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {SOCIAL_LINKS.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-white/20 border-b-4 bg-white/10 text-white"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
