import { createContext, useContext } from 'react';

type CacheKeyValue = {
  postsKey: string;
};

export const CacheKeysContext = createContext<CacheKeyValue>({
  postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CacheKeysContext);
