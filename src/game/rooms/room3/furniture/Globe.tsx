import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.22, 0, -0.22], max: [0.22, 0.92, 0.22] };

const STAND_COLOR = '#5b3a1f';
const SPHERE_COLOR = '#1d4ed8';
const RING_COLOR = '#a07a55';

export interface GlobeProps {
  position: readonly [number, number, number];
}

export function Globe({ position }: GlobeProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Stand base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 12]} />
          <meshStandardMaterial color={STAND_COLOR} />
        </mesh>
        {/* Stand pole */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.54, 8]} />
          <meshStandardMaterial color={STAND_COLOR} />
        </mesh>
        {/* Globe sphere */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 12]} />
          <meshStandardMaterial color={SPHERE_COLOR} metalness={0.2} roughness={0.6} />
        </mesh>
        {/* Axis ring */}
        <mesh position={[0, 0.72, 0]} rotation={[0.3, 0, 0]} castShadow>
          <torusGeometry args={[0.21, 0.01, 8, 24]} />
          <meshStandardMaterial color={RING_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
