const GUEST_KEY = 'nokhostin.support.guest';

export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(GUEST_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) return existing;
    const id = `g_${crypto.randomUUID().replaceAll('-', '')}`;
    window.localStorage.setItem(GUEST_KEY, id);
    return id;
  } catch {
    return `g_${Date.now().toString(36)}`;
  }
}

export function readDraft(conversationId: string): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.sessionStorage.getItem(`nokhostin.support.draft.${conversationId}`) ?? '';
  } catch {
    return '';
  }
}

export function writeDraft(conversationId: string, text: string) {
  if (typeof window === 'undefined') return;
  try {
    const key = `nokhostin.support.draft.${conversationId}`;
    if (!text) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, text);
  } catch {
    /* ignore */
  }
}
