import { type VillageItem } from './layout';

const PI = Math.PI;

/**
 * The village, composed as a real town (not scattered props):
 *  - a main street running south→north (the player enters from the south)
 *  - houses lined up on both sides, each turned to face the street
 *  - a plaza at the head with a well, a market stall and an inn
 *  - a castle landmark closing the plaza, a windmill on the outskirts
 * Render + collision + spawn all read this array.
 */
export const VILLAGE_ITEMS: readonly VillageItem[] = [
  // ── West row (x=-8), front facing east toward the street ──
  { kind: 'townhouse1', position: [-8, 0, 12], rotationY: -PI / 2 },
  { kind: 'house1', position: [-8, 0, 6], rotationY: -PI / 2 },
  { kind: 'house3', position: [-8, 0, 0], rotationY: -PI / 2 },
  { kind: 'fantasyhouse', position: [-8, 0, -6], rotationY: -PI / 2 },

  // ── East row (x=+8), front facing west toward the street ──
  { kind: 'townhouse2', position: [8, 0, 12], rotationY: PI / 2 },
  { kind: 'house2', position: [8, 0, 6], rotationY: PI / 2 },
  { kind: 'house1', position: [8, 0, 0], rotationY: PI / 2 },
  { kind: 'house3', position: [8, 0, -6], rotationY: PI / 2 },

  // ── Plaza at the head of the street ──
  { kind: 'well', position: [0, 0, -14] },
  { kind: 'market', position: [-6, 0, -16.5], rotationY: PI / 2 },
  { kind: 'bigbuilding', position: [9.5, 0, -16.5], rotationY: -PI / 2 }, // inn facing the plaza
  { kind: 'fantasyhouse', position: [-10, 0, -19], rotationY: 0 },

  // ── Castle landmark closing the plaza (facing the village) ──
  { kind: 'castle', position: [0, 0, -23] },

  // ── Windmill on the outskirts ──
  { kind: 'windmill', position: [15, 0, -19] },

  // ── Detail props (along the street + plaza) ──
  { kind: 'barrel', position: [-4.6, 0, 9] },
  { kind: 'barrel', position: [4.6, 0, 3] },
  { kind: 'barrel', position: [3.2, 0, -16] },
  { kind: 'barrel', position: [-3, 0, -12.5] },
  { kind: 'bucket', position: [1.4, 0, -13.5] },
  { kind: 'bucket', position: [-4.5, 0, -15.8] },
];
