'use client';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

import PostFallback from './ui/PostFallback';
import Post from './Post';

import { SimplePost } from '@/model/post';
import ModalPortal from './ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? (posts ?? []).find((post) => post.id === selectedId)
    : null;

  const handleClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <section className="flex-grow">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <PostFallback count={3} />
        ) : (
          (posts ?? []).map((post, index) => (
            <Post
              key={post.id}
              post={post}
              priority={index < 2}
              onClick={handleClick}
            />
          ))
        )}
      </div>
      {selected && (
        <ModalPortal>
          <PostModal onClose={handleClose}>
            <PostDetail post={selected} />
          </PostModal>
        </ModalPortal>
      )}
    </section>
  );
}
