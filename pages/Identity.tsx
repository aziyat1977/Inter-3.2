import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { useSound } from '../contexts/SoundContext';
import CyberContainer from '../components/CyberContainer';
import { Fingerprint, Lock, Unlock } from 'lucide-react';

const cards = [
  {
    id: 1,
    role: "THE SURGEON",
    fakeJob: "Brain Surgeon",
    realJob: "Fruit Peeler",
    vocab: "Precision, Under Pressure",
    line: "I had to be extremely careful not to damage the skin... uh, the brain."
  },
  {
    id: 2,
    role: "THE CEO",
    fakeJob: "CEO of Google",
    realJob: "Router Fixer",
    vocab: "Problem Solving, Patience",
    line: "I had to explain simple concepts very slowly to the board."
  },
  {
    id: 3,
    role: "THE TRAINER",
    fakeJob: "T-Rex Tamer",
    realJob: "Pug Walker",
    vocab: "Schedules, Confidence",
    line: "I didn't need to run fast, but I had to carry giant poop bags."
  }
];

const Identity: React.FC = () => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const { playFlip, playHover, playReveal } = useSound();

  const handleCardClick = (id: number) => {
    playFlip();
    if (flipped !== id) {
        setTimeout(() => playReveal(), 300);
    }
    setFlipped(flipped === id ? null : id);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8">
      <div className="mb-8 text-center">
         <div className="inline-block px-4 py-1 rounded-full border border-cyan-600/30 bg-cyan-600/10 dark:border-neon-cyan/30 dark:bg-neon-cyan/10 mb-2">
            <span className="text-cyan-700 dark:text-neon-cyan font-mono text-xs tracking-[0.3em]">STEP 01</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-display font-bold mb-2 text-slate-900 dark:text-white">IDENTITY SPOOFING</h2>
         <p className="text-slate-500 dark:text-gray-400 font-light">Select a cover story to download.</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {cards.map((card) => (
            <motion.div 
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.id * 0.2 }}
                className="perspective-1000 h-[400px] cursor-pointer group"
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={playHover}
            >
                <motion.div 
                    className="relative w-full h-full preserve-3d transition-transform duration-700"
                    animate={{ rotateY: flipped === card.id ? 180 : 0 }}
                >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden">
                        <CyberContainer className="h-full group-hover:scale-[1.02] transition-transform">
                            <div className="flex flex-col items-center justify-between h-full py-8 text-center">
                                <Fingerprint size={64} className="text-slate-500 dark:text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors" />
                                <div>
                                    <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-neon-cyan transition-colors">{card.role}</h3>
                                    <div className="w-12 h-1 bg-black/10 dark:bg-white/10 mx-auto mt-4 group-hover:bg-cyan-600 dark:group-hover:bg-neon-cyan transition-colors" />
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-gray-500 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full">
                                    <Lock size={10} /> ENCRYPTED
                                </div>
                            </div>
                        </CyberContainer>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div className="h-full w-full relative p-1">
                            {/* Custom Back Style since CyberContainer wraps content */}
                            <div className="h-full w-full bg-slate-100 dark:bg-gradient-to-br dark:from-neon-pink/20 dark:to-black border border-pink-500 dark:border-neon-pink rounded-xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 dark:bg-neon-pink shadow-[0_0_20px_#ff00ff]" />
                                
                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <p className="text-[10px] text-pink-600 dark:text-neon-pink uppercase tracking-widest">Target Persona</p>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{card.fakeJob}</h3>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-widest">Real Persona</p>
                                        <h3 className="text-lg text-slate-400 dark:text-gray-400 line-through decoration-red-500 decoration-2">{card.realJob}</h3>
                                    </div>
                                </div>

                                <div className="relative z-10 bg-white dark:bg-black/40 p-3 rounded border-l-2 border-slate-300 dark:border-white/30 italic text-sm text-slate-700 dark:text-gray-300 shadow-sm">
                                    "{card.line}"
                                </div>
                                
                                <div className="absolute bottom-4 right-4 text-pink-500/10 dark:text-neon-pink/20">
                                    <Unlock size={80} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            ))}
        </div>
      </div>

      <TeacherNote 
        content="Roleplay Activity. Student A (Boss) vs Student B (Imposter). Goal: Convince the boss using the vocab."
      />
    </div>
  );
};

export default Identity;