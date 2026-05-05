'use client';

import { useMemo } from 'react';
import {
  ConeGeometry,
  CylinderGeometry,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three';
import type { BeardStyle } from '@/game/utils/gnomePalettes';

export const GNOME_MODEL_PATH = '/models/gnome.glb';

export const GNOME_HAT_GEOM = new ConeGeometry(0.10, 0.20, 12);
export const GNOME_HEAD_GEOM = new SphereGeometry(0.07, 12, 8);
export const GNOME_BEARD_GEOM = new SphereGeometry(0.06, 8, 6);
export const GNOME_BODY_GEOM = new CylinderGeometry(0.09, 0.11, 0.18, 12);
export const GNOME_BASE_GEOM = new CylinderGeometry(0.13, 0.13, 0.04, 12);
export const GNOME_NOSE_GEOM = new SphereGeometry(0.022, 8, 6);

const SKIN_MAT = new MeshStandardMaterial({ color: '#fde0a8', roughness: 0.7 });
const BEARD_MAT = new MeshStandardMaterial({ color: '#f3f4f6', roughness: 0.85 });
const BASE_MAT = new MeshStandardMaterial({ color: '#1f1f23', roughness: 0.9 });
const NOSE_MAT = new MeshStandardMaterial({ color: '#f87171', roughness: 0.6 });

export interface GnomeModelProps {
  useFallback?: boolean;
  bodyColor?: string;
  hatColor?: string;
  beardStyle?: BeardStyle;
  gnomeScale?: number;
}

export function GnomeModel({
  useFallback: _useFallback = true,
  bodyColor = '#dc2626',
  hatColor = '#dc2626',
  beardStyle = 'normal',
  gnomeScale = 1,
}: GnomeModelProps): React.JSX.Element {
  const bodyMat = useMemo(
    () => new MeshStandardMaterial({ color: bodyColor, roughness: 0.7 }),
    [bodyColor],
  );
  const hatMat = useMemo(
    () => new MeshStandardMaterial({ color: hatColor, roughness: 0.6 }),
    [hatColor],
  );

  const beardScaleY = beardStyle === 'long' ? 1.6 : 0.6;
  const beardOffsetY = beardStyle === 'long' ? 0.20 : 0.22;

  return (
    <group scale={gnomeScale}>
      <mesh position={[0, 0.02, 0]} castShadow geometry={GNOME_BASE_GEOM} material={BASE_MAT} />
      <mesh position={[0, 0.13, 0]} castShadow geometry={GNOME_BODY_GEOM} material={bodyMat} />
      <mesh position={[0, 0.26, 0]} castShadow geometry={GNOME_HEAD_GEOM} material={SKIN_MAT} />
      {beardStyle !== 'none' && (
        <mesh
          position={[0, beardOffsetY, 0.05]}
          scale={[1, beardScaleY, 0.6]}
          castShadow
          geometry={GNOME_BEARD_GEOM}
          material={BEARD_MAT}
        />
      )}
      <mesh position={[0, 0.26, 0.07]} geometry={GNOME_NOSE_GEOM} material={NOSE_MAT} />
      <mesh position={[0, 0.43, 0]} castShadow geometry={GNOME_HAT_GEOM} material={hatMat} />
    </group>
  );
}
