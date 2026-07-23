'use client';

import type { ReactNode } from 'react';
import { GraduationCap, House } from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';

const NAV = [
  { href: '/mentor', label: 'خانه', tab: 'خانه', icon: <House className="h-5 w-5" strokeWidth={2.5} /> },
  {
    href: '/mentor/classes',
    label: 'کلاس‌ها',
    tab: 'کلاس‌ها',
    icon: <GraduationCap className="h-5 w-5" strokeWidth={2.5} />,
  },
];

export default function MentorLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout brand="نخستین" allowedRoles={['mentor']} navItems={NAV}>
      {children}
    </PanelLayout>
  );
}
