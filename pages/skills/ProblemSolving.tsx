import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const ProblemSolving: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-6 bg-purple-500/20 rounded-full border-2 border-purple-500 text-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
        >
            <Brain size="8vmin" />
        </motion.div>

        <Translator 
            en={<AutoFitText maxSize="13vw" className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">PROBLEM SOLVING</AutoFitText>}
            ru="Решение проблем"
            uz="Muammolarni hal qilish"
        />

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-900/10 backdrop-blur-sm border border-purple-500/20 p-6 md:p-10 rounded-2xl max-w-4xl"
        >
            <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-purple-100">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] block mb-2 text-purple-300">Definition</span>
                Turning the Wi-Fi router off... and on again.
            </p>
        </motion.div>
      </div>

      <TeacherNote content="Ask: 'What is your best IT trick?' (Usually 'restart it')." />
    </div>
  );
};

export default ProblemSolving;