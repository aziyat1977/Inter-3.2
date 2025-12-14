import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import { motion } from 'framer-motion';

const GrammarIntro: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <p className="font-display tracking-[0.5em] text-[2vmin] mb-4 text-gray-400">SECTION 03</p>
      <AutoFitText maxSize="15vw" className="text-white mb-8">THE RULES</AutoFitText>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[3vmin] text-neon-cyan max-w-4xl"
      >
        "MUST" is a time traveler. <br/>
        But when it travels to the past, it changes its face.
      </motion.p>
    </div>
  );
};

export default GrammarIntro;