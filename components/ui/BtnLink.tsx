import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type BtnLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: 'primary' | 'secondary';
};

export default function BtnLink({
  children,
  href,
  variant = 'primary',
  className = '',
  ...props
}: BtnLinkProps) {
  const variants = {
    primary: `
      bg-violet-500
      text-white
      border-b-4
      border-b-violet-800
      dark:border-b-violet-600
      hover:brightness-95
    `,
    secondary: `
      bg-white
      text-gray-800
      border-2
      border-gray-200
      border-b-4
      hover:bg-gray-200
      hover:border-gray-300
      dark:bg-zinc-900
      dark:text-white
      dark:border-zinc-700
      dark:hover:bg-zinc-800
      dark:hover:border-zinc-600
    `,
  };

  return (
    <Link
      href={href}
      {...props}
      className={`
        inline-flex
        h-[52px]
        w-full
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-2xl
        border-b-4
        px-6
        text-[16px]
        font-extrabold
        active:translate-y-[2px]
        active:border-b-2
        focus-visible:outline-2
        focus-visible:outline-violet-500
        focus-visible:outline-offset-2
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
