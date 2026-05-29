'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Player } from '@/game/components/Player';
import { LockOverlay } from '@/game/components/LockOverlay';
import { Gnomes } from '@/game/components/Gnomes';
import { DyingGnomes } from '@/game/components/DyingGnomes';
import { FeatherBursts } from '@/game/components/FeatherBursts';
import { LaserBeams } from '@/game/components/LaserBeams';
import { ExpPopups } from '@/game/components/ExpPopups';
import { HintBeacons } from '@/game/components/HintBeacons';
import { Shooter } from '@/game/components/Shooter';
import { LaserGun } from '@/game/components/LaserGun';
import { WeaponHotkey } from '@/game/components/WeaponHotkey';
import { HintHotkey } from '@/game/components/HintHotkey';
import { ScopeOverlay } from '@/game/components/ScopeOverlay';
import { HUD } from '@/game/components/HUD';
import { WinScreen } from '@/game/components/WinScreen';
import { PauseMenu } from '@/game/components/PauseMenu';
import { LoveNote } from '@/game/components/LoveNote';
import { DustMotes } from '@/game/components/DustMotes';
import { Level1Mansion } from '@/game/components/Level1Mansion';
import { Level2Beach } from '@/game/components/Level2Beach';
import { SceneLighting } from '@/game/components/SceneLighting';
import { BEACH_SPAWN } from '@/game/rooms/beach/layout';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { initAudio, startMusic, setMasterVolume, setSfxVolume, setMusicVolume } from '@/game/systems/AudioManager';

function CameraFOVSync(): null {
  const camera = useThree((s) => s.camera);
  const fov = useSettingsStore((s) => s.fov);
  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, fov]);
  return null;
}

const MANSION_SPAWN: readonly [number, number, number] = [-6, 1.7, 0];

export function GameCanvas(): React.JSX.Element {
  const status = useGameStore((s) => s.status);
  const level = useGameStore((s) => s.level);
  const sensitivity = useSettingsStore((s) => s.sensitivity);

  useEffect(() => {
    if (status === 'playing') {
      initAudio();
      // Push saved volume prefs to AudioManager gain nodes on first play
      const { masterVolume, sfxVolume, musicVolume } = useSettingsStore.getState();
      setMasterVolume(masterVolume);
      setSfxVolume(sfxVolume);
      setMusicVolume(musicVolume);
      startMusic();
    }
  }, [status]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.7, 0] }}
      >
        <SceneLighting level={level} />
        <CameraFOVSync />
        <Suspense fallback={null}>
          <Physics gravity={[0, -25, 0]}>
            {level === 'mansion' ? <Level1Mansion /> : <Level2Beach />}
            <Player key={level} spawn={level === 'beach' ? BEACH_SPAWN : MANSION_SPAWN} />
          </Physics>
          {level === 'mansion' && <DustMotes />}
          <Gnomes />
          <DyingGnomes />
          <FeatherBursts />
          <LaserBeams />
          <ExpPopups />
          <HintBeacons />
          <Shooter />
          <LaserGun />
        </Suspense>
        <PointerLockControls pointerSpeed={sensitivity} />
      </Canvas>
      <HUD />
      <LoveNote />
      <LockOverlay />
      <PauseMenu />
      <ScopeOverlay />
      <WeaponHotkey />
      <HintHotkey />
      <WinScreen />
    </div>
  );
}
