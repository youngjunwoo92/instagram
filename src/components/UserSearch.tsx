'use client';
import { useCallback, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import useSWR from 'swr';

import CloseIcon from './ui/icons/CloseIcon';
import UserListItem from './UserListItem';

import useDebounce from '@/hooks/useDebounce';
import { SearchUser } from '@/model/user';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 500);

  const { data: users, isLoading } = useSWR<SearchUser[]>(
    `/api/search/${debouncedKeyword}`,
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setKeyword('');
  }, []);

  return (
    <>
      <div className="relative w-full">
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
      </div>
      {users ? (
        users.length ? (
          <div className="flex flex-col gap-4">
            {users.map((user) => (
              <UserListItem key={user.username} user={user} />
            ))}
          </div>
        ) : (
          <div className="flex">
            <p className="mx-auto text-gray-500">No results found</p>
          </div>
        )
      ) : null}
    </>
  );
}
