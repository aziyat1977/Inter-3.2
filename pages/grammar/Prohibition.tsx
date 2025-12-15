import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';
import { Ban } from 'lucide-react';

const Prohibition: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
       <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 w-full"
      >
        <Translator 
            en="PROHIBITED // NO" 
            ru="ЗАПРЕЩЕНО" 
            uz="TAQIQLANGAN"
            className="text-red-600 dark:text-red-500 font-bold tracking-[0.5em] text-[2vmin] uppercase"
        />
      </motion.div>

      <div className="flex flex-col gap-12 w-full max-w-4xl relative">
        <div className="h-[20vh] w-full relative z-10">
            <Translator 
            en={<AutoFitText maxSize="15vw" className="text-slate-900 dark:text-white drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">MUSTN'T</AutoFitText>}
            ru="Нельзя / Запрещено"
            uz="Mumkin emas (Qat'iy)"
            className="w-full h-full"
            contentClassName="h-full"
            />
        </div>
        
        <div className="w-[30vw] h-[2px] bg-red-500/30 mx-auto rounded-full" />

        <div className="h-[15vh] w-full relative z-10">
            <Translator 
            en={<AutoFitText maxSize="12vw" className="text-slate-500 dark:text-gray-300">CAN'T</AutoFitText>}
            ru="Не разрешено"
            uz="Mumkin emas (Ruxsat yo'q)"
            className="w-full h-full"
            contentClassName="h-full"
            />
        </div>

        {/* Background Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Ban size="40vmin" className="text-red-500" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-red-50 dark:bg-red-900/10 px-8 py-6 rounded-xl border border-red-200 dark:border-red-500/30 backdrop-blur-md"
      >
        <p className="text-[3vmin] text-slate-600 dark:text-gray-300">
          "You <span className="text-red-600 dark:text-red-500 font-bold">mustn't</span> touch the laser."
        </p>
      </motion.div>

      <TeacherNote content="Explain that 'Mustn't' usually comes from the speaker (or the law), whereas 'Can't' is about the rules." />
    </div>
  );
};

export default Prohibition;