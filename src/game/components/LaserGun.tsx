'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  MeshStandardMaterial,
  SphereGeometry,
  SpotLight,
  Vector3,
} from 'three';
import { useGameStore } from '@/store/gameStore';
import { WEAPONS } from '@/game/weapons/registry';

const BODY_GEOM = new BoxGeometry(0.08, 0.06, 0.18);
const HANDLE_GEOM = new BoxGeometry(0.05, 0.1, 0.07);
const BARREL_GEOM = new CylinderGeometry(0.018, 0.018, 0.16, 12);
const EMITTER_GEOM = new SphereGeometry(0.025, 12, 8);

const BODY_MAT = new MeshStandardMaterial({ color: '#0b1220', metalness: 0.6, roughness: 0.4 });
const HANDLE_MAT = new MeshStandardMaterial({ color: '#1f1f23', roughness: 0.6 });
const BARREL_MAT = new MeshStandardMaterial({ color: '#52525b', metalness: 0.9, roughness: 0.3 });
/* Flashlight ring geometry (visual) */
const RING_GEOM = new CylinderGeometry(0.025, 0.028, 0.03, 14);
const RING_MAT = new MeshStandardMaterial({ color: '#3f3f46', metalness: 0.8, roughness: 0.3 });

const OFFSET_X = 0.28;
const OFFSET_Y = -0.22;
const OFFSET_Z = -0.55;
const BOB_AMPLITUDE_Y = 0.012;
const BOB_AMPLITUDE_X = 0.008;
const BOB_FREQ = 7;
const BOB_SPEED_REF = 4;
const RECOIL_DURATION_MS = 180;
const RECOIL_Z_PEAK = 0.07;
const RECOIL_PITCH_PEAK = 0.22;

/* Flashlight target — always ~20m in front */
const FLASHLIGHT_TARGET = new Vector3();

export function LaserGun(): React.JSX.Element {
  const groupRef = useRef<Group>(null);
  const spotRef = useRef<SpotLight>(null);
  const prevPos = useRef<Vector3>(new Vector3());
  const phaseRef = useRef<number>(0);
  const camera = useThree((s) => s.camera);
  const lastShotAt = useGameStore((s) => s.lastShotAt);
  const currentWeaponId = useGameStore((s) => s.currentWeaponId);
  const weapon = WEAPONS[currentWeaponId];

  const emitterMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: weapon.beamColor,
        emissive: weapon.beamColor,
        emissiveIntensity: 1.5,
      }),
    [weapon.beamColor],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const dx = camera.position.x - prevPos.current.x;
    const dz = camera.position.z - prevPos.current.z;
    const horizSpeed = Math.hypot(dx, dz) / Math.max(delta, 1e-4);
    prevPos.current.copy(camera.position);

    const speedNorm = Math.min(horizSpeed / BOB_SPEED_REF, 1);
    phaseRef.current += horizSpeed * delta * BOB_FREQ;
    const bobY = Math.sin(phaseRef.current) * BOB_AMPLITUDE_Y * speedNorm;
    const bobX = Math.cos(phaseRef.current * 0.5) * BOB_AMPLITUDE_X * speedNorm;

    let recoilZ = 0;
    let recoilPitch = 0;
    if (lastShotAt !== null) {
      const elapsed = Date.now() - lastShotAt;
      if (elapsed < RECOIL_DURATION_MS) {
        const t = elapsed / RECOIL_DURATION_MS;
        const decay = (1 - t) * (1 - t);
        recoilZ = decay * RECOIL_Z_PEAK;
        recoilPitch = -decay * RECOIL_PITCH_PEAK;
      }
    }

    group.position.copy(camera.position);
    group.quaternion.copy(camera.quaternion);
    group.translateX(OFFSET_X + bobX);
    group.translateY(OFFSET_Y + bobY);
    group.translateZ(OFFSET_Z + recoilZ);
    group.rotateX(recoilPitch);

    /* Update flashlight target — 20m forward from camera */
    const spot = spotRef.current;
    if (spot) {
      FLASHLIGHT_TARGET.copy(camera.position);
      const dir = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      FLASHLIGHT_TARGET.addScaledVector(dir, 20);
      spot.target.position.copy(FLASHLIGHT_TARGET);
      spot.target.updateMatrixWorld();
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={BODY_GEOM} material={BODY_MAT} />
      <mesh position={[0, -0.06, 0.04]} geometry={HANDLE_GEOM} material={HANDLE_MAT} />
      <mesh
        position={[0, 0, -0.17]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={BARREL_GEOM}
        material={BARREL_MAT}
      />
      <mesh position={[0, 0, -0.26]} geometry={EMITTER_GEOM} material={emitterMat} />

      {/* Sniper scope */}
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

      {/* Plasma spreader extra emitters */}
      {weapon.multiShot > 1 && (
        <>
          <mesh position={[0.04, 0, -0.26]} geometry={EMITTER_GEOM} material={emitterMat} />
          <mesh position={[-0.04, 0, -0.26]} geometry={EMITTER_GEOM} material={emitterMat} />
        </>
      )}

      {/* Rifle barrel extension */}
      {weapon.id === 'laser-rifle' && (
        <mesh position={[0, 0, -0.30]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.12, 12]} />
          <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.3} />
        </mesh>
      )}

      {/* Flashlight ring (visual) */}
      <mesh
        position={[0, 0, -0.21]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={RING_GEOM}
        material={RING_MAT}
      />

      {/* Flashlight SpotLight */}
      <spotLight
        ref={spotRef}
        position={[0, 0, -0.27]}
        intensity={12}
        distance={25}
        angle={0.4}
        penumbra={0.5}
        decay={1.5}
        color="#e8e4d9"
        castShadow={false}
      />
    </group>
  );
}
