'use client';

import { VillageColliders } from '@/game/rooms/village/VillageColliders';
import { VillageGround } from '@/game/rooms/village/VillageGround';
import { VillageProps } from '@/game/rooms/village/VillageProps';

/** Chapter 2 world: invisible bounds + solid buildings, grass/paths, and .glb village props. */
export function Level2Village(): React.JSX.Element {
  return (
    <>
      <VillageColliders />
      <VillageGround />
      <VillageProps />
    </>
  );
}
