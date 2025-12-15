import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../../components/GlitchText';
import TeacherNote from '../../components/TeacherNote';
import { Cpu } from 'lucide-react';

const PracticeIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-6 bg-neon-cyan/5 rounded-full border border-neon-cyan/20 relative"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-neon-cyan/10" />
        <Cpu size={64} className="text-neon-cyan relative z-10" />
      </motion.div>

      <p className="font-display tracking-[0.5em] text-[2vmin] mb-4 text-gray-400">SECTION 04</p>
      
      <GlitchText 
        text="SYSTEM TRAINING" 
        className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8"
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl text-lg md:text-2xl text-gray-300 font-light space-y-4"
      >
        <p>Initializing simulation protocol.</p>
        <p className="text-neon-cyan">5 Gap Fill Modules.</p>
        <p className="text-neon-pink">5 Rapid Fire Quizzes.</p>
      </motion.div>

      <TeacherNote 
        content="This is the individual practice phase. Students can work alone or in pairs. There are 10 levels total. Monitor for accuracy."
      />
    </div>
  );
};

export default PracticeIntro;