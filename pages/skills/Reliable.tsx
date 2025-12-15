import React, { useState, useEffect } from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const Reliable: React.FC = () => {
  const [showEn, setShowEn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowEn(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="p-6 bg-neon-yellow/20 rounded-full border-2 border-neon-yellow text-neon-yellow shadow-[0_0_50px_rgba(250,204,21,0.3)]"
        >
            <Clock size="8vmin" />
        </motion.div>

        <div className="min-h-[20vh] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {showEn ? (
              <motion.div
                key="en"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <AutoFitText maxSize="18vw" className="text-neon-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    RELIABLE
                </AutoFitText>
              </motion.div>
            ) : (
              <motion.div
                key="tr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                 <AutoFitText maxSize="8vw" className="text-white">Надёжный</AutoFitText>
                 <AutoFitText maxSize="6vw" className="text-neon-yellow opacity-80">Ishonchli</AutoFitText>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-900/10 backdrop-blur-sm border border-neon-yellow/20 p-6 md:p-10 rounded-2xl max-w-4xl"
        >
            <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-yellow-100">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] block mb-2 text-yellow-300">Definition</span>
                Actually showing up.
            </p>
        </motion.div>
      </div>

      <TeacherNote content="Concept check: Is a bus reliable? Is your best friend reliable? (Yes/No/Maybe)." />
    </div>
  );
};

export default Reliable;