import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.20, 0, -0.20], max: [0.20, 0.54, 0.20] };

const CAN_COLOR = '#52525b';
const LID_COLOR = '#71717a';

export interface TrashCanProps {
  position: readonly [number, number, number];
}

export function TrashCan({ position }: TrashCanProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Body */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.15, 0.5, 14]} />
          <meshStandardMaterial color={CAN_COLOR} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.20, 0.20, 0.04, 14]} />
          <meshStandardMaterial color={LID_COLOR} metalness={0.4} roughness={0.5} />
        </mesh>
      </RigidBody>
    </group>
  );
}
