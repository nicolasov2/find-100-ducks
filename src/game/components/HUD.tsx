'use client';

import { useEffect, useState } from 'react';
import { useGameStore, getComboMultiplier, HINT_EXP_COST } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useHitFlash } from '@/game/hooks/useHitFlash';
import { HUDCrosshair } from './HUDCrosshair';
import { HUDHintTip } from './HUDHintTip';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
}

export function HUD(): React.JSX.Element {
  const status = useGameStore((s) => s.status);
  const startedAt = useGameStore((s) => s.startedAt);
  const endedAt = useGameStore((s) => s.endedAt);
  const remaining = useGameStore((s) => s.gnomes.length);
  const gnomeTarget = useGameStore((s) => s.gnomeTarget);
  const lastShotAt = useGameStore((s) => s.lastShotAt);
  const hitFlash = useGameStore((s) => s.hitFlash);
  const comboDisplay = useGameStore((s) => s.comboDisplay);
  const shotsHit = useGameStore((s) => s.stats.shotsHit);
  const shotsFired = useGameStore((s) => s.stats.shotsFired);
  const totalExpGained = useGameStore((s) => s.stats.totalExpGained);
  const expSpent = useGameStore((s) => s.stats.expSpent);
  const hintActivatedAt = useGameStore((s) => s.hintActivatedAt);
  const totalExp = useSettingsStore((s) => s.totalExp);

  const availableExp = totalExpGained - expSpent;
  const found = gnomeTarget - remaining;
  const comboMult = getComboMultiplier(comboDisplay);
  const canAffordHint = availableExp >= HINT_EXP_COST;

  const [now, setNow] = useState<number>(0);
  const [shotAnim, setShotAnim] = useState(false);
  const [comboAnim, setComboAnim] = useState(0);
  const { showHitMarker, shake } = useHitFlash();

  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => { setNow(Date.now()); }, 100);
    return () => { window.clearInterval(id); };
  }, [status]);

  useEffect(() => {
    if (!lastShotAt) return;
    const raf = requestAnimationFrame(() => setShotAnim(true));
    const t = setTimeout(() => setShotAnim(false), 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [lastShotAt]);

  useEffect(() => {
    if (comboDisplay < 2) return;
    const raf = requestAnimationFrame(() => setComboAnim(comboDisplay));
    const t = setTimeout(() => setComboAnim(0), 1200);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [comboDisplay]);

  const elapsed = startedAt === null ? 0 : (endedAt ?? now) - startedAt;

  if (status !== 'playing') return <></>;

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none text-white"
      style={{ transform: `translate(${shake.x}px, ${shake.y}px)` }}
    >
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <div className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm tracking-wide backdrop-blur-sm">
          🧙 {found.toString().padStart(3, '0')} / {gnomeTarget}
        </div>
      </div>

      <div className="absolute right-4 top-4 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm tracking-wide backdrop-blur-sm">
        ⏱ {formatElapsed(elapsed)}
      </div>

      <div className="absolute left-4 top-14 flex gap-2 text-xs">
        <div className="rounded bg-black/50 px-2 py-1 backdrop-blur-sm">
          🎯 {shotsHit}/{shotsFired}
        </div>
      </div>

      <HUDCrosshair shotAnim={shotAnim} showHitMarker={showHitMarker} />

      {comboAnim >= 2 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 animate-bounce font-bold"
          style={{ top: 'calc(50% + 40px)' }}
        >
          <span className="rounded-full bg-orange-500/80 px-3 py-1 text-sm text-white backdrop-blur-sm">
            🔥 x{comboAnim} Combo · ×{comboMult.toFixed(1)} EXP
          </span>
        </div>
      )}

      <div className="absolute left-4 top-24 flex flex-col gap-1">
        <div className="rounded bg-black/50 px-2 py-1 text-xs backdrop-blur-sm">
          🪙 {availableExp} EXP <span className="text-zinc-400">· ganado +{totalExpGained}</span>
        </div>
        <div className="rounded bg-black/30 px-2 py-0.5 text-[10px] text-zinc-400 backdrop-blur-sm">
          Wallet: {totalExp} EXP
        </div>
      </div>

      <HUDHintTip
        remaining={remaining}
        hintActivatedAt={hintActivatedAt}
        now={now}
        canAffordHint={canAffordHint}
      />

      {hitFlash && (
        <div className="absolute inset-0 animate-pulse rounded-lg border-2 border-yellow-400/40" />
      )}

      <div className="absolute bottom-6 left-1/2 w-64 -translate-x-1/2">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300"
            style={{ width: `${(found / gnomeTarget) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-center font-mono text-xs text-white/50">
          {Math.round((found / gnomeTarget) * 100)}%
        </div>
      </div>
    </div>
  );
}
