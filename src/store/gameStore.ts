import { create } from 'zustand';
import type { Vector3Tuple } from 'three';
import type {
  BeamShot,
  ExpPopup,
  Gnome,
  DyingGnome,
  GameStatus,
  SpawnPoint,
} from '@/game/types';
import { shuffled } from '@/game/utils/shuffle';
import { randomPalette, randomScale, randomBeard } from '@/game/utils/gnomePalettes';
import type { WeaponId } from '@/game/weapons/types';

export const BEAM_DURATION_MS = 90;
export const DEATH_DURATION_MS = 380;
export const EXP_POPUP_DURATION_MS = 900;
export const EXP_BASE = 5;
const COMBO_WINDOW_MS = 5000;
const COMBO_MULTIPLIERS = [1.0, 1.4, 1.8, 2.0, 2.4, 2.8, 3.0] as const;

export function getComboMultiplier(streak: number): number {
  if (streak <= 0) return 1.0;
  const idx = Math.min(streak, COMBO_MULTIPLIERS.length) - 1;
  return COMBO_MULTIPLIERS[idx] ?? 1.0;
}

export interface ShotInput {
  at: number;
  beamFrom: Vector3Tuple;
  beamTo: Vector3Tuple;
  beamColor: string;
  beamRadius: number;
  deadGnome: Gnome | null;
}

export interface GameStats {
  shotsFired: number;
  shotsHit: number;
  currentStreak: number;
  maxCombo: number;
  lastHitAt: number;
  roomsWithHits: Set<string>;
  smallestGnomeScale: number;
  totalExpGained: number;
}

export interface GameState {
  status: GameStatus;
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
  setStatus: (status: GameStatus) => void;
  setCurrentWeapon: (id: WeaponId) => void;
  spawnGnomes: (pool: readonly SpawnPoint[], count: number) => void;
  triggerShot: (input: ShotInput) => void;
  purgeExpiredEffects: (now: number) => void;
  clearHitFlash: () => void;
  reset: () => void;
}

let beamCounter = 0;
const nextBeamId = (): string => `beam-${++beamCounter}`;
let popupCounter = 0;
const nextPopupId = (): string => `exp-${++popupCounter}`;

const emptyStats = (): GameStats => ({
  shotsFired: 0,
  shotsHit: 0,
  currentStreak: 0,
  maxCombo: 0,
  lastHitAt: 0,
  roomsWithHits: new Set(),
  smallestGnomeScale: 999,
  totalExpGained: 0,
});

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  gnomeTarget: 100,
  gnomes: [],
  dyingGnomes: [],
  beams: [],
  expPopups: [],
  startedAt: null,
  endedAt: null,
  lastShotAt: null,
  stats: emptyStats(),
  hitFlash: false,
  comboDisplay: 0,
  currentWeaponId: 'laser-pistol',
  setStatus: (status) => set({ status }),
  setCurrentWeapon: (id) => set({ currentWeaponId: id }),
  spawnGnomes: (pool, count = 100) =>
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
        gnomes,
        gnomeTarget: count,
        dyingGnomes: [],
        beams: [],
        expPopups: [],
        status: 'playing',
        startedAt: Date.now(),
        endedAt: null,
        lastShotAt: null,
        stats: emptyStats(),
        hitFlash: false,
        comboDisplay: 0,
      };
    }),
  triggerShot: ({ at, beamFrom, beamTo, beamColor, beamRadius, deadGnome }) =>
    set((state) => {
      const beam: BeamShot = {
        id: nextBeamId(),
        from: beamFrom,
        to: beamTo,
        color: beamColor,
        radius: beamRadius,
        startedAt: at,
      };
      const beams = [...state.beams, beam];
      const newStats = { ...state.stats };
      newStats.shotsFired += 1;

      if (deadGnome === null) {
        newStats.currentStreak = 0;
        return { beams, lastShotAt: at, stats: newStats, comboDisplay: 0 };
      }

      // Hit!
      newStats.shotsHit += 1;

      // Combo tracking
      const timeSinceLastHit = at - newStats.lastHitAt;
      if (timeSinceLastHit < COMBO_WINDOW_MS && newStats.lastHitAt > 0) {
        newStats.currentStreak += 1;
      } else {
        newStats.currentStreak = 1;
      }
      newStats.maxCombo = Math.max(newStats.maxCombo, newStats.currentStreak);
      newStats.lastHitAt = at;

      // Room tracking
      const roomId = deadGnome.spawnPointId.split('-')[0] ?? '';
      if (roomId.startsWith('r')) {
        newStats.roomsWithHits.add(roomId);
      }

      // Smallest gnome
      if (deadGnome.scale < newStats.smallestGnomeScale) {
        newStats.smallestGnomeScale = deadGnome.scale;
      }

      // EXP calculation with combo multiplier
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
      const expPopups = [...state.expPopups, popup];

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
      const dyingGnomes = [...state.dyingGnomes, dying];
      const won = gnomes.length === 0 && state.endedAt === null;
      return {
        gnomes,
        dyingGnomes,
        beams,
        expPopups,
        lastShotAt: at,
        stats: newStats,
        hitFlash: true,
        comboDisplay: newStats.currentStreak >= 2 ? newStats.currentStreak : 0,
        ...(won ? { status: 'won' as const, endedAt: at } : {}),
      };
    }),
  purgeExpiredEffects: (now) =>
    set((state) => {
      const beams = state.beams.filter(
        (b) => now - b.startedAt < BEAM_DURATION_MS,
      );
      const dyingGnomes = state.dyingGnomes.filter(
        (d) => now - d.startedAt < DEATH_DURATION_MS,
      );
      const expPopups = state.expPopups.filter(
        (p) => now - p.startedAt < EXP_POPUP_DURATION_MS,
      );
      if (
        beams.length === state.beams.length &&
        dyingGnomes.length === state.dyingGnomes.length &&
        expPopups.length === state.expPopups.length
      ) {
        return state;
      }
      return { beams, dyingGnomes, expPopups };
    }),
  clearHitFlash: () => set({ hitFlash: false }),
  reset: () =>
    set({
      gnomes: [],
      dyingGnomes: [],
      beams: [],
      expPopups: [],
      status: 'menu',
      startedAt: null,
      endedAt: null,
      lastShotAt: null,
      stats: emptyStats(),
      hitFlash: false,
      comboDisplay: 0,
    }),
}));
