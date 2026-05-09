import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.70, 0, -0.23], max: [0.70, 1.20, 0.23] };

const BODY_COLOR = '#18181b';
const SCREEN_COLOR = '#27272a';
const STAND_COLOR = '#3f3f46';

export interface TVStandProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

/** TV on a media stand with a cabinet door */
export function TVStand({ position, rotationY = 0 }: TVStandProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Stand cabinet */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.5, 0.45]} />
          <meshStandardMaterial color={STAND_COLOR} />
        </mesh>
        {/* Cabinet doors */}
        <mesh position={[-0.35, 0.25, 0.23]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#52525b" />
        </mesh>
        <mesh position={[0.35, 0.25, 0.23]} castShadow>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#52525b" />
        </mesh>
        {/* TV Screen */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[1.2, 0.7, 0.06]} />
          <meshStandardMaterial color={BODY_COLOR} />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 0.85, 0.032]}>
          <boxGeometry args={[1.1, 0.6, 0.005]} />
          <meshStandardMaterial color={SCREEN_COLOR} emissive="#1e293b" emissiveIntensity={0.3} />
        </mesh>
        {/* TV base */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.3, 0.04, 0.2]} />
          <meshStandardMaterial color={BODY_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
