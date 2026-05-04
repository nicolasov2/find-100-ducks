import { RigidBody } from '@react-three/rapier';
import { Table } from './furniture/Table';
import { Chair } from './furniture/Chair';
import { Sofa } from './furniture/Sofa';
import { Shelf } from './furniture/Shelf';
import { Lamp } from './furniture/Lamp';
import { Bed } from './furniture/Bed';
import { CardboardBox } from './furniture/CardboardBox';
import { BookStack } from './furniture/BookStack';
import { Plant } from './furniture/Plant';
import { FloorCushion } from './furniture/FloorCushion';
import { TVStand } from './furniture/TVStand';
import { CoatRack } from './furniture/CoatRack';
import { WallPainting } from './furniture/WallPainting';
import { SideTable } from './furniture/SideTable';

const ROOM_SIZE = 20;
const WALL_HEIGHT = 4;
const WALL_THICKNESS = 0.2;
const FLOOR_THICKNESS = 0.2;
const HALF = ROOM_SIZE / 2;

const FLOOR_COLOR = '#3f3f46';
const WALL_COLOR = '#71717a';

/* Archway on east wall: 2.5m wide × 3m tall, centered at z=0 */
const ARCHWAY_WIDTH = 2.5;
const ARCHWAY_HEIGHT = 3;
const ARCHWAY_HALF_W = ARCHWAY_WIDTH / 2;

/* East wall is split into 2 segments + lintel above archway */
const EAST_SEG_LENGTH = (ROOM_SIZE - ARCHWAY_WIDTH) / 2;

export function Room1(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Floor */}
        <mesh position={[0, -FLOOR_THICKNESS / 2, 0]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, FLOOR_THICKNESS, ROOM_SIZE]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        {/* North wall */}
        <mesh position={[0, WALL_HEIGHT / 2, -HALF]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* South wall */}
        <mesh position={[0, WALL_HEIGHT / 2, HALF]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* West wall */}
        <mesh position={[-HALF, WALL_HEIGHT / 2, 0]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>

        {/* East wall — split for archway */}
        <mesh position={[HALF, WALL_HEIGHT / 2, -(ARCHWAY_HALF_W + EAST_SEG_LENGTH / 2)]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, EAST_SEG_LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[HALF, WALL_HEIGHT / 2, ARCHWAY_HALF_W + EAST_SEG_LENGTH / 2]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, EAST_SEG_LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[HALF, ARCHWAY_HEIGHT + (WALL_HEIGHT - ARCHWAY_HEIGHT) / 2, 0]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT - ARCHWAY_HEIGHT, ARCHWAY_WIDTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      {/* ── Dining area ── */}
      <Table />
      <Chair position={[0, 0, -2]} rotationY={0} />
      <Chair position={[0, 0, 2]} rotationY={Math.PI} />
      <Chair position={[2.5, 0, 0]} rotationY={-Math.PI / 2} />
      <Chair position={[-2.5, 0, 0]} rotationY={Math.PI / 2} />

      {/* ── Living area ── */}
      <Sofa position={[-4, 0, 7]} />
      <TVStand position={[-4, 0, 4.5]} rotationY={Math.PI} />
      <SideTable position={[-7, 0, 7]} />
      <SideTable position={[-1, 0, 7.5]} />

      {/* ── Bedroom area ── */}
      <Bed position={[6, 0, -7]} />
      <SideTable position={[8.5, 0, -8.5]} />

      {/* ── Lamps ── */}
      <Lamp position={[8, 0, 8]} />
      <Lamp position={[-9, 0, 3]} />

      {/* ── Shelves ── */}
      <Shelf position={[-6, 0, -9.5]} />
      <Shelf position={[4, 0, -9.5]} />
      <Shelf position={[-9.5, 0, -4]} />

      {/* ── Boxes ── */}
      <CardboardBox position={[-8, 0, 5.5]} rotationY={0.3} />
      <CardboardBox position={[8.5, 0, -5.5]} rotationY={-0.4} />
      <CardboardBox position={[-2, 0, -8.5]} rotationY={0.15} />
      <CardboardBox position={[7, 0, 3]} rotationY={0.8} />
      <CardboardBox position={[-8.5, 0, -6]} rotationY={-0.2} />

      {/* ── Book stacks ── */}
      <BookStack position={[1.6, 0.9, -0.6]} />
      <BookStack position={[-1.7, 0.9, 0.6]} />
      <BookStack position={[-6, 1.55, -9.5]} />
      <BookStack position={[4, 2.55, -9.5]} />
      <BookStack position={[-7, 0.55, 7]} />
      <BookStack position={[8.5, 0.55, -8.5]} />

      {/* ── Plants ── */}
      <Plant position={[-9, 0, -9]} />
      <Plant position={[-8.5, 0, 8.8]} />
      <Plant position={[8.6, 0, -2]} />
      <Plant position={[3, 0, 9]} />
      <Plant position={[-4, 0, -6]} />

      {/* ── Cushions ── */}
      <FloorCushion position={[2, 0, 5]} rotationY={0.2} />
      <FloorCushion position={[-3, 0, 4]} rotationY={-0.4} color="#06b6d4" trim="#0e7490" />
      <FloorCushion position={[5, 0, 5.5]} rotationY={0.6} color="#ef4444" trim="#991b1b" />
      <FloorCushion position={[-6, 0, 5]} rotationY={0.1} color="#a855f7" trim="#7e22ce" />

      {/* ── Coat rack ── */}
      <CoatRack position={[9, 0, -9]} />
      <CoatRack position={[-9.5, 0, 0]} />

      {/* ── Wall paintings ── */}
      <WallPainting position={[-3, 2.2, -9.85]} colorIndex={0} width={1.0} height={0.7} />
      <WallPainting position={[7, 2.5, -9.85]} colorIndex={1} width={0.6} height={0.8} />
      <WallPainting position={[-9.85, 2.0, 5]} rotationY={Math.PI / 2} colorIndex={2} />
      <WallPainting position={[-9.85, 2.8, -5]} rotationY={Math.PI / 2} colorIndex={3} width={1.2} height={0.5} />
      <WallPainting position={[5, 2.3, 9.85]} rotationY={Math.PI} colorIndex={4} />
    </group>
  );
}
