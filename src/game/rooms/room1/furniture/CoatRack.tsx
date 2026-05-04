import { RigidBody } from '@react-three/rapier';

const POLE_COLOR = '#5b3a1f';
const HOOK_COLOR = '#78716c';

export interface CoatRackProps {
  position: readonly [number, number, number];
}

export function CoatRack({ position }: CoatRackProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 12]} />
          <meshStandardMaterial color={POLE_COLOR} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.8, 8]} />
          <meshStandardMaterial color={POLE_COLOR} />
        </mesh>
        {/* Hooks */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.15, 1.75, Math.sin(angle) * 0.15]}
            castShadow
          >
            <sphereGeometry args={[0.03, 8, 6]} />
            <meshStandardMaterial color={HOOK_COLOR} metalness={0.6} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
