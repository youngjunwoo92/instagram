import Avatar from './ui/Avatar';
import { User } from '@/model/user';

const links = [
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Help',
    path: '/help',
  },
  {
    label: 'Press',
    path: '/press',
  },
  {
    label: 'Jobs',
    path: '/jobs',
  },
  {
    label: 'Privacy',
    path: '/privacy',
  },
  {
    label: 'Terms',
    path: '/terms',
  },
  {
    label: 'Location',
    path: '/location',
  },
  {
    label: 'Language',
    path: '/language',
  },
];

type Props = {
  user: User;
};

export default function Sidebar({ user: { name, username, image } }: Props) {
  return (
    <div className="ml-auto p-2 flex flex-col">
      <div className="flex gap-2 items-center">
        <Avatar image={image} size="lg" />
        <div>
          <p className="font-bold text-lg">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <div className="flex flex-wrap mt-4 text-neutral-500 text-sm">
        {links.map((link, index) => (
          <div key={link.path}>
            {link.label}
            {index < links.length - 1 && <span className="mx-1">|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
