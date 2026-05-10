import { RigidBody } from '@react-three/rapier';

const ROOM_SIZE = 20;
const WALL_HEIGHT = 4;
const WALL_THICKNESS = 0.2;
const FLOOR_THICKNESS = 0.2;
const HALF = ROOM_SIZE / 2;
const FLOOR_COLOR = '#3f3f46';
const WALL_COLOR = '#71717a';
const ARCHWAY_WIDTH = 2.5;
const ARCHWAY_HEIGHT = 3;
const ARCHWAY_HALF_W = ARCHWAY_WIDTH / 2;
const EAST_SEG_LENGTH = (ROOM_SIZE - ARCHWAY_WIDTH) / 2;
const SOUTH_SEG_LENGTH = EAST_SEG_LENGTH;

export function Room1Walls(): React.JSX.Element {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -FLOOR_THICKNESS / 2, 0]} receiveShadow>
        <boxGeometry args={[ROOM_SIZE, FLOOR_THICKNESS, ROOM_SIZE]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>
      <mesh position={[0, WALL_HEIGHT / 2, -HALF]} receiveShadow>
        <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* South wall — split for archway to garden */}
      <mesh position={[-(ARCHWAY_HALF_W + SOUTH_SEG_LENGTH / 2), WALL_HEIGHT / 2, HALF]} receiveShadow>
        <boxGeometry args={[SOUTH_SEG_LENGTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[ARCHWAY_HALF_W + SOUTH_SEG_LENGTH / 2, WALL_HEIGHT / 2, HALF]} receiveShadow>
        <boxGeometry args={[SOUTH_SEG_LENGTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[0, ARCHWAY_HEIGHT + (WALL_HEIGHT - ARCHWAY_HEIGHT) / 2, HALF]} receiveShadow>
        <boxGeometry args={[ARCHWAY_WIDTH, WALL_HEIGHT - ARCHWAY_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
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
  );
}
