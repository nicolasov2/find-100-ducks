import type { Vector3Tuple } from 'three';
import type { LocalBounds } from '@/game/types';

// Single source of truth for the medieval village. The renderer (VillageProps),
// the AABB registry (roomAabbs), the solid colliders (VillageColliders) and the
// gnome spawn grid (spawnPool) all derive from VILLAGE_ITEMS / the data here, so
// nothing can drift apart. Pieces are real CC0 .glb props (Quaternius) arranged
// as a coherent town: a central street lined with houses, a plaza with a well
// and market, a castle landmark at the head, a windmill on the outskirts.

export type VillageItemKind =
  | 'townhouse1'
  | 'townhouse2'
  | 'house1'
  | 'house2'
  | 'house3'
  | 'fantasyhouse'
  | 'bigbuilding'
  | 'castle'
  | 'windmill'
  | 'well'
  | 'market'
  | 'barrel'
  | 'bucket';

export interface VillageItem {
  readonly kind: VillageItemKind;
  readonly position: Vector3Tuple;
  readonly rotationY?: number;
  readonly scale?: number;
}

// Footprint (XZ) used for spawn exclusion + solid colliders, sized to roughly
// match each piece once normalized to its render size (see VILLAGE_PROPS.maxDim).
// Generous on purpose so gnomes never land against a wall.
export const VILLAGE_BOUNDS: Record<VillageItemKind, LocalBounds> = {
  townhouse1: { min: [-2.6, 0, -2.6], max: [2.6, 6, 2.6] },
  townhouse2: { min: [-2.4, 0, -2.4], max: [2.4, 6, 2.4] },
  house1: { min: [-2.4, 0, -2.4], max: [2.4, 5.5, 2.4] },
  house2: { min: [-2.2, 0, -2.2], max: [2.2, 5, 2.2] },
  house3: { min: [-2.4, 0, -2.4], max: [2.4, 5.5, 2.4] },
  fantasyhouse: { min: [-2.3, 0, -2.3], max: [2.3, 5.5, 2.3] },
  bigbuilding: { min: [-3.4, 0, -3.4], max: [3.4, 8, 3.4] },
  castle: { min: [-6, 0, -6], max: [6, 14, 6] },
  windmill: { min: [-2.4, 0, -2.4], max: [2.4, 9, 2.4] },
  well: { min: [-1.2, 0, -1.2], max: [1.2, 2.5, 1.2] },
  market: { min: [-1.9, 0, -1.9], max: [1.9, 3.2, 1.9] },
  barrel: { min: [-0.5, 0, -0.5], max: [0.5, 1.1, 0.5] },
  bucket: { min: [-0.35, 0, -0.35], max: [0.35, 0.6, 0.35] },
};

export const VILLAGE_FLOOR_Y = 0;

/** Whole walkable area (for the invisible floor + perimeter walls). */
export const VILLAGE_BOX = { xMin: -19, xMax: 19, zMin: -24, zMax: 17 } as const;

/** Player start: south end of the main street, looking north up the village (−z). */
export const VILLAGE_SPAWN: Vector3Tuple = [0, 0.9, 15];

// Walkable lanes where gnomes may hide — the main street and the plaza, i.e.
// where people would actually walk. Gnomes are generated only inside these,
// never in the scenery behind houses. Rectangles in world space {x0,x1,z0,z1}.
export const WALK_ZONES: readonly { x0: number; x1: number; z0: number; z1: number }[] = [
  { x0: -4, x1: 4, z0: -11, z1: 16 },    // main street (south entrance → plaza)
  { x0: -12, x1: 12, z0: -21, z1: -11 }, // central plaza
];
