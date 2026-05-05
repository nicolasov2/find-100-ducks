import { RigidBody } from '@react-three/rapier';

const POUF_DEFAULT = '#7c3aed';

export interface PoufProps {
  position: readonly [number, number, number];
  color?: string;
}

export function Pouf({
  position,
  color = POUF_DEFAULT,
}: PoufProps): React.JSX.Element {
  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.36, 0.36, 16]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.38, 0]} scale={[1, 0.4, 1]} castShadow>
          <sphereGeometry args={[0.4, 14, 10]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
      </RigidBody>
    </group>
  );
}
