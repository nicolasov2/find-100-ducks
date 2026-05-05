'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { setMasterVolume, setSfxVolume, setMusicVolume } from '@/game/systems/AudioManager';
import { SPAWN_POOL_ALL } from '@/game/utils/spawnPoolAll';
import { getDifficultyConfig } from '@/store/settingsStore';

export function PauseMenu(): React.JSX.Element | null {
  const status = useGameStore((s) => s.status);
  const reset = useGameStore((s) => s.reset);
  const spawnGnomes = useGameStore((s) => s.spawnGnomes);
  const [paused, setPaused] = useState(false);
  const masterVol = useSettingsStore((s) => s.masterVolume);
  const sfxVol = useSettingsStore((s) => s.sfxVolume);
  const musicVol = useSettingsStore((s) => s.musicVolume);
  const setMasterVol = useSettingsStore((s) => s.setMasterVolume);
  const setSfxVol = useSettingsStore((s) => s.setSfxVolume);
  const setMusicVol = useSettingsStore((s) => s.setMusicVolume);
  const difficulty = useSettingsStore((s) => s.difficulty);

  useEffect(() => {
    const update = (): void => {
      const isLocked = document.pointerLockElement !== null;
      setPaused(!isLocked && status === 'playing');
    };
    document.addEventListener('pointerlockchange', update);
    return () => document.removeEventListener('pointerlockchange', update);
  }, [status]);

  if (!paused) return null;

  const handleRestart = (): void => {
    reset();
    const config = getDifficultyConfig(difficulty);
    spawnGnomes(SPAWN_POOL_ALL, config.gnomeCount);
  };

  const handleQuit = (): void => {
    reset();
    window.location.href = '/';
  };

  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-black/70 text-white backdrop-blur-sm">
      <div className="flex w-80 flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900/95 p-6 backdrop-blur-xl">
        <h2 className="text-center text-2xl font-bold">⏸ Pausa</h2>

        <p className="text-center text-sm text-zinc-400">
          Haz clic en la pantalla para continuar
        </p>

        <div className="space-y-3 rounded-xl bg-white/5 p-4">
          <label className="flex items-center justify-between text-sm">
            <span>🔊 General</span>
            <input
              type="range"
              min="0" max="100"
              value={Math.round(masterVol * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                setMasterVol(v);
                setMasterVolume(v);
              }}
              className="w-28 accent-yellow-400"
            />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>💥 Efectos</span>
            <input
              type="range"
              min="0" max="100"
              value={Math.round(sfxVol * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                setSfxVol(v);
                setSfxVolume(v);
              }}
              className="w-28 accent-yellow-400"
            />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>🎵 Música</span>
            <input
              type="range"
              min="0" max="100"
              value={Math.round(musicVol * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                setMusicVol(v);
                setMusicVolume(v);
              }}
              className="w-28 accent-yellow-400"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            🔄 Reiniciar
          </button>
          <button
            type="button"
            onClick={handleQuit}
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/30"
          >
            🚪 Salir al Menú
          </button>
        </div>
      </div>
    </div>
  );
}
