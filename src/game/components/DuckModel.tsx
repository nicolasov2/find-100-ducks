'use client';

import { useGLTF } from '@react-three/drei';
import { ConeGeometry, MeshStandardMaterial, SphereGeometry } from 'three';

export const DUCK_MODEL_PATH = '/models/duck.glb';

export const DUCK_BODY_COLOR = '#fbbf24';
export const DUCK_BEAK_COLOR = '#f59e0b';

export const DUCK_BODY_GEOM = new SphereGeometry(0.13, 12, 8);
export const DUCK_HEAD_GEOM = new SphereGeometry(0.07, 10, 8);
export const DUCK_BEAK_GEOM = new ConeGeometry(0.035, 0.07, 8);

const BODY_MAT = new MeshStandardMaterial({ color: DUCK_BODY_COLOR });
const BEAK_MAT = new MeshStandardMaterial({ color: DUCK_BEAK_COLOR });

export interface DuckModelProps {
  useFallback?: boolean;
}

export function DuckModel({ useFallback = true }: DuckModelProps): React.JSX.Element {
  return useFallback ? <FallbackDuck /> : <RealDuck />;
}

function FallbackDuck(): React.JSX.Element {
  return (
    <group>
      <mesh castShadow position={[0, 0.1, 0]} geometry={DUCK_BODY_GEOM} material={BODY_MAT} />
      <mesh castShadow position={[0, 0.21, -0.04]} geometry={DUCK_HEAD_GEOM} material={BODY_MAT} />
      <mesh
        castShadow
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={DUCK_BEAK_GEOM}
        material={BEAK_MAT}
      />
    </group>
  );
}

function RealDuck(): React.JSX.Element {
  const gltf = useGLTF(DUCK_MODEL_PATH);
  return <primitive object={gltf.scene.clone()} />;
}
