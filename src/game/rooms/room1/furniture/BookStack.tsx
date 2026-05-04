import { RigidBody } from '@react-three/rapier';

const SPINE_COLORS: readonly string[] = [
  '#b91c1c',
  '#1d4ed8',
  '#15803d',
  '#92400e',
  '#6d28d9',
];

interface BookSpec {
  y: number;
  rotationY: number;
  width: number;
  depth: number;
  height: number;
  color: string;
}

const BOOKS: readonly BookSpec[] = [
  { y: 0.04, rotationY: 0, width: 0.22, depth: 0.16, height: 0.05, color: SPINE_COLORS[0]! },
  { y: 0.10, rotationY: 0.06, width: 0.22, depth: 0.16, height: 0.05, color: SPINE_COLORS[1]! },
  { y: 0.16, rotationY: -0.04, width: 0.22, depth: 0.16, height: 0.05, color: SPINE_COLORS[2]! },
  { y: 0.22, rotationY: 0.02, width: 0.22, depth: 0.16, height: 0.05, color: SPINE_COLORS[3]! },
  { y: 0.28, rotationY: -0.06, width: 0.22, depth: 0.16, height: 0.05, color: SPINE_COLORS[4]! },
];

export interface BookStackProps {
  position: readonly [number, number, number];
}

export function BookStack({ position }: BookStackProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {BOOKS.map((b, i) => (
          <mesh
            key={i}
            position={[0, b.y, 0]}
            rotation={[0, b.rotationY, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial color={b.color} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
