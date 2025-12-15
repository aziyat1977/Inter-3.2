import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { useSound } from '../contexts/SoundContext';
import Translator from '../components/Translator';

const cards = [
  {
    id: 1,
    role: "THE MEDICAL EXPERT",
    fakeJob: "Brain Surgeon",
    realJob: "Peeling stickers off apples",
    vocab: "Precision, Under Pressure",
    line: "I had to be extremely careful not to damage the skin... uh, the brain."
  },
  {
    id: 2,
    role: "THE TECH GENIUS",
    fakeJob: "CEO of Google",
    realJob: "Fixing Grandma's WiFi",
    vocab: "Problem Solving, Patience",
    line: "I had to explain simple concepts very slowly to the board."
  },
  {
    id: 3,
    role: "THE DINO TAMER",
    fakeJob: "T-Rex Trainer",
    realJob: "Walking a fat Pug",
    vocab: "Managing Schedules, Confidence",
    line: "I didn't need to run fast, but I had to carry giant poop bags."
  }
];

const Identity: React.FC = () => {
  const [flipped, setFlipped] = useState<number | null>(null);
  const { playFlip, playHover, playReveal } = useSound();

  const handleCardClick = (id: number) => {
    playFlip();
    if (flipped !== id) {
        setTimeout(() => playReveal(), 300); // Sound when content reveals
    }
    setFlipped(flipped === id ? null : id);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center px-4 py-8">
      <div className="mb-8 md:mb-12 text-center w-full flex flex-col items-center">
         <h2 className="text-[5vmin] font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-500">
          01. CHOOSE YOUR LIES
        </h2>
        
        <Translator 
            en={<p className="text-[2.5vmin] opacity-70">Tap a card to download your "Secret Identity".</p>}
            ru="Нажмите на карту, чтобы получить секретную личность"
            uz="Maxfiy shaxsingizni yuklab olish uchun kartani bosing"
        />
      </div>

      {/* Grid adapts: min-height allows it to grow on mobile, rather than fixed height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-[90vw] mx-auto">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="w-full aspect-[3/4] md:aspect-[2/3] perspective-1000 cursor-pointer group min-h-[400px]"
            onClick={() => handleCardClick(card.id)}
            onMouseEnter={playHover}
          >
            <motion.div 
              className="relative w-full h-full transition-all duration-700 preserve-3d"
              animate={{ rotateY: flipped === card.id ? 180 : 0 }}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8 flex flex-col justify-between shadow-2xl group-hover:border-neon-cyan/50 transition-colors">
                 <div>
                    <h3 className="text-[8vmin] md:text-[6vmin] font-display font-bold opacity-20">#{String(card.id).padStart(3, '0')}</h3>
                    <h4 className="text-[5vmin] md:text-[3vmin] font-bold mt-4 text-white leading-tight">{card.role}</h4>
                 </div>
                 <div className="text-neon-cyan text-xs md:text-sm tracking-widest animate-pulse border border-neon-cyan/30 rounded-full px-4 py-2 self-start">
                    TAP TO ACCESS
                 </div>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rounded-3xl border border-neon-pink bg-gradient-to-br from-pink-900/20 to-black p-6 md:p-8 flex flex-col justify-center rotate-y-180 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                 <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                        <p className="text-[10px] md:text-xs text-neon-pink uppercase tracking-widest mb-1">Target Identity</p>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-none mb-4">{card.fakeJob}</h3>
                    
                        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">True Identity</p>
                        <h3 className="text-lg md:text-xl text-gray-400 line-through decoration-red-500 decoration-2 leading-none">{card.realJob}</h3>
                    </div>
                    
                    <div className="bg-white/5 p-3 rounded-lg border-l-2 border-neon-cyan">
                        <p className="text-[10px] md:text-xs text-neon-cyan uppercase tracking-widest mb-1">Vocab</p>
                        <p className="text-white font-mono text-xs md:text-sm">{card.vocab}</p>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg border-l-2 border-neon-pink italic">
                        <p className="text-gray-300 text-sm md:text-base">"{card.line}"</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <TeacherNote 
        content={
          <div className="space-y-2">
             <p><strong>Activity:</strong> Roleplay. Student A is the Boss (interviewer). Student B selects a card.</p>
             <p><strong>Goal:</strong> Student B must answer questions using the vocabulary and grammar to convince Student A they are qualified.</p>
             <p className="text-neon-yellow"><strong>Hint:</strong> Encourage them to use "have to" for responsibilities.</p>
          </div>
        }
      />
    </div>
  );
};

export default Identity;