import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeacherNoteProps {
  content: React.ReactNode;
  title?: string;
}

const TeacherNote: React.FC<TeacherNoteProps> = ({ content, title = "TEACHER'S INTEL" }) => {
  const { isTeacher } = useTheme();
  const { playClick, playReveal } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  if (!isTeacher) return null;

  const handleOpen = () => {
    playClick();
    if (!isOpen) playReveal();
    setIsOpen(true);
  };

  const handleClose = () => {
    playClick();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-24 right-6 z-40 bg-neon-yellow text-black font-bold p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
        title="View Teacher Notes"
      >
        <Info size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-36 right-6 z-50 w-80 md:w-96 bg-yellow-950/90 border border-neon-yellow text-yellow-100 p-6 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(250,204,21,0.2)]"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-display font-bold text-neon-yellow tracking-widest">{title}</h4>
              <button onClick={handleClose} className="text-yellow-200 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="font-sans text-sm leading-relaxed space-y-2">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeacherNote;