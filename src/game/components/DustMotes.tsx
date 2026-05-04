'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { BufferAttribute, Points } from 'three';

const MOTE_COUNT = 200;
const SPREAD = 40;
const HEIGHT = 4;

export function DustMotes(): React.JSX.Element {
  const pointsRef = useRef<Points>(null);
  const camera = useThree((s) => s.camera);

  const positions = useMemo(() => {
    const arr = new Float32Array(MOTE_COUNT * 3);
    for (let i = 0; i < MOTE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * SPREAD;
      arr[i * 3 + 1] = Math.random() * HEIGHT;
      arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
    }
    return arr;
  }, []);

  const speeds = useMemo(() =>
    Array.from({ length: MOTE_COUNT }, () => ({
      vx: (Math.random() - 0.5) * 0.15,
      vy: 0.02 + Math.random() * 0.05,
      vz: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    })),
    [],
  );

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const posAttr = pts.geometry.getAttribute('position') as BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const cx = camera.position.x;
    const cz = camera.position.z;

    for (let i = 0; i < MOTE_COUNT; i++) {
      const s = speeds[i]!;
      let x = arr[i * 3]!;
      let y = arr[i * 3 + 1]!;
      let z = arr[i * 3 + 2]!;

      x += Math.sin(t * 0.3 + s.phase) * s.vx * 0.016;
      y += s.vy * 0.016;
      z += Math.cos(t * 0.2 + s.phase) * s.vz * 0.016;

      // Wrap around player
      if (y > HEIGHT) y = 0.1;
      if (x > cx + SPREAD / 2) x -= SPREAD;
      if (x < cx - SPREAD / 2) x += SPREAD;
      if (z > cz + SPREAD / 2) z -= SPREAD;
      if (z < cz - SPREAD / 2) z += SPREAD;

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4d4d8"
        size={0.02}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}
