import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playFlip: () => void;
  playBuzzer: () => void;
  playSuccess: () => void;
  playReveal: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtxRef.current = new AudioContextClass();
    }
  }, []);

  const ensureContext = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playOscillator = (
    type: OscillatorType,
    freqStart: number,
    freqEnd: number,
    duration: number,
    volume: number = 0.1,
    delay: number = 0
  ) => {
    if (isMuted || !audioCtxRef.current) return;
    ensureContext();
    
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, t);
    if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration);
    }

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  };

  const playHover = () => {
    // High tech chirp
    playOscillator('sine', 2000, 500, 0.03, 0.02);
  };

  const playClick = () => {
    // Mechanical click
    playOscillator('square', 150, 50, 0.05, 0.05);
  };

  const playFlip = () => {
    // Whoosh
    playOscillator('triangle', 200, 50, 0.2, 0.1);
  };

  const playBuzzer = () => {
    // Harsh error tone
    playOscillator('sawtooth', 110, 80, 0.4, 0.15);
    playOscillator('sawtooth', 115, 85, 0.4, 0.15); // Dissonance
  };

  const playSuccess = () => {
    // Ascending major triad
    playOscillator('triangle', 440, 440, 0.1, 0.1, 0);
    playOscillator('triangle', 554, 554, 0.1, 0.1, 0.1);
    playOscillator('triangle', 659, 659, 0.2, 0.1, 0.2);
  };

  const playReveal = () => {
    // Sci-fi scan sound
    playOscillator('sine', 800, 1200, 0.3, 0.05);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <SoundContext.Provider value={{ playHover, playClick, playFlip, playBuzzer, playSuccess, playReveal, toggleMute, isMuted }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
};