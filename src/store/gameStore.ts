import { create } from 'zustand';
import type { BeamShot, DyingGnome, ExpPopup, Gnome, GameStatus, LevelId, SpawnPoint } from '@/game/types';
import type { ShotInput, GameStats } from '@/store/gameTypes';
import { shuffled } from '@/game/utils/shuffle';
import { randomPalette, randomScale, randomBeard } from '@/game/utils/gnomePalettes';
import type { WeaponId } from '@/game/weapons/types';
import {
  BEAM_DURATION_MS, DEATH_DURATION_MS, EXP_POPUP_DURATION_MS,
  HINT_DURATION_MS, HINT_EXP_COST, HINT_AUTO_GLOW_THRESHOLD, EXP_BASE,
} from '@/store/gameConstants';
import { getComboMultiplier, COMBO_WINDOW_MS } from '@/game/utils/comboUtils';
import { applyShotReducer } from '@/store/reducers/shotReducer';
import { applyPurgeReducer } from '@/store/reducers/purgeReducer';

export {
  BEAM_DURATION_MS, DEATH_DURATION_MS, EXP_POPUP_DURATION_MS,
  HINT_DURATION_MS, HINT_EXP_COST, HINT_AUTO_GLOW_THRESHOLD, EXP_BASE,
  getComboMultiplier,
};

export type { ShotInput, GameStats } from '@/store/gameTypes';

export interface GameState {
  status: GameStatus;
  level: LevelId;
  gnomeTarget: number;
  gnomes: readonly Gnome[];
  dyingGnomes: readonly DyingGnome[];
  beams: readonly BeamShot[];
  expPopups: readonly ExpPopup[];
  startedAt: number | null;
  endedAt: number | null;
  lastShotAt: number | null;
  stats: GameStats;
  hitFlash: boolean;
  comboDisplay: number;
  currentWeaponId: WeaponId;
  hintActivatedAt: number | null;
  setStatus: (status: GameStatus) => void;
  setCurrentWeapon: (id: WeaponId) => void;
  triggerHint: () => void;
  spendGameExp: (amount: number) => boolean;
  spawnGnomes: (pool: readonly SpawnPoint[], count: number, level?: LevelId) => void;
  triggerShot: (input: ShotInput) => void;
  purgeExpiredEffects: (now: number) => void;
  clearHitFlash: () => void;
  reset: () => void;
}

const emptyStats = (): GameStats => ({
  shotsFired: 0, shotsHit: 0, currentStreak: 0, maxCombo: 0, lastHitAt: 0,
  roomsWithHits: new Set(), smallestGnomeScale: 999, totalExpGained: 0, expSpent: 0,
});

export const useGameStore = create<GameState>((set) => ({
  status: 'menu', level: 'mansion', gnomeTarget: 100, gnomes: [], dyingGnomes: [], beams: [], expPopups: [],
  startedAt: null, endedAt: null, lastShotAt: null, stats: emptyStats(), hitFlash: false,
  comboDisplay: 0, currentWeaponId: 'laser-pistol', hintActivatedAt: null,

  setStatus: (status) => set({ status }),
  setCurrentWeapon: (id) => set({ currentWeaponId: id }),
  triggerHint: () => set({ hintActivatedAt: Date.now() }),

  spendGameExp: (amount) => {
    let ok = false;
    set((state) => {
      const available = state.stats.totalExpGained - state.stats.expSpent;
      if (available < amount) return state;
      ok = true;
      return { stats: { ...state.stats, expSpent: state.stats.expSpent + amount } };
    });
    return ok;
  },

  spawnGnomes: (pool, count = 100, level = 'mansion') =>
    set(() => {
      const picked = shuffled(pool).slice(0, count);
      const gnomes: Gnome[] = picked.map((sp, i) => {
        const palette = randomPalette();
        return {
          id: `gnome-${String(i).padStart(3, '0')}`,
          spawnPointId: sp.id,
          position: [sp.position[0], sp.position[1], sp.position[2]],
          rotation: [0, Math.random() * Math.PI * 2, 0],
          scale: randomScale(),
          bodyColor: palette.bodyColor,
          hatColor: palette.hatColor,
          beardStyle: randomBeard(),
        };
      });
      return {
        gnomes, level, gnomeTarget: count, dyingGnomes: [], beams: [], expPopups: [],
        status: 'playing', startedAt: Date.now(), endedAt: null, lastShotAt: null,
        stats: emptyStats(), hitFlash: false, comboDisplay: 0, hintActivatedAt: null,
      };
    }),

  triggerShot: (input) =>
    set((state) => {
      const result = applyShotReducer(state, input);
      return result.status === 'won'
        ? { ...result, status: 'won' as const }
        : result;
    }),

  purgeExpiredEffects: (now) =>
    set((state) => {
      const result = applyPurgeReducer(state, now);
      return result === null ? state : result;
    }),

  clearHitFlash: () => set({ hitFlash: false }),

  reset: () => set({
    gnomes: [], dyingGnomes: [], beams: [], expPopups: [], status: 'menu',
    startedAt: null, endedAt: null, lastShotAt: null, stats: emptyStats(),
    hitFlash: false, comboDisplay: 0, hintActivatedAt: null,
  }),
}));
