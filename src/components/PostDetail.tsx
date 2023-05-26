'use client';
import Image from 'next/image';

import CommentList from './CommentList';
import PostHeader from './PostHeader';
import ActionBar from './ActionBar';

import { Comment, SimplePost } from '@/model/post';
import usePost from '@/hooks/post';

type Props = {
  post: SimplePost;
  cacheKey?: string;
};

export default function PostDetail({ post, cacheKey }: Props) {
  const { id, userImage, username, image } = post;

  const { post: data, postComment } = usePost(id);

  const comments = data?.comments ?? [];

  const handlePostComment = (comment: Comment) => {
    postComment(comment);
  };

  return (
    <article className="flex flex-col md:flex-row w-full h-full">
      <div className="h-1/2 md:h-full relative max-width-[320px] bg-neutral-200 w-full align-center">
        <Image
          fill
          priority
          src={image}
          alt="post"
          sizes="650px"
          className="object-contain aspect-square"
        />
      </div>
      <div className="w-full flex flex-col">
        <PostHeader username={username} avatar={userImage} />
        <CommentList comments={comments} author={username} />
        <div>
          <ActionBar
            post={post}
            onComment={handlePostComment}
            cacheKey={cacheKey}
          />
        </div>
      </div>
    </article>
  );
}
