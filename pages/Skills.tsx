import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import GlitchText from '../components/GlitchText';

const SkillIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-8"
       >
         <p className="font-display tracking-[0.5em] text-[2vmin] text-neon-cyan mb-2">SECTION 02</p>
         <h2 className="text-[6vmin] md:text-[8vmin] font-display font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-500">
           SKILL DOWNLOAD
         </h2>
       </motion.div>
       
       <motion.div
         initial={{ scaleX: 0 }}
         animate={{ scaleX: 1 }}
         transition={{ delay: 0.5, duration: 0.8 }}
         className="h-1 w-[20vw] bg-neon-cyan mb-12"
       />

       <motion.p
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1 }}
         className="text-[3vmin] text-gray-400 font-light"
       >
         Loading resume keywords...
       </motion.p>

       <TeacherNote 
        content="Tell students they need to learn these 'Keywords' to survive the interview. Drill the pronunciation on the next slides."
      />
    </div>
  );
};

export default SkillIntro;