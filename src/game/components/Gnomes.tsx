'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { useGameStore } from '@/store/gameStore';
import { SPAWN_POOL_ALL } from '@/game/utils/spawnPoolAll';
import { GnomeModel } from '@/game/components/GnomeModel';

const BOB_AMPLITUDE = 0.025;
const BOB_FREQ = 1.5;
const GLOW_DISTANCE = 5; // gnomes start glowing within 5m
const GLOW_FADE_START = 3; // full glow within 3m

const _gnomePos = new Vector3();

export function Gnomes(): React.JSX.Element {
  const gnomes = useGameStore((s) => s.gnomes);
  const spawnGnomes = useGameStore((s) => s.spawnGnomes);
  const containerRef = useRef<Group | null>(null);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    if (gnomes.length === 0) {
      // In Gnomes.tsx, we just use the gnomeTarget from the store if it's already set
      // The actual spawn happens in StartButton, but this is a fallback for direct /play loads
      import('@/store/settingsStore').then((m) => {
        const config = m.getDifficultyConfig(m.useSettingsStore.getState().difficulty);
        spawnGnomes(SPAWN_POOL_ALL, config.gnomeCount);
      });
    }
  }, [gnomes.length, spawnGnomes]);

  useFrame((state) => {
    const container = containerRef.current;
    if (!container) return;
    const t = state.clock.elapsedTime;
    const children = container.children;
    const camPos = camera.position;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const gnome = gnomes[i];
      if (!child || !gnome) continue;

      // Bob animation
      const phase = gnome.rotation[1];
      child.position.y =
        gnome.position[1] + Math.sin(t * BOB_FREQ + phase) * BOB_AMPLITUDE;

      // Proximity glow — update emissive on body mesh
      _gnomePos.set(gnome.position[0], gnome.position[1], gnome.position[2]);
      const dist = camPos.distanceTo(_gnomePos);

      if (dist < GLOW_DISTANCE) {
        const glowIntensity =
          dist < GLOW_FADE_START
            ? 1
            : 1 - (dist - GLOW_FADE_START) / (GLOW_DISTANCE - GLOW_FADE_START);
        // Pulsing glow
        const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 4 + phase));
        const finalGlow = glowIntensity * pulse;

        // Walk the children of the gnome group to find body mesh
        child.traverse((obj) => {
          if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
            obj.material.emissiveIntensity = finalGlow * 0.6;
            obj.material.emissive.setHex(0xfef3c7);
          }
        });
      } else {
        // Reset emissive when far
        child.traverse((obj) => {
          if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
            obj.material.emissiveIntensity = 0;
          }
        });
      }
    }
  });

  return (
    <group ref={containerRef}>
      {gnomes.map((d) => (
        <group
          key={d.id}
          position={d.position}
          rotation={d.rotation}
          userData={{ gnomeId: d.id }}
        >
          <GnomeModel
            useFallback
            bodyColor={d.bodyColor}
            hatColor={d.hatColor}
            beardStyle={d.beardStyle}
            gnomeScale={d.scale}
          />
        </group>
      ))}
    </group>
  );
}
