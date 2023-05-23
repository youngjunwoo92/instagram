import CloseIcon from './ui/icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function UploadModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 transform -translate-x-[100%] translate-y-1/2"
        onClick={onClose}
      >
        <CloseIcon color="#fff" />
      </button>
      <div className="bg-white w-4/5 max-w-xl min-h-[66.66%] rounded-lg">
        {children}
      </div>
    </section>
  );
}
