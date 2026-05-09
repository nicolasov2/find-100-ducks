import type { BeamShot, DyingGnome, ExpPopup } from '@/game/types';
import { BEAM_DURATION_MS, DEATH_DURATION_MS, EXP_POPUP_DURATION_MS, HINT_DURATION_MS } from '@/store/gameConstants';

export interface PurgeInput {
  beams: readonly BeamShot[];
  dyingGnomes: readonly DyingGnome[];
  expPopups: readonly ExpPopup[];
  hintActivatedAt: number | null;
}

export type PurgeResult = PurgeInput | null;

/** Returns null if nothing changed (caller should return same state reference). */
export function applyPurgeReducer(input: PurgeInput, now: number): PurgeResult {
  const beams = input.beams.filter((b) => now - b.startedAt < BEAM_DURATION_MS);
  const dyingGnomes = input.dyingGnomes.filter((d) => now - d.startedAt < DEATH_DURATION_MS);
  const expPopups = input.expPopups.filter((p) => now - p.startedAt < EXP_POPUP_DURATION_MS);
  const hintExpired =
    input.hintActivatedAt !== null && now - input.hintActivatedAt > HINT_DURATION_MS;

  if (
    beams.length === input.beams.length &&
    dyingGnomes.length === input.dyingGnomes.length &&
    expPopups.length === input.expPopups.length &&
    !hintExpired
  ) {
    return null;
  }

  return {
    beams,
    dyingGnomes,
    expPopups,
    hintActivatedAt: hintExpired ? null : input.hintActivatedAt,
  };
}
