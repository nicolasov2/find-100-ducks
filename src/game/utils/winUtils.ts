export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getStars(ms: number): number {
  const sec = ms / 1000;
  if (sec <= 120) return 3;
  if (sec <= 300) return 2;
  return 1;
}
