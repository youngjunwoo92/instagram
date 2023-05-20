import Image from 'next/image';

import HeartActiveIcon from './ui/icons/HeartActiveIcon';
import CommentActiveIcon from './ui/icons/CommentActiveIcon';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  onClick: (id: string) => void;
  priority?: boolean;
  isMyProfile: boolean;
};

export default function PostThumbnail({
  post: { id, image, likes, comments },
  priority,
  onClick,
  isMyProfile,
}: Props) {
  console.log({ likes });
  return (
    <div
      className="relative aspect-square cursor-pointer"
      onClick={() => onClick(id)}
    >
      <Image
        priority={priority}
        className="w-full h-full object-cover"
        src={image}
        alt="thumbnail"
        width={650}
        height={650}
      />
      <div className="bg-[rgba(0,0,0,0.28)] absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
        <div className="flex justify-around gap-4">
          <div className="flex gap-2 text-white">
            <HeartActiveIcon />
            <p>{likes?.length === 0 ? null : likes.length}</p>
          </div>
          <div className="flex gap-2 text-white">
            <CommentActiveIcon />
            <p>{comments ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
