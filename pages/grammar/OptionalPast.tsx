import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { ArrowRight, Unlock } from 'lucide-react';

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

      <div className="relative w-full max-w-5xl h-[25vh]">
        <Translator 
          en={<AutoFitText maxSize="12vw" className="text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">DIDN'T HAVE TO</AutoFitText>}
          ru="Не было необходимости"
          uz="Shart emas edi"
          className="w-full h-full"
          contentClassName="h-full"
        />
      </div>

       {/* Timeline Visual */}
       <div className="w-full max-w-4xl mt-16 relative h-2 bg-gray-700 rounded-full flex items-center justify-between px-4">
        {/* Past Point */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 bg-neon-yellow rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                <Unlock size={16} className="text-black" />
            </div>
            <p className="absolute top-10 text-neon-yellow font-bold text-[2vmin]">THEN</p>
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
        "I <span className="text-neon-pink font-bold">didn't have to</span> study (so I played games)."
      </motion.div>

      <TeacherNote content="Ask: 'Did the person do the action?' Usually not, because they didn't have to." />
    </div>
  );
};

export default OptionalPast;