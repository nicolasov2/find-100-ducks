import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

/* Room 3 center: x=28, z=21. Size: 14×12. Bounds: x=[21,35], z=[15,27] */
const CX = 28;
const CZ = 21;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Bookcase shelves south-left (5) ──
  [CX - 4.8, 0.40, CZ + 5.5], [CX - 4.0, 1.10, CZ + 5.5],
  [CX - 3.2, 1.80, CZ + 5.5], [CX - 4.5, 2.50, CZ + 5.5],
  [CX - 3.5, 3.20, CZ + 5.5],
  // ── Bookcase shelves south-right (5) ──
  [CX + 4.8, 0.40, CZ + 5.5], [CX + 4.0, 1.10, CZ + 5.5],
  [CX + 3.2, 1.80, CZ + 5.5], [CX + 4.5, 2.50, CZ + 5.5],
  [CX + 3.5, 3.20, CZ + 5.5],
  // ── Bookcase west wall (4) ──
  [CX - 6.5, 0.40, CZ + 1.5], [CX - 6.5, 1.10, CZ + 0.5],
  [CX - 6.5, 1.80, CZ + 1.5], [CX - 6.5, 2.50, CZ + 0.5],
  // ── Desk (3) ──
  [CX + 3, 0.85, CZ - 3], [CX + 3.5, 0.85, CZ - 2.5], [CX + 2.5, 0.06, CZ - 3.5],
  // ── Reading chairs (2) ──
  [CX + 3, 0.50, CZ], [CX + 4.2, 0.50, CZ - 1.8],
  // ── Coffee table (2) ──
  [CX + 4.5, 0.42, CZ + 1.5], [CX + 4.5, 0.15, CZ + 1.5],
  // ── Fireplace mantel + inside (3) ──
  [CX + 6.3, 1.12, CZ], [CX + 6.3, 0.06, CZ + 0.3], [CX + 6.3, 0.06, CZ - 0.3],
  // ── Globe beside (1) ──
  [CX - 2, 0.95, CZ - 3.5],
  // ── Rug area floor (4) ──
  [CX - 1, 0.06, CZ], [CX + 1, 0.06, CZ + 1], [CX, 0.06, CZ - 1], [CX + 2, 0.06, CZ + 2],
  // ── Plants beside (2) ──
  [CX - 6.5, 0.45, CZ - 5.2], [CX + 6.5, 0.45, CZ + 5.2],
  // ── Lamps area (2) ──
  [CX - 5.5, 0.06, CZ - 5.0], [CX + 5.5, 0.06, CZ + 5.0],
  // ── Open floor scattered (8) ──
  [CX - 3, 0.06, CZ - 4], [CX + 1, 0.06, CZ - 4], [CX - 4, 0.06, CZ + 3],
  [CX + 5, 0.06, CZ + 3], [CX, 0.06, CZ + 4], [CX - 5, 0.06, CZ - 1],
  [CX + 2, 0.06, CZ - 5], [CX - 2, 0.06, CZ + 5],
  // ── Corners (4) ──
  [CX - 6.8, 0.06, CZ - 5.8], [CX + 6.8, 0.06, CZ - 5.8],
  [CX - 6.8, 0.06, CZ + 5.8], [CX + 6.8, 0.06, CZ + 5.8],
];

export const SPAWN_POOL_ROOM_3: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r3-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-3',
}));
