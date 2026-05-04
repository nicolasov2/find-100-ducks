import { create } from 'zustand';
import type { GameStatus } from '@/game/types';

export interface GameState {
  status: GameStatus;
  setStatus: (status: GameStatus) => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'menu',
  setStatus: (status) => set({ status }),
}));
