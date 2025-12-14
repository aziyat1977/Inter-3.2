import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import Translator from '../../components/Translator';
import TeacherNote from '../../components/TeacherNote';
import { motion } from 'framer-motion';

const Obligation: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <p className="text-neon-cyan font-bold tracking-[0.5em] text-[2vmin] uppercase">
          <Translator en="Present // Now" ru="Настоящее" uz="Hozirgi zamon" />
        </p>
      </motion.div>

      <div className="flex flex-col gap-8">
        <Translator 
          en={<AutoFitText maxSize="15vw" className="text-white">MUST</AutoFitText>}
          ru="Должен"
          uz="Majbur (Qat'iy)"
        />
        
        <div className="w-[20vw] h-[2px] bg-gray-700 mx-auto" />

        <Translator 
          en={<AutoFitText maxSize="12vw" className="text-gray-300">HAVE TO</AutoFitText>}
          ru="Вынужден / Приходится"
          uz="Majbur (Vaziyat taqozosi)"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white/5 px-8 py-4 rounded-xl border border-white/10"
      >
        <p className="text-[3vmin] text-gray-400">
          "I <span className="text-neon-cyan font-bold">must</span> finish this level."
        </p>
      </motion.div>

      <TeacherNote content="Focus on pronunciation. 'Have to' is often pronounced 'Hafta'." />
    </div>
  );
};

export default Obligation;