import type { ContentBlock, MediaAsset } from '@/lib/types';
import type { CSSProperties } from 'react';

type TextSpanMarkLocal = 'bold' | 'italic' | 'lead';
interface Span { text: string; marks?: TextSpanMarkLocal[]; href?: string }

function renderSpan(span: Span, index: number) {
  const marks = span.marks ?? [];
  let node: React.ReactNode = span.text;

  if (span.href) {
    node = (
      <a
        href={span.href}
        className="text-violet-600 underline underline-offset-2 dark:text-violet-400"
      >
        {node}
      </a>
    );
  }
  if (marks.includes('bold')) node = <strong className="font-black">{node}</strong>;
  if (marks.includes('italic')) node = <em>{node}</em>;
  if (marks.includes('lead')) {
    node = (
      <span className="text-xl font-bold leading-9 text-slate-800 dark:text-slate-100 sm:text-2xl">
        {node}
      </span>
    );
  }

  return <span key={index}>{node}</span>;
}

function EmbedFrame({
  provider,
  url,
  title,
}: {
  provider: 'youtube' | 'aparat';
  url: string;
  title?: string;
}) {
  let src = url;
  if (provider === 'youtube') {
    const id = (/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/.exec(url))?.[1];
    if (id) src = `https://www.youtube.com/embed/${id}`;
  } else {
    const hash = (/aparat\.com\/(?:v|video\/video\/embed\/videohash)\/([\w-]+)/.exec(url))?.[1];
    if (hash) src = `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame`;
  }
  return (
    <div className="my-6 aspect-video overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <iframe
        src={src}
        title={title ?? 'ویدیو'}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function BlogImage({ media, alt, caption }: { media?: MediaAsset; alt: string; caption?: string }) {
  if (!media) return null;
  const style: CSSProperties = media.placeholder
    ? {
        backgroundImage: `url(${media.placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};
  return (
    <figure className="my-6">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700"
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt={alt || media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function BlockRenderer({
  blocks,
  mediaMap,
}: {
  blocks: ContentBlock[];
  mediaMap: Record<string, MediaAsset>;
}) {
  return (
    <div className="space-y-5 text-[17px] leading-8 text-slate-700 dark:text-slate-300">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const cls =
              block.level === 2
                ? 'mt-8 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl'
                : block.level === 3
                  ? 'mt-6 text-xl font-black text-slate-900 dark:text-white sm:text-2xl'
                  : 'mt-4 text-lg font-bold text-slate-900 dark:text-white';
            if (block.level === 2)
              return (
                <h2 key={index} className={cls}>
                  {block.text}
                </h2>
              );
            if (block.level === 3)
              return (
                <h3 key={index} className={cls}>
                  {block.text}
                </h3>
              );
            return (
              <h4 key={index} className={cls}>
                {block.text}
              </h4>
            );
          }
          case 'paragraph':
            return (
              <p key={index}>{(block.spans as Span[]).map((span, i) => renderSpan(span, i))}</p>
            );
          case 'image':
            return (
              <BlogImage
                key={index}
                media={mediaMap[block.mediaId]}
                alt={block.alt}
                caption={block.caption}
              />
            );
          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-6 border-r-4 border-violet-500 bg-violet-50 px-5 py-4 text-slate-700 dark:bg-violet-950/30 dark:text-slate-200"
              >
                <p className="font-medium">{block.text}</p>
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-slate-500">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case 'list':
            return block.ordered ? (
              <ol key={index} className="list-decimal space-y-2 pr-6">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="list-disc space-y-2 pr-6">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'code':
            return (
              <pre
                key={index}
                dir="ltr"
                className="my-6 overflow-x-auto rounded-2xl bg-slate-900 p-4 text-left text-sm text-slate-100"
              >
                <code>{block.code}</code>
              </pre>
            );
          case 'embed':
            return (
              <EmbedFrame
                key={index}
                provider={block.provider}
                url={block.url}
                title={block.title}
              />
            );
          case 'divider':
            return <hr key={index} className="my-8 border-slate-200 dark:border-slate-800" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
