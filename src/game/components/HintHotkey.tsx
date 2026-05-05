'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

const COOLDOWN_MS = 8000;

export function HintHotkey(): null {
  useEffect(() => {
    let lastUsedAt = 0;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key.toLowerCase() !== 'h') return;
      if (document.pointerLockElement === null) return;
      const state = useGameStore.getState();
      if (state.status !== 'playing') return;
      const now = Date.now();
      if (now - lastUsedAt < COOLDOWN_MS) return;
      lastUsedAt = now;
      state.triggerHint();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
