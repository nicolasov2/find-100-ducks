import { Vector3 } from 'three';
import type { Box3 } from 'three';
import type { SpawnPoint } from '@/game/types';

const MIN_SAFE_POOL = 120;

/**
 * Filters spawn points that fall inside any furniture AABB (expanded by padding).
 * Points with bypassAabb=true are always kept (on-top-of-furniture spots).
 * Throws if the filtered pool is too small to support a full match.
 */
export function filterPoolByAabbs(
  pool: readonly SpawnPoint[],
  aabbs: readonly Box3[],
  padding = 0.35,
): readonly SpawnPoint[] {
  if (aabbs.length === 0) return pool;

  const pt = new Vector3();
  const result = pool.filter((sp) => {
    if (sp.bypassAabb) return true;
    pt.set(sp.position[0], sp.position[1], sp.position[2]);
    return !aabbs.some((box) => box.clone().expandByScalar(padding).containsPoint(pt));
  });

  if (result.length < MIN_SAFE_POOL) {
    const byRoom = new Map<string, number>();
    const filteredByRoom = new Map<string, number>();
    for (const sp of pool) byRoom.set(sp.roomId, (byRoom.get(sp.roomId) ?? 0) + 1);
    for (const sp of result) filteredByRoom.set(sp.roomId, (filteredByRoom.get(sp.roomId) ?? 0) + 1);

    const detail = [...byRoom.entries()]
      .map(([room, orig]) => `  ${room}: ${filteredByRoom.get(room) ?? 0}/${orig}`)
      .join('\n');

    throw new Error(
      `filterPoolByAabbs: only ${result.length} safe spawn points remain (need ≥ ${MIN_SAFE_POOL}).\n` +
        `Points per room after filter:\n${detail}\n` +
        `Expand the pool or review furniture LOCAL_BOUNDS overestimates.`,
    );
  }

  return result;
}
