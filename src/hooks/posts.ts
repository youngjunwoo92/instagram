import useSWR from 'swr';

import { SimplePost } from '@/model/post';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    mutate,
    error,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
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
  };

  return { posts, isLoading, error, setLike };
}
