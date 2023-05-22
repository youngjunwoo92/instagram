import Avatar from './ui/Avatar';

import { parseDate } from '@/util/parseDate';
import { Comment } from '@/model/post';

type Props = {
  comments: Comment[];
  author: string;
};

export default function CommentList({ comments, author }: Props) {
  return (
    <ul className="grow p-3 border-t border-b border-[rgb(219, 219, 219)] overflow-y-scroll">
      {comments.map(({ image, username, comment }, index) => (
        <li key={index} className="flex gap-2 items-center mb-2">
          <Avatar size="sm" image={image} highlight={username === author} />
          <div>
            <p className="text-sm">
              <span className="font-bold">{username}</span>
              <span className="ml-2">{comment}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
