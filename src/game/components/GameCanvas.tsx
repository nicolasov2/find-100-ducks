'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Player } from '@/game/components/Player';
import { LockOverlay } from '@/game/components/LockOverlay';
import { Gnomes } from '@/game/components/Gnomes';
import { DyingGnomes } from '@/game/components/DyingGnomes';
import { FeatherBursts } from '@/game/components/FeatherBursts';
import { LaserBeams } from '@/game/components/LaserBeams';
import { ExpPopups } from '@/game/components/ExpPopups';
import { Shooter } from '@/game/components/Shooter';
import { LaserGun } from '@/game/components/LaserGun';
import { WeaponHotkey } from '@/game/components/WeaponHotkey';
import { ScopeOverlay } from '@/game/components/ScopeOverlay';
import { HUD } from '@/game/components/HUD';
import { WinScreen } from '@/game/components/WinScreen';
import { PauseMenu } from '@/game/components/PauseMenu';
import { DustMotes } from '@/game/components/DustMotes';
import { Room1 } from '@/game/rooms/room1';
import { Hallway1 } from '@/game/rooms/hallway1';
import { Room2 } from '@/game/rooms/room2';
import { Hallway2 } from '@/game/rooms/hallway2';
import { Room3 } from '@/game/rooms/room3';
import { useGameStore } from '@/store/gameStore';
import { initAudio, startMusic } from '@/game/systems/AudioManager';

export function GameCanvas(): React.JSX.Element {
  const status = useGameStore((s) => s.status);

  useEffect(() => {
    if (status === 'playing') {
      initAudio();
      startMusic();
    }
  }, [status]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.7, 0] }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[15, 15, 10]}
          intensity={0.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-camera-far={80}
        />
        <Suspense fallback={null}>
          <Physics gravity={[0, -25, 0]}>
            <Room1 />
            <Hallway1 />
            <Room2 />
            <Hallway2 />
            <Room3 />
            <Player />
          </Physics>
          <DustMotes />
          <Gnomes />
          <DyingGnomes />
          <FeatherBursts />
          <LaserBeams />
          <ExpPopups />
          <Shooter />
          <LaserGun />
        </Suspense>
        <PointerLockControls />
      </Canvas>
      <HUD />
      <LockOverlay />
      <PauseMenu />
      <ScopeOverlay />
      <WeaponHotkey />
      <WinScreen />
    </div>
  );
}
