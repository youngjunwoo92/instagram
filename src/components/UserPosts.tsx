'use client';
import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';

import ModalPortal from './ModalPortal';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import PostGrid from './PostGrid';
import Tabs from './Tabs';

import { CacheKeysContext } from '@/context/CacheKeysContext';
import { ProfileUser } from '@/model/user';
import { SimplePost } from '@/model/post';

export type Tab = 'posts' | 'saved';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  const [selectedPost, setSelectedPost] = useState<SimplePost | null>(null);
  const [tab, setTab] = useState<Tab>('posts');

  const cacheKey = `/api/users/${username}/${tab}`;

  const { data } = useSession();

  const loggedInUser = data?.user;
  const isMyProfile = loggedInUser?.username === username;

  const handleClick = useCallback((post: SimplePost) => {
    setSelectedPost(post);
  }, []);

  const handleChange = useCallback((tab: Tab) => {
    setTab(tab);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPost(null);
  }, [setSelectedPost]);

  return (
    <>
      <Tabs tab={tab} onChange={handleChange} isMyProfile={isMyProfile} />
      <CacheKeysContext.Provider value={{ postsKey: cacheKey }}>
        <PostGrid isMyProfile={isMyProfile} onClick={handleClick} />
      </CacheKeysContext.Provider>
      {selectedPost && (
        <ModalPortal>
          <PostModal onClose={handleClose}>
            <PostDetail post={selectedPost} cacheKey={cacheKey} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
