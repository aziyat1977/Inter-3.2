import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

interface TranslatorProps {
  en: React.ReactNode;
  ru: string;
  uz: string;
  className?: string;
}

const Translator: React.FC<TranslatorProps> = ({ en, ru, uz, className = '' }) => {
  const [activeLang, setActiveLang] = useState<'EN' | 'RU' | 'UZ'>('EN');
  const { playClick } = useSound();

  const handleToggle = (lang: 'RU' | 'UZ') => {
    playClick();
    setActiveLang(prev => prev === lang ? 'EN' : lang);
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Main Content */}
      <div className="relative">
        <div className="relative z-10 transition-all duration-300">
            {en}
        </div>
        
        {/* Translation Overlay */}
        <AnimatePresence>
          {activeLang !== 'EN' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-black/80 border border-white/20 rounded-lg whitespace-nowrap z-50 backdrop-blur-md shadow-xl"
            >
              <p className="text-neon-yellow font-display font-bold text-lg md:text-xl">
                {activeLang === 'RU' ? ru : uz}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggles */}
      <div className="flex gap-2 mt-2 opacity-50 hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); handleToggle('RU'); }}
          className={`px-2 py-1 text-[10px] md:text-xs font-bold rounded border ${
            activeLang === 'RU' ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-transparent text-gray-400 border-gray-600 hover:border-white'
          }`}
        >
          RU
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleToggle('UZ'); }}
          className={`px-2 py-1 text-[10px] md:text-xs font-bold rounded border ${
            activeLang === 'UZ' ? 'bg-neon-pink text-black border-neon-pink' : 'bg-transparent text-gray-400 border-gray-600 hover:border-white'
          }`}
        >
          UZ
        </button>
      </div>
    </div>
  );
};

export default Translator;