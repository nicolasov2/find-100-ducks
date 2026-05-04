import { RigidBody } from '@react-three/rapier';

const BRICK_COLOR = '#78350f';
const MANTEL_COLOR = '#5b3a1f';
const FIRE_COLOR = '#f97316';

export interface FireplaceProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Fireplace({ position, rotationY = 0 }: FireplaceProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Back wall */}
        <mesh position={[0, 0.7, -0.3]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.4, 0.15]} />
          <meshStandardMaterial color={BRICK_COLOR} />
        </mesh>
        {/* Left pillar */}
        <mesh position={[-0.7, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 1.0, 0.5]} />
          <meshStandardMaterial color={BRICK_COLOR} />
        </mesh>
        {/* Right pillar */}
        <mesh position={[0.7, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 1.0, 0.5]} />
          <meshStandardMaterial color={BRICK_COLOR} />
        </mesh>
        {/* Mantel (top shelf) */}
        <mesh position={[0, 1.05, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.1, 0.6]} />
          <meshStandardMaterial color={MANTEL_COLOR} />
        </mesh>
        {/* Hearth floor */}
        <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.04, 0.4]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      </RigidBody>
      {/* Warm glow */}
      <pointLight position={[0, 0.4, 0]} intensity={5} distance={5} decay={2} color={FIRE_COLOR} />
      {/* Fire emissive block */}
      <mesh position={[0, 0.2, -0.15]}>
        <boxGeometry args={[0.6, 0.3, 0.15]} />
        <meshStandardMaterial color={FIRE_COLOR} emissive={FIRE_COLOR} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}
