import { Vector3, type Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';
import { GARDEN_AABBS } from './roomAabbs';

// Gnomes hide ON the open lawn, never inside vegetation. Floor points are
// generated on a jittered grid and any cell overlapping a furniture AABB is
// dropped — so adding/moving an item automatically clears its footprint.

const FLOOR_Y = 0.04;
const PADDING = 0.45;        // > filter padding (0.35) so every point survives the SAFE filter
const STEP = 2.2;
const X_MIN = -15.5, X_MAX = 15.5;
const Z_MIN = 13.5, Z_MAX = 37;

// Keep the north entry corridor clear so the player can walk in from Hallway3.
const ENTRY_HALF_W = 1.6;
const ENTRY_Z_MAX = 19;

// Deterministic pseudo-random offset in [-amp, amp] — organic look, stable build.
function jitter(a: number, b: number, amp: number): number {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return ((h - Math.floor(h)) - 0.5) * 2 * amp;
}

function isOpen(x: number, z: number): boolean {
  if (Math.abs(x) < ENTRY_HALF_W && z < ENTRY_Z_MAX) return false;
  const pt = new Vector3(x, FLOOR_Y, z);
  return !GARDEN_AABBS.some((box) => box.clone().expandByScalar(PADDING).containsPoint(pt));
}

function buildPositions(): Vector3Tuple[] {
  const out: Vector3Tuple[] = [];
  for (let gx = X_MIN; gx <= X_MAX + 1e-6; gx += STEP) {
    for (let gz = Z_MIN; gz <= Z_MAX + 1e-6; gz += STEP) {
      const x = Math.round((gx + jitter(gx, gz, 0.55)) * 100) / 100;
      const z = Math.round((gz + jitter(gz, gx, 0.55)) * 100) / 100;
      if (isOpen(x, z)) out.push([x, FLOOR_Y, z]);
    }
  }
  return out;
}

export const SPAWN_POOL_GARDEN: readonly SpawnPoint[] = buildPositions().map((p, i) => ({
  id: `r4-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'garden',
}));
