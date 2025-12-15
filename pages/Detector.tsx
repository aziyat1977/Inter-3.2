import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { useSound } from '../contexts/SoundContext';

const Detector: React.FC = () => {
  const [buzzed, setBuzzed] = useState(false);
  const controls = useAnimation();
  const { playBuzzer } = useSound();

  const handleBuzz = async () => {
    playBuzzer();
    setBuzzed(true);
    
    // Shake animation
    controls.start({
        x: [0, -20, 20, -20, 20, 0],
        transition: { duration: 0.4 }
    });

    // Reset after animation
    setTimeout(() => setBuzzed(false), 1000);
  };

  return (
    <motion.div 
        animate={controls}
        className={`w-full min-h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-20 gap-8 md:gap-16 transition-colors duration-100 ${buzzed ? 'bg-red-900/50' : ''}`}
    >
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
             <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                04. LIE DETECTOR
            </h2>
            <p className="text-xl md:text-2xl font-light">Your partner is lying again. Interrogate them.</p>

            <div className="space-y-4 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 text-left">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-cyan text-black font-bold flex flex-shrink-0 items-center justify-center text-xl">1</div>
                    <p className="text-base md:text-lg">Ask: "What did you <span className="text-neon-cyan font-bold">HAVE TO</span> do?"</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon-cyan text-black font-bold flex flex-shrink-0 items-center justify-center text-xl">2</div>
                    <p className="text-base md:text-lg">Ask: "What <span className="text-neon-cyan font-bold">COULDN'T</span> you do?"</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500 text-white font-bold flex flex-shrink-0 items-center justify-center text-xl">3</div>
                    <p className="text-base md:text-lg">Listen for "Musted". If you hear it, hit the button.</p>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center py-8">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBuzz}
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-8 border-red-950 shadow-[0_0_60px_rgba(255,0,0,0.4)] flex items-center justify-center group overflow-hidden"
            >
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                 <div className="relative z-10 text-center">
                    <span className="block text-5xl font-black text-white tracking-widest drop-shadow-lg group-hover:scale-110 transition-transform duration-300">BUZZ</span>
                    <span className="block text-red-200 text-sm tracking-[0.5em] mt-2 font-display">ERROR DETECTED</span>
                 </div>
                 
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700"></div>
            </motion.button>
        </div>

        <TeacherNote 
            content={
                <p>Walk around and listen. If students are using "didn't need to" correctly, award bonus points. The goal is fluency over 100% accuracy, but "Musted" is a fatal error.</p>
            }
        />
    </motion.div>
  );
};

export default Detector;