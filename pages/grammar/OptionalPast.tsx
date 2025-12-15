import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight, Unlock, Rewind } from 'lucide-react';

const OptionalPast: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 flex items-center gap-4 md:gap-8 opacity-50"
      >
        <span className="text-[3vmin] font-bold">DON'T HAVE TO</span>
        <ArrowRight className="text-neon-pink" size={32} />
        <span className="text-[3vmin] font-bold">PAST</span>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[25vh] mb-8">
        <Translator 
          en={<AutoFitText maxSize="12vw" className="text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">DIDN'T HAVE TO</AutoFitText>}
          ru="Не было необходимости"
          uz="Shart emas edi"
          className="w-full h-full"
          contentClassName="h-full"
        />
      </div>

       {/* Ultra Animated Timeline (Yellow Theme) */}
       <div className="w-full max-w-4xl relative h-32 flex items-center justify-center">
        {/* Base Line */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-white/10 rounded-full" />

        {/* Active Line (Growing from Right to Left) */}
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: '80%' }} 
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-1/2 right-[10%] h-[4px] bg-gradient-to-l from-transparent via-neon-yellow to-neon-yellow shadow-[0_0_20px_#facc15]"
        />

        {/* NOW Point */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
           <div className="w-3 h-3 bg-gray-400 rounded-full" />
           <p className="absolute top-6 text-gray-500 text-[10px] tracking-[0.2em]">NOW</p>
        </div>

        {/* Time Traveler Particle */}
        <motion.div
          initial={{ right: '10%' }}
          animate={{ right: '90%' }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-1/2 -translate-y-1/2 z-20"
        >
           <motion.div 
             animate={{ x: [-2, 2, -2] }}
             transition={{ repeat: Infinity, duration: 0.2 }}
             className="w-8 h-8 bg-neon-yellow rounded-full shadow-[0_0_30px_#facc15] flex items-center justify-center"
           >
             <Rewind size={16} className="text-black fill-black" />
           </motion.div>
        </motion.div>

        {/* PAST Point */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8, type: "spring", bounce: 0.6 }}
          className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        >
            <div className="relative">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-neon-yellow rounded-full shadow-[0_0_40px_#facc15] z-10 relative flex items-center justify-center border-4 border-black">
                  <Unlock size={20} className="text-black" />
              </div>
              <div className="absolute inset-0 bg-neon-yellow rounded-full animate-ping opacity-50 duration-1000" />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
              className="absolute top-16 text-neon-yellow font-bold text-sm md:text-lg tracking-[0.2em] whitespace-nowrap drop-shadow-[0_0_10px_#facc15]"
            >
              THEN
            </motion.p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="mt-8 text-[3vmin] text-gray-300 italic px-4"
      >
        "I <span className="text-neon-pink font-bold">didn't have to</span> study (so I played games)."
      </motion.div>

      <TeacherNote content="Ask: 'Did the person do the action?' Usually not, because they didn't have to." />
    </div>
  );
};

export default OptionalPast;