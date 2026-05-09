import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.33, 0, -0.33], max: [0.33, 0.20, 0.33] };

const CUSHION = '#7c3aed';
const CUSHION_TRIM = '#5b21b6';

export interface FloorCushionProps {
  position: readonly [number, number, number];
  rotationY?: number;
  color?: string;
  trim?: string;
}

export function FloorCushion({
  position,
  rotationY = 0,
  color = CUSHION,
  trim = CUSHION_TRIM,
}: FloorCushionProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.16, 0.65]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[0.55, 0.04, 0.55]} />
          <meshStandardMaterial color={trim} />
        </mesh>
      </RigidBody>
    </group>
  );
}
