import { RigidBody } from '@react-three/rapier';

const WOOD = '#7c3a1c';
const METAL = '#3f3f46';

export interface GardenBenchProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function GardenBench({
  position,
  rotationY = 0,
}: GardenBenchProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.06, 0.4]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0, 0.78, -0.18]} castShadow>
          <boxGeometry args={[1.6, 0.6, 0.06]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[-0.7, 0.21, 0]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.34]} />
          <meshStandardMaterial color={METAL} metalness={0.7} />
        </mesh>
        <mesh position={[0.7, 0.21, 0]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.34]} />
          <meshStandardMaterial color={METAL} metalness={0.7} />
        </mesh>
      </RigidBody>
    </group>
  );
}
