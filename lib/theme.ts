'use client';

/** Shared theme key — marketing navbar + panel must stay in sync. */
export const THEME_KEY = 'theme';

export function readIsDark(): boolean {
  if (typeof document === 'undefined') return false;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return document.documentElement.classList.contains('dark');
}

export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  window.dispatchEvent(new Event('nokhostin-theme'));
}
