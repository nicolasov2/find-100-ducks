'use client';

import { BeachColliders } from '@/game/rooms/beach/BeachColliders';
import { BeachGround } from '@/game/rooms/beach/BeachGround';
import { BeachProps } from '@/game/rooms/beach/BeachProps';

/** Chapter 2 world: invisible gameplay bounds + visual sand/sea + .glb props (inside <Physics>). */
export function Level2Beach(): React.JSX.Element {
  return (
    <>
      <BeachColliders />
      <BeachGround />
      <BeachProps />
    </>
  );
}
