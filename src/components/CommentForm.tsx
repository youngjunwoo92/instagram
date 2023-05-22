import React, { FormEvent, useState } from 'react';

import EmojiIcon from './ui/icons/EmojiIcon';
import IconButton from './IconButton';

type Props = {
  border?: boolean;
  onSubmit: (comment: string) => void;
};

export default function CommentForm({ border, onSubmit }: Props) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-3 flex items-center justify-between ${
        border ? 'border-t border-[rgb(219, 219, 219)]' : ''
      }`}
    >
      <div className="w-full flex items-center gap-2">
        <IconButton>
          <EmojiIcon />
        </IconButton>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a comment..."
          className="resize-none w-full border-none outline-none overflow-auto scrollbar-hide px-2 text-sm placeholder-text-bold"
        />
      </div>
      <button
        type="submit"
        className="font-bold text-[#0095F6] disabled:opacity-[40%]"
        disabled={!value}
      >
        Post
      </button>
    </form>
  );
}
