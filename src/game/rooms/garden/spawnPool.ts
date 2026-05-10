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
  // ── Open clear floor — away from all vegetation (6) ──
  [CX + 3, 0.08, CZ - 4], [CX - 3, 0.08, CZ - 4],
  [CX + 5, 0.08, CZ - 2], [CX - 5, 0.08, CZ - 2],
  [CX + 3, 0.08, CZ + 2], [CX - 3, 0.08, CZ + 2],
  // ── East wing expansion (x: 12–16) — 7 points ──
  [CX + 12, 0.08, CZ - 4], [CX + 14, 0.08, CZ + 1],
  [CX + 13, 0.08, CZ + 7], [CX + 15, 0.08, CZ - 2],
  [CX + 14, 2.2, CZ + 3],  // in east tree foliage
  [CX + 13, 2.0, CZ + 10], // in east tree foliage
  [CX + 12, 0.08, CZ + 5],
  // ── West wing expansion (x: -12 to -16) — 7 points ──
  [CX - 12, 0.08, CZ - 3], [CX - 14, 0.08, CZ + 2],
  [CX - 13, 0.08, CZ + 8], [CX - 15, 0.08, CZ - 1],
  [CX - 14, 2.2, CZ + 4],  // in west tree foliage
  [CX - 13, 2.0, CZ + 10], // in west tree foliage
  [CX - 12, 0.08, CZ + 6],
  // ── South extension (z: CZ+10 to CZ+15) — 10 points ──
  [CX - 8, 0.08, CZ + 12], // near stone well
  [CX + 9, 0.08, CZ + 14], // near tool shed side
  [CX + 11, 0.08, CZ + 13],// behind tool shed
  [CX - 4, 0.08, CZ + 11], // in hedge gap
  [CX + 1, 0.08, CZ + 11], // in hedge gap
  [CX, 0.08, CZ + 14],     // behind big bush
  [CX - 5, 0.08, CZ + 13], // near south bench
  [CX - 12, 0.08, CZ + 10],[CX + 12, 0.08, CZ + 10],
  [CX - 4, 2.2, CZ + 15],  // in south tree foliage
];

// Intentional low-y hiding spots inside collider bounds that bypass AABB filter.
// NOTE: bush-inside spots (formerly 0-9) are REMOVED — gnomos should not spawn
// physically inside bush meshes. They are now AABB-filtered out.
const INSIDE_FURNITURE = new Set([22, 23, 24, 25, 30, 32, 33, 34, 35]);
const BYPASS = new Set([
  ...POSITIONS.flatMap((p, i) => (p[1] > 0.15 ? [i] : [])),
  ...INSIDE_FURNITURE,
]);

export const SPAWN_POOL_GARDEN: readonly SpawnPoint[] = POSITIONS.map((p, i) => ({
  id: `r4-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'garden',
  ...(BYPASS.has(i) ? { bypassAabb: true as const } : {}),
}));
