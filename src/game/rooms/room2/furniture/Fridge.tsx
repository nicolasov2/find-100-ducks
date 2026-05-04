import { RigidBody } from '@react-three/rapier';

const BODY_COLOR = '#d4d4d8';
const DOOR_COLOR = '#a1a1aa';
const HANDLE_COLOR = '#52525b';

export interface FridgeProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function Fridge({ position, rotationY = 0 }: FridgeProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Body */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.0, 0.7]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Upper door line */}
        <mesh position={[0, 1.4, 0.36]} castShadow>
          <boxGeometry args={[0.85, 0.8, 0.02]} />
          <meshStandardMaterial color={DOOR_COLOR} metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Lower door line */}
        <mesh position={[0, 0.6, 0.36]} castShadow>
          <boxGeometry args={[0.85, 1.0, 0.02]} />
          <meshStandardMaterial color={DOOR_COLOR} metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Handle upper */}
        <mesh position={[0.3, 1.4, 0.38]} castShadow>
          <boxGeometry args={[0.04, 0.25, 0.04]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.8} />
        </mesh>
        {/* Handle lower */}
        <mesh position={[0.3, 0.6, 0.38]} castShadow>
          <boxGeometry args={[0.04, 0.25, 0.04]} />
          <meshStandardMaterial color={HANDLE_COLOR} metalness={0.8} />
        </mesh>
      </RigidBody>
    </group>
  );
}
