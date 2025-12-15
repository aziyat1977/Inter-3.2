import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface CyberContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const CyberContainer: React.FC<CyberContainerProps> = ({ children, className = '', title }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className={`relative p-1 ${className}`}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-cyan/50" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-cyan/50" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-cyan/50" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-cyan/50" />

      {/* Main Content Box */}
      <div className={`
        relative overflow-hidden rounded-xl border border-white/10 
        ${isDark ? 'bg-black/40' : 'bg-white/60'} 
        backdrop-blur-xl shadow-2xl h-full w-full
      `}>
        {/* Scanning Line Animation */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent pointer-events-none z-0"
        />

        {/* Title Tag */}
        {title && (
          <div className="absolute top-0 right-0 px-4 py-1 bg-white/5 border-l border-b border-white/10 rounded-bl-xl z-20">
            <span className="text-[10px] font-mono tracking-widest text-neon-cyan opacity-70 uppercase">
              {title}
            </span>
          </div>
        )}

        <div className="relative z-10 p-4 md:p-8 h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default CyberContainer;