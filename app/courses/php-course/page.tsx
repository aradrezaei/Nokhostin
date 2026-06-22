import HeroSection from '@/components/test';
import MinimalCourseLanding from '@/components/mini';
export default function MainCoursePage() {
  return (
    <div className="bg-[#0B1120] min-h-screen">
      {/* 1. اول هیرو لود می‌شود */}
      <HeroSection />

      {/* 2. سپس بدنه اصلی و سایدبار استیکی */}
      <MinimalCourseLanding />
    </div>
  );
}
