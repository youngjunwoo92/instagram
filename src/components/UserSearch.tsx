'use client';
import { useCallback, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import useSWR from 'swr';

import { UserSearchResult } from '@/model/user';
import useDebounce from '@/hooks/useDebounce';
import CloseIcon from './ui/icons/CloseIcon';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: users, isLoading } = useSWR<UserSearchResult[]>(
    debouncedKeyword.length > 1 ? `/api/search/${debouncedKeyword}` : null,
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setKeyword('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <form className="relative w-full">
        <input
          autoFocus
          value={keyword}
          type="text"
          className="w-full bg-[#efefef] rounded-sm outlined-none border-none focus:outline-none text-md p-2"
          placeholder="Search..."
          onChange={handleChange}
        />

        {isLoading ? (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2">
            <RotatingLines width="1.75rem" strokeColor="rgb(156, 163, 175)" />
          </div>
        ) : (
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-400 rounded-full"
            onClick={handleClick}
          >
            <CloseIcon color="#fff" size="sm" />
          </button>
        )}
      </form>
      {users ? (
        users.length ? (
          <ul className="grow">
            {users.map((user) => (
              <li key={user.username}></li>
            ))}
          </ul>
        ) : (
          <div className="flex grow">
            <p className="mx-auto text-gray-500">No results found</p>
          </div>
        )
      ) : null}
    </div>
  );
}
