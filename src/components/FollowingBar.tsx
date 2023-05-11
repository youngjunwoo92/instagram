'use client';
import Link from 'next/link';
import useSWR from 'swr';

import FollowingFallback from './ui/FollowingFallback';
import ScrollableBar from './ui/ScrollableBar';
import Avatar from './ui/Avatar';

import { HomeUser } from '@/model/user';

export default function FollowingBar() {
  const { data, isLoading } = useSWR<HomeUser>('/api/me');
  const users = data?.following;

  if (isLoading) {
    return (
      <div className="h-[80px] border border-[rgb(219, 219, 219)] p-2 rounded-md flex items-center gap-4">
        <FollowingFallback count={5} />
      </div>
    );
  }

  return (
    <section className="p-2 border border-[rgb(219, 219, 219)] rounded-md">
      {users?.length ? (
        <ScrollableBar>
          {users.map((user) => (
            <Link
              key={user.username}
              href={`/user/${user.username}`}
              className="flex flex-col text-center justify-center items-center"
            >
              <Avatar image={user.image} highlight={true} size="xl" />
              <p className="text-neutral-600">{user.username}</p>
            </Link>
          ))}
        </ScrollableBar>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="h-[80px] leading-[80px] text-lg font-bold text-neutral-500">
            You do not have following
          </p>
        </div>
      )}
    </section>
  );
}
