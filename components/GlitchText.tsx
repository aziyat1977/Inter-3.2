import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'h1' }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <motion.div
        className="absolute top-0 left-0 w-full h-full text-neon-pink opacity-50 mix-blend-screen"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          repeatType: "mirror",
          ease: "linear"
        }}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)' }}
      >
        <Component className={className}>{text}</Component>
      </motion.div>
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full text-neon-cyan opacity-50 mix-blend-screen"
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.4,
          repeatType: "mirror",
          ease: "linear"
        }}
        style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)', transform: 'translate(2px)' }}
      >
        <Component className={className}>{text}</Component>
      </motion.div>

      <Component className={`relative z-10 ${className}`}>{text}</Component>
    </div>
  );
};

export default GlitchText;