import { worldAabb } from '@/game/utils/furnitureBounds';
import type { Box3 } from 'three';
import { LOCAL_BOUNDS as BIRD_BATH } from './furniture/BirdBath';
import { LOCAL_BOUNDS as BUSH } from './furniture/Bush';
import { LOCAL_BOUNDS as CARDBOARD_BOX } from '@/game/rooms/room1/furniture/CardboardBox';
import { LOCAL_BOUNDS as GARDEN_BENCH } from './furniture/GardenBench';
import { LOCAL_BOUNDS as MUSHROOM_CLUSTER } from './furniture/MushroomCluster';
import { LOCAL_BOUNDS as PLANT } from '@/game/rooms/room1/furniture/Plant';
import { LOCAL_BOUNDS as PLANTER_BOX } from '@/game/rooms/room1/furniture/PlanterBox';
import { LOCAL_BOUNDS as SUNFLOWER } from './furniture/Sunflower';
import { LOCAL_BOUNDS as TREE } from './furniture/Tree';

const PI = Math.PI;
// Garden: CX=0, CZ=22, HW=11, HD=10
const CX = 0, CZ = 22, HW = 11, HD = 10;

export const GARDEN_AABBS: readonly Box3[] = [
  // Trees (with scale)
  worldAabb(TREE, [CX - HW + 1.5, 0, CZ + HD - 1.5], 0, 1.1),
  worldAabb(TREE, [CX + HW - 1.5, 0, CZ + HD - 1.5], 0, 1.0),
  worldAabb(TREE, [CX - HW + 1.5, 0, CZ + 4], 0, 0.9),
  worldAabb(TREE, [CX + HW - 1.5, 0, CZ + 2], 0, 1.2),
  worldAabb(TREE, [CX + HW - 4, 0, CZ - HD + 3], 0, 0.85),
  worldAabb(TREE, [CX - HW + 4, 0, CZ - HD + 3], 0, 0.95),
  // Bushes (with scale)
  worldAabb(BUSH, [CX - 3, 0, CZ - HD + 5], 0, 1.1),
  worldAabb(BUSH, [CX + 3, 0, CZ - HD + 5], 0, 0.9),
  worldAabb(BUSH, [CX - 6, 0, CZ + 1], 0, 1.0),
  worldAabb(BUSH, [CX + 6, 0, CZ + 1], 0, 1.2),
  worldAabb(BUSH, [CX - 4, 0, CZ + 5], 0, 0.85),
  worldAabb(BUSH, [CX + 4, 0, CZ + 6], 0, 1.0),
  worldAabb(BUSH, [CX, 0, CZ + 7], 0, 1.3),
  worldAabb(BUSH, [CX - 7, 0, CZ + HD - 3], 0, 0.95),
  worldAabb(BUSH, [CX + 7, 0, CZ + HD - 3], 0, 1.0),
  worldAabb(BUSH, [CX - 1, 0, CZ + HD - 1], 0, 1.0),
  // Sunflowers
  worldAabb(SUNFLOWER, [CX - HW + 3, 0, CZ + 3], 0, 1.0),
  worldAabb(SUNFLOWER, [CX - HW + 3.6, 0, CZ + 3.5], 0, 0.9),
  worldAabb(SUNFLOWER, [CX + HW - 3, 0, CZ + 4.5], 0, 1.1),
  worldAabb(SUNFLOWER, [CX + HW - 3.6, 0, CZ + 5], 0, 0.85),
  // Benches
  worldAabb(GARDEN_BENCH, [CX - 4, 0, CZ + 2], PI / 2),
  worldAabb(GARDEN_BENCH, [CX + 4, 0, CZ + 2], -PI / 2),
  // Bird bath
  worldAabb(BIRD_BATH, [CX, 0, CZ + 2]),
  // Mushroom clusters
  worldAabb(MUSHROOM_CLUSTER, [CX - HW + 2.5, 0, CZ + HD - 3]),
  worldAabb(MUSHROOM_CLUSTER, [CX + HW - 2.5, 0, CZ + HD - 3]),
  worldAabb(MUSHROOM_CLUSTER, [CX - HW + 3, 0, CZ + 5]),
  // Planters
  worldAabb(PLANTER_BOX, [CX - HW + 1, 0, CZ - HD + 8], PI / 2),
  worldAabb(PLANTER_BOX, [CX + HW - 1, 0, CZ - HD + 8], PI / 2),
  // Plants
  worldAabb(PLANT, [CX - 5, 0, CZ - HD + 6]),
  worldAabb(PLANT, [CX + 5, 0, CZ - HD + 6]),
  // Boxes
  worldAabb(CARDBOARD_BOX, [CX + 7, 0, CZ + HD - 5], 0.4),
  worldAabb(CARDBOARD_BOX, [CX - 7, 0, CZ + 5], -0.3),
];
