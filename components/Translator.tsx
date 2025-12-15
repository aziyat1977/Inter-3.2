import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';
import { Globe } from 'lucide-react';

interface TranslatorProps {
  en: React.ReactNode;
  ru: string;
  uz: string;
  className?: string;
  contentClassName?: string;
}

const Translator: React.FC<TranslatorProps> = ({ en, ru, uz, className = '', contentClassName = '' }) => {
  const [activeLang, setActiveLang] = useState<'EN' | 'RU' | 'UZ'>('EN');
  const { playClick } = useSound();

  const handleToggle = (lang: 'RU' | 'UZ') => {
    playClick();
    setActiveLang(prev => prev === lang ? 'EN' : lang);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Main Content Container - Flex-1 to allow filling parent if needed */}
      <div className={`relative w-full flex-1 flex items-center justify-center min-h-[4rem] ${contentClassName}`}>
        {/* English / Source Content */}
        <div className="w-full h-full flex items-center justify-center transition-opacity duration-300 relative z-10">
            {en}
        </div>
        
        {/* Translation Overlay */}
        <AnimatePresence>
          {activeLang !== 'EN' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-6 py-4 bg-black/90 border border-white/20 rounded-2xl whitespace-nowrap z-[100] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-w-[200px] text-center"
            >
               {/* Triangle pointer */}
               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 border-l border-t border-white/20 transform rotate-45" />
               
               <div className="relative z-10">
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 block">
                    {activeLang === 'RU' ? 'RUSSIAN' : 'UZBEK'}
                  </span>
                  <p className="text-neon-yellow font-display font-bold text-lg md:text-2xl break-words whitespace-normal leading-tight">
                    {activeLang === 'RU' ? ru : uz}
                  </p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
        <div className="pl-2 pr-1">
             <Globe size={14} className="text-gray-500" />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleToggle('RU'); }}
          className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
            activeLang === 'RU' 
            ? 'bg-neon-cyan text-black shadow-[0_0_10px_rgba(0,243,255,0.4)]' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          RU
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleToggle('UZ'); }}
          className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
            activeLang === 'UZ' 
            ? 'bg-neon-pink text-black shadow-[0_0_10px_rgba(255,0,255,0.4)]' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          UZ
        </button>
      </div>
    </div>
  );
};

export default Translator;