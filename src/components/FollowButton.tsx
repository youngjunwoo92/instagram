'use client';
import { ProfileUser } from '@/model/user';
import useMe from '@/hooks/me';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { id, username } = user;

  const { user: loggedInUser, toggleFollow } = useMe();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isUpdating = isPending || isFetching;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const showButton = loggedInUser && loggedInUser.username !== username;
  const text = isFollowing ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !isFollowing);
    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  return showButton ? (
    <button
      className={`relative flex gap-2 text-sm items-center justify-center rounded-md px-4 py-2 font-bold ${
        isFollowing
          ? 'bg-neutral-200 hover:bg-neutral-300'
          : 'bg-[#0095f6] hover:bg-[#7FCAFA] text-white'
      }`}
      onClick={handleFollow}
      disabled={isUpdating}
    >
      <p className={isUpdating ? 'invisible' : 'visible'}>{text}</p>
      {isUpdating && (
        <div className="position-center">
          <Oval
            color="#fff"
            width={20}
            height={20}
            strokeWidth={4}
            secondaryColor="#d9d9d9"
          />
        </div>
      )}
    </button>
  ) : null;
}
