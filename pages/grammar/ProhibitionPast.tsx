import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight, Ban } from 'lucide-react';

const ProhibitionPast: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 flex items-center gap-4 md:gap-8 opacity-50"
      >
        <span className="text-[3vmin] font-bold">MUSTN'T</span>
        <ArrowRight className="text-neon-pink" size={32} />
        <span className="text-[3vmin] font-bold">PAST</span>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[30vh]">
        <div className="absolute inset-0 bg-red-900/20 blur-[100px] rounded-full" />
        <Translator 
          en={<AutoFitText maxSize="18vw" className="text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">COULDN'T</AutoFitText>}
          ru="Не мог / Нельзя было"
          uz="Qila olmadim / Mumkin emas edi"
          className="w-full h-full"
          contentClassName="h-full"
        />
      </div>

       {/* Timeline Visual */}
       <div className="w-full max-w-4xl mt-16 relative h-2 bg-gray-700 rounded-full flex items-center justify-between px-4">
        {/* Past Point */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_20px_#ff0000]">
                <Ban size={16} className="text-black" />
            </div>
            <p className="absolute top-10 text-red-400 font-bold text-[2vmin]">HISTORY</p>
        </div>
        
        {/* Present Point */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center opacity-30">
            <div className="w-4 h-4 bg-gray-500 rounded-full" />
            <p className="absolute top-8 text-gray-500 text-[1.5vmin]">NOW</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-[3vmin] text-gray-300 italic px-4"
      >
        "I <span className="text-neon-pink font-bold">couldn't</span> tell the truth."
      </motion.div>

      <TeacherNote content="Explain that 'didn't must' is incorrect. We borrow from 'can' -> 'couldn't' or use 'was not allowed to'." />
    </div>
  );
};

export default ProhibitionPast;