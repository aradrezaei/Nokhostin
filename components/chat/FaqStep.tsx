'use client';

import { useState } from 'react';
import { ChevronDown, Headset } from 'lucide-react';
import { CHAT_FAQS } from '@/lib/chat/faqs';

export default function FaqStep({ onTalkToHuman }: { onTalkToHuman: () => void }) {
  const [openId, setOpenId] = useState<string | null>(CHAT_FAQS[0].id);

  return (
    <div className="flex h-full flex-col" dir="rtl">
      <div className="border-b-2 border-slate-200 px-4 py-3 dark:border-slate-700">
        <p className="text-sm font-black text-slate-900 dark:text-white">کمکت می‌کنیم</p>
        <p className="mt-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          اول این جواب‌های پرتکرار را ببین؛ اگر حل نشد با پشتیبانی حرف بزن.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2 [content-visibility:auto]">
        <ul className="space-y-2">
          {CHAT_FAQS.map((faq) => {
            const open = openId === faq.id;
            return (
              <li
                key={faq.id}
                className="rounded-2xl border-2 border-slate-200 border-b-4 bg-white dark:border-slate-700 dark:bg-[#131f24]"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-right"
                  aria-expanded={open}
                  onClick={() => {
                    setOpenId(open ? null : faq.id);
                  }}
                >
                  <span className="min-w-0 flex-1 text-xs font-black text-slate-800 dark:text-slate-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 ${open ? 'rotate-180' : ''}`}
                    strokeWidth={2.5}
                  />
                </button>
                {open && (
                  <p className="border-t border-slate-100 px-3 py-2.5 text-[11px] font-bold leading-5 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {faq.answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t-2 border-slate-200 p-3 dark:border-slate-700">
        <button
          type="button"
          onClick={onTalkToHuman}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] px-4 py-3 text-sm font-black text-white"
        >
          <Headset className="h-4 w-4" strokeWidth={2.5} />
          هنوز مشکل دارم — صحبت با پشتیبانی
        </button>
      </div>
    </div>
  );
}
