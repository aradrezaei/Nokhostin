'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/** Only the auth modal page hides site chrome. Panels keep navbar + footer. */
const HIDDEN_PREFIXES = ['/auth'];

function isHidden(pathname: string | null): boolean {
  if (!pathname) return false;
  return HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function NavGate() {
  const pathname = usePathname();
  if (isHidden(pathname)) return null;
  return <Navbar />;
}

export function FooterGate() {
  const pathname = usePathname();
  if (isHidden(pathname)) return null;
  return <Footer />;
}
