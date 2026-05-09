import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

/** Scale-1 bounds; foliage clusters extend to r≈1.0 from center. */
export const LOCAL_BOUNDS: LocalBounds = { min: [-1.0, 0, -0.95], max: [1.0, 3.35, 0.95] };

const TRUNK = '#5b3a1f';
const FOLIAGE = '#15803d';
const FOLIAGE_LIGHT = '#22c55e';

export interface TreeProps {
  position: readonly [number, number, number];
  scale?: number;
}

export function Tree({ position, scale = 1 }: TreeProps): React.JSX.Element {
  return (
    <group position={position} scale={scale}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.25, 2.0, 10]} />
          <meshStandardMaterial color={TRUNK} roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.4, 0]} castShadow>
          <icosahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading roughness={0.85} />
        </mesh>
        <mesh position={[0.4, 2.6, 0.2]} castShadow>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color={FOLIAGE_LIGHT} flatShading roughness={0.85} />
        </mesh>
        <mesh position={[-0.3, 2.7, -0.3]} castShadow>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading roughness={0.85} />
        </mesh>
      </RigidBody>
    </group>
  );
}
