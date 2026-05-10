import { RigidBody } from '@react-three/rapier';

const WIDTH = 16;
const DEPTH = 14;
const HEIGHT = 4;
const THICK = 0.2;
const CX = 28;
const CZ = 0;
const HW = WIDTH / 2;
const HD = DEPTH / 2;
const FLOOR_COLOR = '#d6d3d1';
const WALL_COLOR = '#fef3c7';
const ARCH_W = 2.5;
const ARCH_H = 3;
const ARCH_HALF = ARCH_W / 2;
const WEST_SEG_LEN = (DEPTH - ARCH_W) / 2;
const SOUTH_SEG_LEN = (WIDTH - ARCH_W) / 2;

export function Room2Walls(): React.JSX.Element {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[CX, -THICK / 2, CZ]} receiveShadow>
        <boxGeometry args={[WIDTH, THICK, DEPTH]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>
      <mesh position={[CX, HEIGHT / 2, CZ - HD]} receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX + HW, HEIGHT / 2, CZ]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* West wall — archway to Room1 */}
      <mesh position={[CX - HW, HEIGHT / 2, CZ - ARCH_HALF - WEST_SEG_LEN / 2]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT, WEST_SEG_LEN]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX - HW, HEIGHT / 2, CZ + ARCH_HALF + WEST_SEG_LEN / 2]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT, WEST_SEG_LEN]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX - HW, ARCH_H + (HEIGHT - ARCH_H) / 2, CZ]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT - ARCH_H, ARCH_W]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* South wall — archway to Room3 */}
      <mesh position={[CX - ARCH_HALF - SOUTH_SEG_LEN / 2, HEIGHT / 2, CZ + HD]} receiveShadow>
        <boxGeometry args={[SOUTH_SEG_LEN, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX + ARCH_HALF + SOUTH_SEG_LEN / 2, HEIGHT / 2, CZ + HD]} receiveShadow>
        <boxGeometry args={[SOUTH_SEG_LEN, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX, ARCH_H + (HEIGHT - ARCH_H) / 2, CZ + HD]} receiveShadow>
        <boxGeometry args={[ARCH_W, HEIGHT - ARCH_H, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
    </RigidBody>
  );
}
