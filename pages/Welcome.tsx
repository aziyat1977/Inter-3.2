import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { UserMode } from '../types';
import GlitchText from '../components/GlitchText';
import Typewriter from '../components/Typewriter';
import { GraduationCap, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
  const { setUserMode } = useTheme();
  const { playClick, playHover, playSuccess } = useSound();
  const navigate = useNavigate();

  const handleSelect = (mode: UserMode) => {
    playSuccess();
    setUserMode(mode);
    navigate('/intro');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Central HUD */}
      <div className="flex flex-col items-center gap-12 max-w-6xl w-full z-10">
        <div className="text-center space-y-4">
           <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
              <ShieldCheck size={16} className="text-cyan-600 dark:text-neon-cyan" />
              <p className="font-mono text-xs tracking-[0.5em] text-cyan-600 dark:text-neon-cyan">SECURE CONNECTION ESTABLISHED</p>
           </div>
           
           <GlitchText 
             text="SYSTEM LOGIN" 
             className="text-6xl md:text-9xl font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-gray-500"
           />
           
           <div className="h-8">
             <Typewriter 
                text="Please authenticate your clearance level..." 
                speed={40} 
                delay={0.5} 
                className="font-mono text-sm md:text-xl text-slate-600 dark:text-gray-400"
             />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-8">
          {/* Student Card */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={playHover}
            onClick={() => handleSelect(UserMode.STUDENT)}
            className="group relative h-80 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-sm transition-all hover:border-cyan-500 dark:hover:border-neon-cyan hover:shadow-[0_0_50px_rgba(0,243,255,0.15)] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-8 h-full flex flex-col justify-between relative z-10">
               <div>
                 <Users size={48} className="text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors mb-4" />
                 <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">AGENT</h2>
                 <p className="font-mono text-xs text-cyan-600 dark:text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity mt-1">CLEARANCE: LEVEL 1</p>
               </div>
               
               <div className="border-t border-black/10 dark:border-white/10 pt-4">
                 <p className="text-slate-500 dark:text-gray-400 font-sans text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                   Access training simulation. Objectives: Deception, Vocabulary, Grammar mastery.
                 </p>
               </div>
            </div>
            
            {/* Hover Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Teacher Card */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={playHover}
            onClick={() => handleSelect(UserMode.TEACHER)}
            className="group relative h-80 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-sm transition-all hover:border-yellow-500 dark:hover:border-neon-yellow hover:shadow-[0_0_50px_rgba(250,204,21,0.15)] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-8 h-full flex flex-col justify-between relative z-10">
               <div>
                 <GraduationCap size={48} className="text-slate-400 dark:text-gray-500 group-hover:text-yellow-600 dark:group-hover:text-neon-yellow transition-colors mb-4" />
                 <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-neon-yellow transition-colors">ADMIN</h2>
                 <p className="font-mono text-xs text-yellow-600 dark:text-neon-yellow opacity-0 group-hover:opacity-100 transition-opacity mt-1">CLEARANCE: UNRESTRICTED</p>
               </div>
               
               <div className="border-t border-black/10 dark:border-white/10 pt-4">
                 <p className="text-slate-500 dark:text-gray-400 font-sans text-sm group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                   Access solution keys, pedagogical notes, and monitoring tools.
                 </p>
               </div>
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Decorative Bottom */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default Welcome;