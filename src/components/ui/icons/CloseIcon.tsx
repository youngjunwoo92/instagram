import { IoClose } from 'react-icons/io5';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | undefined;

type Props = {
  size?: IconSize;
  color?: string;
};

export default function CloseIcon({ size, color }: Props) {
  return (
    <IoClose
      className={`${getSizeStyle(size)}`}
      style={{ color: color && color }}
    />
  );
}

function getSizeStyle(size: IconSize) {
  const sizeStyle = (function () {
    switch (size) {
      case 'sm':
        return 'w-5 h-5';
      case 'md':
        return 'w-7 h-7';
      case 'lg':
        return 'w-9 h-9';
      case 'xl':
        return 'w-10 h-10';
      default:
        return 'w-7 h-7';
    }
  })();
  return sizeStyle;
}
