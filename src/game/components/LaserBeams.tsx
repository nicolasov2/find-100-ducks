'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CylinderGeometry, MeshBasicMaterial, Quaternion, Vector3 } from 'three';
import { BEAM_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { BeamShot } from '@/game/types';

const BEAM_RADIUS = 0.025;
const BEAM_COLOR = '#22d3ee';
const BEAM_GEOM = new CylinderGeometry(BEAM_RADIUS, BEAM_RADIUS, 1, 8, 1, true);
const Y_AXIS = new Vector3(0, 1, 0);

export function LaserBeams(): React.JSX.Element {
  const beams = useGameStore((s) => s.beams);
  const purge = useGameStore((s) => s.purgeExpiredEffects);

  useFrame(() => {
    const now = Date.now();
    if (beams.some((b) => now - b.startedAt >= BEAM_DURATION_MS)) {
      purge(now);
    }
  });

  return (
    <group>
      {beams.map((b) => (
        <LaserBeamMesh key={b.id} beam={b} />
      ))}
    </group>
  );
}

interface BeamGeo {
  position: Vector3;
  quaternion: Quaternion;
  length: number;
}

function computeBeamGeo(from: BeamShot['from'], to: BeamShot['to']): BeamGeo {
  const fromV = new Vector3(from[0], from[1], from[2]);
  const toV = new Vector3(to[0], to[1], to[2]);
  const dir = toV.clone().sub(fromV);
  const length = Math.max(dir.length(), 0.01);
  const position = fromV.clone().add(toV).multiplyScalar(0.5);
  const quaternion = new Quaternion().setFromUnitVectors(
    Y_AXIS,
    dir.clone().normalize(),
  );
  return { position, quaternion, length };
}

function LaserBeamMesh({ beam }: { beam: BeamShot }): React.JSX.Element {
  const matRef = useRef<MeshBasicMaterial | null>(null);
  const geo = useMemo(() => computeBeamGeo(beam.from, beam.to), [beam.from, beam.to]);

  useFrame(() => {
    const mat = matRef.current;
    if (!mat) return;
    const t = Math.min((Date.now() - beam.startedAt) / BEAM_DURATION_MS, 1);
    mat.opacity = Math.max(0, 1 - t);
  });

  return (
    <mesh
      position={geo.position}
      quaternion={geo.quaternion}
      scale={[1, geo.length, 1]}
      geometry={BEAM_GEOM}
    >
      <meshBasicMaterial
        ref={matRef}
        color={BEAM_COLOR}
        transparent
        opacity={1}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}
