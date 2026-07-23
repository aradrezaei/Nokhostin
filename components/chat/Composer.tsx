'use client';

import { SendHorizonal } from 'lucide-react';

export default function Composer({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = 'پیامت را بنویس…',
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div
      className="flex items-end gap-2 border-t-2 border-slate-200 p-3 dark:border-slate-700"
      dir="rtl"
    >
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value.slice(0, 1000));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border-2 border-slate-200 border-b-4 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#7c3aed] dark:border-slate-700 dark:bg-[#0f181c] dark:text-slate-100"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled === true || value.trim().length === 0}
        aria-label="ارسال"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white disabled:opacity-40"
      >
        <SendHorizonal className="h-4 w-4 rotate-180" strokeWidth={2.5} />
      </button>
    </div>
  );
}
