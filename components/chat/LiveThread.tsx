'use client';

import { useEffect, useRef } from 'react';
import type { SupportMessage } from '@/lib/chat/types';

function bubbleClass(sender: SupportMessage['sender']) {
  if (sender === 'user') {
    return 'mr-auto bg-[#7c3aed] text-white border-[#5b21b6]';
  }
  if (sender === 'agent') {
    return 'ml-auto bg-emerald-50 text-emerald-950 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-800';
  }
  return 'ml-auto bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700';
}

function label(sender: SupportMessage['sender']) {
  if (sender === 'user') return 'شما';
  if (sender === 'agent') return 'پشتیبانی';
  return 'راهنما';
}

export default function LiveThread({
  messages,
  loading,
}: {
  messages: SupportMessage[];
  loading?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <div
      ref={scrollerRef}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3"
      dir="rtl"
    >
      {loading && messages.length === 0 ? (
        <p className="text-center text-xs font-bold text-slate-400">در حال آماده‌سازی گفتگو…</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((m) => (
            <li key={m.id} className="flex flex-col gap-0.5">
              <span className="px-1 text-[10px] font-bold text-slate-400">{label(m.sender)}</span>
              <div
                className={`max-w-[85%] rounded-2xl border-2 border-b-4 px-3 py-2 text-[12px] font-bold leading-5 whitespace-pre-wrap break-words ${bubbleClass(m.sender)}`}
              >
                {m.body}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
