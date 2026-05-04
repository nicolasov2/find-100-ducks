'use client';

import { useGLTF } from '@react-three/drei';
import { ConeGeometry, MeshStandardMaterial, SphereGeometry } from 'three';

export const DUCK_MODEL_PATH = '/models/duck.glb';

export const DUCK_BODY_GEOM = new SphereGeometry(0.13, 12, 8);
export const DUCK_HEAD_GEOM = new SphereGeometry(0.07, 10, 8);
export const DUCK_BEAK_GEOM = new ConeGeometry(0.035, 0.07, 8);

/* Reusable material cache to avoid creating duplicates per frame */
const materialCache = new Map<string, MeshStandardMaterial>();

function getBodyMat(color: string): MeshStandardMaterial {
  const key = `body-${color}`;
  let mat = materialCache.get(key);
  if (!mat) {
    mat = new MeshStandardMaterial({ color });
    materialCache.set(key, mat);
  }
  return mat;
}

function getBeakMat(color: string): MeshStandardMaterial {
  const key = `beak-${color}`;
  let mat = materialCache.get(key);
  if (!mat) {
    mat = new MeshStandardMaterial({ color });
    materialCache.set(key, mat);
  }
  return mat;
}

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

function FallbackDuck({
  bodyColor,
  beakColor,
  duckScale,
}: {
  bodyColor: string;
  beakColor: string;
  duckScale: number;
}): React.JSX.Element {
  return (
    <group scale={duckScale}>
      <mesh castShadow position={[0, 0.1, 0]} geometry={DUCK_BODY_GEOM} material={getBodyMat(bodyColor)} />
      <mesh castShadow position={[0, 0.21, -0.04]} geometry={DUCK_HEAD_GEOM} material={getBodyMat(bodyColor)} />
      <mesh
        castShadow
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={DUCK_BEAK_GEOM}
        material={getBeakMat(beakColor)}
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
