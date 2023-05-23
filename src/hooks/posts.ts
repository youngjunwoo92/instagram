import { useCallback } from 'react';
import useSWR from 'swr';

import { Comment, SimplePost } from '@/model/post';

import { useCacheKeys } from '@/context/CacheKeysContext';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts(cacheKey: string = '/api/posts') {
  const cacheKeys = useCacheKeys();

  const {
    data: posts,
    isLoading,
    mutate,
    error,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPosts = posts?.map((p) =>
        p.id === post.id
          ? {
              ...post,
              likes: like
                ? [...post.likes, username]
                : post.likes.filter((item) => item !== username),
            }
          : p,
      );

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });
    },
    [posts, mutate],
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPosts = posts?.map((p) =>
        p.id === post.id
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : p,
      );

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });
    },
    [posts, mutate],
  );

  return { posts, isLoading, error, setLike, postComment };
}
