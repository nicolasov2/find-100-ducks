import { RigidBody } from '@react-three/rapier';

const WOOD = '#5b3a1f';
const CUSHION = '#92400e';

export interface RockingChairProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function RockingChair({
  position,
  rotationY = 0,
}: RockingChairProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.1, 0.55]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0, 0.5, 0]} receiveShadow>
          <boxGeometry args={[0.66, 0.05, 0.5]} />
          <meshStandardMaterial color={CUSHION} />
        </mesh>
        <mesh position={[0, 0.85, -0.27]} castShadow>
          <boxGeometry args={[0.7, 0.7, 0.08]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[-0.32, 0.18, 0]} rotation={[0, 0, 1.45]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0.32, 0.18, 0]} rotation={[0, 0, -1.45]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[-0.30, 0.07, 0]} rotation={[1.57, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0.30, 0.07, 0]} rotation={[1.57, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
      </RigidBody>
    </group>
  );
}
