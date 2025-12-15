import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import TimedVocabReveal from '../../components/TimedVocabReveal';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const ProblemSolving: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden p-4">
      
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-6 bg-purple-500/10 dark:bg-purple-500/20 rounded-full border-2 border-purple-500 text-purple-500 dark:text-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
        >
            <Brain size="8vmin" />
        </motion.div>

        <div className="h-[30vh] md:h-[40vh] w-full max-w-5xl">
             <TimedVocabReveal 
                en={<AutoFitText maxSize="13vw" className="text-purple-600 dark:text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">PROBLEM SOLVING</AutoFitText>}
                ru="Решение проблем"
                uz="Muammolarni hal qilish"
            />
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50/80 dark:bg-purple-900/10 backdrop-blur-sm border border-purple-200 dark:border-purple-500/20 p-6 md:p-10 rounded-2xl max-w-4xl shadow-xl"
        >
             <div className="flex flex-col gap-2">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] text-purple-500 dark:text-purple-400">Definition</span>
                <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-purple-900 dark:text-purple-100">
                    Turning the Wi-Fi router off... and on again.
                </p>
             </div>
        </motion.div>
      </div>

      <TeacherNote content="Ask: 'What is your best IT trick?' (Usually 'restart it')." />
    </div>
  );
};

export default ProblemSolving;