/**
 * AMBIENT AUDIO & SOUND EFFECTS ENGINE
 * 
 * Provides:
 * 1. Background MP3 audio player (e.g. "Die With A Smile" by Lady Gaga & Bruno Mars)
 * 2. Web Audio API synthesized acoustic "Die With A Smile" harmonic progression fallback
 * 3. Interactive sound effects: chime, paper rustle, candle blow, secret unlock, checkboxes
 */

import { soundtrack } from '../data/songs';
import { getAssetUrl } from './assets';

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.audioElement = null;
    this.isPlayingAmbient = false;
    this.isPlayingRealAudio = false;
    this.ambientInterval = null;
    this.isMuted = false;
    this.volume = 0.65;
    this.playlist = soundtrack;
    this.currentTrackIndex = 0;
    this.currentTrackSrc = soundtrack[0]?.audioSrc || "/assets/music/tenu-sang-rakhna.mp3";
    this.onStateChangeCallback = null;
    this.onTrackChangeCallback = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft acoustic chime tone
  playNote(frequency, duration = 1.8, type = 'sine', gainVal = 0.15) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainVal * this.volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  // Play a gentle chord (array of frequencies)
  playChord(frequencies, duration = 2.4, gainVal = 0.08) {
    if (this.isMuted) return;
    frequencies.forEach((f, idx) => {
      setTimeout(() => {
        this.playNote(f, duration, 'sine', gainVal);
      }, idx * 40);
    });
  }

  /**
   * Synthesized "Die With A Smile" acoustic melody & chord progression
   * Key of C / F-G-Em-Am / Dm-G-C
   * Fmaj7 -> G -> Em7 -> Am -> Dm7 -> G7 -> C
   */
  startDieWithASmileSynth() {
    if (this.isPlayingAmbient) return;
    this.initContext();
    this.isPlayingAmbient = true;

    // "Die With A Smile" sequence: chord + melodic motif
    const sequence = [
      // Fmaj7 ("If the world was ending...")
      { chord: [174.61, 261.63, 329.63, 440.00], melody: [523.25, 493.88, 440.00, 392.00, 440.00] },
      // G ("I'd wanna be next to you...")
      { chord: [196.00, 293.66, 392.00, 493.88], melody: [392.00, 440.00, 523.25, 587.33, 659.25] },
      // Em7 ("If the party was over...")
      { chord: [164.81, 246.94, 329.63, 392.00], melody: [523.25, 493.88, 440.00, 392.00, 440.00] },
      // Am7 ("And our time on earth was through...")
      { chord: [220.00, 261.63, 329.63, 523.25], melody: [392.00, 440.00, 523.25, 587.33, 659.25] },
      // Dm7 ("I'd wanna hold you just for a while...")
      { chord: [146.83, 220.00, 349.23, 440.00], melody: [659.25, 783.99, 659.25, 587.33, 523.25] },
      // G7 / C ("And die with a smile...")
      { chord: [196.00, 246.94, 349.23, 392.00], melody: [523.25, 587.33, 523.25, 523.25] },
      // C Resolution
      { chord: [130.81, 261.63, 329.63, 523.25], melody: [523.25, 659.25, 783.99] }
    ];

    let step = 0;
    const playNextBar = () => {
      if (!this.isPlayingAmbient) return;

      const current = sequence[step % sequence.length];
      
      // Play warm acoustic chord
      this.playChord(current.chord, 3.2, 0.09);

      // Play soft melody notes in time
      current.melody.forEach((note, nIdx) => {
        setTimeout(() => {
          if (!this.isPlayingAmbient) return;
          this.playNote(note, 1.6, 'sine', 0.12);
        }, 400 + nIdx * 350);
      });

      step++;
      this.ambientInterval = setTimeout(playNextBar, 2600);
    };

    playNextBar();
  }

  stopDieWithASmileSynth() {
    this.isPlayingAmbient = false;
    if (this.ambientInterval) {
      clearTimeout(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  /**
   * Main Background Music Handler
   * Tries to play real MP3 audio (e.g. Die With A Smile). If file is not yet available,
   * seamlessly falls back to the synthesized acoustic "Die With A Smile" theme!
   */
  /**
   * Main Background Music Handler with Automatic Playlist Cycling
   */
  async startBackgroundMusic(trackSrc = null) {
    this.initContext();
    if (trackSrc) {
      this.currentTrackSrc = trackSrc;
      // Sync playlist index if match found
      const matchedIdx = this.playlist.findIndex(t => t.audioSrc === trackSrc);
      if (matchedIdx !== -1) {
        this.currentTrackIndex = matchedIdx;
      }
    } else {
      this.currentTrackSrc = this.playlist[this.currentTrackIndex]?.audioSrc || "/assets/music/tenu-sang-rakhna.mp3";
    }

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = false; // Disable single song loop to allow playlist cycling!
      this.audioElement.volume = this.volume;

      // When one song finishes, automatically cycle to the next song!
      this.audioElement.addEventListener('ended', () => {
        console.log("Song finished, advancing to next song in playlist cycle...");
        this.playNextTrack(true);
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn("Audio element error on src:", this.audioElement.src, e);
      });
    }

    const resolvedTrackSrc = getAssetUrl(this.currentTrackSrc);
    this.audioElement.src = resolvedTrackSrc;
    this.audioElement.volume = this.volume;

    try {
      await this.audioElement.play();
      this.isPlayingRealAudio = true;
      this.stopDieWithASmileSynth();
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      return true;
    } catch (err) {
      console.log("MP3 playback fallback to synth:", err.message);
      this.isPlayingRealAudio = false;
      this.startDieWithASmileSynth();
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      return true;
    }
  }

  playTrackAtIndex(index) {
    if (!this.playlist || this.playlist.length === 0) return;
    this.currentTrackIndex = ((index % this.playlist.length) + this.playlist.length) % this.playlist.length;
    const track = this.playlist[this.currentTrackIndex];
    if (this.onTrackChangeCallback) {
      this.onTrackChangeCallback(this.currentTrackIndex, track);
    }
    return this.startBackgroundMusic(track.audioSrc);
  }

  playNextTrack(isAuto = false) {
    if (!this.playlist || this.playlist.length === 0) return;
    const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    return this.playTrackAtIndex(nextIndex);
  }

  playPrevTrack() {
    if (!this.playlist || this.playlist.length === 0) return;
    const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    return this.playTrackAtIndex(prevIndex);
  }

  setOnTrackChange(callback) {
    this.onTrackChangeCallback = callback;
  }

  stopBackgroundMusic() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch (e) {
        console.warn(e);
      }
    }
    this.isPlayingRealAudio = false;
    this.stopDieWithASmileSynth();
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
  }

  toggleBackgroundMusic(trackSrc = null) {
    if (this.isPlayingRealAudio || this.isPlayingAmbient) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic(trackSrc);
      return true;
    }
  }

  // Backwards compatibility alias
  startAmbientMusic() {
    return this.startBackgroundMusic();
  }

  stopAmbientMusic() {
    return this.stopBackgroundMusic();
  }

  toggleAmbientMusic() {
    return this.toggleBackgroundMusic();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  // SFX: Envelope open / paper rustle chime
  playEnvelopeOpen() {
    if (this.isMuted) return;
    this.initContext();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, i) => {
      setTimeout(() => this.playNote(freq, 1.5, 'sine', 0.14), i * 70);
    });
  }

  // SFX: Secret unlocked celebratory chime
  playSecretUnlocked() {
    if (this.isMuted) return;
    this.initContext();
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((f, i) => {
      setTimeout(() => this.playNote(f, 2.0, 'sine', 0.18), i * 90);
    });
  }

  // SFX: Candle blow out sound (soft noise whoosh + bell)
  playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 1.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.9);

      // Followed by high sparkle
      setTimeout(() => {
        this.playNote(880, 2.5, 'sine', 0.15);
        this.playNote(1318.51, 3.0, 'sine', 0.12);
      }, 500);
    } catch (e) {
      console.warn("Blow SFX error:", e);
    }
  }

  // SFX: Checkbox tick
  playCheckSparkle() {
    if (this.isMuted) return;
    this.playNote(783.99, 0.4, 'triangle', 0.1);
    setTimeout(() => this.playNote(1046.50, 0.6, 'sine', 0.12), 60);
  }
}

export const soundEngine = new SoundEngine();
