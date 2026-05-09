import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-1.5, -0.35, -0.18], max: [1.5, 0.35, 0.18] };

const CABINET_COLOR = '#d6d3d1';
const DOOR_COLOR = '#a8a29e';

export interface CabinetWallProps {
  position: readonly [number, number, number];
  width?: number;
}

/** Upper wall cabinets (mounted high on the wall). */
export function CabinetWall({ position, width = 3 }: CabinetWallProps): React.JSX.Element {
  const doorCount = Math.max(1, Math.round(width / 0.8));
  const doorWidth = (width - 0.06) / doorCount;

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Cabinet body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[width, 0.7, 0.35]} />
          <meshStandardMaterial color={CABINET_COLOR} />
        </mesh>
        {/* Door panels */}
        {Array.from({ length: doorCount }).map((_, i) => {
          const x = -width / 2 + 0.03 + doorWidth / 2 + i * doorWidth;
          return (
            <mesh key={i} position={[x, 0, 0.18]} castShadow>
              <boxGeometry args={[doorWidth - 0.04, 0.62, 0.02]} />
              <meshStandardMaterial color={DOOR_COLOR} />
            </mesh>
          );
        })}
      </RigidBody>
    </group>
  );
}
