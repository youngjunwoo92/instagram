import { FaHeart } from 'react-icons/fa';

export default function HeartActiveIcon({ red }: { red?: boolean }) {
  return <FaHeart className={`w-7 h-7 ${red && 'fill-red-500'}`} />;
}
