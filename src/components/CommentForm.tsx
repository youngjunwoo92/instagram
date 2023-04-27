'use client';
import React, { useCallback, useState } from 'react';

import IconButton from './IconButton';
import EmojiIcon from './ui/icons/EmojiIcon';

type Props = {
  border?: boolean;
};

export default function CommentForm({ border }: Props) {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log({ value });
    },
    [value],
  );

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
        <textarea
          rows={1}
          value={value}
          onChange={handleChange}
          placeholder="Add a comment..."
          className="resize-none w-full border-none outline-none overflow-auto scrollbar-hide px-2 text-sm placeholder-text-bold"
        />
      </div>
      <button type="submit" className="font-bold text-[#0095F6]">
        Post
      </button>
    </form>
  );
}
