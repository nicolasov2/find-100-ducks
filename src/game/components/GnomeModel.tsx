'use client';

import { useMemo } from 'react';
import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three';
import type { BeardStyle } from '@/game/utils/gnomePalettes';

// Shared geometries — allocated once at module load
export const GNOME_HAT_GEOM    = new ConeGeometry(0.105, 0.34, 12);
export const GNOME_BRIM_GEOM   = new CylinderGeometry(0.135, 0.135, 0.018, 14);
export const GNOME_HEAD_GEOM   = new SphereGeometry(0.075, 12, 8);
export const GNOME_NOSE_GEOM   = new SphereGeometry(0.030, 8, 6);
export const GNOME_BODY_GEOM   = new CylinderGeometry(0.082, 0.112, 0.20, 12);
export const GNOME_BELT_GEOM   = new CylinderGeometry(0.097, 0.097, 0.022, 12);
export const GNOME_BUCKLE_GEOM = new BoxGeometry(0.024, 0.020, 0.014);
export const GNOME_ARM_GEOM    = new CylinderGeometry(0.020, 0.020, 0.10, 8);
export const GNOME_HAND_GEOM   = new SphereGeometry(0.022, 6, 4);
export const GNOME_BEARD_GEOM  = new SphereGeometry(0.068, 8, 6);
export const GNOME_BOOT_GEOM   = new SphereGeometry(0.044, 8, 6);

const EYE_GEOM   = new SphereGeometry(0.013, 6, 4);
const PUPIL_GEOM = new SphereGeometry(0.007, 5, 4);
const CHEEK_GEOM = new SphereGeometry(0.020, 6, 4);

// Shared materials
const SKIN_MAT   = new MeshStandardMaterial({ color: '#fde0a8', roughness: 0.7 });
const BEARD_MAT  = new MeshStandardMaterial({ color: '#f3f4f6', roughness: 0.9 });
const NOSE_MAT   = new MeshStandardMaterial({ color: '#f87171', roughness: 0.5 });
const EYE_MAT    = new MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 });
const PUPIL_MAT  = new MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.3 });
const CHEEK_MAT  = new MeshStandardMaterial({ color: '#fca5a5', roughness: 0.8 });
const BELT_MAT   = new MeshStandardMaterial({ color: '#78350f', roughness: 0.7 });
const BUCKLE_MAT = new MeshStandardMaterial({ color: '#d97706', metalness: 0.8, roughness: 0.3 });
const BOOT_MAT   = new MeshStandardMaterial({ color: '#292524', roughness: 0.9 });

export interface GnomeModelProps {
  bodyColor?: string;
  hatColor?: string;
  beardStyle?: BeardStyle;
  gnomeScale?: number;
}

export function GnomeModel({
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
    () => new MeshStandardMaterial({ color: hatColor, roughness: 0.55, metalness: 0.05 }),
    [hatColor],
  );

  const beardScaleY = beardStyle === 'long' ? 2.1 : 1.35;
  const beardY      = beardStyle === 'long' ? 0.14 : 0.21;

  return (
    <group scale={gnomeScale}>
      {/* Boots */}
      <mesh position={[-0.045, 0.04, 0.03]} scale={[1.35, 0.75, 1.5]} castShadow geometry={GNOME_BOOT_GEOM} material={BOOT_MAT} />
      <mesh position={[0.045, 0.04, 0.03]} scale={[1.35, 0.75, 1.5]} castShadow geometry={GNOME_BOOT_GEOM} material={BOOT_MAT} />

      {/* Body */}
      <mesh position={[0, 0.14, 0]} castShadow geometry={GNOME_BODY_GEOM} material={bodyMat} />

      {/* Belt + buckle */}
      <mesh position={[0, 0.134, 0]} geometry={GNOME_BELT_GEOM} material={BELT_MAT} />
      <mesh position={[0, 0.134, 0.098]} geometry={GNOME_BUCKLE_GEOM} material={BUCKLE_MAT} />

      {/* Arms */}
      <mesh position={[-0.115, 0.175, 0]} rotation={[0, 0,  Math.PI / 3]} castShadow geometry={GNOME_ARM_GEOM} material={bodyMat} />
      <mesh position={[ 0.115, 0.175, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow geometry={GNOME_ARM_GEOM} material={bodyMat} />
      {/* Hands */}
      <mesh position={[-0.158, 0.122, 0]} geometry={GNOME_HAND_GEOM} material={SKIN_MAT} />
      <mesh position={[ 0.158, 0.122, 0]} geometry={GNOME_HAND_GEOM} material={SKIN_MAT} />

      {/* Head */}
      <mesh position={[0, 0.30, 0]} castShadow geometry={GNOME_HEAD_GEOM} material={SKIN_MAT} />

      {/* Eyes */}
      <mesh position={[-0.030, 0.320, 0.068]} geometry={EYE_GEOM} material={EYE_MAT} />
      <mesh position={[ 0.030, 0.320, 0.068]} geometry={EYE_GEOM} material={EYE_MAT} />
      <mesh position={[-0.030, 0.319, 0.078]} geometry={PUPIL_GEOM} material={PUPIL_MAT} />
      <mesh position={[ 0.030, 0.319, 0.078]} geometry={PUPIL_GEOM} material={PUPIL_MAT} />

      {/* Nose — grande y bulbosa */}
      <mesh position={[0, 0.293, 0.095]} geometry={GNOME_NOSE_GEOM} material={NOSE_MAT} />

      {/* Rosy cheeks */}
      <mesh position={[-0.050, 0.283, 0.062]} scale={[1, 0.65, 0.75]} geometry={CHEEK_GEOM} material={CHEEK_MAT} />
      <mesh position={[ 0.050, 0.283, 0.062]} scale={[1, 0.65, 0.75]} geometry={CHEEK_GEOM} material={CHEEK_MAT} />

      {/* Beard */}
      {beardStyle !== 'none' && (
        <mesh
          position={[0, beardY, 0.072]}
          scale={[1.6, beardScaleY, 0.85]}
          castShadow
          geometry={GNOME_BEARD_GEOM}
          material={BEARD_MAT}
        />
      )}

      {/* Hat brim */}
      <mesh position={[0, 0.376, 0]} geometry={GNOME_BRIM_GEOM} material={hatMat} />
      {/* Hat cone */}
      <mesh position={[0, 0.562, 0]} castShadow geometry={GNOME_HAT_GEOM} material={hatMat} />
    </group>
  );
}
