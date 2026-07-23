'use client';

import { create } from 'zustand';
import type { AuthTokens, AuthUser } from '@/lib/types';

const ACCESS_KEY = 'nokhostin.access';
const REFRESH_KEY = 'nokhostin.refresh';
const USER_KEY = 'nokhostin.user';

export function readAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

export function readRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

export function readCachedUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function writeTokens(tokens: AuthTokens) {
  window.localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
}

function writeUser(user: AuthUser) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearTokens() {
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
  window.localStorage.removeItem(USER_KEY);
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
    if (user) writeUser(user);
    set({ user });
  },
  setLoading: (loading) => {
    set({ loading });
  },
  setSession: (tokens, user) => {
    writeTokens(tokens);
    writeUser(user);
    set({ user, loading: false });
  },
  clearSession: () => {
    clearTokens();
    set({ user: null, loading: false });
  },
}));
