'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { isAppRoute } from '@/lib/routes';

/** Marketing chrome only — panel/auth run inside their own shells. */
export function NavGate() {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <Navbar />;
}

export function FooterGate() {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <Footer />;
}
