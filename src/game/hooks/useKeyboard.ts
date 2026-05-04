'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useKeyboard(): RefObject<Set<string>> {
  const keysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const keys = keysRef.current;

    const handleDown = (event: KeyboardEvent): void => {
      keys.add(event.key.toLowerCase());
    };
    const handleUp = (event: KeyboardEvent): void => {
      keys.delete(event.key.toLowerCase());
    };
    const handleBlur = (): void => {
      keys.clear();
    };

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
      window.removeEventListener('blur', handleBlur);
      keys.clear();
    };
  }, []);

  return keysRef;
}
