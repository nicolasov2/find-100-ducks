import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;

const POSITIONS: readonly Vector3Tuple[] = [
  [CX, 0.06, 8],
  [CX, 0.06, 10],
  [CX + 0.8, 0.06, 9],
  [CX - 0.8, 0.06, 11],
  [CX, 0.06, 12],
  [CX + 0.6, 0.06, 13],
  [CX - 0.6, 0.06, 14],
];

export const SPAWN_POOL_HALLWAY_2: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `h2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'hallway-2',
}));
