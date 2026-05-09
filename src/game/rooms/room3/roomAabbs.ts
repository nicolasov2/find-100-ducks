import { worldAabb } from '@/game/utils/furnitureBounds';
import type { Box3 } from 'three';
import { LOCAL_BOUNDS as BOOK_STACK } from '@/game/rooms/room1/furniture/BookStack';
import { LOCAL_BOUNDS as CARDBOARD_BOX } from '@/game/rooms/room1/furniture/CardboardBox';
import { LOCAL_BOUNDS as CHEST } from './furniture/Chest';
import { LOCAL_BOUNDS as COFFEE_TABLE } from './furniture/CoffeeTable';
import { LOCAL_BOUNDS as DESK } from './furniture/Desk';
import { LOCAL_BOUNDS as FIREPLACE } from './furniture/Fireplace';
import { LOCAL_BOUNDS as FLOOR_CUSHION } from '@/game/rooms/room1/furniture/FloorCushion';
import { LOCAL_BOUNDS as GLOBE } from './furniture/Globe';
import { LOCAL_BOUNDS as LADDER } from './furniture/Ladder';
import { LOCAL_BOUNDS as LAMP } from '@/game/rooms/room1/furniture/Lamp';
import { LOCAL_BOUNDS as PLANT } from '@/game/rooms/room1/furniture/Plant';
import { LOCAL_BOUNDS as PLANTER_BOX } from '@/game/rooms/room1/furniture/PlanterBox';
import { LOCAL_BOUNDS as POUF } from '@/game/rooms/room1/furniture/Pouf';
import { LOCAL_BOUNDS as READING_CHAIR } from './furniture/ReadingChair';
import { LOCAL_BOUNDS as ROCKING_CHAIR } from './furniture/RockingChair';
import { LOCAL_BOUNDS as SIDE_TABLE } from '@/game/rooms/room1/furniture/SideTable';
import { LOCAL_BOUNDS as TALL_BOOKCASE } from './furniture/TallBookcase';

const PI = Math.PI;
// Room3: CX=28, CZ=21, HW=7, HD=6
const CX = 28, CZ = 21, HW = 7, HD = 6;

export const ROOM3_AABBS: readonly Box3[] = [
  // Bookcases
  worldAabb(TALL_BOOKCASE, [CX - 4, 0, CZ + HD - 0.4]),
  worldAabb(TALL_BOOKCASE, [CX + 4, 0, CZ + HD - 0.4]),
  worldAabb(TALL_BOOKCASE, [CX - HW + 0.4, 0, CZ + 1], PI / 2),
  worldAabb(TALL_BOOKCASE, [CX - HW + 0.4, 0, CZ - 3], PI / 2),
  // Ladder
  worldAabb(LADDER, [CX - 2.5, 0, CZ + HD - 0.6]),
  // Desk
  worldAabb(DESK, [CX + 3, 0, CZ - 3], -PI / 4),
  // Reading chairs
  worldAabb(READING_CHAIR, [CX + 4.2, 0, CZ - 1.8], PI + PI / 4),
  worldAabb(READING_CHAIR, [CX + 3, 0, CZ], PI / 2),
  worldAabb(READING_CHAIR, [CX + 3, 0, CZ + 2.5], PI / 2),
  // Side table
  worldAabb(SIDE_TABLE, [CX + 5.5, 0, CZ - 4]),
  // Fireplace
  worldAabb(FIREPLACE, [CX + HW - 0.5, 0, CZ], -PI / 2),
  // Coffee table
  worldAabb(COFFEE_TABLE, [CX + 4.5, 0, CZ + 1.2]),
  // Chests
  worldAabb(CHEST, [CX - 3, 0, CZ - 5], 0.1),
  worldAabb(CHEST, [CX + 2, 0, CZ + 4.5], -0.3),
  // Globes
  worldAabb(GLOBE, [CX - 2, 0, CZ - 3.5]),
  worldAabb(GLOBE, [CX + 5.5, 0.42, CZ + 1.2]),
  // Floor lamps
  worldAabb(LAMP, [CX - HW + 1.5, 0, CZ - HD + 1]),
  worldAabb(LAMP, [CX + HW - 1.5, 0, CZ + HD - 1]),
  // Plants
  worldAabb(PLANT, [CX - HW + 0.8, 0, CZ - HD + 0.8]),
  worldAabb(PLANT, [CX + HW - 0.8, 0, CZ + HD - 0.8]),
  worldAabb(PLANT, [CX, 0, CZ - 5]),
  worldAabb(PLANT, [CX + 5, 0, CZ + 4.5]),
  // Book stacks
  worldAabb(BOOK_STACK, [CX - 1, 0.85, CZ - 3]),
  worldAabb(BOOK_STACK, [CX + 2, 0, CZ + 3]),
  worldAabb(BOOK_STACK, [CX - 3, 0, CZ + 4]),
  worldAabb(BOOK_STACK, [CX + 4.5, 0.42, CZ + 1.2]),
  worldAabb(BOOK_STACK, [CX - 5, 0, CZ - 2]),
  // Boxes
  worldAabb(CARDBOARD_BOX, [CX - 5, 0, CZ + 5], 0.4),
  worldAabb(CARDBOARD_BOX, [CX + 6, 0, CZ - 5], -0.2),
  // Floor cushions
  worldAabb(FLOOR_CUSHION, [CX - 1, 0, CZ + 3], 0.5),
  worldAabb(FLOOR_CUSHION, [CX + 1, 0, CZ - 2], -0.3),
  // Rocking chairs
  worldAabb(ROCKING_CHAIR, [CX - 4, 0, CZ - 4], PI / 4),
  worldAabb(ROCKING_CHAIR, [CX + 5, 0, CZ - 3], -PI / 5),
  // Poufs
  worldAabb(POUF, [CX - 2, 0, CZ + 5]),
  worldAabb(POUF, [CX + 3, 0, CZ + 5.5]),
  // Planter
  worldAabb(PLANTER_BOX, [CX, 0, CZ - 5.5]),
];
