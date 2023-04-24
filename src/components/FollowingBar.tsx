'use client';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import useSWR from 'swr';

import Avatar from './ui/Avatar';

import { UserDetail } from '@/model/user';

export default function FollowingBar() {
  const { data, isLoading } = useSWR<UserDetail>('/api/me');
  const users = data?.following;

  if (isLoading) {
    return (
      <div className="h-[80px] shadow-[0_3px_15px_3px_rgba(17,12,46,0.15)] p2 rounded-md flex justify-center items-center">
        <Oval height={40} width={40} strokeWidth={5} />
      </div>
    );
  }

  return (
    <section className="p-2 shadow-[0_3px_15px_3px_rgba(17,12,46,0.15)] rounded-md">
      {users?.length ? (
        <ul className="flex gap-4">
          {users.map((user) => (
            <li key={user.username}>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} highlight={true} size="xl" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="h-[80px] leading-[80px] text-lg font-bold text-neutral-500">
            You don't have following
          </p>
        </div>
      )}
    </section>
  );
}
