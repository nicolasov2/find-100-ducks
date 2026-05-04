import { RigidBody } from '@react-three/rapier';

const FRAME_COLOR = '#5b3a1f';
const FACE_COLOR = '#fef3c7';
const HAND_COLOR = '#18181b';

export interface WallClockProps {
  position: readonly [number, number, number];
}

export function WallClock({ position }: WallClockProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Frame */}
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.05, 24]} />
          <meshStandardMaterial color={FRAME_COLOR} />
        </mesh>
        {/* Face */}
        <mesh position={[0, 0, 0.026]}>
          <cylinderGeometry args={[0.25, 0.25, 0.005, 24]} />
          <meshStandardMaterial color={FACE_COLOR} />
        </mesh>
        {/* Hour hand */}
        <mesh position={[0, 0.06, 0.03]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.02, 0.12, 0.01]} />
          <meshStandardMaterial color={HAND_COLOR} />
        </mesh>
        {/* Minute hand */}
        <mesh position={[0.04, 0.07, 0.035]} rotation={[0, 0, 0.8]}>
          <boxGeometry args={[0.015, 0.18, 0.01]} />
          <meshStandardMaterial color={HAND_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
