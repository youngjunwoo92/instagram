'use client';
import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import Avatar from './ui/Avatar';
import CommentForm from './CommentForm';
import PostHeader from './PostHeader';
import ActionBar from './ActionBar';
import { parseDate } from '@/util/parseDate';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);

  const comments = data?.comments ?? [];

  return (
    <article className="max-w-5xl w-full min-h-[640px] max-h-[650px] bg-white flex flex-col md:flex-row position-center">
      <div className="w-1/2 flex justify-center items-center bg-neutral-100">
        <Image
          priority
          src={image}
          alt="post"
          width={800}
          height={800}
          className="object-contain w-full height-auto bg-neutral-100"
        />
      </div>
      <div className="w-1/2 flex flex-col">
        <PostHeader username={username} avatar={userImage} style="shrink-0" />
        <ul className="grow p-3 border-t border-b border-[rgb(219, 219, 219)] overflow-y-scroll">
          {comments.map(
            ({ image, username: commentUsername, comment }, index) => (
              <li key={index} className="flex gap-4 items-start">
                <div>
                  <Avatar
                    image={image}
                    highlight={username === commentUsername}
                  />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-bold">{commentUsername}</span>
                    <span className="ml-2">{comment}</span>
                  </p>
                  <p className="text-[10px] uppercase text-neutral-500">
                    {parseDate(createdAt)}
                  </p>
                </div>
              </li>
            ),
          )}
        </ul>
        <div>
          <ActionBar likes={likes} username={username} createdAt={createdAt} />
          <CommentForm />
        </div>
      </div>
    </article>
  );
}
