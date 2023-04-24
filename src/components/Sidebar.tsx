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
        <Avatar image={image} width={40} height={40} />
        <div>
          <p className="font-bold font-md">{username}</p>
          <p className="">{name}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {links.map((link, index) => (
          <div key={link.path}>
            {link.label}
            {index < links.length - 1 && <span> | </span>}
          </div>
        ))}
      </div>
    </div>
  );
}
