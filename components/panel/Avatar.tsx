/**
 * Shared avatar — ultra-light static WebP (~350B) for fast paint on any device.
 * Falls back to PNG; name is always exposed via alt for a11y / profile context.
 */
export default function Avatar({
  name,
  size = 40,
  className = '',
  seed: _seed,
  priority = false,
}: {
  name?: string | null;
  seed?: string | number | null;
  size?: number;
  className?: string;
  /** Prefer eager load for above-the-fold / profile hero. */
  priority?: boolean;
}) {
  const label = name?.trim() || 'کاربر';
  const src = size >= 72 ? '/avatar-lg.webp' : '/avatar.webp';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      title={label}
      width={size}
      height={size}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src.includes('.webp')) el.src = '/avatar.png';
      }}
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 rounded-2xl object-cover bg-[#7c3aed] ${className}`}
    />
  );
}
