import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;

const POSITIONS: readonly Vector3Tuple[] = [
  [CX, 0.02, 8],
  [CX, 0.02, 10],
  [CX + 0.8, 0.02, 9],
  [CX - 0.8, 0.02, 11],
  [CX, 0.02, 12],
  [CX + 0.6, 0.02, 13],
  [CX - 0.6, 0.02, 14],
];

export const SPAWN_POOL_HALLWAY_2: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `h2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'hallway-2',
}));
