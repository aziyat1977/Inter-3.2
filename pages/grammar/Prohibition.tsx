import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const Prohibition: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
       <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 w-full"
      >
        <Translator 
            en="PROHIBITION" 
            ru="ЗАПРЕТ" 
            uz="TAQIQ"
            className="text-red-500 font-bold tracking-[0.5em] text-[2vmin] uppercase"
        />
      </motion.div>

      <div className="flex items-center justify-center gap-4 mb-4 text-red-500 animate-pulse">
        <XCircle size="8vmin" />
      </div>

      <div className="w-full max-w-5xl h-[25vh]">
        <Translator 
            en={<AutoFitText maxSize="18vw" className="text-white">MUSTN'T</AutoFitText>}
            ru="Нельзя / Запрещено"
            uz="Mumkin emas / Man etiladi"
            className="w-full h-full"
            contentClassName="h-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-red-900/20 px-8 py-6 rounded-xl border border-red-500/30"
      >
        <p className="text-[3vmin] text-red-200">
          "You <span className="font-bold border-b-2 border-red-500">mustn't</span> touch the server."
        </p>
      </motion.div>

      <TeacherNote content="The 't' in the middle is silent! Pronounced 'Mus-nt'." />
    </div>
  );
};

export default Prohibition;