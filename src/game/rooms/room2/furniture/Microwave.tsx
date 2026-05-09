import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

/** Placed on counter surface; bounds are centered at the component origin (not floor). */
export const LOCAL_BOUNDS: LocalBounds = { min: [-0.23, -0.14, -0.18], max: [0.23, 0.14, 0.19] };

const BODY_COLOR = '#27272a';
const DOOR_COLOR = '#18181b';
const HANDLE_COLOR = '#a1a1aa';

export interface MicrowaveProps {
  position: readonly [number, number, number];
}

export function Microwave({ position }: MicrowaveProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.28, 0.35]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Door */}
        <mesh position={[-0.05, 0, 0.18]} castShadow>
          <boxGeometry args={[0.28, 0.22, 0.02]} />
          <meshStandardMaterial color={DOOR_COLOR} />
        </mesh>
        {/* Control panel */}
        <mesh position={[0.17, 0, 0.18]} castShadow>
          <boxGeometry args={[0.08, 0.22, 0.02]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.5} />
        </mesh>
      </RigidBody>
    </group>
  );
}
