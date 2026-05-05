'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, InstancedMesh, Object3D, Vector3 } from 'three';
import { useGameStore, DEATH_DURATION_MS } from '@/store/gameStore';

const FEATHER_COUNT = 10;
const GRAVITY = -8;
const dummy = new Object3D();
const _color = new Color();

interface FeatherData {
  vel: Vector3;
  pos: Vector3;
  rotSpeed: number;
}

function makeFeathers(position: readonly [number, number, number]): FeatherData[] {
  return Array.from({ length: FEATHER_COUNT }, () => ({
    vel: new Vector3(
      (Math.random() - 0.5) * 4,
      2 + Math.random() * 3,
      (Math.random() - 0.5) * 4,
    ),
    pos: new Vector3(position[0], position[1] + 0.15, position[2]),
    rotSpeed: (Math.random() - 0.5) * 10,
  }));
}

function FeatherBurstInstance({ position, color, startedAt }: {
  position: readonly [number, number, number];
  color: string;
  startedAt: number;
}): React.JSX.Element {
  const meshRef = useRef<InstancedMesh>(null);
  const [feathers] = useState<FeatherData[]>(() => makeFeathers(position));

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const elapsed = (Date.now() - startedAt) / 1000;
    const alpha = Math.max(0, 1 - elapsed / (DEATH_DURATION_MS / 1000));

    for (let i = 0; i < FEATHER_COUNT; i++) {
      const f = feathers[i]!;
      const px = f.pos.x + f.vel.x * elapsed;
      const py = f.pos.y + f.vel.y * elapsed + 0.5 * GRAVITY * elapsed * elapsed;
      const pz = f.pos.z + f.vel.z * elapsed;
      const scale = 0.03 * alpha;

      dummy.position.set(px, Math.max(0, py), pz);
      dummy.rotation.set(elapsed * f.rotSpeed, elapsed * f.rotSpeed * 0.7, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  _color.set(color);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FEATHER_COUNT]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={_color} transparent opacity={0.8} />
    </instancedMesh>
  );
}

export function FeatherBursts(): React.JSX.Element {
  const dyingGnomes = useGameStore((s) => s.dyingGnomes);

  return (
    <group>
      {dyingGnomes.map((d) => (
        <FeatherBurstInstance
          key={d.id}
          position={d.position}
          color={d.bodyColor}
          startedAt={d.startedAt}
        />
      ))}
    </group>
  );
}
