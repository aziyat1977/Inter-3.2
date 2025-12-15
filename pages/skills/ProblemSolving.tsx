import React, { useState, useEffect } from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';

const ProblemSolving: React.FC = () => {
  const [showEn, setShowEn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowEn(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
                <AutoFitText maxSize="13vw" className="text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    PROBLEM SOLVING
                </AutoFitText>
              </motion.div>
            ) : (
              <motion.div
                key="tr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                 <AutoFitText maxSize="8vw" className="text-white">Решение проблем</AutoFitText>
                 <AutoFitText maxSize="6vw" className="text-purple-400 opacity-80">Muammolarni hal qilish</AutoFitText>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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