import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import Translator from '../../components/Translator';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Multitasking: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden p-4">
      
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

        <div className="h-[20vh] w-full max-w-5xl">
          <Translator 
            en={<AutoFitText maxSize="15vw" className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">MULTITASKING</AutoFitText>}
            ru="Многозадачность"
            uz="Ko'p vazifalik"
            className="w-full h-full"
            contentClassName="h-full"
          />
        </div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-2xl max-w-4xl shadow-xl"
        >
            <div className="flex flex-col gap-2">
                <span className="opacity-50 uppercase tracking-widest text-[1.5vmin] text-neon-cyan">Definition</span>
                <p className="font-sans text-[3vmin] md:text-[4vmin] leading-tight">
                    Texting your friend while doing your homework.
                </p>
            </div>
        </motion.div>
      </div>

      <TeacherNote content="Drill: Mul-ti-TAS-king. Ask: 'Can humans actually multitask?' (Science says no, we just switch tasks quickly)." />
    </div>
  );
};

export default Multitasking;