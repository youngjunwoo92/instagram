import AccountIcon from './icons/AccountIcon';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Props = {
  image?: string | null;
  width?: Number;
  height?: Number;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'md',
  highlight = false,
}: Props) {
  return image ? (
    <div className={getContainerStyle(size, highlight)}>
      <img
        alt="avatar"
        src={image}
        className={`rounded-full object-cover w-full h-full ${
          highlight ? 'p-[2px] bg-[#fff]' : ''
        }`}
      />
    </div>
  ) : (
    <AccountIcon
      className={`${getContainerStyle(size, false)} text-neutral-300`}
    />
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const base = `rounded-full flex justify-center items-center`;
  const highlightStyle = highlight
    ? `bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[3px]`
    : '';
  const sizeStyle = (function () {
    switch (size) {
      case 'sm':
        return 'w-[32px] h-[32px]';
      case 'md':
        return 'w-[40px] h-[40px]';
      case 'lg':
        return 'w-[48px] h-[48px]';
      case 'xl':
        return 'w-[64px] h-[64px]';
      case '2xl':
        return 'w-24 h-24 md:w-36 md:h-36';
      default:
        return 'w-[32px] h-[32px]';
    }
  })();

  return `${base} ${highlightStyle} ${sizeStyle}`;
}
