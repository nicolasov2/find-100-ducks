import { DoubleSide } from 'three';

const RUG_COLOR = '#7f1d1d';
const RUG_BORDER = '#991b1b';

export interface RugProps {
  position: readonly [number, number, number];
  rotationY?: number;
  width?: number;
  depth?: number;
}

export function Rug({
  position,
  rotationY = 0,
  width = 3,
  depth = 2,
}: RugProps): React.JSX.Element {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Border */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={RUG_BORDER} side={DoubleSide} />
      </mesh>
      {/* Inner */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - 0.3, depth - 0.3]} />
        <meshStandardMaterial color={RUG_COLOR} side={DoubleSide} />
      </mesh>
    </group>
  );
}
