type Props = { image?: 'string' | null };

export default function Avatar({ image }: Props) {
  return (
    <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
      <img alt="avatar" src={image ?? undefined} />
    </div>
  );
}
