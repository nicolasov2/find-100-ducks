import { RigidBody } from '@react-three/rapier';
import { Counter } from './furniture/Counter';
import { Fridge } from './furniture/Fridge';
import { RoundTable } from './furniture/RoundTable';
import { Stool } from './furniture/Stool';
import { Oven } from './furniture/Oven';
import { CabinetWall } from './furniture/CabinetWall';
import { TrashCan } from './furniture/TrashCan';
import { Microwave } from './furniture/Microwave';
import { Plant } from '@/game/rooms/room1/furniture/Plant';
import { CardboardBox } from '@/game/rooms/room1/furniture/CardboardBox';

/**
 * Room 2 — Kitchen (16 × 14)
 * West wall at x = 20 (connects to Hallway 1 which ends at x=20)
 * East wall at x = 36
 * Center at x = 28, z = 0
 * Archway on west wall (from hallway) and south wall (to Hallway 2)
 */

const WIDTH = 16;
const DEPTH = 14;
const HEIGHT = 4;
const THICK = 0.2;

const CX = 28; // center x
const CZ = 0;  // center z
const HW = WIDTH / 2;  // 8
const HD = DEPTH / 2;  // 7

const FLOOR_COLOR = '#d6d3d1'; // light tile
const WALL_COLOR = '#fef3c7';  // warm cream

/* Archway dimensions */
const ARCH_W = 2.5;
const ARCH_H = 3;
const ARCH_HALF = ARCH_W / 2;

/* West wall archway at z=0 */
const WEST_SEG_LEN = (DEPTH - ARCH_W) / 2;
/* South wall archway at x=28 (center) */
const SOUTH_SEG_LEN = (WIDTH - ARCH_W) / 2;

export function Room2(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Floor */}
        <mesh position={[CX, -THICK / 2, CZ]} receiveShadow>
          <boxGeometry args={[WIDTH, THICK, DEPTH]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>

        {/* North wall */}
        <mesh position={[CX, HEIGHT / 2, CZ - HD]} receiveShadow>
          <boxGeometry args={[WIDTH, HEIGHT, THICK]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* East wall */}
        <mesh position={[CX + HW, HEIGHT / 2, CZ]} receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, DEPTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* West wall — archway at z=0 */}
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

        {/* South wall — archway at x=CX (center) */}
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

      {/* ── Furniture ── */}
      {/* Counter along north wall */}
      <Counter position={[CX - 1.5, 0, CZ - HD + 0.6]} />

      {/* Fridge — northeast corner */}
      <Fridge position={[CX + HW - 0.8, 0, CZ - HD + 0.6]} rotationY={Math.PI} />

      {/* Oven — east side of counter */}
      <Oven position={[CX + 2.5, 0, CZ - HD + 0.6]} rotationY={Math.PI} />

      {/* Upper cabinets */}
      <CabinetWall position={[CX - 1.5, 2.3, CZ - HD + 0.3]} width={4} />

      {/* Microwave on counter */}
      <Microwave position={[CX - 3, 1.0, CZ - HD + 0.6]} />

      {/* Round dining table — center-south area */}
      <RoundTable position={[CX, 0, CZ + 2]} />

      {/* Stools around counter */}
      <Stool position={[CX - 2, 0, CZ - HD + 2]} />
      <Stool position={[CX - 0.5, 0, CZ - HD + 2]} />
      <Stool position={[CX + 1, 0, CZ - HD + 2]} />

      {/* Trash can */}
      <TrashCan position={[CX + HW - 0.5, 0, CZ + HD - 1]} />

      {/* Reused furniture */}
      <Plant position={[CX + HW - 0.8, 0, CZ + HD - 0.8]} />
      <Plant position={[CX - HW + 0.8, 0, CZ + HD - 0.8]} />
      <CardboardBox position={[CX - HW + 1, 0, CZ - 2]} rotationY={0.2} />

      {/* Lighting */}
      <pointLight position={[CX, 3.5, CZ]} intensity={8} distance={12} decay={2} color="#fef3c7" />
      <pointLight position={[CX - 3, 3.5, CZ - 3]} intensity={4} distance={8} decay={2} color="#fef3c7" />
    </group>
  );
}
