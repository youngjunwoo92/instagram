'use client';
import { ProfileUser } from '@/model/user';
import useMe from '@/hooks/me';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;

  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing = loggedInUser?.following.map(
    (item) => item.username === username,
  );
  const text = isFollowing ? 'Unfollow' : 'Follow';

  return showButton ? (
    <button
      className={`flex text-sm items-center justify-center rounded-md px-4 py-2 font-bold ${
        isFollowing
          ? 'bg-neutral-200 hover:bg-neutral-300'
          : 'bg-[#0095f6] hover:bg-[#7FCAFA] text-white'
      }`}
    >
      {text}
    </button>
  ) : null;
}
