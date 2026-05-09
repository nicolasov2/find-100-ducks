import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.20, 0, -0.20], max: [0.20, 0.68, 0.20] };

const SEAT_COLOR = '#a1a1aa';
const LEG_COLOR = '#52525b';

export interface StoolProps {
  position: readonly [number, number, number];
}

export function Stool({ position }: StoolProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Seat */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 14]} />
          <meshStandardMaterial color={SEAT_COLOR} />
        </mesh>
        {/* Legs (4) */}
        {([
          [0.12, 0.32, 0.12],
          [-0.12, 0.32, 0.12],
          [0.12, 0.32, -0.12],
          [-0.12, 0.32, -0.12],
        ] as const).map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.62, 8]} />
            <meshStandardMaterial color={LEG_COLOR} />
          </mesh>
        ))}
        {/* Footrest ring */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <torusGeometry args={[0.12, 0.015, 8, 16]} />
          <meshStandardMaterial color={LEG_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
