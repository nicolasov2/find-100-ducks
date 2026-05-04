import { create } from 'zustand';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface LeaderboardEntry {
  time: number;
  date: string;
  difficulty: Difficulty;
  accuracy: number;
  maxCombo: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export const ACHIEVEMENTS_DEF: readonly Omit<Achievement, 'unlocked'>[] = [
  { id: 'speed_runner', title: 'Speed Runner', icon: '🏃', description: 'Terminar en menos de 3 min' },
  { id: 'sharp_eye', title: 'Ojo de Águila', icon: '🔫', description: '10 patos sin fallar' },
  { id: 'on_fire', title: 'En Llamas', icon: '🔥', description: 'Combo de 5 patos seguidos' },
  { id: 'explorer', title: 'Explorador', icon: '🔍', description: 'Encontrar patos en las 3 salas' },
  { id: 'mini_hunter', title: 'Mini Hunter', icon: '👶', description: 'Encontrar un pato escala < 0.4' },
  { id: 'perfect', title: 'Perfecto', icon: '🎯', description: '0 disparos fallidos' },
  { id: 'lightning', title: 'Lightning', icon: '⚡', description: 'Terminar en menos de 2 min' },
];

export interface SettingsState {
  /* Settings */
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  sensitivity: number;
  difficulty: Difficulty;

  /* Leaderboard */
  leaderboard: LeaderboardEntry[];

  /* Achievements */
  unlockedAchievements: string[];

  /* Actions */
  setMasterVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  setMusicVolume: (v: number) => void;
  setSensitivity: (v: number) => void;
  setDifficulty: (d: Difficulty) => void;
  addLeaderboardEntry: (entry: LeaderboardEntry) => void;
  unlockAchievement: (id: string) => void;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded */ }
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  masterVolume: loadFromStorage('f100d_masterVol', 0.7),
  sfxVolume: loadFromStorage('f100d_sfxVol', 0.6),
  musicVolume: loadFromStorage('f100d_musicVol', 0.25),
  sensitivity: loadFromStorage('f100d_sensitivity', 1.0),
  difficulty: loadFromStorage<Difficulty>('f100d_difficulty', 'normal'),
  leaderboard: loadFromStorage<LeaderboardEntry[]>('f100d_leaderboard', []),
  unlockedAchievements: loadFromStorage<string[]>('f100d_achievements', []),

  setMasterVolume: (v) => { set({ masterVolume: v }); saveToStorage('f100d_masterVol', v); },
  setSfxVolume: (v) => { set({ sfxVolume: v }); saveToStorage('f100d_sfxVol', v); },
  setMusicVolume: (v) => { set({ musicVolume: v }); saveToStorage('f100d_musicVol', v); },
  setSensitivity: (v) => { set({ sensitivity: v }); saveToStorage('f100d_sensitivity', v); },
  setDifficulty: (d) => { set({ difficulty: d }); saveToStorage('f100d_difficulty', d); },

  addLeaderboardEntry: (entry) => {
    const lb = [...get().leaderboard, entry]
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
    set({ leaderboard: lb });
    saveToStorage('f100d_leaderboard', lb);
  },

  unlockAchievement: (id) => {
    const current = get().unlockedAchievements;
    if (current.includes(id)) return;
    const next = [...current, id];
    set({ unlockedAchievements: next });
    saveToStorage('f100d_achievements', next);
  },
}));

/* Difficulty presets */
export function getDifficultyConfig(d: Difficulty) {
  switch (d) {
    case 'easy': return { duckCount: 150, glowDistance: 8, glowFadeStart: 5, scaleMin: 0.5 };
    case 'normal': return { duckCount: 100, glowDistance: 5, glowFadeStart: 3, scaleMin: 0.35 };
    case 'hard': return { duckCount: 100, glowDistance: 0, glowFadeStart: 0, scaleMin: 0.25 };
  }
}
