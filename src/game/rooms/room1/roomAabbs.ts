import { worldAabb } from '@/game/utils/furnitureBounds';
import type { Box3 } from 'three';
import { LOCAL_BOUNDS as BED } from './furniture/Bed';
import { LOCAL_BOUNDS as BOOK_STACK } from './furniture/BookStack';
import { LOCAL_BOUNDS as CARDBOARD_BOX } from './furniture/CardboardBox';
import { LOCAL_BOUNDS as CHAIR } from './furniture/Chair';
import { LOCAL_BOUNDS as COAT_RACK } from './furniture/CoatRack';
import { LOCAL_BOUNDS as FLOOR_CUSHION } from './furniture/FloorCushion';
import { LOCAL_BOUNDS as LAMP } from './furniture/Lamp';
import { LOCAL_BOUNDS as PLANT } from './furniture/Plant';
import { LOCAL_BOUNDS as PLANTER_BOX } from './furniture/PlanterBox';
import { LOCAL_BOUNDS as POUF } from './furniture/Pouf';
import { LOCAL_BOUNDS as SHELF } from './furniture/Shelf';
import { LOCAL_BOUNDS as SIDE_TABLE } from './furniture/SideTable';
import { LOCAL_BOUNDS as SOFA } from './furniture/Sofa';
import { LOCAL_BOUNDS as TABLE } from './furniture/Table';
import { LOCAL_BOUNDS as TV_STAND } from './furniture/TVStand';

const PI = Math.PI;

export const ROOM1_AABBS: readonly Box3[] = [
  // Dining table (no position prop → world [0,0,0])
  worldAabb(TABLE, [0, 0, 0]),
  // Chairs around table
  worldAabb(CHAIR, [0, 0, -2]),
  worldAabb(CHAIR, [0, 0, 2], PI),
  worldAabb(CHAIR, [2.5, 0, 0], -PI / 2),
  worldAabb(CHAIR, [-2.5, 0, 0], PI / 2),
  // Sofa + TV area
  worldAabb(SOFA, [-4, 0, 7]),
  worldAabb(TV_STAND, [-4, 0, 4.5], PI),
  worldAabb(SIDE_TABLE, [-7, 0, 7]),
  worldAabb(SIDE_TABLE, [-1, 0, 7.5]),
  // Bedroom
  worldAabb(BED, [6, 0, -7]),
  worldAabb(SIDE_TABLE, [8.5, 0, -8.5]),
  // Floor lamps
  worldAabb(LAMP, [8, 0, 8]),
  worldAabb(LAMP, [-9, 0, 3]),
  // Shelves
  worldAabb(SHELF, [-6, 0, -9.5]),
  worldAabb(SHELF, [4, 0, -9.5]),
  worldAabb(SHELF, [-9.5, 0, -4]),
  // Cardboard boxes
  worldAabb(CARDBOARD_BOX, [-8, 0, 5.5], 0.3),
  worldAabb(CARDBOARD_BOX, [8.5, 0, -5.5], -0.4),
  worldAabb(CARDBOARD_BOX, [-2, 0, -8.5], 0.15),
  worldAabb(CARDBOARD_BOX, [7, 0, 3], 0.8),
  worldAabb(CARDBOARD_BOX, [-8.5, 0, -6], -0.2),
  // BookStacks (only floor-level ones matter; elevated ones are on surfaces)
  worldAabb(BOOK_STACK, [1.6, 0.9, -0.6]),
  worldAabb(BOOK_STACK, [-1.7, 0.9, 0.6]),
  worldAabb(BOOK_STACK, [-6, 1.55, -9.5]),
  worldAabb(BOOK_STACK, [4, 2.55, -9.5]),
  worldAabb(BOOK_STACK, [-7, 0.55, 7]),
  worldAabb(BOOK_STACK, [8.5, 0.55, -8.5]),
  // Plants
  worldAabb(PLANT, [-9, 0, -9]),
  worldAabb(PLANT, [-8.5, 0, 8.8]),
  worldAabb(PLANT, [8.6, 0, -2]),
  worldAabb(PLANT, [3, 0, 9]),
  worldAabb(PLANT, [-4, 0, -6]),
  // Floor cushions
  worldAabb(FLOOR_CUSHION, [2, 0, 5], 0.2),
  worldAabb(FLOOR_CUSHION, [-3, 0, 4], -0.4),
  worldAabb(FLOOR_CUSHION, [5, 0, 5.5], 0.6),
  worldAabb(FLOOR_CUSHION, [-6, 0, 5], 0.1),
  // Coat racks
  worldAabb(COAT_RACK, [9, 0, -9]),
  worldAabb(COAT_RACK, [-9.5, 0, 0]),
  // Planters
  worldAabb(PLANTER_BOX, [-9, 0, 0], PI / 2),
  worldAabb(PLANTER_BOX, [9, 0, 6], PI / 2),
  worldAabb(PLANTER_BOX, [-3, 0, 9]),
  // Poufs
  worldAabb(POUF, [1, 0, 6]),
  worldAabb(POUF, [3, 0, 7]),
  worldAabb(POUF, [-7, 0, -2]),
];
