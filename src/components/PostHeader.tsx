import Link from 'next/link';
import Avatar from './ui/Avatar';

type Props = {
  username: string;
  avatar: string;
  style?: string;
};

export default function PostHeader({ username, avatar, style }: Props) {
  return (
    <div className={`flex items-center h-[64px] gap-2 px-3 ${style}`}>
      <Link href={`/user/${username}`}>
        <Avatar image={avatar} size="md" />
      </Link>
      <p className="font-medium">{username}</p>
    </div>
  );
}
