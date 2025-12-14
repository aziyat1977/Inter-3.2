import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';

const Optional: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
       <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <p className="text-neon-yellow font-bold tracking-[0.5em] text-[2vmin] uppercase">
          <Translator en="No Obligation" ru="Отсутствие необходимости" uz="Majburiyat yo'q" />
        </p>
      </motion.div>

      <Translator 
        en={<AutoFitText maxSize="12vw" className="text-white">DON'T HAVE TO</AutoFitText>}
        ru="Не обязательно / Не нужно"
        uz="Majbur emassan / Shart emas"
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-yellow-900/20 px-8 py-4 rounded-xl border border-yellow-500/30"
      >
        <p className="text-[3vmin] text-yellow-100">
          "You <span className="font-bold text-neon-yellow">don't have to</span> wear a tie."
        </p>
        <p className="text-[2vmin] text-gray-400 mt-2">(But you can if you want)</p>
      </motion.div>

      <TeacherNote content="Contrast with Mustn't. Mustn't = Forbidden. Don't have to = Your choice." />
    </div>
  );
};

export default Optional;