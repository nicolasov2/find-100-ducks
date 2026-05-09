import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.90, 0, -0.45], max: [0.90, 0.81, 0.45] };

const DESK_COLOR = '#5b3a1f';
const DRAWER_COLOR = '#6b4f33';

export interface DeskProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Desk({ position, rotationY = 0 }: DeskProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Desktop */}
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.06, 0.9]} />
          <meshStandardMaterial color={DESK_COLOR} />
        </mesh>
        {/* Left panel */}
        <mesh position={[-0.85, 0.39, 0]} castShadow>
          <boxGeometry args={[0.06, 0.76, 0.85]} />
          <meshStandardMaterial color={DESK_COLOR} />
        </mesh>
        {/* Right panel (drawers) */}
        <mesh position={[0.85, 0.39, 0]} castShadow>
          <boxGeometry args={[0.06, 0.76, 0.85]} />
          <meshStandardMaterial color={DESK_COLOR} />
        </mesh>
        {/* Back panel */}
        <mesh position={[0, 0.39, -0.42]} castShadow>
          <boxGeometry args={[1.8, 0.76, 0.06]} />
          <meshStandardMaterial color={DESK_COLOR} />
        </mesh>
        {/* Drawer fronts (right side) */}
        <mesh position={[0.55, 0.55, 0.43]} castShadow>
          <boxGeometry args={[0.55, 0.2, 0.02]} />
          <meshStandardMaterial color={DRAWER_COLOR} />
        </mesh>
        <mesh position={[0.55, 0.3, 0.43]} castShadow>
          <boxGeometry args={[0.55, 0.2, 0.02]} />
          <meshStandardMaterial color={DRAWER_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
