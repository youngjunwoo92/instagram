import { FaPhotoVideo } from 'react-icons/fa';

export default function CloudIcon({ dragging }: { dragging: boolean }) {
  return (
    <FaPhotoVideo
      className={`w-[96px] h-[96px] ${
        dragging ? 'text-[#0095f6]' : 'text-neutral-300'
      }`}
    />
  );
}
