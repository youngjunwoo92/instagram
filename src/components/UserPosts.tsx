'use client';
import { useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

import CameraIcon from './ui/icons/CameraIcon';
import PostThumbnail from './PostThumbnail';
import ModalPortal from './ModalPortal';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import Tabs from './Tabs';

import { SimplePost } from '@/model/post';

export type Tab = 'posts' | 'saved';

type Props = {
  user: ProfileUser;
  loggedInUser: AuthUser;
};

export default function UserPosts({
  loggedInUser,
  user: { username, email },
}: Props) {
  const [tab, setTab] = useState<Tab>('posts');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isMyProfile = loggedInUser.username === username;

  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/users/${username}/${tab}`,
  );

  const selected = selectedId
    ? (posts ?? []).find((post) => post.id === selectedId)
    : null;

  const handleClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleChange = useCallback((tab: Tab) => {
    setTab(tab);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <>
      <Tabs tab={tab} onChange={handleChange} isMyProfile={isMyProfile} />
      {isLoading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((item) => (
            <div className="aspect-square">
              <Skeleton width="100%" height="100%" />
            </div>
          ))}
        </div>
      ) : posts?.length ? (
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <PostThumbnail key={post.id} post={post} onClick={handleClick} />
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
      {selected && (
        <ModalPortal>
          <PostModal onClose={handleClose}>
            <PostDetail post={selected} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
