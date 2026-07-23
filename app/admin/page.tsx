'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  BookMarked,
  Building2,
  ClipboardList,
  GraduationCap,
  Newspaper,
  UserCog,
  Users,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { Paginated } from '@/lib/types';
import { toFa } from '@/lib/format';

interface Stats {
  users: number;
  students: number;
  mentors: number;
  classes: number;
  courses: number;
  published: number;
}

const SHORTCUTS = [
  { href: '/admin/attendance-logs', title: 'لاگ حضور', icon: ClipboardList },
  { href: '/admin/classes', title: 'کلاس‌ها', icon: GraduationCap },
  { href: '/admin/courses', title: 'دوره‌ها', icon: BookMarked },
  { href: '/admin/users', title: 'کاربران', icon: Users },
  { href: '/admin/blog', title: 'وبلاگ', icon: Newspaper },
  { href: '/admin/institutes', title: 'آموزشگاه', icon: Building2 },
] as const;

export default function AdminDashboard() {
  const { request } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['admin', 'stats'],
    staleTime: 60_000,
    queryFn: async (): Promise<Stats> => {
      const total = (path: string) =>
        request<Paginated<unknown>>(path).then((r) => r.pagination.total);
      const [users, students, mentors, classes, courses, published] = await Promise.all([
        total('/users?pageSize=1'),
        total('/users?role=student&pageSize=1'),
        total('/users?role=mentor&pageSize=1'),
        total('/classes?pageSize=1'),
        total('/admin/courses?pageSize=1'),
        total('/admin/blog/posts?status=published&pageSize=1'),
      ]);
      return { users, students, mentors, classes, courses, published };
    },
  });

  const tiles = [
    { label: 'کاربران', value: stats?.users, icon: Users },
    { label: 'هنرجو', value: stats?.students, icon: GraduationCap },
    { label: 'استاد', value: stats?.mentors, icon: UserCog },
    { label: 'کلاس', value: stats?.classes, icon: Building2 },
    { label: 'دوره', value: stats?.courses, icon: BookMarked },
    { label: 'پست', value: stats?.published, icon: Newspaper },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-[var(--p-ink)]">مدیریت</h1>
        <p className="mt-1 text-sm font-bold text-[var(--p-muted)]">آمار و میان‌برها</p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="panel-card px-3 py-4">
              <Icon className="h-5 w-5 text-[var(--p-accent)]" strokeWidth={2.25} />
              <p className="mt-3 text-2xl font-extrabold text-[var(--p-ink)]">
                {t.value == null ? '—' : toFa(t.value)}
              </p>
              <p className="mt-0.5 text-[11px] font-extrabold text-[var(--p-muted)]">{t.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SHORTCUTS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className="panel-card flex items-center gap-3 !p-4 hover:border-[var(--p-accent)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--p-accent)] text-white">
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="text-sm font-extrabold text-[var(--p-ink)]">{s.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
