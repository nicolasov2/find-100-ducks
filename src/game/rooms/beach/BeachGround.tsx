'use client';

import { MeshStandardMaterial } from 'three';

// Module-scope materials — shared, never reallocated per frame (R3F rule).
const SAND_MAT = new MeshStandardMaterial({ color: '#e6d2a0', roughness: 1 });
const SEA_MAT = new MeshStandardMaterial({
  color: '#1f6f87',
  roughness: 0.35,
  metalness: 0.15,
  emissive: '#b25a2a',
  emissiveIntensity: 0.12,
});

/** Visual base: a warm sand plane the props sit on, plus a low sea plane to the north. */
export function BeachGround(): React.JSX.Element {
  return (
    <group>
      {/* Dry sand — props and gnomes rest on this; receives prop shadows. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 4]}
        material={SAND_MAT}
        receiveShadow
      >
        <planeGeometry args={[42, 28]} />
      </mesh>

      {/* Sea — extends to the horizon beyond the shoreline (−z), sits just below sand. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, -55]}
        material={SEA_MAT}
      >
        <planeGeometry args={[220, 110]} />
      </mesh>
    </group>
  );
}
