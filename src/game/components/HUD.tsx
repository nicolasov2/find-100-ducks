'use client';

import { useEffect, useState } from 'react';
import { useGameStore, getComboMultiplier } from '@/store/gameStore';

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
  const clearHitFlash = useGameStore((s) => s.clearHitFlash);
  const comboDisplay = useGameStore((s) => s.comboDisplay);
  const totalExpGained = useGameStore((s) => s.stats.totalExpGained);
  const found = gnomeTarget - remaining;
  const comboMult = getComboMultiplier(comboDisplay);

  const [now, setNow] = useState<number>(0);
  const [shotAnim, setShotAnim] = useState(false);
  const [showHitMarker, setShowHitMarker] = useState(false);
  const [comboAnim, setComboAnim] = useState(0);
  const [shake, setShake] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => { setNow(Date.now()); }, 100);
    return () => { window.clearInterval(id); };
  }, [status]);

  // Crosshair pulse on shot — defer to next frame to avoid sync setState in effect
  useEffect(() => {
    if (!lastShotAt) return;
    const raf = requestAnimationFrame(() => setShotAnim(true));
    const t = setTimeout(() => setShotAnim(false), 120);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [lastShotAt]);

  // Hit marker + screen shake
  useEffect(() => {
    if (!hitFlash) return;
    const raf = requestAnimationFrame(() => setShowHitMarker(true));
    const shakeCount = 4;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= shakeCount) {
        setShake({ x: 0, y: 0 });
        clearInterval(interval);
        return;
      }
      setShake({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 3,
      });
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

  // Combo animation — deferred to next frame
  useEffect(() => {
    if (comboDisplay < 2) return;
    const raf = requestAnimationFrame(() => setComboAnim(comboDisplay));
    const t = setTimeout(() => setComboAnim(0), 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [comboDisplay]);

  const elapsed = startedAt === null ? 0 : (endedAt ?? now) - startedAt;

  if (status !== 'playing') return <></>;

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none text-white"
      style={{ transform: `translate(${shake.x}px, ${shake.y}px)` }}
    >
      {/* Gnome counter */}
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <div className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm tracking-wide backdrop-blur-sm">
          🧙 {found.toString().padStart(3, '0')} / {gnomeTarget}
        </div>
      </div>

      {/* Timer */}
      <div className="absolute right-4 top-4 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-sm tracking-wide backdrop-blur-sm">
        ⏱ {formatElapsed(elapsed)}
      </div>

      {/* Stats bar */}
      <div className="absolute left-4 top-14 flex gap-2 text-xs">
        <div className="rounded bg-black/50 px-2 py-1 backdrop-blur-sm">
          🎯 {useGameStore.getState().stats.shotsHit}/{useGameStore.getState().stats.shotsFired}
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative transition-transform duration-100"
          style={{ transform: shotAnim ? 'scale(1.5)' : 'scale(1)' }}
        >
          {/* Center dot */}
          <div
            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: showHitMarker ? '#fbbf24' : 'rgba(255,255,255,0.9)' }}
          />
          {/* Cross lines */}
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/70" style={{ marginTop: '4px' }} />
          <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/70" style={{ marginBottom: '-12px' }} />
          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/70" style={{ marginLeft: '-8px' }} />
          <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/70" style={{ marginRight: '-8px' }} />

          {/* Hit marker X */}
          {showHitMarker && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping">
              <span className="text-lg font-bold text-yellow-400">✕</span>
            </div>
          )}
        </div>
      </div>

      {/* Combo display */}
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

      {/* EXP earned this game */}
      <div className="absolute left-4 top-24 rounded bg-black/50 px-2 py-1 text-xs backdrop-blur-sm">
        ⭐ {totalExpGained} EXP
      </div>

      {/* Hint tip when few gnomes remain */}
      {remaining > 0 && remaining <= 15 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm animate-pulse">
          💡 Presiona <kbd className="rounded bg-white/30 px-1">H</kbd> para revelar gnomos
        </div>
      )}

      {/* Hit flash border */}
      {hitFlash && (
        <div className="absolute inset-0 animate-pulse rounded-lg border-2 border-yellow-400/40" />
      )}

      {/* Progress bar */}
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
