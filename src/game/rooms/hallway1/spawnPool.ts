import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const POSITIONS: readonly Vector3Tuple[] = [
  [12, 0.02, 0],
  [14, 0.02, 0.8],
  [16, 0.02, -0.6],
  [18, 0.02, 0],
  [11.5, 0.02, -0.8],
  [15, 0.02, 0],
  [13, 0.02, -0.9],
  [17, 0.02, 0.9],
];

export const SPAWN_POOL_HALLWAY_1: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `h1-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'hallway-1',
}));
