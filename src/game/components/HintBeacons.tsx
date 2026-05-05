'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CylinderGeometry,
  MeshBasicMaterial,
  type Vector3Tuple,
} from 'three';
import { HINT_DURATION_MS, useGameStore } from '@/store/gameStore';

const PILLAR_GEOM = new CylinderGeometry(0.04, 0.08, 6, 8, 1, true);
const PILLAR_COLOR = '#22d3ee';

export function HintBeacons(): React.JSX.Element | null {
  const gnomes = useGameStore((s) => s.gnomes);
  const hintActivatedAt = useGameStore((s) => s.hintActivatedAt);

  if (hintActivatedAt === null) return null;

  return (
    <group userData={{ raycastIgnore: true }}>
      {gnomes.map((g) => (
        <Beacon key={g.id} position={g.position} startedAt={hintActivatedAt} />
      ))}
    </group>
  );
}

function Beacon({
  position,
  startedAt,
}: {
  position: Vector3Tuple;
  startedAt: number;
}): React.JSX.Element {
  const matRef = useRef<MeshBasicMaterial | null>(null);

  useFrame(() => {
    const m = matRef.current;
    if (!m) return;
    const t = Math.min((Date.now() - startedAt) / HINT_DURATION_MS, 1);
    m.opacity = Math.max(0, 0.85 * (1 - t * 0.7));
  });

  return (
    <mesh
      position={[position[0], position[1] + 3.0, position[2]]}
      geometry={PILLAR_GEOM}
      renderOrder={998}
    >
      <meshBasicMaterial
        ref={matRef}
        color={PILLAR_COLOR}
        transparent
        opacity={0.85}
        toneMapped={false}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
