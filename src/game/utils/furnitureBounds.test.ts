import { describe, it, expect } from 'vitest';
import { worldAabb } from './furnitureBounds';
import type { LocalBounds } from '@/game/types';

const UNIT_BOX: LocalBounds = { min: [-1, 0, -1], max: [1, 2, 1] };

describe('worldAabb', () => {
  it('applies position offset with no rotation', () => {
    const box = worldAabb(UNIT_BOX, [5, 0, 3]);
    expect(box.min.x).toBeCloseTo(4);
    expect(box.max.x).toBeCloseTo(6);
    expect(box.min.z).toBeCloseTo(2);
    expect(box.max.z).toBeCloseTo(4);
    expect(box.min.y).toBeCloseTo(0);
    expect(box.max.y).toBeCloseTo(2);
  });

  it('inflates symmetrically at 45°', () => {
    const box = worldAabb(UNIT_BOX, [0, 0, 0], Math.PI / 4);
    // At 45° a unit box inflates: diagonal = sqrt(2) ≈ 1.414
    expect(box.max.x).toBeGreaterThan(1);
    expect(box.max.z).toBeGreaterThan(1);
  });

  it('is symmetric at 90° rotation', () => {
    const sq: LocalBounds = { min: [-1, 0, -1], max: [1, 2, 1] };
    const box0 = worldAabb(sq, [0, 0, 0], 0);
    const box90 = worldAabb(sq, [0, 0, 0], Math.PI / 2);
    expect(box0.min.x).toBeCloseTo(box90.min.x, 5);
    expect(box0.max.z).toBeCloseTo(box90.max.z, 5);
  });

  it('applies scale', () => {
    const box = worldAabb(UNIT_BOX, [0, 0, 0], 0, 2);
    expect(box.min.x).toBeCloseTo(-2);
    expect(box.max.x).toBeCloseTo(2);
    expect(box.max.y).toBeCloseTo(4);
  });
});
