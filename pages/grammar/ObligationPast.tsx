import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ObligationPast: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 flex items-center gap-8 opacity-50"
      >
        <span className="text-[3vmin]">MUST</span>
        <ArrowRight className="text-neon-pink" size={32} />
        <span className="text-[3vmin]">PAST</span>
      </motion.div>

      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-neon-pink/20 blur-[100px] rounded-full" />
        
        <Translator 
          en={<AutoFitText maxSize="20vw" className="text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">HAD TO</AutoFitText>}
          ru="Пришлось / Был должен"
          uz="Majbur bo'ldim"
        />
      </div>

      {/* Timeline Visual */}
      <div className="w-full max-w-4xl mt-16 relative h-2 bg-gray-700 rounded-full flex items-center justify-between px-4">
        {/* Past Point */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 bg-neon-pink rounded-full shadow-[0_0_20px_#ff00ff]" />
            <p className="absolute top-10 text-neon-pink font-bold text-[2vmin]">YESTERDAY</p>
        </div>
        
        {/* Present Point */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center opacity-30">
            <div className="w-4 h-4 bg-gray-500 rounded-full" />
            <p className="absolute top-8 text-gray-500 text-[1.5vmin]">NOW</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-[3vmin] text-gray-300 italic"
      >
        "I <span className="text-neon-pink font-bold">had to</span> lie to get the job."
      </motion.div>

      <TeacherNote content="Emphasize that 'Musted' does NOT exist. This is the most common error." />
    </div>
  );
};

export default ObligationPast;