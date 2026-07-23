'use client';

import { create } from 'zustand';
import type { AuthTokens, AuthUser } from '@/lib/types';

const ACCESS_KEY = 'nokhostin.access';
const REFRESH_KEY = 'nokhostin.refresh';

export function readAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

export function readRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

function writeTokens(tokens: AuthTokens) {
  window.localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
}

function clearTokens() {
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => {
    set({ user });
  },
  setLoading: (loading) => {
    set({ loading });
  },
  setSession: (tokens, user) => {
    writeTokens(tokens);
    set({ user, loading: false });
  },
  clearSession: () => {
    clearTokens();
    set({ user: null });
  },
}));
