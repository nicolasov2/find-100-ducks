'use client';

import { useGameStore } from '@/store/gameStore';
import { SPAWN_POOL_ROOM_1 } from '@/game/rooms/room1';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function WinScreen(): React.JSX.Element | null {
  const status = useGameStore((s) => s.status);
  const startedAt = useGameStore((s) => s.startedAt);
  const endedAt = useGameStore((s) => s.endedAt);
  const reset = useGameStore((s) => s.reset);
  const spawnDucks = useGameStore((s) => s.spawnDucks);

  if (status !== 'won') return null;

  const elapsed =
    startedAt !== null && endedAt !== null ? endedAt - startedAt : 0;

  const playAgain = (): void => {
    reset();
    spawnDucks(SPAWN_POOL_ROOM_1);
  };

  return (
    <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center bg-black/70 text-white">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-white/20 bg-zinc-900/90 px-10 py-8">
        <h2 className="text-3xl font-semibold tracking-tight">¡Encontraste los 100!</h2>
        <p className="font-mono text-2xl text-yellow-300">{formatElapsed(elapsed)}</p>
        <button
          type="button"
          onClick={playAgain}
          className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-medium text-zinc-950 transition hover:bg-yellow-300"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
