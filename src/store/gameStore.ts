import { create } from 'zustand';
import type { Vector3Tuple } from 'three';
import type {
  BeamShot,
  Gnome,
  DyingGnome,
  GameStatus,
  SpawnPoint,
} from '@/game/types';
import { shuffled } from '@/game/utils/shuffle';
import { randomPalette, randomScale } from '@/game/utils/gnomePalettes';

export const BEAM_DURATION_MS = 90;
export const DEATH_DURATION_MS = 380;
const COMBO_WINDOW_MS = 5000;

export interface ShotInput {
  at: number;
  beamFrom: Vector3Tuple;
  beamTo: Vector3Tuple;
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
}

export interface GameState {
  status: GameStatus;
  gnomeTarget: number;
  gnomes: readonly Gnome[];
  dyingGnomes: readonly DyingGnome[];
  beams: readonly BeamShot[];
  startedAt: number | null;
  endedAt: number | null;
  lastShotAt: number | null;
  stats: GameStats;
  hitFlash: boolean;
  comboDisplay: number;
  setStatus: (status: GameStatus) => void;
  spawnGnomes: (pool: readonly SpawnPoint[], count: number) => void;
  triggerShot: (input: ShotInput) => void;
  purgeExpiredEffects: (now: number) => void;
  clearHitFlash: () => void;
  reset: () => void;
}

let beamCounter = 0;
const nextBeamId = (): string => `beam-${++beamCounter}`;

const emptyStats = (): GameStats => ({
  shotsFired: 0,
  shotsHit: 0,
  currentStreak: 0,
  maxCombo: 0,
  lastHitAt: 0,
  roomsWithHits: new Set(),
  smallestGnomeScale: 999,
});

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  gnomeTarget: 100,
  gnomes: [],
  dyingGnomes: [],
  beams: [],
  startedAt: null,
  endedAt: null,
  lastShotAt: null,
  stats: emptyStats(),
  hitFlash: false,
  comboDisplay: 0,
  setStatus: (status) => set({ status }),
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
          beakColor: palette.beakColor,
        };
      });
      return {
        gnomes,
        gnomeTarget: count,
        dyingGnomes: [],
        beams: [],
        status: 'playing',
        startedAt: Date.now(),
        endedAt: null,
        lastShotAt: null,
        stats: emptyStats(),
        hitFlash: false,
        comboDisplay: 0,
      };
    }),
  triggerShot: ({ at, beamFrom, beamTo, deadGnome }) =>
    set((state) => {
      const beam: BeamShot = {
        id: nextBeamId(),
        from: beamFrom,
        to: beamTo,
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

      const gnomes = state.gnomes.filter((d) => d.id !== deadGnome.id);
      const dying: DyingGnome = {
        id: deadGnome.id,
        position: deadGnome.position,
        rotation: deadGnome.rotation,
        scale: deadGnome.scale,
        bodyColor: deadGnome.bodyColor,
        beakColor: deadGnome.beakColor,
        startedAt: at,
      };
      const dyingGnomes = [...state.dyingGnomes, dying];
      const won = gnomes.length === 0 && state.endedAt === null;
      return {
        gnomes,
        dyingGnomes,
        beams,
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
      if (
        beams.length === state.beams.length &&
        dyingGnomes.length === state.dyingGnomes.length
      ) {
        return state;
      }
      return { beams, dyingGnomes };
    }),
  clearHitFlash: () => set({ hitFlash: false }),
  reset: () =>
    set({
      gnomes: [],
      dyingGnomes: [],
      beams: [],
      status: 'menu',
      startedAt: null,
      endedAt: null,
      lastShotAt: null,
      stats: emptyStats(),
      hitFlash: false,
      comboDisplay: 0,
    }),
}));
