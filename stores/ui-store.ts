'use client';

import { create } from 'zustand';

interface UiState {
  /** Transient toast / banner message for panel surfaces. */
  banner: string;
  setBanner: (message: string) => void;
  clearBanner: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  banner: '',
  setBanner: (message) => {
    set({ banner: message });
  },
  clearBanner: () => {
    set({ banner: '' });
  },
}));
