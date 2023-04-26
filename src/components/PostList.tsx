'use client';
import React from 'react';
import useSWR from 'swr';

import PostFallback from './ui/PostFallback';
import Post from './Post';

import { SimplePost } from '@/model/post';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section className="flex-grow">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <PostFallback count={3} />
        ) : (
          (posts ?? []).map((post, index) => (
            <Post key={post.id} post={post} priority={index < 2} />
          ))
        )}
      </div>
    </section>
  );
}
