'use client';

import type { LevelId } from '@/game/types';

export interface SceneLightingProps {
  readonly level: LevelId;
}

/** Per-chapter lighting. Mansion keeps the original interior values; beach is a warm sunset. */
export function SceneLighting({ level }: SceneLightingProps): React.JSX.Element {
  if (level === 'beach') {
    return (
      <>
        <color attach="background" args={['#f7b977']} />
        <fog attach="fog" args={['#f4a25c', 22, 100]} />
        <ambientLight intensity={0.5} color="#ffd8b0" />
        <hemisphereLight args={['#ffb27a', '#5b4a36', 0.5]} />
        <directionalLight
          position={[-28, 10, -22]}
          intensity={1.4}
          color="#ff8a4c"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-camera-far={120}
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
