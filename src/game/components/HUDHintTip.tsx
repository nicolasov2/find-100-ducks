'use client';

import { HINT_EXP_COST, HINT_AUTO_GLOW_THRESHOLD } from '@/store/gameStore';

const COOLDOWN_MS = 1500;

interface Props {
  remaining: number;
  hintActivatedAt: number | null;
  now: number;
  canAffordHint: boolean;
}

export function HUDHintTip({ remaining, hintActivatedAt, now, canAffordHint }: Props): React.JSX.Element | null {
  if (remaining <= 0) return null;

  if (remaining <= HINT_AUTO_GLOW_THRESHOLD) {
    return (
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-amber-500/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
        ✨ Auto-revelados — quedan {remaining}
      </div>
    );
  }

  const msSince = hintActivatedAt !== null ? now - hintActivatedAt : COOLDOWN_MS;
  const onCooldown = msSince < COOLDOWN_MS;
  const cooldownPct = Math.min(msSince / COOLDOWN_MS, 1) * 100;

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
      <div
        className={`rounded-full px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition ${
          onCooldown ? 'bg-zinc-700/80 opacity-60' :
          canAffordHint ? 'bg-cyan-500/80 animate-pulse' : 'bg-zinc-800/80 opacity-70'
        }`}
      >
        💡 <kbd className="rounded bg-white/30 px-1">H</kbd> revelar · {HINT_EXP_COST} EXP
        {onCooldown && <span className="ml-2 text-zinc-400">espera...</span>}
        {!onCooldown && !canAffordHint && <span className="ml-2 text-red-300">insuficiente</span>}
      </div>
      {onCooldown && (
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full bg-cyan-400 transition-all duration-100" style={{ width: `${cooldownPct}%` }} />
        </div>
      )}
    </div>
  );
}
