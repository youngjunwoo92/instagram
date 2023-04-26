'use client';
import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  console.log({ posts });

  return (
    <section className="p-2 flex-grow rounded-md shadow-[0_3px_15px_3px_rgba(17,12,46,0.15)]">
      <ul>
        {(posts ?? []).map((post) => (
          <li key={post.id}>{post.username}</li>
        ))}
      </ul>
    </section>
  );
}
