import Image from 'next/image';

import CommentForm from './CommentForm';
import PostHeader from './PostHeader';
import ActionBar from './ActionBar';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  priority?: boolean;
  onClick: (id: string) => void;
};

export default function Post({ post, onClick, priority = false }: Props) {
  const { id, username, userImage, image, createdAt, likes, text } = post;

  return (
    <article className="flex flex-col border border-[rgb(219, 219, 219)] rounded-md">
      <PostHeader username={username} avatar={userImage} />
      <Image
        src={image}
        priority={priority}
        alt="post"
        width={500}
        height={500}
        className="block aspect-square w-full h-auto object-contain bg-neutral-100 cursor-pointer"
        onClick={() => onClick(id)}
      />
      <ActionBar
        text={text}
        likes={likes}
        username={username}
        createdAt={createdAt}
      />
      <CommentForm border />
    </article>
  );
}
