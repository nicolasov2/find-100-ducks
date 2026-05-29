'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSettingsStore, Difficulty, getDifficultyConfig } from '@/store/settingsStore';
import { useGameStore } from '@/store/gameStore';
import { safePoolForLevel } from '@/game/utils/levelPools';
import { startMusic } from '@/game/systems/AudioManager';
import { WeaponSelector } from '@/game/components/WeaponSelector';
import type { WeaponId } from '@/game/weapons/types';
import type { LevelId } from '@/game/types';

export function StartButton(): React.JSX.Element {
  const difficulty = useSettingsStore((s) => s.difficulty);
  const setDifficulty = useSettingsStore((s) => s.setDifficulty);
  const selectedWeapon = useSettingsStore((s) => s.selectedWeapon);
  const spawnGnomes = useGameStore((s) => s.spawnGnomes);
  const setCurrentWeapon = useGameStore((s) => s.setCurrentWeapon);
  const [level, setLevel] = useState<LevelId>('mansion');
  const [showOptions, setShowOptions] = useState(false);
  const [showWeapons, setShowWeapons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window;
    const noLock = !('requestPointerLock' in document.body);
    setIsMobile(touch || noLock);
  }, []);

  const handlePlay = () => {
    const config = getDifficultyConfig(difficulty);
    setCurrentWeapon(selectedWeapon as WeaponId);
    spawnGnomes(safePoolForLevel(level), config.gnomeCount, level);
    startMusic();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 px-8 py-6 text-center backdrop-blur-sm">
        <span className="text-3xl">🖥️</span>
        <p className="font-semibold text-zinc-200">Solo disponible en escritorio</p>
        <p className="text-sm text-zinc-500">Este juego requiere teclado y mouse con Pointer Lock.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
        {([
          { id: 'mansion', label: '🏠 Cap 1: Mansión' },
          { id: 'beach', label: '🏖️ Cap 2: Playa' },
        ] as const).map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setLevel(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              level === c.id ? 'bg-yellow-500 text-black' : 'text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/play"
          onClick={handlePlay}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-10 py-4 text-lg font-bold text-zinc-950 transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">JUGAR AHORA</span>
          <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-sm text-zinc-400 hover:text-white"
        >
          ⚙️ Opciones de Dificultad
        </button>
        
        {showOptions && (
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            {(['easy', 'normal', 'hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  difficulty === d
                    ? 'bg-yellow-500 text-black'
                    : 'text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {d === 'easy' && 'Fácil (150)'}
                {d === 'normal' && 'Normal (100)'}
                {d === 'hard' && 'Difícil (100)'}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {showOptions && difficulty === 'easy' && <p className="text-xs text-zinc-500">150 gnomos, glow a 8 metros. Gnomos más grandes.</p>}
      {showOptions && difficulty === 'normal' && <p className="text-xs text-zinc-500">100 gnomos, glow a 5 metros.</p>}
      {showOptions && difficulty === 'hard' && <p className="text-xs text-zinc-500">100 gnomos, SIN glow. Gnomos más pequeños.</p>}

      <button
        type="button"
        onClick={() => setShowWeapons(true)}
        className="text-sm text-zinc-400 hover:text-white"
      >
        🔫 Arsenal
      </button>

      {showWeapons && <WeaponSelector onClose={() => setShowWeapons(false)} />}
    </div>
  );
}
