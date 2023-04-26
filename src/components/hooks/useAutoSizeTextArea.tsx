'use client';
import { useEffect } from 'react';

export default function useAutoSizeTextArea(
  ref: HTMLTextAreaElement | null,
  value: string,
) {
  useEffect(() => {
    if (ref) {
      ref.style.height = '0px';
      const scrollHeight = ref.scrollHeight;
      ref.style.height = scrollHeight + 'px';
    }
  }, [ref, value]);
}
