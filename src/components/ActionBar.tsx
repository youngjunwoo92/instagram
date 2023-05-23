import BookmarkActiveIcon from './ui/icons/BookmarkActiveIcon';
import HeartActiveIcon from './ui/icons/HeartActiveIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import CommentIcon from './ui/icons/CommentIcon';
import HeartIcon from './ui/icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import CommentForm from './CommentForm';
import IconButton from './IconButton';

import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
  cacheKey?: string | undefined;
};

export default function ActionBar({
  children,
  post,
  cacheKey,
  onComment,
}: Props) {
  const { likes } = post;

  const { user, setBookmark } = useMe();
  const { setLike } = usePosts(cacheKey);

  const bookmarked = user ? user.bookmarks.includes(post.id) : false;
  const liked = user ? likes.includes(user.username) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(post.id, bookmark);
  };

  const handleSubmitComment = (comment: string) => {
    user &&
      onComment({
        comment,
        username: user.username,
        image: user.image,
      });
  };

  return (
    <>
      <div className="flex justify-between items-center mt-2 px-3 py-1">
        <div className="flex gap-4">
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            offIcon={<HeartIcon />}
            onIcon={<HeartActiveIcon red />}
          />
          <IconButton>
            <CommentIcon />
          </IconButton>
        </div>
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
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
        {children}
      </div>
      <CommentForm onSubmit={handleSubmitComment} />
    </>
  );
}
