import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import TimedVocabReveal from '../../components/TimedVocabReveal';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const UnderPressure: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden p-4">
      
      <div className="absolute inset-0 bg-red-500/5 animate-pulse-fast z-0" />

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="p-6 bg-red-500/10 dark:bg-red-500/20 rounded-full border-2 border-red-500 text-red-500 shadow-[0_0_50px_rgba(255,0,0,0.3)]"
        >
            <Zap size="8vmin" />
        </motion.div>

        <div className="h-[30vh] md:h-[40vh] w-full max-w-5xl">
            <TimedVocabReveal 
                en={<AutoFitText maxSize="14vw" className="text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]">UNDER PRESSURE</AutoFitText>}
                ru="Под давлением"
                uz="Bosim ostida"
            />
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-red-50/80 dark:bg-red-900/10 backdrop-blur-sm border border-red-200 dark:border-red-500/20 p-6 md:p-10 rounded-2xl max-w-4xl shadow-xl"
        >
             <div className="flex flex-col gap-2">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] text-red-400">Definition</span>
                <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-red-900 dark:text-red-100">
                    Starting the project 5 minutes before class starts.
                </p>
             </div>
        </motion.div>
      </div>

      <TeacherNote content="Mime typing furiously on a keyboard. Ask students to mime 'Under Pressure'." />
    </div>
  );
};

export default UnderPressure;