import { RigidBody } from '@react-three/rapier';

const ROOM_SIZE = 20;
const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.2;
const FLOOR_THICKNESS = 0.2;
const HALF = ROOM_SIZE / 2;

const FLOOR_COLOR = '#3f3f46';
const WALL_COLOR = '#71717a';

export function TestRoom(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, -FLOOR_THICKNESS / 2, 0]}
          receiveShadow
        >
          <boxGeometry args={[ROOM_SIZE, FLOOR_THICKNESS, ROOM_SIZE]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, WALL_HEIGHT / 2, -HALF]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, WALL_HEIGHT / 2, HALF]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[ROOM_SIZE, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-HALF, WALL_HEIGHT / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[HALF, WALL_HEIGHT / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, ROOM_SIZE]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>
    </group>
  );
}
