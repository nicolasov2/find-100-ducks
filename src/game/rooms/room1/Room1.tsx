import { RigidBody } from '@react-three/rapier';
import { Table } from './furniture/Table';
import { Chair } from './furniture/Chair';
import { Sofa } from './furniture/Sofa';
import { Shelf } from './furniture/Shelf';
import { Lamp } from './furniture/Lamp';
import { Bed } from './furniture/Bed';

const ROOM_SIZE = 20;
const WALL_HEIGHT = 4;
const WALL_THICKNESS = 0.2;
const FLOOR_THICKNESS = 0.2;
const HALF = ROOM_SIZE / 2;

const FLOOR_COLOR = '#3f3f46';
const WALL_COLOR = '#71717a';

export function Room1(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -FLOOR_THICKNESS / 2, 0]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, FLOOR_THICKNESS, ROOM_SIZE]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        <mesh position={[0, WALL_HEIGHT / 2, -HALF]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[0, WALL_HEIGHT / 2, HALF]} receiveShadow>
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[-HALF, WALL_HEIGHT / 2, 0]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[HALF, WALL_HEIGHT / 2, 0]} receiveShadow>
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
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
    </group>
  );
}
