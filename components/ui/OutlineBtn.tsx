import { ButtonHTMLAttributes } from 'react';

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  children,
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        h-[52px]
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        cursor-pointer
        bg-white
        text-gray-800

        border-2
        border-gray-200
        border-b-4

        px-6
        text-[16px]
        font-extrabold



        hover:bg-gray-200
        hover:border-gray-300

        active:translate-y-[2px]
        active:border-b-2

        focus-visible:outline-2
        focus-visible:outline-violet-500
        focus-visible:outline-offset-2

        disabled:opacity-50
        disabled:cursor-not-allowed

        dark:bg-zinc-900
        dark:text-white
        dark:border-zinc-700

        dark:hover:bg-zinc-800
        dark:hover:border-zinc-600

        ${className}
      `}
    >
      {children}
    </button>
  );
}
