'use client';

import { useEffect } from 'react';
import { HINT_EXP_COST, useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';

const COOLDOWN_MS = 1500;

export function HintHotkey(): null {
  useEffect(() => {
    let lastUsedAt = 0;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key.toLowerCase() !== 'h') return;
      if (document.pointerLockElement === null) return;
      const game = useGameStore.getState();
      if (game.status !== 'playing') return;
      const now = Date.now();
      if (now - lastUsedAt < COOLDOWN_MS) return;
      const ok = useSettingsStore.getState().spendExp(HINT_EXP_COST);
      if (!ok) return;
      lastUsedAt = now;
      game.triggerHint();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
