import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { SAFE_SPAWN_POOL_BEACH } from '@/game/utils/safeSpawnPoolBeach';
import { SPAWN_POOL_BEACH } from '@/game/rooms/beach/spawnPool';
import { BEACH_ELEVATED_SPAWNS } from '@/game/rooms/beach/elevatedSpawns';
import { BEACH_AABBS } from '@/game/rooms/beach/roomAabbs';
import { BEACH_FLOOR_Y } from '@/game/rooms/beach/layout';

// Mirrors filterPoolByAabbs padding so the test reflects the live filter.
const PADDING = 0.35;

function insideAabb(position: readonly [number, number, number]): boolean {
  const pt = new Vector3(position[0], position[1], position[2]);
  return BEACH_AABBS.some((box) => box.clone().expandByScalar(PADDING).containsPoint(pt));
}

describe('beach spawn safety', () => {
  it('places every floor gnome on open sand — never inside a palm, rock, umbrella, pier, boat or crate', () => {
    const buried = SPAWN_POOL_BEACH.filter((sp) => insideAabb(sp.position)).map((sp) => sp.id);
    expect(buried).toEqual([]);
  });

  it('keeps the beach densely populated with hiding spots', () => {
    expect(SPAWN_POOL_BEACH.length).toBeGreaterThanOrEqual(40);
  });

  it('keeps enough safe spawn points for a full match (incl. easy = 150 gnomes)', () => {
    expect(SAFE_SPAWN_POOL_BEACH.length).toBeGreaterThanOrEqual(150);
  });

  it('places elevated (bypassAabb) gnomes genuinely above the sand', () => {
    const grounded = BEACH_ELEVATED_SPAWNS.filter((sp) => sp.position[1] <= BEACH_FLOOR_Y + 0.3);
    expect(grounded).toEqual([]);
    expect(BEACH_ELEVATED_SPAWNS.every((sp) => sp.bypassAabb === true)).toBe(true);
  });
});
