import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

/* Room 2 center: x=28, z=0. Size: 16×14. Bounds: x=[20,36], z=[-7,7] */
const CX = 28;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Counter top (6) ──
  [CX - 3.5, 0.98, -6.4], [CX - 2.0, 0.98, -6.4], [CX - 0.5, 0.98, -6.4],
  [CX + 0.8, 0.98, -6.4], [CX + 0.9, 0.98, -5.2], [CX + 0.9, 0.98, -4.5],
  // ── Behind/beside fridge (3) ──
  [CX + 7.5, 0.06, -6.0], [CX + 7.5, 1.20, -6.4], [CX + 6.5, 0.06, -6.8],
  // ── On oven stovetop (2) ──
  [CX + 2.5, 0.98, -6.4], [CX + 2.3, 0.98, -6.2],
  // ── Under/on round table (4) ──
  [CX, 0.85, 2.0], [CX + 0.5, 0.06, 2.3], [CX - 0.5, 0.06, 1.7], [CX, 0.06, 2.8],
  // ── On stools (3) ──
  [CX - 2.0, 0.72, -5.0], [CX - 0.5, 0.72, -5.0], [CX + 1.0, 0.72, -5.0],
  // ── In sink area (2) ──
  [CX - 2.0, 0.85, -6.3], [CX - 1.5, 0.85, -6.5],
  // ── On microwave (1) ──
  [CX - 3, 1.20, -6.4],
  // ── On upper cabinets (3) ──
  [CX - 2.5, 2.70, -6.7], [CX - 1.0, 2.70, -6.7], [CX + 0.5, 2.70, -6.7],
  // ── Beside trash can (2) ──
  [CX + 7.3, 0.06, 6.2], [CX + 7.5, 0.55, 6.0],
  // ── Open floor (12) ──
  [CX - 5, 0.06, 0], [CX + 5, 0.06, 0], [CX, 0.06, -3],
  [CX - 3, 0.06, 3], [CX + 3, 0.06, 4], [CX - 6, 0.06, 5],
  [CX + 6, 0.06, 3], [CX - 4, 0.06, -3], [CX + 4, 0.06, -2],
  [CX, 0.06, 5], [CX - 2, 0.06, 6], [CX + 2, 0.06, 6],
  // ── Corners & hidden (6) ──
  [CX - 7.8, 0.06, -6.8], [CX + 7.8, 0.06, 6.8], [CX - 7.8, 0.06, 6.8],
  [CX + 7.8, 0.06, -6.8], [CX - 7, 0.06, 0], [CX + 7, 0.06, 0],
  // ── Plants beside (2) ──
  [CX + 7.0, 0.45, 6.5], [CX - 7.0, 0.45, 6.5],
];

export const SPAWN_POOL_ROOM_2: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-2',
}));
