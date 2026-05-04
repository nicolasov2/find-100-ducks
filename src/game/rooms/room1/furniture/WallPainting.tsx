import { RigidBody } from '@react-three/rapier';

const FRAME_COLOR = '#78716c';
const CANVAS_COLORS = ['#7c2d12', '#1e3a5f', '#3b2314', '#2d4a3e', '#4a1942'];

export interface WallPaintingProps {
  position: readonly [number, number, number];
  rotationY?: number;
  width?: number;
  height?: number;
  colorIndex?: number;
}

export function WallPainting({
  position,
  rotationY = 0,
  width = 0.8,
  height = 0.6,
  colorIndex = 0,
}: WallPaintingProps): React.JSX.Element {
  const color = CANVAS_COLORS[colorIndex % CANVAS_COLORS.length]!;
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[width + 0.08, height + 0.08, 0.04]} />
          <meshStandardMaterial color={FRAME_COLOR} />
        </mesh>
        {/* Canvas */}
        <mesh position={[0, 0, 0.021]}>
          <boxGeometry args={[width, height, 0.005]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </RigidBody>
    </group>
  );
}
