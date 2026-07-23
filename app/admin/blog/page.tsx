'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';
import { confirmAction } from '@/lib/confirm';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Pencil, Plus, Tags, Trash2 } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Paginated, PostSummary, Taxonomy } from '@/lib/types';
import { Alert, Badge, Button, Field, Modal, TextInput } from '@/components/panel/ui';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

export default function AdminBlogPage() {
  const { request } = useAuth();
  const [data, setData] = useState<Paginated<PostSummary> | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [taxOpen, setTaxOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await request<Paginated<PostSummary>>('/admin/blog/posts?pageSize=50'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت پست‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => scheduleEffect(() => load()), [load]);

  const togglePublish = async (post: PostSummary) => {
    const action = post.status === 'published' ? 'unpublish' : 'publish';
    try {
      await request(`/admin/blog/posts/${post.id}/${action}`, { method: 'POST' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'تغییر وضعیت ناموفق بود.');
    }
  };

  const remove = async (post: PostSummary) => {
    if (!confirmAction(`حذف پست «${post.title}»؟`)) return;
    try {
      await request(`/admin/blog/posts/${post.id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'حذف ناموفق بود.');
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">مدیریت وبلاگ</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            نوشتن، ویرایش و انتشار مقالات
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setTaxOpen(true);
            }}
          >
            <Tags className="h-4 w-4" /> دسته و تگ
          </Button>
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="h-4 w-4" /> پست جدید
            </Button>
          </Link>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="space-y-3">
        {loading ? (
          <p className="py-10 text-center text-slate-400">در حال بارگذاری…</p>
        ) : data && data.items.length > 0 ? (
          data.items.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              {post.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover.thumbnailUrl ?? post.cover.url}
                  alt={post.cover.alt}
                  className="h-16 w-24 rounded-lg object-cover"
                />
              ) : (
                <div className="h-16 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
              )}
              <div className="min-w-[180px] flex-1">
                <p className="font-bold text-slate-900 dark:text-white">{post.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {post.readingTimeMinutes} دقیقه · {post.viewsCount} بازدید
                  {post.category ? ` · ${post.category.name}` : ''}
                </p>
              </div>
              <Badge
                tone={
                  post.status === 'published' ? 'green' : post.status === 'draft' ? 'amber' : 'gray'
                }
              >
                {post.status === 'published'
                  ? 'منتشرشده'
                  : post.status === 'draft'
                    ? 'پیش‌نویس'
                    : 'بایگانی'}
              </Badge>
              <div className="flex items-center gap-1">
                {post.status === 'published' && SITE_URL && (
                  <a
                    href={`${SITE_URL}/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-slate-400 hover:text-violet-600"
                    title="مشاهده"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="rounded-lg p-2 text-slate-400 hover:text-violet-600"
                  title="ویرایش"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => remove(post)}
                  className="rounded-lg p-2 text-slate-400 hover:text-rose-600"
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Button
                  variant="subtle"
                  onClick={() => togglePublish(post)}
                  className="!px-3 !py-1.5"
                >
                  {post.status === 'published' ? 'لغو انتشار' : 'انتشار'}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-400 dark:border-slate-700">
            هنوز پستی ندارید. اولین مقاله را بنویسید.
          </p>
        )}
      </div>

      <TaxonomyModal
        open={taxOpen}
        onClose={() => {
          setTaxOpen(false);
        }}
      />
    </div>
  );
}

function TaxonomyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { request } = useAuth();
  const [categories, setCategories] = useState<Taxonomy[]>([]);
  const [tags, setTags] = useState<Taxonomy[]>([]);
  const [catName, setCatName] = useState('');
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const [c, t] = await Promise.all([
      request<Taxonomy[]>('/admin/blog/categories'),
      request<Taxonomy[]>('/admin/blog/tags'),
    ]);
    setCategories(c);
    setTags(t);
  }, [request]);

  useEffect(() => {
    if (open) scheduleEffect(() => load());
  }, [open, load]);

  const addCategory = async () => {
    if (catName.trim().length < 2) return;
    try {
      await request('/admin/blog/categories', {
        method: 'POST',
        body: JSON.stringify({ name: catName.trim() }),
      });
      setCatName('');
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا.');
    }
  };

  const addTag = async () => {
    if (tagName.trim().length < 2) return;
    try {
      await request('/admin/blog/tags', {
        method: 'POST',
        body: JSON.stringify({ name: tagName.trim() }),
      });
      setTagName('');
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا.');
    }
  };

  const removeItem = async (kind: 'categories' | 'tags', id: string) => {
    try {
      await request(`/admin/blog/${kind}/${id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'حذف ناموفق بود.');
    }
  };

  return (
    <Modal open={open} title="دسته‌بندی‌ها و تگ‌ها" onClose={onClose}>
      <div className="space-y-5">
        {error && <Alert>{error}</Alert>}
        <div>
          <Field label="دسته جدید">
            <div className="flex gap-2">
              <TextInput
                value={catName}
                onChange={(e) => {
                  setCatName(e.target.value);
                }}
                placeholder="نام دسته"
              />
              <Button onClick={addCategory}>افزودن</Button>
            </div>
          </Field>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c.id}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800"
              >
                {c.name}
                <button onClick={() => removeItem('categories', c.id)} className="text-rose-500">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <Field label="تگ جدید">
            <div className="flex gap-2">
              <TextInput
                value={tagName}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
                placeholder="نام تگ"
              />
              <Button onClick={addTag}>افزودن</Button>
            </div>
          </Field>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t.id}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800"
              >
                {t.name}
                <button onClick={() => removeItem('tags', t.id)} className="text-rose-500">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
