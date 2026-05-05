'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Html } from '@react-three/drei';
import { EXP_POPUP_DURATION_MS, useGameStore } from '@/store/gameStore';
import type { ExpPopup } from '@/game/types';

const RISE_DISTANCE = 1.0;

function multColor(mult: number): string {
  if (mult >= 2.5) return '#f87171'; // red
  if (mult >= 2.0) return '#fb923c'; // orange
  if (mult >= 1.4) return '#fbbf24'; // yellow
  return '#ffffff';
}

export function ExpPopups(): React.JSX.Element {
  const popups = useGameStore((s) => s.expPopups);

  return (
    <group userData={{ raycastIgnore: true }}>
      {popups.map((p) => (
        <ExpPopupSprite key={p.id} popup={p} />
      ))}
    </group>
  );
}

function ExpPopupSprite({ popup }: { popup: ExpPopup }): React.JSX.Element {
  const groupRef = useRef<Group | null>(null);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const t = Math.min((Date.now() - popup.startedAt) / EXP_POPUP_DURATION_MS, 1);
    g.position.y = popup.position[1] + 0.4 + t * RISE_DISTANCE;
  });

  const color = multColor(popup.mult);

  return (
    <group ref={groupRef} position={[popup.position[0], popup.position[1] + 0.4, popup.position[2]]}>
      <Html center distanceFactor={6} sprite>
        <div
          className="pointer-events-none whitespace-nowrap font-mono text-base font-bold drop-shadow-md"
          style={{ color }}
        >
          +{popup.amount}{popup.mult > 1 ? ` ×${popup.mult.toFixed(1)}` : ''}
        </div>
      </Html>
    </group>
  );
}
