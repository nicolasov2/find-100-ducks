import type { Vector3Tuple } from 'three';
import type { LocalBounds } from '@/game/types';

// Single source of truth for garden furniture. Both the renderer (GardenItems)
// and the AABB registry (roomAabbs) derive from GARDEN_ITEMS, so a piece can
// never be rendered in one place and collision-tested in another.

export type GardenItemKind =
  | 'tree'
  | 'bush'
  | 'sunflower'
  | 'mushroom'
  | 'bench'
  | 'birdbath'
  | 'planter'
  | 'plant'
  | 'box';

export interface GardenItem {
  readonly kind: GardenItemKind;
  readonly position: Vector3Tuple;
  readonly rotationY?: number;
  readonly scale?: number;
  readonly flowerColor?: string;
}

export const GARDEN_CX = 0;
export const GARDEN_CZ = 22; // furniture anchor (floor spans x:[-17,17], z:[12,38])

// Solid garden structures rendered in GardenExtension. Position + bounds live
// here so render and collision stay in sync.
export const TOOL_SHED_POS: Vector3Tuple = [GARDEN_CX + 9, 0, GARDEN_CZ + 14];
export const STONE_WELL_POS: Vector3Tuple = [GARDEN_CX - 8, 0, GARDEN_CZ + 12];
export const TOOL_SHED_BOUNDS: LocalBounds = { min: [-2.55, 0, -2.05], max: [2.55, 2.95, 2.05] };
export const STONE_WELL_BOUNDS: LocalBounds = { min: [-0.7, 0, -0.7], max: [0.7, 1.2, 0.7] };
