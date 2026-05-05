'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';
import { DEATH_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { DyingGnome } from '@/game/types';
import {
  GNOME_BEAK_GEOM,
  GNOME_BODY_GEOM,
  GNOME_HEAD_GEOM,
} from '@/game/components/GnomeModel';

export function DyingGnomes(): React.JSX.Element {
  const dyingGnomes = useGameStore((s) => s.dyingGnomes);
  const purge = useGameStore((s) => s.purgeExpiredEffects);

  useFrame(() => {
    const now = Date.now();
    if (dyingGnomes.some((d) => now - d.startedAt >= DEATH_DURATION_MS)) {
      purge(now);
    }
  });

  return (
    <group>
      {dyingGnomes.map((d) => (
        <DyingGnomeMesh key={d.id} gnome={d} />
      ))}
    </group>
  );
}

function DyingGnomeMesh({ gnome }: { gnome: DyingGnome }): React.JSX.Element {
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
    const t = Math.min((Date.now() - gnome.startedAt) / DEATH_DURATION_MS, 1);
    const scale =
      t < 0.18 ? 1 + (t / 0.18) * 0.45 : 1.45 - ((t - 0.18) / 0.82) * 1.45;
    group.scale.setScalar(Math.max(0.001, scale * gnome.scale));
    group.rotation.y = gnome.rotation[1] + t * Math.PI * 4;
    const opacity = Math.max(0, 1 - t);
    bodyMat.opacity = opacity;
    headMat.opacity = opacity;
    beakMat.opacity = opacity;
  });

  return (
    <group ref={groupRef} position={gnome.position}>
      <mesh position={[0, 0.1, 0]} geometry={GNOME_BODY_GEOM}>
        <meshStandardMaterial ref={bodyMatRef} color={gnome.bodyColor} transparent />
      </mesh>
      <mesh position={[0, 0.21, -0.04]} geometry={GNOME_HEAD_GEOM}>
        <meshStandardMaterial ref={headMatRef} color={gnome.bodyColor} transparent />
      </mesh>
      <mesh
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={GNOME_BEAK_GEOM}
      >
        <meshStandardMaterial ref={beakMatRef} color={gnome.beakColor} transparent />
      </mesh>
    </group>
  );
}
