import { create } from 'zustand';
import type { Duck, GameStatus, SpawnPoint } from '@/game/types';
import { shuffled } from '@/game/utils/shuffle';

export const DUCK_TARGET = 100;

export interface GameState {
  status: GameStatus;
  ducks: readonly Duck[];
  startedAt: number | null;
  endedAt: number | null;
  setStatus: (status: GameStatus) => void;
  spawnDucks: (pool: readonly SpawnPoint[]) => void;
  hitDuck: (id: string) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  ducks: [],
  startedAt: null,
  endedAt: null,
  setStatus: (status) => set({ status }),
  spawnDucks: (pool) =>
    set(() => {
      const picked = shuffled(pool).slice(0, DUCK_TARGET);
      const ducks: Duck[] = picked.map((sp, i) => ({
        id: `duck-${String(i).padStart(3, '0')}`,
        spawnPointId: sp.id,
        position: [sp.position[0], sp.position[1], sp.position[2]],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        alive: true,
      }));
      return { ducks, status: 'playing', startedAt: Date.now(), endedAt: null };
    }),
  hitDuck: (id) =>
    set((state) => {
      const ducks = state.ducks.map((d) =>
        d.id === id ? { ...d, alive: false } : d,
      );
      const remaining = ducks.filter((d) => d.alive).length;
      if (remaining === 0 && state.endedAt === null) {
        return { ducks, status: 'won', endedAt: Date.now() };
      }
      return { ducks };
    }),
  reset: () =>
    set({ ducks: [], status: 'menu', startedAt: null, endedAt: null }),
}));
