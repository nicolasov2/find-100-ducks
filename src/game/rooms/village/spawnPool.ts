import { Vector3, type Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';
import { VILLAGE_AABBS } from './roomAabbs';
import { VILLAGE_BOX, VILLAGE_FLOOR_Y, VILLAGE_SPAWN } from './layout';

// Gnomes hide all across the village grounds (streets, plaza and the grass
// between/around houses) on a wide jittered grid. Any cell overlapping a
// building/prop AABB is dropped, so a gnome can never land inside a house. A
// roomy STEP keeps them spread out rather than clustered.

const FLOOR_Y = VILLAGE_FLOOR_Y + 0.04;
const PADDING = 0.45; // > filter padding (0.35) so every grid point survives the SAFE filter
const STEP = 2.2;     // generous spacing so gnomes don't bunch up
const INSET = 1;      // keep points off the perimeter walls
const SPAWN_CLEAR_R = 3; // keep the player's landing spot clear

const X_MIN = VILLAGE_BOX.xMin + INSET, X_MAX = VILLAGE_BOX.xMax - INSET;
const Z_MIN = VILLAGE_BOX.zMin + INSET, Z_MAX = VILLAGE_BOX.zMax - INSET;

function jitter(a: number, b: number, amp: number): number {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return ((h - Math.floor(h)) - 0.5) * 2 * amp;
}

function isOpen(x: number, z: number): boolean {
  const dx = x - VILLAGE_SPAWN[0];
  const dz = z - VILLAGE_SPAWN[2];
  if (dx * dx + dz * dz < SPAWN_CLEAR_R * SPAWN_CLEAR_R) return false;
  const pt = new Vector3(x, FLOOR_Y, z);
  return !VILLAGE_AABBS.some((box) => box.clone().expandByScalar(PADDING).containsPoint(pt));
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

export const SPAWN_POOL_VILLAGE: readonly SpawnPoint[] = buildPositions().map((p, i) => ({
  id: `v1-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'village',
}));
