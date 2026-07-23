import HeroSection from '@/components/home/Hero';
import CategoriesSection from '@/components/home/Categories';
import CertificateSection from '@/components/home/CertificateSection';
import FAQSection from '@/components/marketing/FaqSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <CertificateSection />
      <FAQSection />
    </>
  );
}
