'use client';

import Link from 'next/link';
import React from 'react';

interface CTAButton {
  label: string;
  href: string;
}

interface CTAProps {
  title: React.ReactNode;
  description: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
}

export function CTA({ title, description, primaryButton, secondaryButton }: CTAProps) {
  return (
    <section className="py-16 max-w-screen-xl mx-auto px-6" dir="rtl">
      <div className="w-full bg-[#f8fafb] dark:bg-[#17242a] border-b-4 border-[#d9e4e8] dark:border-[#2b3b42] rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-between gap-8 relative overflow-hidden">
        
        {/* پترن نقطه‌ای فلت و ارگانیک برای بک‌گراند پرمیوم */}
        <div className="absolute inset-0 bg-[radial-gradient(#d9e4e8_1px,transparent_1px)] dark:bg-[radial-gradient(#2b3b42_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* بخش متون */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-4">
          <h2 className="text-2xl md:text-4xl font-black text-[#10242a] dark:text-[#edf3f5] leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-[#61727a] dark:text-[#93a5ac] leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* دکمه‌های اکشن کالیبره شده با تم زنده Violet */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          {/* دکمه اصلی */}
          <Link
            href={primaryButton.href}
            className="w-full sm:w-auto text-center px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-sm transition-all duration-200 border-b-2 border-violet-800"
          >
            {primaryButton.label}
          </Link>

          {/* دکمه ثانویه (اختیاری) */}
          {secondaryButton && (
            <Link
              href={secondaryButton.href}
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-white dark:bg-[#1e2d33] hover:bg-gray-50 dark:hover:bg-[#23353c] text-[#10242a] dark:text-[#edf3f5] font-bold rounded-xl text-sm border border-[#d9e4e8] dark:border-[#2b3b42] border-b-4 transition-all duration-200"
            >
              {secondaryButton.label}
            </Link>
          )}
          
        </div>
      </div>
    </section>
  );
}