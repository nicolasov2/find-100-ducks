import { SPAWN_POOL_ALL } from '@/game/utils/spawnPoolAll';
import { filterPoolByAabbs } from '@/game/utils/filterSpawnPool';
import { ROOM1_AABBS } from '@/game/rooms/room1/roomAabbs';
import { ROOM2_AABBS } from '@/game/rooms/room2/roomAabbs';
import { ROOM3_AABBS } from '@/game/rooms/room3/roomAabbs';
import { GARDEN_AABBS } from '@/game/rooms/garden/roomAabbs';
import type { SpawnPoint } from '@/game/types';

const ALL_AABBS = [...ROOM1_AABBS, ...ROOM2_AABBS, ...ROOM3_AABBS, ...GARDEN_AABBS];

/** Pre-filtered pool — no gnome spawns inside furniture colliders. */
export const SAFE_SPAWN_POOL: readonly SpawnPoint[] = filterPoolByAabbs(SPAWN_POOL_ALL, ALL_AABBS);
