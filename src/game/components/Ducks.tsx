'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useGameStore } from '@/store/gameStore';
import { SPAWN_POOL_ROOM_1 } from '@/game/rooms/room1';
import { DuckModel } from '@/game/components/DuckModel';

const BOB_AMPLITUDE = 0.025;
const BOB_FREQ = 1.5;

export function Ducks(): React.JSX.Element {
  const ducks = useGameStore((s) => s.ducks);
  const spawnDucks = useGameStore((s) => s.spawnDucks);
  const containerRef = useRef<Group | null>(null);

  useEffect(() => {
    if (ducks.length === 0) {
      spawnDucks(SPAWN_POOL_ROOM_1);
    }
  }, [ducks.length, spawnDucks]);

  useFrame((state) => {
    const container = containerRef.current;
    if (!container) return;
    const t = state.clock.elapsedTime;
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const duck = ducks[i];
      if (!child || !duck) continue;
      const phase = duck.rotation[1];
      child.position.y =
        duck.position[1] + Math.sin(t * BOB_FREQ + phase) * BOB_AMPLITUDE;
    }
  });

  return (
    <group ref={containerRef}>
      {ducks.map((d) => (
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
