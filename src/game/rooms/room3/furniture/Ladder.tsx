import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.23, 0, -0.40], max: [0.23, 2.60, 0.30] };

const WOOD = '#5b3a1f';
const RUNG_COLOR = '#6b4f33';

export interface LadderProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

/** Leaning library ladder */
export function Ladder({ position, rotationY = 0 }: LadderProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Left rail */}
        <mesh position={[-0.2, 1.3, -0.15]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 2.6, 0.06]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Right rail */}
        <mesh position={[0.2, 1.3, -0.15]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 2.6, 0.06]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Rungs */}
        {[0.3, 0.7, 1.1, 1.5, 1.9, 2.3].map((y, i) => (
          <mesh key={i} position={[0, y, -0.15 + y * 0.04]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.34, 0.04, 0.06]} />
            <meshStandardMaterial color={RUNG_COLOR} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
