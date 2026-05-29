import type { Vector3Tuple } from 'three';
import type { LocalBounds } from '@/game/types';

// Single source of truth for the beach chapter. Both the renderer (BeachProps)
// and the AABB registry (roomAabbs) derive from BEACH_OBSTACLES, so a prop can
// never be rendered in one place and collision-tested in another — same pattern
// that fixed the garden's buried-gnome bug.

export type BeachObstacleKind =
  | 'palm'
  | 'rock'
  | 'umbrella'
  | 'pier'
  | 'boat'
  | 'crate'
  | 'lifeguard';

export interface BeachObstacle {
  readonly kind: BeachObstacleKind;
  readonly position: Vector3Tuple;
  readonly rotationY?: number;
  readonly scale?: number;
}

// Scale-1 local footprints (XZ used for spawn exclusion; Y spans the prop so the
// floor-level grid points test against the trunk/base). The visual .glb props are
// scaled to fit these bounds, keeping render and collision in agreement.
export const BEACH_BOUNDS: Record<BeachObstacleKind, LocalBounds> = {
  palm: { min: [-0.5, 0, -0.5], max: [0.5, 5.0, 0.5] },
  rock: { min: [-1.0, 0, -1.0], max: [1.0, 1.1, 1.0] },
  umbrella: { min: [-0.55, 0, -0.55], max: [0.55, 2.6, 0.55] },
  pier: { min: [-1.5, 0, -1.0], max: [1.5, 1.0, 1.0] },
  boat: { min: [-1.2, 0, -2.5], max: [1.2, 1.6, 2.5] },
  crate: { min: [-0.5, 0, -0.5], max: [0.5, 0.9, 0.5] },
  lifeguard: { min: [-1.3, 0, -1.3], max: [1.3, 3.2, 1.3] },
};

// World layout. Sand spans the play box; the sea is to the north (−z), the player
// enters from the south (+z) looking out to sea. Floor Y matches the rest of the
// game (0); gnomes sit at FLOOR_Y + 0.04 like the garden.
export const BEACH_FLOOR_Y = 0;

/** Dry-sand area where floor gnomes may hide (excludes the wet shore + sea). */
export const BEACH_BOX = { xMin: -18, xMax: 18, zMin: -8, zMax: 15 } as const;

/** Player start: south edge, resting on the sand, facing the sea (−z). */
export const BEACH_SPAWN: Vector3Tuple = [0, 0.9, 13.5];

/** Half-extents of the invisible play box (a bit beyond BEACH_BOX) for perimeter walls. */
export const BEACH_WALL_PAD = 0.6;
