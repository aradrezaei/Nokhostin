const GUEST_KEY = 'nokhostin.support.guest';

function isValidGuestId(value: string): boolean {
  return /^[a-zA-Z0-9_-]{16,64}$/.test(value);
}

export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(GUEST_KEY);
    if (existing && isValidGuestId(existing)) return existing;
    const id = `g_${crypto.randomUUID().replaceAll('-', '')}`;
    window.localStorage.setItem(GUEST_KEY, id);
    return id;
  } catch {
    const fallback = `g_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
    return fallback.length >= 16 ? fallback : `${fallback}xxxxxxxxxx`.slice(0, 20);
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
    else window.sessionStorage.setItem(key, text.slice(0, 1000));
  } catch {
    /* ignore */
  }
}
