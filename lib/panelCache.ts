/** Tiny memory + sessionStorage cache for snappy panel navigations. */

interface Entry<T> {
  at: number;
  data: T;
}

export function createPanelCache<T>(storageKey: string, ttlMs: number) {
  let memory: Entry<T> | null = null;

  const readStorage = (): Entry<T> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) {
        return null;
      }
      const entry = parsed as Entry<T>;
      if (typeof entry.at !== 'number') {
        return null;
      }
      return entry;
    } catch {
      return null;
    }
  };

  const writeStorage = (entry: Entry<T>) => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(entry));
    } catch {
      /* quota / private mode — memory cache still works */
    }
  };

  return {
    ttlMs,
    peek(): Entry<T> | null {
      if (memory) return memory;
      memory = readStorage();
      return memory;
    },
    getFresh(): T | null {
      const entry = this.peek();
      if (!entry) return null;
      if (Date.now() - entry.at >= ttlMs) return null;
      return entry.data;
    },
    /** Stale-ok: returns last known data even past TTL (for instant paint). */
    getStale(): T | null {
      return this.peek()?.data ?? null;
    },
    set(data: T) {
      memory = { at: Date.now(), data };
      writeStorage(memory);
    },
    clear() {
      memory = null;
      if (typeof window === 'undefined') return;
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    },
  };
}
