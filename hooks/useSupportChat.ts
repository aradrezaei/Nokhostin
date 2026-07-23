'use client';

import { useEffect, useRef, useState } from 'react';
import {
  fetchMyConversation,
  openConversation,
  pollMessages,
  sendUserMessage,
} from '@/lib/chat/api';
import { getOrCreateGuestId, readDraft, writeDraft } from '@/lib/chat/storage';
import type { SupportConversation, SupportMessage } from '@/lib/chat/types';

export type ChatView = 'closed' | 'faq' | 'live';

const ACTIVE_MS = 3500;
const HIDDEN_MS = 12_000;

export function useSupportChat() {
  const [view, setView] = useState<ChatView>('closed');
  const [conversation, setConversation] = useState<SupportConversation | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingLive, setLoadingLive] = useState(false);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(0);

  const guestIdRef = useRef('');
  const messagesRef = useRef<SupportMessage[]>([]);
  const lastAgentIdRef = useRef<string | null>(null);
  const conversationIdRef = useRef<string | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    conversationIdRef.current = conversation?.id ?? null;
  }, [conversation?.id]);

  useEffect(() => {
    guestIdRef.current = getOrCreateGuestId();
  }, []);

  function openFaq() {
    setView('faq');
    setError('');
    setUnread(0);
  }

  function close() {
    setView('closed');
    setError('');
  }

  function backToFaq() {
    setView('faq');
    setError('');
  }

  async function startLive() {
    setLoadingLive(true);
    setError('');
    setView('live');
    try {
      const guestId = guestIdRef.current || getOrCreateGuestId();
      guestIdRef.current = guestId;
      let bundle = await fetchMyConversation(guestId);
      if (!bundle.conversation) {
        bundle = await openConversation(guestId);
      }
      setConversation(bundle.conversation);
      setMessages(bundle.messages);
      if (bundle.conversation) {
        setDraft(readDraft(bundle.conversation.id));
      }
      const lastAgent = [...bundle.messages].reverse().find((m) => m.sender === 'agent');
      lastAgentIdRef.current = lastAgent?.id ?? null;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ارتباط با پشتیبانی برقرار نشد.');
    } finally {
      setLoadingLive(false);
    }
  }

  useEffect(() => {
    if (view !== 'live') {
      return;
    }
    const id = conversationIdRef.current;
    if (!id) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const gate = { id: 0 };
    const mySession = ++gate.id;

    const tick = async () => {
      try {
        const after = messagesRef.current[messagesRef.current.length - 1]?.id;
        const guestId = guestIdRef.current || getOrCreateGuestId();
        const res = await pollMessages(id, guestId, after);
        if (mySession !== gate.id) {
          return;
        }

        setConversation(res.conversation);
        if (res.messages.length > 0) {
          const freshAgents = res.messages.filter((m) => m.sender === 'agent');
          const newest = freshAgents.at(-1);
          if (newest && newest.id !== lastAgentIdRef.current) {
            lastAgentIdRef.current = newest.id;
            if (document.hidden) {
              setUnread((u) => u + freshAgents.length);
            }
          }
          setMessages((prev) => {
            const map = new Map<string, SupportMessage>();
            for (const m of prev) {
              map.set(m.id, m);
            }
            for (const m of res.messages) {
              map.set(m.id, m);
            }
            return Array.from(map.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          });
        }
      } catch {
        /* quiet poll failures */
      } finally {
        if (mySession === gate.id) {
          const ms = document.hidden ? HIDDEN_MS : ACTIVE_MS;
          timer = setTimeout(() => {
            void tick();
          }, ms);
        }
      }
    };

    const onVis = () => {
      if (!document.hidden) {
        setUnread(0);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    void tick();

    return () => {
      gate.id += 1;
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [view, conversation?.id]);

  function updateDraft(text: string) {
    setDraft(text);
    const id = conversationIdRef.current;
    if (id) {
      writeDraft(id, text);
    }
  }

  async function send() {
    const body = draft.trim();
    const conversationId = conversationIdRef.current;
    if (!body || !conversationId || sending) {
      return;
    }
    setSending(true);
    setError('');
    const optimisticId = `tmp_${Date.now()}`;
    const optimistic: SupportMessage = {
      id: optimisticId,
      conversationId,
      sender: 'user',
      body,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft('');
    writeDraft(conversationId, '');
    try {
      const guestId = guestIdRef.current || getOrCreateGuestId();
      const saved = await sendUserMessage(conversationId, guestId, body);
      setMessages((prev) => {
        const withoutTmp = prev.filter((m) => m.id !== optimisticId);
        if (withoutTmp.some((m) => m.id === saved.id)) {
          return withoutTmp;
        }
        return [...withoutTmp, saved];
      });
      setConversation((c) =>
        c
          ? {
              ...c,
              preview: saved.body.slice(0, 180),
              lastMessageAt: saved.createdAt,
            }
          : c,
      );
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setDraft(body);
      setError(e instanceof Error ? e.message : 'ارسال ناموفق بود.');
    } finally {
      setSending(false);
    }
  }

  return {
    view,
    conversation,
    messages,
    draft,
    sending,
    loadingLive,
    error,
    unread,
    openFaq,
    close,
    startLive,
    backToFaq,
    updateDraft,
    send,
  };
}
