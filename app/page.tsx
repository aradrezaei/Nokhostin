'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { panelHome } from '@/lib/roles';
import HeroSection from '@/components/home/Hero';
import CategoriesSection from '@/components/home/Categories';
import CertificateSection from '@/components/home/CertificateSection';
import FAQSection from '@/components/marketing/FaqSection';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace(panelHome(user.role));
  }, [user, loading, router]);

  // Logged-in / still resolving auth → skip marketing paint entirely.
  if (loading || user) {
    return <div className="min-h-[100dvh] bg-[var(--nav-bg,#f8f7fb)]" aria-hidden />;
  }

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <CertificateSection />
      <FAQSection />
    </>
  );
}
