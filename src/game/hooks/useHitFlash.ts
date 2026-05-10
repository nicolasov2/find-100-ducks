'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

interface HitFlashResult {
  showHitMarker: boolean;
  shake: { x: number; y: number };
}

export function useHitFlash(): HitFlashResult {
  const hitFlash = useGameStore((s) => s.hitFlash);
  const clearHitFlash = useGameStore((s) => s.clearHitFlash);
  const [showHitMarker, setShowHitMarker] = useState(false);
  const [shake, setShake] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!hitFlash) return;
    const raf = requestAnimationFrame(() => setShowHitMarker(true));
    let i = 0;
    const interval = setInterval(() => {
      if (i >= 4) {
        setShake({ x: 0, y: 0 });
        clearInterval(interval);
        return;
      }
      setShake({ x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 3 });
      i++;
    }, 30);
    const t = setTimeout(() => {
      setShowHitMarker(false);
      clearHitFlash();
    }, 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [hitFlash, clearHitFlash]);

  return { showHitMarker, shake };
}
