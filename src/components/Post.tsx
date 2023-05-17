'use client';
import { useState } from 'react';
import Image from 'next/image';

import ModalPortal from './ModalPortal';
import CommentForm from './CommentForm';
import PostHeader from './PostHeader';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import ActionBar from './ActionBar';

import { SimplePost } from '@/model/post';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function Post({ post, priority = false }: Props) {
  const { username, userImage, image } = post;

  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => setIsOpen(true)}
      />
      <ActionBar post={post} />
      <CommentForm border />
      {isOpen && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpen(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
