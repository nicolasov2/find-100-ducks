import type { Box3 } from 'three';
import { worldAabb } from '@/game/utils/furnitureBounds';
import { BEACH_BOUNDS } from './layout';
import { BEACH_OBSTACLES } from './obstacles';

// Derived from BEACH_OBSTACLES — render, collision and spawn exclusion can never
// drift apart. Same worldAabb helper the garden uses.
export const BEACH_AABBS: readonly Box3[] = BEACH_OBSTACLES.map((o) =>
  worldAabb(BEACH_BOUNDS[o.kind], o.position, o.rotationY ?? 0, o.scale ?? 1),
);
