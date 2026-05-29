import type { SpawnPoint } from '@/game/types';
import { filterPoolByAabbs } from '@/game/utils/filterSpawnPool';
import { SPAWN_POOL_VILLAGE } from '@/game/rooms/village/spawnPool';
import { VILLAGE_ELEVATED_SPAWNS } from '@/game/rooms/village/elevatedSpawns';
import { VILLAGE_AABBS } from '@/game/rooms/village/roomAabbs';

const POOL = [...SPAWN_POOL_VILLAGE, ...VILLAGE_ELEVATED_SPAWNS];

/** Pre-filtered village pool — no gnome spawns inside a building or prop. */
export const SAFE_SPAWN_POOL_VILLAGE: readonly SpawnPoint[] = filterPoolByAabbs(POOL, VILLAGE_AABBS);
