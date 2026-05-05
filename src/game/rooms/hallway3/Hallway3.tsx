import { RigidBody } from '@react-three/rapier';

const LENGTH = 2;
const WIDTH = 2.5;
const HEIGHT = 3;
const THICK = 0.2;
const HALF_W = WIDTH / 2;

const FLOOR_COLOR = '#a8a29e';
const WALL_COLOR = '#7c3a1c';

const START_Z = 10;
const MID_Z = START_Z + LENGTH / 2;

export function Hallway3(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -THICK / 2, MID_Z]} receiveShadow>
          <boxGeometry args={[WIDTH, THICK, LENGTH]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        <mesh position={[-HALF_W, HEIGHT / 2, MID_Z]} castShadow receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        <mesh position={[HALF_W, HEIGHT / 2, MID_Z]} castShadow receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>
      <pointLight position={[0, 2.5, MID_Z]} intensity={6} distance={6} decay={2} color="#fef3c7" />
    </group>
  );
}
