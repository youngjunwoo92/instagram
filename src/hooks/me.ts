import useSWR from 'swr';

import { HomeUser } from '@/model/user';
import { useCallback } from 'react';

async function updateBookmark(id: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, mutate, error } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;

      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...user.bookmarks, postId]
          : user?.bookmarks.filter((bookmark) => bookmark !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });
    },
    [user, mutate],
  );

  return { user, isLoading, error, setBookmark };
}
