import Link from 'next/link';

export interface NavLink { label: string; href: string }

/** Simple titled link column — reused in footer (and anywhere else). */
export default function LinkColumn({
  title,
  items,
  titleClassName = '',
  linkClassName = '',
}: {
  title: string;
  items: readonly NavLink[];
  titleClassName?: string;
  linkClassName?: string;
}) {
  return (
    <nav aria-label={title}>
      <h3 className={`mb-5 text-sm font-black ${titleClassName}`}>{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClassName}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
