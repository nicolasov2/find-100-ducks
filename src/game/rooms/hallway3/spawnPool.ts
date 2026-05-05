import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const POSITIONS: readonly Vector3Tuple[] = [
  [0, 0.06, 10.5],
  [0.7, 0.06, 11],
  [-0.7, 0.06, 11],
  [0, 0.06, 11.5],
];

export const SPAWN_POOL_HALLWAY_3: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `h3-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'hallway-2',
}));
