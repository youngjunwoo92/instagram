import { BsGrid3X3 } from 'react-icons/bs';

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <BsGrid3X3 className={className || 'w-7 h-7'} />;
}
