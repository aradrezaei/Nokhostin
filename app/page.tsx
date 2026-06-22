'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Phone,
  Play,
  Star,
  Users,
  Trophy,
  Award,
  Target,
  Rocket,
  CheckCircle,
  BookOpen,
  Code,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Clock,
  Shield,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
// import Categories from "@/components/home-page/Categories";
import WhyChooseUs from '@/components/home-page/WhyChooseUs';
import HeroSection from '@/components/home-page/Hero';
import CategoriesSection from '@/components/home-page/Categories';
import CourseSlider from '@/components/home-page/CourseSlider';
const CertificateSection = dynamic(() => import('@/components/home-page/CertificateSection'), {
  ssr: true,
});
import TestimonialsSlider from '@/components/home-page/Testimonialsslider';
import FAQSection from '@/components/home-page/FaqSection';
import EbookSlider from '@/components/home-page/EbookSlider';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldDark);
    if (shouldDark) document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    document.querySelectorAll('.animate-fade-up').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, i * 150);
    });
  }, []);

  // Counter Animation
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const targetAttr = counter.getAttribute('data-target');
      if (!targetAttr) return;

      const target = parseInt(targetAttr);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString('fa-IR');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('fa-IR');
        }
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.disconnect();
        }
      });

      observer.observe(counter);
    });
  }, []);

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <CourseSlider />
      {/* <EbookSlider /> */}
      <CertificateSection />
      {/* <TestimonialsSlider /> */}
      <FAQSection />
    </>
  );
}
