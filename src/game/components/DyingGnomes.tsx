'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';
import { DEATH_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { DyingGnome } from '@/game/types';
import {
  GNOME_BASE_GEOM,
  GNOME_BODY_GEOM,
  GNOME_HAT_GEOM,
  GNOME_HEAD_GEOM,
  GNOME_BEARD_GEOM,
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
  const baseMatRef = useRef<MeshStandardMaterial | null>(null);
  const bodyMatRef = useRef<MeshStandardMaterial | null>(null);
  const headMatRef = useRef<MeshStandardMaterial | null>(null);
  const beardMatRef = useRef<MeshStandardMaterial | null>(null);
  const hatMatRef = useRef<MeshStandardMaterial | null>(null);

  const beardScaleY = gnome.beardStyle === 'long' ? 1.6 : 0.6;
  const beardOffsetY = gnome.beardStyle === 'long' ? 0.20 : 0.22;

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const t = Math.min((Date.now() - gnome.startedAt) / DEATH_DURATION_MS, 1);
    const scale =
      t < 0.18 ? 1 + (t / 0.18) * 0.45 : 1.45 - ((t - 0.18) / 0.82) * 1.45;
    group.scale.setScalar(Math.max(0.001, scale * gnome.scale));
    group.rotation.y = gnome.rotation[1] + t * Math.PI * 4;
    const opacity = Math.max(0, 1 - t);
    if (baseMatRef.current) baseMatRef.current.opacity = opacity;
    if (bodyMatRef.current) bodyMatRef.current.opacity = opacity;
    if (headMatRef.current) headMatRef.current.opacity = opacity;
    if (beardMatRef.current) beardMatRef.current.opacity = opacity;
    if (hatMatRef.current) hatMatRef.current.opacity = opacity;
  });

  return (
    <group ref={groupRef} position={gnome.position}>
      <mesh position={[0, 0.02, 0]} geometry={GNOME_BASE_GEOM}>
        <meshStandardMaterial ref={baseMatRef} color="#1f1f23" transparent />
      </mesh>
      <mesh position={[0, 0.13, 0]} geometry={GNOME_BODY_GEOM}>
        <meshStandardMaterial ref={bodyMatRef} color={gnome.bodyColor} transparent />
      </mesh>
      <mesh position={[0, 0.26, 0]} geometry={GNOME_HEAD_GEOM}>
        <meshStandardMaterial ref={headMatRef} color="#fde0a8" transparent />
      </mesh>
      {gnome.beardStyle !== 'none' && (
        <mesh
          position={[0, beardOffsetY, 0.05]}
          scale={[1, beardScaleY, 0.6]}
          geometry={GNOME_BEARD_GEOM}
        >
          <meshStandardMaterial ref={beardMatRef} color="#f3f4f6" transparent />
        </mesh>
      )}
      <mesh position={[0, 0.43, 0]} geometry={GNOME_HAT_GEOM}>
        <meshStandardMaterial ref={hatMatRef} color={gnome.hatColor} transparent />
      </mesh>
    </group>
  );
}
