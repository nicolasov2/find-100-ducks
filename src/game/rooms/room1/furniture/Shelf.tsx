import { RigidBody } from '@react-three/rapier';

const WOOD = '#6b4f33';

const BOARD_HEIGHTS: readonly number[] = [0.4, 1.4, 2.4, 3.0];

export interface ShelfProps {
  position: readonly [number, number, number];
}

export function Shelf({ position }: ShelfProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-1.0, 1.5, 0]} castShadow>
          <boxGeometry args={[0.1, 3.0, 0.5]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        <mesh position={[1.0, 1.5, 0]} castShadow>
          <boxGeometry args={[0.1, 3.0, 0.5]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {BOARD_HEIGHTS.map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 0.08, 0.5]} />
            <meshStandardMaterial color={WOOD} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
