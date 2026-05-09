import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.35, 0, -0.35], max: [0.35, 1.35, 0.35] };

const WOOD = '#a07a55';

const LEG_OFFSETS: ReadonlyArray<readonly [number, number, number]> = [
  [-0.25, 0.25, -0.25],
  [0.25, 0.25, -0.25],
  [-0.25, 0.25, 0.25],
  [0.25, 0.25, 0.25],
];

export interface ChairProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Chair({ position, rotationY = 0 }: ChairProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0, 0.95, -0.25]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {LEG_OFFSETS.map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <boxGeometry args={[0.08, 0.5, 0.08]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
