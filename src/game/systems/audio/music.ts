import { getCtx, musicGain } from './audioContext';

let musicPlaying = false;

export function startMusic(): void {
  if (musicPlaying) return;
  getCtx();
  if (!musicGain) return;
  musicPlaying = true;

  function playChord(): void {
    if (!musicPlaying || !musicGain) return;
    const cc = getCtx();
    const now = cc.currentTime;
    const chords = [
      [130.81, 164.81, 196.00], // C3 E3 G3
      [146.83, 185.00, 220.00], // D3 F#3 A3
      [164.81, 196.00, 246.94], // E3 G3 B3
      [130.81, 155.56, 196.00], // C3 Eb3 G3
    ];
    const chord = chords[Math.floor(Math.random() * chords.length)]!;

    chord.forEach((freq) => {
      const osc = cc.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const g = cc.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.08, now + 1);
      g.gain.linearRampToValueAtTime(0.06, now + 3);
      g.gain.linearRampToValueAtTime(0, now + 4.5);

      osc.connect(g);
      g.connect(musicGain!);
      osc.start(now);
      osc.stop(now + 5);
    });

    if (musicPlaying) {
      setTimeout(playChord, 4000 + Math.random() * 2000);
    }
  }

  playChord();
}

export function stopMusic(): void {
  musicPlaying = false;
}
