'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, Save, Send } from 'lucide-react';
import { formatApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { MediaAsset, PostDetail, Taxonomy } from '@/lib/types';
import { Alert, Button, Card, Field, Select, Textarea, TextInput } from '@/components/panel/ui';
import BlockEditor, {
  type EditorBlock,
  fromContentBlocks,
  toContentBlocks,
} from '@/components/admin/BlockEditor';

interface Props {
  initial?: PostDetail;
}

/** Mirrors backend slugify so custom slugs don't fail Zod before save. */
function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\u064A]/g, '\u06cc')
    .replace(/[\u0643]/g, '\u06a9')
    .replace(/[\u200c\s]+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06ff-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function PostEditor({ initial }: Props) {
  const { request } = useAuth();
  const router = useRouter();
  const coverRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [cover, setCover] = useState<MediaAsset | null>(initial?.cover ?? null);
  const [categoryId, setCategoryId] = useState(initial?.category?.id ?? '');
  const [tagIds, setTagIds] = useState<string[]>(initial?.tags.map((t) => t.id) ?? []);
  const [keywords, setKeywords] = useState((initial?.seo.keywords ?? []).join('، '));
  const [metaTitle, setMetaTitle] = useState(initial?.seo.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(initial?.seo.metaDescription ?? '');
  const [blocks, setBlocks] = useState<EditorBlock[]>(
    initial ? fromContentBlocks(initial.content, initial.mediaMap) : [],
  );

  const [categories, setCategories] = useState<Taxonomy[]>([]);
  const [tags, setTags] = useState<Taxonomy[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  useEffect(() => {
    Promise.all([request<Taxonomy[]>('/blog/categories'), request<Taxonomy[]>('/blog/tags')])
      .then(([cats, tgs]) => {
        setCategories(cats);
        setTags(tgs);
      })
      .catch(() => undefined);
  }, [request]);

  const uploadCover = useCallback(
    async (file: File) => {
      const alt = title.trim().length >= 3 ? title.trim() : 'کاور پست';
      setCoverUploading(true);
      setError('');
      try {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('alt', alt);
        setCover(await request<MediaAsset>('/admin/media', { method: 'POST', body: fd }));
      } catch (e) {
        setError(formatApiError(e, 'آپلود کاور ناموفق بود.'));
      } finally {
        setCoverUploading(false);
        if (coverRef.current) coverRef.current.value = '';
      }
    },
    [request, title],
  );

  const buildPayload = () => {
    const kw = keywords
      .split(/[،,]/)
      .map((k) => k.trim())
      .filter(Boolean);
    const normalizedSlug = normalizeSlug(slug);
    return {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: toContentBlocks(blocks),
      slug: normalizedSlug || undefined,
      coverMediaId: cover?.id,
      categoryId: categoryId || undefined,
      tagIds,
      keywords: kw.length ? kw : undefined,
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
    };
  };

  const validate = (): string | null => {
    if (title.trim().length < 3) return 'عنوان باید حداقل ۳ کاراکتر باشد.';
    if (excerpt.trim().length < 10) return 'خلاصه باید حداقل ۱۰ کاراکتر باشد.';
    if (blocks.length === 0) return 'حداقل یک بلاک محتوا اضافه کنید.';
    if (slug.trim() && !normalizeSlug(slug)) {
      return 'اسلاگ فقط می‌تواند شامل حروف، عدد و خط تیره باشد.';
    }

    for (let i = 0; i < blocks.length; i += 1) {
      const b = blocks[i];
      const n = i + 1;
      switch (b.type) {
        case 'heading':
          if (!b.text.trim()) return `تیتر بلاک ${n} خالی است.`;
          break;
        case 'paragraph':
          if (!b.text.trim()) return `پاراگراف بلاک ${n} خالی است.`;
          break;
        case 'image':
          if (!b.mediaId) return `برای بلاک تصویر ${n} باید یک عکس آپلود کنید.`;
          if (b.alt.trim().length < 3) {
            return `متن جایگزین تصویر بلاک ${n} حداقل ۳ کاراکتر باشد.`;
          }
          break;
        case 'quote':
          if (!b.text.trim()) return `نقل‌قول بلاک ${n} خالی است.`;
          break;
        case 'list': {
          const items = b.items
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean);
          if (items.length === 0) return `لیست بلاک ${n} حداقل یک آیتم می‌خواهد.`;
          break;
        }
        case 'code':
          if (!b.code.trim()) return `کد بلاک ${n} خالی است.`;
          break;
        case 'embed':
          if (!b.url.trim()) return `آدرس ویدیو بلاک ${n} خالی است.`;
          if (!isValidUrl(b.url.trim())) return `آدرس ویدیو بلاک ${n} معتبر نیست.`;
          break;
        case 'divider':
          break;
        default:
          break;
      }
    }
    return null;
  };

  const save = async (publish: boolean) => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      const post = initial
        ? await request<PostDetail>(`/admin/blog/posts/${initial.id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
          })
        : await request<PostDetail>('/admin/blog/posts', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

      if (publish) {
        await request(`/admin/blog/posts/${post.id}/publish`, { method: 'POST' });
      }
      router.push('/admin/blog');
      router.refresh();
    } catch (e) {
      setError(formatApiError(e, 'ذخیره پست ناموفق بود.'));
      setSaving(false);
    }
  };

  const toggleTag = (id: string) =>
    { setTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])); };

  return (
    <div className="space-y-6">
      {/* هدر صفحه به همراه دکمه‌های اصلی اکشن */}
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-slate-200 border-b-4 bg-white p-5 dark:border-slate-800 dark:bg-[#131f24]">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          {initial ? 'ویرایش پست' : 'نوشتن پست جدید'}
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => save(false)} disabled={saving}>
            <Save className="h-4 w-4 stroke-[2.5]" /> ذخیره پیش‌نویس
          </Button>
          <Button onClick={() => save(true)} disabled={saving}>
            <Send className="h-4 w-4 stroke-[2.5]" /> {saving ? 'در حال ذخیره…' : 'انتشار'}
          </Button>
        </div>
      </header>

      {error && <Alert>{error}</Alert>}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ستون اصلی: عنوان، خلاصه و محتوا */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="space-y-4">
            <Field label="عنوان پست">
              <TextInput
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
                placeholder="عنوان جذاب و سئو‌محور"
              />
            </Field>
            <Field label="خلاصه (متا دیسکریپشن پیش‌فرض)">
              <Textarea
                rows={2}
                value={excerpt}
                onChange={(e) => { setExcerpt(e.target.value); }}
                placeholder="خلاصه کوتاه برای فهرست و نتایج گوگل"
              />
            </Field>
          </Card>

          <Card>
            <p className="mb-4 text-base font-black text-slate-900 dark:text-white">محتوای پست</p>
            <BlockEditor value={blocks} onChange={setBlocks} />
          </Card>
        </div>

        {/* ستون کناری: کاور، تگ‌ها و سئو */}
        <div className="space-y-6">
          {/* کارت تصویر کاور */}
          <Card className="space-y-3">
            <p className="text-sm font-black text-slate-900 dark:text-white">تصویر شاخص (کاور)</p>
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover.url}
                alt={cover.alt}
                className="w-full rounded-2xl border-2 border-slate-200 border-b-4 object-cover dark:border-slate-800"
              />
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-xs font-bold text-slate-400 dark:border-slate-800 dark:text-slate-500">
                تصویری انتخاب نشده است.
              </div>
            )}
            <input
              ref={coverRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() => coverRef.current?.click()}
              disabled={coverUploading}
              className="w-full"
            >
              <ImagePlus className="h-4 w-4 stroke-[2.5]" />
              {coverUploading ? 'در حال آپلود…' : cover ? 'تغییر کاور' : 'انتخاب کاور'}
            </Button>
          </Card>

          {/* کارت دسته‌بندی و تگ‌ها */}
          <Card className="space-y-4">
            <Field label="دسته‌بندی">
              <Select value={categoryId} onChange={(e) => { setCategoryId(e.target.value); }}>
                <option value="">بدون دسته</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>

            <div>
              <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">
                تگ‌ها
              </span>
              {tags.length === 0 ? (
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  تگی تعریف نشده است.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => {
                    const isSelected = tagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => { toggleTag(t.id); }}
                        className={`rounded-xl px-3 py-1.5 text-xs font-black transition-all duration-75 select-none active:translate-y-[1px] ${
                          isSelected
                            ? 'bg-[#7c3aed] text-white border-2 border-[#5b21b6] border-b-3 dark:bg-[#8b5cf6] dark:border-[#6d28d9]'
                            : 'bg-slate-100 text-slate-600 border-2 border-slate-200 border-b-3 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>

          {/* کارت تنظیمات سئو */}
          <Card className="space-y-4">
            <p className="text-sm font-black text-slate-900 dark:text-white">تنظیمات سئو</p>
            <Field label="اسلاگ (نشانی)" hint="خالی بگذارید تا از عنوان ساخته شود.">
              <TextInput
                dir="ltr"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); }}
                placeholder="python-course"
              />
            </Field>
            <Field label="عنوان متا">
              <TextInput
                value={metaTitle}
                onChange={(e) => { setMetaTitle(e.target.value); }}
                placeholder="خالی = عنوان پست"
              />
            </Field>
            <Field label="توضیحات متا">
              <Textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => { setMetaDescription(e.target.value); }}
                placeholder="خالی = خلاصه پست"
              />
            </Field>
            <Field label="کلیدواژه‌ها" hint="با ویرگول جدا کنید.">
              <TextInput
                value={keywords}
                onChange={(e) => { setKeywords(e.target.value); }}
                placeholder="آموزش پایتون، اندیشه"
              />
            </Field>
          </Card>
        </div>
      </div>
    </div>
  );
}
