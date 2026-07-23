'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MessagesSquare } from 'lucide-react';
import {
  adminGetConversation,
  adminListConversations,
  adminPatchConversation,
  adminPollMessages,
  adminSendMessage,
} from '@/lib/chat/api';
import type { SupportConversation, SupportMessage } from '@/lib/chat/types';
import { useAuth } from '@/lib/auth';
import { Alert, Badge, Button, Card, Textarea } from '@/components/panel/ui';
import { EmptyState, DeferredSpinner } from '@/components/panel/widgets';
import LiveThread from '@/components/chat/LiveThread';
import { scheduleEffect } from '@/lib/scheduleEffect';

type StatusFilter = 'open' | 'closed' | 'all';

export default function AdminSupportPage() {
  const { request } = useAuth();
  const [filter, setFilter] = useState<StatusFilter>('open');
  const [items, setItems] = useState<SupportConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<SupportConversation | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [loadingList, setLoadingList] = useState(true);
  const [loadingThread, setLoadingThread] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const afterRef = useRef<string | undefined>(undefined);

  const loadList = useCallback(async () => {
    setError('');
    try {
      const data = await adminListConversations(request, filter);
      setItems(data.items);
      setSelectedId((prev) => {
        if (prev && data.items.some((i) => i.id === prev)) return prev;
        return data.items[0]?.id ?? null;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا در دریافت گفتگوها.');
    } finally {
      setLoadingList(false);
    }
  }, [request, filter]);

  useEffect(() => scheduleEffect(() => loadList()), [loadList]);

  const loadThread = useCallback(
    async (id: string) => {
      setLoadingThread(true);
      setError('');
      try {
        const data = await adminGetConversation(request, id);
        setConversation(data.conversation);
        setMessages(data.messages);
        afterRef.current = data.messages[data.messages.length - 1]?.id;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'خطا در دریافت پیام‌ها.');
      } finally {
        setLoadingThread(false);
      }
    },
    [request],
  );

  useEffect(() => {
    if (!selectedId) {
      return scheduleEffect(() => {
        setConversation(null);
        setMessages([]);
      });
    }
    return scheduleEffect(() => {
      void loadThread(selectedId);
    });
  }, [selectedId, loadThread]);

  // Poll selected thread
  useEffect(() => {
    if (!selectedId) {
      return;
    }
    const gate = { id: 0 };
    const mySession = ++gate.id;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      try {
        const res = await adminPollMessages(request, selectedId, afterRef.current);
        if (mySession !== gate.id) {
          return;
        }
        if (res.messages.length > 0) {
          setMessages((prev) => {
            const map = new Map(prev.map((m) => [m.id, m] as const));
            for (const m of res.messages) {
              map.set(m.id, m);
            }
            return Array.from(map.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          });
          const last = res.messages.at(-1);
          if (last) {
            afterRef.current = last.id;
          }
        }
        setConversation(res.conversation);
      } catch {
        /* ignore poll errors */
      } finally {
        if (mySession === gate.id) {
          timer = setTimeout(() => {
            void tick();
          }, document.hidden ? 10_000 : 2500);
        }
      }
    };

    void tick();
    return () => {
      gate.id += 1;
      clearTimeout(timer);
    };
  }, [selectedId, request]);

  const send = async () => {
    if (!selectedId || !draft.trim() || sending) return;
    setSending(true);
    setError('');
    try {
      const saved = await adminSendMessage(request, selectedId, draft.trim());
      setMessages((prev) => (prev.some((m) => m.id === saved.id) ? prev : [...prev, saved]));
      afterRef.current = saved.id;
      setDraft('');
      void loadList();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ارسال ناموفق بود.');
    } finally {
      setSending(false);
    }
  };

  const toggleStatus = async () => {
    if (!conversation) return;
    const next = conversation.status === 'open' ? 'closed' : 'open';
    try {
      const updated = await adminPatchConversation(request, conversation.id, next);
      setConversation({ ...conversation, ...updated });
      void loadList();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'تغییر وضعیت ناموفق بود.');
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-wrap items-center gap-2">
        {(['open', 'closed', 'all'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setLoadingList(true);
              setFilter(s);
            }}
            className={`rounded-2xl px-3 py-2 text-xs font-black ${
              filter === s
                ? 'border-2 border-[#5b21b6] border-b-4 bg-[#7c3aed] text-white'
                : 'border-2 border-slate-200 border-b-4 bg-white text-slate-600 dark:border-slate-700 dark:bg-[#131f24]'
            }`}
          >
            {s === 'open' ? 'باز' : s === 'closed' ? 'بسته‌شده' : 'همه'}
          </button>
        ))}
      </div>

      {error && <Alert tone="error">{error}</Alert>}

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="!p-0 overflow-hidden">
          <div className="border-b-2 border-slate-200 px-3 py-2.5 text-xs font-black dark:border-slate-700">
            گفتگوها
          </div>
          {loadingList ? (
            <div className="p-6">
              <DeferredSpinner active />
            </div>
          ) : items.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={<MessagesSquare className="h-5 w-5" />}
                title="گفتگویی نیست"
                hint="وقتی کاربر از ویجت سایت پیام بفرستد، اینجا می‌آید."
              />
            </div>
          ) : (
            <ul className="max-h-[70vh] overflow-y-auto">
              {items.map((item) => {
                const active = item.id === selectedId;
                const title = item.user?.fullName ?? (item.guestId ? 'مهمان' : 'کاربر');
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(item.id);
                      }}
                      className={`flex w-full flex-col gap-1 border-b border-slate-100 px-3 py-3 text-right dark:border-slate-800 ${
                        active ? 'bg-violet-50 dark:bg-violet-950/30' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-black text-slate-900 dark:text-white">
                          {title}
                        </span>
                        <Badge tone={item.status === 'open' ? 'green' : 'gray'}>
                          {item.status === 'open' ? 'باز' : 'بسته'}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-[11px] font-bold text-slate-500">
                        {item.preview ?? '—'}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="!p-0 flex min-h-[420px] flex-col overflow-hidden">
          {!selectedId ? (
            <div className="flex flex-1 items-center justify-center p-8">
              <p className="text-sm font-bold text-slate-400">یک گفتگو را انتخاب کن</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-slate-200 px-4 py-3 dark:border-slate-700">
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {conversation?.user?.fullName ??
                      (conversation?.guestId ? `مهمان · ${conversation.guestId.slice(0, 10)}` : 'گفتگو')}
                  </p>
                  {conversation?.user?.mobile && (
                    <p className="text-[11px] font-bold text-slate-400" dir="ltr">
                      {conversation.user.mobile}
                    </p>
                  )}
                </div>
                <Button variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => { void toggleStatus(); }}>
                  {conversation?.status === 'open' ? 'بستن گفتگو' : 'باز کردن دوباره'}
                </Button>
              </div>

              <LiveThread messages={messages} loading={loadingThread} />

              <div className="space-y-2 border-t-2 border-slate-200 p-3 dark:border-slate-700">
                <Textarea
                  rows={3}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value.slice(0, 2000));
                  }}
                  placeholder="پاسخ پشتیبانی…"
                />
                <div className="flex justify-end">
                  <Button disabled={sending || !draft.trim()} onClick={() => { void send(); }}>
                    ارسال پاسخ
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
