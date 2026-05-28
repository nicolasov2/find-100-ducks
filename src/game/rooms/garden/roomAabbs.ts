import { worldAabb } from '@/game/utils/furnitureBounds';
import type { Box3 } from 'three';
import type { LocalBounds } from '@/game/types';
import type { GardenItemKind } from './layout';
import { GARDEN_ITEMS } from './items';
import {
  TOOL_SHED_POS,
  STONE_WELL_POS,
  TOOL_SHED_BOUNDS,
  STONE_WELL_BOUNDS,
} from './layout';
import { LOCAL_BOUNDS as TREE } from './furniture/Tree';
import { LOCAL_BOUNDS as BUSH } from './furniture/Bush';
import { LOCAL_BOUNDS as SUNFLOWER } from './furniture/Sunflower';
import { LOCAL_BOUNDS as MUSHROOM } from './furniture/MushroomCluster';
import { LOCAL_BOUNDS as BENCH } from './furniture/GardenBench';
import { LOCAL_BOUNDS as BIRD_BATH } from './furniture/BirdBath';
import { LOCAL_BOUNDS as PLANTER } from '@/game/rooms/room1/furniture/PlanterBox';
import { LOCAL_BOUNDS as PLANT } from '@/game/rooms/room1/furniture/Plant';
import { LOCAL_BOUNDS as BOX } from '@/game/rooms/room1/furniture/CardboardBox';

const BOUNDS: Record<GardenItemKind, LocalBounds> = {
  tree: TREE,
  bush: BUSH,
  sunflower: SUNFLOWER,
  mushroom: MUSHROOM,
  bench: BENCH,
  birdbath: BIRD_BATH,
  planter: PLANTER,
  plant: PLANT,
  box: BOX,
};

// Derived from GARDEN_ITEMS — render and collision can never drift apart.
const itemAabbs = GARDEN_ITEMS.map((item) =>
  worldAabb(BOUNDS[item.kind], item.position, item.rotationY ?? 0, item.scale ?? 1),
);

export const GARDEN_AABBS: readonly Box3[] = [
  ...itemAabbs,
  worldAabb(TOOL_SHED_BOUNDS, TOOL_SHED_POS),
  worldAabb(STONE_WELL_BOUNDS, STONE_WELL_POS),
];
