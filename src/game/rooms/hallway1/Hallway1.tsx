import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

/**
 * Hallway 1: Connects Room 1 east wall to Room 2 west wall.
 * Origin at Room 1 east wall (x=10), extends east 10m.
 * Width 2.5m (z = -1.25 to z = +1.25), Height 3m.
 */

const LENGTH = 10;
const WIDTH = 2.5;
const HEIGHT = 3;
const THICK = 0.2;
const HALF_W = WIDTH / 2;

const FLOOR_COLOR = '#52525b';
const WALL_COLOR = '#78716c';
const CEILING_COLOR = '#52525b';

/* Origin: starts at x=10 (Room1 east wall) */
const START_X = 10;
const MID_X = START_X + LENGTH / 2;

export function Hallway1(): React.JSX.Element {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Floor */}
        <mesh position={[MID_X, -THICK / 2, 0]} receiveShadow>
          <boxGeometry args={[LENGTH, THICK, WIDTH]} />
          <meshStandardMaterial color={FLOOR_COLOR} />
        </mesh>
        {/* Ceiling */}
        <mesh position={[MID_X, HEIGHT, 0]}>
          <boxGeometry args={[LENGTH, THICK, WIDTH]} />
          <meshStandardMaterial color={CEILING_COLOR} />
        </mesh>
        {/* South wall (z = -HALF_W) */}
        <mesh position={[MID_X, HEIGHT / 2, -HALF_W]} receiveShadow>
          <boxGeometry args={[LENGTH, HEIGHT, THICK]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
        {/* North wall (z = +HALF_W) */}
        <mesh position={[MID_X, HEIGHT / 2, HALF_W]} receiveShadow>
          <boxGeometry args={[LENGTH, HEIGHT, THICK]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      </RigidBody>

      {/* Wall-mounted light */}
      <pointLight position={[MID_X, 2.5, 0]} intensity={4} distance={8} decay={2} color="#fef3c7" />
      {/* Light sconce mesh */}
      <mesh position={[MID_X, 2.5, -HALF_W + 0.15]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.5} side={DoubleSide} />
      </mesh>

      {/* Small rug on floor */}
      <mesh position={[MID_X, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial color="#7c2d12" side={DoubleSide} />
      </mesh>
    </group>
  );
}
