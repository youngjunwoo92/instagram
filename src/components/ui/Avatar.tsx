type Props = { image?: string | null; width?: Number; height?: Number };

export default function Avatar({ image, width, height }: Props) {
  const w = `${width ? width : 32}px`;
  const h = `${height ? height : 32}px`;

  return (
    <div className={`w-[${w}] h-[${h}] rounded-full overflow-hidden`}>
      <img alt="avatar" src={image ?? undefined} />
    </div>
  );
}
