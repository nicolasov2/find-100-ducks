import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.47, 0, -0.38], max: [0.47, 1.05, 0.35] };

const FABRIC = '#7f1d1d';
const FABRIC_DARK = '#5c1515';
const WOOD = '#5b3a1f';

export interface ReadingChairProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function ReadingChair({ position, rotationY = 0 }: ReadingChairProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Seat cushion */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.2, 0.7]} />
          <meshStandardMaterial color={FABRIC} />
        </mesh>
        {/* Back rest */}
        <mesh position={[0, 0.7, -0.3]} castShadow>
          <boxGeometry args={[0.8, 0.7, 0.15]} />
          <meshStandardMaterial color={FABRIC} />
        </mesh>
        {/* Left armrest */}
        <mesh position={[-0.42, 0.55, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.7]} />
          <meshStandardMaterial color={FABRIC_DARK} />
        </mesh>
        {/* Right armrest */}
        <mesh position={[0.42, 0.55, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.7]} />
          <meshStandardMaterial color={FABRIC_DARK} />
        </mesh>
        {/* Legs */}
        {([[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]] as const).map(
          ([x, z], i) => (
            <mesh key={i} position={[x, 0.12, z]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.24, 8]} />
              <meshStandardMaterial color={WOOD} />
            </mesh>
          ),
        )}
      </RigidBody>
    </group>
  );
}
