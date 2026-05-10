'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { DEATH_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { DyingGnome } from '@/game/types';
import {
  GNOME_HAT_GEOM,
  GNOME_BRIM_GEOM,
  GNOME_HEAD_GEOM,
  GNOME_BODY_GEOM,
  GNOME_BEARD_GEOM,
  GNOME_BOOT_GEOM,
  GNOME_BELT_GEOM,
  GNOME_ARM_GEOM,
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

  const beardScaleY = gnome.beardStyle === 'long' ? 2.1 : 1.35;
  const beardY      = gnome.beardStyle === 'long' ? 0.14 : 0.21;

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const t = Math.min((Date.now() - gnome.startedAt) / DEATH_DURATION_MS, 1);
    const scale = t < 0.18 ? 1 + (t / 0.18) * 0.45 : 1.45 - ((t - 0.18) / 0.82) * 1.45;
    group.scale.setScalar(Math.max(0.001, scale * gnome.scale));
    group.rotation.y = gnome.rotation[1] + t * Math.PI * 4;
    const opacity = Math.max(0, 1 - t);
    group.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        ((obj as Mesh).material as MeshStandardMaterial).opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} position={gnome.position} userData={{ raycastIgnore: true }}>
      {/* Boots */}
      <mesh position={[-0.045, 0.04, 0.03]} scale={[1.35, 0.75, 1.5]} geometry={GNOME_BOOT_GEOM}>
        <meshStandardMaterial color="#292524" transparent />
      </mesh>
      <mesh position={[0.045, 0.04, 0.03]} scale={[1.35, 0.75, 1.5]} geometry={GNOME_BOOT_GEOM}>
        <meshStandardMaterial color="#292524" transparent />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.14, 0]} geometry={GNOME_BODY_GEOM}>
        <meshStandardMaterial color={gnome.bodyColor} transparent />
      </mesh>
      {/* Belt */}
      <mesh position={[0, 0.134, 0]} geometry={GNOME_BELT_GEOM}>
        <meshStandardMaterial color="#78350f" transparent />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.115, 0.175, 0]} rotation={[0, 0,  Math.PI / 3]} geometry={GNOME_ARM_GEOM}>
        <meshStandardMaterial color={gnome.bodyColor} transparent />
      </mesh>
      <mesh position={[0.115, 0.175, 0]} rotation={[0, 0, -Math.PI / 3]} geometry={GNOME_ARM_GEOM}>
        <meshStandardMaterial color={gnome.bodyColor} transparent />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.30, 0]} geometry={GNOME_HEAD_GEOM}>
        <meshStandardMaterial color="#fde0a8" transparent />
      </mesh>
      {/* Beard */}
      {gnome.beardStyle !== 'none' && (
        <mesh position={[0, beardY, 0.072]} scale={[1.6, beardScaleY, 0.85]} geometry={GNOME_BEARD_GEOM}>
          <meshStandardMaterial color="#f3f4f6" transparent />
        </mesh>
      )}
      {/* Hat brim */}
      <mesh position={[0, 0.376, 0]} geometry={GNOME_BRIM_GEOM}>
        <meshStandardMaterial color={gnome.hatColor} transparent />
      </mesh>
      {/* Hat cone */}
      <mesh position={[0, 0.562, 0]} geometry={GNOME_HAT_GEOM}>
        <meshStandardMaterial color={gnome.hatColor} transparent />
      </mesh>
    </group>
  );
}
