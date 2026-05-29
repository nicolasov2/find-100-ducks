import { Vector3, type Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';
import { BEACH_AABBS } from './roomAabbs';
import { BEACH_FLOOR_Y, BEACH_SPAWN } from './layout';

// Gnomes hide on the open sand, never inside a prop. Floor points are generated
// on a jittered grid and any cell overlapping an obstacle AABB is dropped — so
// adding/moving a prop automatically clears its footprint. Same pattern as the
// garden, which is how the buried-gnome bug was eliminated.

const FLOOR_Y = BEACH_FLOOR_Y + 0.04;
const PADDING = 0.45; // > filter padding (0.35) so every grid point survives the SAFE filter
const STEP = 1.9;
const X_MIN = -17.5, X_MAX = 17.5;
const Z_MIN = -7.5, Z_MAX = 14.5;

// Clear landing zone around the player spawn so gnomes don't sit on top of them.
const SPAWN_CLEAR_R = 2.6;

// Deterministic pseudo-random offset in [-amp, amp] — organic look, stable build.
function jitter(a: number, b: number, amp: number): number {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return ((h - Math.floor(h)) - 0.5) * 2 * amp;
}

function isOpen(x: number, z: number): boolean {
  const dx = x - BEACH_SPAWN[0];
  const dz = z - BEACH_SPAWN[2];
  if (dx * dx + dz * dz < SPAWN_CLEAR_R * SPAWN_CLEAR_R) return false;
  const pt = new Vector3(x, FLOOR_Y, z);
  return !BEACH_AABBS.some((box) => box.clone().expandByScalar(PADDING).containsPoint(pt));
}

function buildPositions(): Vector3Tuple[] {
  const out: Vector3Tuple[] = [];
  for (let gx = X_MIN; gx <= X_MAX + 1e-6; gx += STEP) {
    for (let gz = Z_MIN; gz <= Z_MAX + 1e-6; gz += STEP) {
      const x = Math.round((gx + jitter(gx, gz, 0.5)) * 100) / 100;
      const z = Math.round((gz + jitter(gz, gx, 0.5)) * 100) / 100;
      if (isOpen(x, z)) out.push([x, FLOOR_Y, z]);
    }
  }
  return out;
}

export const SPAWN_POOL_BEACH: readonly SpawnPoint[] = buildPositions().map((p, i) => ({
  id: `b1-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'beach',
}));
