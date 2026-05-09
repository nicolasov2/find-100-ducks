import { RigidBody } from '@react-three/rapier';
import type { LocalBounds } from '@/game/types';

export const LOCAL_BOUNDS: LocalBounds = { min: [-0.38, 0, -0.38], max: [0.38, 0.90, 0.38] };

const POT = '#92400e';
const FOLIAGE = '#15803d';
const FOLIAGE_LIGHT = '#22c55e';

export interface PlantProps {
  position: readonly [number, number, number];
}

export function Plant({ position }: PlantProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.18, 0.36, 14]} />
          <meshStandardMaterial color={POT} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading />
        </mesh>
        <mesh position={[-0.18, 0.65, 0.1]} castShadow>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={FOLIAGE_LIGHT} flatShading />
        </mesh>
        <mesh position={[0.2, 0.7, -0.05]} castShadow>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={FOLIAGE} flatShading />
        </mesh>
      </RigidBody>
    </group>
  );
}
