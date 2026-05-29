import type { LevelId, SpawnPoint } from '@/game/types';
import { SAFE_SPAWN_POOL } from '@/game/utils/safeSpawnPool';
import { SAFE_SPAWN_POOL_BEACH } from '@/game/utils/safeSpawnPoolBeach';

/** Maps a chapter to its pre-filtered safe spawn pool. */
export function safePoolForLevel(level: LevelId): readonly SpawnPoint[] {
  return level === 'beach' ? SAFE_SPAWN_POOL_BEACH : SAFE_SPAWN_POOL;
}
