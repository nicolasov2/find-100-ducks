'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Player } from '@/game/components/Player';
import { Level2Village } from '@/game/components/Level2Village';
import { SceneLighting } from '@/game/components/SceneLighting';
import { SpawnEditor } from '@/game/components/SpawnEditor';
import { EditorHud } from '@/game/components/EditorHud';
import { VILLAGE_SPAWN } from '@/game/rooms/village/layout';

/** Standalone spawn-point editor: walk the village and mark where gnomes may appear. */
export function EditorCanvas(): React.JSX.Element {
  return (
    <div className="relative h-full w-full">
      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.7, 0] }}>
        <SceneLighting level="village" />
        <Suspense fallback={null}>
          <Physics gravity={[0, -25, 0]}>
            <Level2Village />
            <Player spawn={VILLAGE_SPAWN} />
          </Physics>
          <SpawnEditor />
        </Suspense>
        <PointerLockControls />
      </Canvas>
      <EditorHud />
    </div>
  );
}
