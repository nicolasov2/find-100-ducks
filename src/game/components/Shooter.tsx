'use client';

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Quaternion, Raycaster, Vector3 } from 'three';
import { useGameStore } from '@/store/gameStore';
import { playLaserShot, playGnomeHit, initAudio } from '@/game/systems/AudioManager';
import { WEAPONS } from '@/game/weapons/registry';
import { findGnomeId, shouldIgnore } from '@/game/utils/raycastUtils';

const RAY_ORIGIN = new Vector3();
const FORWARD = new Vector3();
const RIGHT = new Vector3();
const UP = new Vector3();
const CAMERA_UP = new Vector3(0, 1, 0);
const EMITTER_POS = new Vector3();
const SHOT_DIR = new Vector3();
const HIT_POS = new Vector3();
const SPREAD_QUAT = new Quaternion();
const raycaster = new Raycaster();

const EMITTER_RIGHT = 0.28;
const EMITTER_DOWN = 0.22;
const EMITTER_FORWARD = 0.81;

export function Shooter(): null {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const lastShotAtRef = useRef<number>(0);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent): void => {
      if (document.pointerLockElement === null) return;
      if (event.button !== 0) return;

      const state = useGameStore.getState();
      const weapon = WEAPONS[state.currentWeaponId];
      const now = Date.now();
      if (now - lastShotAtRef.current < weapon.fireRateMs) return;
      lastShotAtRef.current = now;

      initAudio();
      playLaserShot();

      camera.getWorldPosition(RAY_ORIGIN);
      camera.getWorldDirection(FORWARD);
      RIGHT.crossVectors(FORWARD, CAMERA_UP).normalize();
      UP.crossVectors(RIGHT, FORWARD).normalize();

      EMITTER_POS.copy(RAY_ORIGIN)
        .addScaledVector(RIGHT, EMITTER_RIGHT)
        .addScaledVector(CAMERA_UP, -EMITTER_DOWN)
        .addScaledVector(FORWARD, EMITTER_FORWARD);

      const beamFrom: [number, number, number] = [
        EMITTER_POS.x,
        EMITTER_POS.y,
        EMITTER_POS.z,
      ];

      const hitGnomes = new Set<string>();
      const shotsToFire = weapon.multiShot;

      for (let i = 0; i < shotsToFire; i++) {
        const offsetIdx = i - (shotsToFire - 1) / 2;
        const angle = offsetIdx * weapon.spreadAngleRad;

        SHOT_DIR.copy(FORWARD);
        if (angle !== 0) {
          SPREAD_QUAT.setFromAxisAngle(UP, angle);
          SHOT_DIR.applyQuaternion(SPREAD_QUAT);
        }

        raycaster.set(RAY_ORIGIN, SHOT_DIR);
        raycaster.far = weapon.range;
        const hits = raycaster.intersectObjects(scene.children, true);
        let first = undefined;
        for (const h of hits) {
          if (!shouldIgnore(h.object)) {
            first = h;
            break;
          }
        }

        if (first === undefined) {
          HIT_POS.copy(RAY_ORIGIN).addScaledVector(SHOT_DIR, weapon.range);
          state.triggerShot({
            at: now,
            beamFrom,
            beamTo: [HIT_POS.x, HIT_POS.y, HIT_POS.z],
            beamColor: weapon.beamColor,
            beamRadius: weapon.beamRadius,
            deadGnome: null,
          });
          continue;
        }

        const beamTo: [number, number, number] = [
          first.point.x,
          first.point.y,
          first.point.z,
        ];
        const gnomeId = findGnomeId(first.object);
        const alreadyHit = gnomeId !== null && hitGnomes.has(gnomeId);
        const deadGnome =
          gnomeId !== null && !alreadyHit
            ? (state.gnomes.find((d) => d.id === gnomeId) ?? null)
            : null;

        if (deadGnome) {
          hitGnomes.add(deadGnome.id);
          playGnomeHit();
        }

        state.triggerShot({
          at: now,
          beamFrom,
          beamTo,
          beamColor: weapon.beamColor,
          beamRadius: weapon.beamRadius,
          deadGnome,
        });
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [camera, scene]);

  return null;
}
