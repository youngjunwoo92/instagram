'use client';
import Skeleton from 'react-loading-skeleton';

export default function PostFallback({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <article
            key={index}
            className="flex flex-col border border-[rgb(219, 219, 219)]"
          >
            <div className="flex items-center gap-2 p-2">
              <Skeleton circle width={40} height={40} />
              <div className="w-full">
                <Skeleton />
                <Skeleton width="50%" />
              </div>
            </div>

            <div className="w-full">
              <Skeleton
                style={{ aspectRatio: '1 / 1', width: '100%', height: 'auto' }}
              />
            </div>
            <div className="w-full p-2 mt-2">
              <Skeleton />
              <Skeleton />
              <Skeleton width="50%" />
            </div>
          </article>
        ))}
    </>
  );
}
