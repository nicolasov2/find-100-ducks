'use client';

import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { VILLAGE_BOX, VILLAGE_BOUNDS, type VillageItemKind } from './layout';
import { VILLAGE_ITEMS } from './items';

// Buildings the player must not walk through. Small props (barrels/buckets) stay
// non-solid so the player can brush past them.
const SOLID: ReadonlySet<VillageItemKind> = new Set<VillageItemKind>([
  'townhouse1', 'townhouse2', 'house1', 'house2', 'house3', 'fantasyhouse',
  'bigbuilding', 'castle', 'windmill', 'well', 'market',
  'tree', 'pine', 'hedge', 'cart', 'fence',
]);

const WALL_H = 4;
const WALL_T = 0.3;
const FLOOR_HALF_Y = 0.25;
const PAD = 0.6;

/**
 * Gameplay collision: an invisible flat floor at ground height, four perimeter
 * walls bounding the village, and one box per building (from its footprint), so
 * the player walks the streets/plaza but can't pass through houses.
 */
export function VillageColliders(): React.JSX.Element {
  const { xMin, xMax, zMin, zMax } = VILLAGE_BOX;
  const cx = (xMin + xMax) / 2;
  const cz = (zMin + zMax) / 2;
  const hx = (xMax - xMin) / 2 + PAD;
  const hz = (zMax - zMin) / 2 + PAD;

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[hx, FLOOR_HALF_Y, hz]} position={[cx, -FLOOR_HALF_Y, cz]} />
      <CuboidCollider args={[hx, WALL_H, WALL_T]} position={[cx, WALL_H, zMin - PAD]} />
      <CuboidCollider args={[hx, WALL_H, WALL_T]} position={[cx, WALL_H, zMax + PAD]} />
      <CuboidCollider args={[WALL_T, WALL_H, hz]} position={[xMin - PAD, WALL_H, cz]} />
      <CuboidCollider args={[WALL_T, WALL_H, hz]} position={[xMax + PAD, WALL_H, cz]} />
      {VILLAGE_ITEMS.filter((it) => SOLID.has(it.kind)).map((it, i) => {
        const b = VILLAGE_BOUNDS[it.kind];
        const hX = (b.max[0] - b.min[0]) / 2;
        const hY = (b.max[1] - b.min[1]) / 2;
        const hZ = (b.max[2] - b.min[2]) / 2;
        return (
          <CuboidCollider
            key={i}
            args={[hX, hY, hZ]}
            position={[it.position[0], it.position[1] + hY, it.position[2]]}
          />
        );
      })}
    </RigidBody>
  );
}
