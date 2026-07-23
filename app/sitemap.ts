import type { MetadataRoute } from 'next';
import { publicGet } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nokhostin.org';

const STATIC_ROUTES = [
  '',
  '/courses',
  '/about',
  '/contact',
  '/faq',
  '/roadmap',
  '/blog',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => {
    let priority = 0.7;
    if (path === '') priority = 1;
    else if (path === '/about' || path === '/courses') priority = 0.9;
    else if (path === '/contact' || path === '/blog') priority = 0.8;

    return {
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
      priority,
    };
  });

  let posts: { slug: string; updatedAt: string }[] = [];
  try {
    posts = await publicGet<{ slug: string; updatedAt: string }[]>('/blog/sitemap-data', 300);
  } catch {
    posts = [];
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...postEntries];
}
