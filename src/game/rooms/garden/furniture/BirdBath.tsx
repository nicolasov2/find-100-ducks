import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.42, 0, -0.42], max: [0.42, 0.87, 0.42] };

const STONE = '#a1a1aa';
const WATER = '#0ea5e9';

export interface BirdBathProps {
  position: readonly [number, number, number];
}

export function BirdBath({ position }: BirdBathProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.4, 0.1, 16]} />
          <meshStandardMaterial color={STONE} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.6, 12]} />
          <meshStandardMaterial color={STONE} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.36, 0.12, 16]} />
          <meshStandardMaterial color={STONE} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.04, 16]} />
          <meshStandardMaterial color={WATER} metalness={0.2} roughness={0.1} />
        </mesh>
      </RigidBody>
    </group>
  );
}
