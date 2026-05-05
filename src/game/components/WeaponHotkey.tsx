'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { WEAPON_ORDER } from '@/game/weapons/registry';
import type { WeaponId } from '@/game/weapons/types';

export function WeaponHotkey(): null {
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (document.pointerLockElement === null) return;
      const num = parseInt(e.key, 10);
      if (!Number.isFinite(num) || num < 1 || num > WEAPON_ORDER.length) return;
      const id = WEAPON_ORDER[num - 1];
      if (id === undefined) return;
      const unlocked = useSettingsStore.getState().unlockedWeapons;
      if (!unlocked.includes(id)) return;
      useGameStore.getState().setCurrentWeapon(id as WeaponId);
      useSettingsStore.getState().setSelectedWeapon(id);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
