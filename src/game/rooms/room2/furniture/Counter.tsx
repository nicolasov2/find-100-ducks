import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

/** L-shaped counter; AABB over-rejects corner gap (accepted trade-off). */
export const LOCAL_BOUNDS: LocalBounds = { min: [-2.55, 0, -0.43], max: [2.85, 0.96, 2.05] };

const COUNTER_COLOR = '#d6d3d1';
const COUNTER_FRONT = '#78716c';

export interface CounterProps {
  position: readonly [number, number, number];
}

/**
 * L-shaped kitchen counter with a sink basin.
 * Runs along the north wall + wraps east.
 */
export function Counter({ position }: CounterProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Long segment (east-west) */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 0.9, 0.8]} />
          <meshStandardMaterial color={COUNTER_FRONT} />
        </mesh>
        {/* Countertop */}
        <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.1, 0.08, 0.85]} />
          <meshStandardMaterial color={COUNTER_COLOR} />
        </mesh>
        {/* Short segment (wraps south) */}
        <mesh position={[2.4, 0.45, 1.2]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.9, 1.6]} />
          <meshStandardMaterial color={COUNTER_FRONT} />
        </mesh>
        <mesh position={[2.4, 0.92, 1.2]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.08, 1.7]} />
          <meshStandardMaterial color={COUNTER_COLOR} />
        </mesh>
        {/* Sink basin (recessed) */}
        <mesh position={[-0.5, 0.88, 0]} castShadow>
          <boxGeometry args={[0.6, 0.12, 0.5]} />
          <meshStandardMaterial color="#a8a29e" />
        </mesh>
      </RigidBody>
    </group>
  );
}
