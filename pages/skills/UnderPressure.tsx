import React, { useState, useEffect } from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const UnderPressure: React.FC = () => {
  const [showEn, setShowEn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowEn(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-red-500/5 animate-pulse-fast z-0" />

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="p-6 bg-red-500/20 rounded-full border-2 border-red-500 text-red-500 shadow-[0_0_50px_rgba(255,0,0,0.3)]"
        >
            <Zap size="8vmin" />
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
                <AutoFitText maxSize="14vw" className="text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]">
                    UNDER PRESSURE
                </AutoFitText>
              </motion.div>
            ) : (
              <motion.div
                key="tr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                 <AutoFitText maxSize="8vw" className="text-white">Под давлением</AutoFitText>
                 <AutoFitText maxSize="6vw" className="text-red-500 opacity-80">Bosim ostida</AutoFitText>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-red-900/10 backdrop-blur-sm border border-red-500/20 p-6 md:p-10 rounded-2xl max-w-4xl"
        >
            <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight text-red-100">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] block mb-2 text-red-300">Definition</span>
                Starting the project 5 minutes before class starts.
            </p>
        </motion.div>
      </div>

      <TeacherNote content="Mime typing furiously on a keyboard. Ask students to mime 'Under Pressure'." />
    </div>
  );
};

export default UnderPressure;