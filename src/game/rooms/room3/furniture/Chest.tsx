import { RigidBody } from '@react-three/rapier';

const WOOD = '#5b3a1f';
const CUSHION = '#7f1d1d';

export interface ChestProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

/** Wooden storage chest — ducks hide inside */
export function Chest({ position, rotationY = 0 }: ChestProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Body */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.4, 0.5]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.84, 0.06, 0.54]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Metal bands */}
        <mesh position={[0, 0.2, 0.26]} castShadow>
          <boxGeometry args={[0.84, 0.06, 0.02]} />
          <meshStandardMaterial color="#78716c" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, -0.26]} castShadow>
          <boxGeometry args={[0.84, 0.06, 0.02]} />
          <meshStandardMaterial color="#78716c" metalness={0.6} />
        </mesh>
        {/* Cushion on top (optional seat) */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[0.76, 0.06, 0.46]} />
          <meshStandardMaterial color={CUSHION} />
        </mesh>
      </RigidBody>
    </group>
  );
}
