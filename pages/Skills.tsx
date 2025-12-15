import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import GlitchText from '../components/GlitchText';
import Typewriter from '../components/Typewriter';
import { Database, Download } from 'lucide-react';

const SkillIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
       
       <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         className="mb-8 relative"
       >
         <div className="absolute inset-0 bg-neon-cyan/20 blur-[50px] rounded-full" />
         <Database size={80} className="text-neon-cyan relative z-10 animate-pulse" />
       </motion.div>

       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-12"
       >
         <p className="font-mono tracking-[0.5em] text-sm text-neon-cyan mb-4">SECTION 02</p>
         <h2 className="text-5xl md:text-8xl font-display font-bold leading-none text-white">
           SKILL<br/>DOWNLOAD
         </h2>
       </motion.div>
       
       {/* Loading Bar */}
       <div className="w-full max-w-md space-y-2">
         <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>PACKET_LOSS: 0%</span>
            <Typewriter text="EST. TIME: 0.4s" speed={50} delay={1} />
         </div>
         <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-white/10">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="h-full bg-gradient-to-r from-neon-cyan to-white"
            />
         </div>
         <div className="flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1 }}
                className="flex items-center gap-2 text-neon-cyan text-xs font-bold"
            >
                <Download size={12} /> COMPLETE
            </motion.div>
         </div>
       </div>

       <TeacherNote 
        content="Tell students they need to learn these 'Keywords' to survive the interview. Drill the pronunciation on the next slides."
      />
    </div>
  );
};

export default SkillIntro;