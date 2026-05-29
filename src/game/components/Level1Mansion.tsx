'use client';

import { Room1 } from '@/game/rooms/room1';
import { Hallway1 } from '@/game/rooms/hallway1';
import { Room2 } from '@/game/rooms/room2';
import { Hallway2 } from '@/game/rooms/hallway2';
import { Room3 } from '@/game/rooms/room3';
import { Hallway3 } from '@/game/rooms/hallway3';
import { Garden } from '@/game/rooms/garden';

/** Chapter 1 world: the mansion rooms, hallways and garden (inside <Physics>). */
export function Level1Mansion(): React.JSX.Element {
  return (
    <>
      <Room1 />
      <Hallway1 />
      <Room2 />
      <Hallway2 />
      <Room3 />
      <Hallway3 />
      <Garden />
    </>
  );
}
