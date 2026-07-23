'use client';

import { ArrowRight } from 'lucide-react';
import ChatFab from './ChatFab';
import Composer from './Composer';
import FaqStep from './FaqStep';
import LiveThread from './LiveThread';
import { useSupportChat } from '@/hooks/useSupportChat';

export default function ChatPanel() {
  const chat = useSupportChat();
  const open = chat.view !== 'closed';

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      {open && (
        <div
          className="pointer-events-auto flex h-[min(560px,calc(100dvh-6.5rem))] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-3xl border-2 border-slate-200 border-b-4 bg-[#fcfbff] shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-[#131f24]"
          role="dialog"
          aria-label="پشتیبانی نخستین"
        >
          <header className="flex items-center gap-2 border-b-2 border-slate-200 bg-[#7c3aed] px-3 py-2.5 text-white dark:border-[#5b21b6]">
            {chat.view === 'live' && (
              <button
                type="button"
                onClick={chat.backToFaq}
                aria-label="بازگشت به سوالات"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">
                {chat.view === 'live' ? 'گفتگو با پشتیبانی' : 'مرکز راهنما'}
              </p>
              <p className="text-[10px] font-bold text-violet-100">
                {chat.view === 'live' ? 'پاسخ در ساعات کاری' : 'سریع‌ترین راه برای جواب گرفتن'}
              </p>
            </div>
          </header>

          {chat.view === 'faq' && <FaqStep onTalkToHuman={() => { void chat.startLive(); }} />}

          {chat.view === 'live' && (
            <div className="flex min-h-0 flex-1 flex-col">
              <LiveThread messages={chat.messages} loading={chat.loadingLive} />
              {chat.error && (
                <p className="px-3 pb-1 text-[11px] font-bold text-rose-600">{chat.error}</p>
              )}
              <Composer
                value={chat.draft}
                onChange={chat.updateDraft}
                onSend={() => {
                  void chat.send();
                }}
                disabled={chat.sending || chat.loadingLive || !chat.conversation}
              />
            </div>
          )}
        </div>
      )}

      <div className="pointer-events-auto">
        <ChatFab
          open={open}
          unread={chat.unread}
          onToggle={() => {
            if (open) chat.close();
            else chat.openFaq();
          }}
        />
      </div>
    </div>
  );
}
