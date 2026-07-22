'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BookMarked, Building2, GraduationCap, Newspaper, UserCog, Users } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { Paginated } from '@/lib/types';
import { toFa } from '@/lib/format';
import { Card } from '@/components/panel/ui';
import { StatTile } from '@/components/panel/widgets';

interface Stats {
  users: number;
  students: number;
  mentors: number;
  classes: number;
  courses: number;
  published: number;
}

export default function AdminDashboard() {
  const { request } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  const load = useCallback(async () => {
    const total = (path: string) =>
      request<Paginated<unknown>>(path).then((r) => r.pagination.total);
    try {
      const [users, students, mentors, classes, courses, published] = await Promise.all([
        total('/users?pageSize=1'),
        total('/users?role=student&pageSize=1'),
        total('/users?role=mentor&pageSize=1'),
        total('/classes?pageSize=1'),
        total('/admin/courses?pageSize=1'),
        total('/admin/blog/posts?status=published&pageSize=1'),
      ]);
      setStats({ users, students, mentors, classes, courses, published });
    } catch {
      setStats({
        users: 0,
        students: 0,
        mentors: 0,
        classes: 0,
        courses: 0,
        published: 0,
      });
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  const shortcuts = [
    {
      href: '/admin/classes',
      title: 'کلاس‌ها',
      desc: 'ساخت کلاس، هنرجو، شهریه و خروجی اکسل',
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      href: '/admin/courses',
      title: 'دوره‌ها',
      desc: 'کاتالوگ کتاب و سطح آموزشی',
      icon: <BookMarked className="h-6 w-6" />,
    },
    {
      href: '/admin/users',
      title: 'کاربران',
      desc: 'ثبت استاد و هنرجو',
      icon: <Users className="h-6 w-6" />,
    },
    {
      href: '/admin/blog',
      title: 'وبلاگ',
      desc: 'نوشتن و انتشار مقالات',
      icon: <Newspaper className="h-6 w-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">داشبورد مدیریت</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">نمای کلی آموزشگاه زبان</p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile
          icon={<Users className="h-5 w-5" />}
          label="کل کاربران"
          value={stats ? toFa(stats.users) : '—'}
        />
        <StatTile
          tone="emerald"
          icon={<GraduationCap className="h-5 w-5" />}
          label="هنرجویان"
          value={stats ? toFa(stats.students) : '—'}
        />
        <StatTile
          tone="amber"
          icon={<UserCog className="h-5 w-5" />}
          label="اساتید"
          value={stats ? toFa(stats.mentors) : '—'}
        />
        <StatTile
          tone="sky"
          icon={<Building2 className="h-5 w-5" />}
          label="کلاس‌ها"
          value={stats ? toFa(stats.classes) : '—'}
        />
        <StatTile
          icon={<BookMarked className="h-5 w-5" />}
          label="دوره‌ها"
          value={stats ? toFa(stats.courses) : '—'}
        />
        <StatTile
          tone="rose"
          icon={<Newspaper className="h-5 w-5" />}
          label="پست منتشر"
          value={stats ? toFa(stats.published) : '—'}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {shortcuts.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="!p-5 hover:border-[#7c3aed]/50">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c3aed] text-white">
                {s.icon}
              </span>
              <p className="mt-4 font-black text-slate-900 dark:text-white">{s.title}</p>
              <p className="mt-1 text-sm font-bold text-slate-400">{s.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
