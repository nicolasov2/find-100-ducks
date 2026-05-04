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
        {/* Segment south of archway */}
        <mesh
          position={[HALF, WALL_HEIGHT / 2, -(ARCHWAY_HALF_W + EAST_SEG_LENGTH / 2)]}
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, EAST_SEG_LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* Segment north of archway */}
        <mesh
          position={[HALF, WALL_HEIGHT / 2, ARCHWAY_HALF_W + EAST_SEG_LENGTH / 2]}
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, EAST_SEG_LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* Lintel above archway */}
        <mesh
          position={[HALF, ARCHWAY_HEIGHT + (WALL_HEIGHT - ARCHWAY_HEIGHT) / 2, 0]}
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT - ARCHWAY_HEIGHT, ARCHWAY_WIDTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      <Table />
      <Chair position={[0, 0, -2]} rotationY={0} />
      <Chair position={[0, 0, 2]} rotationY={Math.PI} />
      <Chair position={[2.5, 0, 0]} rotationY={-Math.PI / 2} />
      <Chair position={[-2.5, 0, 0]} rotationY={Math.PI / 2} />

      <Sofa position={[-4, 0, 7]} />
      <Bed position={[6, 0, -7]} />
      <Lamp position={[8, 0, 8]} />

      <Shelf position={[-6, 0, -9.5]} />
      <Shelf position={[4, 0, -9.5]} />

      <CardboardBox position={[-8, 0, 5.5]} rotationY={0.3} />
      <CardboardBox position={[8.5, 0, -5.5]} rotationY={-0.4} />
      <CardboardBox position={[-2, 0, -8.5]} rotationY={0.15} />

      <BookStack position={[1.6, 0.9, -0.6]} />
      <BookStack position={[-1.7, 0.9, 0.6]} />
      <BookStack position={[-6, 1.55, -9.5]} />
      <BookStack position={[4, 2.55, -9.5]} />

      <Plant position={[-9, 0, -9]} />
      <Plant position={[-8.5, 0, 8.8]} />
      <Plant position={[8.6, 0, -2]} />

      <FloorCushion position={[2, 0, 5]} rotationY={0.2} />
      <FloorCushion position={[-3, 0, 4]} rotationY={-0.4} color="#06b6d4" trim="#0e7490" />
      <FloorCushion position={[5, 0, 5.5]} rotationY={0.6} color="#ef4444" trim="#991b1b" />
    </group>
  );
}
