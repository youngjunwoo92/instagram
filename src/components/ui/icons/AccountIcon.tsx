import { MdAccountCircle } from 'react-icons/md';

export default function AccountIcon({ className }: { className?: string }) {
  return (
    <MdAccountCircle
      className={className ? className : 'w-7 h-7 text-neutral-400'}
    />
  );
}
