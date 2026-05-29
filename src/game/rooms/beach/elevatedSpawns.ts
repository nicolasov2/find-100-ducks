import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

// Hand-placed gnomes ON TOP of props (rocks, pier planks, crates, boat, tower)
// for vertical variety. bypassAabb lets them survive the obstacle filter; each y
// matches the prop's top surface.
const POINTS: readonly Vector3Tuple[] = [
  [-6, 1.2, -7], [6, 1.2, -7], [-16, 1.35, 13], [16, 1.35, 13], [-14, 1.1, 9],
  [0, 1.05, -1], [0, 1.05, -3], [0, 1.05, -5],
  [10, 1.0, -3], [-2.6, 1.0, 1], [2.6, 1.0, 1],
  [-10, 1.0, -3],
  [14, 2.9, 9],
];

export const BEACH_ELEVATED_SPAWNS: readonly SpawnPoint[] = POINTS.map((p, i) => ({
  id: `b2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'beach',
  bypassAabb: true,
}));
