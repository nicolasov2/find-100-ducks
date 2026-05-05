import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 0;
const CZ = 22;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Inside / behind bushes (10) ──
  [CX - 3, 0.10, CZ - 5], [CX + 3, 0.10, CZ - 5],
  [CX - 6, 0.10, CZ + 1], [CX + 6, 0.10, CZ + 1],
  [CX - 4, 0.10, CZ + 5], [CX + 4, 0.10, CZ + 6],
  [CX, 0.10, CZ + 7], [CX - 7, 0.10, CZ + 7],
  [CX + 7, 0.10, CZ + 7], [CX - 1, 0.10, CZ + 9],
  // ── Near trees, base (6) ──
  [CX - 9, 0.08, CZ + 8], [CX + 9, 0.08, CZ + 8],
  [CX - 9, 0.08, CZ + 4], [CX + 9, 0.08, CZ + 2],
  [CX + 7, 0.08, CZ - 7], [CX - 7, 0.08, CZ - 7],
  // ── Up in tree foliage (6) — high spots ──
  [CX - 9, 2.4, CZ + 8.5], [CX + 9, 2.4, CZ + 8.5],
  [CX - 9, 2.2, CZ + 4], [CX + 9, 2.2, CZ + 2],
  [CX + 7, 2.0, CZ - 7], [CX - 7, 2.2, CZ - 7],
  // ── Sunflower bases (4) ──
  [CX - 8, 0.08, CZ + 3], [CX - 7.4, 0.08, CZ + 3.5],
  [CX + 8, 0.08, CZ + 4.5], [CX + 7.4, 0.08, CZ + 5],
  // ── Behind bench / on bench seat (4) ──
  [CX - 4, 0.50, CZ + 2], [CX + 4, 0.50, CZ + 2],
  [CX - 4.5, 0.08, CZ + 2.5], [CX + 4.5, 0.08, CZ + 2.5],
  // ── Bird bath base + on basin (3) ──
  [CX, 0.10, CZ + 2.5], [CX, 0.95, CZ + 2],
  [CX + 0.4, 0.08, CZ + 2.4],
  // ── Mushroom clusters — beside (3) ──
  [CX - 8, 0.10, CZ + 7], [CX + 8, 0.10, CZ + 7],
  [CX - 7.5, 0.10, CZ + 5],
  // ── Inside boxes (2) ──
  [CX + 7, 0.40, CZ + 5], [CX - 7, 0.40, CZ + 5],
  // ── Stone path (2) — out in open ──
  [CX, 0.08, CZ - 6], [CX, 0.08, CZ - 4],
  // ── Planters near house wall (4) ──
  [CX - 10, 0.45, CZ - 2], [CX + 10, 0.45, CZ - 2],
  [CX - 5, 0.55, CZ - 4], [CX + 5, 0.55, CZ - 4],
  // ── Far corners + along fences (6) ──
  [CX - 10.5, 0.08, CZ - 9.5], [CX + 10.5, 0.08, CZ - 9.5],
  [CX - 10.5, 0.08, CZ + 9.5], [CX + 10.5, 0.08, CZ + 9.5],
  [CX, 0.08, CZ + 9.8], [CX - 10.5, 0.08, CZ],
];

export const SPAWN_POOL_GARDEN: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r4-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'garden',
}));
