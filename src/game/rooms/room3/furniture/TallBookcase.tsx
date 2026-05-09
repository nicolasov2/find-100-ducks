import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-1.23, 0, -0.20], max: [1.23, 3.80, 0.20] };

const WOOD = '#3b2314';
const SHELF_WOOD = '#5b3a1f';
const BOOK_COLORS = ['#b91c1c', '#1d4ed8', '#15803d', '#92400e', '#6d28d9', '#0e7490', '#be185d', '#ca8a04'];

export interface TallBookcaseProps {
  position: readonly [number, number, number];
  rotationY?: number;
}

export function TallBookcase({ position, rotationY = 0 }: TallBookcaseProps): React.JSX.Element {
  const shelfHeights = [0.3, 1.0, 1.7, 2.4, 3.1, 3.6];

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Left side */}
        <mesh position={[-1.2, 1.9, 0]} castShadow>
          <boxGeometry args={[0.06, 3.8, 0.4]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Right side */}
        <mesh position={[1.2, 1.9, 0]} castShadow>
          <boxGeometry args={[0.06, 3.8, 0.4]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Back panel */}
        <mesh position={[0, 1.9, -0.18]} castShadow>
          <boxGeometry args={[2.4, 3.8, 0.04]} />
          <meshStandardMaterial color={WOOD} />
        </mesh>
        {/* Shelves */}
        {shelfHeights.map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.34, 0.06, 0.38]} />
            <meshStandardMaterial color={SHELF_WOOD} />
          </mesh>
        ))}
        {/* Books on shelves (decorative blocks) */}
        {shelfHeights.slice(0, -1).map((y, si) => {
          const bookCount = 4 + Math.floor(si * 0.5);
          return Array.from({ length: bookCount }).map((_, bi) => {
            const bx = -1.0 + bi * (2.0 / bookCount);
            const bh = 0.4 + (bi % 3) * 0.1;
            const color = BOOK_COLORS[(si * 3 + bi) % BOOK_COLORS.length]!;
            return (
              <mesh key={`${si}-${bi}`} position={[bx, y + 0.06 + bh / 2, 0]} castShadow>
                <boxGeometry args={[0.15, bh, 0.25]} />
                <meshStandardMaterial color={color} />
              </mesh>
            );
          });
        })}
      </RigidBody>
    </group>
  );
}
