import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { UserMode } from '../types';
import GlitchText from '../components/GlitchText';
import { GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
  const { setUserMode } = useTheme();
  const { playClick, playHover, playSuccess } = useSound();
  const navigate = useNavigate();

  const handleSelect = (mode: UserMode) => {
    playSuccess(); // Nice sound when selecting role
    setUserMode(mode);
    navigate('/intro');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 gap-12">
      <div className="text-center space-y-6">
        <p className="font-display tracking-[0.5em] text-sm md:text-xl opacity-60">INITIALIZING SYSTEM...</p>
        <GlitchText 
          text="WHO ARE YOU?" 
          className="text-5xl md:text-8xl font-bold font-display tracking-tighter"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.button
          whileHover={{ scale: 1.05, borderColor: '#00f3ff' }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={playHover}
          onClick={() => handleSelect(UserMode.STUDENT)}
          className="group relative h-80 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center gap-6 p-8 transition-all hover:shadow-[0_0_50px_rgba(0,243,255,0.2)] hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Users size={64} className="text-gray-400 group-hover:text-neon-cyan transition-colors" />
          <div className="text-center relative z-10">
            <h2 className="text-3xl font-display font-bold mb-2 group-hover:text-neon-cyan">STUDENT</h2>
            <p className="text-sm opacity-60 font-sans">I am here to learn and deceive.</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, borderColor: '#facc15' }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={playHover}
          onClick={() => handleSelect(UserMode.TEACHER)}
          className="group relative h-80 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center gap-6 p-8 transition-all hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <GraduationCap size={64} className="text-gray-400 group-hover:text-neon-yellow transition-colors" />
          <div className="text-center relative z-10">
            <h2 className="text-3xl font-display font-bold mb-2 group-hover:text-neon-yellow">TEACHER</h2>
            <p className="text-sm opacity-60 font-sans">I am here to guide and correct.</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Welcome;