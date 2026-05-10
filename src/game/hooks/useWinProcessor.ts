'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { playVictory, stopMusic } from '@/game/systems/AudioManager';

interface WinProcessorResult {
  newWeapons: string[];
  resetProcessor: () => void;
}

export function useWinProcessor(elapsed: number, accuracy: number): WinProcessorResult {
  const status = useGameStore((s) => s.status);
  const stats = useGameStore((s) => s.stats);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const addEntry = useSettingsStore((s) => s.addLeaderboardEntry);
  const unlockAchievement = useSettingsStore((s) => s.unlockAchievement);
  const addExp = useSettingsStore((s) => s.addExp);
  const totalExp = useSettingsStore((s) => s.totalExp);
  const unlockedWeapons = useSettingsStore((s) => s.unlockedWeapons);
  const unlockWeapon = useSettingsStore((s) => s.unlockWeapon);
  const didProcess = useRef(false);
  const [newWeapons, setNewWeapons] = useState<string[]>([]);

  useEffect(() => {
    if (status !== 'won' || didProcess.current) return;
    didProcess.current = true;

    playVictory();
    stopMusic();

    addEntry({ time: elapsed, date: new Date().toLocaleDateString(), difficulty, accuracy, maxCombo: stats.maxCombo });

    const sec = elapsed / 1000;
    if (sec < 180) unlockAchievement('speed_runner');
    if (sec < 120) unlockAchievement('lightning');
    if (stats.maxCombo >= 5) unlockAchievement('on_fire');
    if (stats.roomsWithHits.size >= 3) unlockAchievement('explorer');
    if (stats.smallestGnomeScale < 0.4) unlockAchievement('mini_hunter');
    if (stats.shotsFired > 0 && stats.shotsFired === stats.shotsHit) unlockAchievement('perfect');
    if (stats.maxCombo >= 10) unlockAchievement('sharp_eye');

    const netExp = Math.max(0, stats.totalExpGained - stats.expSpent);
    if (netExp > 0) {
      addExp(netExp);
      const newTotal = totalExp + netExp;
      const candidates = [
        { id: 'laser-rifle', threshold: 200 },
        { id: 'laser-sniper', threshold: 500 },
        { id: 'plasma-spreader', threshold: 1000 },
      ];
      const unlocked: string[] = [];
      for (const c of candidates) {
        if (newTotal >= c.threshold && !unlockedWeapons.includes(c.id)) {
          unlockWeapon(c.id);
          unlocked.push(c.id);
        }
      }
      if (unlocked.length > 0) requestAnimationFrame(() => setNewWeapons(unlocked));
      const allWeapons = ['laser-pistol', 'laser-rifle', 'laser-sniper', 'plasma-spreader'];
      if (allWeapons.every((w) => new Set([...unlockedWeapons, ...unlocked]).has(w))) {
        unlockAchievement('weapons_master');
      }
    }
  }, [status, elapsed, accuracy, stats, difficulty, addEntry, unlockAchievement, addExp, totalExp, unlockedWeapons, unlockWeapon]);

  const resetProcessor = useCallback(() => {
    didProcess.current = false;
    setNewWeapons([]);
  }, []);

  return { newWeapons, resetProcessor };
}
