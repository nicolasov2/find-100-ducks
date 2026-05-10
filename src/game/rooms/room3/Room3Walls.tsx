import { RigidBody } from '@react-three/rapier';

const WIDTH = 14;
const DEPTH = 12;
const HEIGHT = 4;
const THICK = 0.2;
const CX = 28;
const CZ = 21;
const HW = WIDTH / 2;
const HD = DEPTH / 2;
const FLOOR_COLOR = '#44200e';
const WALL_COLOR = '#365314';
const ARCH_W = 2.5;
const ARCH_H = 3;
const ARCH_HALF = ARCH_W / 2;
const NORTH_SEG_LEN = (WIDTH - ARCH_W) / 2;

export function Room3Walls(): React.JSX.Element {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[CX, -THICK / 2, CZ]} receiveShadow>
        <boxGeometry args={[WIDTH, THICK, DEPTH]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>
      <mesh position={[CX, HEIGHT / 2, CZ + HD]} receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX + HW, HEIGHT / 2, CZ]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX - HW, HEIGHT / 2, CZ]} receiveShadow>
        <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* North wall — archway to Room2 */}
      <mesh position={[CX - ARCH_HALF - NORTH_SEG_LEN / 2, HEIGHT / 2, CZ - HD]} receiveShadow>
        <boxGeometry args={[NORTH_SEG_LEN, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX + ARCH_HALF + NORTH_SEG_LEN / 2, HEIGHT / 2, CZ - HD]} receiveShadow>
        <boxGeometry args={[NORTH_SEG_LEN, HEIGHT, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[CX, ARCH_H + (HEIGHT - ARCH_H) / 2, CZ - HD]} receiveShadow>
        <boxGeometry args={[ARCH_W, HEIGHT - ARCH_H, THICK]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
    </RigidBody>
  );
}
