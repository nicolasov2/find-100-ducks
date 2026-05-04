'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore, ACHIEVEMENTS_DEF, getDifficultyConfig } from '@/store/settingsStore';
import { SPAWN_POOL_ALL } from '@/game/utils/spawnPoolAll';
import { playVictory, stopMusic } from '@/game/systems/AudioManager';

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getStars(ms: number): number {
  const sec = ms / 1000;
  if (sec <= 120) return 3;
  if (sec <= 300) return 2;
  return 1;
}

export function WinScreen(): React.JSX.Element | null {
  const status = useGameStore((s) => s.status);
  const startedAt = useGameStore((s) => s.startedAt);
  const endedAt = useGameStore((s) => s.endedAt);
  const stats = useGameStore((s) => s.stats);
  const duckTarget = useGameStore((s) => s.duckTarget);
  const reset = useGameStore((s) => s.reset);
  const spawnDucks = useGameStore((s) => s.spawnDucks);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const addEntry = useSettingsStore((s) => s.addLeaderboardEntry);
  const leaderboard = useSettingsStore((s) => s.leaderboard);
  const unlockAchievement = useSettingsStore((s) => s.unlockAchievement);
  const unlockedAchievements = useSettingsStore((s) => s.unlockedAchievements);
  const didProcess = useRef(false);

  const elapsed = startedAt !== null && endedAt !== null ? endedAt - startedAt : 0;
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;
  const stars = getStars(elapsed);

  // Process achievements and leaderboard on win
  useEffect(() => {
    if (status !== 'won' || didProcess.current) return;
    didProcess.current = true;

    playVictory();
    stopMusic();

    // Save to leaderboard
    addEntry({
      time: elapsed,
      date: new Date().toLocaleDateString(),
      difficulty,
      accuracy,
      maxCombo: stats.maxCombo,
    });

    // Check achievements
    const sec = elapsed / 1000;
    if (sec < 180) unlockAchievement('speed_runner');
    if (sec < 120) unlockAchievement('lightning');
    if (stats.maxCombo >= 5) unlockAchievement('on_fire');
    if (stats.roomsWithHits.size >= 3) unlockAchievement('explorer');
    if (stats.smallestDuckScale < 0.4) unlockAchievement('mini_hunter');
    if (stats.shotsFired > 0 && stats.shotsFired === stats.shotsHit) unlockAchievement('perfect');
    // sharp_eye: 10 hits without miss handled by combo logic (max streak >= 10)
    if (stats.maxCombo >= 10) unlockAchievement('sharp_eye');
  }, [status, elapsed, accuracy, stats, difficulty, addEntry, unlockAchievement]);

  if (status !== 'won') return null;

  const playAgain = (): void => {
    didProcess.current = false;
    reset();
    const config = getDifficultyConfig(difficulty);
    spawnDucks(SPAWN_POOL_ALL, config.duckCount);
  };

  const newAchievements = ACHIEVEMENTS_DEF.filter(
    (a) => unlockedAchievements.includes(a.id),
  );

  return (
    <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-white">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 p-8 backdrop-blur-xl">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold tracking-tight">
          ¡Encontraste los {duckTarget}! 🦆
        </h2>

        {/* Stars */}
        <div className="flex justify-center gap-1 text-4xl">
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? 'animate-bounce' : 'opacity-20'} style={{ animationDelay: `${s * 0.1}s` }}>
              ⭐
            </span>
          ))}
        </div>

        {/* Time */}
        <p className="text-center font-mono text-3xl text-yellow-300">{formatTime(elapsed)}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Disparos</span>
            <span className="font-mono">{stats.shotsFired}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Aciertos</span>
            <span className="font-mono">{stats.shotsHit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Precisión</span>
            <span className="font-mono text-green-400">{accuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Max Combo</span>
            <span className="font-mono text-orange-400">x{stats.maxCombo}</span>
          </div>
        </div>

        {/* Achievements */}
        {newAchievements.length > 0 && (
          <div className="rounded-xl bg-yellow-400/10 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-400">Logros</p>
            <div className="flex flex-wrap gap-2">
              {newAchievements.map((a) => (
                <span key={a.id} className="rounded-full bg-yellow-400/20 px-2 py-0.5 text-xs" title={a.description}>
                  {a.icon} {a.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="rounded-xl bg-white/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">🏆 Mejores Tiempos</p>
            <div className="space-y-1 text-xs">
              {leaderboard.slice(0, 5).map((e, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-zinc-500">#{i + 1}</span>
                  <span className="font-mono">{formatTime(e.time)}</span>
                  <span className="text-zinc-500">{e.accuracy}%</span>
                  <span className="text-zinc-600">{e.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Play again */}
        <button
          type="button"
          onClick={playAgain}
          className="rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-300 hover:scale-105"
        >
          🔄 Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
