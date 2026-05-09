import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.5, 0, -0.5], max: [0.5, 2.85, 0.5] };

const METAL = '#3f3f46';
const SHADE = '#fde68a';

export interface LampProps {
  position: readonly [number, number, number];
}

export function Lamp({ position }: LampProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 12]} />
          <meshStandardMaterial color={METAL} />
        </mesh>
        <mesh position={[0, 2.6, 0]} castShadow>
          <coneGeometry args={[0.5, 0.5, 16, 1, true]} />
          <meshStandardMaterial color={SHADE} side={DoubleSide} emissive={SHADE} emissiveIntensity={0.3} />
        </mesh>
      </RigidBody>
      <pointLight position={[0, 2.5, 0]} intensity={6} distance={6} decay={2} color="#fef3c7" castShadow />
    </group>
  );
}
