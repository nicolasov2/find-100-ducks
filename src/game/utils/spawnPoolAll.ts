import type { SpawnPoint } from '@/game/types';
import { SPAWN_POOL_ROOM_1 } from '@/game/rooms/room1';
import { SPAWN_POOL_HALLWAY_1 } from '@/game/rooms/hallway1';
import { SPAWN_POOL_ROOM_2 } from '@/game/rooms/room2';
import { SPAWN_POOL_HALLWAY_2 } from '@/game/rooms/hallway2';
import { SPAWN_POOL_ROOM_3 } from '@/game/rooms/room3';
import { SPAWN_POOL_HALLWAY_3 } from '@/game/rooms/hallway3';
import { SPAWN_POOL_GARDEN } from '@/game/rooms/garden';

/** Combined spawn pool from all rooms, hallways, and the garden. */
export const SPAWN_POOL_ALL: readonly SpawnPoint[] = [
  ...SPAWN_POOL_ROOM_1,
  ...SPAWN_POOL_HALLWAY_1,
  ...SPAWN_POOL_ROOM_2,
  ...SPAWN_POOL_HALLWAY_2,
  ...SPAWN_POOL_ROOM_3,
  ...SPAWN_POOL_HALLWAY_3,
  ...SPAWN_POOL_GARDEN,
];
