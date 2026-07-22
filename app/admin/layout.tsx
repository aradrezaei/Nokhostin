'use client';

import type { ReactNode } from 'react';
import {
  Building2,
  BookMarked,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  Users,
} from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';

const NAV = [
  { href: '/admin', label: 'خانه', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/admin/classes', label: 'کلاس‌ها', icon: <GraduationCap className="h-4 w-4" /> },
  {
    href: '/admin/attendance-logs',
    label: 'لاگ حضور',
    icon: <ClipboardList className="h-4 w-4" />,
  },
  { href: '/admin/courses', label: 'دوره‌ها', icon: <BookMarked className="h-4 w-4" /> },
  { href: '/admin/institutes', label: 'آموزشگاه', icon: <Building2 className="h-4 w-4" /> },
  { href: '/admin/users', label: 'کاربران', icon: <Users className="h-4 w-4" /> },
  { href: '/admin/blog', label: 'وبلاگ', icon: <Newspaper className="h-4 w-4" /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout
      title="پنل مدیریت"
      subtitle="کلاس، کاربر، حضور و محتوا"
      allowedRoles={['super_admin']}
      navItems={NAV}
    >
      {children}
    </PanelLayout>
  );
}
