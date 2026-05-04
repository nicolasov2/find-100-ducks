import { RigidBody } from '@react-three/rapier';

const FABRIC = '#d97757';
const FABRIC_DARK = '#a85b3f';

const CUSHION_OFFSETS: ReadonlyArray<readonly [number, number, number]> = [
  [-1.5, 0.5, 0],
  [0, 0.5, 0],
  [1.5, 0.5, 0],
];

export interface SofaProps {
  position: readonly [number, number, number];
}

export function Sofa({ position }: SofaProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 0.4, 1.2]} />
          <meshStandardMaterial color={FABRIC_DARK} />
        </mesh>
        <mesh position={[0, 1.1, 0.5]} castShadow>
          <boxGeometry args={[5, 1.0, 0.2]} />
          <meshStandardMaterial color={FABRIC} />
        </mesh>
        <mesh position={[-2.4, 0.6, 0]} castShadow>
          <boxGeometry args={[0.3, 1.2, 1.2]} />
          <meshStandardMaterial color={FABRIC} />
        </mesh>
        <mesh position={[2.4, 0.6, 0]} castShadow>
          <boxGeometry args={[0.3, 1.2, 1.2]} />
          <meshStandardMaterial color={FABRIC} />
        </mesh>
        {CUSHION_OFFSETS.map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <boxGeometry args={[1.4, 0.3, 1.0]} />
            <meshStandardMaterial color={FABRIC} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
