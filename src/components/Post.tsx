'use client';

import Image from 'next/image';
import Link from 'next/link';

import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import Avatar from './ui/Avatar';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function Post({ post, priority = false }: Props) {
  const { username, userImage, image, createdAt, likes, text } = post;

  return (
    <article className="flex flex-col border border-[rgb(219, 219, 219)] rounded-md">
      <div className="flex items-center h-[56px] gap-2 px-3">
        <Link href={`/user/${username}`}>
          <Avatar image={userImage} size="md" />
        </Link>
        <p className="font-medium">{username}</p>
      </div>
      <Image
        src={image}
        priority={priority}
        alt="post"
        width={500}
        height={500}
        className="block aspect-square w-full h-auto object-contain bg-neutral-100"
      />
      <ActionBar
        text={text}
        likes={likes}
        username={username}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
