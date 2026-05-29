import { describe, it, expect } from 'vitest';
import { Vector3 } from 'three';
import { SAFE_SPAWN_POOL_VILLAGE } from '@/game/utils/safeSpawnPoolVillage';
import { SPAWN_POOL_VILLAGE } from '@/game/rooms/village/spawnPool';
import { VILLAGE_ELEVATED_SPAWNS } from '@/game/rooms/village/elevatedSpawns';
import { VILLAGE_AABBS } from '@/game/rooms/village/roomAabbs';
import { VILLAGE_FLOOR_Y } from '@/game/rooms/village/layout';

// Mirrors filterPoolByAabbs padding so the test reflects the live filter.
const PADDING = 0.35;

function insideAabb(position: readonly [number, number, number]): boolean {
  const pt = new Vector3(position[0], position[1], position[2]);
  return VILLAGE_AABBS.some((box) => box.clone().expandByScalar(PADDING).containsPoint(pt));
}

describe('village spawn safety', () => {
  it('places every street/plaza gnome on open ground — never inside a house, well, market, etc.', () => {
    const buried = SPAWN_POOL_VILLAGE.filter((sp) => insideAabb(sp.position)).map((sp) => sp.id);
    expect(buried).toEqual([]);
  });

  it('keeps the village densely populated with hiding spots', () => {
    expect(SPAWN_POOL_VILLAGE.length).toBeGreaterThanOrEqual(40);
  });

  it('keeps enough safe spawn points for a full match (incl. easy = 150 gnomes)', () => {
    expect(SAFE_SPAWN_POOL_VILLAGE.length).toBeGreaterThanOrEqual(150);
  });

  it('places elevated (bypassAabb) gnomes genuinely above the ground', () => {
    const grounded = VILLAGE_ELEVATED_SPAWNS.filter((sp) => sp.position[1] <= VILLAGE_FLOOR_Y + 0.3);
    expect(grounded).toEqual([]);
    expect(VILLAGE_ELEVATED_SPAWNS.every((sp) => sp.bypassAabb === true)).toBe(true);
  });
});
