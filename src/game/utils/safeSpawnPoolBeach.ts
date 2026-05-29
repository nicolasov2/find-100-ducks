import type { SpawnPoint } from '@/game/types';
import { filterPoolByAabbs } from '@/game/utils/filterSpawnPool';
import { SPAWN_POOL_BEACH } from '@/game/rooms/beach/spawnPool';
import { BEACH_ELEVATED_SPAWNS } from '@/game/rooms/beach/elevatedSpawns';
import { BEACH_AABBS } from '@/game/rooms/beach/roomAabbs';

const POOL = [...SPAWN_POOL_BEACH, ...BEACH_ELEVATED_SPAWNS];

/** Pre-filtered beach pool — no gnome spawns inside a beach prop. */
export const SAFE_SPAWN_POOL_BEACH: readonly SpawnPoint[] = filterPoolByAabbs(POOL, BEACH_AABBS);
