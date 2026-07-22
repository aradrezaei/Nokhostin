'use client';

import type { ReactNode } from 'react';
import { GraduationCap, LayoutDashboard } from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';

const NAV = [
  { href: '/mentor', label: 'داشبورد', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/mentor/classes', label: 'کلاس‌های من', icon: <GraduationCap className="h-4 w-4" /> },
];

export default function MentorLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout title="پنل استاد" subtitle="آموزشگاه نخستین" allowedRoles={['mentor']} navItems={NAV}>
      {children}
    </PanelLayout>
  );
}
