'use client';

import type { ReactNode } from 'react';
import { BookOpen, House, User } from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';
import PanelStatsChips from '@/components/panel/PanelStatsChips';

const NAV = [
  { href: '/dashboard', label: 'خانه', tab: 'خانه', icon: <House className="h-5 w-5" strokeWidth={2.5} /> },
  {
    href: '/dashboard/courses',
    label: 'کلاس‌ها',
    tab: 'کلاس‌ها',
    icon: <BookOpen className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/dashboard/profile',
    label: 'پروفایل',
    tab: 'پروفایل',
    icon: <User className="h-5 w-5" strokeWidth={2.5} />,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout brand="نخستین" allowedRoles={['student']} navItems={NAV} chips={<PanelStatsChips />}>
      {children}
    </PanelLayout>
  );
}
