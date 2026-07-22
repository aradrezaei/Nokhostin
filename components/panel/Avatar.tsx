/** Tiny initials chip — zero SVG, zero animation. */
export default function Avatar({
  name,
  size = 40,
  className = '',
  seed: _seed,
}: {
  name?: string | null;
  seed?: string | number | null;
  size?: number;
  className?: string;
}) {
  const label = name?.trim() || 'کاربر';
  const initial = label.charAt(0);

  return (
    <span
      aria-label={label}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.4) }}
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-[#7c3aed] font-black leading-none text-white ${className}`}
    >
      {initial}
    </span>
  );
}
