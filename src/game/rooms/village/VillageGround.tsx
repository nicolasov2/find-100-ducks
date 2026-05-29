'use client';

import { MeshStandardMaterial } from 'three';
import { WALK_ZONES } from './layout';

// Module-scope materials — shared, never reallocated per frame (R3F rule).
const GRASS_MAT = new MeshStandardMaterial({ color: '#6f9447', roughness: 1 });
const PATH_MAT = new MeshStandardMaterial({ color: '#bda06d', roughness: 1 });

/** Visual ground: a grass field, with dirt paths laid over the street + plaza. */
export function VillageGround(): React.JSX.Element {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -3]} material={GRASS_MAT} receiveShadow>
        <planeGeometry args={[64, 76]} />
      </mesh>
      {WALK_ZONES.map((z, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[(z.x0 + z.x1) / 2, 0.02, (z.z0 + z.z1) / 2]}
          material={PATH_MAT}
          receiveShadow
        >
          <planeGeometry args={[z.x1 - z.x0, z.z1 - z.z0]} />
        </mesh>
      ))}
    </group>
  );
}
