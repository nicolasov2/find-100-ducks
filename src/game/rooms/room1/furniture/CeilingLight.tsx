import { CylinderGeometry, MeshStandardMaterial, SphereGeometry } from 'three';
import type { Vector3Tuple } from 'three';

const SHADE_GEOM = new CylinderGeometry(0.22, 0.32, 0.18, 14, 1, true);
const CORD_GEOM  = new CylinderGeometry(0.012, 0.012, 0.55, 6);
const BULB_GEOM  = new SphereGeometry(0.09, 10, 8);
const SHADE_MAT  = new MeshStandardMaterial({ color: '#fde68a', roughness: 0.6, side: 2 });
const CORD_MAT   = new MeshStandardMaterial({ color: '#1c1c1c', roughness: 0.9 });
const BULB_MAT   = new MeshStandardMaterial({ color: '#fffbeb', emissive: '#fef9c3', emissiveIntensity: 1.2, roughness: 0.3 });

interface Props {
  position: Vector3Tuple;
  intensity?: number;
  color?: string;
}

export function CeilingLight({ position, intensity = 4, color = '#fff8e1' }: Props): React.JSX.Element {
  const [x, , z] = position;
  const ceilY = 4; // WALL_HEIGHT = 4
  const hangY = ceilY - 0.55 / 2 - 0.09;

  return (
    <group>
      {/* Cord */}
      <mesh position={[x, ceilY - 0.55 / 2, z]} geometry={CORD_GEOM} material={CORD_MAT} />
      {/* Shade */}
      <mesh position={[x, hangY - 0.05, z]} geometry={SHADE_GEOM} material={SHADE_MAT} />
      {/* Bulb */}
      <mesh position={[x, hangY, z]} geometry={BULB_GEOM} material={BULB_MAT} />
      {/* Light source */}
      <pointLight position={[x, hangY - 0.2, z]} intensity={intensity} distance={16} decay={2} color={color} castShadow={false} />
    </group>
  );
}
