'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { WEAPONS } from '@/game/weapons/registry';

export function ScopeOverlay(): React.JSX.Element | null {
  const currentWeaponId = useGameStore((s) => s.currentWeaponId);
  const status = useGameStore((s) => s.status);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    const onDown = (e: MouseEvent): void => {
      if (e.button !== 2) return;
      if (document.pointerLockElement === null) return;
      requestAnimationFrame(() => setZooming(true));
    };
    const onUp = (e: MouseEvent): void => {
      if (e.button !== 2) return;
      requestAnimationFrame(() => setZooming(false));
    };
    const onContext = (e: MouseEvent): void => e.preventDefault();
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('contextmenu', onContext);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('contextmenu', onContext);
    };
  }, []);

  if (status !== 'playing') return null;
  const weapon = WEAPONS[currentWeaponId];
  if (!weapon.hasScope || !zooming) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        className="absolute inset-0 bg-black"
        style={{
          maskImage:
            'radial-gradient(circle at center, transparent 28%, black 32%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, transparent 28%, black 32%)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{ width: '32vmin', height: '32vmin', borderColor: weapon.beamColor }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '32vmin', height: '1px', backgroundColor: weapon.beamColor }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '1px', height: '32vmin', backgroundColor: weapon.beamColor }}
      />
    </div>
  );
}
