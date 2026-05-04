'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';
import { DEATH_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { DyingDuck } from '@/game/types';
import {
  DUCK_BEAK_GEOM,
  DUCK_BODY_GEOM,
  DUCK_HEAD_GEOM,
} from '@/game/components/DuckModel';

export function DyingDucks(): React.JSX.Element {
  const dyingDucks = useGameStore((s) => s.dyingDucks);
  const purge = useGameStore((s) => s.purgeExpiredEffects);

  useFrame(() => {
    const now = Date.now();
    if (dyingDucks.some((d) => now - d.startedAt >= DEATH_DURATION_MS)) {
      purge(now);
    }
  });

  return (
    <group>
      {dyingDucks.map((d) => (
        <DyingDuckMesh key={d.id} duck={d} />
      ))}
    </group>
  );
}

function DyingDuckMesh({ duck }: { duck: DyingDuck }): React.JSX.Element {
  const groupRef = useRef<Group | null>(null);
  const bodyMatRef = useRef<MeshStandardMaterial | null>(null);
  const headMatRef = useRef<MeshStandardMaterial | null>(null);
  const beakMatRef = useRef<MeshStandardMaterial | null>(null);

  useFrame(() => {
    const group = groupRef.current;
    const bodyMat = bodyMatRef.current;
    const headMat = headMatRef.current;
    const beakMat = beakMatRef.current;
    if (!group || !bodyMat || !headMat || !beakMat) return;
    const t = Math.min((Date.now() - duck.startedAt) / DEATH_DURATION_MS, 1);
    const scale =
      t < 0.18 ? 1 + (t / 0.18) * 0.45 : 1.45 - ((t - 0.18) / 0.82) * 1.45;
    group.scale.setScalar(Math.max(0.001, scale * duck.scale));
    group.rotation.y = duck.rotation[1] + t * Math.PI * 4;
    const opacity = Math.max(0, 1 - t);
    bodyMat.opacity = opacity;
    headMat.opacity = opacity;
    beakMat.opacity = opacity;
  });

  return (
    <group ref={groupRef} position={duck.position}>
      <mesh position={[0, 0.1, 0]} geometry={DUCK_BODY_GEOM}>
        <meshStandardMaterial ref={bodyMatRef} color={duck.bodyColor} transparent />
      </mesh>
      <mesh position={[0, 0.21, -0.04]} geometry={DUCK_HEAD_GEOM}>
        <meshStandardMaterial ref={headMatRef} color={duck.bodyColor} transparent />
      </mesh>
      <mesh
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={DUCK_BEAK_GEOM}
      >
        <meshStandardMaterial ref={beakMatRef} color={duck.beakColor} transparent />
      </mesh>
    </group>
  );
}
