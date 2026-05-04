import { RigidBody } from '@react-three/rapier';

const TABLE_COLOR = '#8b6f47';

export interface RoundTableProps {
  position: readonly [number, number, number];
}

export function RoundTable({ position }: RoundTableProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Table top */}
        <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.0, 0.08, 24]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
        {/* Center pedestal */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.76, 12]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.45, 0.08, 16]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
