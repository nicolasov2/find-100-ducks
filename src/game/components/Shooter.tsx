'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector3 } from 'three';
import type { Object3D } from 'three';
import { useGameStore } from '@/store/gameStore';

const RAY_ORIGIN = new Vector3();
const RAY_DIR = new Vector3();
const raycaster = new Raycaster();

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
  const hitDuck = useGameStore((s) => s.hitDuck);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent): void => {
      if (document.pointerLockElement === null) return;
      if (event.button !== 0) return;
      camera.getWorldPosition(RAY_ORIGIN);
      camera.getWorldDirection(RAY_DIR);
      raycaster.set(RAY_ORIGIN, RAY_DIR);
      const hits = raycaster.intersectObjects(scene.children, true);
      const first = hits[0];
      if (first === undefined) return;
      const duckId = findDuckId(first.object);
      if (duckId !== null) hitDuck(duckId);
    };

    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [camera, scene, hitDuck]);

  return null;
}
