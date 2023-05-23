import Skeleton from 'react-loading-skeleton';

import CameraIcon from './ui/icons/CameraIcon';
import PostThumbnail from './PostThumbnail';

import { SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';

type Props = {
  isMyProfile?: boolean;
  onClick: (post: SimplePost) => void;
};

export default function PostGrid({ isMyProfile, onClick }: Props) {
  const { posts, isLoading } = usePosts();

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((item, index) => (
            <div key={index} className="aspect-square">
              <Skeleton width="100%" height="100%" />
            </div>
          ))}
        </div>
      ) : posts?.length ? (
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post, index) => (
            <PostThumbnail
              key={post.id}
              post={post}
              isMyProfile={isMyProfile}
              onClick={() => onClick(post)}
              priority={index < 6}
            />
          ))}
        </div>
      ) : (
        <section className="mt-16">
          <div className="flex flex-col items-center gap-4 text-neutral-500 mx-auto">
            <div className="flex w-[120px] justify-center items-center border-neutral-500 border-2 rounded-full aspect-square">
              <CameraIcon />
            </div>
            <h1 className="font-semibold text-xl tracking-wider">
              No posts yet
            </h1>
          </div>
        </section>
      )}
    </>
  );
}
