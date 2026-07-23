import { API_BASE, parseResult } from '@/lib/api';
import type {
  AdminConversationList,
  ConversationBundle,
  SupportConversation,
  SupportMessage,
} from './types';

type RequestFn = <T>(path: string, init?: RequestInit) => Promise<T>;

async function publicFetch<T>(path: string, init?: RequestInit, token?: string | null): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('accept', 'application/json');
  if (init?.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  return await parseResult<T>(res);
}

function readAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage.getItem('nokhostin.access');
  } catch {
    return null;
  }
}

export async function openConversation(guestId: string): Promise<ConversationBundle> {
  return await publicFetch(
    '/support/conversations',
    { method: 'POST', body: JSON.stringify({ guestId }) },
    readAccessToken(),
  );
}

export async function fetchMyConversation(guestId: string): Promise<ConversationBundle> {
  const q = new URLSearchParams({ guestId });
  return await publicFetch(`/support/conversations/me?${q}`, undefined, readAccessToken());
}

export async function pollMessages(
  conversationId: string,
  guestId: string,
  after?: string,
): Promise<{ conversation: SupportConversation; messages: SupportMessage[] }> {
  const q = new URLSearchParams({ guestId, limit: '50' });
  if (after) {
    q.set('after', after);
  }
  return await publicFetch(
    `/support/conversations/${conversationId}/messages?${q}`,
    undefined,
    readAccessToken(),
  );
}

export async function sendUserMessage(
  conversationId: string,
  guestId: string,
  body: string,
): Promise<SupportMessage> {
  return await publicFetch(
    `/support/conversations/${conversationId}/messages`,
    { method: 'POST', body: JSON.stringify({ body, guestId }) },
    readAccessToken(),
  );
}

export function adminListConversations(
  request: RequestFn,
  status: 'open' | 'closed' | 'all' = 'open',
) {
  return request<AdminConversationList>(
    `/admin/support/conversations?status=${status}&pageSize=30`,
  );
}

export function adminGetConversation(request: RequestFn, id: string) {
  return request<ConversationBundle & { conversation: SupportConversation }>(
    `/admin/support/conversations/${id}`,
  );
}

export function adminPollMessages(request: RequestFn, id: string, after?: string) {
  const q = new URLSearchParams({ limit: '50' });
  if (after) {
    q.set('after', after);
  }
  return request<{ conversation: SupportConversation; messages: SupportMessage[] }>(
    `/admin/support/conversations/${id}/messages?${q}`,
  );
}

export function adminSendMessage(request: RequestFn, id: string, body: string) {
  return request<SupportMessage>(`/admin/support/conversations/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
}

export function adminPatchConversation(request: RequestFn, id: string, status: 'open' | 'closed') {
  return request<SupportConversation>(`/admin/support/conversations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
