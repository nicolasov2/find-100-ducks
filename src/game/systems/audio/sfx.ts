import { getCtx, sfxGain } from './audioContext';

export function playLaserShot(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;

  const osc = c.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);

  const g = c.createGain();
  g.gain.setValueAtTime(0.3, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(g);
  g.connect(sfxGain);
  osc.start(now);
  osc.stop(now + 0.15);
}

export function playGnomeHit(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;

  const pop = c.createOscillator();
  pop.type = 'sine';
  pop.frequency.setValueAtTime(600, now);
  pop.frequency.exponentialRampToValueAtTime(100, now + 0.08);
  const pg = c.createGain();
  pg.gain.setValueAtTime(0.4, now);
  pg.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  pop.connect(pg);
  pg.connect(sfxGain);
  pop.start(now);
  pop.stop(now + 0.1);

  const quack = c.createOscillator();
  quack.type = 'square';
  quack.frequency.setValueAtTime(800, now + 0.02);
  quack.frequency.exponentialRampToValueAtTime(300, now + 0.12);
  const qg = c.createGain();
  qg.gain.setValueAtTime(0.15, now + 0.02);
  qg.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  quack.connect(qg);
  qg.connect(sfxGain);
  quack.start(now + 0.02);
  quack.stop(now + 0.18);
}

export function playFootstep(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;

  const bufferSize = 4096;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 800);
  }

  const source = c.createBufferSource();
  source.buffer = buffer;

  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 300;

  const g = c.createGain();
  g.gain.setValueAtTime(0.12, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  source.connect(filter);
  filter.connect(g);
  g.connect(sfxGain);
  source.start(now);
  source.stop(now + 0.1);
}

export function playAmbientQuack(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;
  const pitch = 500 + Math.random() * 400;

  const osc = c.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(pitch, now);
  osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 0.15);

  const g = c.createGain();
  g.gain.setValueAtTime(0.04, now);
  g.gain.linearRampToValueAtTime(0.06, now + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(g);
  g.connect(sfxGain);
  osc.start(now);
  osc.stop(now + 0.2);
}

export function playVictory(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6

  notes.forEach((freq, i) => {
    const t = now + i * 0.15;
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;

    const g = c.createGain();
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(g);
    g.connect(sfxGain!);
    osc.start(t);
    osc.stop(t + 0.4);
  });
}
