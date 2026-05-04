'use client';

import { useGLTF } from '@react-three/drei';

export const DUCK_MODEL_PATH = '/models/duck.glb';

export interface DuckModelProps {
  useFallback?: boolean;
}

export function DuckModel({ useFallback = true }: DuckModelProps): React.JSX.Element {
  return useFallback ? <FallbackDuck /> : <RealDuck />;
}

function FallbackDuck(): React.JSX.Element {
  return (
    <group>
      <mesh castShadow position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.15, 12, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh castShadow position={[0, 0.25, -0.05]}>
        <sphereGeometry args={[0.08, 10, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0.05]}>
        <coneGeometry args={[0.04, 0.08, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

function RealDuck(): React.JSX.Element {
  const gltf = useGLTF(DUCK_MODEL_PATH);
  return <primitive object={gltf.scene.clone()} />;
}
