import HeroSection from '@/components/home-page/Hero';
import CategoriesSection from '@/components/home-page/Categories';
import CertificateSection from '@/components/home-page/CertificateSection';
import FAQSection from '@/components/home-page/FaqSection';

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
