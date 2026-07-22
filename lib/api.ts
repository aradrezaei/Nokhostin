export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Prefer first Zod/field detail when present — surfaces real blog validation bugs. */
export function formatApiError(error: unknown, fallback: string): string {
  if (!(error instanceof ApiError)) return fallback;
  if (Array.isArray(error.details) && error.details.length > 0) {
    const messages = error.details
      .map((d) => {
        if (typeof d === 'string') return d;
        if (d && typeof d === 'object' && 'message' in d) {
          return String((d as { message: unknown }).message);
        }
        return '';
      })
      .filter(Boolean);
    if (messages.length) return messages.slice(0, 3).join(' · ');
  }
  return error.message || fallback;
}

export async function parseResult<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => null)) as ApiResult<T> | null;

  if (!body) {
    throw new ApiError('NETWORK', 'ارتباط با سرور برقرار نشد.', res.status);
  }
  if (!body.success) {
    throw new ApiError(body.error.code, body.error.message, res.status, body.error.details);
  }
  return body.data;
}

export async function publicGet<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate },
    headers: { accept: 'application/json' },
  });
  return parseResult<T>(res);
}
