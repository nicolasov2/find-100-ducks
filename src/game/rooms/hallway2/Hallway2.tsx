import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

/**
 * Hallway 2: Connects Room 2 south wall to Room 3 north wall.
 * Room 2 south wall is at z = +7 (at x=28 center).
 * Hallway goes south 8m from z=7 to z=15.
 */

const LENGTH = 8;
const WIDTH = 2.5;
const HEIGHT = 3;
const THICK = 0.2;
const HALF_W = WIDTH / 2;

const CX = 28;
const START_Z = 7;
const MID_Z = START_Z + LENGTH / 2;

const FLOOR_COLOR = '#44403c';
const WALL_COLOR = '#6b5f50';
const CEILING_COLOR = '#44403c';

export function Hallway2(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Floor */}
        <mesh position={[CX, -THICK / 2, MID_Z]} receiveShadow>
          <boxGeometry args={[WIDTH, THICK, LENGTH]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        {/* Ceiling */}
        <mesh position={[CX, HEIGHT, MID_Z]}>
          <boxGeometry args={[WIDTH, THICK, LENGTH]} />
          <meshStandardMaterial color={CEILING_COLOR} />
        </mesh>
        {/* West wall */}
        <mesh position={[CX - HALF_W, HEIGHT / 2, MID_Z]} receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* East wall */}
        <mesh position={[CX + HALF_W, HEIGHT / 2, MID_Z]} receiveShadow>
          <boxGeometry args={[THICK, HEIGHT, LENGTH]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      {/* Wall-mounted light */}
      <pointLight position={[CX, 2.5, MID_Z]} intensity={4} distance={8} decay={2} color="#fef3c7" />
      <mesh position={[CX + HALF_W - 0.15, 2.5, MID_Z]}>
        <boxGeometry args={[0.1, 0.15, 0.15]} />
        <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.5} side={DoubleSide} />
      </mesh>

      {/* Small rug */}
      <mesh position={[CX, 0.01, MID_Z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 3]} />
        <meshStandardMaterial color="#4a3728" side={DoubleSide} />
      </mesh>
    </group>
  );
}
