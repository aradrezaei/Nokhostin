'use client';

import { useEffect, useRef } from 'react';
import type { SupportMessage } from '@/lib/chat/types';
import ChatWallpaper from './ChatWallpaper';

function bubbleClass(sender: SupportMessage['sender']) {
  if (sender === 'user') {
    return 'bg-[#7c3aed] text-white border-[#5b21b6]';
  }
  if (sender === 'agent') {
    return 'border-emerald-200 bg-white text-emerald-950 dark:border-emerald-800 dark:bg-[#10241c] dark:text-emerald-100';
  }
  return 'border-slate-200 bg-white/90 text-slate-700 dark:border-slate-700 dark:bg-[#1a262c] dark:text-slate-200';
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
    <div className="relative min-h-0 flex-1 bg-[#f3eefc] dark:bg-[#0c1418]">
      <ChatWallpaper />
      <div
        ref={scrollerRef}
        className="absolute inset-0 overflow-y-auto overscroll-contain px-3 py-3"
        dir="rtl"
      >
        {loading && messages.length === 0 ? (
          <p className="relative text-center text-xs font-bold text-slate-400">
            در حال آماده‌سازی گفتگو…
          </p>
        ) : (
          <ul className="relative space-y-2">
            {messages.map((m) => (
              <li
                key={m.id}
                className={`flex flex-col gap-0.5 ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
              >
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
    </div>
  );
}
