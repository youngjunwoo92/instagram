'use client';
import PostFallback from './ui/PostFallback';
import Post from './Post';

import usePosts from '@/hooks/posts';

export default function PostList() {
  const { posts, isLoading } = usePosts();

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
