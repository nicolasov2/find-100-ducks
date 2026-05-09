import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-2.0, 0, -1.0], max: [2.0, 0.90, 1.0] };

const WOOD = '#8b6f47';

const LEG_POSITIONS: ReadonlyArray<readonly [number, number, number]> = [
  [-1.85, 0.4, -0.85],
  [1.85, 0.4, -0.85],
  [-1.85, 0.4, 0.85],
  [1.85, 0.4, 0.85],
];

export function Table(): React.JSX.Element {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color={WOOD} />
      </mesh>
      {LEG_POSITIONS.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      ))}
    </RigidBody>
  );
}
