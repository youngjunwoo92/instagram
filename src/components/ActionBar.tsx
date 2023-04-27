import BookmarkIcon from './ui/icons/BookmarkIcon';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import IconButton from './IconButton';
import { parseDate } from '@/util/parseDate';

type Props = {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mt-2 px-3 py-1">
        <div className="flex gap-4">
          <IconButton>
            <HeartIcon />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </div>
      </div>
      <div className="p-3">
        {likes?.length && (
          <p className="mb-1 font-bold">
            {likes.length === 1 ? '1 like' : `${likes.length} likes`}
          </p>
        )}
        <p className="inline font-bold">
          <span>{username}</span>
          <span className="ml-2">{text}</span>
        </p>
        <p className="text-[10px] text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
