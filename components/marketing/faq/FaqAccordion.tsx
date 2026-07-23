export interface FaqEntry {
  id: number;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqEntry[];
  columns?: 1 | 2;
  /** Unique name so only one item stays open (native exclusive accordion). */
  groupName: string;
}

/**
 * Zero-JS exclusive accordion via native <details name="…">.
 * Answers stay in the HTML for SEO/crawlers; summary is keyboard-accessible.
 */
export default function FaqAccordion({ items, columns = 1, groupName }: FaqAccordionProps) {
  const renderItem = (item: FaqEntry) => (
    <details
      key={item.id}
      name={groupName}
      className="group rounded-2xl border-2 border-b-4 border-[#E5E5E5] bg-white open:border-violet-400 open:bg-violet-50 dark:border-[#37464F] dark:bg-[#202F36] dark:open:border-violet-600 dark:open:bg-violet-500/10 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:px-6 sm:py-5">
        <span className="text-[15px] font-extrabold leading-6 text-[#4B4B4B] dark:text-white">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5E5E5] text-[#77858F] group-open:bg-violet-600 group-open:text-white dark:bg-[#37464F] dark:text-[#94A3B8]"
        >
          <span className="text-lg font-black leading-none group-open:hidden">+</span>
          <span className="hidden text-lg font-black leading-none group-open:inline">−</span>
        </span>
      </summary>
      <div className="border-t-2 border-[#E5E5E5] px-5 pb-5 pt-4 dark:border-[#37464F] sm:px-6">
        <p className="text-sm font-bold leading-7 text-[#5B6472] dark:text-[#94A3B8]">
          {item.answer}
        </p>
      </div>
    </details>
  );

  if (columns === 2) {
    const half = Math.ceil(items.length / 2);
    return (
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        <div className="flex flex-col gap-3 lg:gap-4">{items.slice(0, half).map(renderItem)}</div>
        <div className="flex flex-col gap-3 lg:gap-4">{items.slice(half).map(renderItem)}</div>
      </div>
    );
  }

  return <div className="flex flex-col gap-3">{items.map(renderItem)}</div>;
}
