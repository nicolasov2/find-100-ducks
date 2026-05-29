'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Raycaster, Vector2, SphereGeometry, MeshBasicMaterial,
  type Object3D, type Vector3Tuple,
} from 'three';
import { useEditorStore } from '@/store/editorStore';

const CENTER = new Vector2(0, 0);
const RAY = new Raycaster();
const MARKER_GEOM = new SphereGeometry(0.16, 10, 10);
const MARKER_MAT = new MeshBasicMaterial({ color: '#ff2bd6' });

const round = (n: number): number => Math.round(n * 100) / 100;

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

/** Raycasts from the crosshair to place markers — single click or hold to paint. */
export function SpawnEditor(): React.JSX.Element {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const markers = useEditorStore((s) => s.markers);
  const painting = useRef(false);

  const pick = useCallback((): Vector3Tuple | null => {
    RAY.setFromCamera(CENTER, camera);
    for (const hit of RAY.intersectObjects(scene.children, true)) {
      let o: Object3D | null = hit.object;
      let isMarker = false;
      while (o) { if (o.userData.editorMarker === true) { isMarker = true; break; } o = o.parent; }
      if (!isMarker) return [round(hit.point.x), round(hit.point.y), round(hit.point.z)];
    }
    return null;
  }, [camera, scene]);

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
      if (k === 'r') { const p = pick(); if (p) { store().removeNearest(p); store().setMessage('Borrado el más cercano'); } }
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

  // Paint while the button is held: add a point each frame (store enforces spacing).
  useFrame(() => {
    if (painting.current && document.pointerLockElement !== null) {
      const p = pick();
      if (p) useEditorStore.getState().add(p);
    }
  });

  return (
    <group>
      {markers.map((m, i) => (
        <mesh key={i} position={m} geometry={MARKER_GEOM} material={MARKER_MAT} userData={{ editorMarker: true }} />
      ))}
    </group>
  );
}
