import { worldAabb } from '@/game/utils/furnitureBounds';
import type { Box3 } from 'three';
import { LOCAL_BOUNDS as BOOK_STACK } from '@/game/rooms/room1/furniture/BookStack';
import { LOCAL_BOUNDS as BROOM } from './furniture/Broom';
import { LOCAL_BOUNDS as CABINET_WALL } from './furniture/CabinetWall';
import { LOCAL_BOUNDS as CARDBOARD_BOX } from '@/game/rooms/room1/furniture/CardboardBox';
import { LOCAL_BOUNDS as CHAIR } from '@/game/rooms/room1/furniture/Chair';
import { LOCAL_BOUNDS as COUNTER } from './furniture/Counter';
import { LOCAL_BOUNDS as FLOOR_CUSHION } from '@/game/rooms/room1/furniture/FloorCushion';
import { LOCAL_BOUNDS as FRIDGE } from './furniture/Fridge';
import { LOCAL_BOUNDS as MICROWAVE } from './furniture/Microwave';
import { LOCAL_BOUNDS as OVEN } from './furniture/Oven';
import { LOCAL_BOUNDS as PLANT } from '@/game/rooms/room1/furniture/Plant';
import { LOCAL_BOUNDS as PLANTER_BOX } from '@/game/rooms/room1/furniture/PlanterBox';
import { LOCAL_BOUNDS as POT_RACK } from './furniture/PotRack';
import { LOCAL_BOUNDS as ROUND_TABLE } from './furniture/RoundTable';
import { LOCAL_BOUNDS as SHELF } from '@/game/rooms/room1/furniture/Shelf';
import { LOCAL_BOUNDS as STOOL } from './furniture/Stool';
import { LOCAL_BOUNDS as TRASH_CAN } from './furniture/TrashCan';
import { LOCAL_BOUNDS as WINE_RACK } from './furniture/WineRack';

const PI = Math.PI;
// Room2: CX=28, CZ=0, HW=8, HD=7
const CX = 28, CZ = 0, HW = 8, HD = 7;

export const ROOM2_AABBS: readonly Box3[] = [
  // Counter (L-shaped)
  worldAabb(COUNTER, [CX - 1.5, 0, CZ - HD + 0.6]),
  // Fridge
  worldAabb(FRIDGE, [CX + HW - 0.8, 0, CZ - HD + 0.6], PI),
  // Oven
  worldAabb(OVEN, [CX + 2.5, 0, CZ - HD + 0.6], PI),
  // Upper cabinets (mounted high; included for completeness)
  worldAabb(CABINET_WALL, [CX - 1.5, 2.3, CZ - HD + 0.3]),
  worldAabb(CABINET_WALL, [CX + 3, 2.3, CZ - HD + 0.3]),
  // Microwave (on counter surface)
  worldAabb(MICROWAVE, [CX - 3, 1.0, CZ - HD + 0.6]),
  // Round dining table
  worldAabb(ROUND_TABLE, [CX, 0, CZ + 2]),
  // Chairs around table
  worldAabb(CHAIR, [CX + 1.2, 0, CZ + 2], -PI / 2),
  worldAabb(CHAIR, [CX - 1.2, 0, CZ + 2], PI / 2),
  worldAabb(CHAIR, [CX, 0, CZ + 3.2], PI),
  worldAabb(CHAIR, [CX, 0, CZ + 0.8]),
  // Bar stools
  worldAabb(STOOL, [CX - 2, 0, CZ - HD + 2]),
  worldAabb(STOOL, [CX - 0.5, 0, CZ - HD + 2]),
  worldAabb(STOOL, [CX + 1, 0, CZ - HD + 2]),
  // Wine rack
  worldAabb(WINE_RACK, [CX + HW - 0.5, 0, CZ - 2], -PI / 2),
  // Storage shelf
  worldAabb(SHELF, [CX + HW - 0.5, 0, CZ + 3]),
  // Trash cans
  worldAabb(TRASH_CAN, [CX + HW - 0.5, 0, CZ + HD - 1]),
  worldAabb(TRASH_CAN, [CX - HW + 0.5, 0, CZ - 2]),
  // Boxes
  worldAabb(CARDBOARD_BOX, [CX - HW + 1, 0, CZ - 2], 0.2),
  worldAabb(CARDBOARD_BOX, [CX - HW + 0.8, 0, CZ + 4], -0.3),
  worldAabb(CARDBOARD_BOX, [CX + 5, 0, CZ + 5.5], 0.5),
  // Plants
  worldAabb(PLANT, [CX + HW - 0.8, 0, CZ + HD - 0.8]),
  worldAabb(PLANT, [CX - HW + 0.8, 0, CZ + HD - 0.8]),
  worldAabb(PLANT, [CX - HW + 0.8, 0, CZ - HD + 0.8]),
  // Floor cushion
  worldAabb(FLOOR_CUSHION, [CX - 5, 0, CZ + 4], 0.3),
  // BookStack on counter
  worldAabb(BOOK_STACK, [CX + 1.5, 0.98, CZ - HD + 0.6]),
  // Pot racks (ceiling; included for y-range correctness)
  worldAabb(POT_RACK, [CX, 2.7, CZ + 1]),
  worldAabb(POT_RACK, [CX - 4, 2.7, CZ - 2]),
  // Brooms
  worldAabb(BROOM, [CX + HW - 0.6, 0, CZ + HD - 0.6], -0.6),
  worldAabb(BROOM, [CX - HW + 0.6, 0, CZ - HD + 0.6], 0.6),
  // Herb planter (on counter surface)
  worldAabb(PLANTER_BOX, [CX + HW - 0.4, 1.0, CZ - HD + 0.6]),
];
