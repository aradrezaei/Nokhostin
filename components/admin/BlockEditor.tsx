'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { ContentBlock, MediaAsset, TextMark } from '@/lib/types';
import { Button, Select, Textarea, TextInput } from '@/components/panel/ui';

export type EditorBlock =
  | { key: string; type: 'heading'; level: 2 | 3 | 4; text: string }
  | { key: string; type: 'paragraph'; text: string; bold: boolean; lead: boolean }
  | { key: string; type: 'image'; mediaId: string; alt: string; caption: string; url: string }
  | { key: string; type: 'quote'; text: string; cite: string }
  | { key: string; type: 'list'; ordered: boolean; items: string }
  | { key: string; type: 'code'; language: string; code: string }
  | { key: string; type: 'embed'; provider: 'youtube' | 'aparat'; url: string; title: string }
  | { key: string; type: 'divider' };

const uid = () => Math.random().toString(36).slice(2);

export function toContentBlocks(blocks: EditorBlock[]): ContentBlock[] {
  return blocks.map((b): ContentBlock => {
    switch (b.type) {
      case 'heading':
        return { type: 'heading', level: b.level, text: b.text };
      case 'paragraph': {
        const marks: TextMark[] = [];
        if (b.bold) marks.push('bold');
        if (b.lead) marks.push('lead');
        return { type: 'paragraph', spans: [{ text: b.text, ...(marks.length ? { marks } : {}) }] };
      }
      case 'image':
        return {
          type: 'image',
          mediaId: b.mediaId,
          alt: b.alt,
          ...(b.caption ? { caption: b.caption } : {}),
        };
      case 'quote':
        return { type: 'quote', text: b.text, ...(b.cite ? { cite: b.cite } : {}) };
      case 'list':
        return {
          type: 'list',
          ordered: b.ordered,
          items: b.items
            .split('\n')
            .map((i) => i.trim())
            .filter(Boolean),
        };
      case 'code':
        return { type: 'code', code: b.code, ...(b.language ? { language: b.language } : {}) };
      case 'embed':
        return {
          type: 'embed',
          provider: b.provider,
          url: b.url,
          ...(b.title ? { title: b.title } : {}),
        };
      case 'divider':
        return { type: 'divider' };
    }
  });
}

export function fromContentBlocks(
  blocks: ContentBlock[],
  mediaMap: Record<string, MediaAsset>,
): EditorBlock[] {
  return blocks.map((b): EditorBlock => {
    switch (b.type) {
      case 'heading':
        return { key: uid(), type: 'heading', level: b.level, text: b.text };
      case 'paragraph':
        return {
          key: uid(),
          type: 'paragraph',
          text: b.spans.map((s) => s.text).join(''),
          bold: b.spans.some((s) => s.marks?.includes('bold')),
          lead: b.spans.some((s) => s.marks?.includes('lead')),
        };
      case 'image':
        return {
          key: uid(),
          type: 'image',
          mediaId: b.mediaId,
          alt: b.alt,
          caption: b.caption ?? '',
          url: mediaMap[b.mediaId].url,
        };
      case 'quote':
        return { key: uid(), type: 'quote', text: b.text, cite: b.cite ?? '' };
      case 'list':
        return { key: uid(), type: 'list', ordered: b.ordered, items: b.items.join('\n') };
      case 'code':
        return { key: uid(), type: 'code', language: b.language ?? '', code: b.code };
      case 'embed':
        return {
          key: uid(),
          type: 'embed',
          provider: b.provider,
          url: b.url,
          title: b.title ?? '',
        };
      case 'divider':
        return { key: uid(), type: 'divider' };
    }
  });
}

const NEW_BLOCKS: Record<string, () => EditorBlock> = {
  heading: () => ({ key: uid(), type: 'heading', level: 2, text: '' }),
  paragraph: () => ({ key: uid(), type: 'paragraph', text: '', bold: false, lead: false }),
  image: () => ({ key: uid(), type: 'image', mediaId: '', alt: '', caption: '', url: '' }),
  quote: () => ({ key: uid(), type: 'quote', text: '', cite: '' }),
  list: () => ({ key: uid(), type: 'list', ordered: false, items: '' }),
  code: () => ({ key: uid(), type: 'code', language: '', code: '' }),
  embed: () => ({ key: uid(), type: 'embed', provider: 'youtube', url: '', title: '' }),
  divider: () => ({ key: uid(), type: 'divider' }),
};

const ADD_BUTTONS: { type: string; label: string }[] = [
  { type: 'paragraph', label: 'پاراگراف' },
  { type: 'heading', label: 'تیتر' },
  { type: 'image', label: 'تصویر' },
  { type: 'list', label: 'لیست' },
  { type: 'quote', label: 'نقل‌قول' },
  { type: 'code', label: 'کد' },
  { type: 'embed', label: 'ویدیو' },
  { type: 'divider', label: 'جداکننده' },
];

function ImageBlockEditor({
  block,
  patch,
}: {
  block: Extract<EditorBlock, { type: 'image' }>;
  patch: (p: Partial<Extract<EditorBlock, { type: 'image' }>>) => void;
}) {
  const { request } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (file: File) => {
    const alt = block.alt.trim().length >= 3 ? block.alt.trim() : 'تصویر پست';
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('alt', alt);
      const media = await request<MediaAsset>('/admin/media', { method: 'POST', body: fd });
      patch({
        mediaId: media.id,
        url: media.url,
        alt: block.alt.trim().length >= 3 ? block.alt : alt,
      });
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'آپلود ناموفق بود.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <TextInput
        value={block.alt}
        onChange={(e) => { patch({ alt: e.target.value }); }}
        placeholder="متن جایگزین تصویر (الزامی برای سئو)"
      />
      {block.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.url}
          alt={block.alt}
          className="max-h-56 rounded-2xl border-2 border-slate-200 border-b-4 object-cover dark:border-slate-800"
        />
      ) : null}
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
        <Button
          variant="ghost"
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          <ImagePlus className="h-4 w-4 stroke-[2.5]" />
          {uploading ? 'در حال آپلود…' : block.url ? 'تغییر تصویر' : 'انتخاب تصویر'}
        </Button>
      </div>
      <TextInput
        value={block.caption}
        onChange={(e) => { patch({ caption: e.target.value }); }}
        placeholder="توضیح تصویر (اختیاری)"
      />
      {error && <p className="text-xs font-black text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}

export default function BlockEditor({
  value,
  onChange,
}: {
  value: EditorBlock[];
  onChange: (blocks: EditorBlock[]) => void;
}) {
  const add = (type: string) => { onChange([...value, NEW_BLOCKS[type]()]); };
  const remove = (key: string) => { onChange(value.filter((b) => b.key !== key)); };
  const move = (index: number, dir: -1 | 1) => {
    const next = [...value];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const patch = (key: string, p: Partial<EditorBlock>) =>
    { onChange(value.map((b) => (b.key === key ? ({ ...b, ...p } as EditorBlock) : b))); };

  return (
    <div className="space-y-5">
      {/* دکمه‌های افزودن بلاک با استایل برجسته دولینگویی */}
      <div className="flex flex-wrap gap-2.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-white p-3 dark:border-slate-800 dark:bg-[#131f24]">
        {ADD_BUTTONS.map((btn) => (
          <button
            key={btn.type}
            type="button"
            onClick={() => { add(btn.type); }}
            className="rounded-xl border-2 border-slate-200 border-b-3 bg-slate-50 px-3.5 py-2 text-xs font-black text-slate-700 transition-all duration-75 select-none hover:border-[#7c3aed] hover:bg-violet-50 hover:text-[#7c3aed] active:border-b active:translate-y-[2px] dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-[#8b5cf6] dark:hover:bg-slate-800 dark:hover:text-[#8b5cf6]"
          >
            + {btn.label}
          </button>
        ))}
      </div>

      {value.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
          <p className="text-sm font-extrabold text-slate-400 dark:text-slate-500">
            هنوز بلاکی اضافه نشده. از دکمه‌های بالا شروع کنید.
          </p>
        </div>
      )}

      {/* لیست بلاک‌ها */}
      {value.map((block, index) => (
        <div
          key={block.key}
          className="rounded-3xl border-2 border-slate-200 border-b-4 bg-white p-5 transition-all dark:border-slate-800 dark:bg-[#131f24]"
        >
          {/* هدر بلاک شامل عنوان و دکمه‌های اکشن */}
          <div className="mb-4 flex items-center justify-between border-b-2 border-slate-100 pb-3 dark:border-slate-800/60">
            <span className="inline-flex rounded-xl border-2 border-slate-200 bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {blockLabel(block.type)}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => { move(index, -1); }}
                aria-label="انتقال به بالا"
                className="rounded-xl border-2 border-slate-200 border-b-3 bg-slate-50 p-1.5 text-slate-500 transition-all active:border-b active:translate-y-[1px] hover:border-[#7c3aed] hover:text-[#7c3aed] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-[#8b5cf6] dark:hover:text-[#8b5cf6]"
              >
                <ArrowUp className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => { move(index, 1); }}
                aria-label="انتقال به پایین"
                className="rounded-xl border-2 border-slate-200 border-b-3 bg-slate-50 p-1.5 text-slate-500 transition-all active:border-b active:translate-y-[1px] hover:border-[#7c3aed] hover:text-[#7c3aed] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-[#8b5cf6] dark:hover:text-[#8b5cf6]"
              >
                <ArrowDown className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => { remove(block.key); }}
                aria-label="حذف بلاک"
                className="rounded-xl border-2 border-rose-200 border-b-3 bg-rose-50 p-1.5 text-rose-600 transition-all active:border-b active:translate-y-[1px] hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/80"
              >
                <Trash2 className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* محتوای ویرایشگر بر اساس نوع بلاک */}
          {block.type === 'heading' && (
            <div className="flex gap-2.5">
              <Select
                value={block.level}
                onChange={(e) => { patch(block.key, { level: Number(e.target.value) as 2 | 3 | 4 }); }}
                className="w-32 shrink-0"
              >
                <option value={2}>تیتر H2</option>
                <option value={3}>تیتر H3</option>
                <option value={4}>تیتر H4</option>
              </Select>
              <TextInput
                value={block.text}
                onChange={(e) => { patch(block.key, { text: e.target.value }); }}
                placeholder="متن تیتر را بنویسید..."
              />
            </div>
          )}

          {block.type === 'paragraph' && (
            <div className="space-y-3">
              <Textarea
                rows={4}
                value={block.text}
                onChange={(e) => { patch(block.key, { text: e.target.value }); }}
                placeholder="متن پاراگراف را وارد کنید..."
              />
              <div className="flex gap-4 text-xs font-black text-slate-700 dark:text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={block.bold}
                    onChange={(e) => { patch(block.key, { bold: e.target.checked }); }}
                    className="h-4 w-4 rounded-md border-2 border-slate-300 text-[#7c3aed] focus:ring-0 dark:border-slate-700"
                  />
                  ضخیم (Bold)
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={block.lead}
                    onChange={(e) => { patch(block.key, { lead: e.target.checked }); }}
                    className="h-4 w-4 rounded-md border-2 border-slate-300 text-[#7c3aed] focus:ring-0 dark:border-slate-700"
                  />
                  متن بزرگ (شاخص)
                </label>
              </div>
            </div>
          )}

          {block.type === 'image' && (
            <ImageBlockEditor block={block} patch={(p) => { patch(block.key, p); }} />
          )}

          {block.type === 'quote' && (
            <div className="space-y-3">
              <Textarea
                rows={2}
                value={block.text}
                onChange={(e) => { patch(block.key, { text: e.target.value }); }}
                placeholder="متن نقل‌قول..."
              />
              <TextInput
                value={block.cite}
                onChange={(e) => { patch(block.key, { cite: e.target.value }); }}
                placeholder="منبع یا نقل‌کننده (اختیاری)"
              />
            </div>
          )}

          {block.type === 'list' && (
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-700 cursor-pointer select-none dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={block.ordered}
                  onChange={(e) => { patch(block.key, { ordered: e.target.checked }); }}
                  className="h-4 w-4 rounded-md border-2 border-slate-300 text-[#7c3aed] focus:ring-0 dark:border-slate-700"
                />
                لیست شماره‌دار
              </label>
              <Textarea
                rows={4}
                value={block.items}
                onChange={(e) => { patch(block.key, { items: e.target.value }); }}
                placeholder="هر خط را یک آیتم از لیست قرار دهید..."
              />
            </div>
          )}

          {block.type === 'code' && (
            <div className="space-y-3">
              <TextInput
                value={block.language}
                onChange={(e) => { patch(block.key, { language: e.target.value }); }}
                placeholder="زبان برنامه نویسی (مثلاً python)"
              />
              <Textarea
                rows={5}
                value={block.code}
                onChange={(e) => { patch(block.key, { code: e.target.value }); }}
                className="font-mono text-xs"
                placeholder="کد را اینجا وارد کنید..."
              />
            </div>
          )}

          {block.type === 'embed' && (
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <Select
                  value={block.provider}
                  onChange={(e) =>
                    { patch(block.key, { provider: e.target.value as 'youtube' | 'aparat' }); }
                  }
                  className="w-32 shrink-0"
                >
                  <option value="youtube">یوتیوب</option>
                  <option value="aparat">آپارات</option>
                </Select>
                <TextInput
                  value={block.url}
                  onChange={(e) => { patch(block.key, { url: e.target.value }); }}
                  placeholder="آدرس لینک ویدیو"
                  dir="ltr"
                />
              </div>
              <TextInput
                value={block.title}
                onChange={(e) => { patch(block.key, { title: e.target.value }); }}
                placeholder="عنوان ویدیو (اختیاری)"
              />
            </div>
          )}

          {block.type === 'divider' && (
            <div className="my-2 rounded-full border-b-4 border-dashed border-slate-200 dark:border-slate-800" />
          )}
        </div>
      ))}
    </div>
  );
}

function blockLabel(type: EditorBlock['type']): string {
  const map: Record<EditorBlock['type'], string> = {
    heading: 'تیتر',
    paragraph: 'پاراگراف',
    image: 'تصویر',
    quote: 'نقل‌قول',
    list: 'لیست',
    code: 'کد',
    embed: 'ویدیو',
    divider: 'جداکننده',
  };
  return map[type];
}
