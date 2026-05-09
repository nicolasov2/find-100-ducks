import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.32, 0, -0.14], max: [0.40, 0.30, 0.32] };

const STEM = '#fef3c7';
const CAP = '#dc2626';
const SPOT = '#fef3c7';

interface MushroomSpec {
  x: number;
  z: number;
  scale: number;
}

const MUSHROOMS: readonly MushroomSpec[] = [
  { x: 0, z: 0, scale: 1.0 },
  { x: 0.3, z: 0.15, scale: 0.7 },
  { x: -0.2, z: 0.2, scale: 0.85 },
];

export interface MushroomClusterProps {
  position: readonly [number, number, number];
}

export function MushroomCluster({ position }: MushroomClusterProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {MUSHROOMS.map((m, i) => (
          <group key={i} position={[m.x, 0, m.z]} scale={m.scale}>
            <mesh position={[0, 0.08, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.06, 0.16, 8]} />
              <meshStandardMaterial color={STEM} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.18, 0]} castShadow>
              <sphereGeometry args={[0.12, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={CAP} roughness={0.7} />
            </mesh>
            <mesh position={[0.05, 0.22, 0.05]}>
              <sphereGeometry args={[0.018, 6, 4]} />
              <meshStandardMaterial color={SPOT} />
            </mesh>
            <mesh position={[-0.06, 0.21, 0.04]}>
              <sphereGeometry args={[0.018, 6, 4]} />
              <meshStandardMaterial color={SPOT} />
            </mesh>
          </group>
        ))}
      </RigidBody>
    </group>
  );
}
