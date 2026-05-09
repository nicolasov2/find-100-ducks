import { describe, it, expect } from 'vitest';
import { filterPoolByAabbs } from './filterSpawnPool';
import { worldAabb } from './furnitureBounds';
import type { SpawnPoint } from '@/game/types';
import type { Box3 } from 'three';

const pt = (x: number, y: number, z: number, bypass?: true): SpawnPoint => ({
  id: `test-${x}-${y}-${z}`,
  position: [x, y, z],
  roomId: 'room-1',
  ...(bypass ? { bypassAabb: true } : {}),
});

const CUBE_AABB: Box3 = worldAabb({ min: [-1, 0, -1], max: [1, 2, 1] }, [0, 0, 0]);

describe('filterPoolByAabbs', () => {
  it('keeps points outside all AABBs', () => {
    const pool = Array.from({ length: 130 }, (_, i) =>
      pt(10 + i, 0.08, 0),
    );
    const result = filterPoolByAabbs(pool, [CUBE_AABB]);
    expect(result.length).toBe(pool.length);
  });

  it('rejects points inside AABB', () => {
    const outside = Array.from({ length: 130 }, (_, i) => pt(10 + i, 0.08, 0));
    const inside = [pt(0, 0.5, 0), pt(0.5, 1.0, 0.5)];
    const pool = [...outside, ...inside];
    const result = filterPoolByAabbs(pool, [CUBE_AABB]);
    expect(result.length).toBe(outside.length);
  });

  it('keeps bypassAabb points even if inside AABB', () => {
    const outside = Array.from({ length: 128 }, (_, i) => pt(10 + i, 0.08, 0));
    const bypassed = [pt(0, 0.5, 0, true), pt(0.5, 1.0, 0.5, true)];
    const pool = [...outside, ...bypassed];
    const result = filterPoolByAabbs(pool, [CUBE_AABB]);
    expect(result.length).toBe(pool.length);
    expect(result.every(sp => sp.bypassAabb || !CUBE_AABB.containsPoint({ x: sp.position[0], y: sp.position[1], z: sp.position[2] } as Parameters<Box3['containsPoint']>[0]))).toBe(true);
  });

  it('applies padding', () => {
    // Point exactly at AABB edge (x=1.0) — outside without padding, inside with padding
    const outside = Array.from({ length: 130 }, (_, i) => pt(10 + i, 0.08, 0));
    const edgePoint = pt(1.1, 0.5, 0); // 0.1m outside, within default 0.35 padding
    const pool = [...outside, edgePoint];
    const result = filterPoolByAabbs(pool, [CUBE_AABB], 0.35);
    expect(result.length).toBe(outside.length); // edgePoint rejected
  });

  it('returns full pool when no AABBs provided', () => {
    const pool = Array.from({ length: 130 }, (_, i) => pt(i, 0, 0));
    const result = filterPoolByAabbs(pool, []);
    expect(result.length).toBe(pool.length);
  });

  it('throws if filtered pool falls below minimum', () => {
    const tiny = [pt(0, 0.5, 0), pt(0.1, 0.5, 0.1)]; // both inside cube
    expect(() => filterPoolByAabbs(tiny, [CUBE_AABB])).toThrow();
  });
});
