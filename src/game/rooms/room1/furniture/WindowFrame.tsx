import { BoxGeometry, MeshStandardMaterial } from 'three';
import type { Vector3Tuple } from 'three';

const FRAME_MAT  = new MeshStandardMaterial({ color: '#e7e5e4', roughness: 0.5 });
const GLASS_MAT  = new MeshStandardMaterial({ color: '#bae6fd', transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.1 });
const SILL_MAT   = new MeshStandardMaterial({ color: '#d6d3d1', roughness: 0.6 });
const CURTAIN_MAT = new MeshStandardMaterial({ color: '#fef3c7', roughness: 0.9, side: 2 });

const THICK = 0.06;
const W = 1.2;
const H = 1.6;
const BORDER = 0.08;

// Geometries — fixed sizes
const TOP_GEOM    = new BoxGeometry(W, BORDER, THICK);
const BOTTOM_GEOM = new BoxGeometry(W, BORDER, THICK);
const LEFT_GEOM   = new BoxGeometry(BORDER, H, THICK);
const RIGHT_GEOM  = new BoxGeometry(BORDER, H, THICK);
const GLASS_GEOM  = new BoxGeometry(W - BORDER * 2, H - BORDER * 2, 0.02);
const SILL_GEOM   = new BoxGeometry(W + 0.1, 0.06, 0.18);
const CURTAIN_GEOM = new BoxGeometry(0.08, H + 0.3, 0.04);

interface Props {
  position: Vector3Tuple;
  rotationY?: number;
}

export function WindowFrame({ position, rotationY = 0 }: Props): React.JSX.Element {
  const [x, y, z] = position;
  return (
    <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
      {/* Frame borders */}
      <mesh position={[0,  H / 2, 0]} geometry={TOP_GEOM}    material={FRAME_MAT} />
      <mesh position={[0, -H / 2, 0]} geometry={BOTTOM_GEOM} material={FRAME_MAT} />
      <mesh position={[-W / 2, 0, 0]} geometry={LEFT_GEOM}   material={FRAME_MAT} />
      <mesh position={[ W / 2, 0, 0]} geometry={RIGHT_GEOM}  material={FRAME_MAT} />
      {/* Glass */}
      <mesh geometry={GLASS_GEOM} material={GLASS_MAT} />
      {/* Sill */}
      <mesh position={[0, -H / 2 - 0.03, 0.06]} geometry={SILL_GEOM} material={SILL_MAT} />
      {/* Curtains */}
      <mesh position={[-W / 2 - 0.06, 0.15, 0.05]} geometry={CURTAIN_GEOM} material={CURTAIN_MAT} />
      <mesh position={[ W / 2 + 0.06, 0.15, 0.05]} geometry={CURTAIN_GEOM} material={CURTAIN_MAT} />
    </group>
  );
}
