import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

// Hand-placed gnomes ON TOP of props (barrels, the well rim, the market stall)
// for vertical variety. bypassAabb lets them survive the obstacle filter; each y
// matches the prop's top surface.
const POINTS: readonly Vector3Tuple[] = [
  [-4.6, 1.05, 9], [4.6, 1.05, 3], [3.2, 1.05, -16], [-3, 1.05, -12.5],
  [0, 1.2, -14], // on the well rim
  [-6, 1.4, -16.5], // on the market counter
  [1.4, 0.7, -13.5], // on a bucket
];

export const VILLAGE_ELEVATED_SPAWNS: readonly SpawnPoint[] = POINTS.map((p, i) => ({
  id: `v2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'village',
  bypassAabb: true,
}));
