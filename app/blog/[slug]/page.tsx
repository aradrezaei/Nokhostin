import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { publicGet } from '@/lib/api';
import type { PostDetailResponse } from '@/lib/types';
import BlockRenderer from '@/components/blog/BlockRenderer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nokhostin.org';

async function getPost(slug: string): Promise<PostDetailResponse | null> {
  try {
    return await publicGet<PostDetailResponse>(`/blog/posts/${encodeURIComponent(slug)}`, 60);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) return { title: 'مقاله یافت نشد' };

  const { post } = data;
  const url = post.seo.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`;
  const image = post.seo.ogImage?.url ?? post.cover?.url;

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      type: 'article',
      url,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}

function formatDate(value: string | null): string {
  if (!value) return '';
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date(value));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPost(slug);
  if (!data) notFound();

  const { post, jsonLd, breadcrumb } = data;

  return (
    <article dir="rtl" className="post-academy min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="post-academy__breadcrumb mb-6 flex flex-wrap items-center gap-2 text-xs">
          <Link href="/" className="text-[var(--partner)]">
            خانه
          </Link>
          <span>/</span>
          <Link href="/blog" className="text-[var(--partner)]">
            وبلاگ
          </Link>
          {post.category && (
            <>
              <span>/</span>
              <span>{post.category.name}</span>
            </>
          )}
        </nav>

        <header className="mb-8">
          {post.category && (
            <span className="post-academy__chip inline-flex rounded-full px-3 py-1 text-xs font-bold">
              {post.category.name}
            </span>
          )}
          <h1 className="post-academy__ink mt-4 text-3xl font-black leading-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="post-academy__muted mt-4 text-lg leading-8">{post.excerpt}</p>
          <div className="post-academy__partner mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {post.author && <span>نویسنده: {post.author.name}</span>}
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTimeMinutes} دقیقه مطالعه</span>
          </div>
        </header>

        {post.cover && (
          <div className="post-academy__cover mb-8 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover.url}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              className="h-auto w-full"
            />
          </div>
        )}

        <div className="post-academy__body">
          <BlockRenderer blocks={post.content} mediaMap={post.mediaMap} />
        </div>

        {post.tags.length > 0 && (
          <div className="post-academy__divider mt-10 flex flex-wrap gap-2 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="post-academy__tag rounded-full px-3 py-1 text-xs font-bold"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .post-academy {
          --bg: #fcfbff;
          --ink: #211441;
          --muted: #665f7d;
          --brand-1: #7c3aed;
          --brand-2: #c026d3;
          --brand-3: #4c1d95;
          --border: rgba(124, 58, 237, 0.18);
          --surface: rgba(124, 58, 237, 0.05);
          --partner: #9088a6;
          background-color: var(--bg);
        }
        .dark .post-academy {
          --bg: #131f24;
          --ink: #f5f3ff;
          --muted: #a99fc4;
          --brand-1: #a78bfa;
          --brand-2: #e879f9;
          --brand-3: #ddd6fe;
          --border: rgba(167, 139, 250, 0.28);
          --surface: rgba(124, 58, 237, 0.14);
          --partner: #6c6389;
        }

        .post-academy__ink { color: var(--ink); }
        .post-academy__muted { color: var(--muted); }
        .post-academy__partner { color: var(--partner); }
        .post-academy__breadcrumb { color: var(--partner); }

        .post-academy__chip {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--brand-3);
        }

        .post-academy__tag {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
        }

        .post-academy__cover { border: 1px solid var(--border); }

        .post-academy__divider { border-top: 1px solid var(--border); }

        .post-academy__body {
          color: var(--ink);
          line-height: 1.9;
        }
        .post-academy__body :where(h2, h3, h4) {
          color: var(--ink);
          font-weight: 900;
        }
        .post-academy__body a {
          color: var(--brand-1);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .post-academy__body blockquote {
          border-right: 3px solid var(--brand-1);
          background: var(--surface);
          border-radius: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: var(--muted);
        }
        .post-academy__body code {
          background: var(--surface);
          color: var(--brand-3);
          border-radius: 0.375rem;
          padding: 0.1rem 0.4rem;
        }
      `}</style>
    </article>
  );
}
