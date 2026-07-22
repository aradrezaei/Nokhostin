import Link from 'next/link';
import { SITE } from '@/lib/site';

type BrandMarkProps = {
  /** `nav` = brand tile + dark ink. `footer` = glass tile on brand band. */
  tone?: 'nav' | 'footer';
  compact?: boolean;
  className?: string;
};

/** Shared academy mark — navbar + footer. */
export default function BrandMark({
  tone = 'nav',
  compact = false,
  className = '',
}: BrandMarkProps) {
  const tile = tone === 'footer' ? 'bg-white/15' : 'bg-[var(--brand)]';
  const size = compact ? 'h-9 w-9' : 'h-10 w-10';
  const title = tone === 'footer' ? 'text-white' : 'text-[var(--nav-ink)]';
  const sub = tone === 'footer' ? 'text-white/70' : 'text-[var(--nav-muted-ink)]';

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-xl ${tile}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.png" alt="" className="h-full w-full scale-[1.12] object-contain" />
      </span>
      {!compact && (
        <span className="block leading-none">
          <span className={`block text-[15px] font-bold tracking-tight ${title}`}>{SITE.name}</span>
          <span className={`mt-1 block text-[10px] font-medium tracking-wide ${sub}`}>
            {SITE.tagline}
          </span>
        </span>
      )}
    </span>
  );
}

export function BrandHomeLink({
  compact = false,
  tone = 'nav',
  className = '',
}: {
  compact?: boolean;
  tone?: 'nav' | 'footer';
  className?: string;
}) {
  return (
    <Link href="/" aria-label={`صفحه اصلی ${SITE.name}`} className={className}>
      <BrandMark compact={compact} tone={tone} />
    </Link>
  );
}
