import { Tab } from './UserPosts';

type Props = {
  tab: Tab;
  onChange: (tab: Tab) => void;
};

export default function Tabs({ tab, onChange }: Props) {
  return (
    <div className="flex flex-col border-t">
      <div className="flex mx-auto">
        <div
          className={`flex justify-center items-center px-4 py-2 text-sm font-medium tracking-wider cursor-pointer ${
            tab === 'posts' ? 'border-black border-t' : ''
          }`}
          onClick={() => onChange('posts')}
        >
          <p>POSTS</p>
        </div>
        <div
          className={`flex justify-center items-center px-4 py-2 text-sm font-medium tracking-wider cursor-pointer ${
            tab === 'saved' ? 'border-black border-t' : ''
          }`}
          onClick={() => onChange('saved')}
        >
          <p>SAVED</p>
        </div>
      </div>
    </div>
  );
}
