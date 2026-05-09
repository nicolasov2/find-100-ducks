import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

/** Scale-1 bounds; worldAabb should apply scale when building registry. */
export const LOCAL_BOUNDS: LocalBounds = { min: [-0.60, 0, -0.48], max: [0.60, 0.76, 0.48] };

const FOLIAGE = '#16a34a';
const FOLIAGE_DARK = '#15803d';

export interface BushProps {
  position: readonly [number, number, number];
  scale?: number;
  flowerColor?: string;
}

export function Bush({
  position,
  scale = 1,
  flowerColor,
}: BushProps): React.JSX.Element {
  return (
    <group position={position} scale={scale}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.32, 0]} castShadow>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color={FOLIAGE_DARK} flatShading roughness={0.9} />
        </mesh>
        <mesh position={[0.28, 0.4, 0.1]} castShadow>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading roughness={0.9} />
        </mesh>
        <mesh position={[-0.2, 0.45, -0.18]} castShadow>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading roughness={0.9} />
        </mesh>
        {flowerColor !== undefined && (
          <>
            <mesh position={[0.15, 0.65, 0.05]}>
              <sphereGeometry args={[0.06, 8, 6]} />
              <meshStandardMaterial color={flowerColor} emissive={flowerColor} emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[-0.1, 0.6, 0.18]}>
              <sphereGeometry args={[0.05, 8, 6]} />
              <meshStandardMaterial color={flowerColor} emissive={flowerColor} emissiveIntensity={0.2} />
            </mesh>
          </>
        )}
      </RigidBody>
    </group>
  );
}
