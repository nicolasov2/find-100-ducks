import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-1.0, 0, -1.5], max: [1.0, 1.35, 1.5] };

const FRAME = '#5b3a1f';
const MATTRESS = '#f4f4f5';
const PILLOW = '#e0e7ff';

export interface BedProps {
  position: readonly [number, number, number];
}

export function Bed({ position }: BedProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[2, 0.3, 3]} />
          <meshStandardMaterial color={FRAME} />
        </mesh>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.3, 2.9]} />
          <meshStandardMaterial color={MATTRESS} />
        </mesh>
        <mesh position={[0, 0.85, -1.45]} castShadow>
          <boxGeometry args={[2, 1.0, 0.1]} />
          <meshStandardMaterial color={FRAME} />
        </mesh>
        <mesh position={[-0.5, 0.7, -1.0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.4]} />
          <meshStandardMaterial color={PILLOW} />
        </mesh>
        <mesh position={[0.5, 0.7, -1.0]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.4]} />
          <meshStandardMaterial color={PILLOW} />
        </mesh>
      </RigidBody>
    </group>
  );
}
