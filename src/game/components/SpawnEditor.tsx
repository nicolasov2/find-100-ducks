'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Raycaster, Vector2, Object3D, SphereGeometry, MeshBasicMaterial,
  type InstancedMesh, type Vector3Tuple,
} from 'three';
import { useEditorStore } from '@/store/editorStore';

const CENTER = new Vector2(0, 0);
const RAY = new Raycaster();
const MARKER_GEOM = new SphereGeometry(0.09, 8, 8);
const MARKER_MAT = new MeshBasicMaterial({ color: '#ff2bd6' });
const MAX_MARKERS = 8000;
const DUMMY = new Object3D();
// Markers stay visible (default layer) but are skipped by the raycaster via a
// no-op raycast — keeps picking fast with thousands of dots without hiding them.
const NOOP_RAYCAST = (): void => {};

const round = (n: number): number => Math.round(n * 1000) / 1000;

function exportMarkers(): void {
  const ms = useEditorStore.getState().markers;
  const json = JSON.stringify(ms);
  void navigator.clipboard?.writeText(json).catch(() => undefined);
  try {
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'village-spawns.json';
    a.click();
    URL.revokeObjectURL(url);
  } catch { /* ignore */ }
  useEditorStore.getState().setMessage(`¡Copiado + descargado! ${ms.length} puntos`);
}

/** Paint gun: raycasts from the crosshair; click or hold to spray dense spawn dots. */
export function SpawnEditor(): React.JSX.Element {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const markers = useEditorStore((s) => s.markers);
  const meshRef = useRef<InstancedMesh>(null);
  const painting = useRef(false);

  const pick = useCallback((): Vector3Tuple | null => {
    RAY.setFromCamera(CENTER, camera);
    const hit = RAY.intersectObjects(scene.children, true)[0]; // markers are non-raycast (NOOP_RAYCAST)
    return hit ? [round(hit.point.x), round(hit.point.y), round(hit.point.z)] : null;
  }, [camera, scene]);

  // Sync instanced markers with the store.
  useEffect(() => {
    const im = meshRef.current;
    if (!im) return;
    im.raycast = NOOP_RAYCAST;
    const n = Math.min(markers.length, MAX_MARKERS);
    for (let i = 0; i < n; i++) {
      const m = markers[i];
      if (!m) continue;
      DUMMY.position.set(m[0], m[1], m[2]);
      DUMMY.updateMatrix();
      im.setMatrixAt(i, DUMMY.matrix);
    }
    im.count = n;
    im.instanceMatrix.needsUpdate = true;
  }, [markers]);

  useEffect(() => {
    const store = useEditorStore.getState;
    const onDown = (e: MouseEvent): void => {
      if (e.button !== 0 || document.pointerLockElement === null) return;
      painting.current = true;
      const p = pick();
      if (p) store().add(p);
    };
    const onUp = (): void => {
      if (!painting.current) return;
      painting.current = false;
      store().setMessage(`total ${store().markers.length} puntos`);
    };
    const onKey = (e: KeyboardEvent): void => {
      const k = e.key.toLowerCase();
      if (k === 'r') { const p = pick(); if (p) { store().removeNearest(p); } }
      else if (k === 'z') { store().undo(); store().setMessage('Deshecho'); }
      else if (k === 'c') { exportMarkers(); }
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('keydown', onKey);
    };
  }, [pick]);

  // Spray while held: add a dot each frame (store enforces a tiny 0.3m spacing).
  useFrame(() => {
    if (painting.current && document.pointerLockElement !== null) {
      const p = pick();
      if (p) useEditorStore.getState().add(p);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[MARKER_GEOM, MARKER_MAT, MAX_MARKERS]}
      frustumCulled={false}
      userData={{ editorMarker: true }}
    />
  );
}
