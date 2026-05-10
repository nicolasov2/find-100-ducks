let ctx: AudioContext | null = null;
export let masterGain: GainNode | null = null;
export let musicGain: GainNode | null = null;
export let sfxGain: GainNode | null = null;

export function getCtx(): AudioContext {
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

export function initAudio(): void {
  getCtx();
}
