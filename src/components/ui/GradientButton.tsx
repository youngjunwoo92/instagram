type Props = {
  text: string;
  onClick: () => void;
};

export default function GradientButton({ text, onClick }: Props) {
  return (
    <button
      className="px-4 font-bold py-2 text-white rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
