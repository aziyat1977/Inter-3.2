import React from 'react';
import GlitchText from '../components/GlitchText';
import Typewriter from '../components/Typewriter';
import CyberContainer from '../components/CyberContainer';
import TeacherNote from '../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
      <CyberContainer title="MISSION_BRIEFING" className="w-full max-w-4xl h-full md:h-auto md:aspect-video">
         <div className="flex flex-col items-start justify-center h-full w-full gap-8">
            
            <div className="w-full border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex justify-between items-end">
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-mono text-pink-600 dark:text-neon-pink text-sm tracking-[0.5em]"
                    >
                        LESSON 3.2 // B1+
                    </motion.p>
                    <div className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-[10px] font-mono text-slate-500 dark:text-gray-400">STATUS: CONFIDENTIAL</div>
                </div>
            </div>

            <div className="space-y-4">
                <GlitchText 
                    text="THE GREAT IMPOSTER" 
                    className="text-5xl md:text-8xl font-display font-black leading-none text-slate-900 dark:text-white" 
                />
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="p-6 bg-black/5 dark:bg-white/5 border-l-2 border-cyan-500 dark:border-neon-cyan rounded-r-lg max-w-2xl"
                >
                    <Typewriter 
                        text="Objective: Infiltrate high-level corporate positions using linguistic deception. Mastering Modals of Obligation and Past Lies is mandatory for survival."
                        speed={30}
                        delay={1.5}
                        className="font-mono text-lg md:text-xl text-slate-700 dark:text-gray-300 leading-relaxed"
                    />
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="w-full flex justify-end"
            >
                <div className="flex items-center gap-2 text-cyan-600 dark:text-neon-cyan animate-pulse">
                    <span className="font-display font-bold">AWAITING INPUT</span>
                    <ArrowRight size={20} />
                </div>
            </motion.div>

         </div>
      </CyberContainer>

      <TeacherNote 
        content={
          <ul className="list-disc pl-4 space-y-2">
            <li><strong>Objective:</strong> Practice "had to", "didn't have to", "couldn't".</li>
            <li><strong>Warm-up:</strong> Ask: "Have you ever lied on a CV?"</li>
            <li><strong>Timing:</strong> 5-7 mins. Discuss the concept of 'Imposter Syndrome'.</li>
          </ul>
        }
      />
    </div>
  );
};

export default Intro;