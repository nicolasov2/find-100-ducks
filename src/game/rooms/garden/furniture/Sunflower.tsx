import { RigidBody } from '@react-three/rapier';

const STEM = '#16a34a';
const PETAL = '#fbbf24';
const CENTER = '#854d0e';

export interface SunflowerProps {
  position: readonly [number, number, number];
  scale?: number;
}

export function Sunflower({
  position,
  scale = 1,
}: SunflowerProps): React.JSX.Element {
  return (
    <group position={position} scale={scale}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.2, 8]} />
          <meshStandardMaterial color={STEM} />
        </mesh>
        <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 2.6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
          <meshStandardMaterial color={PETAL} emissive={PETAL} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 1.27, 0.02]} rotation={[Math.PI / 2.6, 0, 0]}>
          <cylinderGeometry args={[0.10, 0.10, 0.05, 12]} />
          <meshStandardMaterial color={CENTER} />
        </mesh>
      </RigidBody>
    </group>
  );
}
