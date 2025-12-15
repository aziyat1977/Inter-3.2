import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import Translator from '../../components/Translator';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Reliable: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden p-4">
      
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="p-6 bg-neon-yellow/20 rounded-full border-2 border-neon-yellow text-neon-yellow shadow-[0_0_50px_rgba(250,204,21,0.3)]"
        >
            <Clock size="8vmin" />
        </motion.div>

        <div className="h-[20vh] w-full max-w-5xl">
             <Translator 
                en={<AutoFitText maxSize="18vw" className="text-neon-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">RELIABLE</AutoFitText>}
                ru="Надёжный"
                uz="Ishonchli"
                className="w-full h-full"
                contentClassName="h-full"
            />
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-900/10 backdrop-blur-sm border border-neon-yellow/20 p-6 md:p-10 rounded-2xl max-w-4xl shadow-xl"
        >
            <div className="flex flex-col gap-2">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] text-yellow-500">Definition</span>
                <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-yellow-100">
                    Actually showing up.
                </p>
             </div>
        </motion.div>
      </div>

      <TeacherNote content="Concept check: Is a bus reliable? Is your best friend reliable? (Yes/No/Maybe)." />
    </div>
  );
};

export default Reliable;