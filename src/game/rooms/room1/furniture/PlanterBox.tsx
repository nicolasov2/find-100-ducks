import { RigidBody } from '@react-three/rapier';

const WOOD = '#5b3a1f';
const SOIL = '#3a2412';
const FOLIAGE = '#15803d';
const FOLIAGE_LIGHT = '#22c55e';

export interface PlanterBoxProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function PlanterBox({
  position,
  rotationY = 0,
}: PlanterBoxProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.36, 0.5]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[0, 0.34, 0]} receiveShadow>
          <boxGeometry args={[1.5, 0.05, 0.42]} />
          <meshStandardMaterial color={SOIL} />
        </mesh>
        <mesh position={[-0.5, 0.55, 0]} castShadow>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={FOLIAGE_LIGHT} flatShading />
        </mesh>
        <mesh position={[0.55, 0.55, 0]} castShadow>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading />
        </mesh>
      </RigidBody>
    </group>
  );
}
