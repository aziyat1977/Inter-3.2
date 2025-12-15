import React, { useState, useEffect } from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Multitasking: React.FC = () => {
  const { isDark } = useTheme();
  const [showEn, setShowEn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowEn(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      
      {/* Background Icon Watermark */}
      <motion.div 
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ duration: 1 }}
        className="absolute z-0"
      >
        <Target size="80vmin" color={isDark ? "white" : "black"} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-16 w-full max-w-[90vw]">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-6 bg-neon-cyan/20 rounded-full border-2 border-neon-cyan text-neon-cyan shadow-[0_0_50px_rgba(0,243,255,0.3)]"
        >
            <Target size="8vmin" />
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
                <AutoFitText maxSize="15vw" className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  MULTITASKING
                </AutoFitText>
              </motion.div>
            ) : (
              <motion.div
                key="tr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                 <AutoFitText maxSize="8vw" className="text-white">Многозадачность</AutoFitText>
                 <AutoFitText maxSize="6vw" className="text-neon-cyan opacity-80">Ko'p vazifalik</AutoFitText>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-2xl max-w-4xl"
        >
            <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] block mb-2">Definition</span>
                Texting your friend while doing your homework.
            </p>
        </motion.div>
      </div>

      <TeacherNote content="Drill: Mul-ti-TAS-king. Ask: 'Can humans actually multitask?' (Science says no, we just switch tasks quickly)." />
    </div>
  );
};

export default Multitasking;