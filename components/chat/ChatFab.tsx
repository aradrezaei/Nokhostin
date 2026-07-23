'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatFab({ unread, onOpen }: { unread: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="باز کردن پشتیبانی"
      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
      {unread > 0 && (
        <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">
          {unread > 9 ? '۹+' : unread}
        </span>
      )}
    </button>
  );
}
