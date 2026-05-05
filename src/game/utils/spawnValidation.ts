import type { World, Ray } from '@dimforge/rapier3d-compat';
import type { Vector3Tuple } from 'three';

const RAY_LENGTH = 0.5;
const MIN_FLOOR_DISTANCE = 0.05;
const HORIZONTAL_CHECK_DISTANCE = 0.18;

interface RapierLike {
  Ray: new (
    origin: { x: number; y: number; z: number },
    dir: { x: number; y: number; z: number },
  ) => Ray;
}

export interface ValidationContext {
  world: World;
  rapier: RapierLike;
}

/**
 * Returns true if the spawn point has clearance:
 * - There is floor below within reasonable distance (so gnome can stand).
 * - No collider is intersecting the gnome's body bubble at this position.
 */
export function isSpawnSafe(
  ctx: ValidationContext,
  point: Vector3Tuple,
): boolean {
  const { world, rapier } = ctx;
  const [px, py, pz] = point;

  // Vertical down ray from slightly above the point — must hit floor within RAY_LENGTH,
  // and must NOT hit something at toi < MIN_FLOOR_DISTANCE (which means we're inside).
  const downRay = new rapier.Ray(
    { x: px, y: py + 0.05, z: pz },
    { x: 0, y: -1, z: 0 },
  );
  const downHit = world.castRay(downRay, RAY_LENGTH, true);
  if (downHit === null) return false;
  if (downHit.timeOfImpact < MIN_FLOOR_DISTANCE) return false;

  // Horizontal cardinal rays — if anything is closer than HORIZONTAL_CHECK_DISTANCE,
  // gnome would clip into furniture.
  const dirs: ReadonlyArray<{ x: number; y: number; z: number }> = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ];
  for (const dir of dirs) {
    const ray = new rapier.Ray(
      { x: px, y: py + 0.1, z: pz },
      dir,
    );
    const hit = world.castRay(ray, HORIZONTAL_CHECK_DISTANCE, true);
    if (hit !== null && hit.timeOfImpact < HORIZONTAL_CHECK_DISTANCE) {
      return false;
    }
  }

  return true;
}
