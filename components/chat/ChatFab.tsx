'use client';

import { MessageCircle, X } from 'lucide-react';

export default function ChatFab({
  open,
  unread,
  onToggle,
}: {
  open: boolean;
  unread: number;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'بستن پشتیبانی' : 'باز کردن پشتیبانی'}
      aria-expanded={open}
      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white shadow-[0_8px_24px_-12px_rgba(91,33,182,0.7)]"
    >
      {open ? (
        <X className="h-6 w-6" strokeWidth={2.5} />
      ) : (
        <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
      )}
      {!open && unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">
          {unread > 9 ? '۹+' : unread}
        </span>
      )}
    </button>
  );
}
