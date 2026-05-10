/**
 * AudioManager — Procedural audio using Web Audio API.
 * No external audio files. All sounds synthesized on the fly.
 */

export {
  setMasterVolume,
  setSfxVolume,
  setMusicVolume,
  initAudio,
} from './audio/audioContext';

export {
  playLaserShot,
  playGnomeHit,
  playFootstep,
  playAmbientQuack,
  playVictory,
} from './audio/sfx';

export { startMusic, stopMusic } from './audio/music';
