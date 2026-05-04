'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { useGameStore } from '@/store/gameStore';
import { SPAWN_POOL_ALL } from '@/game/utils/spawnPoolAll';
import { DuckModel } from '@/game/components/DuckModel';

const BOB_AMPLITUDE = 0.025;
const BOB_FREQ = 1.5;
const GLOW_DISTANCE = 5; // ducks start glowing within 5m
const GLOW_FADE_START = 3; // full glow within 3m

const _duckPos = new Vector3();

export function Ducks(): React.JSX.Element {
  const ducks = useGameStore((s) => s.ducks);
  const spawnDucks = useGameStore((s) => s.spawnDucks);
  const containerRef = useRef<Group | null>(null);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    if (ducks.length === 0) {
      spawnDucks(SPAWN_POOL_ALL);
    }
  }, [ducks.length, spawnDucks]);

  useFrame((state) => {
    const container = containerRef.current;
    if (!container) return;
    const t = state.clock.elapsedTime;
    const children = container.children;
    const camPos = camera.position;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const duck = ducks[i];
      if (!child || !duck) continue;

      // Bob animation
      const phase = duck.rotation[1];
      child.position.y =
        duck.position[1] + Math.sin(t * BOB_FREQ + phase) * BOB_AMPLITUDE;

      // Proximity glow — update emissive on body mesh
      _duckPos.set(duck.position[0], duck.position[1], duck.position[2]);
      const dist = camPos.distanceTo(_duckPos);

      if (dist < GLOW_DISTANCE) {
        const glowIntensity =
          dist < GLOW_FADE_START
            ? 1
            : 1 - (dist - GLOW_FADE_START) / (GLOW_DISTANCE - GLOW_FADE_START);
        // Pulsing glow
        const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 4 + phase));
        const finalGlow = glowIntensity * pulse;

        // Walk the children of the duck group to find body mesh
        child.traverse((obj) => {
          if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
            obj.material.emissiveIntensity = finalGlow * 0.6;
            obj.material.emissive.setHex(0xfef3c7);
          }
        });
      } else {
        // Reset emissive when far
        child.traverse((obj) => {
          if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
            obj.material.emissiveIntensity = 0;
          }
        });
      }
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
          <DuckModel
            useFallback
            bodyColor={d.bodyColor}
            beakColor={d.beakColor}
            duckScale={d.scale}
          />
        </group>
      ))}
    </group>
  );
}
