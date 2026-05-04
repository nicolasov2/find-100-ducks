'use client';

import { useEffect, useState } from 'react';
import { useGameStore, DUCK_TARGET } from '@/store/gameStore';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

export function HUD(): React.JSX.Element {
  const status = useGameStore((s) => s.status);
  const startedAt = useGameStore((s) => s.startedAt);
  const endedAt = useGameStore((s) => s.endedAt);
  const remaining = useGameStore((s) => s.ducks.filter((d) => d.alive).length);
  const found = DUCK_TARGET - remaining;

  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 100);
    return () => {
      window.clearInterval(id);
    };
  }, [status]);

  const elapsed = startedAt === null ? 0 : (endedAt ?? now) - startedAt;

  return (
    <div className="pointer-events-none absolute inset-0 select-none text-white">
      <div className="absolute left-4 top-4 rounded-md bg-black/55 px-3 py-1.5 font-mono text-sm tracking-wide">
        Patitos {found.toString().padStart(3, '0')} / {DUCK_TARGET}
      </div>
      <div className="absolute right-4 top-4 rounded-md bg-black/55 px-3 py-1.5 font-mono text-sm tracking-wide">
        {formatElapsed(elapsed)}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-4 w-4">
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-white/80" />
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-white/80" />
        </div>
      </div>
    </div>
  );
}
