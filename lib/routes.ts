/** Routes that belong to the authenticated app shell (not the marketing site). */
export const APP_ROUTE_PREFIXES = ['/auth', '/dashboard', '/admin', '/mentor'] as const;

export function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isPanelRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/mentor' ||
    pathname.startsWith('/mentor/')
  );
}
