'use client';

import type { ReactNode } from 'react';
import { BookOpen, LayoutDashboard, User } from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';

const NAV = [
  { href: '/dashboard', label: 'داشبورد', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/dashboard/courses', label: 'کلاس‌های من', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/dashboard/profile', label: 'پروفایل', icon: <User className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout
      title="پنل هنرجو"
      subtitle="آموزشگاه نخستین"
      allowedRoles={['student']}
      navItems={NAV}
    >
      {children}
    </PanelLayout>
  );
}
