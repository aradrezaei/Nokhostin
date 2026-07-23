'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import type { PostDetail } from '@/lib/types';
import PostEditor from '@/components/admin/PostEditor';
import { Alert } from '@/components/panel/ui';

export default function EditPostPage() {
  const { request } = useAuth();
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    request<PostDetail>(`/admin/blog/posts/${params.id}`)
      .then(setPost)
      .catch(() => { setError('پست یافت نشد یا دسترسی ندارید.'); });
  }, [request, params.id]);

  if (error) return <Alert>{error}</Alert>;
  if (!post)
    return (
      <div className="flex justify-center py-20">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );

  return <PostEditor initial={post} />;
}
