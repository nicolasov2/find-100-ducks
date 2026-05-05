/**
 * AudioManager — Procedural audio using Web Audio API.
 * No external audio files. All sounds synthesized on the fly.
 */

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicPlaying = false;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.7;
    masterGain.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0.25;
    musicGain.connect(masterGain);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.6;
    sfxGain.connect(masterGain);
  }
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  return ctx;
}

/* ── Master volume ── */
export function setMasterVolume(v: number): void {
  getCtx();
  if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, v));
}

export function setSfxVolume(v: number): void {
  getCtx();
  if (sfxGain) sfxGain.gain.value = Math.max(0, Math.min(1, v));
}

export function setMusicVolume(v: number): void {
  getCtx();
  if (musicGain) musicGain.gain.value = Math.max(0, Math.min(1, v));
}

/* ── Laser shot (chirp/zap) ── */
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

/* ── Duck hit (pop + quack) ── */
export function playDuckHit(): void {
  const c = getCtx();
  if (!sfxGain) return;
  const now = c.currentTime;

  // Pop
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

  // Quack
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

/* ── Footstep (thud) ── */
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

/* ── Ambient quack (random pitch) ── */
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

/* ── Victory fanfare ── */
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

/* ── Background music (ambient drone loop) ── */
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

/* ── Initialize on first user interaction ── */
export function initAudio(): void {
  getCtx();
}
