import { API_BASE } from './api';

const ACCESS_KEY = 'nokhostin.access';
const REFRESH_KEY = 'nokhostin.refresh';

/**
 * Downloads a binary endpoint (e.g. Excel export) with auth + one refresh retry.
 * Returns the suggested filename from Content-Disposition when present.
 */
export async function downloadAuthed(path: string, fallbackName: string): Promise<void> {
  const build = (token: string | null) =>
    fetch(`${API_BASE}${path}`, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });

  let token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_KEY) : null;
  let res = await build(token);

  if (res.status === 401) {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (refreshToken) {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (refreshRes.ok) {
        const body = (await refreshRes.json()) as {
          success: boolean;
          data?: { accessToken: string; refreshToken: string };
        };
        if (body.success && body.data) {
          localStorage.setItem(ACCESS_KEY, body.data.accessToken);
          localStorage.setItem(REFRESH_KEY, body.data.refreshToken);
          token = body.data.accessToken;
          res = await build(token);
        }
      }
    }
  }

  if (!res.ok) throw new Error('دانلود فایل ناموفق بود.');

  const blob = await res.blob();
  const disposition = res.headers.get('content-disposition') ?? '';
  const match = /filename="?([^";]+)"?/i.exec(disposition);
  const name = match?.[1] ?? fallbackName;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
