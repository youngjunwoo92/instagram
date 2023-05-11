import Link from 'next/link';

import Avatar, { AvatarSize } from './ui/Avatar';
import { SearchUser } from '@/model/user';

type Props = {
  user: SearchUser;
  highlight?: boolean;
  size?: AvatarSize;
};

export default function UserListItem({
  size = 'md',
  highlight = false,
  user: { username, image, name },
}: Props) {
  return (
    <Link href={`/user/${username}`} className="flex gap-4 items-center">
      <Avatar image={image} size={size} highlight={highlight} />
      <div className="flex flex-col">
        <p className="font-medium">{username}</p>
        <p className="text-sm">{name}</p>
      </div>
    </Link>
  );
}
