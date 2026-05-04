'use client';

import { useEffect, useState } from 'react';

export function LockOverlay(): React.JSX.Element | null {
  const [locked, setLocked] = useState<boolean>(false);

  useEffect(() => {
    const update = (): void => {
      setLocked(document.pointerLockElement !== null);
    };
    update();
    document.addEventListener('pointerlockchange', update);
    return () => {
      document.removeEventListener('pointerlockchange', update);
    };
  }, []);

  if (locked) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
      <div className="rounded-md border border-white/20 bg-black/60 px-6 py-3 text-sm tracking-wide">
        Haz click para jugar — WASD para moverte, Esc para salir
      </div>
    </div>
  );
}
