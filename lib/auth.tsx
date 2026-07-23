'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { scheduleEffect } from '@/lib/scheduleEffect';
import { API_BASE, ApiError, parseResult } from './api';
import type { AuthTokens, AuthUser } from './types';

const ACCESS_KEY = 'nokhostin.access';
const REFRESH_KEY = 'nokhostin.refresh';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  request: <T>(path: string, init?: RequestInit) => Promise<T>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readToken(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(key);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const clearTokens = useCallback(() => {
    window.localStorage.removeItem(ACCESS_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
  }, []);

  const setSession = useCallback((tokens: AuthTokens, nextUser: AuthUser) => {
    window.localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    setUser(nextUser);
  }, []);

  const tryRefresh = useCallback(async (): Promise<string | null> => {
    const refreshToken = readToken(REFRESH_KEY);
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await parseResult<{ accessToken: string; refreshToken: string }>(res);
      window.localStorage.setItem(ACCESS_KEY, data.accessToken);
      window.localStorage.setItem(REFRESH_KEY, data.refreshToken);
      return data.accessToken;
    } catch {
      return null;
    }
  }, []);

  const request = useCallback(
    async <T,>(path: string, init: RequestInit = {}): Promise<T> => {
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

      let token = readToken(ACCESS_KEY);
      let res = await fetch(`${API_BASE}${path}`, { ...init, headers: buildHeaders(token) });

      if (res.status === 401) {
        token = await tryRefresh();
        if (token) {
          res = await fetch(`${API_BASE}${path}`, { ...init, headers: buildHeaders(token) });
        }
      }
      return await parseResult<T>(res);
    },
    [tryRefresh],
  );

  const refreshUser = useCallback(async () => {
    try {
      const me = await request<AuthUser>('/auth/me');
      setUser(me);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearTokens();
        setUser(null);
      }
    }
  }, [request, clearTokens]);

  const logout = useCallback(async () => {
    const refreshToken = readToken(REFRESH_KEY);
    if (refreshToken) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => undefined);
    }
    clearTokens();
    setUser(null);
  }, [clearTokens]);

  useEffect(
    () =>
      scheduleEffect(async () => {
        if (!readToken(ACCESS_KEY)) {
          setLoading(false);
          return;
        }
        try {
          await refreshUser();
        } finally {
          setLoading(false);
        }
      }),
    [refreshUser],
  );

  const value = useMemo(
    () => ({ user, loading, setSession, logout, refreshUser, request }),
    [user, loading, setSession, logout, refreshUser, request],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
