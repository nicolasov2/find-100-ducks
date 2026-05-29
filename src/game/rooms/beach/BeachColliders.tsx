'use client';

import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { BEACH_BOX, BEACH_WALL_PAD } from './layout';

const WALL_H = 3;
const WALL_T = 0.3;
const FLOOR_HALF_Y = 0.25;

/**
 * Invisible gameplay bounds — the GLB props are visual-only, so the player walks
 * on a flat floor cuboid at sand height (top at y=0) and is contained by four
 * perimeter walls. This is the reliable alternative to trusting model geometry.
 */
export function BeachColliders(): React.JSX.Element {
  const { xMin, xMax, zMin, zMax } = BEACH_BOX;
  const cx = (xMin + xMax) / 2;
  const cz = (zMin + zMax) / 2;
  const hx = (xMax - xMin) / 2 + BEACH_WALL_PAD;
  const hz = (zMax - zMin) / 2 + BEACH_WALL_PAD;

  return (
    <RigidBody type="fixed" colliders={false}>
      {/* Floor: top face at y=0 so the player's ground ray (≤0.95) always hits. */}
      <CuboidCollider args={[hx, FLOOR_HALF_Y, hz]} position={[cx, -FLOOR_HALF_Y, cz]} />
      {/* Perimeter walls (north/south, then east/west). */}
      <CuboidCollider args={[hx, WALL_H, WALL_T]} position={[cx, WALL_H, zMin - BEACH_WALL_PAD]} />
      <CuboidCollider args={[hx, WALL_H, WALL_T]} position={[cx, WALL_H, zMax + BEACH_WALL_PAD]} />
      <CuboidCollider args={[WALL_T, WALL_H, hz]} position={[xMin - BEACH_WALL_PAD, WALL_H, cz]} />
      <CuboidCollider args={[WALL_T, WALL_H, hz]} position={[xMax + BEACH_WALL_PAD, WALL_H, cz]} />
    </RigidBody>
  );
}
