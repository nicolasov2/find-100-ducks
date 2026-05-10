import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;
const CZ = 21;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Bookcase south-left — between books, visible from front (6) ──
  [CX - 4.8, 0.42, CZ + 5.2], [CX - 4.0, 1.12, CZ + 5.2],
  [CX - 3.2, 1.82, CZ + 5.2], [CX - 4.5, 2.52, CZ + 5.2],
  [CX - 3.5, 3.22, CZ + 5.2], [CX - 4.2, 3.72, CZ + 5.2],
  // ── Bookcase south-right (6) ──
  [CX + 4.8, 0.42, CZ + 5.2], [CX + 4.0, 1.12, CZ + 5.2],
  [CX + 3.2, 1.82, CZ + 5.2], [CX + 4.5, 2.52, CZ + 5.2],
  [CX + 3.5, 3.22, CZ + 5.2], [CX + 4.0, 3.72, CZ + 5.2],
  // ── Bookcase west upper — visible from room (5) ──
  [CX - 6.2, 0.42, CZ + 1.5], [CX - 6.2, 1.12, CZ + 0.5],
  [CX - 6.2, 1.82, CZ + 1.5], [CX - 6.2, 2.52, CZ + 0.5],
  [CX - 6.2, 3.22, CZ + 1.0],
  // ── Bookcase west lower (4) ──
  [CX - 6.2, 0.42, CZ - 3.5], [CX - 6.2, 1.12, CZ - 2.5],
  [CX - 6.2, 1.82, CZ - 3.5], [CX - 6.2, 2.52, CZ - 2.5],
  // ── Floor in front of bookcases (3) ──
  [CX - 4, 0.02, CZ + 4.8], [CX + 4, 0.02, CZ + 4.8],
  [CX - 5.5, 0.02, CZ + 1],
  // ── Ladder rungs — visible from front (3) ──
  [CX - 2.5, 0.52, CZ + 5.0], [CX - 2.5, 1.22, CZ + 4.9], [CX - 2.5, 2.02, CZ + 4.8],
  // ── Desk — on top, floor beside (4) ──
  [CX + 3, 0.87, CZ - 3], [CX + 3.5, 0.87, CZ - 2.5],
  [CX + 2.5, 0.02, CZ - 4.0], [CX + 3.8, 0.02, CZ - 3.5],
  // ── Side table by desk (2) ──
  [CX + 5.5, 0.57, CZ - 4], [CX + 5.5, 0.02, CZ - 3.5],
  // ── Reading chairs (3) ──
  [CX + 3, 0.52, CZ], [CX + 4.2, 0.52, CZ - 1.8], [CX + 3, 0.52, CZ + 2.5],
  // ── Coffee table — on top and under (3) ──
  [CX + 4.5, 0.44, CZ + 1.2], [CX + 4.5, 0.02, CZ + 1.5], [CX + 4.2, 0.02, CZ + 0.8],
  // ── Fireplace — on mantel (visible from room) (3) ──
  [CX + 6.0, 1.14, CZ], [CX + 6.0, 1.14, CZ + 0.4], [CX + 6.0, 1.14, CZ - 0.4],
  // ── Fireplace floor in front (2) ──
  [CX + 5.5, 0.02, CZ + 0.5], [CX + 5.5, 0.02, CZ - 0.5],
  // ── Chests — on top, floor beside (4) ──
  [CX - 3, 0.54, CZ - 5], [CX - 3.5, 0.02, CZ - 4.5],
  [CX + 2, 0.54, CZ + 4.5], [CX + 2.5, 0.02, CZ + 4.0],
  // ── Globes (2) ──
  [CX - 2, 0.97, CZ - 3.5], [CX + 5.5, 0.97, CZ + 1.2],
  // ── Floor beside clock wall (1) ──
  [CX + 0.3, 0.02, CZ + 5.5],
  // ── Plants — beside (4) ──
  [CX - 6.2, 0.02, CZ - 5.2], [CX + 6.2, 0.02, CZ + 5.2],
  [CX + 0.5, 0.02, CZ - 5], [CX + 5.5, 0.02, CZ + 4.5],
  // ── Book stacks (3) ──
  [CX - 1, 1.22, CZ - 3], [CX + 4.5, 0.77, CZ + 1.2], [CX - 5, 0.32, CZ - 2],
  // ── Beside boxes — floor (2) ──
  [CX - 4.5, 0.02, CZ + 5.0], [CX + 5.5, 0.02, CZ - 5.0],
  // ── On boxes (2) ──
  [CX - 5, 0.45, CZ + 5], [CX + 6, 0.45, CZ - 5],
  // ── Cushions (2) ──
  [CX - 1, 0.24, CZ + 3], [CX + 1, 0.24, CZ - 2],
  // ── Lamp beside (2) ──
  [CX - 5.5, 0.02, CZ - 5], [CX + 5.5, 0.02, CZ + 5],
  // ── Dark corners (4) ──
  [CX - 6.5, 0.02, CZ - 5.5], [CX + 6.5, 0.02, CZ - 5.5],
  [CX - 6.5, 0.02, CZ + 4.5], [CX + 6.5, 0.02, CZ + 4.5],
  // ── Scattered floor (6) ──
  [CX - 2, 0.02, CZ - 1], [CX + 1, 0.02, CZ + 1],
  [CX - 4, 0.02, CZ + 2], [CX + 5, 0.02, CZ - 2],
  [CX, 0.02, CZ + 4], [CX, 0.02, CZ - 4],
  // ── Rocking chairs — on seat (2) ──
  [CX - 4, 0.55, CZ - 4], [CX + 5, 0.55, CZ - 3],
  // ── Behind rocking chairs — floor (2) ──
  [CX - 4.5, 0.02, CZ - 4.5], [CX + 5.5, 0.02, CZ - 3.5],
  // ── Poufs — on top (2) ──
  [CX - 2, 0.50, CZ + 5], [CX + 3, 0.50, CZ + 5.5],
  // ── New planter — top + side (3) ──
  [CX, 0.45, CZ - 5.5], [CX - 0.5, 0.65, CZ - 5.5], [CX + 0.5, 0.02, CZ - 5.7],
  // ── NE corner — previously empty (4) ──
  [CX + 6.5, 0.02, CZ - 5.5], [CX + 6.0, 0.02, CZ - 4.5],
  [CX + 6.5, 1.5, CZ - 5.5], [CX + 5.5, 0.02, CZ - 5.0],
];

// Floor-level spot under the coffee table (inside expanded AABB).
const INSIDE_FURNITURE = new Set([38]);
const BYPASS = new Set([
  ...POSITIONS.flatMap((p, i) => (p[1] > 0.15 ? [i] : [])),
  ...INSIDE_FURNITURE,
]);

export const SPAWN_POOL_ROOM_3: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r3-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-3',
  ...(BYPASS.has(i) ? { bypassAabb: true as const } : {}),
}));
