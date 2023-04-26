'use client';
import Skeleton from 'react-loading-skeleton';

export default function FollowingFallback({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <article key={index} className="flex flex-col">
            <Skeleton circle width={48} height={48} />
            <Skeleton />
          </article>
        ))}
    </>
  );
}
