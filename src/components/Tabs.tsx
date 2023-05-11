import { AuthUser } from '@/model/user';
import { Tab } from './UserPosts';
import PostIcon from './ui/icons/PostIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';

type Props = {
  tab: Tab;
  onChange: (tab: Tab) => void;
  isMyProfile: boolean | null | undefined;
};

export default function Tabs({ tab, onChange, isMyProfile }: Props) {
  return (
    <div className="flex flex-col border-t">
      <div className="flex mx-auto">
        <div
          className={`flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium tracking-wider cursor-pointer ${
            tab === 'posts' ? 'border-black border-t' : ''
          }`}
          onClick={() => onChange('posts')}
        >
          <PostIcon className="w-3 h-3" />
          <p>POSTS</p>
        </div>
        {isMyProfile && (
          <div
            className={`flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium tracking-wider cursor-pointer ${
              tab === 'saved' ? 'border-black border-t' : ''
            }`}
            onClick={() => onChange('saved')}
          >
            <BookmarkIcon className="w-3 h-3" />
            <p>SAVED</p>
          </div>
        )}
      </div>
    </div>
  );
}
