import { useRef, useEffect } from 'react';

export function useClickOutside(callback: () => void) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      callback();
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return ref;
}
