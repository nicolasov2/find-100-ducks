'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import type { Gnome } from '@/game/types';

interface GnomeMeshCache {
  meshCacheRef: React.MutableRefObject<Mesh[][]>;
  prevIntensityRef: React.MutableRefObject<Float32Array>;
  prevEmissiveRef: React.MutableRefObject<Uint32Array>;
  prevDepthTestRef: React.MutableRefObject<Uint8Array>;
  rebuildIfDirty: (container: Group) => void;
}

export function useGnomeMeshCache(gnomes: readonly Gnome[]): GnomeMeshCache {
  const meshCacheRef = useRef<Mesh[][]>([]);
  const prevIntensityRef = useRef(new Float32Array(0));
  const prevEmissiveRef = useRef(new Uint32Array(0));
  const prevDepthTestRef = useRef(new Uint8Array(0));
  const cacheDirtyRef = useRef(true);

  useEffect(() => {
    cacheDirtyRef.current = true;
  }, [gnomes]);

  const rebuildIfDirty = useCallback((container: Group) => {
    if (!cacheDirtyRef.current) return;
    const cache: Mesh[][] = [];
    for (let i = 0; i < container.children.length; i++) {
      const meshes: Mesh[] = [];
      container.children[i]?.traverse((obj) => {
        if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
          meshes.push(obj);
        }
      });
      cache.push(meshes);
    }
    meshCacheRef.current = cache;
    prevIntensityRef.current = new Float32Array(cache.length).fill(-1);
    prevEmissiveRef.current = new Uint32Array(cache.length).fill(0xffffffff);
    prevDepthTestRef.current = new Uint8Array(cache.length).fill(255);
    cacheDirtyRef.current = false;
  }, []);

  return { meshCacheRef, prevIntensityRef, prevEmissiveRef, prevDepthTestRef, rebuildIfDirty };
}
