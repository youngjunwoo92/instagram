import { useMemo } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function GradientButton({
  text,
  onClick,
  size = 'sm',
  fullWidth = false,
}: Props) {
  const style = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'py-1 px-2';
      case 'md':
        return 'py-2 px-4';
      case 'lg':
        return 'py-3 px-6';
      default:
        return null;
    }
  }, [size]);

  return (
    <button
      className={`font-bold text-white rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 hover:opacity-90 transition-opacity ${style} ${
        fullWidth && 'w-full py-4 text-lg'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
