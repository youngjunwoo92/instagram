import FollowButton from './FollowButton';
import Avatar from './ui/Avatar';

import { ProfileUser } from '@/model/user';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, name, following, posts, followers, username } = user;

  const info = [
    { label: 'posts', data: posts },
    { label: 'followers', data: followers },
    { label: 'following', data: following },
  ];

  return (
    <div className="flex w-full py-8">
      <div className="w-1/3">
        <Avatar image={image} size="2xl" />
      </div>
      <div className="flex flex-col w-2/3 gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-lg font-bold">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-4">
          {info.map(({ label, data }, index) => (
            <li key={index}>
              <span className="font-bold">{data}</span> {label}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </div>
  );
}
