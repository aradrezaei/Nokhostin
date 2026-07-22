import Link from 'next/link';
import type { Metadata } from 'next';
import { publicGet } from '@/lib/api';
import type { Paginated, PostSummary } from '@/lib/types';

export const metadata: Metadata = {
  title: 'وبلاگ آموزشی | مقالات برنامه‌نویسی، هوش مصنوعی و مهارت‌آموزی',
  description:
    'مقالات آموزشی آموزشگاه نخستین در اندیشه: برنامه‌نویسی، هوش مصنوعی، حسابداری، رباتیک و مهارت‌های فنی و حرفه‌ای.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'وبلاگ آموزشگاه نخستین',
    description: 'جدیدترین مقالات آموزشی و مهارت‌محور',
    type: 'website',
  },
};

async function getPosts(): Promise<Paginated<PostSummary>> {
  try {
    return await publicGet<Paginated<PostSummary>>('/blog/posts?pageSize=24', 60);
  } catch {
    return { items: [], pagination: { page: 1, pageSize: 24, total: 0 } };
  }
}

function formatDate(value: string | null): string {
  if (!value) return '';
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(new Date(value));
}

export default async function BlogListPage() {
  const { items } = await getPosts();

  return (
    <section dir="rtl" className="min-h-screen bg-[#fcfbff] dark:bg-[#131f24]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full border border-[rgba(124,58,237,0.18)] bg-[rgba(124,58,237,0.05)] px-4 py-1.5 text-xs font-bold text-[#4c1d95] dark:border-[rgba(167,139,250,0.28)] dark:bg-[rgba(124,58,237,0.14)] dark:text-[#ddd6fe]">
            وبلاگ آموزشگاه نخستین
          </span>
          <h1 className="mt-5 text-3xl font-black leading-[1.3] text-[#211441] sm:text-4xl dark:text-[#f5f3ff]">
            مقالات و یادداشت‌های آموزشی
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#665f7d] dark:text-[#a99fc4]">
            مقالات تخصصی و کاربردی در حوزه برنامه‌نویسی، هوش مصنوعی و مهارت‌های فنی و حرفه‌ای.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[rgba(124,58,237,0.18)] bg-[rgba(124,58,237,0.05)] py-20 text-center dark:border-[rgba(167,139,250,0.28)]">
            <p className="text-base text-[#665f7d] dark:text-[#a99fc4]">
              هنوز مقاله‌ای منتشر نشده است.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(124,58,237,0.18)] border-b-4 bg-white dark:border-[rgba(167,139,250,0.28)] dark:bg-[#0f1a1e]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover.url}
                      alt={post.cover.alt}
                      width={post.cover.width}
                      height={post.cover.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {post.category && (
                    <span className="mb-2 inline-flex w-fit rounded-full border border-[rgba(124,58,237,0.18)] bg-[rgba(124,58,237,0.05)] px-2.5 py-0.5 text-xs font-bold text-[#4c1d95] dark:border-[rgba(167,139,250,0.28)] dark:text-[#ddd6fe]">
                      {post.category.name}
                    </span>
                  )}
                  <h2 className="text-lg font-black leading-7 text-[#211441] dark:text-[#f5f3ff]">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#665f7d] dark:text-[#a99fc4]">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[rgba(124,58,237,0.18)] pt-3 text-xs text-[#9088a6] dark:border-[rgba(167,139,250,0.28)] dark:text-[#6c6389]">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTimeMinutes} دقیقه مطالعه</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
