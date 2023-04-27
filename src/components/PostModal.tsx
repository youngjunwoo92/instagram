import CloseIcon from './ui/icons/CloseIcon';
import ModalPortal from './ModalPortal';
import IconButton from './IconButton';

import { SimplePost } from '@/model/post';
import PostDetail from './PostDetail';

type Props = {
  post: SimplePost;
  onClose: () => void;
};

export default function PostModal({ onClose, post }: Props) {
  return (
    <ModalPortal>
      <section
        className="fixed inset-0 bg-[rgba(0,0,0,0.54)] z-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <PostDetail post={post} />
        <div className="absolute right-0 top-0 transform -translate-x-3/4 translate-y-3/4">
          <IconButton onClick={onClose}>
            <CloseIcon color="#fff" />
          </IconButton>
        </div>
      </section>
    </ModalPortal>
  );
}
