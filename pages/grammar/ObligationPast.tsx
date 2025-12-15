import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const ObligationPast: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 flex items-center gap-4 md:gap-8 opacity-50"
      >
        <span className="text-[3vmin] font-bold text-slate-900 dark:text-white">MUST</span>
        <ArrowRight className="text-pink-500 dark:text-neon-pink" size={32} />
        <span className="text-[3vmin] font-bold text-slate-900 dark:text-white">PAST</span>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[30vh] mb-8">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-pink-500/20 dark:bg-neon-pink/20 blur-[100px] rounded-full" />
        
        <Translator 
          en={<AutoFitText maxSize="20vw" className="text-pink-600 dark:text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">HAD TO</AutoFitText>}
          ru="Пришлось / Был должен"
          uz="Majbur bo'ldim"
          className="w-full h-full"
          contentClassName="h-full"
        />
      </div>

      {/* Ultra Animated Timeline */}
      <div className="w-full max-w-4xl relative h-32 flex items-center justify-center">
        {/* Base Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-black/10 dark:bg-white/10 rounded-full" />

        {/* Active Line (Growing from Right to Left) */}
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: '80%' }} 
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-1/2 right-[10%] h-[4px] bg-gradient-to-l from-transparent via-pink-500 to-pink-500 dark:via-neon-pink dark:to-neon-pink shadow-[0_0_20px_#ff00ff]"
        />

        {/* NOW Point */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
           <div className="w-3 h-3 bg-gray-400 rounded-full" />
           <p className="absolute top-6 text-gray-500 text-[10px] tracking-[0.2em]">NOW</p>
        </div>

        {/* Time Traveler Particle */}
        <motion.div
          initial={{ right: '10%' }}
          animate={{ right: '90%' }} // 10% + 80% width = 90% position
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-1/2 -translate-y-1/2 z-20"
        >
           <motion.div 
             animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ repeat: Infinity, duration: 0.5 }}
             className="w-6 h-6 bg-white rounded-full shadow-[0_0_25px_white] flex items-center justify-center border border-black/10"
           >
             <Clock size={12} className="text-black" />
           </motion.div>
        </motion.div>

        {/* PAST Point (Appears with impact) */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8, type: "spring", bounce: 0.6 }}
          className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        >
            <div className="relative">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-pink-500 dark:bg-neon-pink rounded-full shadow-[0_0_40px_#ff00ff] z-10 relative flex items-center justify-center border-4 border-white dark:border-black">
                  <span className="font-bold text-white dark:text-black text-xs md:text-sm">PAST</span>
              </div>
              <div className="absolute inset-0 bg-pink-500 dark:bg-neon-pink rounded-full animate-ping opacity-50 duration-1000" />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
              className="absolute top-14 text-pink-600 dark:text-neon-pink font-bold text-sm md:text-lg tracking-[0.2em] whitespace-nowrap drop-shadow-[0_0_10px_#ff00ff]"
            >
              YESTERDAY
            </motion.p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="mt-8 text-[3vmin] text-slate-600 dark:text-gray-300 italic px-4"
      >
        "I <span className="text-pink-600 dark:text-neon-pink font-bold">had to</span> lie to get the job."
      </motion.div>

      <TeacherNote content="Emphasize that 'Musted' does NOT exist. This is the most common error." />
    </div>
  );
};

export default ObligationPast;