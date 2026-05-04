'use client';

import { useGLTF } from '@react-three/drei';
import { ConeGeometry, MeshStandardMaterial, SphereGeometry } from 'three';

export const DUCK_MODEL_PATH = '/models/duck.glb';

const BODY_GEOM = new SphereGeometry(0.15, 12, 8);
const HEAD_GEOM = new SphereGeometry(0.08, 10, 8);
const BEAK_GEOM = new ConeGeometry(0.04, 0.08, 8);
const BODY_MAT = new MeshStandardMaterial({ color: '#fbbf24' });
const BEAK_MAT = new MeshStandardMaterial({ color: '#f59e0b' });

export interface DuckModelProps {
  useFallback?: boolean;
}

export function DuckModel({ useFallback = true }: DuckModelProps): React.JSX.Element {
  return useFallback ? <FallbackDuck /> : <RealDuck />;
}

function FallbackDuck(): React.JSX.Element {
  return (
    <group>
      <mesh castShadow position={[0, 0.12, 0]} geometry={BODY_GEOM} material={BODY_MAT} />
      <mesh castShadow position={[0, 0.25, -0.05]} geometry={HEAD_GEOM} material={BODY_MAT} />
      <mesh castShadow position={[0, 0.25, 0.08]} rotation={[Math.PI / 2, 0, 0]} geometry={BEAK_GEOM} material={BEAK_MAT} />
    </group>
  );
}

function RealDuck(): React.JSX.Element {
  const gltf = useGLTF(DUCK_MODEL_PATH);
  return <primitive object={gltf.scene.clone()} />;
}
