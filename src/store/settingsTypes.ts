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
  { id: 'sharp_eye', title: 'Ojo de Águila', icon: '🔫', description: '10 gnomos sin fallar' },
  { id: 'on_fire', title: 'En Llamas', icon: '🔥', description: 'Combo de 5 gnomos seguidos' },
  { id: 'explorer', title: 'Explorador', icon: '🔍', description: 'Encontrar gnomos en las 3 salas' },
  { id: 'mini_hunter', title: 'Mini Hunter', icon: '👶', description: 'Encontrar un gnomo escala < 0.4' },
  { id: 'perfect', title: 'Perfecto', icon: '🎯', description: '0 disparos fallidos' },
  { id: 'lightning', title: 'Lightning', icon: '⚡', description: 'Terminar en menos de 2 min' },
  { id: 'weapons_master', title: 'Maestro de Armas', icon: '🔫', description: 'Desbloquear las 4 armas' },
];
