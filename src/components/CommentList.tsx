import React from 'react';
import { Comment } from '@/model/post';
import Avatar from './ui/Avatar';
import { parseDate } from '@/util/parseDate';

type Props = {
  comments: Comment[];
  author: string;
};

export default function CommentList({ comments, author }: Props) {
  return (
    <ul className="grow p-3 border-t border-b border-[rgb(219, 219, 219)] overflow-y-scroll">
      {comments.map(({ image, username, comment, createdAt }, index) => (
        <li key={index} className="flex gap-4 items-start">
          <Avatar image={image} highlight={username === author} />
          <div>
            <p className="text-sm">
              <span className="font-bold">{username}</span>
              <span className="ml-2">{comment}</span>
            </p>
            <p className="text-[10px] uppercase text-neutral-500">
              {parseDate(createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
