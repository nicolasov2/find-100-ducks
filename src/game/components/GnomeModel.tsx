'use client';

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { ConeGeometry, MeshStandardMaterial, SphereGeometry } from 'three';

export const GNOME_MODEL_PATH = '/models/gnome.glb';

export const GNOME_BODY_GEOM = new SphereGeometry(0.13, 12, 8);
export const GNOME_HEAD_GEOM = new SphereGeometry(0.07, 10, 8);
export const GNOME_BEAK_GEOM = new ConeGeometry(0.035, 0.07, 8);

export interface GnomeModelProps {
  useFallback?: boolean;
  bodyColor?: string;
  beakColor?: string;
  gnomeScale?: number;
}

export function GnomeModel({
  useFallback = true,
  bodyColor = '#fbbf24',
  beakColor = '#f59e0b',
  gnomeScale = 1,
}: GnomeModelProps): React.JSX.Element {
  return useFallback ? (
    <FallbackGnome bodyColor={bodyColor} beakColor={beakColor} gnomeScale={gnomeScale} />
  ) : (
    <RealGnome gnomeScale={gnomeScale} />
  );
}

/**
 * Each gnome gets its own material instances so the proximity glow
 * system can modify emissive per-gnome without affecting others.
 */
function FallbackGnome({
  bodyColor,
  beakColor,
  gnomeScale,
}: {
  bodyColor: string;
  beakColor: string;
  gnomeScale: number;
}): React.JSX.Element {
  const bodyMat = useMemo(() => new MeshStandardMaterial({ color: bodyColor }), [bodyColor]);
  const beakMat = useMemo(() => new MeshStandardMaterial({ color: beakColor }), [beakColor]);

  return (
    <group scale={gnomeScale}>
      <mesh castShadow position={[0, 0.1, 0]} geometry={GNOME_BODY_GEOM} material={bodyMat} />
      <mesh castShadow position={[0, 0.21, -0.04]} geometry={GNOME_HEAD_GEOM} material={bodyMat} />
      <mesh
        castShadow
        position={[0, 0.21, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={GNOME_BEAK_GEOM}
        material={beakMat}
      />
    </group>
  );
}

function RealGnome({ gnomeScale }: { gnomeScale: number }): React.JSX.Element {
  const gltf = useGLTF(GNOME_MODEL_PATH);
  return (
    <group scale={gnomeScale}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}
