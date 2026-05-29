import type { BeachObstacle } from './layout';

/**
 * Every beach prop, in world space — ordered and mostly mirror-symmetric about
 * x=0. Render (BeachProps), collision AABBs (roomAabbs) and spawn exclusion
 * (spawnPool) all read this one array, so they can never drift apart.
 *
 * Sea is north (−z), player enters from the south (+z). Layout reads, front→back:
 *   • palms frame both side fences in even rows
 *   • a central rest area of paired umbrellas
 *   • a pier running out into the sea on the x=0 axis
 *   • a beached boat (left) balanced by a crate stack + lifeguard tower (right)
 *   • rocks clustered along the shoreline and back corners
 */
export const BEACH_OBSTACLES: readonly BeachObstacle[] = [
  // ── Palms framing the east/west fences (mirrored rows) ──
  { kind: 'palm', position: [-16.5, 0, -5], scale: 1.1 },
  { kind: 'palm', position: [16.5, 0, -5], scale: 1.1 },
  { kind: 'palm', position: [-16.5, 0, 0], scale: 1.0 },
  { kind: 'palm', position: [16.5, 0, 0], scale: 1.0 },
  { kind: 'palm', position: [-16.5, 0, 5], scale: 1.15 },
  { kind: 'palm', position: [16.5, 0, 5], scale: 1.15 },
  { kind: 'palm', position: [-16.5, 0, 10], scale: 0.95 },
  { kind: 'palm', position: [16.5, 0, 10], scale: 0.95 },
  { kind: 'palm', position: [-11, 0, -3], scale: 1.05 },
  { kind: 'palm', position: [11, 0, -3], scale: 1.05 },
  { kind: 'palm', position: [-11, 0, 7], scale: 0.9 },
  { kind: 'palm', position: [11, 0, 7], scale: 0.9 },

  // ── Central rest area: paired beach umbrellas ──
  { kind: 'umbrella', position: [-4, 0, 3], scale: 1.0 },
  { kind: 'umbrella', position: [4, 0, 3], scale: 1.0 },
  { kind: 'umbrella', position: [-8, 0, 6], scale: 1.1 },
  { kind: 'umbrella', position: [8, 0, 6], scale: 1.1 },

  // ── Pier running out into the sea (central axis) ──
  { kind: 'pier', position: [0, 0, -1] },
  { kind: 'pier', position: [0, 0, -3] },
  { kind: 'pier', position: [0, 0, -5] },

  // ── Beached boat (left) balanced by crates + lifeguard tower (right) ──
  { kind: 'boat', position: [-10, 0, -3], rotationY: 0.4 },
  { kind: 'crate', position: [10, 0, -3] },
  { kind: 'crate', position: [10.7, 0, -2.3], rotationY: 0.5 },
  { kind: 'crate', position: [-2.6, 0, 1] },
  { kind: 'crate', position: [2.6, 0, 1] },
  { kind: 'lifeguard', position: [14, 0, 9] },

  // ── Rocks: shoreline clusters + back corners (mirrored) ──
  { kind: 'rock', position: [-6, 0, -7], scale: 1.1 },
  { kind: 'rock', position: [6, 0, -7], scale: 1.1 },
  { kind: 'rock', position: [-13, 0, -6], scale: 0.9 },
  { kind: 'rock', position: [13, 0, -6], scale: 0.9 },
  { kind: 'rock', position: [-16, 0, 13], scale: 1.2 },
  { kind: 'rock', position: [16, 0, 13], scale: 1.2 },
  { kind: 'rock', position: [-14, 0, 9], scale: 1.0 },
  { kind: 'rock', position: [-14.6, 0, 8.2], scale: 0.8 },
];
