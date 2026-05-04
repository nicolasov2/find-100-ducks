import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;
const CZ = 21;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Bookcase south-left — between books on each shelf (6) ──
  [CX - 4.8, 0.40, CZ + 5.5], [CX - 4.0, 1.10, CZ + 5.5],
  [CX - 3.2, 1.80, CZ + 5.5], [CX - 4.5, 2.50, CZ + 5.5],
  [CX - 3.5, 3.20, CZ + 5.5], [CX - 4.2, 3.70, CZ + 5.5],
  // ── Bookcase south-right (6) ──
  [CX + 4.8, 0.40, CZ + 5.5], [CX + 4.0, 1.10, CZ + 5.5],
  [CX + 3.2, 1.80, CZ + 5.5], [CX + 4.5, 2.50, CZ + 5.5],
  [CX + 3.5, 3.20, CZ + 5.5], [CX + 4.0, 3.70, CZ + 5.5],
  // ── Bookcase west upper (5) ──
  [CX - 6.5, 0.40, CZ + 1.5], [CX - 6.5, 1.10, CZ + 0.5],
  [CX - 6.5, 1.80, CZ + 1.5], [CX - 6.5, 2.50, CZ + 0.5],
  [CX - 6.5, 3.20, CZ + 1.0],
  // ── Bookcase west lower (4) ──
  [CX - 6.5, 0.40, CZ - 3.5], [CX - 6.5, 1.10, CZ - 2.5],
  [CX - 6.5, 1.80, CZ - 3.5], [CX - 6.5, 2.50, CZ - 2.5],
  // ── Behind bookcases (floor level, hard to see) (4) ──
  [CX - 4, 0.06, CZ + 5.9], [CX + 4, 0.06, CZ + 5.9],
  [CX - 6.9, 0.06, CZ + 1], [CX - 6.9, 0.06, CZ - 3],
  // ── Ladder rungs (3) ──
  [CX - 2.5, 0.50, CZ + 5.4], [CX - 2.5, 1.20, CZ + 5.3], [CX - 2.5, 2.00, CZ + 5.2],
  // ── Desk — on top, under, behind (4) ──
  [CX + 3, 0.85, CZ - 3], [CX + 3.5, 0.85, CZ - 2.5],
  [CX + 2.5, 0.06, CZ - 3.5], [CX + 3.2, 0.06, CZ - 3.8],
  // ── Side table by desk (2) ──
  [CX + 5.5, 0.55, CZ - 4], [CX + 5.5, 0.06, CZ - 4.3],
  // ── Reading chairs (3) ──
  [CX + 3, 0.50, CZ], [CX + 4.2, 0.50, CZ - 1.8], [CX + 3, 0.50, CZ + 2.5],
  // ── Coffee table — on top and under (3) ──
  [CX + 4.5, 0.42, CZ + 1.2], [CX + 4.5, 0.15, CZ + 1.2], [CX + 4.5, 0.06, CZ + 1.5],
  // ── Fireplace — on mantel, inside hearth, behind pillars (5) ──
  [CX + 6.3, 1.12, CZ], [CX + 6.3, 1.12, CZ + 0.5], [CX + 6.3, 1.12, CZ - 0.5],
  [CX + 6.3, 0.06, CZ + 0.3], [CX + 6.3, 0.06, CZ - 0.3],
  // ── Chests — on top, beside (4) ──
  [CX - 3, 0.52, CZ - 5], [CX - 3.5, 0.06, CZ - 5.3],
  [CX + 2, 0.52, CZ + 4.5], [CX + 2.5, 0.06, CZ + 4.8],
  // ── Globes (2) ──
  [CX - 2, 0.95, CZ - 3.5], [CX + 5.5, 0.95, CZ + 1.2],
  // ── Wall clock ledge (1) ──
  [CX + 0.3, 2.80, CZ + 5.85],
  // ── Painting frames (2) ──
  [CX + 6.85, 2.60, CZ - 3], [CX - 6.85, 3.20, CZ - 4],
  // ── Plants — in foliage (4) ──
  [CX - 6.2, 0.55, CZ - 5.2], [CX + 6.2, 0.55, CZ + 5.2],
  [CX, 0.55, CZ - 5], [CX + 5, 0.55, CZ + 4.5],
  // ── Book stacks on top (3) ──
  [CX - 1, 1.20, CZ - 3], [CX + 4.5, 0.75, CZ + 1.2], [CX - 5, 0.30, CZ - 2],
  // ── Behind boxes (2) ──
  [CX - 5.3, 0.06, CZ + 5.3], [CX + 6.3, 0.06, CZ - 5.3],
  // ── Inside boxes (2) ──
  [CX - 5, 0.30, CZ + 5], [CX + 6, 0.30, CZ - 5],
  // ── Cushions (2) ──
  [CX - 1, 0.22, CZ + 3], [CX + 1, 0.22, CZ - 2],
  // ── Lamp shades (2) ──
  [CX - 5.5, 2.55, CZ - 5], [CX + 5.5, 2.55, CZ + 5],
  // ── Dark corners (4) ──
  [CX - 6.8, 0.06, CZ - 5.8], [CX + 6.8, 0.06, CZ - 5.8],
  [CX - 6.8, 0.06, CZ + 5.8], [CX + 6.8, 0.06, CZ + 5.8],
  // ── Scattered floor (6) ──
  [CX - 2, 0.06, CZ - 1], [CX + 1, 0.06, CZ + 1],
  [CX - 4, 0.06, CZ + 2], [CX + 5, 0.06, CZ - 2],
  [CX, 0.06, CZ + 4], [CX, 0.06, CZ - 4],
];

export const SPAWN_POOL_ROOM_3: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r3-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-3',
}));
