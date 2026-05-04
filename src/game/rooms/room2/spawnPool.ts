import type { Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';

const CX = 28;
const CZ = 0;

const POSITIONS: readonly Vector3Tuple[] = [
  // ── Counter top — among items (6) ──
  [CX - 3.5, 0.98, -6.4], [CX - 2.0, 0.98, -6.4], [CX - 0.5, 0.98, -6.4],
  [CX + 0.8, 0.98, -6.4], [CX + 0.9, 0.98, -5.2], [CX + 1.5, 1.30, -6.4],
  // ── Behind counter (under overhang) (3) ──
  [CX - 2, 0.06, -6.8], [CX + 0.5, 0.06, -6.8], [CX - 3.5, 0.06, -6.8],
  // ── Behind/beside fridge (4) ──
  [CX + 7.5, 0.06, -6.0], [CX + 7.5, 1.50, -6.4], [CX + 6.5, 0.06, -6.8],
  [CX + 7.8, 0.06, -6.8],
  // ── On top of fridge (1) ──
  [CX + 7.2, 2.10, -6.4],
  // ── Oven stovetop / behind oven (3) ──
  [CX + 2.5, 0.98, -6.4], [CX + 2.5, 0.06, -6.9], [CX + 2.8, 0.06, -6.0],
  // ── Under/on round table (4) ──
  [CX, 0.85, 2.0], [CX + 0.5, 0.06, 2.3], [CX - 0.5, 0.06, 1.7], [CX, 0.06, 2.8],
  // ── On dining chairs (4) ──
  [CX + 1.2, 0.58, 2.0], [CX - 1.2, 0.58, 2.0], [CX, 0.58, 3.2], [CX, 0.58, 0.8],
  // ── On stools (3) ──
  [CX - 2.0, 0.72, -5.0], [CX - 0.5, 0.72, -5.0], [CX + 1.0, 0.72, -5.0],
  // ── Sink area (2) ──
  [CX - 2.0, 0.85, -6.3], [CX - 1.5, 0.85, -6.5],
  // ── On/behind microwave (2) ──
  [CX - 3, 1.20, -6.4], [CX - 3.3, 0.98, -6.8],
  // ── On upper cabinets (top surface) (4) ──
  [CX - 2.5, 2.70, -6.7], [CX - 1.0, 2.70, -6.7], [CX + 0.5, 2.70, -6.7],
  [CX + 3, 2.70, -6.7],
  // ── Wine rack — between bottles, on top (3) ──
  [CX + 7.5, 0.30, -2.0], [CX + 7.5, 0.70, -2.0], [CX + 7.5, 1.05, -2.0],
  // ── Shelf east wall (3) ──
  [CX + 7.3, 0.55, 3], [CX + 7.3, 1.55, 3], [CX + 7.3, 2.55, 3],
  // ── Fruit bowl — hidden among fruits (1) ──
  [CX + 0.5, 1.10, -6.4],
  // ── Trash can beside (2) ──
  [CX + 7.3, 0.06, 6.2], [CX + 7.5, 0.55, 6.0],
  // ── Second trash can (1) ──
  [CX - 7.5, 0.06, -2.3],
  // ── Behind boxes (3) ──
  [CX - 7.0, 0.06, -2.3], [CX - 7.2, 0.06, 4.3], [CX + 5.3, 0.06, 5.8],
  // ── Inside boxes (2) ──
  [CX - 7.0, 0.30, 4.0], [CX + 5.0, 0.30, 5.5],
  // ── Plants — among foliage (3) ──
  [CX + 7.0, 0.55, 6.5], [CX - 7.0, 0.55, 6.5], [CX - 7.0, 0.55, -6.2],
  // ── Book stack on counter (1) ──
  [CX + 1.5, 1.30, -6.4],
  // ── Floor cushion (1) ──
  [CX - 5, 0.22, 4],
  // ── Wall corners hidden (6) ──
  [CX - 7.8, 0.06, -6.8], [CX + 7.8, 0.06, 6.8], [CX - 7.8, 0.06, 6.8],
  [CX + 7.8, 0.06, -6.8], [CX - 7.8, 0.06, 0], [CX + 7.8, 0.06, 0],
  // ── Open floor (6) ──
  [CX - 3, 0.06, 0], [CX + 3, 0.06, 0], [CX, 0.06, -3],
  [CX - 5, 0.06, 5], [CX + 5, 0.06, 4], [CX, 0.06, 5],
];

export const SPAWN_POOL_ROOM_2: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r2-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'room-2',
}));
