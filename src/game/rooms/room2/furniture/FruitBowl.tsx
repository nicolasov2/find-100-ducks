import { RigidBody } from '@react-three/rapier';

const BOWL_COLOR = '#d6d3d1';
const FRUIT_COLORS = ['#ef4444', '#22c55e', '#f59e0b', '#f97316', '#eab308'];

export interface FruitBowlProps {
  position: readonly [number, number, number];
}

export function FruitBowl({ position }: FruitBowlProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        {/* Bowl */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={BOWL_COLOR} />
        </mesh>
        {/* Fruits */}
        {FRUIT_COLORS.map((color, i) => {
          const angle = (i / FRUIT_COLORS.length) * Math.PI * 2;
          const r = i === 0 ? 0 : 0.06;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.05 + (i === 0 ? 0.04 : 0), Math.sin(angle) * r]} castShadow>
              <sphereGeometry args={[0.04, 8, 6]} />
              <meshStandardMaterial color={color} />
            </mesh>
          );
        })}
      </RigidBody>
    </group>
  );
}
