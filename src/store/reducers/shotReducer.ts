import type { Vector3Tuple } from 'three';
import type { Gnome, BeamShot, DyingGnome, ExpPopup } from '@/game/types';
import type { GameStats, ShotInput } from '@/store/gameTypes';
import { EXP_BASE } from '@/store/gameConstants';
import { getComboMultiplier, COMBO_WINDOW_MS } from '@/game/utils/comboUtils';

let beamCounter = 0;
export const nextBeamId = (): string => `beam-${++beamCounter}`;

let popupCounter = 0;
export const nextPopupId = (): string => `exp-${++popupCounter}`;

export interface ShotResult {
  beams: readonly BeamShot[];
  gnomes?: readonly Gnome[];
  dyingGnomes?: readonly DyingGnome[];
  expPopups?: readonly ExpPopup[];
  lastShotAt: number;
  stats: GameStats;
  hitFlash: boolean;
  comboDisplay: number;
  status?: 'won';
  endedAt?: number;
}

export function applyShotReducer(
  state: {
    gnomes: readonly Gnome[];
    dyingGnomes: readonly DyingGnome[];
    beams: readonly BeamShot[];
    expPopups: readonly ExpPopup[];
    stats: GameStats;
    endedAt: number | null;
  },
  input: ShotInput,
): ShotResult {
  const { at, beamFrom, beamTo, beamColor, beamRadius, deadGnome } = input;

  const beam: BeamShot = {
    id: nextBeamId(),
    from: beamFrom as Vector3Tuple,
    to: beamTo as Vector3Tuple,
    color: beamColor,
    radius: beamRadius,
    startedAt: at,
  };
  const beams = [...state.beams, beam];
  const newStats = { ...state.stats };
  newStats.shotsFired += 1;

  if (deadGnome === null) {
    newStats.currentStreak = 0;
    return { beams, lastShotAt: at, stats: newStats, hitFlash: false, comboDisplay: 0 };
  }

  newStats.shotsHit += 1;

  const timeSinceLastHit = at - newStats.lastHitAt;
  if (timeSinceLastHit < COMBO_WINDOW_MS && newStats.lastHitAt > 0) {
    newStats.currentStreak += 1;
  } else {
    newStats.currentStreak = 1;
  }
  newStats.maxCombo = Math.max(newStats.maxCombo, newStats.currentStreak);
  newStats.lastHitAt = at;

  const roomId = deadGnome.spawnPointId.split('-')[0] ?? '';
  if (roomId.startsWith('r')) {
    newStats.roomsWithHits = new Set([...newStats.roomsWithHits, roomId]);
  }

  if (deadGnome.scale < newStats.smallestGnomeScale) {
    newStats.smallestGnomeScale = deadGnome.scale;
  }

  const mult = getComboMultiplier(newStats.currentStreak);
  const expGained = Math.round(EXP_BASE * mult);
  newStats.totalExpGained += expGained;

  const popup: ExpPopup = {
    id: nextPopupId(),
    position: deadGnome.position,
    amount: expGained,
    mult,
    startedAt: at,
  };

  const gnomes = state.gnomes.filter((d) => d.id !== deadGnome.id);
  const dying: DyingGnome = {
    id: deadGnome.id,
    position: deadGnome.position,
    rotation: deadGnome.rotation,
    scale: deadGnome.scale,
    bodyColor: deadGnome.bodyColor,
    hatColor: deadGnome.hatColor,
    beardStyle: deadGnome.beardStyle,
    startedAt: at,
  };

  const won = gnomes.length === 0 && state.endedAt === null;

  return {
    gnomes,
    dyingGnomes: [...state.dyingGnomes, dying],
    beams,
    expPopups: [...state.expPopups, popup],
    lastShotAt: at,
    stats: newStats,
    hitFlash: true,
    comboDisplay: newStats.currentStreak >= 2 ? newStats.currentStreak : 0,
    ...(won ? { status: 'won' as const, endedAt: at } : {}),
  };
}
