import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';
import { RotateCcw } from 'lucide-react';

interface TimedVocabRevealProps {
  en: React.ReactNode;
  ru: string;
  uz: string;
}

const TimedVocabReveal: React.FC<TimedVocabRevealProps> = ({ en, ru, uz }) => {
  const [stage, setStage] = useState<'EN' | 'TRANS'>('EN');
  const { playReveal, playClick } = useSound();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (stage === 'EN') {
        timer = setTimeout(() => {
            playReveal();
            setStage('TRANS');
        }, 4000);
    }
    return () => clearTimeout(timer);
  }, [stage, playReveal]);

  const handleReplay = () => {
    playClick();
    setStage('EN');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {stage === 'EN' ? (
          <motion.div
            key="english"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div className="w-full h-[60%] md:h-[70%] flex items-center justify-center relative z-10">
                {en}
            </div>
            
            {/* Progress Bar */}
            <div className="w-48 md:w-64 h-1 bg-gray-200 dark:bg-white/10 rounded-full mt-4 md:mt-8 overflow-hidden">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                />
            </div>
            <p className="text-[10px] text-neon-cyan font-mono mt-2 tracking-widest animate-pulse">MEMORIZING...</p>
          </motion.div>
        ) : (
          <motion.div
            key="translations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6"
          >
             {/* Russian Card */}
             <div className="w-full max-w-2xl bg-white/60 dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-transparent border-l-4 border-neon-cyan p-4 md:p-6 rounded-r-xl backdrop-blur-md shadow-lg">
                <span className="text-[10px] text-neon-cyan font-bold tracking-[0.3em] uppercase block mb-1 md:mb-2">Russian</span>
                <p className="text-2xl md:text-5xl font-display font-bold text-slate-800 dark:text-white">{ru}</p>
             </div>

             {/* Uzbek Card */}
             <div className="w-full max-w-2xl bg-white/60 dark:bg-gradient-to-r dark:from-pink-900/20 dark:to-transparent border-l-4 border-neon-pink p-4 md:p-6 rounded-r-xl backdrop-blur-md shadow-lg">
                <span className="text-[10px] text-neon-pink font-bold tracking-[0.3em] uppercase block mb-1 md:mb-2">Uzbek</span>
                <p className="text-2xl md:text-5xl font-display font-bold text-slate-800 dark:text-white">{uz}</p>
             </div>
             
             <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleReplay}
                className="mt-4 md:mt-8 px-6 py-2 rounded-full border border-gray-300 dark:border-white/20 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors uppercase tracking-widest flex items-center gap-2"
             >
                <RotateCcw size={12} /> Replay
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimedVocabReveal;