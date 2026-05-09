import { Box3, Vector3 } from 'three';
import type { Vector3Tuple } from 'three';
import type { LocalBounds } from '@/game/types';

/**
 * Converts a local-space AABB to world-space by applying scale, position, and rotationY.
 * Rotating an AABB inflates it by ~1.4× at 45° (conservative over-rejection
 * accepted over OBB-vs-point SAT complexity).
 */
export function worldAabb(
  local: LocalBounds,
  position: Vector3Tuple,
  rotationY = 0,
  scale = 1,
): Box3 {
  const [px, py, pz] = position;
  const [minX, minY, minZ] = local.min;
  const [maxX, maxY, maxZ] = local.max;
  const sMinX = minX * scale, sMaxX = maxX * scale;
  const sMinY = minY * scale, sMaxY = maxY * scale;
  const sMinZ = minZ * scale, sMaxZ = maxZ * scale;

  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);

  const corners: readonly [number, number][] = [
    [sMinX, sMinZ],
    [sMaxX, sMinZ],
    [sMinX, sMaxZ],
    [sMaxX, sMaxZ],
  ];

  let wMinX = Infinity, wMaxX = -Infinity;
  let wMinZ = Infinity, wMaxZ = -Infinity;

  for (const [cx, cz] of corners) {
    const rx = cx * cosY - cz * sinY;
    const rz = cx * sinY + cz * cosY;
    if (rx < wMinX) wMinX = rx;
    if (rx > wMaxX) wMaxX = rx;
    if (rz < wMinZ) wMinZ = rz;
    if (rz > wMaxZ) wMaxZ = rz;
  }

  return new Box3(
    new Vector3(wMinX + px, sMinY + py, wMinZ + pz),
    new Vector3(wMaxX + px, sMaxY + py, wMaxZ + pz),
  );
}
