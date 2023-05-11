'use client';
import { ProfileUser } from '@/model/user';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import Tabs from './Tabs';
import { useCallback, useState } from 'react';

export type Tab = 'posts' | 'saved';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  const [tab, setTab] = useState<Tab>('posts');
  //   const { data: posts } = useSWR(`/api/users/${username}/${tab}`);

  const handleChange = useCallback((tab: Tab) => {
    setTab(tab);
  }, []);

  return (
    <>
      <Tabs tab={tab} onChange={handleChange} />
    </>
  );
}
