import { useRef, useEffect, LegacyRef } from 'react';

type Ref = LegacyRef<HTMLDivElement> | undefined;

export function useClickOutside(callback: () => void) {
  const ref = useRef() as Ref;

  useEffect(() => {
    const handleClick = () => {
      callback();
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return ref;
}
