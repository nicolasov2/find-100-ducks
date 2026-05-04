'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { SPAWN_POOL_ROOM_1 } from '@/game/rooms/room1';
import { DuckModel } from '@/game/components/DuckModel';

export function Ducks(): React.JSX.Element {
  const ducks = useGameStore((s) => s.ducks);
  const spawnDucks = useGameStore((s) => s.spawnDucks);

  useEffect(() => {
    if (ducks.length === 0) {
      spawnDucks(SPAWN_POOL_ROOM_1);
    }
  }, [ducks.length, spawnDucks]);

  return (
    <group>
      {ducks
        .filter((d) => d.alive)
        .map((d) => (
          <group
            key={d.id}
            position={d.position}
            rotation={d.rotation}
            userData={{ duckId: d.id }}
          >
            <DuckModel useFallback />
          </group>
        ))}
    </group>
  );
}
