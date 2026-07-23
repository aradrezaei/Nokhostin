'use client';

import ChatFab from './ChatFab';
import ChatHeader from './ChatHeader';
import Composer from './Composer';
import FaqStep from './FaqStep';
import LiveThread from './LiveThread';
import { useSupportChat } from '@/hooks/useSupportChat';

export default function ChatPanel() {
  const chat = useSupportChat();
  const open = chat.view !== 'closed';

  return (
    <>
      {/* FAB — bottom-right for RTL */}
      {!open && (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
          <div className="pointer-events-auto">
            <ChatFab unread={chat.unread} onOpen={chat.openFaq} />
          </div>
        </div>
      )}

      {open && (
        <div
          className="pointer-events-auto fixed inset-0 z-[70] flex flex-col overflow-hidden bg-[#fcfbff] dark:bg-[#131f24] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(600px,calc(100dvh-3rem))] sm:w-[min(100vw-2rem,400px)] sm:rounded-3xl sm:border-2 sm:border-slate-200 sm:border-b-4 sm:shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)] sm:dark:border-slate-700"
          role="dialog"
          aria-modal="true"
          aria-label="پشتیبانی نخستین"
          dir="rtl"
        >
          <ChatHeader
            showBack={chat.view === 'live'}
            onBack={chat.backToFaq}
            onClose={chat.close}
          />

          {chat.view === 'faq' && (
            <div className="min-h-0 flex-1">
              <FaqStep
                onTalkToHuman={() => {
                  void chat.startLive();
                }}
              />
            </div>
          )}

          {chat.view === 'live' && (
            <div className="flex min-h-0 flex-1 flex-col">
              <LiveThread messages={chat.messages} loading={chat.loadingLive} />
              {chat.error ? (
                <p className="bg-white px-3 py-1 text-[11px] font-bold text-rose-600 dark:bg-[#131f24]">
                  {chat.error}
                </p>
              ) : null}
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
    </>
  );
}
