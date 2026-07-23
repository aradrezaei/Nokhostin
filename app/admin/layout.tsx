'use client';

import type { ReactNode } from 'react';
import {
  Building2,
  BookMarked,
  ClipboardList,
  GraduationCap,
  House,
  MessagesSquare,
  Newspaper,
  Users,
} from 'lucide-react';
import PanelLayout from '@/components/panel/PanelLayout';

const NAV = [
  { href: '/admin', label: 'خانه', tab: 'خانه', icon: <House className="h-5 w-5" strokeWidth={2.5} /> },
  {
    href: '/admin/support',
    label: 'پشتیبانی',
    tab: 'چت',
    icon: <MessagesSquare className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/classes',
    label: 'کلاس‌ها',
    tab: 'کلاس',
    icon: <GraduationCap className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/users',
    label: 'کاربران',
    tab: 'کاربر',
    icon: <Users className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/blog',
    label: 'وبلاگ',
    tab: 'وبلاگ',
    icon: <Newspaper className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/attendance-logs',
    label: 'لاگ حضور',
    icon: <ClipboardList className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/courses',
    label: 'دوره‌ها',
    icon: <BookMarked className="h-5 w-5" strokeWidth={2.5} />,
  },
  {
    href: '/admin/institutes',
    label: 'آموزشگاه',
    icon: <Building2 className="h-5 w-5" strokeWidth={2.5} />,
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PanelLayout brand="نخستین" allowedRoles={['super_admin']} navItems={NAV}>
      {children}
    </PanelLayout>
  );
}
