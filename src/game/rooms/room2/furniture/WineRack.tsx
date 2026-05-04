import { RigidBody } from '@react-three/rapier';

const WOOD_COLOR = '#6b4f33';
const BASKET_COLOR = '#a07550';

export interface WineRackProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

/** Small wine rack with bottle slots */
export function WineRack({ position, rotationY = 0 }: WineRackProps): React.JSX.Element {
  const bottleColors = ['#4a0e0e', '#2d1a00', '#1a2d00', '#0e1a2d'];
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Frame */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.0, 0.35]} />
          <meshStandardMaterial color={WOOD_COLOR} />
        </mesh>
        {/* Bottle slots (decorative cylinders) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const x = col * 0.3 - 0.15;
          const y = 0.2 + row * 0.22;
          return (
            <mesh key={i} position={[x, y, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.28, 8]} />
              <meshStandardMaterial color={bottleColors[i % bottleColors.length]!} />
            </mesh>
          );
        })}
      </RigidBody>
    </group>
  );
}
