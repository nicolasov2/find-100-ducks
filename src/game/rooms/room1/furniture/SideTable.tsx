import { RigidBody } from '@react-three/rapier';

const TABLE_COLOR = '#5b3a1f';

export interface SideTableProps {
  position: readonly [number, number, number];
}

export function SideTable({ position }: SideTableProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Table top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.04, 0.45]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
        {/* Legs */}
        {([[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]] as const).map(
          ([x, z], i) => (
            <mesh key={i} position={[x, 0.25, z]} castShadow>
              <boxGeometry args={[0.05, 0.48, 0.05]} />
              <meshStandardMaterial color={TABLE_COLOR} />
            </mesh>
          ),
        )}
        {/* Lower shelf */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.38, 0.03, 0.38]} />
          <meshStandardMaterial color={TABLE_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
