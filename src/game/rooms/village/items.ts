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

  // ── Street lamps lining the main street (in pairs) ──
  { kind: 'streetlight', position: [-3.8, 0, 11] },
  { kind: 'streetlight', position: [3.8, 0, 11] },
  { kind: 'streetlight', position: [-3.8, 0, 2] },
  { kind: 'streetlight', position: [3.8, 0, 2] },
  { kind: 'streetlight', position: [-3.8, 0, -8] },
  { kind: 'streetlight', position: [3.8, 0, -8] },

  // ── Trees in the side lawns + corners ──
  { kind: 'tree', position: [-13, 0, 13], scale: 1.1 },
  { kind: 'tree', position: [13, 0, 13], scale: 1.0 },
  { kind: 'tree', position: [-15, 0, 9], scale: 0.95 },
  { kind: 'tree', position: [15, 0, 9], scale: 1.05 },
  { kind: 'tree', position: [-15, 0, 1], scale: 1.0 },
  { kind: 'tree', position: [15, 0, 1], scale: 0.9 },
  { kind: 'tree', position: [-14, 0, -7], scale: 1.1 },
  { kind: 'tree', position: [14, 0, -7], scale: 1.0 },

  // ── Pines along the back/perimeter ──
  { kind: 'pine', position: [-17, 0, -11], scale: 1.0 },
  { kind: 'pine', position: [17, 0, -11], scale: 1.1 },
  { kind: 'pine', position: [-17, 0, 4], scale: 0.95 },
  { kind: 'pine', position: [17, 0, 4], scale: 1.0 },

  // ── Hedges bordering lawns/plaza (good hiding spots) ──
  { kind: 'hedge', position: [-11.5, 0, 8], rotationY: PI / 2 },
  { kind: 'hedge', position: [11.5, 0, 8], rotationY: PI / 2 },
  { kind: 'hedge', position: [-12, 0, -13], rotationY: PI / 2 },
  { kind: 'hedge', position: [12, 0, -13], rotationY: PI / 2 },

  // ── Carts by the farm/houses ──
  { kind: 'cart', position: [12, 0, 9], rotationY: 0.3 },
  { kind: 'cart', position: [12, 0, -15], rotationY: -0.4 },
  { kind: 'cart', position: [-13, 0, -15], rotationY: 0.5 },

  // ── Torches flanking the castle approach ──
  { kind: 'torch', position: [-3, 0, -16.5] },
  { kind: 'torch', position: [3, 0, -16.5] },

  // ── Fence rows around side gardens ──
  { kind: 'fence', position: [-13, 0, 10.5], rotationY: PI / 2 },
  { kind: 'fence', position: [-13, 0, 8.3], rotationY: PI / 2 },
  { kind: 'fence', position: [13, 0, -11.5], rotationY: PI / 2 },
  { kind: 'fence', position: [13, 0, -13.7], rotationY: PI / 2 },
];
