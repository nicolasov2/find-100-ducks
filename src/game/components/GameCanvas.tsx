'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Player } from '@/game/components/Player';
import { TestRoom } from '@/game/components/TestRoom';
import { LockOverlay } from '@/game/components/LockOverlay';

export function GameCanvas(): React.JSX.Element {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.7, 0] }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <TestRoom />
            <Player />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
      <LockOverlay />
    </div>
  );
}
