'use client';
import { ProfileUser } from '@/model/user';
import useMe from '@/hooks/me';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { id, username } = user;

  const { user: loggedInUser, toggleFollow } = useMe();

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const showButton = loggedInUser && loggedInUser.username !== username;
  const text = isFollowing ? 'Unfollow' : 'Follow';

  const handleFollow = () => {
    toggleFollow(id, !isFollowing);
  };

  return showButton ? (
    <button
      className={`flex text-sm items-center justify-center rounded-md px-4 py-2 font-bold ${
        isFollowing
          ? 'bg-neutral-200 hover:bg-neutral-300'
          : 'bg-[#0095f6] hover:bg-[#7FCAFA] text-white'
      }`}
      onClick={handleFollow}
    >
      {text}
    </button>
  ) : null;
}
