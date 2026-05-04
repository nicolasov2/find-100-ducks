import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Counter top — among items, all visible from south (6) ──
  [CX - 3.5, 1.00, -6.2], [CX - 2.0, 1.00, -6.2], [CX - 0.5, 1.00, -6.2],
  [CX + 0.8, 1.00, -6.2], [CX + 0.9, 1.00, -5.0], [CX + 1.5, 1.00, -5.5],
  // ── In front of counter (floor) (2) ──
  [CX - 2, 0.08, -5.5], [CX + 0.5, 0.08, -5.5],
  // ── Beside fridge — visible from side (3) ──
  [CX + 7.2, 0.08, -5.5], [CX + 6.5, 0.08, -5.5], [CX + 6.0, 0.08, -6.5],
  // ── On top of fridge (1) ──
  [CX + 7.2, 2.12, -6.2],
  // ── Oven stovetop + floor beside (3) ──
  [CX + 2.5, 1.00, -6.2], [CX + 2.8, 0.08, -5.5], [CX + 3.3, 0.08, -6.0],
  // ── Under/on round table (4) ──
  [CX, 0.87, 2.0], [CX + 0.5, 0.08, 2.5], [CX - 0.5, 0.08, 1.5], [CX, 0.08, 3.0],
  // ── On dining chairs (4) ──
  [CX + 1.2, 0.60, 2.0], [CX - 1.2, 0.60, 2.0], [CX, 0.60, 3.2], [CX, 0.60, 0.8],
  // ── On stools (3) ──
  [CX - 2.0, 0.74, -5.0], [CX - 0.5, 0.74, -5.0], [CX + 1.0, 0.74, -5.0],
  // ── Sink area — on counter surface (2) ──
  [CX - 2.0, 1.00, -6.0], [CX - 1.5, 1.00, -6.3],
  // ── On microwave + beside (2) ──
  [CX - 3, 1.22, -6.2], [CX - 3.5, 0.08, -5.5],
  // ── On upper cabinets (top surface, visible from below) (4) ──
  [CX - 2.5, 2.72, -6.5], [CX - 1.0, 2.72, -6.5], [CX + 0.5, 2.72, -6.5],
  [CX + 3, 2.72, -6.5],
  // ── Wine rack — between bottles, visible from front (3) ──
  [CX + 7.3, 0.32, -2.0], [CX + 7.3, 0.72, -2.0], [CX + 7.3, 1.07, -2.0],
  // ── Shelf east wall — visible (3) ──
  [CX + 7.0, 0.57, 3], [CX + 7.0, 1.57, 3], [CX + 7.0, 2.57, 3],
  // ── Fruit bowl — beside (1) ──
  [CX + 0.5, 1.12, -6.2],
  // ── Beside trash cans (2) ──
  [CX + 7.3, 0.08, 5.8], [CX - 7.3, 0.08, -1.8],
  // ── Beside boxes — floor (3) ──
  [CX - 6.5, 0.08, -1.8], [CX - 6.8, 0.08, 3.5], [CX + 5.3, 0.08, 5.2],
  // ── On boxes (2) ──
  [CX - 7.0, 0.45, 4.0], [CX + 5.0, 0.45, 5.5],
  // ── Plants — beside (3) ──
  [CX + 7.0, 0.08, 6.0], [CX - 7.0, 0.08, 6.0], [CX - 7.0, 0.08, -5.8],
  // ── Floor cushion (1) ──
  [CX - 5, 0.24, 4],
  // ── Wall corners — accessible floor (6) ──
  [CX - 7.5, 0.08, -6.5], [CX + 7.5, 0.08, 6.5], [CX - 7.5, 0.08, 6.5],
  [CX + 7.5, 0.08, -6.5], [CX - 7.5, 0.08, 0], [CX + 7.5, 0.08, 0],
  // ── Open floor (6) ──
  [CX - 3, 0.08, 0], [CX + 3, 0.08, 0], [CX, 0.08, -3],
  [CX - 5, 0.08, 5], [CX + 5, 0.08, 4], [CX, 0.08, 5],
];

export const SPAWN_POOL_ROOM_2: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-2',
}));
