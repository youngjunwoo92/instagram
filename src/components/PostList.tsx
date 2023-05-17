'use client';
import { useCallback, useState } from 'react';

import PostFallback from './ui/PostFallback';
import ModalPortal from './ModalPortal';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import Post from './Post';

import usePosts from '@/hooks/posts';

export default function PostList() {
  const { posts, isLoading } = usePosts();
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
