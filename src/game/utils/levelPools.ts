import type { LevelId, SpawnPoint } from '@/game/types';
import { SAFE_SPAWN_POOL } from '@/game/utils/safeSpawnPool';
import { SAFE_SPAWN_POOL_VILLAGE } from '@/game/utils/safeSpawnPoolVillage';

/** Maps a chapter to its pre-filtered safe spawn pool. */
export function safePoolForLevel(level: LevelId): readonly SpawnPoint[] {
  return level === 'village' ? SAFE_SPAWN_POOL_VILLAGE : SAFE_SPAWN_POOL;
}
