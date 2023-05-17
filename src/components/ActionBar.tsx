'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import BookmarkActiveIcon from './ui/icons/BookmarkActiveIcon';
import HeartActiveIcon from './ui/icons/HeartActiveIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import IconButton from './IconButton';

import { parseDate } from '@/util/parseDate';
import { SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { likes, username, createdAt, text } = post;

  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;

  const [bookmarked, setBookmarked] = useState(false);

  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-2 px-3 py-1">
        <div className="flex gap-4">
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            offIcon={<HeartIcon />}
            onIcon={<HeartActiveIcon />}
          />
          <IconButton>
            <CommentIcon />
          </IconButton>
        </div>
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          offIcon={<BookmarkIcon />}
          onIcon={<BookmarkActiveIcon />}
        />
      </div>
      <div className="p-3">
        {likes.length === 0 ? null : (
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
