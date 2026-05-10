'use client';

import { useGameStore } from '@/store/gameStore';
import { useSettingsStore, ACHIEVEMENTS_DEF, getDifficultyConfig } from '@/store/settingsStore';
import { SAFE_SPAWN_POOL } from '@/game/utils/safeSpawnPool';
import { useWinProcessor } from '@/game/hooks/useWinProcessor';
import { formatTime, getStars } from '@/game/utils/winUtils';

export function WinScreen(): React.JSX.Element | null {
  const status = useGameStore((s) => s.status);
  const startedAt = useGameStore((s) => s.startedAt);
  const endedAt = useGameStore((s) => s.endedAt);
  const stats = useGameStore((s) => s.stats);
  const gnomeTarget = useGameStore((s) => s.gnomeTarget);
  const reset = useGameStore((s) => s.reset);
  const spawnGnomes = useGameStore((s) => s.spawnGnomes);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const leaderboard = useSettingsStore((s) => s.leaderboard);
  const unlockedAchievements = useSettingsStore((s) => s.unlockedAchievements);
  const totalExp = useSettingsStore((s) => s.totalExp);

  const elapsed = startedAt !== null && endedAt !== null ? endedAt - startedAt : 0;
  const accuracy = stats.shotsFired > 0 ? Math.round((stats.shotsHit / stats.shotsFired) * 100) : 0;
  const stars = getStars(elapsed);

  const { newWeapons, resetProcessor } = useWinProcessor(elapsed, accuracy);

  if (status !== 'won') return null;

  const playAgain = (): void => {
    resetProcessor();
    reset();
    const config = getDifficultyConfig(difficulty);
    spawnGnomes(SAFE_SPAWN_POOL, config.gnomeCount);
  };

  const newAchievements = ACHIEVEMENTS_DEF.filter((a) => unlockedAchievements.includes(a.id));
  const netExp = Math.max(0, stats.totalExpGained - stats.expSpent);

  return (
    <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-white">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 p-8 backdrop-blur-xl">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          ¡Encontraste los {gnomeTarget}! 🧙
        </h2>

        <div className="flex justify-center gap-1 text-4xl">
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? 'animate-bounce' : 'opacity-20'} style={{ animationDelay: `${s * 0.1}s` }}>
              ⭐
            </span>
          ))}
        </div>

        <p className="text-center font-mono text-3xl text-yellow-300">{formatTime(elapsed)}</p>

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

        <div className="rounded-xl bg-amber-400/10 p-3 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-300">EXP ganado</p>
          <p className="mt-1 font-mono text-2xl font-bold text-amber-300">+{netExp}</p>
          {stats.expSpent > 0 && (
            <p className="mt-0.5 text-xs text-zinc-500">
              ({stats.totalExpGained} ganado − {stats.expSpent} en pistas)
            </p>
          )}
          <p className="mt-1 text-xs text-zinc-400">
            Wallet acumulado: {totalExp + netExp}
          </p>
        </div>

        {newWeapons.length > 0 && (
          <div className="rounded-xl bg-cyan-400/10 p-3 text-center animate-pulse">
            <p className="text-xs uppercase tracking-widest text-cyan-300">🎉 Nueva arma desbloqueada</p>
            <p className="mt-1 text-sm text-cyan-100">{newWeapons.join(', ')}</p>
          </div>
        )}

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
