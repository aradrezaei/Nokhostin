const DISMISS_KEY = 'nokhostin.vpnNotice.dismissed';
const TRACE_URL = 'https://cloudflare.com/cdn-cgi/trace';
const TIMEOUT_MS = 1800;

const IR_TIMEZONES = new Set(['Asia/Tehran', 'Iran']);

export function isVpnNoticeDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

export function dismissVpnNotice(): void {
  try {
    sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    /* ignore */
  }
}

function isIranTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return IR_TIMEZONES.has(tz);
  } catch {
    return false;
  }
}

/** Tiny text probe — Cloudflare edge country code. */
async function fetchEdgeCountry(signal: AbortSignal): Promise<string | null> {
  const res = await fetch(TRACE_URL, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'omit',
    signal,
  });
  if (!res.ok) return null;
  const text = await res.text();
  const match = /(?:^|\n)loc=([A-Z]{2})(?:\n|$)/.exec(text);
  return match?.[1] ?? null;
}

/**
 * Heuristic for Iranian users on VPN:
 * device timezone is Iran, but edge IP country is not IR.
 * Zero UI cost until resolved; aborts fast on slow networks.
 */
export async function detectLikelyVpn(signal?: AbortSignal): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
    return false;
  }

  if (!isIranTimezone()) return false;

  const controller = new AbortController();
  const onAbort = () => { controller.abort(); };
  signal?.addEventListener('abort', onAbort, { once: true });
  const timer = window.setTimeout(() => { controller.abort(); }, TIMEOUT_MS);

  try {
    const loc = await fetchEdgeCountry(controller.signal);
    if (!loc) return false;
    return loc !== 'IR';
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
