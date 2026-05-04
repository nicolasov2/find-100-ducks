import { RigidBody } from '@react-three/rapier';

const TABLE_COLOR = '#5b3a1f';

export interface CoffeeTableProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function CoffeeTable({ position, rotationY = 0 }: CoffeeTableProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Table top */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.06, 0.5]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
        {/* Legs */}
        {([[-0.38, -0.2], [0.38, -0.2], [-0.38, 0.2], [0.38, 0.2]] as const).map(
          ([x, z], i) => (
            <mesh key={i} position={[x, 0.17, z]} castShadow>
              <boxGeometry args={[0.06, 0.34, 0.06]} />
              <meshStandardMaterial color={TABLE_COLOR} />
            </mesh>
          ),
        )}
        {/* Lower shelf */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.7, 0.04, 0.35]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
