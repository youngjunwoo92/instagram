'use client';

type Props = {
  children: React.ReactElement;
  onClick?: (e: React.MouseEvent) => void;
};

export default function IconButton({ children, onClick }: Props) {
  return (
    <button
      className="rounded-full aspect-square flex justify-center items-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
