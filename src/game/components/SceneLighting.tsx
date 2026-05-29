'use client';

import type { LevelId } from '@/game/types';

export interface SceneLightingProps {
  readonly level: LevelId;
}

/** Per-chapter lighting. Mansion keeps the original interior values; village is a sunny day. */
export function SceneLighting({ level }: SceneLightingProps): React.JSX.Element {
  if (level === 'village') {
    return (
      <>
        <color attach="background" args={['#bfe3ff']} />
        <fog attach="fog" args={['#d4ecff', 45, 150]} />
        <ambientLight intensity={0.6} color="#fff3df" />
        <hemisphereLight args={['#cfe8ff', '#5a6b3a', 0.6]} />
        <directionalLight
          position={[22, 28, 14]}
          intensity={1.15}
          color="#fff0d0"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-45}
          shadow-camera-right={45}
          shadow-camera-top={45}
          shadow-camera-bottom={-45}
          shadow-camera-far={140}
        />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#bfdfff', '#3a2a1a', 0.35]} />
      <directionalLight
        position={[15, 18, 10]}
        intensity={0.9}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-far={100}
      />
    </>
  );
}
