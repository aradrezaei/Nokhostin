import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
  primary: `
    bg-violet-500
    text-white

    border-b-4
    border-b-violet-800
    dark:border-b-violet-600

    hover:brightness-95

    active:translate-y-[2px]
    active:border-b-2
  `,

    secondary: `

        bg-white
        text-gray-800

        border-2
        border-gray-200
        border-b-4

        px-6
        text-[16px]
        font-extrabold
      border-2


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
    `,
  };

  return (
    <button
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

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}