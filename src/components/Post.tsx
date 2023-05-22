'use client';
import { useState } from 'react';
import Image from 'next/image';

import ModalPortal from './ModalPortal';
import PostHeader from './PostHeader';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import ActionBar from './ActionBar';

import { Comment, SimplePost } from '@/model/post';
import { parseDate } from '@/util/parseDate';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function Post({ post, priority = false }: Props) {
  const { username, userImage, image, comments, text, createdAt } = post;

  const [isOpen, setIsOpen] = useState(false);
  const { postComment } = usePosts();

  const handleSubmitComment = (comment: Comment) => {
    postComment(post, comment);
  };

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
      <ActionBar post={post} onComment={handleSubmitComment}>
        <p className="inline font-bold">
          <span>{username}</span>
          <span className="ml-2">{text}</span>
        </p>
        <p className="text-[10px] text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
        {comments > 1 && (
          <button
            className="text-sm text-neutral-500"
            onClick={() => setIsOpen(true)}
          >
            View all {comments} comments
          </button>
        )}
      </ActionBar>
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
