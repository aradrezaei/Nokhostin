'use client';

import { useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';
import { API_BASE, ApiError, parseResult } from './api';
import {
  readAccessToken,
  readRefreshToken,
  useAuthStore,
} from '@/stores/auth-store';
import type { AuthTokens, AuthUser } from './types';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
}

async function tryRefresh(): Promise<string | null> {
  const refreshToken = readRefreshToken();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await parseResult<{ accessToken: string; refreshToken: string }>(res);
    window.localStorage.setItem('nokhostin.access', data.accessToken);
    window.localStorage.setItem('nokhostin.refresh', data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const buildHeaders = (token: string | null): Headers => {
    const headers = new Headers();
    if (!isForm) {
      headers.set('content-type', 'application/json');
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (init.headers) {
      new Headers(init.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }
    return headers;
  };

  let token = readAccessToken();
  let res = await fetch(`${API_BASE}${path}`, { ...init, headers: buildHeaders(token) });

  if (res.status === 401) {
    token = await tryRefresh();
    if (token) {
      res = await fetch(`${API_BASE}${path}`, { ...init, headers: buildHeaders(token) });
    } else {
      useAuthStore.getState().clearSession();
    }
  }
  return await parseResult<T>(res);
}

/** Bootstraps session from storage into the Zustand auth store. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const clearSession = useAuthStore((s) => s.clearSession);

  const refreshUser = useCallback(async () => {
    try {
      const me = await apiRequest<AuthUser>('/auth/me');
      setUser(me);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
      }
    }
  }, [setUser, clearSession]);

  useEffect(
    () =>
      scheduleEffect(async () => {
        if (!readAccessToken()) {
          setLoading(false);
          return;
        }
        try {
          await refreshUser();
        } finally {
          setLoading(false);
        }
      }),
    [refreshUser, setLoading],
  );

  return children;
}

export function useAuth(): AuthContextValue {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  const refreshUser = useCallback(async () => {
    try {
      const me = await apiRequest<AuthUser>('/auth/me');
      useAuthStore.getState().setUser(me);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
      }
    }
  }, [clearSession]);

  const logout = useCallback(async () => {
    const refreshToken = readRefreshToken();
    if (refreshToken) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => undefined);
    }
    clearSession();
  }, [clearSession]);

  const request = useCallback(
    <T,>(path: string, init?: RequestInit) => apiRequest<T>(path, init),
    [],
  );

  return useMemo(
    () => ({ user, loading, setSession, logout, refreshUser, request }),
    [user, loading, setSession, logout, refreshUser, request],
  );
}
