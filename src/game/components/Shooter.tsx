'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import type { Object3D } from 'three';
import { useGameStore } from '@/store/gameStore';

const RAY_ORIGIN = new Vector3();
const RAY_DIR = new Vector3();
const FORWARD = new Vector3();
const RIGHT = new Vector3();
const CAMERA_UP = new Vector3(0, 1, 0);
const EMITTER_POS = new Vector3();
const HIT_FALLBACK = new Vector3();
const raycaster = new Raycaster();

const EMITTER_RIGHT = 0.28;
const EMITTER_DOWN = 0.22;
const EMITTER_FORWARD = 0.81;
const FALLBACK_DISTANCE = 50;

function findDuckId(start: Object3D | null): string | null {
  let curr: Object3D | null = start;
  while (curr !== null) {
    const id = curr.userData['duckId'];
    if (typeof id === 'string') return id;
    curr = curr.parent;
  }
  return null;
}

export function Shooter(): null {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent): void => {
      if (document.pointerLockElement === null) return;
      if (event.button !== 0) return;
      camera.getWorldPosition(RAY_ORIGIN);
      camera.getWorldDirection(FORWARD);
      RIGHT.crossVectors(FORWARD, CAMERA_UP).normalize();

      EMITTER_POS.copy(RAY_ORIGIN)
        .addScaledVector(RIGHT, EMITTER_RIGHT)
        .addScaledVector(CAMERA_UP, -EMITTER_DOWN)
        .addScaledVector(FORWARD, EMITTER_FORWARD);

      RAY_DIR.copy(FORWARD);
      raycaster.set(RAY_ORIGIN, RAY_DIR);
      const hits = raycaster.intersectObjects(scene.children, true);
      const first = hits[0];

      const beamFrom: [number, number, number] = [
        EMITTER_POS.x,
        EMITTER_POS.y,
        EMITTER_POS.z,
      ];

      const state = useGameStore.getState();
      if (first === undefined) {
        HIT_FALLBACK.copy(RAY_ORIGIN).addScaledVector(FORWARD, FALLBACK_DISTANCE);
        state.triggerShot({
          at: Date.now(),
          beamFrom,
          beamTo: [HIT_FALLBACK.x, HIT_FALLBACK.y, HIT_FALLBACK.z],
          deadDuck: null,
        });
        return;
      }

      const beamTo: [number, number, number] = [
        first.point.x,
        first.point.y,
        first.point.z,
      ];
      const duckId = findDuckId(first.object);
      const deadDuck =
        duckId !== null
          ? (state.ducks.find((d) => d.id === duckId) ?? null)
          : null;

      state.triggerShot({
        at: Date.now(),
        beamFrom,
        beamTo,
        deadDuck,
      });
    };

    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [camera, scene]);

  return null;
}
