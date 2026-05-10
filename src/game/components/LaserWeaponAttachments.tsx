'use client';

import { MeshStandardMaterial } from 'three';
import type { WeaponStats } from '@/game/weapons/types';

interface Props {
  weapon: WeaponStats;
  emitterMat: MeshStandardMaterial;
}

const EMITTER_ARGS = [0.025, 12, 8] as const;

export function LaserWeaponAttachments({ weapon, emitterMat }: Props): React.JSX.Element {
  return (
    <>
      {weapon.hasScope && (
        <>
          <mesh position={[0, 0.05, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.18, 12]} />
            <meshStandardMaterial color="#1f1f23" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.04, 12]} />
            <meshStandardMaterial color={weapon.beamColor} emissive={weapon.beamColor} emissiveIntensity={0.4} />
          </mesh>
        </>
      )}

      {weapon.multiShot > 1 && (
        <>
          <mesh position={[0.04, 0, -0.26]}>
            <sphereGeometry args={EMITTER_ARGS} />
            <primitive object={emitterMat} attach="material" />
          </mesh>
          <mesh position={[-0.04, 0, -0.26]}>
            <sphereGeometry args={EMITTER_ARGS} />
            <primitive object={emitterMat} attach="material" />
          </mesh>
        </>
      )}

      {weapon.id === 'laser-rifle' && (
        <mesh position={[0, 0, -0.30]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.12, 12]} />
          <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.3} />
        </mesh>
      )}
    </>
  );
}
