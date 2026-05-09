import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.16, 0, -0.09], max: [0.16, 1.40, 0.28] };

const HANDLE = '#a07550';
const BRISTLE = '#fde68a';

export interface BroomProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Broom({
  position,
  rotationY = 0,
}: BroomProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.7, 0]} rotation={[0.18, 0, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 8]} />
          <meshStandardMaterial color={HANDLE} />
        </mesh>
        <mesh position={[0, 0.05, 0.13]} castShadow>
          <boxGeometry args={[0.32, 0.18, 0.18]} />
          <meshStandardMaterial color={BRISTLE} />
        </mesh>
      </RigidBody>
    </group>
  );
}
