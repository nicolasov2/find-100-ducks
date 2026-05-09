import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.30, 0, -0.30], max: [0.30, 0.42, 0.30] };

const CARDBOARD = '#c79872';
const CARDBOARD_DARK = '#a07550';

export interface CardboardBoxProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function CardboardBox({
  position,
  rotationY = 0,
}: CardboardBoxProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.04, 0.6]} />
          <meshStandardMaterial color={CARDBOARD_DARK} />
        </mesh>
        <mesh position={[0, 0.22, -0.28]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.04]} />
          <meshStandardMaterial color={CARDBOARD} />
        </mesh>
        <mesh position={[0, 0.22, 0.28]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.04]} />
          <meshStandardMaterial color={CARDBOARD} />
        </mesh>
        <mesh position={[-0.28, 0.22, 0]} castShadow>
          <boxGeometry args={[0.04, 0.4, 0.52]} />
          <meshStandardMaterial color={CARDBOARD} />
        </mesh>
        <mesh position={[0.28, 0.22, 0]} castShadow>
          <boxGeometry args={[0.04, 0.4, 0.52]} />
          <meshStandardMaterial color={CARDBOARD} />
        </mesh>
      </RigidBody>
    </group>
  );
}
