import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

/** Ceiling-hanging rack; bounds are centered at mount position (pots hang below). */
export const LOCAL_BOUNDS: LocalBounds = { min: [-0.70, -0.45, -0.12], max: [0.70, 0.03, 0.12] };

const METAL = '#3f3f46';
const COPPER = '#b45309';

export interface PotRackProps {
  position: readonly [number, number, number];
}

export function PotRack({ position }: PotRackProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.05, 0.06]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[-0.5, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.16, 14]} />
          <meshStandardMaterial color={COPPER} metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 14]} />
          <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh position={[0.5, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.10, 0.12, 0.14, 14]} />
          <meshStandardMaterial color={COPPER} metalness={0.6} roughness={0.5} />
        </mesh>
      </RigidBody>
    </group>
  );
}
