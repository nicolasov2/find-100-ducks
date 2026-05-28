import { GARDEN_CX as CX, GARDEN_CZ as CZ, type GardenItem } from './layout';

const PI = Math.PI;

/** Every garden furniture piece, in world space. Render + AABBs both read this. */
export const GARDEN_ITEMS: readonly GardenItem[] = [
  // ── Central social area: bird bath flanked by benches (z ~24) ──
  { kind: 'birdbath', position: [CX, 0, CZ + 2] },
  { kind: 'bench', position: [CX - 4, 0, CZ + 2], rotationY: PI / 2 },
  { kind: 'bench', position: [CX + 4, 0, CZ + 2], rotationY: -PI / 2 },

  // ── Corner trees framing the core ──
  { kind: 'tree', position: [CX - 9.5, 0, CZ + 8], scale: 1.1 },
  { kind: 'tree', position: [CX + 9.5, 0, CZ + 8], scale: 1.0 },
  { kind: 'tree', position: [CX - 9, 0, CZ + 4], scale: 0.9 },
  { kind: 'tree', position: [CX + 9, 0, CZ + 2], scale: 1.2 },
  { kind: 'tree', position: [CX + 7, 0, CZ - 7], scale: 0.85 },
  { kind: 'tree', position: [CX - 7, 0, CZ - 7], scale: 0.95 },

  // ── Flowering bushes scattered through the core ──
  { kind: 'bush', position: [CX - 3, 0, CZ - 5], scale: 1.1, flowerColor: '#f472b6' },
  { kind: 'bush', position: [CX + 3, 0, CZ - 5], scale: 0.9 },
  { kind: 'bush', position: [CX - 6, 0, CZ + 1], flowerColor: '#fbbf24' },
  { kind: 'bush', position: [CX + 6, 0, CZ + 1], scale: 1.2 },
  { kind: 'bush', position: [CX - 4, 0, CZ + 5], scale: 0.85, flowerColor: '#fb7185' },
  { kind: 'bush', position: [CX + 4, 0, CZ + 6], flowerColor: '#a78bfa' },
  { kind: 'bush', position: [CX, 0, CZ + 7], scale: 1.3, flowerColor: '#fbbf24' },
  { kind: 'bush', position: [CX - 7, 0, CZ + 7], scale: 0.95 },
  { kind: 'bush', position: [CX + 7, 0, CZ + 7], flowerColor: '#f472b6' },
  { kind: 'bush', position: [CX - 1, 0, CZ + 9], scale: 1.0 },

  // ── Sunflower clusters (paired for a tended look) ──
  { kind: 'sunflower', position: [CX - 5, 0, CZ + 3], scale: 1.0 },
  { kind: 'sunflower', position: [CX - 5.6, 0, CZ + 3.5], scale: 0.9 },
  { kind: 'sunflower', position: [CX + 5, 0, CZ + 4.5], scale: 1.1 },
  { kind: 'sunflower', position: [CX + 5.6, 0, CZ + 5], scale: 0.85 },

  // ── Mushroom clusters ──
  { kind: 'mushroom', position: [CX - 8.5, 0, CZ + 7] },
  { kind: 'mushroom', position: [CX + 8.5, 0, CZ + 7] },
  { kind: 'mushroom', position: [CX - 5, 0, CZ + 5] },

  // ── Planters + potted plants near the north wall ──
  { kind: 'planter', position: [CX - 9, 0, CZ - 2], rotationY: PI / 2 },
  { kind: 'planter', position: [CX + 9, 0, CZ - 2], rotationY: PI / 2 },
  { kind: 'plant', position: [CX - 5, 0, CZ - 4] },
  { kind: 'plant', position: [CX + 5, 0, CZ - 4] },

  // ── Boxes ──
  { kind: 'box', position: [CX + 7, 0, CZ + 5], rotationY: 0.4 },
  { kind: 'box', position: [CX - 7, 0, CZ + 5], rotationY: -0.3 },

  // ── East wing (x 12–16) ──
  { kind: 'tree', position: [14, 0, CZ - 7], scale: 1.0 },
  { kind: 'tree', position: [15, 0, CZ + 3], scale: 1.2 },
  { kind: 'tree', position: [13, 0, CZ + 10], scale: 0.9 },
  { kind: 'bush', position: [12, 0, CZ - 4], scale: 1.0, flowerColor: '#fbbf24' },
  { kind: 'bush', position: [14, 0, CZ + 1], scale: 1.1 },
  { kind: 'bush', position: [13, 0, CZ + 7], scale: 0.95, flowerColor: '#f472b6' },
  { kind: 'sunflower', position: [15, 0, CZ - 2], scale: 1.1 },
  { kind: 'sunflower', position: [15.5, 0, CZ - 1.4], scale: 0.9 },
  { kind: 'sunflower', position: [14.5, 0, CZ - 2.6], scale: 1.0 },
  { kind: 'mushroom', position: [12.5, 0, CZ + 5] },
  { kind: 'plant', position: [16, 0, CZ + 9] },

  // ── West wing (x -12 to -16) ──
  { kind: 'tree', position: [-14, 0, CZ - 7], scale: 1.05 },
  { kind: 'tree', position: [-15, 0, CZ + 4], scale: 1.1 },
  { kind: 'tree', position: [-13, 0, CZ + 10], scale: 0.88 },
  { kind: 'bush', position: [-12, 0, CZ - 3], scale: 1.0, flowerColor: '#a78bfa' },
  { kind: 'bush', position: [-14, 0, CZ + 2], scale: 1.15, flowerColor: '#fb7185' },
  { kind: 'bush', position: [-13, 0, CZ + 8], scale: 1.0 },
  { kind: 'sunflower', position: [-15, 0, CZ - 1], scale: 1.0 },
  { kind: 'sunflower', position: [-15.5, 0, CZ - 1.8], scale: 0.9 },
  { kind: 'mushroom', position: [-12.5, 0, CZ + 6] },
  { kind: 'plant', position: [-16, 0, CZ + 8] },

  // ── South extension (z 32–37): trees + props ──
  { kind: 'tree', position: [CX - 12, 0, CZ + 13], scale: 1.1 },
  { kind: 'tree', position: [CX + 12, 0, CZ + 13], scale: 0.95 },
  { kind: 'tree', position: [CX - 4, 0, CZ + 15], scale: 1.0 },
  { kind: 'bush', position: [CX + 4, 0, CZ + 15], scale: 1.2, flowerColor: '#fbbf24' },
  { kind: 'bush', position: [CX - 10, 0, CZ + 9], scale: 1.0 },
  { kind: 'bush', position: [CX + 11, 0, CZ + 9], scale: 1.1, flowerColor: '#f472b6' },
  { kind: 'bush', position: [CX, 0, CZ + 14], scale: 1.3, flowerColor: '#a78bfa' },
  { kind: 'bench', position: [CX - 5, 0, CZ + 13], rotationY: 0 },
  { kind: 'box', position: [CX + 13, 0, CZ + 14], rotationY: 0.5 },
  { kind: 'box', position: [CX - 11, 0, CZ + 12], rotationY: -0.3 },
  { kind: 'mushroom', position: [CX - 3, 0, CZ + 13] },
  { kind: 'mushroom', position: [CX + 6, 0, CZ + 12] },
  { kind: 'sunflower', position: [CX - 10, 0, CZ + 12], scale: 1.1 },
  { kind: 'sunflower', position: [CX - 9.4, 0, CZ + 12.6], scale: 0.9 },
  { kind: 'sunflower', position: [CX + 10, 0, CZ + 11], scale: 1.0 },

  // ── Hedge rows flanking the south path ──
  { kind: 'bush', position: [CX - 6, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX - 4.6, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX - 3.2, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX - 1.8, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX + 2, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX + 3.4, 0, CZ + 11], scale: 1.1 },
  { kind: 'bush', position: [CX + 4.8, 0, CZ + 11], scale: 1.1 },

  // ── Added: perimeter bushes along the side fences ──
  { kind: 'bush', position: [-16, 0, CZ - 5], scale: 1.0, flowerColor: '#fbbf24' },
  { kind: 'bush', position: [16, 0, CZ - 5], scale: 1.0, flowerColor: '#a78bfa' },
  { kind: 'bush', position: [-16.2, 0, CZ + 12], scale: 1.0, flowerColor: '#f472b6' },
  { kind: 'bush', position: [16.2, 0, CZ + 13], scale: 1.0, flowerColor: '#fb7185' },

  // ── Added: corner trees closing the south boundary ──
  { kind: 'tree', position: [-15.5, 0, CZ + 14.5], scale: 1.05 },
  { kind: 'tree', position: [15.5, 0, CZ + 14.5], scale: 1.0 },

  // ── Added: sunflower pairs filling the mid sides ──
  { kind: 'sunflower', position: [-8, 0, CZ + 9], scale: 1.0 },
  { kind: 'sunflower', position: [-8.6, 0, CZ + 9.5], scale: 0.9 },
  { kind: 'sunflower', position: [8, 0, CZ + 8], scale: 1.0 },
  { kind: 'sunflower', position: [8.6, 0, CZ + 8.5], scale: 0.9 },

  // ── Added: planters framing the north entrance ──
  { kind: 'planter', position: [CX - 2.6, 0, CZ - 8] },
  { kind: 'planter', position: [CX + 2.6, 0, CZ - 8] },

  // ── Added: mushrooms + bushes on the entry lawn ──
  { kind: 'mushroom', position: [CX + 3, 0, CZ - 2] },
  { kind: 'mushroom', position: [CX - 3, 0, CZ - 1] },
  { kind: 'bush', position: [CX - 9, 0, CZ - 6], scale: 0.9, flowerColor: '#fbbf24' },
  { kind: 'bush', position: [CX + 9, 0, CZ - 6], scale: 0.9, flowerColor: '#a78bfa' },
];
