'use client';
import CameraIcon from './ui/icons/CameraIcon';
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
        ) : posts?.length ? (
          posts.map((post, index) => (
            <Post key={post.id} post={post} priority={index < 2} />
          ))
        ) : (
          <article className="flex flex-col gap-4 justify-center items-center border border-[rgb(219, 219, 219)] rounded-md aspect-square">
            <div className="flex w-[120px] justify-center items-center border-neutral-500 border-2 rounded-full aspect-square">
              <CameraIcon />
            </div>
            <h1 className="font-semibold text-xl tracking-wider">
              No posts yet
            </h1>
          </article>
        )}
      </div>
    </section>
  );
}
