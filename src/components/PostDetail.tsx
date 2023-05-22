'use client';
import Image from 'next/image';
import useSWR from 'swr';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostHeader from './PostHeader';
import ActionBar from './ActionBar';

import { FullPost, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const { postComment } = usePosts();

  const comments = data?.comments ?? [];

  const handleSubmitComment = (comment: string) => {
    postComment(post, comment);
  };

  return (
    <article className="flex flex-col md:flex-row w-full h-full">
      <div className="relative basis-3/5 flex items-center justify-center">
        <Image
          fill
          priority
          src={image}
          alt="post"
          sizes="650px"
          className="object-contain bg-neutral-100"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostHeader username={username} avatar={userImage} />
        <CommentList comments={comments} author={username} />
        <div>
          <ActionBar post={post} />
          <CommentForm onSubmit={handleSubmitComment} />
        </div>
      </div>
    </article>
  );
}
