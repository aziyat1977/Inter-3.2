import React from 'react';
import GlitchText from '../components/GlitchText';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';

const Intro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display tracking-[0.8em] text-sm md:text-xl text-neon-pink mb-8"
      >
        LESSON 3.2 // B1+
      </motion.p>
      
      <div className="mb-8">
        <GlitchText 
          text="THE IMPOSTER" 
          className="text-6xl md:text-9xl font-display font-bold leading-tight" 
        />
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xl md:text-3xl max-w-3xl font-light text-gray-400 leading-relaxed"
      >
        Fake it 'til you make it. <br />
        <span className="text-neon-cyan font-bold">Mastering Modals of Obligation & Past Lies.</span>
      </motion.p>

      <TeacherNote 
        content={
          <ul className="list-disc pl-4 space-y-2">
            <li><strong>Objective:</strong> Students practice "had to", "didn't have to", "couldn't" in the context of fake job interviews.</li>
            <li><strong>Warm-up:</strong> Ask students if they have ever lied in an interview or on a CV.</li>
            <li><strong>Timing:</strong> Spend 5-7 mins on this intro discussing the concept of an "Imposter".</li>
          </ul>
        }
      />
    </div>
  );
};

export default Intro;