import { Vector3, type Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';
import { VILLAGE_AABBS } from './roomAabbs';
import { VILLAGE_FLOOR_Y, VILLAGE_SPAWN, WALK_ZONES } from './layout';

// Gnomes hide where people walk — the main street and the plaza only. Points are
// generated on a jittered grid inside WALK_ZONES and any cell overlapping a
// building/prop AABB is dropped, so a gnome can never land inside a house.

const FLOOR_Y = VILLAGE_FLOOR_Y + 0.04;
const PADDING = 0.45; // > filter padding (0.35) so every grid point survives the SAFE filter
const STEP = 1.4;
const SPAWN_CLEAR_R = 2.6; // keep the player's landing spot clear

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
  for (const zone of WALK_ZONES) {
    for (let gx = zone.x0; gx <= zone.x1 + 1e-6; gx += STEP) {
      for (let gz = zone.z0; gz <= zone.z1 + 1e-6; gz += STEP) {
        const x = Math.round((gx + jitter(gx, gz, 0.4)) * 100) / 100;
        const z = Math.round((gz + jitter(gz, gx, 0.4)) * 100) / 100;
        if (isOpen(x, z)) out.push([x, FLOOR_Y, z]);
      }
    }
  }
  return out;
}

export const SPAWN_POOL_VILLAGE: readonly SpawnPoint[] = buildPositions().map((p, i) => ({
  id: `v1-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'village',
}));
