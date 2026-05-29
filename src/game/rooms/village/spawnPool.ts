import { Vector3, type Box3, type Vector3Tuple } from 'three';
import type { SpawnPoint } from '@/game/types';
import { VILLAGE_AABBS } from './roomAabbs';
import { VILLAGE_BOX, VILLAGE_FLOOR_Y, VILLAGE_SPAWN } from './layout';

// Gnomes are placed as HIDING SPOTS, not on an open grid: a ring of positions
// hugging each structure (against its walls and corners, INCLUDING the back side
// you can't see from the street) plus a few in open ground. The player has to
// round houses and check behind props/castle/windmill to find them — hidden, but
// always reachable by line of sight from nearby. None can land inside a building
// (every candidate is filtered against the obstacle AABBs).

const FLOOR_Y = VILLAGE_FLOOR_Y + 0.04;
const PADDING = 0.4;     // keep candidates clear of obstacle interiors (> 0.35 live filter)
const RING_GAP = 0.8;    // how far off a wall a tucked-away gnome sits
const RING_STEP = 2.1;   // spacing of points along a structure's perimeter
const MIN_SEP = 1.8;     // min distance between any two gnomes (spread out, not bunched)
const OPEN_STEP = 3.3;   // sparse fallback grid for open ground
const SPAWN_CLEAR_R = 3.5;

const X_MIN = VILLAGE_BOX.xMin + 0.8, X_MAX = VILLAGE_BOX.xMax - 0.8;
const Z_MIN = VILLAGE_BOX.zMin + 0.8, Z_MAX = VILLAGE_BOX.zMax - 0.8;

const _pt = new Vector3();

function valid(x: number, z: number): boolean {
  if (x < X_MIN || x > X_MAX || z < Z_MIN || z > Z_MAX) return false;
  const dx = x - VILLAGE_SPAWN[0], dz = z - VILLAGE_SPAWN[2];
  if (dx * dx + dz * dz < SPAWN_CLEAR_R * SPAWN_CLEAR_R) return false;
  _pt.set(x, FLOOR_Y, z);
  return !VILLAGE_AABBS.some((b) => b.clone().expandByScalar(PADDING).containsPoint(_pt));
}

/** Points hugging the perimeter of one structure (all four sides + corners). */
function ringCandidates(box: Box3): Vector3Tuple[] {
  const out: Vector3Tuple[] = [];
  const x0 = box.min.x - RING_GAP, x1 = box.max.x + RING_GAP;
  const z0 = box.min.z - RING_GAP, z1 = box.max.z + RING_GAP;
  const w = x1 - x0, d = z1 - z0;
  const nx = Math.max(1, Math.round(w / RING_STEP));
  const nz = Math.max(1, Math.round(d / RING_STEP));
  for (let i = 0; i <= nx; i++) {
    const x = Math.round((x0 + (w * i) / nx) * 100) / 100;
    out.push([x, FLOOR_Y, z0], [x, FLOOR_Y, z1]);
  }
  for (let i = 1; i < nz; i++) {
    const z = Math.round((z0 + (d * i) / nz) * 100) / 100;
    out.push([x0, FLOOR_Y, z], [x1, FLOOR_Y, z]);
  }
  return out;
}

function build(): Vector3Tuple[] {
  const accepted: Vector3Tuple[] = [];
  const tryAdd = (x: number, z: number): void => {
    if (!valid(x, z)) return;
    for (const p of accepted) {
      const dx = p[0] - x, dz = p[2] - z;
      if (dx * dx + dz * dz < MIN_SEP * MIN_SEP) return;
    }
    accepted.push([x, FLOOR_Y, z]);
  };
  // 1) Hiding spots tucked against every structure (the bulk of the gnomes).
  for (const box of VILLAGE_AABBS) {
    for (const c of ringCandidates(box)) tryAdd(c[0], c[2]);
  }
  // 2) A few out in the open so the streets/plaza aren't empty.
  for (let gx = X_MIN; gx <= X_MAX + 1e-6; gx += OPEN_STEP) {
    for (let gz = Z_MIN; gz <= Z_MAX + 1e-6; gz += OPEN_STEP) {
      tryAdd(Math.round(gx * 100) / 100, Math.round(gz * 100) / 100);
    }
  }
  return accepted;
}

export const SPAWN_POOL_VILLAGE: readonly SpawnPoint[] = build().map((p, i) => ({
  id: `v1-${String(i + 1).padStart(3, '0')}`,
  position: p,
  roomId: 'village',
}));
