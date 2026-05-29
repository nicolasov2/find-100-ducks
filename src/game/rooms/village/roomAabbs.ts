import type { Box3 } from 'three';
import { worldAabb } from '@/game/utils/furnitureBounds';
import { VILLAGE_BOUNDS } from './layout';
import { VILLAGE_ITEMS } from './items';

// Derived from VILLAGE_ITEMS — render, collision and spawn exclusion stay in sync.
export const VILLAGE_AABBS: readonly Box3[] = VILLAGE_ITEMS.map((it) =>
  worldAabb(VILLAGE_BOUNDS[it.kind], it.position, it.rotationY ?? 0, it.scale ?? 1),
);
