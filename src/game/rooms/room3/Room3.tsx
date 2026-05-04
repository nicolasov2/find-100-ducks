import { RigidBody } from '@react-three/rapier';
import { Desk } from './furniture/Desk';
import { TallBookcase } from './furniture/TallBookcase';
import { ReadingChair } from './furniture/ReadingChair';
import { Globe } from './furniture/Globe';
import { Rug } from './furniture/Rug';
import { Fireplace } from './furniture/Fireplace';
import { CoffeeTable } from './furniture/CoffeeTable';
import { WallClock } from './furniture/WallClock';
import { Lamp } from '@/game/rooms/room1/furniture/Lamp';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { BookStack } from '@/game/rooms/room1/furniture/BookStack';

/**
 * Room 3 — Library (14 × 12)
 * North wall at z = 15 (connects to Hallway 2 which ends at z=15)
 * South wall at z = 27
 * Center at x = 28, z = 21
 */

const WIDTH = 14;
const DEPTH = 12;
const HEIGHT = 4;
const THICK = 0.2;

const CX = 28;
const CZ = 21;
const HW = WIDTH / 2;  // 7
const HD = DEPTH / 2;  // 6

const FLOOR_COLOR = '#44200e'; // dark wood
const WALL_COLOR = '#365314';  // warm green

/* North wall archway at x=CX center */
const ARCH_W = 2.5;
const ARCH_H = 3;
const ARCH_HALF = ARCH_W / 2;
const NORTH_SEG_LEN = (WIDTH - ARCH_W) / 2;

export function Room3(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Floor */}
        <mesh position={[CX, -THICK / 2, CZ]} receiveShadow>
          <boxGeometry args={[WIDTH, THICK, DEPTH]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>

        {/* South wall */}
        <mesh position={[CX, HEIGHT / 2, CZ + HD]} receiveShadow>
          <boxGeometry args={[WIDTH, HEIGHT, THICK]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* East wall */}
        <mesh position={[CX + HW, HEIGHT / 2, CZ]} receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* West wall */}
        <mesh position={[CX - HW, HEIGHT / 2, CZ]} receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* North wall — archway at x=CX */}
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

      {/* ── Furniture ── */}

      {/* Tall bookcases along south wall */}
      <TallBookcase position={[CX - 4, 0, CZ + HD - 0.4]} />
      <TallBookcase position={[CX + 4, 0, CZ + HD - 0.4]} />

      {/* Tall bookcase on west wall */}
      <TallBookcase position={[CX - HW + 0.4, 0, CZ + 1]} rotationY={Math.PI / 2} />

      {/* Desk — center-north area */}
      <Desk position={[CX + 3, 0, CZ - 3]} rotationY={-Math.PI / 4} />

      {/* Chair at desk */}
      <ReadingChair position={[CX + 4.2, 0, CZ - 1.8]} rotationY={Math.PI + Math.PI / 4} />

      {/* Fireplace — east wall */}
      <Fireplace position={[CX + HW - 0.5, 0, CZ]} rotationY={-Math.PI / 2} />

      {/* Reading area: chair + coffee table in front of fireplace */}
      <ReadingChair position={[CX + 3, 0, CZ]} rotationY={Math.PI / 2} />
      <CoffeeTable position={[CX + 4.5, 0, CZ + 1.5]} />

      {/* Globe on desk area */}
      <Globe position={[CX - 2, 0, CZ - 3.5]} />

      {/* Rug in center */}
      <Rug position={[CX, 0, CZ]} width={5} depth={4} />

      {/* Wall clock on south wall */}
      <WallClock position={[CX, 2.5, CZ + HD - 0.12]} />

      {/* Floor lamps */}
      <Lamp position={[CX - HW + 1.5, 0, CZ - HD + 1]} />
      <Lamp position={[CX + HW - 1.5, 0, CZ + HD - 1]} />

      {/* Plants */}
      <Plant position={[CX - HW + 0.8, 0, CZ - HD + 0.8]} />
      <Plant position={[CX + HW - 0.8, 0, CZ + HD - 0.8]} />

      {/* Book stacks scattered */}
      <BookStack position={[CX - 1, 0.85, CZ - 3]} />
      <BookStack position={[CX + 2, 0, CZ + 3]} />
      <BookStack position={[CX - 3, 0, CZ + 4]} />

      {/* Lighting */}
      <pointLight position={[CX, 3.5, CZ]} intensity={6} distance={12} decay={2} color="#fef3c7" />
      <pointLight position={[CX - 3, 3.5, CZ - 2]} intensity={3} distance={8} decay={2} color="#fef3c7" />
    </group>
  );
}
