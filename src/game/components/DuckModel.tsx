'use client';

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { ConeGeometry, MeshStandardMaterial, SphereGeometry } from 'three';

export const DUCK_MODEL_PATH = '/models/duck.glb';

export const DUCK_BODY_GEOM = new SphereGeometry(0.13, 12, 8);
export const DUCK_HEAD_GEOM = new SphereGeometry(0.07, 10, 8);
export const DUCK_BEAK_GEOM = new ConeGeometry(0.035, 0.07, 8);

export interface DuckModelProps {
  useFallback?: boolean;
  bodyColor?: string;
  beakColor?: string;
  duckScale?: number;
}

export function DuckModel({
  useFallback = true,
  bodyColor = '#fbbf24',
  beakColor = '#f59e0b',
  duckScale = 1,
}: DuckModelProps): React.JSX.Element {
  return useFallback ? (
    <FallbackDuck bodyColor={bodyColor} beakColor={beakColor} duckScale={duckScale} />
  ) : (
    <RealDuck duckScale={duckScale} />
  );
}

/**
 * Each duck gets its own material instances so the proximity glow
 * system can modify emissive per-duck without affecting others.
 */
function FallbackDuck({
  bodyColor,
  beakColor,
  duckScale,
}: {
  bodyColor: string;
  beakColor: string;
  duckScale: number;
}): React.JSX.Element {
  const bodyMat = useMemo(() => new MeshStandardMaterial({ color: bodyColor }), [bodyColor]);
  const beakMat = useMemo(() => new MeshStandardMaterial({ color: beakColor }), [beakColor]);

  return (
    <group scale={duckScale}>
      <mesh castShadow position={[0, 0.1, 0]} geometry={DUCK_BODY_GEOM} material={bodyMat} />
      <mesh castShadow position={[0, 0.21, -0.04]} geometry={DUCK_HEAD_GEOM} material={bodyMat} />
      <mesh
        castShadow
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={DUCK_BEAK_GEOM}
        material={beakMat}
      />
    </group>
  );
}

function RealDuck({ duckScale }: { duckScale: number }): React.JSX.Element {
  const gltf = useGLTF(DUCK_MODEL_PATH);
  return (
    <group scale={duckScale}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}
