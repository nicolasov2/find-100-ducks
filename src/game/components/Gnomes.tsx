'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, MeshStandardMaterial, Vector3 } from 'three';
import {
  HINT_AUTO_GLOW_THRESHOLD,
  HINT_DURATION_MS,
  useGameStore,
} from '@/store/gameStore';
import { SAFE_SPAWN_POOL } from '@/game/utils/safeSpawnPool';
import { GnomeModel } from '@/game/components/GnomeModel';
import { useGnomeMeshCache } from '@/game/hooks/useGnomeMeshCache';

const BOB_AMPLITUDE = 0.025;
const BOB_FREQ = 1.5;
const GLOW_DISTANCE = 5;
const GLOW_FADE_START = 3;

const _gnomePos = new Vector3();

export function Gnomes(): React.JSX.Element {
  const gnomes = useGameStore((s) => s.gnomes);
  const spawnGnomes = useGameStore((s) => s.spawnGnomes);
  const hintActivatedAt = useGameStore((s) => s.hintActivatedAt);
  const containerRef = useRef<Group | null>(null);
  const camera = useThree((s) => s.camera);
  const { meshCacheRef, prevIntensityRef, prevEmissiveRef, prevDepthTestRef, rebuildIfDirty } =
    useGnomeMeshCache(gnomes);

  useEffect(() => {
    if (gnomes.length === 0) {
      import('@/store/settingsStore').then((m) => {
        const config = m.getDifficultyConfig(m.useSettingsStore.getState().difficulty);
        spawnGnomes(SAFE_SPAWN_POOL, config.gnomeCount);
      });
    }
  }, [gnomes.length, spawnGnomes]);

  useFrame((state) => {
    const container = containerRef.current;
    if (!container) return;

    rebuildIfDirty(container);

    const t = state.clock.elapsedTime;
    const camPos = camera.position;
    const now = Date.now();
    const hintActive = hintActivatedAt !== null && now - hintActivatedAt < HINT_DURATION_MS;
    const autoGlow = gnomes.length <= HINT_AUTO_GLOW_THRESHOLD;
    const showAll = hintActive || autoGlow;
    const meshCache = meshCacheRef.current;
    const prevIntensity = prevIntensityRef.current;
    const prevEmissive = prevEmissiveRef.current;
    const prevDepthTest = prevDepthTestRef.current;
    const children = container.children;
    const depthTestInt: 0 | 1 = hintActive ? 0 : 1;
    const renderOrder = hintActive ? 999 : 0;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const gnome = gnomes[i];
      if (!child || !gnome) continue;

      // Bob (always — cheap, unconditional)
      const phase = gnome.rotation[1];
      child.position.y = gnome.position[1] + Math.sin(t * BOB_FREQ + phase) * BOB_AMPLITUDE;

      // Compute target glow state
      _gnomePos.set(gnome.position[0], gnome.position[1], gnome.position[2]);
      const dist = camPos.distanceTo(_gnomePos);
      let intensity = 0;
      let emissiveHex = 0xfef3c7;

      if (showAll) {
        const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 5 + phase));
        intensity = pulse * 1.5;
        emissiveHex = hintActive ? 0x22d3ee : 0xfbbf24;
      } else if (dist < GLOW_DISTANCE) {
        const glowIntensity =
          dist < GLOW_FADE_START
            ? 1
            : 1 - (dist - GLOW_FADE_START) / (GLOW_DISTANCE - GLOW_FADE_START);
        const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 4 + phase));
        intensity = glowIntensity * pulse * 0.6;
      }

      // Early exit: skip material writes when nothing changed.
      // intensity=0 stays 0 for distant gnomes → no work after first reset frame.
      const iSame = prevIntensity[i] !== undefined && Math.abs(prevIntensity[i]! - intensity) < 0.001 && intensity === 0;
      const eSame = prevEmissive[i] === emissiveHex;
      const dSame = prevDepthTest[i] === depthTestInt;
      if (iSame && eSame && dSame) continue;

      prevIntensity[i] = intensity;
      prevEmissive[i] = emissiveHex;
      prevDepthTest[i] = depthTestInt;

      const meshes = meshCache[i];
      if (!meshes) continue;

      for (const mesh of meshes) {
        const mat = mesh.material as MeshStandardMaterial;
        mat.emissiveIntensity = intensity;
        mat.emissive.setHex(emissiveHex);
        mat.depthTest = depthTestInt === 1;
        mesh.renderOrder = renderOrder;
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
